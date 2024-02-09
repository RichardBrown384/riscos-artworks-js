## How to contribute

Thank you for taking the time to read about how to contribute this project.

Before proceeding, it should be noted that 

1. This project's primary focus is the Computer Concepts era version of ArtWorks. 
Artworks 2 developed by [MW Software][mw-software] (not https!) is considered out of scope.
2. The project has hitherto progressed without resorting to disassembly of the original binaries
as a matter of principle, and we'd like to avoid resorting to such techniques.

### If you have ArtWorks files... 

**riscos-artworks-js** was developed by using !AWViewer and the sample files shipped on the 1995 Acorn User CD. 
This means that **riscos-artworks-js** only knows about the features found in those files and your files
may contain unsupported features we'd like to know about!

* Try out **riscos-artworks-js** by using the web hosted [viewer][viewer] and report any defects as issues

### If you have a Computer Concepts version of ArtWorks...

* There are plenty of grey areas in the [file format documentation][file-format-docs] that hopefully
could be filled in by using ArtWorks to create new files for investigative purposes
* If you are able to make any discoveries then please update the documentation with a pull request
* If you are able to convert blend objects into their discrete steps so that the intermediate geometry can
be analysed that would be extremely useful, because...

### If you have experience with interpolating 2D geometry...

The big challenge facing the project is to work out how ArtWorks interpolated geometry so
that blends can be accurately recreated.

The investigation is being documented [here][blend-docs]. 

It's currently thought that we understand what ArtWorks does in order to interpolate the geometry
but not **how**.

### If you would like to use riscos-artworks-js in your own project or generally improve it...

**riscos-artworks-js** was developed as the result of a desire to try and preserve information
about an unusual 1990s vector graphics file format. It wasn't developed 
with end users in mind and there are definitely areas for improvement. E.g.,

* Reworking the library's interface so that it's possible to integrate with other JS 
vector graphics libraries
* Cleaning up the codebase to make it more idiomatically JavaScript
* Cleaning up the codebase to remove the research and development elements
* Introducing a testing regime
* Deploying to npm

---
[viewer]: https://richardbrown384.github.io/riscos-file-viewer/
[mw-software]: http://www.mw-software.com
[file-format-docs]: docs/file-format/README.md
[blend-docs]: docs/blend-groups/README.md
