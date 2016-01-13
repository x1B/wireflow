define(['exports', 'module', 'react', '../util/pathing', '../flux/graph/graph-model', '../flux/layout/layout-model'], function (exports, module, _react, _utilPathing, _fluxGraphGraphModel, _fluxLayoutLayoutModel) {'use strict';var _slicedToArray = (function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i['return']) _i['return']();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError('Invalid attempt to destructure non-iterable instance');}};})();






  var GhostPort = _react.createClass({ displayName: 'GhostPort', 

    render: function render() {var 
      dragInfo = this.props.dragInfo;
      if (!dragInfo) {
        return _react.createElement('g', null);}var 


      port = dragInfo.port;var portCoords = dragInfo.portCoords;var mouseCoords = dragInfo.mouseCoords;
      var portBox = rect(portCoords, (0, _fluxLayoutLayoutModel.Dimensions)({ width: 10, height: 10 }));
      var mouseBox = rect(mouseCoords, (0, _fluxLayoutLayoutModel.Dimensions)({ width: 1, height: 1 }));var _ref = 

      port.direction === _fluxGraphGraphModel.OUT ? 
      [portCoords, mouseCoords] : 
      [mouseCoords, portCoords];var _ref2 = _slicedToArray(_ref, 2);var fromCoords = _ref2[0];var toCoords = _ref2[1];var _ref3 = 

      port.direction === _fluxGraphGraphModel.OUT ? 
      [portBox, mouseBox] : 
      [mouseBox, portBox];var _ref32 = _slicedToArray(_ref3, 2);var fromBox = _ref32[0];var toBox = _ref32[1];

      var data = _utilPathing.cubic(
      xy(fromCoords), xy(toCoords), 1, [fromBox, toBox]);


      var classes = 'nbe-link nbe-ghost nbe-type-' + port.type;
      return _react.createElement('path', { className: classes, d: data });} });





  function xy(coord) {
    return [coord.left, coord.top];}



  function rect(coords, dimensions) {
    return { 
      left: coords.left, 
      top: coords.top, 
      right: coords.left + dimensions.width, 
      bottom: coords.top + dimensions.height };}module.exports = 



  GhostPort;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2dob3N0LXBvcnQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFPQSxNQUFNLFNBQVMsR0FBRyxPQUFNLFdBQVcsQ0FBQzs7QUFFbEMsVUFBTSxFQUFBLGtCQUFHO0FBQ0MsY0FBUSxHQUFLLElBQUksQ0FBQyxLQUFLLENBQXZCLFFBQVE7QUFDaEIsVUFBSSxDQUFDLFFBQVEsRUFBRztBQUNkLGVBQU8sK0JBQUssQ0FBQyxDQUNkOzs7QUFFTyxVQUFJLEdBQThCLFFBQVEsQ0FBMUMsSUFBSSxLQUFFLFVBQVUsR0FBa0IsUUFBUSxDQUFwQyxVQUFVLEtBQUUsV0FBVyxHQUFLLFFBQVEsQ0FBeEIsV0FBVztBQUNyQyxVQUFNLE9BQU8sR0FBRyxJQUFJLENBQUUsVUFBVSxFQUFFLDJCQVo3QixVQUFVLEVBWThCLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBRSxDQUFDO0FBQzFFLFVBQU0sUUFBUSxHQUFHLElBQUksQ0FBRSxXQUFXLEVBQUUsMkJBYi9CLFVBQVUsRUFhZ0MsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7O0FBRXpDLFVBQUksQ0FBQyxTQUFTLDBCQWhCMUMsR0FBRyxBQWdCK0M7QUFDckQsT0FBRSxVQUFVLEVBQUUsV0FBVyxDQUFFO0FBQzNCLE9BQUUsV0FBVyxFQUFFLFVBQVUsQ0FBRSx5Q0FGckIsVUFBVSxnQkFBRSxRQUFROztBQUlELFVBQUksQ0FBQyxTQUFTLDBCQXBCcEMsR0FBRyxBQW9CeUM7QUFDL0MsT0FBRSxPQUFPLEVBQUUsUUFBUSxDQUFFO0FBQ3JCLE9BQUUsUUFBUSxFQUFFLE9BQU8sQ0FBRSwyQ0FGZixPQUFPLGlCQUFFLEtBQUs7O0FBSXRCLFVBQU0sSUFBSSxHQUFHLGFBQVEsS0FBSztBQUN4QixRQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFFLE9BQU8sRUFBRSxLQUFLLENBQUUsQ0FDcEQsQ0FBQzs7O0FBRUYsVUFBTSxPQUFPLG9DQUFrQyxJQUFJLENBQUMsSUFBSSxBQUFFLENBQUM7QUFDM0QsYUFBTywrQkFBTSxTQUFTLEVBQUUsT0FBTyxBQUFDLEVBQUMsQ0FBQyxFQUFFLElBQUksQUFBQyxHQUFHLENBQUMsQ0FDOUMsRUFFRixDQUFDLENBQUM7Ozs7OztBQUdILFdBQVMsRUFBRSxDQUFFLEtBQUssRUFBRztBQUNuQixXQUFPLENBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FDbEM7Ozs7QUFHRCxXQUFTLElBQUksQ0FBRSxNQUFNLEVBQUUsVUFBVSxFQUFHO0FBQ2xDLFdBQU87QUFDTCxVQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7QUFDakIsU0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHO0FBQ2YsV0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUs7QUFDckMsWUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFDdkMsQ0FBQyxDQUNIOzs7O0FBRWMsV0FBUyIsImZpbGUiOiJnaG9zdC1wb3J0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0ICogYXMgcGF0aGluZyBmcm9tICcuLi91dGlsL3BhdGhpbmcnO1xuaW1wb3J0IHsgT1VUIH0gZnJvbSAnLi4vZmx1eC9ncmFwaC9ncmFwaC1tb2RlbCc7XG5pbXBvcnQgeyBEaW1lbnNpb25zIH0gZnJvbSAnLi4vZmx1eC9sYXlvdXQvbGF5b3V0LW1vZGVsJztcblxuXG5jb25zdCBHaG9zdFBvcnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZHJhZ0luZm8gfSA9IHRoaXMucHJvcHM7XG4gICAgaWYoICFkcmFnSW5mbyApIHtcbiAgICAgIHJldHVybiA8ZyAvPjtcbiAgICB9XG5cbiAgICBjb25zdCB7IHBvcnQsIHBvcnRDb29yZHMsIG1vdXNlQ29vcmRzIH0gPSBkcmFnSW5mbztcbiAgICBjb25zdCBwb3J0Qm94ID0gcmVjdCggcG9ydENvb3JkcywgRGltZW5zaW9ucyh7IHdpZHRoOiAxMCwgaGVpZ2h0OiAxMCB9KSApO1xuICAgIGNvbnN0IG1vdXNlQm94ID0gcmVjdCggbW91c2VDb29yZHMsIERpbWVuc2lvbnMoeyB3aWR0aDogMSwgaGVpZ2h0OiAxIH0pICk7XG5cbiAgICBjb25zdCBbIGZyb21Db29yZHMsIHRvQ29vcmRzIF0gPSBwb3J0LmRpcmVjdGlvbiA9PT0gT1VUID9cbiAgICAgIFsgcG9ydENvb3JkcywgbW91c2VDb29yZHMgXSA6XG4gICAgICBbIG1vdXNlQ29vcmRzLCBwb3J0Q29vcmRzIF07XG5cbiAgICBjb25zdCBbIGZyb21Cb3gsIHRvQm94IF0gPSBwb3J0LmRpcmVjdGlvbiA9PT0gT1VUID9cbiAgICAgIFsgcG9ydEJveCwgbW91c2VCb3ggXSA6XG4gICAgICBbIG1vdXNlQm94LCBwb3J0Qm94IF07XG5cbiAgICBjb25zdCBkYXRhID0gcGF0aGluZy5jdWJpYyhcbiAgICAgIHh5KGZyb21Db29yZHMpLCB4eSh0b0Nvb3JkcyksIDEsIFsgZnJvbUJveCwgdG9Cb3ggXVxuICAgICk7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gYG5iZS1saW5rIG5iZS1naG9zdCBuYmUtdHlwZS0ke3BvcnQudHlwZX1gO1xuICAgIHJldHVybiA8cGF0aCBjbGFzc05hbWU9e2NsYXNzZXN9IGQ9e2RhdGF9IC8+O1xuICB9XG5cbn0pO1xuXG5cbmZ1bmN0aW9uIHh5KCBjb29yZCApIHtcbiAgcmV0dXJuIFsgY29vcmQubGVmdCwgY29vcmQudG9wIF07XG59XG5cblxuZnVuY3Rpb24gcmVjdCggY29vcmRzLCBkaW1lbnNpb25zICkge1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IGNvb3Jkcy5sZWZ0LFxuICAgIHRvcDogY29vcmRzLnRvcCxcbiAgICByaWdodDogY29vcmRzLmxlZnQgKyBkaW1lbnNpb25zLndpZHRoLFxuICAgIGJvdHRvbTogY29vcmRzLnRvcCArIGRpbWVuc2lvbnMuaGVpZ2h0XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdob3N0UG9ydDtcbiJdfQ==