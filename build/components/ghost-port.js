define(['exports', 'module', 'react', '../model', '../util/pathing'], function (exports, module, _react, _model, _utilPathing) {
  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  var GhostPort = _react.createClass({
    displayName: 'GhostPort',

    render: function render() {
      var dragInfo = this.props.dragInfo;

      if (!dragInfo) {
        return _react.createElement('g', null);
      }

      var port = dragInfo.port;
      var portCoords = dragInfo.portCoords;
      var mouseCoords = dragInfo.mouseCoords;

      var portBox = rect(portCoords, (0, _model.Dimensions)({ width: 10, height: 10 }));
      var mouseBox = rect(mouseCoords, (0, _model.Dimensions)({ width: 1, height: 1 }));

      var _ref = port.direction === _model.OUT ? [portCoords, mouseCoords] : [mouseCoords, portCoords];

      var _ref2 = _slicedToArray(_ref, 2);

      var fromCoords = _ref2[0];
      var toCoords = _ref2[1];

      var _ref3 = port.direction === _model.OUT ? [portBox, mouseBox] : [mouseBox, portBox];

      var _ref32 = _slicedToArray(_ref3, 2);

      var fromBox = _ref32[0];
      var toBox = _ref32[1];

      var data = _utilPathing.cubic(xy(fromCoords), xy(toCoords), 1, [fromBox, toBox]);

      var classes = 'nbe-link nbe-ghost nbe-type-' + port.type;
      return _react.createElement('path', { className: classes, d: data });
    }

  });

  function xy(coord) {
    return [coord.left, coord.top];
  }

  function rect(coords, dimensions) {
    return {
      left: coords.left,
      top: coords.top,
      right: coords.left + dimensions.width,
      bottom: coords.top + dimensions.height
    };
  }

  module.exports = GhostPort;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2dob3N0LXBvcnQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBTUEsTUFBTSxTQUFTLEdBQUcsT0FBTSxXQUFXLENBQUM7OztBQUVsQyxVQUFNLEVBQUEsa0JBQUc7VUFDQyxRQUFRLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBdkIsUUFBUTs7QUFDaEIsVUFBSSxDQUFDLFFBQVEsRUFBRztBQUNkLGVBQU8sK0JBQUssQ0FBQztPQUNkOztVQUVPLElBQUksR0FBOEIsUUFBUSxDQUExQyxJQUFJO1VBQUUsVUFBVSxHQUFrQixRQUFRLENBQXBDLFVBQVU7VUFBRSxXQUFXLEdBQUssUUFBUSxDQUF4QixXQUFXOztBQUNyQyxVQUFNLE9BQU8sR0FBRyxJQUFJLENBQUUsVUFBVSxFQUFFLFdBYnhCLFVBQVUsRUFheUIsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFFLENBQUM7QUFDMUUsVUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFFLFdBQVcsRUFBRSxXQWQxQixVQUFVLEVBYzJCLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDOztpQkFFekMsSUFBSSxDQUFDLFNBQVMsWUFoQjFDLEdBQUcsR0FpQk4sQ0FBRSxVQUFVLEVBQUUsV0FBVyxDQUFFLEdBQzNCLENBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBRTs7OztVQUZyQixVQUFVO1VBQUUsUUFBUTs7a0JBSUQsSUFBSSxDQUFDLFNBQVMsWUFwQnBDLEdBQUcsR0FxQk4sQ0FBRSxPQUFPLEVBQUUsUUFBUSxDQUFFLEdBQ3JCLENBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBRTs7OztVQUZmLE9BQU87VUFBRSxLQUFLOztBQUl0QixVQUFNLElBQUksR0FBRyxhQUFRLEtBQUssQ0FDeEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBRSxPQUFPLEVBQUUsS0FBSyxDQUFFLENBQ3BELENBQUM7O0FBRUYsVUFBTSxPQUFPLG9DQUFrQyxJQUFJLENBQUMsSUFBSSxDQUFHO0FBQzNELGFBQU8sK0JBQU0sU0FBUyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxHQUFJLENBQUM7S0FDOUM7O0dBRUYsQ0FBQyxDQUFDOztBQUdILFdBQVMsRUFBRSxDQUFFLEtBQUssRUFBRztBQUNuQixXQUFPLENBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFFLENBQUM7R0FDbEM7O0FBR0QsV0FBUyxJQUFJLENBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRztBQUNsQyxXQUFPO0FBQ0wsVUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO0FBQ2pCLFNBQUcsRUFBRSxNQUFNLENBQUMsR0FBRztBQUNmLFdBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLO0FBQ3JDLFlBQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxNQUFNO0tBQ3ZDLENBQUM7R0FDSDs7bUJBRWMsU0FBUyIsImZpbGUiOiJnaG9zdC1wb3J0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgT1VULCBEaW1lbnNpb25zIH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0ICogYXMgcGF0aGluZyBmcm9tICcuLi91dGlsL3BhdGhpbmcnO1xuXG5cbmNvbnN0IEdob3N0UG9ydCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkcmFnSW5mbyB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiggIWRyYWdJbmZvICkge1xuICAgICAgcmV0dXJuIDxnIC8+O1xuICAgIH1cblxuICAgIGNvbnN0IHsgcG9ydCwgcG9ydENvb3JkcywgbW91c2VDb29yZHMgfSA9IGRyYWdJbmZvO1xuICAgIGNvbnN0IHBvcnRCb3ggPSByZWN0KCBwb3J0Q29vcmRzLCBEaW1lbnNpb25zKHsgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwIH0pICk7XG4gICAgY29uc3QgbW91c2VCb3ggPSByZWN0KCBtb3VzZUNvb3JkcywgRGltZW5zaW9ucyh7IHdpZHRoOiAxLCBoZWlnaHQ6IDEgfSkgKTtcblxuICAgIGNvbnN0IFsgZnJvbUNvb3JkcywgdG9Db29yZHMgXSA9IHBvcnQuZGlyZWN0aW9uID09PSBPVVQgP1xuICAgICAgWyBwb3J0Q29vcmRzLCBtb3VzZUNvb3JkcyBdIDpcbiAgICAgIFsgbW91c2VDb29yZHMsIHBvcnRDb29yZHMgXTtcblxuICAgIGNvbnN0IFsgZnJvbUJveCwgdG9Cb3ggXSA9IHBvcnQuZGlyZWN0aW9uID09PSBPVVQgP1xuICAgICAgWyBwb3J0Qm94LCBtb3VzZUJveCBdIDpcbiAgICAgIFsgbW91c2VCb3gsIHBvcnRCb3ggXTtcblxuICAgIGNvbnN0IGRhdGEgPSBwYXRoaW5nLmN1YmljKFxuICAgICAgeHkoZnJvbUNvb3JkcyksIHh5KHRvQ29vcmRzKSwgMSwgWyBmcm9tQm94LCB0b0JveCBdXG4gICAgKTtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBgbmJlLWxpbmsgbmJlLWdob3N0IG5iZS10eXBlLSR7cG9ydC50eXBlfWA7XG4gICAgcmV0dXJuIDxwYXRoIGNsYXNzTmFtZT17Y2xhc3Nlc30gZD17ZGF0YX0gLz47XG4gIH1cblxufSk7XG5cblxuZnVuY3Rpb24geHkoIGNvb3JkICkge1xuICByZXR1cm4gWyBjb29yZC5sZWZ0LCBjb29yZC50b3AgXTtcbn1cblxuXG5mdW5jdGlvbiByZWN0KCBjb29yZHMsIGRpbWVuc2lvbnMgKSB7XG4gIHJldHVybiB7XG4gICAgbGVmdDogY29vcmRzLmxlZnQsXG4gICAgdG9wOiBjb29yZHMudG9wLFxuICAgIHJpZ2h0OiBjb29yZHMubGVmdCArIGRpbWVuc2lvbnMud2lkdGgsXG4gICAgYm90dG9tOiBjb29yZHMudG9wICsgZGltZW5zaW9ucy5oZWlnaHRcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2hvc3RQb3J0O1xuIl19