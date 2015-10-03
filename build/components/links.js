define(['exports', 'module', 'react', '../util/shallow-equal', '../util/metrics', '../flux/graph/graph-model', './link'], function (exports, module, _react, _utilShallowEqual, _utilMetrics, _fluxGraphGraphModel, _link) {
  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _shallowEqual = _interopRequireDefault(_utilShallowEqual);

  var _count = _interopRequireDefault(_utilMetrics);

  var _Link = _interopRequireDefault(_link);

  var Links = _React['default'].createClass({
    displayName: 'Links',

    render: function render() {
      var _props = this.props;
      var measurements = _props.measurements;
      var layout = _props.layout;
      var vertices = _props.vertices;
      var types = _props.types;

      (0, _count['default'])({ what: Links.displayName });

      return _React['default'].createElement(
        'g',
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
        return _fluxGraphGraphModel.Directions.flatMap(function (direction) {
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
        var isOutbound = direction === _fluxGraphGraphModel.OUT;
        var otherDirection = isOutbound ? _fluxGraphGraphModel.IN : _fluxGraphGraphModel.OUT;

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

          return _React['default'].createElement(_Link['default'], { key: vertexId + '/' + port.id,
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
          return type.owningPort === (isOutbound ? _fluxGraphGraphModel.IN : _fluxGraphGraphModel.OUT);
        };
      }

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
                matchingMeasurements[edgeId] = [vertexLayout, vertexMeasurements, port];
              }
            });
          });
        });
        return lut;
      }
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);
    }

  });

  module.exports = Links;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xpbmtzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFTQSxNQUFNLEtBQUssR0FBRyxrQkFBTSxXQUFXLENBQUM7OztBQUU5QixVQUFNLEVBQUEsa0JBQUc7bUJBRTJDLElBQUksQ0FBQyxLQUFLO1VBQXBELFlBQVksVUFBWixZQUFZO1VBQUUsTUFBTSxVQUFOLE1BQU07VUFBRSxRQUFRLFVBQVIsUUFBUTtVQUFFLEtBQUssVUFBTCxLQUFLOztBQUU3Qyw2QkFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7QUFFbkMsYUFBTzs7O1FBQUksV0FBVyxFQUFFO09BQUssQ0FBQzs7QUFFOUIsZUFBUyxXQUFXLEdBQUc7QUFDckIsWUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFHO0FBQ3BDLGlCQUFPLEVBQUUsQ0FBQztTQUNYO0FBQ0QsWUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDOztBQUVwQyxZQUFNLGFBQWEsR0FBRyw0QkFBNEIsQ0FBRSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQztBQUN2RSxlQUFPLHFCQXJCSixVQUFVLENBcUJLLE9BQU8sQ0FBRSxVQUFBLFNBQVM7aUJBQ2xDLFNBQVMsQ0FBQyxPQUFPLENBQUUsVUFBQSxRQUFRO21CQUN6QixLQUFLLENBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUU7V0FBQSxDQUM1QztTQUFBLENBQ0YsQ0FBQztPQUNIOztBQUVELGVBQVMsS0FBSyxDQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFHO0FBQ25ELFlBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUUsUUFBUSxDQUFFLENBQUM7QUFDeEMsWUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUUsUUFBUSxDQUFFLENBQUM7QUFD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QUUsQ0FBQztBQUNuRCxtQkFBUyxDQUFDLE9BQU8sQ0FBRSxVQUFBLEVBQUUsRUFBSTtBQUN2QixnQkFBTSxrQkFBa0IsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUUsQ0FBQztBQUMzRCxnQkFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUUsRUFBRSxDQUFFLENBQUM7QUFDL0Msb0JBQVEsQ0FBQyxHQUFHLENBQUUsRUFBRSxDQUFFLENBQUMsS0FBSyxDQUFFLFNBQVMsQ0FBRSxDQUFDLE9BQU8sQ0FBRSxVQUFBLElBQUksRUFBSTtBQUNyRCxrQkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixrQkFBSSxNQUFNLEVBQUc7QUFDWCxvQ0FBb0IsQ0FBRSxNQUFNLENBQUUsR0FBRyxDQUMvQixZQUFZLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUN2QyxDQUFDO2VBQ0g7YUFDRixDQUFFLENBQUM7V0FDTCxDQUFFLENBQUM7U0FDTCxDQUFFLENBQUM7QUFDSixlQUFPLEdBQUcsQ0FBQztPQUNaO0tBRUY7O0FBRUQseUJBQXFCLEVBQUEsK0JBQUUsU0FBUyxFQUFHO0FBQ2pDLGFBQU8sQ0FBQyw4QkFBYyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDO0tBQy9DOztHQUVGLENBQUMsQ0FBQzs7bUJBRVksS0FBSyIsImZpbGUiOiJsaW5rcy5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgY291bnQgZnJvbSAnLi4vdXRpbC9tZXRyaWNzJztcblxuaW1wb3J0IHsgRGlyZWN0aW9ucywgSU4sIE9VVCB9IGZyb20gJy4uL2ZsdXgvZ3JhcGgvZ3JhcGgtbW9kZWwnO1xuaW1wb3J0IExpbmsgZnJvbSAnLi9saW5rJztcblxuXG5jb25zdCBMaW5rcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG5cbiAgICBjb25zdCB7IG1lYXN1cmVtZW50cywgbGF5b3V0LCB2ZXJ0aWNlcywgdHlwZXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb3VudCh7IHdoYXQ6IExpbmtzLmRpc3BsYXlOYW1lIH0pO1xuXG4gICAgcmV0dXJuIDxnPntyZW5kZXJMaW5rcygpfTwvZz47XG5cbiAgICBmdW5jdGlvbiByZW5kZXJMaW5rcygpIHtcbiAgICAgIGlmKCBtZWFzdXJlbWVudHMudmVydGljZXMuaXNFbXB0eSgpICkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgICBjb25zdCB2ZXJ0ZXhJZHMgPSB2ZXJ0aWNlcy5rZXlTZXEoKTtcbiAgICAgIC8vIGxvb2t1cCB0YWJsZSBmb3IgcmVwcmVzZW50aW5nIDE6bi9uOjEgZWRnZXMgYXMgcG9ydC10by1wb3J0IGxpbmtzXG4gICAgICBjb25zdCBuZWlnaGJvclRhYmxlID0gY3JlYXRlTmVpZ2hib3JMb29rdXBCeUVkZ2VJZCggdmVydGV4SWRzLnRvSlMoKSApO1xuICAgICAgcmV0dXJuIERpcmVjdGlvbnMuZmxhdE1hcCggZGlyZWN0aW9uID0+XG4gICAgICAgIHZlcnRleElkcy5mbGF0TWFwKCB2ZXJ0ZXhJZCA9PlxuICAgICAgICAgIGxpbmtzKCB2ZXJ0ZXhJZCwgZGlyZWN0aW9uLCBuZWlnaGJvclRhYmxlIClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsaW5rcyggdmVydGV4SWQsIGRpcmVjdGlvbiwgbmVpZ2hib3JUYWJsZSApIHtcbiAgICAgIGNvbnN0IHZlcnRleCA9IHZlcnRpY2VzLmdldCggdmVydGV4SWQgKTtcbiAgICAgIGNvbnN0IHZlcnRleExheW91dCA9IGxheW91dC52ZXJ0aWNlcy5nZXQoIHZlcnRleElkICk7XG4gICAgICBjb25zdCB2ZXJ0ZXhNZWFzdXJlbWVudHMgPSBtZWFzdXJlbWVudHMudmVydGljZXMuZ2V0KCB2ZXJ0ZXhJZCApO1xuICAgICAgY29uc3QgZWRnZUxheW91dHMgPSBsYXlvdXQuZWRnZXM7XG4gICAgICBjb25zdCBlZGdlTWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRzLmVkZ2VzO1xuXG4gICAgICAvLyBJcyB0aGUgbGluayBvdXRib3VuZCB3cnQgdGhlIGN1cnJlbnQgdmVydGV4P1xuICAgICAgY29uc3QgaXNPdXRib3VuZCA9IGRpcmVjdGlvbiA9PT0gT1VUO1xuICAgICAgY29uc3Qgb3RoZXJEaXJlY3Rpb24gPSBpc091dGJvdW5kID8gSU4gOiBPVVQ7XG5cbiAgICAgIHJldHVybiB2ZXJ0ZXgucG9ydHNbIGRpcmVjdGlvbiBdXG4gICAgICAgIC5maWx0ZXIoIGhhc0V4YWN0bHlPbmVOZWlnaGJvciggaXNPdXRib3VuZCApIClcbiAgICAgICAgLm1hcCggcG9ydCA9PiB7XG4gICAgICAgICAgY29uc3QgZWRnZUlkID0gcG9ydC5lZGdlSWQ7XG5cbiAgICAgICAgICBjb25zdCBoZXJlTGF5b3V0ID0gdmVydGV4TGF5b3V0O1xuICAgICAgICAgIGNvbnN0IGhlcmVNZWFzdXJlbWVudHMgPSB2ZXJ0ZXhNZWFzdXJlbWVudHM7XG4gICAgICAgICAgY29uc3QgaGVyZVBvcnQgPSBwb3J0O1xuXG4gICAgICAgICAgY29uc3Qgb3duaW5nUG9ydCA9IHR5cGVzLmdldCggcG9ydC50eXBlICkub3duaW5nUG9ydDtcbiAgICAgICAgICBjb25zdCBbIHRoZXJlTGF5b3V0LCB0aGVyZU1lYXN1cmVtZW50cywgdGhlcmVQb3J0IF0gPSBvd25pbmdQb3J0ID9cbiAgICAgICAgICAgIG5laWdoYm9yVGFibGVbIG90aGVyRGlyZWN0aW9uIF1bIGVkZ2VJZCBdIDpcbiAgICAgICAgICAgIFsgZWRnZUxheW91dHMuZ2V0KCBlZGdlSWQgKSwgZWRnZU1lYXN1cmVtZW50cy5nZXQoIGVkZ2VJZCApLCAnJyBdO1xuXG4gICAgICAgICAgY29uc3QgWyBmcm9tTGF5b3V0LCB0b0xheW91dCBdID0gaXNPdXRib3VuZCA/XG4gICAgICAgICAgICBbIGhlcmVMYXlvdXQsIHRoZXJlTGF5b3V0IF0gOlxuICAgICAgICAgICAgWyB0aGVyZUxheW91dCwgaGVyZUxheW91dCBdO1xuXG4gICAgICAgICAgY29uc3QgWyBmcm9tTWVhc3VyZW1lbnRzLCB0b01lYXN1cmVtZW50cyBdID0gaXNPdXRib3VuZCA/XG4gICAgICAgICAgICBbIGhlcmVNZWFzdXJlbWVudHMsIHRoZXJlTWVhc3VyZW1lbnRzIF0gOlxuICAgICAgICAgICAgWyB0aGVyZU1lYXN1cmVtZW50cywgaGVyZU1lYXN1cmVtZW50cyBdO1xuXG4gICAgICAgICAgY29uc3QgWyBmcm9tUG9ydCwgdG9Qb3J0IF0gPSBpc091dGJvdW5kID9cbiAgICAgICAgICAgIFsgaGVyZVBvcnQsIHRoZXJlUG9ydCBdIDpcbiAgICAgICAgICAgIFsgdGhlcmVQb3J0LCBoZXJlUG9ydCBdO1xuXG4gICAgICAgICAgcmV0dXJuIDxMaW5rIGtleT17dmVydGV4SWQgKyAnLycgKyBwb3J0LmlkfVxuICAgICAgICAgICAgICAgICAgICAgICBmcm9tUG9ydD17ZnJvbVBvcnR9XG4gICAgICAgICAgICAgICAgICAgICAgIHRvUG9ydD17dG9Qb3J0fVxuICAgICAgICAgICAgICAgICAgICAgICBmcm9tTGF5b3V0PXtmcm9tTGF5b3V0fVxuICAgICAgICAgICAgICAgICAgICAgICB0b0xheW91dD17dG9MYXlvdXR9XG4gICAgICAgICAgICAgICAgICAgICAgIGZyb21NZWFzdXJlbWVudHM9e2Zyb21NZWFzdXJlbWVudHN9XG4gICAgICAgICAgICAgICAgICAgICAgIHRvTWVhc3VyZW1lbnRzPXt0b01lYXN1cmVtZW50c30gLz47XG4gICAgICB9ICk7XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIGVhY2ggbGluayBpcyBkcmF3biBmcm9tIG9uZSBzaWRlIG9ubHkuXG4gICAgZnVuY3Rpb24gaGFzRXhhY3RseU9uZU5laWdoYm9yKCBpc091dGJvdW5kICkge1xuICAgICAgcmV0dXJuIHBvcnQgPT4ge1xuICAgICAgICBpZiggIXBvcnQuZWRnZUlkICkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0eXBlID0gdHlwZXMuZ2V0KCBwb3J0LnR5cGUgKTtcbiAgICAgICAgaWYoICF0eXBlLm93bmluZ1BvcnQgKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGUub3duaW5nUG9ydCA9PT0gKCBpc091dGJvdW5kID8gSU4gOiBPVVQgKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTmVpZ2hib3JMb29rdXBCeUVkZ2VJZCggdmVydGV4SWRzICkge1xuICAgICAgY29uc3QgbHV0ID0ge307XG4gICAgICBEaXJlY3Rpb25zLmZvckVhY2goIGRpcmVjdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IG1hdGNoaW5nTWVhc3VyZW1lbnRzID0gbHV0WyBkaXJlY3Rpb24gXSA9IHt9O1xuICAgICAgICB2ZXJ0ZXhJZHMuZm9yRWFjaCggaWQgPT4ge1xuICAgICAgICAgIGNvbnN0IHZlcnRleE1lYXN1cmVtZW50cyA9IG1lYXN1cmVtZW50cy52ZXJ0aWNlcy5nZXQoIGlkICk7XG4gICAgICAgICAgY29uc3QgdmVydGV4TGF5b3V0ID0gbGF5b3V0LnZlcnRpY2VzLmdldCggaWQgKTtcbiAgICAgICAgICB2ZXJ0aWNlcy5nZXQoIGlkICkucG9ydHNbIGRpcmVjdGlvbiBdLmZvckVhY2goIHBvcnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWRnZUlkID0gcG9ydC5lZGdlSWQ7XG4gICAgICAgICAgICBpZiggZWRnZUlkICkge1xuICAgICAgICAgICAgICBtYXRjaGluZ01lYXN1cmVtZW50c1sgZWRnZUlkIF0gPSBbXG4gICAgICAgICAgICAgICAgdmVydGV4TGF5b3V0LCB2ZXJ0ZXhNZWFzdXJlbWVudHMsIHBvcnRcbiAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9ICk7XG4gICAgICAgIH0gKTtcbiAgICAgIH0gKTtcbiAgICAgIHJldHVybiBsdXQ7XG4gICAgfVxuXG4gIH0sXG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBMaW5rcztcbiJdfQ==