define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {'use strict';


  var ViewportMoved = (0, _immutable.Record)({ 
    left: null, 
    top: null, 
    type: function type() {return ViewportMoved;} }, 
  'ViewportMoved');

  var MinimapResized = (0, _immutable.Record)({ 
    width: null, 
    type: function type() {return MinimapResized;} }, 
  'MinimapResized');

  var ViewportMeasured = (0, _immutable.Record)({ 
    width: null, 
    height: null, 
    type: function type() {return ViewportMeasured;} }, 
  'ViewportMeasured');

  var ChangeMode = (0, _immutable.Record)({ 
    mode: null, 
    type: function type() {return ChangeMode;} }, 
  'ChangeMode');

  var HandleFocusReceived = (0, _immutable.Record)({ 
    domNode: null, 
    type: function type() {return HandleFocusReceived;} }, 
  'HandleFocusReceived');

  var HandleFocusLost = (0, _immutable.Record)({ 
    type: function type() {return HandleFocusLost;} }, 
  'HandleFocusLost');module.exports = 


  { 
    ViewportMoved: ViewportMoved, 
    ViewportMeasured: ViewportMeasured, 
    MinimapResized: MinimapResized, 
    ChangeMode: ChangeMode, 
    HandleFocusReceived: HandleFocusReceived, 
    HandleFocusLost: HandleFocusLost };});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L3NldHRpbmdzL3NldHRpbmdzLWFjdGlvbnMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQU0sYUFBYSxHQUFHLGVBSGIsTUFBTSxFQUdjO0FBQzNCLFFBQUksRUFBRSxJQUFJO0FBQ1YsT0FBRyxFQUFFLElBQUk7QUFDVCxRQUFJLEVBQUUsd0JBQU0sYUFBYSxFQUFBLEVBQzFCO0FBQUUsaUJBQWUsQ0FBQyxDQUFDOztBQUVwQixNQUFNLGNBQWMsR0FBRyxlQVRkLE1BQU0sRUFTZTtBQUM1QixTQUFLLEVBQUUsSUFBSTtBQUNYLFFBQUksRUFBRSx3QkFBTSxjQUFjLEVBQUEsRUFDM0I7QUFBRSxrQkFBZ0IsQ0FBQyxDQUFDOztBQUVyQixNQUFNLGdCQUFnQixHQUFHLGVBZGhCLE1BQU0sRUFjaUI7QUFDOUIsU0FBSyxFQUFFLElBQUk7QUFDWCxVQUFNLEVBQUUsSUFBSTtBQUNaLFFBQUksRUFBRSx3QkFBTSxnQkFBZ0IsRUFBQSxFQUM3QjtBQUFFLG9CQUFrQixDQUFDLENBQUM7O0FBRXZCLE1BQU0sVUFBVSxHQUFHLGVBcEJWLE1BQU0sRUFvQlc7QUFDeEIsUUFBSSxFQUFFLElBQUk7QUFDVixRQUFJLEVBQUUsd0JBQU0sVUFBVSxFQUFBLEVBQ3ZCO0FBQUUsY0FBWSxDQUFDLENBQUM7O0FBRWpCLE1BQU0sbUJBQW1CLEdBQUcsZUF6Qm5CLE1BQU0sRUF5Qm9CO0FBQ2pDLFdBQU8sRUFBRSxJQUFJO0FBQ2IsUUFBSSxFQUFFLHdCQUFNLG1CQUFtQixFQUFBLEVBQ2hDO0FBQUUsdUJBQXFCLENBQUMsQ0FBQzs7QUFFMUIsTUFBTSxlQUFlLEdBQUcsZUE5QmYsTUFBTSxFQThCZ0I7QUFDN0IsUUFBSSxFQUFFLHdCQUFNLGVBQWUsRUFBQSxFQUM1QjtBQUFFLG1CQUFpQixDQUFDLENBQUM7OztBQUdQO0FBQ2IsaUJBQWEsRUFBYixhQUFhO0FBQ2Isb0JBQWdCLEVBQWhCLGdCQUFnQjtBQUNoQixrQkFBYyxFQUFkLGNBQWM7QUFDZCxjQUFVLEVBQVYsVUFBVTtBQUNWLHVCQUFtQixFQUFuQixtQkFBbUI7QUFDbkIsbUJBQWUsRUFBZixlQUFlLEVBQ2hCIiwiZmlsZSI6InNldHRpbmdzLWFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuXG5jb25zdCBWaWV3cG9ydE1vdmVkID0gUmVjb3JkKHtcbiAgbGVmdDogbnVsbCxcbiAgdG9wOiBudWxsLFxuICB0eXBlOiAoKSA9PiBWaWV3cG9ydE1vdmVkXG59LCAnVmlld3BvcnRNb3ZlZCcpO1xuXG5jb25zdCBNaW5pbWFwUmVzaXplZCA9IFJlY29yZCh7XG4gIHdpZHRoOiBudWxsLFxuICB0eXBlOiAoKSA9PiBNaW5pbWFwUmVzaXplZFxufSwgJ01pbmltYXBSZXNpemVkJyk7XG5cbmNvbnN0IFZpZXdwb3J0TWVhc3VyZWQgPSBSZWNvcmQoe1xuICB3aWR0aDogbnVsbCxcbiAgaGVpZ2h0OiBudWxsLFxuICB0eXBlOiAoKSA9PiBWaWV3cG9ydE1lYXN1cmVkXG59LCAnVmlld3BvcnRNZWFzdXJlZCcpO1xuXG5jb25zdCBDaGFuZ2VNb2RlID0gUmVjb3JkKHtcbiAgbW9kZTogbnVsbCxcbiAgdHlwZTogKCkgPT4gQ2hhbmdlTW9kZVxufSwgJ0NoYW5nZU1vZGUnKTtcblxuY29uc3QgSGFuZGxlRm9jdXNSZWNlaXZlZCA9IFJlY29yZCh7XG4gIGRvbU5vZGU6IG51bGwsXG4gIHR5cGU6ICgpID0+IEhhbmRsZUZvY3VzUmVjZWl2ZWRcbn0sICdIYW5kbGVGb2N1c1JlY2VpdmVkJyk7XG5cbmNvbnN0IEhhbmRsZUZvY3VzTG9zdCA9IFJlY29yZCh7XG4gIHR5cGU6ICgpID0+IEhhbmRsZUZvY3VzTG9zdFxufSwgJ0hhbmRsZUZvY3VzTG9zdCcpO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgVmlld3BvcnRNb3ZlZCxcbiAgVmlld3BvcnRNZWFzdXJlZCxcbiAgTWluaW1hcFJlc2l6ZWQsXG4gIENoYW5nZU1vZGUsXG4gIEhhbmRsZUZvY3VzUmVjZWl2ZWQsXG4gIEhhbmRsZUZvY3VzTG9zdFxufTtcbiJdfQ==