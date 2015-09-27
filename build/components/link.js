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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xpbmsuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7TUFPa0IsVUFBVSxpQkFBcEIsTUFBTSxDQUFJLFVBQVU7O0FBRzVCLE1BQU0sSUFBSSxHQUFHLE9BQU0sV0FBVyxDQUFDOzs7QUFFN0IsVUFBTSxFQUFBLGtCQUFHO21CQVNILElBQUksQ0FBQyxLQUFLO1VBTlosUUFBUSxVQUFSLFFBQVE7VUFDUixNQUFNLFVBQU4sTUFBTTtVQUNOLFVBQVUsVUFBVixVQUFVO1VBQ1YsUUFBUSxVQUFSLFFBQVE7VUFDUixnQkFBZ0IsVUFBaEIsZ0JBQWdCO1VBQ2hCLGNBQWMsVUFBZCxjQUFjOztBQUdoQixVQUFNLElBQUksR0FBRyxDQUFFLFFBQVEsSUFBSSxNQUFNLENBQUEsQ0FBRyxJQUFJLENBQUM7O0FBRXpDLFVBQU0sT0FBTyxHQUFHLENBQUUsVUFBVSxFQUFFLFdBQVcsR0FBRyxJQUFJLENBQUUsQ0FBQyxJQUFJLENBQUUsR0FBRyxDQUFFLENBQUM7QUFDL0QsNkJBQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7O0FBRWxDLFVBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLGNBQWMsRUFBRzs7QUFFekMsZUFBTyxrQ0FBUSxDQUFDO09BQ2pCOztBQUVELFVBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxTQS9CcEQsR0FBRyxDQStCd0QsQ0FBQztBQUNyRSxVQUFNLFFBQVEsR0FBRyxFQUFFLENBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxNQUFNLFNBaENoRCxFQUFFLENBZ0NvRCxDQUFDOztBQUU1RCxVQUFNLEtBQUssR0FBRyxDQUNaLElBQUksQ0FBRSxVQUFVLEVBQUUsZ0JBQWdCLENBQUUsRUFDcEMsSUFBSSxDQUFFLFFBQVEsRUFBRSxjQUFjLENBQUUsQ0FDakMsQ0FBQzs7QUFFRixVQUFNLElBQUksR0FBRyxhQUFRLEtBQUssQ0FBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUUsQ0FBQzs7QUFFN0QsYUFDRSwrQkFBTSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEdBQUksQ0FDckM7S0FDSDs7QUFHRCx5QkFBcUIsRUFBQSwrQkFBRSxTQUFTLEVBQUc7QUFDakMsYUFBTyxDQUFDLHVCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7S0FDL0M7O0dBRUYsQ0FBQyxDQUFDOzttQkFFWSxJQUFJOztBQUduQixXQUFTLEVBQUUsQ0FBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUc7QUFDbkQsUUFBSSxJQUFJLEVBQUc7VUFDRCxLQUFJLEdBQVUsTUFBTSxDQUFwQixJQUFJO1VBQUUsSUFBRyxHQUFLLE1BQU0sQ0FBZCxHQUFHOztBQUNqQixVQUFNLFVBQVUsR0FBRyxZQUFZLENBQUUsU0FBUyxDQUFFLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxFQUFFLENBQUUsQ0FBQztBQUM1RCxhQUFPLENBQUUsS0FBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUUsQ0FBQztLQUN6RDs7O1FBR08sSUFBSSxHQUFVLE1BQU0sQ0FBcEIsSUFBSTtRQUFFLEdBQUcsR0FBSyxNQUFNLENBQWQsR0FBRzs7QUFDakIsV0FBTyxDQUFFLElBQUksR0FBRyxVQUFVLEVBQUUsR0FBRyxHQUFHLFVBQVUsQ0FBRSxDQUFDO0dBQ2hEOztBQUdELFdBQVMsSUFBSSxDQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUc7UUFDNUIsSUFBSSxHQUFVLE1BQU0sQ0FBcEIsSUFBSTtRQUFFLEdBQUcsR0FBSyxNQUFNLENBQWQsR0FBRzttQ0FDd0IsWUFBWSxDQUE3QyxVQUFVO1FBQUksS0FBSyw0QkFBTCxLQUFLO1FBQUUsTUFBTSw0QkFBTixNQUFNOztBQUNuQyxXQUFPO0FBQ0wsVUFBSSxFQUFFLElBQUk7QUFDVixTQUFHLEVBQUUsR0FBRztBQUNSLFdBQUssRUFBRSxJQUFJLEdBQUcsS0FBSztBQUNuQixZQUFNLEVBQUUsR0FBRyxHQUFHLE1BQU07S0FDckIsQ0FBQztHQUNIIiwiZmlsZSI6ImxpbmsuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBJTiwgT1VUIH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IGNvdW50IGZyb20gJy4uL3V0aWwvbWV0cmljcyc7XG5pbXBvcnQgKiBhcyBwYXRoaW5nIGZyb20gJy4uL3V0aWwvcGF0aGluZyc7XG5pbXBvcnQgKiBhcyBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbC9zaGFsbG93LWVxdWFsJztcbmltcG9ydCAqIGFzIHNldHRpbmdzIGZyb20gJy4uL3V0aWwvc2V0dGluZ3MnO1xuY29uc3QgeyBsYXlvdXQ6IHsgZWRnZU9mZnNldCB9IH0gPSBzZXR0aW5ncztcblxuXG5jb25zdCBMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IHtcbiAgICAgIGZyb21Qb3J0LFxuICAgICAgdG9Qb3J0LFxuICAgICAgZnJvbUxheW91dCxcbiAgICAgIHRvTGF5b3V0LFxuICAgICAgZnJvbU1lYXN1cmVtZW50cyxcbiAgICAgIHRvTWVhc3VyZW1lbnRzXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB0eXBlID0gKCBmcm9tUG9ydCB8fCB0b1BvcnQgKS50eXBlO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IFsgJ25iZS1saW5rJywgJ25iZS10eXBlLScgKyB0eXBlIF0uam9pbiggJyAnICk7XG4gICAgY291bnQoeyB3aGF0OiBMaW5rLmRpc3BsYXlOYW1lIH0pO1xuXG4gICAgaWYoICFmcm9tTWVhc3VyZW1lbnRzIHx8ICF0b01lYXN1cmVtZW50cyApIHtcbiAgICAgIC8vIG5vdCBtZWFzdXJlZCAoeWV0KSwgZS5nLiBqdXN0IGNyZWF0ZWRcbiAgICAgIHJldHVybiA8cGF0aCAvPjtcbiAgICB9XG5cbiAgICBjb25zdCBmcm9tQ29vcmRzID0geHkoIGZyb21MYXlvdXQsIGZyb21NZWFzdXJlbWVudHMsIGZyb21Qb3J0LCBPVVQgKTtcbiAgICBjb25zdCB0b0Nvb3JkcyA9IHh5KCB0b0xheW91dCwgdG9NZWFzdXJlbWVudHMsIHRvUG9ydCwgSU4gKTtcblxuICAgIGNvbnN0IGJveGVzID0gW1xuICAgICAgcmVjdCggZnJvbUxheW91dCwgZnJvbU1lYXN1cmVtZW50cyApLFxuICAgICAgcmVjdCggdG9MYXlvdXQsIHRvTWVhc3VyZW1lbnRzIClcbiAgICBdO1xuXG4gICAgY29uc3QgZGF0YSA9IHBhdGhpbmcuY3ViaWMoIGZyb21Db29yZHMsIHRvQ29vcmRzLCAxLCBib3hlcyApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxwYXRoIGNsYXNzTmFtZT17Y2xhc3Nlc30gZD17ZGF0YX0gLz5cbiAgICApO1xuICB9LFxuXG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBMaW5rO1xuXG5cbmZ1bmN0aW9uIHh5KCBjb29yZHMsIG1lYXN1cmVtZW50cywgcG9ydCwgZGlyZWN0aW9uICkge1xuICBpZiggcG9ydCApIHtcbiAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gY29vcmRzO1xuICAgIGNvbnN0IHBvcnRPZmZzZXQgPSBtZWFzdXJlbWVudHNbIGRpcmVjdGlvbiBdLmdldCggcG9ydC5pZCApO1xuICAgIHJldHVybiBbIGxlZnQgKyBwb3J0T2Zmc2V0LmxlZnQsIHRvcCArIHBvcnRPZmZzZXQudG9wIF07XG4gIH1cblxuICAvLyBlZGdlOlxuICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gY29vcmRzO1xuICByZXR1cm4gWyBsZWZ0ICsgZWRnZU9mZnNldCwgdG9wICsgZWRnZU9mZnNldCBdO1xufVxuXG5cbmZ1bmN0aW9uIHJlY3QoIGNvb3JkcywgbWVhc3VyZW1lbnRzICkge1xuICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gY29vcmRzO1xuICBjb25zdCB7IGRpbWVuc2lvbnM6IHsgd2lkdGgsIGhlaWdodH0gfSA9IG1lYXN1cmVtZW50cztcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBsZWZ0LFxuICAgIHRvcDogdG9wLFxuICAgIHJpZ2h0OiBsZWZ0ICsgd2lkdGgsXG4gICAgYm90dG9tOiB0b3AgKyBoZWlnaHRcbiAgfTtcbn1cbiJdfQ==