# riscos-artworks-js

A JavaScript library with file format [documentation][file-format] for Computer Concepts era 
RISC OS [ArtWorks][artworks-wikipedia] files.

## About

riscos-artworks-js is a JavaScript library for reading and writing ArtWorks files.

The project was started in the aim of preserving the content of these files.

A work-in-progress online viewer is hosted [here][host].

![The ArtWorks Apple](./media/apple4.svg)

## Installation

```bash
npm install git+https://git@github.com/RichardBrown384/riscos-artworks-js.git
```

## Usage

To use in code

```javascript
const {Artworks} = require('riscos-artworks');

const artworks = Artworks.fromUint8Array(array);
const array = Artworks.toUint8Array(artworks);
```

## Scripts

The library has some scripts that can be used to aid with the deciphering process

### svg

To convert an ArtWorks file to an SVG you can use the following commands

```bash
npm run svg source,d94 target.svg
npm run svg source,d94 target.svg outline
```

The later form produces an outline only representation of the original file.

_Please note that this command is offered as an experimental feature.
The conversion process often gets details wrong and some features, such as blended shapes,
are not supported._

### unpack and pack

To unpack the contents of an ArtWorks file into a JSON structure you can use the following command

```bash
npm run unpack source,d94 target.json
```

To pack a JSON structure into an ArtWorks file you can use

```bash
npm run pack source.json target,d94
```

### trawl

To recursively trawl a directory of ArtWorks files and have a summary of any problems you can use

```bash
npm run trawl directory
```

### stats

The stats script can be used in conjunction with the [trawl](#trawl) script to analyse records.
Modify the read process to log any data you're interested in, such as record bodies, as a line of JSON.
This script will then work out how many values appear in a given field for that set of records.

```bash
npm run stats json-per-line
```

### examples

To generate example ArtWorks files held in examples directory to a destination of your choice use

```bash
npm run examples target_directory
```

## Project status

Some parts of the file format are now thought to be understood to an acceptable level. However,
there are some areas that are likely to remain poorly supported without some additional effort.
They are,

1. Text objects - the reason is that these have a dependency on RISC OS fonts
2. [Blend groups][blend-groups] - these require additional effort on trying to understand on how ArtWorks interpolates attributes and geometry
3. Distortion and perspective groups - while they are trivial to render, it's not understood how ArtWorks applies the transforms
4. Sprite objects - these could theoretically be supported but would require improvements in the supporting libraries

The library and documentation are offered  as works in progress and there isn't much emphasis
on the software engineering fundamentals such as testing.

Writing ArtWorks files is experimental and only a limited feature subset is supported. Typically, only features
that are well understood are supported, such as fills and strokes. It should also be noted 
that the main motivation for writing files was to further the deductive process in a way
that lends itself to documentation (the provided examples).

---
[artworks-wikipedia]: https://en.wikipedia.org/wiki/ArtWorks
[host]: http://richardbrown384.github.io/riscos-file-viewer
[file-format]: docs/file-format/README.md
[blend-groups]: docs/blend-groups/README.md
