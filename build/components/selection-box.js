define(['exports', 'module', 'react'], function (exports, module, _react) {'use strict';var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);


  var SelectionBox = _React['default'].createClass({ displayName: 'SelectionBox', 

    render: function render() {var _props = 
      this.props;var coords = _props.coords;var dimensions = _props.dimensions;
      if (!dimensions) {
        var _style = { display: 'none' };
        return { $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { style: _style }, _owner: null };}


      var style = { 
        left: coords.left, 
        top: coords.top, 
        width: dimensions.width, 
        height: dimensions.height };


      return { $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { className: 'nbe-selection', style: style }, _owner: null };} });module.exports = 




  SelectionBox;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3NlbGVjdGlvbi1ib3guanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQU0sWUFBWSxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7QUFFckMsVUFBTSxFQUFBLGtCQUFHO0FBQ3dCLFVBQUksQ0FBQyxLQUFLLEtBQWpDLE1BQU0sVUFBTixNQUFNLEtBQUUsVUFBVSxVQUFWLFVBQVU7QUFDMUIsVUFBSSxDQUFDLFVBQVUsRUFBRztBQUNoQixZQUFNLE1BQUssR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztBQUNsQyw0RkFBWSxLQUFLLEVBQUUsTUFBSyxtQkFBSyxDQUM5Qjs7O0FBRUQsVUFBTSxLQUFLLEdBQUc7QUFDWixZQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7QUFDakIsV0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHO0FBQ2YsYUFBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO0FBQ3ZCLGNBQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxFQUMxQixDQUFDOzs7QUFFRiwwRkFBWSxTQUFTLEVBQUMsZUFBZSxFQUFDLEtBQUssRUFBRSxLQUFLLG1CQUFLLENBQ3hELEVBRUYsQ0FBQyxDQUFDOzs7OztBQUVZLGNBQVkiLCJmaWxlIjoic2VsZWN0aW9uLWJveC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5cbmNvbnN0IFNlbGVjdGlvbkJveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjb29yZHMsIGRpbWVuc2lvbnMgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYoICFkaW1lbnNpb25zICkge1xuICAgICAgY29uc3Qgc3R5bGUgPSB7IGRpc3BsYXk6ICdub25lJyB9O1xuICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3N0eWxlfSAvPjtcbiAgICB9XG5cbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIGxlZnQ6IGNvb3Jkcy5sZWZ0LFxuICAgICAgdG9wOiBjb29yZHMudG9wLFxuICAgICAgd2lkdGg6IGRpbWVuc2lvbnMud2lkdGgsXG4gICAgICBoZWlnaHQ6IGRpbWVuc2lvbnMuaGVpZ2h0XG4gICAgfTtcblxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1zZWxlY3Rpb25cIiBzdHlsZT17c3R5bGV9IC8+O1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3Rpb25Cb3g7XG4iXX0=