# RISC OS ArtWorks Blend Groups

⚠️️ Blend Groups are not very well understood and this document may contain errors ⚠️️

## Table of contents

* [Quirks](#quirks)
* [Attributes](#attributes)
  * [Colours](#colours) 
  * [Stroke colour](#stroke-colour)
  * [Stroke width](#stroke-width)
  * [Fills](#fills)
  * [Join style](#join-style)
  * [Line caps](#line-caps)
  * [Winding rule](#winding-rule)
  * [Dash pattern ⚠️️](#dash-pattern)
  * [Line markers](#line-markers)
* [Geometry](#geometry)
  * [Equal number of points](#equal-number-of-points)
  * [Differing number of points](#differing-number-of-points)

## Quirks

Early experiments with blends have shown that a file must specify a dash pattern for the blend to work otherwise
!AWViewer crashes.

However, attempting to blend a dash pattern results in !AWViewer filling the viewport with the stroke colour.

## Attributes

Object attributes to can be split into two broad categories _continuous_ and _discrete_.

Continuous attributes are things like stroke width while discrete attributes are things like winding rule.

Continuous attributes blend more-or-less as you would expect and discrete ones are usually get
swapped over around the halfway mark.

General findings:

1. Stroke attributes aren't interpolated unless a join style is specified with the file.
2. Continuous stroke attributes are interpolated linearly.
3. Discrete stroke attributes (join style) switch over halfway through the interpolation.
4. Line caps and markers aren't interpolated, rather the paths are interpolated as closed.

### Colours

Colours appear to be linearly interpolated in RGB space as evidenced by the behaviour exhibited
when interpolating/blending between red and cyan.

### Stroke colour

Stroke colour is interpolated linearly in a blend group.

### Stroke width

Stroke width is interpolated linearly in a blend group.

### Fills

1. Flat to flat works as you would expect.
2. Flat to linear (and vice versa) works as you would expect
3. Flat to radial (and vice versa) works as you would expect
4. Linear to linear works as you would expect
5. Linear to radial (and vice versa) isn't fully supported and the rule appears to be that you use one fill for half the interpolation steps and the other for the remaining ones.
6. Radial to radial doesn't work as expected. Further investigation required although the suspicion is that the end fill's start and end points are translated with the geometry.

In tabular form

| Fill   | Flat | Linear | Radial |
|--------|------|--------|--------|
| Flat   | ✅    | ✅      | ✅      |
| Linear | ✅    | ✅      | ❌      |
| Radial | ✅    | ❌      | ⚠️     |

### Join style

These have like a discrete attribute. The source join style is used for the first half of the interpolation steps
and the target join style is used for the second half.

### Line caps

Line caps are not interpolated. The evidence appears to suggest that for the purpose of blending open paths 
are closed.

### Winding rule

These have like a discrete attribute. The source winding rule is used for the first half of the interpolation steps
and the target winding is used for the second half.

### Dash pattern

Dash patterns exhibit strange behaviours.

When there is no active join style the intermediate geometries are unstroked and what is rendered is sensible if 
not exactly what you might expect (either an interpolated dash pattern or a discrete switchover).

When there is an active join style then an empty dash pattern is the only thing that gets rendered correctly.

Mismatched source and target dash patterns end up filling !AWViewer's viewport with the stroke colour.

Blending between two matched non-empty source and target patterns ends up filling !AWViewer's viewport with
the stroke colour.

### Line markers

Line markers are not interpolated. The evidence appears to suggest that for the purpose of blending open paths
are closed.

## Geometry

It's not fully understood how !AWViewer blends geometry. There are a number of cases to consider

1. Source and target geometry having an equal number of segments/points
2. Source and target geometry having an equal number of segments/points but the geometry is degenerate (i.e. self-intersecting)
3. Source and target geometry having a differing number of segments/points
4. Source and target geometry having a differing number of segments/points and the geometry is degenerate

The points in the source and target paths must be defined in the same order (clockwise or anti-clockwise) for
the blending to work at all.

### Methodology

The following discoveries were made by setting up test files programmatically.

The test files contained one-or-more blend groups drawn on top of simulated blend groups.

The simulated blend groups are generated with relatively simple linear interpolation routines.

When there is mismatch between the number of points there are routines that support the 
manual insertion of additional points into the target geometry. It's currently possible to either split a 
line segment into a number of equal length segments or to split a line segment at given parametric distances.

### Equal number of points

From the trivial cases examined this appears to work as one would expect. The geometry is simply linearly interpolated.

Line segments paired with Béziers appear to be converted to Béziers with the control points
at a third and two-thirds of the way along the original line. Moving the control
points away from these offsets results in the simulated blend geometry being visually wrong.

!AWViewer appears to make some attempt to detect self-intersecting geometry prior to blending. In the test
cases examined to date a self-intersecting Bézier segment is sufficient for the blending to deviate from the 
best case behaviour.

### Differing number of points

When the geometry is not degenerate the approach appears to be to add more points to the geometry with the least
number of points so that the two geometries can be linearly interpolated easily.

How !AWViewer decides to do this isn't really understood. 

We can however make the following observations (assuming the target has fewer points than the source)

1. The order of the points in the file is probably more important than the location of the points in space
2. There's probably a process that decides which points in the source geometry map onto those _existing_ in the target geometry
3. Once that mapping has been decided the unmapped points are used to insert points into the target geometry

Evidence for point (1) comes from experiments with a square being blended with a triangle. The square was rotated
at ten degree increments and at no time did !AWViewer choose to insert the required point on the triangle 
in a different location. It was always inserted at the midpoint of the second triangle edge.

(2) and (3) are demonstrated but not proven with a proposed methodology for (3) in the example below.

#### Example

From one of the example files we take a source non-convex polygon with 8 points 
and a target convex polygon with 5 points.

We label the points of the target polygon **A**, **B**, **C**, **D**, and **E**.

How those points are mapped back onto the source polygon is shown in the figure below.

![Polyline blend](./media/blend-group-polyline.svg)

At this time it is not understood how !AWViewer arrives at mapping.

The source polygon's three additional points we label **X**, **Y** and **Z**.

In order to interpolate between the two polygons easily !AWViewer appears to insert three new points into the
target polygon at **X'**, **Y'** and **Z'** (their parametric distances along their respective
line segments are shown in the diagram).

Two options came to mind as to how !AWViewer decides to place **X'**, **Y'** and **Z'**.

1. Projection. For example by projecting the line segment **AX** onto the line between **AB**.
2. By using the lengths of the 'discarded' line segments to work out a parametric distances for the new points.

It's maybe reasonable to eliminate (1) since if projection were used then point **Z'** 
should be between **D** and **E** and not **C** and **D**.

Let `d(P, Q)` denote the distance between two points **P** and **Q**.

Therefore, parametric distance at which **X'** is inserted into the line segment **AB*, is

```text
X' = d(A, X) / (d(A, X) + d(X, Y) + d(Y, B))
```

Similarly, for **Y'**

```text
Y' = (d(A, X) + d(X, Y)) / (d(A, X) + d(X, Y) + d(Y, B))
```

and **Z'**

```text
Z' = d(C, Z) / (d(C, Z) + d(Z, D))
```

The values computed in this fashion agree broadly with what was estimated visually in !AWViewer
for this particular example.

#### Note

Self-intersecting geometry with a differing number of points haven't been considered.

Geometry with Béziers and differing number of points haven't been considered.
