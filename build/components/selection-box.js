define(['exports', 'module', 'react'], function (exports, module, _react) {
  'use strict';

  var SelectionBox = _react.createClass({
    displayName: 'SelectionBox',

    render: function render() {
      var _props = this.props;
      var coords = _props.coords;
      var dimensions = _props.dimensions;

      if (!dimensions) {
        var _style = { display: 'none' };
        return _react.createElement('div', { style: _style });
      }

      var style = {
        left: coords.left,
        top: coords.top,
        width: dimensions.width,
        height: dimensions.height
      };

      return _react.createElement('div', { className: 'nbe-selection', style: style });
    }

  });

  module.exports = SelectionBox;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGlvbi1ib3guanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQU0sWUFBWSxHQUFHLE9BQU0sV0FBVyxDQUFDOzs7QUFFckMsVUFBTSxFQUFBLGtCQUFHO21CQUN3QixJQUFJLENBQUMsS0FBSztVQUFqQyxNQUFNLFVBQU4sTUFBTTtVQUFFLFVBQVUsVUFBVixVQUFVOztBQUMxQixVQUFJLENBQUMsVUFBVSxFQUFHO0FBQ2hCLFlBQU0sTUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ2xDLGVBQU8sOEJBQUssS0FBSyxFQUFFLE1BQUssR0FBSSxDQUFDO09BQzlCOztBQUVELFVBQU0sS0FBSyxHQUFHO0FBQ1osWUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO0FBQ2pCLFdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRztBQUNmLGFBQUssRUFBRSxVQUFVLENBQUMsS0FBSztBQUN2QixjQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU07T0FDMUIsQ0FBQzs7QUFFRixhQUFPLDhCQUFLLFNBQVMsRUFBQyxlQUFlLEVBQUMsS0FBSyxFQUFFLEtBQUssR0FBSSxDQUFDO0tBQ3hEOztHQUVGLENBQUMsQ0FBQzs7bUJBRVksWUFBWSIsImZpbGUiOiJzZWxlY3Rpb24tYm94LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuXG5jb25zdCBTZWxlY3Rpb25Cb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY29vcmRzLCBkaW1lbnNpb25zIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmKCAhZGltZW5zaW9ucyApIHtcbiAgICAgIGNvbnN0IHN0eWxlID0geyBkaXNwbGF5OiAnbm9uZScgfTtcbiAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZX0gLz47XG4gICAgfVxuXG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBsZWZ0OiBjb29yZHMubGVmdCxcbiAgICAgIHRvcDogY29vcmRzLnRvcCxcbiAgICAgIHdpZHRoOiBkaW1lbnNpb25zLndpZHRoLFxuICAgICAgaGVpZ2h0OiBkaW1lbnNpb25zLmhlaWdodFxuICAgIH07XG5cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuYmUtc2VsZWN0aW9uXCIgc3R5bGU9e3N0eWxlfSAvPjtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0aW9uQm94O1xuIl19