define(['exports', 'module', 'react', './link', '../model', '../util/metrics', '../util/shallow-equal'], function (exports, module, _react, _link, _model, _utilMetrics, _utilShallowEqual) {
  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _count = _interopRequireDefault(_utilMetrics);

  var Links = _react.createClass({
    displayName: 'Links',

    render: function render() {
      var _props = this.props;
      var measurements = _props.measurements;
      var layout = _props.layout;
      var vertices = _props.vertices;
      var types = _props.types;
      var eventHandler = _props.eventHandler;

      (0, _count['default'])({ what: Links.displayName });

      return _react.createElement(
        'svg',
        null,
        renderLinks()
      );

      function renderLinks() {
        if (measurements.vertices.isEmpty()) {
          return [];
        }
        var vertexIds = vertices.keySeq();
        // lookup table for representing 1:n/n:1 edges as port-to-port links
        var neighborTable = createNeighborLookupByEdgeId(vertexIds.toJS());
        return _model.Directions.flatMap(function (direction) {
          return vertexIds.flatMap(function (vertexId) {
            return links(vertexId, direction, neighborTable);
          });
        });
      }

      function links(vertexId, direction, neighborTable) {
        var vertex = vertices.get(vertexId);
        var vertexLayout = layout.vertices.get(vertexId);
        var vertexMeasurements = measurements.vertices.get(vertexId);
        var edgeLayouts = layout.edges;
        var edgeMeasurements = measurements.edges;

        // Is the link outbound wrt the current vertex?
        var isOutbound = direction === _model.OUT;
        var otherDirection = isOutbound ? _model.IN : _model.OUT;

        return vertex.ports[direction].filter(hasExactlyOneNeighbor(isOutbound)).map(function (port) {
          var edgeId = port.edgeId;

          var hereLayout = vertexLayout;
          var hereMeasurements = vertexMeasurements;
          var herePort = port;

          var owningPort = types.get(port.type).owningPort;

          var _ref = owningPort ? neighborTable[otherDirection][edgeId] : [edgeLayouts.get(edgeId), edgeMeasurements.get(edgeId), ''];

          var _ref2 = _slicedToArray(_ref, 3);

          var thereLayout = _ref2[0];
          var thereMeasurements = _ref2[1];
          var therePort = _ref2[2];

          var _ref3 = isOutbound ? [hereLayout, thereLayout] : [thereLayout, hereLayout];

          var _ref32 = _slicedToArray(_ref3, 2);

          var fromLayout = _ref32[0];
          var toLayout = _ref32[1];

          var _ref4 = isOutbound ? [hereMeasurements, thereMeasurements] : [thereMeasurements, hereMeasurements];

          var _ref42 = _slicedToArray(_ref4, 2);

          var fromMeasurements = _ref42[0];
          var toMeasurements = _ref42[1];

          var _ref5 = isOutbound ? [herePort, therePort] : [therePort, herePort];

          var _ref52 = _slicedToArray(_ref5, 2);

          var fromPort = _ref52[0];
          var toPort = _ref52[1];

          return _react.createElement(_link, { key: vertexId + '/' + port.id,
            eventHandler: eventHandler,
            fromPort: fromPort,
            toPort: toPort,
            fromLayout: fromLayout,
            toLayout: toLayout,
            fromMeasurements: fromMeasurements,
            toMeasurements: toMeasurements });
        });
      }

      // Make sure each link is drawn from one side only.
      function hasExactlyOneNeighbor(isOutbound) {
        return function (port) {
          if (!port.edgeId) {
            return false;
          }
          var type = types.get(port.type);
          if (!type.owningPort) {
            return true;
          }
          return type.owningPort === (isOutbound ? _model.IN : _model.OUT);
        };
      }

      function createNeighborLookupByEdgeId(vertexIds) {
        var lut = {};
        _model.Directions.forEach(function (direction) {
          var matchingMeasurements = lut[direction] = {};
          vertexIds.forEach(function (id) {
            var vertexMeasurements = measurements.vertices.get(id);
            var vertexLayout = layout.vertices.get(id);
            vertices.get(id).ports[direction].forEach(function (port) {
              var edgeId = port.edgeId;
              if (edgeId) {
                matchingMeasurements[edgeId] = [vertexLayout, vertexMeasurements, port];
              }
            });
          });
        });
        return lut;
      }
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _utilShallowEqual)(nextProps, this.props);
    }

  });

  module.exports = Links;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xpbmtzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFRQSxNQUFNLEtBQUssR0FBRyxPQUFNLFdBQVcsQ0FBQzs7O0FBRTlCLFVBQU0sRUFBQSxrQkFBRzttQkFJSCxJQUFJLENBQUMsS0FBSztVQURaLFlBQVksVUFBWixZQUFZO1VBQUUsTUFBTSxVQUFOLE1BQU07VUFBRSxRQUFRLFVBQVIsUUFBUTtVQUFFLEtBQUssVUFBTCxLQUFLO1VBQUUsWUFBWSxVQUFaLFlBQVk7O0FBR3JELDZCQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOztBQUVuQyxhQUFPOzs7UUFBTSxXQUFXLEVBQUU7T0FBTyxDQUFDOztBQUVsQyxlQUFTLFdBQVcsR0FBRztBQUNyQixZQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUc7QUFDcEMsaUJBQU8sRUFBRSxDQUFDO1NBQ1g7QUFDRCxZQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7O0FBRXBDLFlBQU0sYUFBYSxHQUFHLDRCQUE0QixDQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFDO0FBQ3ZFLGVBQU8sT0F4QkosVUFBVSxDQXdCSyxPQUFPLENBQUUsVUFBQSxTQUFTO2lCQUNsQyxTQUFTLENBQUMsT0FBTyxDQUFFLFVBQUEsUUFBUTttQkFDekIsS0FBSyxDQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFFO1dBQUEsQ0FDNUM7U0FBQSxDQUNGLENBQUM7T0FDSDs7QUFFRCxlQUFTLEtBQUssQ0FBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRztBQUNuRCxZQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFFLFFBQVEsQ0FBRSxDQUFDO0FBQ3hDLFlBQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLFFBQVEsQ0FB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QUFHLENBQUUsU0FBUyxDQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ25ELG1CQUFTLENBQUMsT0FBTyxDQUFFLFVBQUEsRUFBRSxFQUFJO0FBQ3ZCLGdCQUFNLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBRSxDQUFDO0FBQzNELGdCQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUUsQ0FBQztBQUMvQyxvQkFBUSxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUUsQ0FBQyxLQUFLLENBQUUsU0FBUyxDQUFFLENBQUMsT0FBTyxDQUFFLFVBQUEsSUFBSSxFQUFJO0FBQ3JELGtCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLGtCQUFJLE1BQU0sRUFBRztBQUNYLG9DQUFvQixDQUFFLE1BQU0sQ0FBRSxHQUFHLENBQy9CLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQ3ZDLENBQUM7ZUFDSDthQUNGLENBQUUsQ0FBQztXQUNMLENBQUUsQ0FBQztTQUNMLENBQUUsQ0FBQztBQUNKLGVBQU8sR0FBRyxDQUFDO09BQ1o7S0FFRjs7QUFFRCx5QkFBcUIsRUFBQSwrQkFBRSxTQUFTLEVBQUc7QUFDakMsYUFBTyxDQUFDLHVCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7S0FDL0M7O0dBRUYsQ0FBQyxDQUFDOzttQkFFWSxLQUFLIiwiZmlsZSI6ImxpbmtzLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0ICogYXMgTGluayBmcm9tICcuL2xpbmsnO1xuaW1wb3J0IHsgRGlyZWN0aW9ucywgSU4sIE9VVCB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuaW1wb3J0ICogYXMgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5cblxuY29uc3QgTGlua3MgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgY29uc3Qge1xuICAgICAgbWVhc3VyZW1lbnRzLCBsYXlvdXQsIHZlcnRpY2VzLCB0eXBlcywgZXZlbnRIYW5kbGVyXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb3VudCh7IHdoYXQ6IExpbmtzLmRpc3BsYXlOYW1lIH0pO1xuXG4gICAgcmV0dXJuIDxzdmc+e3JlbmRlckxpbmtzKCl9PC9zdmc+O1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyTGlua3MoKSB7XG4gICAgICBpZiggbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmlzRW1wdHkoKSApIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgY29uc3QgdmVydGV4SWRzID0gdmVydGljZXMua2V5U2VxKCk7XG4gICAgICAvLyBsb29rdXAgdGFibGUgZm9yIHJlcHJlc2VudGluZyAxOm4vbjoxIGVkZ2VzIGFzIHBvcnQtdG8tcG9ydCBsaW5rc1xuICAgICAgY29uc3QgbmVpZ2hib3JUYWJsZSA9IGNyZWF0ZU5laWdoYm9yTG9va3VwQnlFZGdlSWQoIHZlcnRleElkcy50b0pTKCkgKTtcbiAgICAgIHJldHVybiBEaXJlY3Rpb25zLmZsYXRNYXAoIGRpcmVjdGlvbiA9PlxuICAgICAgICB2ZXJ0ZXhJZHMuZmxhdE1hcCggdmVydGV4SWQgPT5cbiAgICAgICAgICBsaW5rcyggdmVydGV4SWQsIGRpcmVjdGlvbiwgbmVpZ2hib3JUYWJsZSApXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlua3MoIHZlcnRleElkLCBkaXJlY3Rpb24sIG5laWdoYm9yVGFibGUgKSB7XG4gICAgICBjb25zdCB2ZXJ0ZXggPSB2ZXJ0aWNlcy5nZXQoIHZlcnRleElkICk7XG4gICAgICBjb25zdCB2ZXJ0ZXhMYXlvdXQgPSBsYXlvdXQudmVydGljZXMuZ2V0KCB2ZXJ0ZXhJZCApO1xuICAgICAgY29uc3QgdmVydGV4TWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmdldCggdmVydGV4SWQgKTtcbiAgICAgIGNvbnN0IGVkZ2VMYXlvdXRzID0gbGF5b3V0LmVkZ2VzO1xuICAgICAgY29uc3QgZWRnZU1lYXN1cmVtZW50cyA9IG1lYXN1cmVtZW50cy5lZGdlcztcblxuICAgICAgLy8gSXMgdGhlIGxpbmsgb3V0Ym91bmQgd3J0IHRoZSBjdXJyZW50IHZlcnRleD9cbiAgICAgIGNvbnN0IGlzT3V0Ym91bmQgPSBkaXJlY3Rpb24gPT09IE9VVDtcbiAgICAgIGNvbnN0IG90aGVyRGlyZWN0aW9uID0gaXNPdXRib3VuZCA/IElOIDogT1VUO1xuXG4gICAgICByZXR1cm4gdmVydGV4LnBvcnRzWyBkaXJlY3Rpb24gXVxuICAgICAgICAuZmlsdGVyKCBoYXNFeGFjdGx5T25lTmVpZ2hib3IoIGlzT3V0Ym91bmQgKSApXG4gICAgICAgIC5tYXAoIHBvcnQgPT4ge1xuICAgICAgICAgIGNvbnN0IGVkZ2VJZCA9IHBvcnQuZWRnZUlkO1xuXG4gICAgICAgICAgY29uc3QgaGVyZUxheW91dCA9IHZlcnRleExheW91dDtcbiAgICAgICAgICBjb25zdCBoZXJlTWVhc3VyZW1lbnRzID0gdmVydGV4TWVhc3VyZW1lbnRzO1xuICAgICAgICAgIGNvbnN0IGhlcmVQb3J0ID0gcG9ydDtcblxuICAgICAgICAgIGNvbnN0IG93bmluZ1BvcnQgPSB0eXBlcy5nZXQoIHBvcnQudHlwZSApLm93bmluZ1BvcnQ7XG4gICAgICAgICAgY29uc3QgWyB0aGVyZUxheW91dCwgdGhlcmVNZWFzdXJlbWVudHMsIHRoZXJlUG9ydCBdID0gb3duaW5nUG9ydCA/XG4gICAgICAgICAgICBuZWlnaGJvclRhYmxlWyBvdGhlckRpcmVjdGlvbiBdWyBlZGdlSWQgXSA6XG4gICAgICAgICAgICBbIGVkZ2VMYXlvdXRzLmdldCggZWRnZUlkICksIGVkZ2VNZWFzdXJlbWVudHMuZ2V0KCBlZGdlSWQgKSwgJycgXTtcblxuICAgICAgICAgIGNvbnN0IFsgZnJvbUxheW91dCwgdG9MYXlvdXQgXSA9IGlzT3V0Ym91bmQgP1xuICAgICAgICAgICAgWyBoZXJlTGF5b3V0LCB0aGVyZUxheW91dCBdIDpcbiAgICAgICAgICAgIFsgdGhlcmVMYXlvdXQsIGhlcmVMYXlvdXQgXTtcblxuICAgICAgICAgIGNvbnN0IFsgZnJvbU1lYXN1cmVtZW50cywgdG9NZWFzdXJlbWVudHMgXSA9IGlzT3V0Ym91bmQgP1xuICAgICAgICAgICAgWyBoZXJlTWVhc3VyZW1lbnRzLCB0aGVyZU1lYXN1cmVtZW50cyBdIDpcbiAgICAgICAgICAgIFsgdGhlcmVNZWFzdXJlbWVudHMsIGhlcmVNZWFzdXJlbWVudHMgXTtcblxuICAgICAgICAgIGNvbnN0IFsgZnJvbVBvcnQsIHRvUG9ydCBdID0gaXNPdXRib3VuZCA/XG4gICAgICAgICAgICBbIGhlcmVQb3J0LCB0aGVyZVBvcnQgXSA6XG4gICAgICAgICAgICBbIHRoZXJlUG9ydCwgaGVyZVBvcnQgXTtcblxuICAgICAgICAgIHJldHVybiA8TGluayBrZXk9e3ZlcnRleElkICsgJy8nICsgcG9ydC5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyPXtldmVudEhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgIGZyb21Qb3J0PXtmcm9tUG9ydH1cbiAgICAgICAgICAgICAgICAgICAgICAgdG9Qb3J0PXt0b1BvcnR9XG4gICAgICAgICAgICAgICAgICAgICAgIGZyb21MYXlvdXQ9e2Zyb21MYXlvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgIHRvTGF5b3V0PXt0b0xheW91dH1cbiAgICAgICAgICAgICAgICAgICAgICAgZnJvbU1lYXN1cmVtZW50cz17ZnJvbU1lYXN1cmVtZW50c31cbiAgICAgICAgICAgICAgICAgICAgICAgdG9NZWFzdXJlbWVudHM9e3RvTWVhc3VyZW1lbnRzfSAvPjtcbiAgICAgIH0gKTtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgZWFjaCBsaW5rIGlzIGRyYXduIGZyb20gb25lIHNpZGUgb25seS5cbiAgICBmdW5jdGlvbiBoYXNFeGFjdGx5T25lTmVpZ2hib3IoIGlzT3V0Ym91bmQgKSB7XG4gICAgICByZXR1cm4gcG9ydCA9PiB7XG4gICAgICAgIGlmKCAhcG9ydC5lZGdlSWQgKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlcy5nZXQoIHBvcnQudHlwZSApO1xuICAgICAgICBpZiggIXR5cGUub3duaW5nUG9ydCApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZS5vd25pbmdQb3J0ID09PSAoIGlzT3V0Ym91bmQgPyBJTiA6IE9VVCApO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVOZWlnaGJvckxvb2t1cEJ5RWRnZUlkKCB2ZXJ0ZXhJZHMgKSB7XG4gICAgICBjb25zdCBsdXQgPSB7fTtcbiAgICAgIERpcmVjdGlvbnMuZm9yRWFjaCggZGlyZWN0aW9uID0+IHtcbiAgICAgICAgY29uc3QgbWF0Y2hpbmdNZWFzdXJlbWVudHMgPSBsdXRbIGRpcmVjdGlvbiBdID0ge307XG4gICAgICAgIHZlcnRleElkcy5mb3JFYWNoKCBpZCA9PiB7XG4gICAgICAgICAgY29uc3QgdmVydGV4TWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmdldCggaWQgKTtcbiAgICAgICAgICBjb25zdCB2ZXJ0ZXhMYXlvdXQgPSBsYXlvdXQudmVydGljZXMuZ2V0KCBpZCApO1xuICAgICAgICAgIHZlcnRpY2VzLmdldCggaWQgKS5wb3J0c1sgZGlyZWN0aW9uIF0uZm9yRWFjaCggcG9ydCA9PiB7XG4gICAgICAgICAgICBjb25zdCBlZGdlSWQgPSBwb3J0LmVkZ2VJZDtcbiAgICAgICAgICAgIGlmKCBlZGdlSWQgKSB7XG4gICAgICAgICAgICAgIG1hdGNoaW5nTWVhc3VyZW1lbnRzWyBlZGdlSWQgXSA9IFtcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhMYXlvdXQsIHZlcnRleE1lYXN1cmVtZW50cywgcG9ydFxuICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gKTtcbiAgICAgICAgfSApO1xuICAgICAgfSApO1xuICAgICAgcmV0dXJuIGx1dDtcbiAgICB9XG5cbiAgfSxcblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApIHtcbiAgICByZXR1cm4gIXNoYWxsb3dFcXVhbCggbmV4dFByb3BzLCB0aGlzLnByb3BzICk7XG4gIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtzO1xuIl19