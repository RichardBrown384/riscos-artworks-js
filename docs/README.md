# RISC OS ArtWorks File Format

## Table of contents

* [About](#about)
* [General Observations](#general-observations)
* [Header](#header)
* [Body](#body)
    * [Body structure](#body-structure)
        * [Lists](#lists)
        * [List](#list)
        * [Sublists](#sublists)
        * [Traversal](#traversal)
    * [Record header](#record-header)
    * [Record types](#record-types)
        * [Type 0x00](#type-0x00-unknown)
        * [Type 0x01](#type-0x01-unknown-text)
        * [Type 0x02 - Path](#type-0x02-path)
        * [Type 0x05 - Sprite](#type-0x05-sprite)
        * [Type 0x06](#type-0x06-unknown-group)
        * [Type 0x0A - Layer](#type-0x0a-layer)
        * [Type 0x21 - Work Area](#type-0x21-work-area)
        * [Type 0x22](#type-0x22-unknown)
        * [Type 0x23 - File Save Location](#type-0x23-file-save-location)
        * [Type 0x24 - Stroke Colour](#type-0x24-stroke-colour)
        * [Type 0x25 - Stroke Width](#type-0x25-stroke-width)
        * [Type 0x26 - Fill](#type-0x26-fill)
        * [Type 0x27 - Join Style](#type-0x27-join-style)
        * [Type 0x28 - End Line Cap](#type-0x28-end-line-cap)
        * [Type 0x29 - Start Line Cap](#type-0x29-start-line-cap)
        * [Type 0x2A - Winding Rule](#type-0x2a-winding-rule)
        * [Type 0x2B - Dash Pattern](#type-0x2b-dash-pattern)
        * [Type 0x2C](#type-0x2c-path)
        * [Type 0x2D](#type-0x2d-character)
        * [Type 0x2E](#type-0x2e-unknown)
        * [Type 0x2F](#type-0x2f-font-name)
        * [Type 0x30](#type-0x30-font-size)
        * [Type 0x31](#type-0x31-unknown)
        * [Type 0x32](#type-0x32-unknown)
        * [Type 0x33](#type-0x33-unknown)
        * [Type 0x34](#type-0x34-path)
        * [Type 0x35](#type-0x35-unknown)
        * [Type 0x37](#type-0x37-unknown)
        * [Type 0x38](#type-0x38-unknown)
        * [Type 0x39](#type-0x39-file-information)
        * [Type 0x3A](#type-0x3a-unknown)
        * [Type 0x3B](#type-0x3b-unknown)
        * [Type 0x3D](#type-0x3d-unknown)
        * [Type 0x3E - Start Marker](#type-0x3e-line-start-marker)
        * [Type 0x3F - End Marker](#type-0x3f-line-end-marker)
        * [Type 0x42](#type-0x42-unknown)
    * [Coordinate system](#coordinate-system)
    * [Path data](#path-data)
    * [Palette](#palette)
    * [Sprite Area](#sprite-area)
    * [UBuf](#ubuf)
* [Rendering](#rendering)
* [References](#references)

## About

This document represents the outcome of an imperfect attempt to decipher the data stored in ArtWorks files and will
therefore contain errors and omissions.

The initial deciphering process involved manipulating ArtWorks files with a hex editor and opening them in !AWViewer.
There are therefore two consequences.
Firstly, features not present in the available files (those found on ArtWorks ClipArt CD1) are not documented here.
Secondly, in the absence of a feature list, it is hard to interpret the binary words that might represent
features or options.

Since being able to write ArtWorks files, the process has included programmatically creating small handcrafted files
to either confirm existing statements or to infer the purpose of certain record types in a controlled environment.

## General Observations

There a general number of observations that can be made about the files

1. Because of the early ARM heritage the data is little endian and word aligned.
1. The files are record based, and some record type numbers seem to coincide with their !Draw equivalents.
1. The records are stored in a tree/graph structure.
1. The vector data format is virtually identical to !Draw's.
1. The visual representation (stroke, cap) information are stored separately from the vectors.
1. Colours are referenced by an index into a palette of defined colours (0xFFFFFFFF or -1 means no colour).
1. Unlike !Draw, fonts appear to be referenced by name throughout.
1. Strings are null terminated. However, there's often what looks like garbage after the string
   to pad it to a word boundary.

## Header

The header has a 16 byte signature followed by more data whose purpose is largely unknown.

| Offset | Length | Content                                                                     |
|--------|--------|-----------------------------------------------------------------------------|
| 0      | 4      | Top!                                                                        |
| 4      | 4      | Unknown (version?) 9, 10                                                    |
| 8      | 8      | TopDraw (null terminated)                                                   |
| 16     | 4      | Unknown                                                                     |
| 20     | 4      | Absolute offset to start of [Body](#body)                                   |
| 24     | 16     | Unknown                                                                     |
| 40     | 4      | Absolute offset to start of [Undo Buffer](#ubuf), -1 if absent              |
| 44     | 4      | Absolute offset to start of [Sprite Area][sprite-area-format], -1 if absent |
| 48     | 12     | Unknown                                                                     |
| 60     | 4      | Absolute offset to start of [Palette](#palette)                             |
| 64     | varies | Unknown                                                                     |

## Body

The body comprises a list of lists of records. If one were to describe the format of the body in a typed
language like Java or C# then the body would look like

```java
class ArtWorks {
    private List<List<ArtWorksRecord>> body;
}
```

ArtWorksRecords, depending on the type of record, can themselves have their own list of lists of records.

````java
class ArtworksRecord {
    private List<List<ArtWorksRecord>> subLists;
}
````

### Body structure

#### Lists

Starting at offset specified in the header there are a series of doubly-linked list nodes with the following structure

| Offset | Length | Content                 |
|--------|--------|-------------------------|
| 0      | 4      | Offset to previous list |
| 4      | 4      | Offset to next list     |
| 8      | varies | [List](#list) data      |

Note that both offsets are relative to the _start_ of the node.
An offset of zero means that there is no previous or next entry.

We refer to these structures as list pointer, since they are pointing to list objects.

#### List

The lists themselves are doubly-linked list nodes and have the following structure

| Offset | Length | Content                       |
|--------|--------|-------------------------------|
| 0      | 4      | Offset to next record         |
| 4      | 4      | Offset to previous record     |
| 8      | varies | [Record data](#record-header) |

As above, the offsets are relative to the _start_ of the child node.
An offset of zero means that there is no previous or next entry.

We refer to these structures as record pointers, since they are pointing to record objects.

#### Sublists

Records can also have lists of lists, we call these sublists. When a record has a sublist, there will be an
extra 8 bytes at the end of the record containing a pointer to the start of the list of lists.

| Offset | Length | Content                    |
|--------|--------|----------------------------|
| n - 8  | 4      | Offset to previous sublist |
| n - 4  | 4      | Offset to next sublist     |

The offsets are relative to `n-8`. An offset of zero means that there is no previous or next entry.

We refer to these structures as lists pointers, since they are pointing to lists of lists.

The rule appears to be that a record can have a sublist if and only if it isn't the last record in a list.

Evidence:

1. Layer records with no sublists typically appear inside singleton lists.
1. Path records in certain files have data after the vectors, and the viable pointers
   occupy the last 8 bytes of the record.
1. Attribute records, such as fills or stroke width, seem to reside as leaves
   in singleton lists.
1. Adopting this scheme appears to guarantee that the file is read without leaving
   a significant number of 8 byte gaps. These 8 byte gaps would indicate
   missed pointers at the end of records.

##### First previous pointers

There appear to be a couple of rules for the first previous pointer in either a list of lists
or a list of records.

For lists of lists, the first previous pointer points back to the location of the
lists pointer within the record that they descended from.
The top level list of lists within a file does not descend from a record,
and in this case the first previous pointer will be zero.

For example, a path might have a list of lists containing attributes as singleton lists.
The first previous pointer of the list of lists then points back to the pointer occupying
the last 8 bytes of the path record, the lists pointer.

For lists of records, the first previous pointer points back to the location of the record
that it descends from. The top level singleton records within a file aren't descended from
a record, and in this case the first previous pointer will be zero.

For example, a Stroke Width record's previous pointer would point back to
the Path record it's descended from. In turn, the Path record's previous pointer
would then point back to the Layer it's descended from.

If these pointers aren't set correctly then !AWViewer won't draw anything.

#### Traversal

The files can be traversed as follows

```javascript
function readLists() {
    while (true) {
        const {position, next} = readListPointer();
        readList();
        if (next !== 0) {
            setPosition(position + next);
        } else {
            break;
        }
    }
}

function readList() {
    while (true) {
        const {position, next} = readRecordPointer();
        readRecord();
        if (next !== 0) {
            readSubLists(position + next - 8);
        } else {
            break;
        }
        setPosition(position + next);
    }
}

function readSubLists(subListPointerPosition) {
    const current = getPosition();
    assert(current <= subListPointerPosition);
    setPosition(subListPointerPosition);
    const {position, next} = readListsPointer();
    if (next !== 0) {
        setPosition(position + next);
        readLists();
    }
}
```

where

1. The `readNodePointer` and `readChildPointer` functions read the appropriate `next`
   and `previous` values, and return them along with the position of the pointer in the file.
1. The `setPosition` function allows one to navigate to a certain point in the file.
1. The `readRecord` function reads the appropriate record data from the file.

### Record header

The records, unless noted otherwise, all share a common header.

| Offset | Length | Content                                             |
|--------|--------|-----------------------------------------------------|
| 0      | 4      | Record type (Bits 0-7 type, 8-31 are sometimes set) |
| 4      | 4      | Unknown                                             |
| 8      | 4      | Bounding Box Min X                                  |
| 12     | 4      | Bounding Box Min Y                                  |
| 16     | 4      | Bounding Box Max X                                  |
| 20     | 4      | Bounding Box Max Y                                  |

The function of the integer at offset 4 is not very well understood.
However, in simple cases, the following seems to apply.

| Bit(s) | Content                                                                  |
|--------|--------------------------------------------------------------------------|
| 0      | If set then style records (fills and so on) are used, otherwise ignored. |
| 1      | If set then path records are used, otherwise ignored.                    |
| 2..7   | Unknown                                                                  |
| 8..15  | Unknown, perhaps a counter or index, some files have sequential values.  |
| 16..31 | Unknown                                                                  |

For objects that have no immediate visual representation, such as the palette, the bounding box
entries are usually zero.

Finally, bounding box values may be negative.

### Record types

#### Type 0x00: Unknown

This record appears to be always 124 bytes long and filled with zeros.

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | 100    | Unknown (0)                     |

#### Type 0x01: Unknown, Text

Notes: After the bounding rectangle there are a number of trailing zeros.
The number of zeros can vary, and there can sometimes be string data present at offset 84 too.

| Offset | Length | Content                           |
|--------|--------|-----------------------------------|
| 0      | 24     | [Record header](#record-header)   |
| 24     | 4      | Unknown                           |
| 28     | 4      | Unknown                           |
| 32     | 4      | Unknown                           |
| 36     | 4      | Unknown                           |
| 40     | 4      | Unknown                           |
| 44     | 4      | Unknown                           |
| 48     | 4      | Bounding Rectangle Bottom Left X  |
| 52     | 4      | Bounding Rectangle Bottom Left Y  |
| 56     | 4      | Bounding Rectangle Top Left X     |
| 60     | 4      | Bounding Rectangle Top Left Y     |
| 64     | 4      | Bounding Rectangle Top Right X    |
| 68     | 4      | Bounding Rectangle Top Right Y    |
| 72     | 4      | Bounding Rectangle Bottom Right X |
| 76     | 4      | Bounding Rectangle Bottom Right Y |
| 80     | Varies | Unknown                           |
| n - 8  | 8      | [Lists pointer](#sublists)        |

#### Type 0x02: Path

Note: In certain cases there's extra data after the path data.

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | varies | [Path data](#path-data)         |
| varies | varies | Unknown, sometimes present      |
| n - 8  | 8      | [Lists pointer](#sublists)      |

#### Type 0x05: Sprite

Sprites appear to be referenced by name into the [Sprite Area][sprite-area-format].

The unknown coordinates seem to agree with the bounding box.
There appears to be a transformation matrix defined after the coordinates in 16.16 format.
The palette defined in this record seems to take precedence over the one defined with the sprite.

| Offset | Length | Content                                                    |
|--------|--------|------------------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                            |
| 24     | 4      | Unknown                                                    |
| 28     | 12     | Sprite name                                                |
| 40     | 4      | Unknown                                                    |
| 44     | 4      | Unknown                                                    |
| 48     | 4      | Unknown X-Coordinate 1                                     |
| 52     | 4      | Unknown Y-Coordinate 1                                     |
| 56     | 4      | Unknown X-Coordinate 2                                     |
| 60     | 4      | Unknown Y-Coordinate 2                                     |
| 64     | 4      | Unknown X-Coordinate 3                                     |
| 68     | 4      | Unknown Y-Coordinate 3                                     |
| 72     | 4      | Unknown Matrix Element (65536)                             |
| 76     | 4      | Unknown Matrix Element (0)                                 |
| 80     | 4      | Unknown Matrix Element (0)                                 |
| 84     | 4      | Unknown Matrix Element (65536)                             |
| 88     | 4      | Unknown Matrix Element (X translation?)                    |
| 92     | 4      | Unknown Matrix Element (Y translation?)                    |
| 96     | 4      | Unknown                                                    |
| 100    | 4      | Sprite Mode                                                |
| 104    | 4      | Number of sprite palette entries                           |
| 108    | varies | Sequential [sprite palette entries](#sprite-palette-entry) |

#### Sprite palette entry

| Offset | Length | Content                              |
|--------|--------|--------------------------------------|
| 0      | 4      | Colour (BGR) usually with bit 29 set |

#### Type 0x06: Unknown, Group

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | 4      | Unknown                         |
| 28     | 4      | Unknown                         |
| 32     | 4      | Unknown                         |
| 36     | 8      | [Lists pointer](#sublists)      |

#### Type 0x0A: Layer

| Offset | Length | Content                                                                                      |
|--------|--------|----------------------------------------------------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                                                              |
| 24     | 4      | Unknown. Bit 3 is usually set and both bits 3 and 0 must be set for the layer to be visible. |
| 28     | 32     | Layer name, null terminated. The length stated here is a guess.                              |
| 60     | 8      | [Lists pointer](#sublists)                                                                   |

#### Type 0x21: Work Area

This record is thought to always occur at the end of the file. The record will always contain
the file's [Palette](#palette) information, but may also contain other information such as the
[Undo Buffer](#ubuf). The object locations within this record are determined by absolute
offsets specified in the file's [header](#header).

| Offset | Length | Content                                      |
|--------|--------|----------------------------------------------|
| 0      | 24     | [Record header](#record-header)              |
| varies | varies | [Ubuf record](#ubuf) (optional)              |
| varies | varies | [Sprite Area][sprite-area-format] (optional) |
| varies | varies | [Palette record](#palette)                   |

#### Type 0x22: Unknown

Purpose of this record isn't known. Maybe an options record? The text `1cm` seems to occur relatively often.

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | ?      | Unknown                         |

#### Type 0x23: File save location

This record can vary in size.

| Offset | Length | Content                            |
|--------|--------|------------------------------------|
| 0      | 24     | [Record header](#record-header)    |
| 24     | 4      | File type (0xd94)                  |
| 28     | varies | File path, null terminated string. |

#### Type 0x24: Stroke Colour

| Offset | Length | Content                             |
|--------|--------|-------------------------------------|
| 0      | 24     | [Record header](#record-header)     |
| 24     | 4      | Colour Index (-1 means transparent) |

#### Type 0x25: Stroke Width

| Offset | Length | Content                           |
|--------|--------|-----------------------------------|
| 0      | 24     | [Record header](#record-header)   |
| 24     | 4      | Stroke Width (-1 means no stroke) |

#### Type 0x26: Fill

When an ArtWorks file doesn't specify a fill then !AWViewer will crash with a data transfer abort.

| Offset | Length | Content                                                                  |
|--------|--------|--------------------------------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                                          |
| 24     | 4      | Fill Type <ol start="0"><li>Flat</li><li>Linear</li><li>Radial</li></ol> |
| 28     | 4      | Unknown (0x59b98)                                                        |

If Fill Type is flat

| Offset | Length | Content      |
|--------|--------|--------------|
| 32     | 4      | Colour Index |

If Fill Type is linear or radial

| Offset | Length | Content            |
|--------|--------|--------------------|
| 32     | 4      | Gradient Start X   |
| 36     | 4      | Gradient Start Y   |
| 40     | 4      | Gradient End X     |
| 44     | 4      | Gradient End Y     |
| 48     | 4      | Start Colour Index |
| 52     | 4      | End Colour Index   |

#### Type 0x27: Join Style

The Join Style enumeration coincides exactly with that of !Draw.

When an ArtWorks file doesn't specify a join style then !AWViewer defaults to bevelled joins.

Setting the join style to a value not in the enumeration will result in !AWViewer not rendering paths.

| Offset | Length | Content                                                                  |
|--------|--------|--------------------------------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                                          |
| 24     | 4      | Join Style <ol start="0"><li>Mitre</li><li>Round</li><li>Bevel</li></ol> |

#### Type 0x28: End line cap

The Cap Style enumeration coincides exactly with that of !Draw.

When an ArtWorks file doesn't specify an end line cap then !AWViewer defaults to end butt caps.

Setting the cap style to a value not in the enumeration will result in !AWViewer not rendering paths.

| Offset | Length | Content                                                                                    |
|--------|--------|--------------------------------------------------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                                                            |
| 24     | 4      | Cap Style <ol start="0"><li>Butt</li><li>Round</li><li>Square</li><li>Triangular</li></ol> |
| 28     | 4      | [Triangle Cap Width and Length](#triangle-cap-width-and-length)                            |

##### Triangle Cap Width and Length

This field is ignored for other cap types.

| Bits    | Content                                              |
|---------|------------------------------------------------------|
| 0-15    | Triangle Cap Width (0x80 corresponds to line width)  |
| 16-31   | Triangle Cap Height (0x80 corresponds to line width) |

#### Type 0x29: Start line cap

The cap style enumeration coincides exactly with that of !Draw.

When an ArtWorks file doesn't specify a start line cap then !AWViewer defaults to start butt caps.

Setting the cap style to a value not in the enumeration will result in !AWViewer not rendering paths.

| Offset | Length | Content                                                                                    |
|--------|--------|--------------------------------------------------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                                                            |
| 24     | 4      | Cap Style <ol start="0"><li>Butt</li><li>Round</li><li>Square</li><li>Triangular</li></ol> |
| 28     | 4      | [Triangle Cap Width and Length](#triangle-cap-width-and-length)                            |

#### Type 0x2A: Winding Rule

The winding rule enumeration coincides exactly with that of !Draw.

When an ArtWorks file doesn't specify a winding rule then !AWViewer defaults to even-odd.

Setting the winding rule to a value not in the enumeration will result in !AWViewer not rendering paths.

| Offset | Length | Content                                                            |
|--------|--------|--------------------------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                                    |
| 24     | 4      | Winding Rule <ol start="0"><li>Non-zero</li><li>Even-odd</li></ol> |

#### Type 0x2B: Dash Pattern

The dash pattern structure is similar to that of !Draw.

When an ArtWorks file doesn't specify a dash pattern then !AWViewer defaults to no pattern and draws solid paths.

There are some doubts about Dash Pattern Index. One interpretation is that it forms an index into a dash palette.
A negative index could mean that a bespoke dash pattern follows. However, positive values also have subsequent dash
patterns.
Maybe there is a palette of dash patterns within ArtWorks but for rendering purposes the pattern is specified inline in
the record.

| Offset | Length | Content                                                                                                                     |
|--------|--------|-----------------------------------------------------------------------------------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                                                                                             |
| 24     | 4      | Dash Pattern Index <ul><li>-1 - Dash pattern follows</li><li>0 - No dash</li><li>Otherwise - Dash pattern follows</li></ul> |

If Dash Pattern Index is non-zero

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 28     | 4      | Dash pattern offset             |
| 32     | 4      | Number of dash elements         |
| 36     | varies | [Dash Elements](#dash-elements) |

##### Dash Elements

| Offset | Length | Content                        |
|--------|--------|--------------------------------|
| 0      | 4      | Length of dash pattern element |

#### Type 0x2C: Path

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | 4      | Unknown                         |
| 28     | varies | [Path data](#path-data)         |
| n - 8  | 8      | [Lists pointer](#sublists)      |

#### Type 0x2D: Character

Note: These records seem to have the data for individual characters of a string.
Please refer to the [RISC OS Character Set][risc-os-character-set] for details.

| Offset | Length | Content                                 |
|--------|--------|-----------------------------------------|
| 0      | 24     | [Record header](#record-header)         |
| 24     | 4      | Character code                          |
| 28     | 4      | Unknown, X Coordinate (text base line?) |
| 32     | 4      | Unknown, Y Coordinate (text base line?) |
| 36     | 4      | Unknown (0xf8f)                         |
| 40     | 4      | Unknown (0)                             |
| 44     | 8      | [Lists pointer](#sublists)              |

#### Type 0x2E: Unknown

The purpose of this record is unknown. Offsets 28 and 36 usually comprise two strings but this isn't always the case.
Sometimes the strings offsets 8 and 36 are `selectio` and `n` respectively.

| Offset | Length | Content                                                    |
|--------|--------|------------------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                            |
| 24     | 4      | Unknown (17)                                               |
| 28     | 8      | String, null terminated ('group', 'selectio')              |
| 36     | 24     | String, null terminated ('Black', 'n' followed by garbage) |

#### Type 0x2F: Font name

The font name seems to be null terminated, but the amount of data after the font name might be variable.

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | n      | Font name, null terminated.     |

#### Type 0x30: Font size

Going to assume the nominal font sizes are in (1/640) of a printer's point.

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | 4      | Nominal X size of the font      |
| 28     | 4      | Nominal Y size of the font      |

#### Type 0x31: Unknown

This record seems to appear as a sibling to records of [Type 0x01](#type-0x01-unknown-text).

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | 4      | Unknown (50)                    |
| 28     | 4      | Unknown (0)                     |
| 32     | 4      | Unknown (50)                    |
| 36     | 4      | Unknown (0)                     |

#### Type 0x32: Unknown

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | 4      | Unknown (0xFFFFFF9C)            |

#### Type 0x33: Unknown

This record seems to represent some sort of matrix transformation stored in 16.16 fixed point format.
Often, the values at offsets 24 and 36 are equal, and the value at offset 32 is the value at offset 28 negated.
These rows (or columns) will then have a magnitude of one, and it's possible to infer that this might represent a
rotation matrix.

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | 4      | Unknown                         |
| 28     | 4      | Unknown                         |
| 32     | 4      | Unknown                         |
| 36     | 4      | Unknown                         |
| 40     | 4      | Unknown (0)                     |
| 36     | 4      | Unknown (0)                     |

#### Type 0x34: Path

Note: Bounding Triangle

These 3 points appear to define the rotated bounding box for the object in an anti-clockwise fashion but with the final
point missing.
Another interpretation could be that the points form basis vectors for the paths that follow.

These 3 points might have something to do with radial fills.

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | 4      | Bounding Triangle Bottom Left X |
| 28     | 4      | Bounding Triangle Bottom Left Y |
| 32     | 4      | Bounding Triangle Top Left X    |
| 36     | 4      | Bounding Triangle Top Left Y    |
| 40     | 4      | Bounding Triangle Top Right X   |
| 44     | 4      | Bounding Triangle Top Right Y   |
| 48     | varies | [Path data](#path-data)         |
| n - 8  | 8      | [Lists pointer](#sublists)      |

#### Type 0x35: Unknown

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | 4      | Unknown (26c)                   |
| 28     | 4      | Bounding Triangle Bottom Left X |
| 32     | 4      | Bounding Triangle Bottom Left Y |
| 36     | 4      | Bounding Triangle Top Left X    |
| 40     | 4      | Bounding Triangle Top Left Y    |
| 44     | 4      | Bounding Triangle Top Right X   |
| 48     | 4      | Bounding Triangle Top Right Y   |
| 52     | varies | [Path data](#path-data)         |
| n - 8  | 8      | [Lists pointer](#sublists)      |

#### Type 0x37: Unknown

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | varies | [Path data](#path-data)         |
| varies | varies | Unknown                         |
| n - 24 | 16     | Bounding Box                    |
| n - 8  | 8      | [Lists pointer](#sublists)      |

#### Type 0x38: Unknown

This record appears to be a fixed 156 bytes in length. However, there is one instance of the record
being at the end of a list and with no path data. It isn't known how to correctly determine the
presence of path data.

| Offset | Length | Content                                         |
|--------|--------|-------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                 |
| 24     | 64     | [Path data](#path-data) (1 Moves, 4 Lines, End) |
| 88     | 68     | Unknown                                         |
| 156    | 8      | [Lists pointer](#sublists)                      |

#### Type 0x39: File information

This record can vary in size.

| Offset | Length | Content                                                                           |
|--------|--------|-----------------------------------------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                                                   |
| 24     | varies | Information about the file, creation date, serial number. Null terminated string. |

#### Type 0x3A: Unknown

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | 4      | Unknown, (0)                    |
| 28     | 4      | Unknown, (3)                    |
| 32     | 4      | Unknown, (0x51900)              |
| 36     | 4      | Unknown, (0x40000006) or (6)    |
| 40     | 4      | Unknown, (0xC4C3)               |
| 44     | 4      | Unknown, (0xC4C3)               |
| 48     | 4      | Unknown, (-1)                   |
| 52     | 4      | Unknown, (-1)                   |
| 56     | 4      | Unknown, (-1)                   |
| 60     | 4      | Unknown, (-1)                   |
| 64     | 4      | Unknown, (-1)                   |
| 68     | 8      | [Lists pointer](#sublists)      |

#### Type 0x3B: Unknown

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | 4      | Unknown, (0)                    |
| 28     | 4      | Unknown, (0x10)                 |
| 32     | 4      | Unknown, (-1)                   |
| 36     | 4      | Unknown, (-1)                   |
| 40     | 4      | Unknown, (-1)                   |
| 44     | 4      | Unknown, (-1)                   |
| 48     | 4      | Unknown, (-1)                   |
| 52     | 4      | Unknown, (-1)                   |
| 56     | 4      | Unknown, (-1)                   |
| 60     | 4      | Unknown, (-1)                   |

#### Type 0x3D: Unknown

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | varies | [Path data](#path-data)         |

#### Type 0x3E: Line Start Marker

When an ArtWorks file doesn't specify a line start marker then !AWViewer defaults to none.

Setting the marker style to a value not in the enumeration will result in !AWViewer becoming unstable.

Line start caps are still drawn when markers are in use.

| Offset | Length | Content                                                                                                              |
|--------|--------|----------------------------------------------------------------------------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                                                                                      |
| 24     | 4      | Marker Style <ol start="-1"><li>None</li><li>Triangle</li><li>Arrow head</li><li>Circle</li><li>Arrow tail</li></ol> |
| 28     | 4      | Marker Width (0x10000 corresponds to line width)                                                                     |
| 32     | 4      | Marker Height (0x10000 corresponds to line width)                                                                    |

#### Type 0x3F: Line End Marker

When an ArtWorks file doesn't specify a line end marker then !AWViewer defaults to none.

Setting the marker style to a value not in the enumeration will result in !AWViewer becoming unstable.

Line end caps are still drawn when markers are in use.

| Offset | Length | Content                                                                                                              |
|--------|--------|----------------------------------------------------------------------------------------------------------------------|
| 0      | 24     | [Record header](#record-header)                                                                                      |
| 24     | 4      | Marker Style <ol start="-1"><li>None</li><li>Triangle</li><li>Arrow head</li><li>Circle</li><li>Arrow tail</li></ol> |
| 28     | 4      | Marker Width (0x10000 corresponds to line width)                                                                     |
| 32     | 4      | Marker Height (0x10000 corresponds to line width)                                                                    |

#### Type 0x42: Unknown

This record seems to appear as a sibling to records of [Type 0x37](#type-0x37-unknown).

| Offset | Length | Content                         |
|--------|--------|---------------------------------|
| 0      | 24     | [Record header](#record-header) |
| 24     | 8      | [Lists pointer](#sublists)      |

### Coordinate system

The coordinate system places the origin at the bottom left of the page. All coordinates in the file
are stored using _signed_ 32-bit integers.

### Path data

The path data is _very_ similar to that found in an Acorn !Draw file.

A path element consists of a tag and zero or more points (stored as two 32-bit words as x then y).

A tag is a 32-bit word. The lower 8 bits appear to determine the nature of the data that follows, and
bits 8-31 contain flags that control rendering.

A path then comprises one or more path elements.

| Tag | Points | Meaning                  |
|-----|--------|--------------------------|
| 0   | 0      | End path                 |
| 2   | 1      | Move absolute            |
| 4   | 0      | Unknown, End of sub path |
| 5   | 0      | Close sub path           |
| 6   | 3      | Bezier to absolute       |
| 8   | 1      | Line to absolute         |

For moves (tag 2), bit 31 of the tag appears to influence if the path or sub-path is rendered.
If bit 31 is set, then the path (or sub-path) is rendered in all of !AWViewer's WYSIWIG modes.
If bit 31 is clear, then the path (or sub-path) is only rendered in !AWViewer's Outline mode.

### Palette

Contains the indexed palette for the file. *NB* the number of entries sometimes might have
bit-31 set.

#### Palette header

| Offset | Length | Content                                                  |
|--------|--------|----------------------------------------------------------|
| 0      | 4      | Number of palette entries                                |
| 4      | 4      | Unknown, usually less than the number of palette entries |
| 8      | varies | Sequential palette entries                               |

#### Palette entry

| Offset | Length | Content                                                                   |
|--------|--------|---------------------------------------------------------------------------|
| 0      | 24     | Name of colour, null terminated, then filled with what looks like garbage |
| 24     | 4      | Colour (BGR) usually with bit 29 set                                      |
| 28     | 4      | Unknown                                                                   |
| 32     | 4      | Unknown                                                                   |
| 36     | 4      | Unknown                                                                   |
| 40     | 4      | Unknown                                                                   |
| 44     | 4      | Unknown                                                                   |

### Sprite Area

Note: You can't rely on the first word of the [Sprite Area][sprite-area-format] to be able to compute its size.
Some files, for example `WORLDPEACE,d94`, have nonsensical values.

### UBuf

A UBuf section looks as if it comprises a header followed by a list of undo actions followed by a list of redo actions.

The undo-list starts with a `<Nothing>` action, and the redo-list ends with one.

There doesn't appear to be any reliable information as to the length of the redo-list.

In one case, `AFFY,d94`, the redo-list is corrupted, and the size of the sole entry isn't an integer multiple of 4.

#### UBuf header

Offsets 8 and 12 seem to semi-reliably point to the last and first entries of the undo and redo lists respectively.

In the one case where offset 12 seems to point to garbage, `AFFY,d94`, offset 16 is not in agreement with offset 12 (
which is usually is).

| Offset | Length | Content                                                                                        |
|--------|--------|------------------------------------------------------------------------------------------------|
| 0      | 4      | UBuf                                                                                           |
| 4      | 4      | Unknown, (0 or rarely 8)                                                                       |
| 8      | 4      | Unknown, offset to last [undo entry](#undo-entry)                                              |
| 12     | 4      | Unknown, offset to first [redo entry](#undo-entry)                                             |
| 16     | 4      | Unknown, when there is more than one undo entry the offset to the last entry, otherwise 0.     |
| 20     | 4      | Unknown, when there is more than one undo entry the offset to the end of the data, otherwise 0 |
| 24     | 4      | Unknown, sometimes less than offset 20                                                         |
| 28     | 4      | Unknown, (65536 or 8192, but not _always_ a power of two)                                      |
| 32     | 4      | Unknown                                                                                        |

#### Undo entry

| Offset | Length | Content                                                     |
|--------|--------|-------------------------------------------------------------|
| 0      | 4      | Size of previous entry                                      |
| 4      | 4      | Size of this entry                                          |
| 8      | 4      | Unknown, some indications that this might be the entry type |
| 12     | 4      | Unknown                                                     |
| 16     | 4      | Unknown                                                     |
| 20     | 16     | Name of entry (move, paste, make shapes, etc)               |

## Rendering

It's not clear how ArtWorks renders the file. When doing a naive forward traversal of the graph,
you can encounter background objects after foreground ones.

## References

1. [Draw file format][draw-file-format]
1. [Sprite area format][sprite-area-format]
1. [RISC OS Character Set][risc-os-character-set]

---

[draw-file-format]: http://www.riscos.com/support/developers/prm/fileformats.html

[sprite-area-format]: http://www.riscos.com/support/developers/prm/sprites.html

[risc-os-character-set]: https://en.wikipedia.org/wiki/RISC_OS_character_set
