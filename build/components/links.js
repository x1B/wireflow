define(['exports', 'module', 'react', '../util/shallow-equal', '../util/metrics', '../flux/graph/graph-model', './link'], function (exports, module, _react, _utilShallowEqual, _utilMetrics, _fluxGraphGraphModel, _link) {'use strict';var _slicedToArray = (function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i['return']) _i['return']();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError('Invalid attempt to destructure non-iterable instance');}};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _count = _interopRequireDefault(_utilMetrics);var _Link = _interopRequireDefault(_link);








  var Links = _React['default'].createClass({ displayName: 'Links', 

    render: function render() {var _props = 

      this.props;var measurements = _props.measurements;var layout = _props.layout;var vertices = _props.vertices;var types = _props.types;var selection = _props.selection;
      if (layout.vertices.isEmpty() && layout.edges.isEmpty()) {
        return _React['default'].createElement('g', null);}

      (0, _count['default'])({ what: Links.displayName });

      return _React['default'].createElement('g', null, renderLinks());

      function renderLinks() {
        if (measurements.vertices.isEmpty()) {
          return [];}

        var vertexIds = vertices.keySeq();
        // lookup table for representing 1:n/n:1 edges as port-to-port links
        var neighborTable = createNeighborLookupByEdgeId(vertexIds.toJS());
        return _fluxGraphGraphModel.Directions.flatMap(function (direction) {return (
            vertexIds.flatMap(function (vertexId) {return (
                links(vertexId, direction, neighborTable));}));});}




      function links(vertexId, direction, neighborTable) {
        var vertex = vertices.get(vertexId);
        var vertexLayout = layout.vertices.get(vertexId);
        var vertexMeasurements = measurements.vertices.get(vertexId);
        var edgeLayouts = layout.edges;
        var edgeMeasurements = measurements.edges;

        // Is the link outbound wrt the current vertex?
        var isOutbound = direction === _fluxGraphGraphModel.OUT;
        var otherDirection = isOutbound ? _fluxGraphGraphModel.IN : _fluxGraphGraphModel.OUT;

        var hereSelected = selection.vertices.has(vertexId);

        return vertex.ports[direction].
        filter(hasExactlyOneNeighbor(isOutbound)).
        map(function (port) {
          var edgeId = port.edgeId;

          var hereLayout = vertexLayout;
          var hereMeasurements = vertexMeasurements;
          var herePort = port;

          var owningPort = types.get(port.type).owningPort;var _ref = 
          owningPort ? 
          neighborTable[otherDirection][edgeId] : 
          [edgeLayouts.get(edgeId), edgeMeasurements.get(edgeId), '', selection.edges.has(edgeId)];var _ref2 = _slicedToArray(_ref, 4);var thereLayout = _ref2[0];var thereMeasurements = _ref2[1];var therePort = _ref2[2];var thereSelected = _ref2[3];var _ref3 = 

          isOutbound ? 
          [hereLayout, thereLayout] : 
          [thereLayout, hereLayout];var _ref32 = _slicedToArray(_ref3, 2);var fromLayout = _ref32[0];var toLayout = _ref32[1];var _ref4 = 

          isOutbound ? 
          [hereMeasurements, thereMeasurements] : 
          [thereMeasurements, hereMeasurements];var _ref42 = _slicedToArray(_ref4, 2);var fromMeasurements = _ref42[0];var toMeasurements = _ref42[1];var _ref5 = 

          isOutbound ? 
          [herePort, therePort] : 
          [therePort, herePort];var _ref52 = _slicedToArray(_ref5, 2);var fromPort = _ref52[0];var toPort = _ref52[1];

          return _React['default'].createElement(_Link['default'], { key: vertexId + '/' + port.id, 
            fromPort: fromPort, 
            toPort: toPort, 
            fromLayout: fromLayout, 
            toLayout: toLayout, 
            fromMeasurements: fromMeasurements, 
            toMeasurements: toMeasurements, 
            isSelected: hereSelected || thereSelected });});}



      // Make sure each link is drawn from one side only.
      function hasExactlyOneNeighbor(isOutbound) {
        return function (port) {
          if (!port.edgeId) {
            return false;}

          var type = types.get(port.type);
          if (!type.owningPort) {
            return true;}

          return type.owningPort === (isOutbound ? _fluxGraphGraphModel.IN : _fluxGraphGraphModel.OUT);};}



      function createNeighborLookupByEdgeId(vertexIds) {
        var lut = {};
        _fluxGraphGraphModel.Directions.forEach(function (direction) {
          var matchingMeasurements = lut[direction] = {};
          vertexIds.forEach(function (id) {
            var vertexMeasurements = measurements.vertices.get(id);
            var vertexLayout = layout.vertices.get(id);
            vertices.get(id).ports[direction].forEach(function (port) {
              var edgeId = port.edgeId;
              if (edgeId) {
                matchingMeasurements[edgeId] = [
                vertexLayout, 
                vertexMeasurements, 
                port, 
                selection.vertices.has(id)];}});});});





        return lut;}}, 




    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);} });module.exports = 




  Links;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xpbmtzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFTQSxNQUFNLEtBQUssR0FBRyxrQkFBTSxXQUFXLENBQUM7O0FBRTlCLFVBQU0sRUFBQSxrQkFBRzs7QUFFc0QsVUFBSSxDQUFDLEtBQUssS0FBL0QsWUFBWSxVQUFaLFlBQVksS0FBRSxNQUFNLFVBQU4sTUFBTSxLQUFFLFFBQVEsVUFBUixRQUFRLEtBQUUsS0FBSyxVQUFMLEtBQUssS0FBRSxTQUFTLFVBQVQsU0FBUztBQUN4RCxVQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRztBQUN4RCxlQUFPLDBDQUFLLENBQUMsQ0FDZDs7QUFDRCw2QkFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7QUFFbkMsYUFBTywyQ0FBSSxXQUFXLEVBQUUsQ0FBSyxDQUFDOztBQUU5QixlQUFTLFdBQVcsR0FBRztBQUNyQixZQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUc7QUFDcEMsaUJBQU8sRUFBRSxDQUFDLENBQ1g7O0FBQ0QsWUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDOztBQUVwQyxZQUFNLGFBQWEsR0FBRyw0QkFBNEIsQ0FBRSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQztBQUN2RSxlQUFPLHFCQXZCSixVQUFVLENBdUJLLE9BQU8sQ0FBRSxVQUFBLFNBQVM7QUFDbEMscUJBQVMsQ0FBQyxPQUFPLENBQUUsVUFBQSxRQUFRO0FBQ3pCLHFCQUFLLENBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUUsR0FBQSxDQUM1QyxHQUFBLENBQ0YsQ0FBQyxDQUNIOzs7OztBQUVELGVBQVMsS0FBSyxDQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFHO0FB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QUFxQixFQUFBLCtCQUFFLFNBQVMsRUFBRztBQUNqQyxhQUFPLENBQUMsOEJBQWMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUMvQyxFQUVGLENBQUMsQ0FBQzs7Ozs7QUFFWSxPQUFLIiwiZmlsZSI6ImxpbmtzLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbC9zaGFsbG93LWVxdWFsJztcbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25zLCBJTiwgT1VUIH0gZnJvbSAnLi4vZmx1eC9ncmFwaC9ncmFwaC1tb2RlbCc7XG5pbXBvcnQgTGluayBmcm9tICcuL2xpbmsnO1xuXG5cbmNvbnN0IExpbmtzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IHsgbWVhc3VyZW1lbnRzLCBsYXlvdXQsIHZlcnRpY2VzLCB0eXBlcywgc2VsZWN0aW9uIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmKCBsYXlvdXQudmVydGljZXMuaXNFbXB0eSgpICYmIGxheW91dC5lZGdlcy5pc0VtcHR5KCkgKSB7XG4gICAgICByZXR1cm4gPGcgLz47XG4gICAgfVxuICAgIGNvdW50KHsgd2hhdDogTGlua3MuZGlzcGxheU5hbWUgfSk7XG5cbiAgICByZXR1cm4gPGc+e3JlbmRlckxpbmtzKCl9PC9nPjtcblxuICAgIGZ1bmN0aW9uIHJlbmRlckxpbmtzKCkge1xuICAgICAgaWYoIG1lYXN1cmVtZW50cy52ZXJ0aWNlcy5pc0VtcHR5KCkgKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZlcnRleElkcyA9IHZlcnRpY2VzLmtleVNlcSgpO1xuICAgICAgLy8gbG9va3VwIHRhYmxlIGZvciByZXByZXNlbnRpbmcgMTpuL246MSBlZGdlcyBhcyBwb3J0LXRvLXBvcnQgbGlua3NcbiAgICAgIGNvbnN0IG5laWdoYm9yVGFibGUgPSBjcmVhdGVOZWlnaGJvckxvb2t1cEJ5RWRnZUlkKCB2ZXJ0ZXhJZHMudG9KUygpICk7XG4gICAgICByZXR1cm4gRGlyZWN0aW9ucy5mbGF0TWFwKCBkaXJlY3Rpb24gPT5cbiAgICAgICAgdmVydGV4SWRzLmZsYXRNYXAoIHZlcnRleElkID0+XG4gICAgICAgICAgbGlua3MoIHZlcnRleElkLCBkaXJlY3Rpb24sIG5laWdoYm9yVGFibGUgKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxpbmtzKCB2ZXJ0ZXhJZCwgZGlyZWN0aW9uLCBuZWlnaGJvclRhYmxlICkge1xuICAgICAgY29uc3QgdmVydGV4ID0gdmVydGljZXMuZ2V0KCB2ZXJ0ZXhJZCApO1xuICAgICAgY29uc3QgdmVydGV4TGF5b3V0ID0gbGF5b3V0LnZlcnRpY2VzLmdldCggdmVydGV4SWQgKTtcbiAgICAgIGNvbnN0IHZlcnRleE1lYXN1cmVtZW50cyA9IG1lYXN1cmVtZW50cy52ZXJ0aWNlcy5nZXQoIHZlcnRleElkICk7XG4gICAgICBjb25zdCBlZGdlTGF5b3V0cyA9IGxheW91dC5lZGdlcztcbiAgICAgIGNvbnN0IGVkZ2VNZWFzdXJlbWVudHMgPSBtZWFzdXJlbWVudHMuZWRnZXM7XG5cbiAgICAgIC8vIElzIHRoZSBsaW5rIG91dGJvdW5kIHdydCB0aGUgY3VycmVudCB2ZXJ0ZXg/XG4gICAgICBjb25zdCBpc091dGJvdW5kID0gZGlyZWN0aW9uID09PSBPVVQ7XG4gICAgICBjb25zdCBvdGhlckRpcmVjdGlvbiA9IGlzT3V0Ym91bmQgPyBJTiA6IE9VVDtcblxuICAgICAgY29uc3QgaGVyZVNlbGVjdGVkID0gc2VsZWN0aW9uLnZlcnRpY2VzLmhhcyggdmVydGV4SWQgKTtcblxuICAgICAgcmV0dXJuIHZlcnRleC5wb3J0c1sgZGlyZWN0aW9uIF1cbiAgICAgICAgLmZpbHRlciggaGFzRXhhY3RseU9uZU5laWdoYm9yKCBpc091dGJvdW5kICkgKVxuICAgICAgICAubWFwKCBwb3J0ID0+IHtcbiAgICAgICAgICBjb25zdCBlZGdlSWQgPSBwb3J0LmVkZ2VJZDtcblxuICAgICAgICAgIGNvbnN0IGhlcmVMYXlvdXQgPSB2ZXJ0ZXhMYXlvdXQ7XG4gICAgICAgICAgY29uc3QgaGVyZU1lYXN1cmVtZW50cyA9IHZlcnRleE1lYXN1cmVtZW50cztcbiAgICAgICAgICBjb25zdCBoZXJlUG9ydCA9IHBvcnQ7XG5cbiAgICAgICAgICBjb25zdCBvd25pbmdQb3J0ID0gdHlwZXMuZ2V0KCBwb3J0LnR5cGUgKS5vd25pbmdQb3J0O1xuICAgICAgICAgIGNvbnN0IFsgdGhlcmVMYXlvdXQsIHRoZXJlTWVhc3VyZW1lbnRzLCB0aGVyZVBvcnQsIHRoZXJlU2VsZWN0ZWQgXSA9IG93bmluZ1BvcnQgP1xuICAgICAgICAgICAgbmVpZ2hib3JUYWJsZVsgb3RoZXJEaXJlY3Rpb24gXVsgZWRnZUlkIF0gOlxuICAgICAgICAgICAgWyBlZGdlTGF5b3V0cy5nZXQoIGVkZ2VJZCApLCBlZGdlTWVhc3VyZW1lbnRzLmdldCggZWRnZUlkICksICcnLCBzZWxlY3Rpb24uZWRnZXMuaGFzKCBlZGdlSWQgKSBdO1xuXG4gICAgICAgICAgY29uc3QgWyBmcm9tTGF5b3V0LCB0b0xheW91dCBdID0gaXNPdXRib3VuZCA/XG4gICAgICAgICAgICBbIGhlcmVMYXlvdXQsIHRoZXJlTGF5b3V0IF0gOlxuICAgICAgICAgICAgWyB0aGVyZUxheW91dCwgaGVyZUxheW91dCBdO1xuXG4gICAgICAgICAgY29uc3QgWyBmcm9tTWVhc3VyZW1lbnRzLCB0b01lYXN1cmVtZW50cyBdID0gaXNPdXRib3VuZCA/XG4gICAgICAgICAgICBbIGhlcmVNZWFzdXJlbWVudHMsIHRoZXJlTWVhc3VyZW1lbnRzIF0gOlxuICAgICAgICAgICAgWyB0aGVyZU1lYXN1cmVtZW50cywgaGVyZU1lYXN1cmVtZW50cyBdO1xuXG4gICAgICAgICAgY29uc3QgWyBmcm9tUG9ydCwgdG9Qb3J0IF0gPSBpc091dGJvdW5kID9cbiAgICAgICAgICAgIFsgaGVyZVBvcnQsIHRoZXJlUG9ydCBdIDpcbiAgICAgICAgICAgIFsgdGhlcmVQb3J0LCBoZXJlUG9ydCBdO1xuXG4gICAgICAgICAgcmV0dXJuIDxMaW5rIGtleT17dmVydGV4SWQgKyAnLycgKyBwb3J0LmlkfVxuICAgICAgICAgICAgICAgICAgICAgICBmcm9tUG9ydD17ZnJvbVBvcnR9XG4gICAgICAgICAgICAgICAgICAgICAgIHRvUG9ydD17dG9Qb3J0fVxuICAgICAgICAgICAgICAgICAgICAgICBmcm9tTGF5b3V0PXtmcm9tTGF5b3V0fVxuICAgICAgICAgICAgICAgICAgICAgICB0b0xheW91dD17dG9MYXlvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgIGZyb21NZWFzdXJlbWVudHM9e2Zyb21NZWFzdXJlbWVudHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHRvTWVhc3VyZW1lbnRzPXt0b01lYXN1cmVtZW50c31cbiAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZD17aGVyZVNlbGVjdGVkIHx8IHRoZXJlU2VsZWN0ZWR9IC8+O1xuICAgICAgfSApO1xuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSBlYWNoIGxpbmsgaXMgZHJhd24gZnJvbSBvbmUgc2lkZSBvbmx5LlxuICAgIGZ1bmN0aW9uIGhhc0V4YWN0bHlPbmVOZWlnaGJvciggaXNPdXRib3VuZCApIHtcbiAgICAgIHJldHVybiBwb3J0ID0+IHtcbiAgICAgICAgaWYoICFwb3J0LmVkZ2VJZCApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVzLmdldCggcG9ydC50eXBlICk7XG4gICAgICAgIGlmKCAhdHlwZS5vd25pbmdQb3J0ICkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlLm93bmluZ1BvcnQgPT09ICggaXNPdXRib3VuZCA/IElOIDogT1VUICk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU5laWdoYm9yTG9va3VwQnlFZGdlSWQoIHZlcnRleElkcyApIHtcbiAgICAgIGNvbnN0IGx1dCA9IHt9O1xuICAgICAgRGlyZWN0aW9ucy5mb3JFYWNoKCBkaXJlY3Rpb24gPT4ge1xuICAgICAgICBjb25zdCBtYXRjaGluZ01lYXN1cmVtZW50cyA9IGx1dFsgZGlyZWN0aW9uIF0gPSB7fTtcbiAgICAgICAgdmVydGV4SWRzLmZvckVhY2goIGlkID0+IHtcbiAgICAgICAgICBjb25zdCB2ZXJ0ZXhNZWFzdXJlbWVudHMgPSBtZWFzdXJlbWVudHMudmVydGljZXMuZ2V0KCBpZCApO1xuICAgICAgICAgIGNvbnN0IHZlcnRleExheW91dCA9IGxheW91dC52ZXJ0aWNlcy5nZXQoIGlkICk7XG4gICAgICAgICAgdmVydGljZXMuZ2V0KCBpZCApLnBvcnRzWyBkaXJlY3Rpb24gXS5mb3JFYWNoKCBwb3J0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVkZ2VJZCA9IHBvcnQuZWRnZUlkO1xuICAgICAgICAgICAgaWYoIGVkZ2VJZCApIHtcbiAgICAgICAgICAgICAgbWF0Y2hpbmdNZWFzdXJlbWVudHNbIGVkZ2VJZCBdID0gW1xuICAgICAgICAgICAgICAgIHZlcnRleExheW91dCxcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhNZWFzdXJlbWVudHMsXG4gICAgICAgICAgICAgICAgcG9ydCxcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24udmVydGljZXMuaGFzKCBpZCApXG4gICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSApO1xuICAgICAgICB9ICk7XG4gICAgICB9ICk7XG4gICAgICByZXR1cm4gbHV0O1xuICAgIH1cblxuICB9LFxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTGlua3M7XG4iXX0=