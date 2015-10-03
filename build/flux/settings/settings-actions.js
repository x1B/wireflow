define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {
  'use strict';

  var ViewportMoved = (0, _immutable.Record)({
    left: null,
    top: null,
    type: function type() {
      return ViewportMoved;
    }
  }, 'ViewportMoved');

  var MinimapResized = (0, _immutable.Record)({
    width: null,
    type: function type() {
      return MinimapResized;
    }
  }, 'MinimapResized');

  var ViewportMeasured = (0, _immutable.Record)({
    width: null,
    height: null,
    type: function type() {
      return ViewportMeasured;
    }
  }, 'ViewportMeasured');

  var ChangeMode = (0, _immutable.Record)({
    mode: null,
    type: function type() {
      return ChangeMode;
    }
  }, 'ChangeMode');

  var HandleFocusReceived = (0, _immutable.Record)({
    domNode: null,
    type: function type() {
      return HandleFocusReceived;
    }
  }, 'HandleFocusReceived');

  var HandleFocusLost = (0, _immutable.Record)({
    type: function type() {
      return HandleFocusLost;
    }
  }, 'HandleFocusLost');

  module.exports = {
    ViewportMoved: ViewportMoved,
    ViewportMeasured: ViewportMeasured,
    MinimapResized: MinimapResized,
    ChangeMode: ChangeMode,
    HandleFocusReceived: HandleFocusReceived,
    HandleFocusLost: HandleFocusLost
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L3NldHRpbmdzL3NldHRpbmdzLWFjdGlvbnMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQU0sYUFBYSxHQUFHLGVBSGIsTUFBTSxFQUdjO0FBQzNCLFFBQUksRUFBRSxJQUFJO0FBQ1YsT0FBRyxFQUFFLElBQUk7QUFDVCxRQUFJLEVBQUU7YUFBTSxhQUFhO0tBQUE7R0FDMUIsRUFBRSxlQUFlLENBQUMsQ0FBQzs7QUFFcEIsTUFBTSxjQUFjLEdBQUcsZUFUZCxNQUFNLEVBU2U7QUFDNUIsU0FBSyxFQUFFLElBQUk7QUFDWCxRQUFJLEVBQUU7YUFBTSxjQUFjO0tBQUE7R0FDM0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOztBQUVyQixNQUFNLGdCQUFnQixHQUFHLGVBZGhCLE1BQU0sRUFjaUI7QUFDOUIsU0FBSyxFQUFFLElBQUk7QUFDWCxVQUFNLEVBQUUsSUFBSTtBQUNaLFFBQUksRUFBRTthQUFNLGdCQUFnQjtLQUFBO0dBQzdCLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzs7QUFFdkIsTUFBTSxVQUFVLEdBQUcsZUFwQlYsTUFBTSxFQW9CVztBQUN4QixRQUFJLEVBQUUsSUFBSTtBQUNWLFFBQUksRUFBRTthQUFNLFVBQVU7S0FBQTtHQUN2QixFQUFFLFlBQVksQ0FBQyxDQUFDOztBQUVqQixNQUFNLG1CQUFtQixHQUFHLGVBekJuQixNQUFNLEVBeUJvQjtBQUNqQyxXQUFPLEVBQUUsSUFBSTtBQUNiLFFBQUksRUFBRTthQUFNLG1CQUFtQjtLQUFBO0dBQ2hDLEVBQUUscUJBQXFCLENBQUMsQ0FBQzs7QUFFMUIsTUFBTSxlQUFlLEdBQUcsZUE5QmYsTUFBTSxFQThCZ0I7QUFDN0IsUUFBSSxFQUFFO2FBQU0sZUFBZTtLQUFBO0dBQzVCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzs7bUJBR1A7QUFDYixpQkFBYSxFQUFiLGFBQWE7QUFDYixvQkFBZ0IsRUFBaEIsZ0JBQWdCO0FBQ2hCLGtCQUFjLEVBQWQsY0FBYztBQUNkLGNBQVUsRUFBVixVQUFVO0FBQ1YsdUJBQW1CLEVBQW5CLG1CQUFtQjtBQUNuQixtQkFBZSxFQUFmLGVBQWU7R0FDaEIiLCJmaWxlIjoic2V0dGluZ3MtYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWNvcmQgfSBmcm9tICdpbW11dGFibGUnO1xuXG5cbmNvbnN0IFZpZXdwb3J0TW92ZWQgPSBSZWNvcmQoe1xuICBsZWZ0OiBudWxsLFxuICB0b3A6IG51bGwsXG4gIHR5cGU6ICgpID0+IFZpZXdwb3J0TW92ZWRcbn0sICdWaWV3cG9ydE1vdmVkJyk7XG5cbmNvbnN0IE1pbmltYXBSZXNpemVkID0gUmVjb3JkKHtcbiAgd2lkdGg6IG51bGwsXG4gIHR5cGU6ICgpID0+IE1pbmltYXBSZXNpemVkXG59LCAnTWluaW1hcFJlc2l6ZWQnKTtcblxuY29uc3QgVmlld3BvcnRNZWFzdXJlZCA9IFJlY29yZCh7XG4gIHdpZHRoOiBudWxsLFxuICBoZWlnaHQ6IG51bGwsXG4gIHR5cGU6ICgpID0+IFZpZXdwb3J0TWVhc3VyZWRcbn0sICdWaWV3cG9ydE1lYXN1cmVkJyk7XG5cbmNvbnN0IENoYW5nZU1vZGUgPSBSZWNvcmQoe1xuICBtb2RlOiBudWxsLFxuICB0eXBlOiAoKSA9PiBDaGFuZ2VNb2RlXG59LCAnQ2hhbmdlTW9kZScpO1xuXG5jb25zdCBIYW5kbGVGb2N1c1JlY2VpdmVkID0gUmVjb3JkKHtcbiAgZG9tTm9kZTogbnVsbCxcbiAgdHlwZTogKCkgPT4gSGFuZGxlRm9jdXNSZWNlaXZlZFxufSwgJ0hhbmRsZUZvY3VzUmVjZWl2ZWQnKTtcblxuY29uc3QgSGFuZGxlRm9jdXNMb3N0ID0gUmVjb3JkKHtcbiAgdHlwZTogKCkgPT4gSGFuZGxlRm9jdXNMb3N0XG59LCAnSGFuZGxlRm9jdXNMb3N0Jyk7XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBWaWV3cG9ydE1vdmVkLFxuICBWaWV3cG9ydE1lYXN1cmVkLFxuICBNaW5pbWFwUmVzaXplZCxcbiAgQ2hhbmdlTW9kZSxcbiAgSGFuZGxlRm9jdXNSZWNlaXZlZCxcbiAgSGFuZGxlRm9jdXNMb3N0XG59O1xuIl19