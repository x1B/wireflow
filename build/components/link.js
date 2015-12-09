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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xpbmsuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFVa0IsWUFBVSx3QkFBcEIsTUFBTSxDQUFJLFVBQVU7O0FBRTVCLE1BQU0sSUFBSSxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7QUFFN0IsVUFBTSxFQUFBLGtCQUFHOzs7Ozs7Ozs7O0FBVUgsVUFBSSxDQUFDLEtBQUssS0FQWixRQUFRLFVBQVIsUUFBUSxLQUNSLE1BQU0sVUFBTixNQUFNLEtBQ04sVUFBVSxVQUFWLFVBQVUsS0FDVixRQUFRLFVBQVIsUUFBUSxLQUNSLGdCQUFnQixVQUFoQixnQkFBZ0IsS0FDaEIsY0FBYyxVQUFkLGNBQWMsS0FDZCxVQUFVLFVBQVYsVUFBVTs7QUFHWixVQUFNLElBQUksR0FBRyxDQUFFLFFBQVEsSUFBSSxNQUFNLENBQUEsQ0FBRyxJQUFJLENBQUM7O0FBRXpDLFVBQU0sT0FBTyxHQUFHLENBQUUsVUFBVSxFQUFFLFdBQVcsR0FBRyxJQUFJLEVBQUUsVUFBVSxHQUFHLGNBQWMsR0FBRyxFQUFFLENBQUUsQ0FBQyxJQUFJLENBQUUsR0FBRyxDQUFFLENBQUM7QUFDakcsNkJBQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7O0FBRWxDLFVBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLGNBQWMsRUFBRzs7QUFFekMsZUFBTyw2Q0FBUSxDQUFDLENBQ2pCOzs7QUFFRCxVQUFNLFVBQVUsR0FBRyxFQUFFLENBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsdUJBN0JwRCxHQUFHLENBNkJ3RCxDQUFDO0FBQ3JFLFVBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBOUJoRCxFQUFFLENBOEJvRCxDQUFDOztBQUU1RCxVQUFNLEtBQUssR0FBRztBQUNaLFVBQUksQ0FBRSxVQUFVLEVBQUUsZ0JBQWdCLENBQUU7QUFDcEMsVUFBSSxDQUFFLFFBQVEsRUFBRSxjQUFjLENBQUUsQ0FDakMsQ0FBQzs7O0FBRUYsVUFBTSxJQUFJLEdBQUcsb0JBQVEsS0FBSyxDQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBRSxDQUFDOztBQUU3RDtBQUNFLGtEQUFNLFNBQVMsRUFBRSxPQUFPLEFBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxBQUFDLEdBQUcsRUFDckMsQ0FDSDs7Ozs7QUFHRCx5QkFBcUIsRUFBQSwrQkFBRSxTQUFTLEVBQUc7QUFDakMsYUFBTyxDQUFDLDhCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FDL0MsRUFFRixDQUFDLENBQUM7Ozs7O0FBRVksTUFBSTs7O0FBR25CLFdBQVMsRUFBRSxDQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRztBQUNuRCxRQUFJLElBQUksRUFBRztBQUNELFdBQUksR0FBVSxNQUFNLENBQXBCLElBQUksS0FBRSxJQUFHLEdBQUssTUFBTSxDQUFkLEdBQUc7QUFDakIsVUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFFLFNBQVMsQ0FBRSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFFLENBQUM7QUFDNUQsVUFBSSxDQUFDLFVBQVUsRUFBRzs7QUFFaEIsZUFBTyxDQUFFLEtBQUksRUFBRSxJQUFHLENBQUUsQ0FBQyxDQUN0Qjs7QUFDRCxhQUFPLENBQUUsS0FBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUN6RDs7OztRQUdPLElBQUksR0FBVSxNQUFNLENBQXBCLElBQUksS0FBRSxHQUFHLEdBQUssTUFBTSxDQUFkLEdBQUc7QUFDakIsV0FBTyxDQUFFLElBQUksR0FBRyxVQUFVLEVBQUUsR0FBRyxHQUFHLFVBQVUsQ0FBRSxDQUFDLENBQ2hEOzs7O0FBR0QsV0FBUyxJQUFJLENBQUUsTUFBTSxFQUFFLFlBQVksRUFBRztBQUM1QixRQUFJLEdBQVUsTUFBTSxDQUFwQixJQUFJLEtBQUUsR0FBRyxHQUFLLE1BQU0sQ0FBZCxHQUFHO0FBQ3dCLGdCQUFZLENBQTdDLFVBQVUsS0FBSSxLQUFLLDRCQUFMLEtBQUssS0FBRSxNQUFNLDRCQUFOLE1BQU07QUFDbkMsV0FBTztBQUNMLFVBQUksRUFBRSxJQUFJO0FBQ1YsU0FBRyxFQUFFLEdBQUc7QUFDUixXQUFLLEVBQUUsSUFBSSxHQUFHLEtBQUs7QUFDbkIsWUFBTSxFQUFFLEdBQUcsR0FBRyxNQUFNLEVBQ3JCLENBQUMsQ0FDSCIsImZpbGUiOiJsaW5rLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuaW1wb3J0IHBhdGhpbmcgZnJvbSAnLi4vdXRpbC9wYXRoaW5nJztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbC9zaGFsbG93LWVxdWFsJztcbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuLi91dGlsL3NldHRpbmdzJztcblxuaW1wb3J0IHsgSU4sIE9VVCB9IGZyb20gJy4uL2ZsdXgvZ3JhcGgvZ3JhcGgtbW9kZWwnO1xuXG5cbmNvbnN0IHsgbGF5b3V0OiB7IGVkZ2VPZmZzZXQgfSB9ID0gc2V0dGluZ3M7XG5cbmNvbnN0IExpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgY29uc3Qge1xuICAgICAgZnJvbVBvcnQsXG4gICAgICB0b1BvcnQsXG4gICAgICBmcm9tTGF5b3V0LFxuICAgICAgdG9MYXlvdXQsXG4gICAgICBmcm9tTWVhc3VyZW1lbnRzLFxuICAgICAgdG9NZWFzdXJlbWVudHMsXG4gICAgICBpc1NlbGVjdGVkXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB0eXBlID0gKCBmcm9tUG9ydCB8fCB0b1BvcnQgKS50eXBlO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IFsgJ25iZS1saW5rJywgJ25iZS10eXBlLScgKyB0eXBlLCBpc1NlbGVjdGVkID8gJ25iZS1zZWxlY3RlZCcgOiAnJyBdLmpvaW4oICcgJyApO1xuICAgIGNvdW50KHsgd2hhdDogTGluay5kaXNwbGF5TmFtZSB9KTtcblxuICAgIGlmKCAhZnJvbU1lYXN1cmVtZW50cyB8fCAhdG9NZWFzdXJlbWVudHMgKSB7XG4gICAgICAvLyBub3QgbWVhc3VyZWQgKHlldCksIGUuZy4ganVzdCBjcmVhdGVkXG4gICAgICByZXR1cm4gPHBhdGggLz47XG4gICAgfVxuXG4gICAgY29uc3QgZnJvbUNvb3JkcyA9IHh5KCBmcm9tTGF5b3V0LCBmcm9tTWVhc3VyZW1lbnRzLCBmcm9tUG9ydCwgT1VUICk7XG4gICAgY29uc3QgdG9Db29yZHMgPSB4eSggdG9MYXlvdXQsIHRvTWVhc3VyZW1lbnRzLCB0b1BvcnQsIElOICk7XG5cbiAgICBjb25zdCBib3hlcyA9IFtcbiAgICAgIHJlY3QoIGZyb21MYXlvdXQsIGZyb21NZWFzdXJlbWVudHMgKSxcbiAgICAgIHJlY3QoIHRvTGF5b3V0LCB0b01lYXN1cmVtZW50cyApXG4gICAgXTtcblxuICAgIGNvbnN0IGRhdGEgPSBwYXRoaW5nLmN1YmljKCBmcm9tQ29vcmRzLCB0b0Nvb3JkcywgMSwgYm94ZXMgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8cGF0aCBjbGFzc05hbWU9e2NsYXNzZXN9IGQ9e2RhdGF9IC8+XG4gICAgKTtcbiAgfSxcblxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTGluaztcblxuXG5mdW5jdGlvbiB4eSggY29vcmRzLCBtZWFzdXJlbWVudHMsIHBvcnQsIGRpcmVjdGlvbiApIHtcbiAgaWYoIHBvcnQgKSB7XG4gICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IGNvb3JkcztcbiAgICBjb25zdCBwb3J0T2Zmc2V0ID0gbWVhc3VyZW1lbnRzWyBkaXJlY3Rpb24gXS5nZXQoIHBvcnQuaWQgKTtcbiAgICBpZiggIXBvcnRPZmZzZXQgKSB7XG4gICAgICAvLyA6VE9ETzogaW1wbGVtZW50IHNtYXJ0ZXIgbWVhc3VyZW1lbnRzLlxuICAgICAgcmV0dXJuIFsgbGVmdCwgdG9wIF07XG4gICAgfVxuICAgIHJldHVybiBbIGxlZnQgKyBwb3J0T2Zmc2V0LmxlZnQsIHRvcCArIHBvcnRPZmZzZXQudG9wIF07XG4gIH1cblxuICAvLyBlZGdlOlxuICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gY29vcmRzO1xuICByZXR1cm4gWyBsZWZ0ICsgZWRnZU9mZnNldCwgdG9wICsgZWRnZU9mZnNldCBdO1xufVxuXG5cbmZ1bmN0aW9uIHJlY3QoIGNvb3JkcywgbWVhc3VyZW1lbnRzICkge1xuICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gY29vcmRzO1xuICBjb25zdCB7IGRpbWVuc2lvbnM6IHsgd2lkdGgsIGhlaWdodH0gfSA9IG1lYXN1cmVtZW50cztcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBsZWZ0LFxuICAgIHRvcDogdG9wLFxuICAgIHJpZ2h0OiBsZWZ0ICsgd2lkdGgsXG4gICAgYm90dG9tOiB0b3AgKyBoZWlnaHRcbiAgfTtcbn1cbiJdfQ==