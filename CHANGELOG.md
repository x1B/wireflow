# Changelog

## Last Changes


## v0.5.1

- cleanup: removed evil console.log


## v0.5.0

- (#1) significant performance improvements after profiling:
  dirty-checking, some memoization, CSS transform for node positions
- (#5) allow to enter/activate vertices through double-click
- (#2) fixed moving nodes so that the canvas grows to the left/top as well as to the right/bottom
- fixed possible null-pointer related to dom measurements
- fixed vertex width and maximum minimap width


## v0.4.0

- no longer rely on DOM/CSS measurements to size vertices
- added "kind" attribute for vertices
- improved minimap sizing and rendering, especially for large graphs
- added basic copy/paste (still broken for some cases)
- added favicon


## v0.3.0

- implemented undo/redo for connect/disconnect operations
- allow to resize the minimap by dragging top-right corner
- allow to navigate by clicking/dragging on the minimap
- update minimap on resize, and hide if not needed
- reorganized code files by functionality rather than type
- reorganized demo code under demos
- implemented basic minimap (read-only)


## v0.2.0

- implemented automatic graph layout (through dagre)
- worked around update/measurement-related bug
- improved vertex layout by using display: table


## v0.1.0
