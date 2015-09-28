define(['exports', 'module', 'react', '../model', '../util/metrics', '../util/pathing', '../util/shallow-equal', '../util/settings'], function (exports, module, _react, _model, _utilMetrics, _utilPathing, _utilShallowEqual, _utilSettings) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _count = _interopRequireDefault(_utilMetrics);

  var edgeOffset = _utilSettings.layout.edgeOffset;

  var Link = _react.createClass({
    displayName: 'Link',

    render: function render() {
      var _props = this.props;
      var fromPort = _props.fromPort;
      var toPort = _props.toPort;
      var fromLayout = _props.fromLayout;
      var toLayout = _props.toLayout;
      var fromMeasurements = _props.fromMeasurements;
      var toMeasurements = _props.toMeasurements;

      var type = (fromPort || toPort).type;

      var classes = ['nbe-link', 'nbe-type-' + type].join(' ');
      (0, _count['default'])({ what: Link.displayName });

      if (!fromMeasurements || !toMeasurements) {
        // not measured (yet), e.g. just created
        return _react.createElement('path', null);
      }

      var fromCoords = xy(fromLayout, fromMeasurements, fromPort, _model.OUT);
      var toCoords = xy(toLayout, toMeasurements, toPort, _model.IN);

      var boxes = [rect(fromLayout, fromMeasurements), rect(toLayout, toMeasurements)];

      var data = _utilPathing.cubic(fromCoords, toCoords, 1, boxes);

      return _react.createElement('path', { className: classes, d: data });
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _utilShallowEqual)(nextProps, this.props);
    }

  });

  module.exports = Link;

  function xy(coords, measurements, port, direction) {
    if (port) {
      var _left = coords.left;
      var _top = coords.top;

      var portOffset = measurements[direction].get(port.id);
      if (!portOffset) {
        // :TODO: implement smarter measurements.
        console.log('missing measurements for port: ', port.id); // :TODO: DELETE ME
        return [_left, _top];
      }
      return [_left + portOffset.left, _top + portOffset.top];
    }

    // edge:
    var left = coords.left;
    var top = coords.top;

    return [left + edgeOffset, top + edgeOffset];
  }

  function rect(coords, measurements) {
    var left = coords.left;
    var top = coords.top;
    var _measurements$dimensions = measurements.dimensions;
    var width = _measurements$dimensions.width;
    var height = _measurements$dimensions.height;

    return {
      left: left,
      top: top,
      right: left + width,
      bottom: top + height
    };
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvd2lyZWZsb3cvc3JjL2NvbXBvbmVudHMvbGluay5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztNQU9rQixVQUFVLGlCQUFwQixNQUFNLENBQUksVUFBVTs7QUFHNUIsTUFBTSxJQUFJLEdBQUcsT0FBTSxXQUFXLENBQUM7OztBQUU3QixVQUFNLEVBQUEsa0JBQUc7bUJBU0gsSUFBSSxDQUFDLEtBQUs7VUFOWixRQUFRLFVBQVIsUUFBUTtVQUNSLE1BQU0sVUFBTixNQUFNO1VBQ04sVUFBVSxVQUFWLFVBQVU7VUFDVixRQUFRLFVBQVIsUUFBUTtVQUNSLGdCQUFnQixVQUFoQixnQkFBZ0I7VUFDaEIsY0FBYyxVQUFkLGNBQWM7O0FBR2hCLFVBQU0sSUFBSSxHQUFHLENBQUUsUUFBUSxJQUFJLE1BQU0sQ0FBQSxDQUFHLElBQUksQ0FBQzs7QUFFekMsVUFBTSxPQUFPLEdBQUcsQ0FBRSxVQUFVLEVBQUUsV0FBVyxHQUFHLElBQUksQ0FBRSxDQUFDLElBQUksQ0FBRSxHQUFHLENBQUUsQ0FBQztBQUMvRCw2QkFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7QUFFbEMsVUFBSSxDQUFDLGdCQUFnQixJQUFJLENBQUMsY0FBYyxFQUFHOztBQUV6QyxlQUFPLGtDQUFRLENBQUM7T0FDakI7O0FBRUQsVUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLFNBL0JwRCxHQUFHLENBK0J3RCxDQUFDO0FBQ3JFLFVBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FoQ2hELEVBQUUsQ0FnQ29ELENBQUM7O0FBRTVELFVBQU0sS0FBSyxHQUFHLENBQ1osSUFBSSxDQUFFLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBRSxFQUNwQyxJQUFJLENBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBRSxDQUNqQyxDQUFDOztBQUVGLFVBQU0sSUFBSSxHQUFHLGFBQVEsS0FBSyxDQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBRSxDQUFDOztBQUU3RCxhQUNFLCtCQUFNLFNBQVMsRUFBRSxPQUFPLEFBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxBQUFDLEdBQUcsQ0FDckM7S0FDSDs7QUFHRCx5QkFBcUIsRUFBQSwrQkFBRSxTQUFTLEVBQUc7QUFDakMsYUFBTyxDQUFDLHVCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7S0FDL0M7O0dBRUYsQ0FBQyxDQUFDOzttQkFFWSxJQUFJOztBQUduQixXQUFTLEVBQUUsQ0FBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUc7QUFDbkQsUUFBSSxJQUFJLEVBQUc7VUFDRCxLQUFJLEdBQVUsTUFBTSxDQUFwQixJQUFJO1VBQUUsSUFBRyxHQUFLLE1BQU0sQ0FBZCxHQUFHOztBQUNqQixVQUFNLFVBQVUsR0FBRyxZQUFZLENBQUUsU0FBUyxDQUFFLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxFQUFFLENBQUUsQ0FBQztBQUM1RCxVQUFJLENBQUMsVUFBVSxFQUFHOztBQUVoQixlQUFPLENBQUMsR0FBRyxDQUFFLGlDQUFpQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUUsQ0FBQztBQUMxRCxlQUFPLENBQUUsS0FBSSxFQUFFLElBQUcsQ0FBRSxDQUFDO09BQ3RCO0FBQ0QsYUFBTyxDQUFFLEtBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFFLENBQUM7S0FDekQ7OztRQUdPLElBQUksR0FBVSxNQUFNLENBQXBCLElBQUk7UUFBRSxHQUFHLEdBQUssTUFBTSxDQUFkLEdBQUc7O0FBQ2pCLFdBQU8sQ0FBRSxJQUFJLEdBQUcsVUFBVSxFQUFFLEdBQUcsR0FBRyxVQUFVLENBQUUsQ0FBQztHQUNoRDs7QUFHRCxXQUFTLElBQUksQ0FBRSxNQUFNLEVBQUUsWUFBWSxFQUFHO1FBQzVCLElBQUksR0FBVSxNQUFNLENBQXBCLElBQUk7UUFBRSxHQUFHLEdBQUssTUFBTSxDQUFkLEdBQUc7bUNBQ3dCLFlBQVksQ0FBN0MsVUFBVTtRQUFJLEtBQUssNEJBQUwsS0FBSztRQUFFLE1BQU0sNEJBQU4sTUFBTTs7QUFDbkMsV0FBTztBQUNMLFVBQUksRUFBRSxJQUFJO0FBQ1YsU0FBRyxFQUFFLEdBQUc7QUFDUixXQUFLLEVBQUUsSUFBSSxHQUFHLEtBQUs7QUFDbkIsWUFBTSxFQUFFLEdBQUcsR0FBRyxNQUFNO0tBQ3JCLENBQUM7R0FDSCIsImZpbGUiOiIvVXNlcnMvbWljaGFlbC93b3JrL2dpdGh1Yi5jb20veDFCL3dpcmVmbG93L3NyYy9jb21wb25lbnRzL2xpbmsuanN4Iiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgSU4sIE9VVCB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuaW1wb3J0ICogYXMgcGF0aGluZyBmcm9tICcuLi91dGlsL3BhdGhpbmcnO1xuaW1wb3J0ICogYXMgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgKiBhcyBzZXR0aW5ncyBmcm9tICcuLi91dGlsL3NldHRpbmdzJztcbmNvbnN0IHsgbGF5b3V0OiB7IGVkZ2VPZmZzZXQgfSB9ID0gc2V0dGluZ3M7XG5cblxuY29uc3QgTGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG5cbiAgICBjb25zdCB7XG4gICAgICBmcm9tUG9ydCxcbiAgICAgIHRvUG9ydCxcbiAgICAgIGZyb21MYXlvdXQsXG4gICAgICB0b0xheW91dCxcbiAgICAgIGZyb21NZWFzdXJlbWVudHMsXG4gICAgICB0b01lYXN1cmVtZW50c1xuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgdHlwZSA9ICggZnJvbVBvcnQgfHwgdG9Qb3J0ICkudHlwZTtcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBbICduYmUtbGluaycsICduYmUtdHlwZS0nICsgdHlwZSBdLmpvaW4oICcgJyApO1xuICAgIGNvdW50KHsgd2hhdDogTGluay5kaXNwbGF5TmFtZSB9KTtcblxuICAgIGlmKCAhZnJvbU1lYXN1cmVtZW50cyB8fCAhdG9NZWFzdXJlbWVudHMgKSB7XG4gICAgICAvLyBub3QgbWVhc3VyZWQgKHlldCksIGUuZy4ganVzdCBjcmVhdGVkXG4gICAgICByZXR1cm4gPHBhdGggLz47XG4gICAgfVxuXG4gICAgY29uc3QgZnJvbUNvb3JkcyA9IHh5KCBmcm9tTGF5b3V0LCBmcm9tTWVhc3VyZW1lbnRzLCBmcm9tUG9ydCwgT1VUICk7XG4gICAgY29uc3QgdG9Db29yZHMgPSB4eSggdG9MYXlvdXQsIHRvTWVhc3VyZW1lbnRzLCB0b1BvcnQsIElOICk7XG5cbiAgICBjb25zdCBib3hlcyA9IFtcbiAgICAgIHJlY3QoIGZyb21MYXlvdXQsIGZyb21NZWFzdXJlbWVudHMgKSxcbiAgICAgIHJlY3QoIHRvTGF5b3V0LCB0b01lYXN1cmVtZW50cyApXG4gICAgXTtcblxuICAgIGNvbnN0IGRhdGEgPSBwYXRoaW5nLmN1YmljKCBmcm9tQ29vcmRzLCB0b0Nvb3JkcywgMSwgYm94ZXMgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8cGF0aCBjbGFzc05hbWU9e2NsYXNzZXN9IGQ9e2RhdGF9IC8+XG4gICAgKTtcbiAgfSxcblxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTGluaztcblxuXG5mdW5jdGlvbiB4eSggY29vcmRzLCBtZWFzdXJlbWVudHMsIHBvcnQsIGRpcmVjdGlvbiApIHtcbiAgaWYoIHBvcnQgKSB7XG4gICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IGNvb3JkcztcbiAgICBjb25zdCBwb3J0T2Zmc2V0ID0gbWVhc3VyZW1lbnRzWyBkaXJlY3Rpb24gXS5nZXQoIHBvcnQuaWQgKTtcbiAgICBpZiggIXBvcnRPZmZzZXQgKSB7XG4gICAgICAvLyA6VE9ETzogaW1wbGVtZW50IHNtYXJ0ZXIgbWVhc3VyZW1lbnRzLlxuICAgICAgY29uc29sZS5sb2coICdtaXNzaW5nIG1lYXN1cmVtZW50cyBmb3IgcG9ydDogJywgcG9ydC5pZCApOyAvLyA6VE9ETzogREVMRVRFIE1FXG4gICAgICByZXR1cm4gWyBsZWZ0LCB0b3AgXTtcbiAgICB9XG4gICAgcmV0dXJuIFsgbGVmdCArIHBvcnRPZmZzZXQubGVmdCwgdG9wICsgcG9ydE9mZnNldC50b3AgXTtcbiAgfVxuXG4gIC8vIGVkZ2U6XG4gIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBjb29yZHM7XG4gIHJldHVybiBbIGxlZnQgKyBlZGdlT2Zmc2V0LCB0b3AgKyBlZGdlT2Zmc2V0IF07XG59XG5cblxuZnVuY3Rpb24gcmVjdCggY29vcmRzLCBtZWFzdXJlbWVudHMgKSB7XG4gIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBjb29yZHM7XG4gIGNvbnN0IHsgZGltZW5zaW9uczogeyB3aWR0aCwgaGVpZ2h0fSB9ID0gbWVhc3VyZW1lbnRzO1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IGxlZnQsXG4gICAgdG9wOiB0b3AsXG4gICAgcmlnaHQ6IGxlZnQgKyB3aWR0aCxcbiAgICBib3R0b206IHRvcCArIGhlaWdodFxuICB9O1xufVxuIl19