define(['exports', 'module', 'react'], function (exports, module, _react) {'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);


  var SelectionBox = _React['default'].createClass({ displayName: 'SelectionBox', 

    render: function render() {var _props = 
      this.props;var coords = _props.coords;var dimensions = _props.dimensions;
      if (!dimensions) {
        var _style = { display: 'none' };
        return _React['default'].createElement('div', { style: _style });}


      var style = { 
        left: coords.left, 
        top: coords.top, 
        width: dimensions.width, 
        height: dimensions.height };


      return _React['default'].createElement('div', { className: 'nbe-selection', style: style });} });module.exports = 




  SelectionBox;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGlvbi1ib3guanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQU0sWUFBWSxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7QUFFckMsVUFBTSxFQUFBLGtCQUFHO0FBQ3dCLFVBQUksQ0FBQyxLQUFLLEtBQWpDLE1BQU0sVUFBTixNQUFNLEtBQUUsVUFBVSxVQUFWLFVBQVU7QUFDMUIsVUFBSSxDQUFDLFVBQVUsRUFBRztBQUNoQixZQUFNLE1BQUssR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUNsQyxlQUFPLHlDQUFLLEtBQUssRUFBRSxNQUFLLEFBQUMsR0FBRyxDQUFDLENBQzlCOzs7QUFFRCxVQUFNLEtBQUssR0FBRztBQUNaLFlBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtBQUNqQixXQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7QUFDZixhQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7QUFDdkIsY0FBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQzFCLENBQUM7OztBQUVGLGFBQU8seUNBQUssU0FBUyxFQUFDLGVBQWUsRUFBQyxLQUFLLEVBQUUsS0FBSyxBQUFDLEdBQUcsQ0FBQyxDQUN4RCxFQUVGLENBQUMsQ0FBQzs7Ozs7QUFFWSxjQUFZIiwiZmlsZSI6InNlbGVjdGlvbi1ib3guanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuXG5jb25zdCBTZWxlY3Rpb25Cb3ggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY29vcmRzLCBkaW1lbnNpb25zIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmKCAhZGltZW5zaW9ucyApIHtcbiAgICAgIGNvbnN0IHN0eWxlID0geyBkaXNwbGF5OiAnbm9uZScgfTtcbiAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZX0gLz47XG4gICAgfVxuXG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICBsZWZ0OiBjb29yZHMubGVmdCxcbiAgICAgIHRvcDogY29vcmRzLnRvcCxcbiAgICAgIHdpZHRoOiBkaW1lbnNpb25zLndpZHRoLFxuICAgICAgaGVpZ2h0OiBkaW1lbnNpb25zLmhlaWdodFxuICAgIH07XG5cbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJuYmUtc2VsZWN0aW9uXCIgc3R5bGU9e3N0eWxlfSAvPjtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0aW9uQm94O1xuIl19