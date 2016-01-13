define(['exports', 'module', 'react', '../util/metrics', '../util/pathing', '../util/shallow-equal', '../util/settings', '../flux/graph/graph-model'], function (exports, module, _react, _utilMetrics, _utilPathing, _utilShallowEqual, _utilSettings, _fluxGraphGraphModel) {'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);var _count = _interopRequireDefault(_utilMetrics);var _pathing = _interopRequireDefault(_utilPathing);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _settings = _interopRequireDefault(_utilSettings);var 









  edgeOffset = _settings['default'].layout.edgeOffset;

  var Link = _React['default'].createClass({ displayName: 'Link', 

    render: function render() {var _props = 








      this.props;var fromPort = _props.fromPort;var toPort = _props.toPort;var fromLayout = _props.fromLayout;var toLayout = _props.toLayout;var fromMeasurements = _props.fromMeasurements;var toMeasurements = _props.toMeasurements;var isSelected = _props.isSelected;

      var type = (fromPort || toPort).type;

      var classes = ['nbe-link', 'nbe-type-' + type, isSelected ? 'nbe-selected' : ''].join(' ');
      (0, _count['default'])({ what: Link.displayName });

      if (!fromMeasurements || !toMeasurements) {
        // not measured (yet), e.g. just created
        return _React['default'].createElement('path', null);}


      var fromCoords = xy(fromLayout, fromMeasurements, fromPort, _fluxGraphGraphModel.OUT);
      var toCoords = xy(toLayout, toMeasurements, toPort, _fluxGraphGraphModel.IN);

      var boxes = [
      rect(fromLayout, fromMeasurements), 
      rect(toLayout, toMeasurements)];


      var data = _pathing['default'].cubic(fromCoords, toCoords, 1, boxes);

      return (
        _React['default'].createElement('path', { className: classes, d: data }));}, 




    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);} });module.exports = 




  Link;


  function xy(coords, measurements, port, direction) {
    if (port) {var 
      _left = coords.left;var _top = coords.top;
      var portOffset = measurements[direction].get(port.id);
      if (!portOffset) {
        // :TODO: implement smarter measurements.
        return [_left, _top];}

      return [_left + portOffset.left, _top + portOffset.top];}


    // edge:
    var left = coords.left;var top = coords.top;
    return [left + edgeOffset, top + edgeOffset];}



  function rect(coords, measurements) {var 
    left = coords.left;var top = coords.top;var _measurements$dimensions = 
    measurements.dimensions;var width = _measurements$dimensions.width;var height = _measurements$dimensions.height;
    return { 
      left: left, 
      top: top, 
      right: left + width, 
      bottom: top + height };}});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xpbmsuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFVa0IsWUFBVSx3QkFBcEIsTUFBTSxDQUFJLFVBQVU7O0FBRTVCLE1BQU0sSUFBSSxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7QUFFN0IsVUFBTSxFQUFBLGtCQUFHOzs7Ozs7Ozs7QUFTSCxVQUFJLENBQUMsS0FBSyxLQVBaLFFBQVEsVUFBUixRQUFRLEtBQ1IsTUFBTSxVQUFOLE1BQU0sS0FDTixVQUFVLFVBQVYsVUFBVSxLQUNWLFFBQVEsVUFBUixRQUFRLEtBQ1IsZ0JBQWdCLFVBQWhCLGdCQUFnQixLQUNoQixjQUFjLFVBQWQsY0FBYyxLQUNkLFVBQVUsVUFBVixVQUFVOztBQUdaLFVBQU0sSUFBSSxHQUFHLENBQUUsUUFBUSxJQUFJLE1BQU0sQ0FBQSxDQUFHLElBQUksQ0FBQzs7QUFFekMsVUFBTSxPQUFPLEdBQUcsQ0FBRSxVQUFVLEVBQUUsV0FBVyxHQUFHLElBQUksRUFBRSxVQUFVLEdBQUcsY0FBYyxHQUFHLEVBQUUsQ0FBRSxDQUFDLElBQUksQ0FBRSxHQUFHLENBQUUsQ0FBQztBQUNqRyw2QkFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7QUFFbEMsVUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsY0FBYyxFQUFHOztBQUV6QyxlQUFPLDZDQUFRLENBQUMsQ0FDakI7OztBQUVELFVBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSx1QkE1QnBELEdBQUcsQ0E0QndELENBQUM7QUFDckUsVUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkE3QmhELEVBQUUsQ0E2Qm9ELENBQUM7O0FBRTVELFVBQU0sS0FBSyxHQUFHO0FBQ1osVUFBSSxDQUFFLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBRTtBQUNwQyxVQUFJLENBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBRSxDQUNqQyxDQUFDOzs7QUFFRixVQUFNLElBQUksR0FBRyxvQkFBUSxLQUFLLENBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFFLENBQUM7O0FBRTdEO0FBQ0Usa0RBQU0sU0FBUyxFQUFFLE9BQU8sQUFBQyxFQUFDLENBQUMsRUFBRSxJQUFJLEFBQUMsR0FBRyxFQUNyQyxDQUNIOzs7OztBQUdELHlCQUFxQixFQUFBLCtCQUFFLFNBQVMsRUFBRztBQUNqQyxhQUFPLENBQUMsOEJBQWMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUMvQyxFQUVGLENBQUMsQ0FBQzs7Ozs7QUFFWSxNQUFJOzs7QUFHbkIsV0FBUyxFQUFFLENBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFHO0FBQ25ELFFBQUksSUFBSSxFQUFHO0FBQ0QsV0FBSSxHQUFVLE1BQU0sQ0FBcEIsSUFBSSxLQUFFLElBQUcsR0FBSyxNQUFNLENBQWQsR0FBRztBQUNqQixVQUFNLFVBQVUsR0FBRyxZQUFZLENBQUUsU0FBUyxDQUFFLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxFQUFFLENBQUUsQ0FBQztBQUM1RCxVQUFJLENBQUMsVUFBVSxFQUFHOztBQUVoQixlQUFPLENBQUUsS0FBSSxFQUFFLElBQUcsQ0FBRSxDQUFDLENBQ3RCOztBQUNELGFBQU8sQ0FBRSxLQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQ3pEOzs7O1FBR08sSUFBSSxHQUFVLE1BQU0sQ0FBcEIsSUFBSSxLQUFFLEdBQUcsR0FBSyxNQUFNLENBQWQsR0FBRztBQUNqQixXQUFPLENBQUUsSUFBSSxHQUFHLFVBQVUsRUFBRSxHQUFHLEdBQUcsVUFBVSxDQUFFLENBQUMsQ0FDaEQ7Ozs7QUFHRCxXQUFTLElBQUksQ0FBRSxNQUFNLEVBQUUsWUFBWSxFQUFHO0FBQzVCLFFBQUksR0FBVSxNQUFNLENBQXBCLElBQUksS0FBRSxHQUFHLEdBQUssTUFBTSxDQUFkLEdBQUc7QUFDd0IsZ0JBQVksQ0FBN0MsVUFBVSxLQUFJLEtBQUssNEJBQUwsS0FBSyxLQUFFLE1BQU0sNEJBQU4sTUFBTTtBQUNuQyxXQUFPO0FBQ0wsVUFBSSxFQUFFLElBQUk7QUFDVixTQUFHLEVBQUUsR0FBRztBQUNSLFdBQUssRUFBRSxJQUFJLEdBQUcsS0FBSztBQUNuQixZQUFNLEVBQUUsR0FBRyxHQUFHLE1BQU0sRUFDckIsQ0FBQyxDQUNIIiwiZmlsZSI6ImxpbmsuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IGNvdW50IGZyb20gJy4uL3V0aWwvbWV0cmljcyc7XG5pbXBvcnQgcGF0aGluZyBmcm9tICcuLi91dGlsL3BhdGhpbmcnO1xuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlsL3NoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4uL3V0aWwvc2V0dGluZ3MnO1xuXG5pbXBvcnQgeyBJTiwgT1VUIH0gZnJvbSAnLi4vZmx1eC9ncmFwaC9ncmFwaC1tb2RlbCc7XG5cblxuY29uc3QgeyBsYXlvdXQ6IHsgZWRnZU9mZnNldCB9IH0gPSBzZXR0aW5ncztcblxuY29uc3QgTGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZnJvbVBvcnQsXG4gICAgICB0b1BvcnQsXG4gICAgICBmcm9tTGF5b3V0LFxuICAgICAgdG9MYXlvdXQsXG4gICAgICBmcm9tTWVhc3VyZW1lbnRzLFxuICAgICAgdG9NZWFzdXJlbWVudHMsXG4gICAgICBpc1NlbGVjdGVkXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB0eXBlID0gKCBmcm9tUG9ydCB8fCB0b1BvcnQgKS50eXBlO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IFsgJ25iZS1saW5rJywgJ25iZS10eXBlLScgKyB0eXBlLCBpc1NlbGVjdGVkID8gJ25iZS1zZWxlY3RlZCcgOiAnJyBdLmpvaW4oICcgJyApO1xuICAgIGNvdW50KHsgd2hhdDogTGluay5kaXNwbGF5TmFtZSB9KTtcblxuICAgIGlmKCAhZnJvbU1lYXN1cmVtZW50cyB8fCAhdG9NZWFzdXJlbWVudHMgKSB7XG4gICAgICAvLyBub3QgbWVhc3VyZWQgKHlldCksIGUuZy4ganVzdCBjcmVhdGVkXG4gICAgICByZXR1cm4gPHBhdGggLz47XG4gICAgfVxuXG4gICAgY29uc3QgZnJvbUNvb3JkcyA9IHh5KCBmcm9tTGF5b3V0LCBmcm9tTWVhc3VyZW1lbnRzLCBmcm9tUG9ydCwgT1VUICk7XG4gICAgY29uc3QgdG9Db29yZHMgPSB4eSggdG9MYXlvdXQsIHRvTWVhc3VyZW1lbnRzLCB0b1BvcnQsIElOICk7XG5cbiAgICBjb25zdCBib3hlcyA9IFtcbiAgICAgIHJlY3QoIGZyb21MYXlvdXQsIGZyb21NZWFzdXJlbWVudHMgKSxcbiAgICAgIHJlY3QoIHRvTGF5b3V0LCB0b01lYXN1cmVtZW50cyApXG4gICAgXTtcblxuICAgIGNvbnN0IGRhdGEgPSBwYXRoaW5nLmN1YmljKCBmcm9tQ29vcmRzLCB0b0Nvb3JkcywgMSwgYm94ZXMgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8cGF0aCBjbGFzc05hbWU9e2NsYXNzZXN9IGQ9e2RhdGF9IC8+XG4gICAgKTtcbiAgfSxcblxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTGluaztcblxuXG5mdW5jdGlvbiB4eSggY29vcmRzLCBtZWFzdXJlbWVudHMsIHBvcnQsIGRpcmVjdGlvbiApIHtcbiAgaWYoIHBvcnQgKSB7XG4gICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IGNvb3JkcztcbiAgICBjb25zdCBwb3J0T2Zmc2V0ID0gbWVhc3VyZW1lbnRzWyBkaXJlY3Rpb24gXS5nZXQoIHBvcnQuaWQgKTtcbiAgICBpZiggIXBvcnRPZmZzZXQgKSB7XG4gICAgICAvLyA6VE9ETzogaW1wbGVtZW50IHNtYXJ0ZXIgbWVhc3VyZW1lbnRzLlxuICAgICAgcmV0dXJuIFsgbGVmdCwgdG9wIF07XG4gICAgfVxuICAgIHJldHVybiBbIGxlZnQgKyBwb3J0T2Zmc2V0LmxlZnQsIHRvcCArIHBvcnRPZmZzZXQudG9wIF07XG4gIH1cblxuICAvLyBlZGdlOlxuICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gY29vcmRzO1xuICByZXR1cm4gWyBsZWZ0ICsgZWRnZU9mZnNldCwgdG9wICsgZWRnZU9mZnNldCBdO1xufVxuXG5cbmZ1bmN0aW9uIHJlY3QoIGNvb3JkcywgbWVhc3VyZW1lbnRzICkge1xuICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gY29vcmRzO1xuICBjb25zdCB7IGRpbWVuc2lvbnM6IHsgd2lkdGgsIGhlaWdodH0gfSA9IG1lYXN1cmVtZW50cztcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBsZWZ0LFxuICAgIHRvcDogdG9wLFxuICAgIHJpZ2h0OiBsZWZ0ICsgd2lkdGgsXG4gICAgYm90dG9tOiB0b3AgKyBoZWlnaHRcbiAgfTtcbn1cbiJdfQ==