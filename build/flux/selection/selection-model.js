define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {'use strict';

  var Clipboard = (0, _immutable.Record)({ 
    graph: (0, _immutable.Map)(), 
    layout: (0, _immutable.Map)() });


  var Selection = (0, _immutable.Record)({ 
    vertices: (0, _immutable.Set)(), 
    edges: (0, _immutable.Set)(), 
    extensionOf: null, 
    coords: null, 
    dimensions: null });module.exports = 


  { 
    Clipboard: Clipboard, 
    Selection: Selection };});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L3NlbGVjdGlvbi9zZWxlY3Rpb24tbW9kZWwuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxTQUFTLEdBQUcsZUFGQyxNQUFNLEVBRUE7QUFDdkIsU0FBSyxFQUFFLGVBSEEsR0FBRyxHQUdFO0FBQ1osVUFBTSxFQUFFLGVBSkQsR0FBRyxHQUlHLEVBQ2QsQ0FBQyxDQUFDOzs7QUFFSCxNQUFNLFNBQVMsR0FBRyxlQVBDLE1BQU0sRUFPQTtBQUN2QixZQUFRLEVBQUUsZUFSRSxHQUFHLEdBUUE7QUFDZixTQUFLLEVBQUUsZUFUSyxHQUFHLEdBU0g7QUFDWixlQUFXLEVBQUUsSUFBSTtBQUNqQixVQUFNLEVBQUUsSUFBSTtBQUNaLGNBQVUsRUFBRSxJQUFJLEVBQ2pCLENBQUMsQ0FBQzs7O0FBRVk7QUFDYixhQUFTLEVBQVQsU0FBUztBQUNULGFBQVMsRUFBVCxTQUFTLEVBQ1YiLCJmaWxlIjoic2VsZWN0aW9uLW1vZGVsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcCwgU2V0LCBSZWNvcmQgfSBmcm9tICdpbW11dGFibGUnO1xuXG5jb25zdCBDbGlwYm9hcmQgPSBSZWNvcmQoe1xuICBncmFwaDogTWFwKCksXG4gIGxheW91dDogTWFwKClcbn0pO1xuXG5jb25zdCBTZWxlY3Rpb24gPSBSZWNvcmQoe1xuICB2ZXJ0aWNlczogU2V0KCksXG4gIGVkZ2VzOiBTZXQoKSxcbiAgZXh0ZW5zaW9uT2Y6IG51bGwsXG4gIGNvb3JkczogbnVsbCxcbiAgZGltZW5zaW9uczogbnVsbFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQ2xpcGJvYXJkLFxuICBTZWxlY3Rpb25cbn07XG4iXX0=