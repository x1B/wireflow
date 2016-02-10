define(['exports', 'module', 'react', '../util/metrics', '../util/pathing', '../util/shallow-equal', '../util/settings', '../flux/graph/graph-model'], function (exports, module, _react, _utilMetrics, _utilPathing, _utilShallowEqual, _utilSettings, _fluxGraphGraphModel) {'use strict';var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);var _count = _interopRequireDefault(_utilMetrics);var _pathing = _interopRequireDefault(_utilPathing);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _settings = _interopRequireDefault(_utilSettings);var 









  edgeOffset = _settings['default'].layout.edgeOffset;var _ref = { $$typeof: _typeofReactElement, type: 'path', key: null, ref: null, props: {}, _owner: null };

  var Link = _React['default'].createClass({ displayName: 'Link', 

    render: function render() {var _props = 








      this.props;var fromPort = _props.fromPort;var toPort = _props.toPort;var fromLayout = _props.fromLayout;var toLayout = _props.toLayout;var fromMeasurements = _props.fromMeasurements;var toMeasurements = _props.toMeasurements;var isSelected = _props.isSelected;

      var type = (fromPort || toPort).type;

      var classes = ['nbe-link', 'nbe-type-' + type, isSelected ? 'nbe-selected' : ''].join(' ');
      (0, _count['default'])({ what: Link.displayName });

      if (!fromMeasurements || !toMeasurements) {
        // not measured (yet), e.g. just created
        return _ref;}


      var fromCoords = xy(fromLayout, fromMeasurements, fromPort, _fluxGraphGraphModel.OUT);
      var toCoords = xy(toLayout, toMeasurements, toPort, _fluxGraphGraphModel.IN);

      var boxes = [
      rect(fromLayout, fromMeasurements), 
      rect(toLayout, toMeasurements)];


      var data = _pathing['default'].cubic(fromCoords, toCoords, 1, boxes);

      return { $$typeof: _typeofReactElement, type: 'path', key: null, ref: null, props: { 
          className: classes, d: data }, _owner: null };}, 




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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xpbmsuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFVa0IsWUFBVSx3QkFBcEIsTUFBTSxDQUFJLFVBQVU7O0FBRTVCLE1BQU0sSUFBSSxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7QUFFN0IsVUFBTSxFQUFBLGtCQUFHOzs7Ozs7Ozs7QUFTSCxVQUFJLENBQUMsS0FBSyxLQVBaLFFBQVEsVUFBUixRQUFRLEtBQ1IsTUFBTSxVQUFOLE1BQU0sS0FDTixVQUFVLFVBQVYsVUFBVSxLQUNWLFFBQVEsVUFBUixRQUFRLEtBQ1IsZ0JBQWdCLFVBQWhCLGdCQUFnQixLQUNoQixjQUFjLFVBQWQsY0FBYyxLQUNkLFVBQVUsVUFBVixVQUFVOztBQUdaLFVBQU0sSUFBSSxHQUFHLENBQUUsUUFBUSxJQUFJLE1BQU0sQ0FBQSxDQUFHLElBQUksQ0FBQzs7QUFFekMsVUFBTSxPQUFPLEdBQUcsQ0FBRSxVQUFVLEVBQUUsV0FBVyxHQUFHLElBQUksRUFBRSxVQUFVLEdBQUcsY0FBYyxHQUFHLEVBQUUsQ0FBRSxDQUFDLElBQUksQ0FBRSxHQUFHLENBQUUsQ0FBQztBQUNqRyw2QkFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7QUFFbEMsVUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsY0FBYyxFQUFHOztBQUV6QyxvQkFBZ0IsQ0FDakI7OztBQUVELFVBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSx1QkE1QnBELEdBQUcsQ0E0QndELENBQUM7QUFDckUsVUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkE3QmhELEVBQUUsQ0E2Qm9ELENBQUM7O0FBRTVELFVBQU0sS0FBSyxHQUFHO0FBQ1osVUFBSSxDQUFFLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBRTtBQUNwQyxVQUFJLENBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBRSxDQUNqQyxDQUFDOzs7QUFFRixVQUFNLElBQUksR0FBRyxvQkFBUSxLQUFLLENBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFFLENBQUM7O0FBRTdEO0FBQ1EsbUJBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksbUJBQ2pDLENBQ0g7Ozs7O0FBR0QseUJBQXFCLEVBQUEsK0JBQUUsU0FBUyxFQUFHO0FBQ2pDLGFBQU8sQ0FBQyw4QkFBYyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDLENBQy9DLEVBRUYsQ0FBQyxDQUFDOzs7OztBQUVZLE1BQUk7OztBQUduQixXQUFTLEVBQUUsQ0FBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUc7QUFDbkQsUUFBSSxJQUFJLEVBQUc7QUFDRCxXQUFJLEdBQVUsTUFBTSxDQUFwQixJQUFJLEtBQUUsSUFBRyxHQUFLLE1BQU0sQ0FBZCxHQUFHO0FBQ2pCLFVBQU0sVUFBVSxHQUFHLFlBQVksQ0FBRSxTQUFTLENBQUUsQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBRSxDQUFDO0FBQzVELFVBQUksQ0FBQyxVQUFVLEVBQUc7O0FBRWhCLGVBQU8sQ0FBRSxLQUFJLEVBQUUsSUFBRyxDQUFFLENBQUMsQ0FDdEI7O0FBQ0QsYUFBTyxDQUFFLEtBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FDekQ7Ozs7UUFHTyxJQUFJLEdBQVUsTUFBTSxDQUFwQixJQUFJLEtBQUUsR0FBRyxHQUFLLE1BQU0sQ0FBZCxHQUFHO0FBQ2pCLFdBQU8sQ0FBRSxJQUFJLEdBQUcsVUFBVSxFQUFFLEdBQUcsR0FBRyxVQUFVLENBQUUsQ0FBQyxDQUNoRDs7OztBQUdELFdBQVMsSUFBSSxDQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUc7QUFDNUIsUUFBSSxHQUFVLE1BQU0sQ0FBcEIsSUFBSSxLQUFFLEdBQUcsR0FBSyxNQUFNLENBQWQsR0FBRztBQUN3QixnQkFBWSxDQUE3QyxVQUFVLEtBQUksS0FBSyw0QkFBTCxLQUFLLEtBQUUsTUFBTSw0QkFBTixNQUFNO0FBQ25DLFdBQU87QUFDTCxVQUFJLEVBQUUsSUFBSTtBQUNWLFNBQUcsRUFBRSxHQUFHO0FBQ1IsV0FBSyxFQUFFLElBQUksR0FBRyxLQUFLO0FBQ25CLFlBQU0sRUFBRSxHQUFHLEdBQUcsTUFBTSxFQUNyQixDQUFDLENBQ0giLCJmaWxlIjoibGluay5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgY291bnQgZnJvbSAnLi4vdXRpbC9tZXRyaWNzJztcbmltcG9ydCBwYXRoaW5nIGZyb20gJy4uL3V0aWwvcGF0aGluZyc7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgc2V0dGluZ3MgZnJvbSAnLi4vdXRpbC9zZXR0aW5ncyc7XG5cbmltcG9ydCB7IElOLCBPVVQgfSBmcm9tICcuLi9mbHV4L2dyYXBoL2dyYXBoLW1vZGVsJztcblxuXG5jb25zdCB7IGxheW91dDogeyBlZGdlT2Zmc2V0IH0gfSA9IHNldHRpbmdzO1xuXG5jb25zdCBMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBmcm9tUG9ydCxcbiAgICAgIHRvUG9ydCxcbiAgICAgIGZyb21MYXlvdXQsXG4gICAgICB0b0xheW91dCxcbiAgICAgIGZyb21NZWFzdXJlbWVudHMsXG4gICAgICB0b01lYXN1cmVtZW50cyxcbiAgICAgIGlzU2VsZWN0ZWRcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHR5cGUgPSAoIGZyb21Qb3J0IHx8IHRvUG9ydCApLnR5cGU7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gWyAnbmJlLWxpbmsnLCAnbmJlLXR5cGUtJyArIHR5cGUsIGlzU2VsZWN0ZWQgPyAnbmJlLXNlbGVjdGVkJyA6ICcnIF0uam9pbiggJyAnICk7XG4gICAgY291bnQoeyB3aGF0OiBMaW5rLmRpc3BsYXlOYW1lIH0pO1xuXG4gICAgaWYoICFmcm9tTWVhc3VyZW1lbnRzIHx8ICF0b01lYXN1cmVtZW50cyApIHtcbiAgICAgIC8vIG5vdCBtZWFzdXJlZCAoeWV0KSwgZS5nLiBqdXN0IGNyZWF0ZWRcbiAgICAgIHJldHVybiA8cGF0aCAvPjtcbiAgICB9XG5cbiAgICBjb25zdCBmcm9tQ29vcmRzID0geHkoIGZyb21MYXlvdXQsIGZyb21NZWFzdXJlbWVudHMsIGZyb21Qb3J0LCBPVVQgKTtcbiAgICBjb25zdCB0b0Nvb3JkcyA9IHh5KCB0b0xheW91dCwgdG9NZWFzdXJlbWVudHMsIHRvUG9ydCwgSU4gKTtcblxuICAgIGNvbnN0IGJveGVzID0gW1xuICAgICAgcmVjdCggZnJvbUxheW91dCwgZnJvbU1lYXN1cmVtZW50cyApLFxuICAgICAgcmVjdCggdG9MYXlvdXQsIHRvTWVhc3VyZW1lbnRzIClcbiAgICBdO1xuXG4gICAgY29uc3QgZGF0YSA9IHBhdGhpbmcuY3ViaWMoIGZyb21Db29yZHMsIHRvQ29vcmRzLCAxLCBib3hlcyApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxwYXRoIGNsYXNzTmFtZT17Y2xhc3Nlc30gZD17ZGF0YX0gLz5cbiAgICApO1xuICB9LFxuXG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBMaW5rO1xuXG5cbmZ1bmN0aW9uIHh5KCBjb29yZHMsIG1lYXN1cmVtZW50cywgcG9ydCwgZGlyZWN0aW9uICkge1xuICBpZiggcG9ydCApIHtcbiAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gY29vcmRzO1xuICAgIGNvbnN0IHBvcnRPZmZzZXQgPSBtZWFzdXJlbWVudHNbIGRpcmVjdGlvbiBdLmdldCggcG9ydC5pZCApO1xuICAgIGlmKCAhcG9ydE9mZnNldCApIHtcbiAgICAgIC8vIDpUT0RPOiBpbXBsZW1lbnQgc21hcnRlciBtZWFzdXJlbWVudHMuXG4gICAgICByZXR1cm4gWyBsZWZ0LCB0b3AgXTtcbiAgICB9XG4gICAgcmV0dXJuIFsgbGVmdCArIHBvcnRPZmZzZXQubGVmdCwgdG9wICsgcG9ydE9mZnNldC50b3AgXTtcbiAgfVxuXG4gIC8vIGVkZ2U6XG4gIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBjb29yZHM7XG4gIHJldHVybiBbIGxlZnQgKyBlZGdlT2Zmc2V0LCB0b3AgKyBlZGdlT2Zmc2V0IF07XG59XG5cblxuZnVuY3Rpb24gcmVjdCggY29vcmRzLCBtZWFzdXJlbWVudHMgKSB7XG4gIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBjb29yZHM7XG4gIGNvbnN0IHsgZGltZW5zaW9uczogeyB3aWR0aCwgaGVpZ2h0fSB9ID0gbWVhc3VyZW1lbnRzO1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IGxlZnQsXG4gICAgdG9wOiB0b3AsXG4gICAgcmlnaHQ6IGxlZnQgKyB3aWR0aCxcbiAgICBib3R0b206IHRvcCArIGhlaWdodFxuICB9O1xufVxuIl19