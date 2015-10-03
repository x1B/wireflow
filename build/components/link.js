define(['exports', 'module', 'react', '../util/metrics', '../util/pathing', '../util/shallow-equal', '../util/settings', '../flux/graph/graph-model'], function (exports, module, _react, _utilMetrics, _utilPathing, _utilShallowEqual, _utilSettings, _fluxGraphGraphModel) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _count = _interopRequireDefault(_utilMetrics);

  var _pathing = _interopRequireDefault(_utilPathing);

  var _shallowEqual = _interopRequireDefault(_utilShallowEqual);

  var _settings = _interopRequireDefault(_utilSettings);

  var edgeOffset = _settings['default'].layout.edgeOffset;

  var Link = _React['default'].createClass({
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
        return _React['default'].createElement('path', null);
      }

      var fromCoords = xy(fromLayout, fromMeasurements, fromPort, _fluxGraphGraphModel.OUT);
      var toCoords = xy(toLayout, toMeasurements, toPort, _fluxGraphGraphModel.IN);

      var boxes = [rect(fromLayout, fromMeasurements), rect(toLayout, toMeasurements)];

      var data = _pathing['default'].cubic(fromCoords, toCoords, 1, boxes);

      return _React['default'].createElement('path', { className: classes, d: data });
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xpbmsuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztNQVVrQixVQUFVLHdCQUFwQixNQUFNLENBQUksVUFBVTs7QUFFNUIsTUFBTSxJQUFJLEdBQUcsa0JBQU0sV0FBVyxDQUFDOzs7QUFFN0IsVUFBTSxFQUFBLGtCQUFHO21CQVNILElBQUksQ0FBQyxLQUFLO1VBTlosUUFBUSxVQUFSLFFBQVE7VUFDUixNQUFNLFVBQU4sTUFBTTtVQUNOLFVBQVUsVUFBVixVQUFVO1VBQ1YsUUFBUSxVQUFSLFFBQVE7VUFDUixnQkFBZ0IsVUFBaEIsZ0JBQWdCO1VBQ2hCLGNBQWMsVUFBZCxjQUFjOztBQUdoQixVQUFNLElBQUksR0FBRyxDQUFFLFFBQVEsSUFBSSxNQUFNLENBQUEsQ0FBRyxJQUFJLENBQUM7O0FBRXpDLFVBQU0sT0FBTyxHQUFHLENBQUUsVUFBVSxFQUFFLFdBQVcsR0FBRyxJQUFJLENBQUUsQ0FBQyxJQUFJLENBQUUsR0FBRyxDQUFFLENBQUM7QUFDL0QsNkJBQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7O0FBRWxDLFVBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLGNBQWMsRUFBRzs7QUFFekMsZUFBTyw2Q0FBUSxDQUFDO09BQ2pCOztBQUVELFVBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSx1QkE1QnBELEdBQUcsQ0E0QndELENBQUM7QUFDckUsVUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsTUFBTSx1QkE3QmhELEVBQUUsQ0E2Qm9ELENBQUM7O0FBRTVELFVBQU0sS0FBSyxHQUFHLENBQ1osSUFBSSxDQUFFLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBRSxFQUNwQyxJQUFJLENBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBRSxDQUNqQyxDQUFDOztBQUVGLFVBQU0sSUFBSSxHQUFHLG9CQUFRLEtBQUssQ0FBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUUsQ0FBQzs7QUFFN0QsYUFDRSwwQ0FBTSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUksQ0FDckM7S0FDSDs7QUFHRCx5QkFBcUIsRUFBQSwrQkFBRSxTQUFTLEVBQUc7QUFDakMsYUFBTyxDQUFDLDhCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7S0FDL0M7O0dBRUYsQ0FBQyxDQUFDOzttQkFFWSxJQUFJOztBQUduQixXQUFTLEVBQUUsQ0FBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUc7QUFDbkQsUUFBSSxJQUFJLEVBQUc7VUFDRCxLQUFJLEdBQVUsTUFBTSxDQUFwQixJQUFJO1VBQUUsSUFBRyxHQUFLLE1BQU0sQ0FBZCxHQUFHOztBQUNqQixVQUFNLFVBQVUsR0FBRyxZQUFZLENBQUUsU0FBUyxDQUFFLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxFQUFFLENBQUUsQ0FBQztBQUM1RCxVQUFJLENBQUMsVUFBVSxFQUFHOztBQUVoQixlQUFPLENBQUUsS0FBSSxFQUFFLElBQUcsQ0FBRSxDQUFDO09BQ3RCO0FBQ0QsYUFBTyxDQUFFLEtBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFFLENBQUM7S0FDekQ7OztRQUdPLElBQUksR0FBVSxNQUFNLENBQXBCLElBQUk7UUFBRSxHQUFHLEdBQUssTUFBTSxDQUFkLEdBQUc7O0FBQ2pCLFdBQU8sQ0FBRSxJQUFJLEdBQUcsVUFBVSxFQUFFLEdBQUcsR0FBRyxVQUFVLENBQUUsQ0FBQztHQUNoRDs7QUFHRCxXQUFTLElBQUksQ0FBRSxNQUFNLEVBQUUsWUFBWSxFQUFHO1FBQzVCLElBQUksR0FBVSxNQUFNLENBQXBCLElBQUk7UUFBRSxHQUFHLEdBQUssTUFBTSxDQUFkLEdBQUc7bUNBQ3dCLFlBQVksQ0FBN0MsVUFBVTtRQUFJLEtBQUssNEJBQUwsS0FBSztRQUFFLE1BQU0sNEJBQU4sTUFBTTs7QUFDbkMsV0FBTztBQUNMLFVBQUksRUFBRSxJQUFJO0FBQ1YsU0FBRyxFQUFFLEdBQUc7QUFDUixXQUFLLEVBQUUsSUFBSSxHQUFHLEtBQUs7QUFDbkIsWUFBTSxFQUFFLEdBQUcsR0FBRyxNQUFNO0tBQ3JCLENBQUM7R0FDSCIsImZpbGUiOiJsaW5rLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuaW1wb3J0IHBhdGhpbmcgZnJvbSAnLi4vdXRpbC9wYXRoaW5nJztcbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbC9zaGFsbG93LWVxdWFsJztcbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuLi91dGlsL3NldHRpbmdzJztcblxuaW1wb3J0IHsgSU4sIE9VVCB9IGZyb20gJy4uL2ZsdXgvZ3JhcGgvZ3JhcGgtbW9kZWwnO1xuXG5cbmNvbnN0IHsgbGF5b3V0OiB7IGVkZ2VPZmZzZXQgfSB9ID0gc2V0dGluZ3M7XG5cbmNvbnN0IExpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgY29uc3Qge1xuICAgICAgZnJvbVBvcnQsXG4gICAgICB0b1BvcnQsXG4gICAgICBmcm9tTGF5b3V0LFxuICAgICAgdG9MYXlvdXQsXG4gICAgICBmcm9tTWVhc3VyZW1lbnRzLFxuICAgICAgdG9NZWFzdXJlbWVudHNcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHR5cGUgPSAoIGZyb21Qb3J0IHx8IHRvUG9ydCApLnR5cGU7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gWyAnbmJlLWxpbmsnLCAnbmJlLXR5cGUtJyArIHR5cGUgXS5qb2luKCAnICcgKTtcbiAgICBjb3VudCh7IHdoYXQ6IExpbmsuZGlzcGxheU5hbWUgfSk7XG5cbiAgICBpZiggIWZyb21NZWFzdXJlbWVudHMgfHwgIXRvTWVhc3VyZW1lbnRzICkge1xuICAgICAgLy8gbm90IG1lYXN1cmVkICh5ZXQpLCBlLmcuIGp1c3QgY3JlYXRlZFxuICAgICAgcmV0dXJuIDxwYXRoIC8+O1xuICAgIH1cblxuICAgIGNvbnN0IGZyb21Db29yZHMgPSB4eSggZnJvbUxheW91dCwgZnJvbU1lYXN1cmVtZW50cywgZnJvbVBvcnQsIE9VVCApO1xuICAgIGNvbnN0IHRvQ29vcmRzID0geHkoIHRvTGF5b3V0LCB0b01lYXN1cmVtZW50cywgdG9Qb3J0LCBJTiApO1xuXG4gICAgY29uc3QgYm94ZXMgPSBbXG4gICAgICByZWN0KCBmcm9tTGF5b3V0LCBmcm9tTWVhc3VyZW1lbnRzICksXG4gICAgICByZWN0KCB0b0xheW91dCwgdG9NZWFzdXJlbWVudHMgKVxuICAgIF07XG5cbiAgICBjb25zdCBkYXRhID0gcGF0aGluZy5jdWJpYyggZnJvbUNvb3JkcywgdG9Db29yZHMsIDEsIGJveGVzICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHBhdGggY2xhc3NOYW1lPXtjbGFzc2VzfSBkPXtkYXRhfSAvPlxuICAgICk7XG4gIH0sXG5cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApIHtcbiAgICByZXR1cm4gIXNoYWxsb3dFcXVhbCggbmV4dFByb3BzLCB0aGlzLnByb3BzICk7XG4gIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IExpbms7XG5cblxuZnVuY3Rpb24geHkoIGNvb3JkcywgbWVhc3VyZW1lbnRzLCBwb3J0LCBkaXJlY3Rpb24gKSB7XG4gIGlmKCBwb3J0ICkge1xuICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBjb29yZHM7XG4gICAgY29uc3QgcG9ydE9mZnNldCA9IG1lYXN1cmVtZW50c1sgZGlyZWN0aW9uIF0uZ2V0KCBwb3J0LmlkICk7XG4gICAgaWYoICFwb3J0T2Zmc2V0ICkge1xuICAgICAgLy8gOlRPRE86IGltcGxlbWVudCBzbWFydGVyIG1lYXN1cmVtZW50cy5cbiAgICAgIHJldHVybiBbIGxlZnQsIHRvcCBdO1xuICAgIH1cbiAgICByZXR1cm4gWyBsZWZ0ICsgcG9ydE9mZnNldC5sZWZ0LCB0b3AgKyBwb3J0T2Zmc2V0LnRvcCBdO1xuICB9XG5cbiAgLy8gZWRnZTpcbiAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IGNvb3JkcztcbiAgcmV0dXJuIFsgbGVmdCArIGVkZ2VPZmZzZXQsIHRvcCArIGVkZ2VPZmZzZXQgXTtcbn1cblxuXG5mdW5jdGlvbiByZWN0KCBjb29yZHMsIG1lYXN1cmVtZW50cyApIHtcbiAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IGNvb3JkcztcbiAgY29uc3QgeyBkaW1lbnNpb25zOiB7IHdpZHRoLCBoZWlnaHR9IH0gPSBtZWFzdXJlbWVudHM7XG4gIHJldHVybiB7XG4gICAgbGVmdDogbGVmdCxcbiAgICB0b3A6IHRvcCxcbiAgICByaWdodDogbGVmdCArIHdpZHRoLFxuICAgIGJvdHRvbTogdG9wICsgaGVpZ2h0XG4gIH07XG59XG4iXX0=