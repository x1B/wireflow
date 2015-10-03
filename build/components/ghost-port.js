define(['exports', 'module', 'react', '../util/pathing', '../flux/graph/graph-model', '../flux/layout/layout-model'], function (exports, module, _react, _utilPathing, _fluxGraphGraphModel, _fluxLayoutLayoutModel) {
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

      var portBox = rect(portCoords, (0, _fluxLayoutLayoutModel.Dimensions)({ width: 10, height: 10 }));
      var mouseBox = rect(mouseCoords, (0, _fluxLayoutLayoutModel.Dimensions)({ width: 1, height: 1 }));

      var _ref = port.direction === _fluxGraphGraphModel.OUT ? [portCoords, mouseCoords] : [mouseCoords, portCoords];

      var _ref2 = _slicedToArray(_ref, 2);

      var fromCoords = _ref2[0];
      var toCoords = _ref2[1];

      var _ref3 = port.direction === _fluxGraphGraphModel.OUT ? [portBox, mouseBox] : [mouseBox, portBox];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2dob3N0LXBvcnQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBT0EsTUFBTSxTQUFTLEdBQUcsT0FBTSxXQUFXLENBQUM7OztBQUVsQyxVQUFNLEVBQUEsa0JBQUc7VUFDQyxRQUFRLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBdkIsUUFBUTs7QUFDaEIsVUFBSSxDQUFDLFFBQVEsRUFBRztBQUNkLGVBQU8sK0JBQUssQ0FBQztPQUNkOztVQUVPLElBQUksR0FBOEIsUUFBUSxDQUExQyxJQUFJO1VBQUUsVUFBVSxHQUFrQixRQUFRLENBQXBDLFVBQVU7VUFBRSxXQUFXLEdBQUssUUFBUSxDQUF4QixXQUFXOztBQUNyQyxVQUFNLE9BQU8sR0FBRyxJQUFJLENBQUUsVUFBVSxFQUFFLDJCQVo3QixVQUFVLEVBWThCLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBRSxDQUFDO0FBQzFFLFVBQU0sUUFBUSxHQUFHLElBQUksQ0FBRSxXQUFXLEVBQUUsMkJBYi9CLFVBQVUsRUFhZ0MsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7O2lCQUV6QyxJQUFJLENBQUMsU0FBUywwQkFoQjFDLEdBQUcsR0FpQk4sQ0FBRSxVQUFVLEVBQUUsV0FBVyxDQUFFLEdBQzNCLENBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBRTs7OztVQUZyQixVQUFVO1VBQUUsUUFBUTs7a0JBSUQsSUFBSSxDQUFDLFNBQVMsMEJBcEJwQyxHQUFHLEdBcUJOLENBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBRSxHQUNyQixDQUFFLFFBQVEsRUFBRSxPQUFPLENBQUU7Ozs7VUFGZixPQUFPO1VBQUUsS0FBSzs7QUFJdEIsVUFBTSxJQUFJLEdBQUcsYUFBUSxLQUFLLENBQ3hCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUUsT0FBTyxFQUFFLEtBQUssQ0FBRSxDQUNwRCxDQUFDOztBQUVGLFVBQU0sT0FBTyxvQ0FBa0MsSUFBSSxDQUFDLElBQUksQ0FBRztBQUMzRCxhQUFPLCtCQUFNLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksR0FBSSxDQUFDO0tBQzlDOztHQUVGLENBQUMsQ0FBQzs7QUFHSCxXQUFTLEVBQUUsQ0FBRSxLQUFLLEVBQUc7QUFDbkIsV0FBTyxDQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBRSxDQUFDO0dBQ2xDOztBQUdELFdBQVMsSUFBSSxDQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUc7QUFDbEMsV0FBTztBQUNMLFVBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtBQUNqQixTQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7QUFDZixXQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSztBQUNyQyxZQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTTtLQUN2QyxDQUFDO0dBQ0g7O21CQUVjLFNBQVMiLCJmaWxlIjoiZ2hvc3QtcG9ydC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCAqIGFzIHBhdGhpbmcgZnJvbSAnLi4vdXRpbC9wYXRoaW5nJztcbmltcG9ydCB7IE9VVCB9IGZyb20gJy4uL2ZsdXgvZ3JhcGgvZ3JhcGgtbW9kZWwnO1xuaW1wb3J0IHsgRGltZW5zaW9ucyB9IGZyb20gJy4uL2ZsdXgvbGF5b3V0L2xheW91dC1tb2RlbCc7XG5cblxuY29uc3QgR2hvc3RQb3J0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGRyYWdJbmZvIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmKCAhZHJhZ0luZm8gKSB7XG4gICAgICByZXR1cm4gPGcgLz47XG4gICAgfVxuXG4gICAgY29uc3QgeyBwb3J0LCBwb3J0Q29vcmRzLCBtb3VzZUNvb3JkcyB9ID0gZHJhZ0luZm87XG4gICAgY29uc3QgcG9ydEJveCA9IHJlY3QoIHBvcnRDb29yZHMsIERpbWVuc2lvbnMoeyB3aWR0aDogMTAsIGhlaWdodDogMTAgfSkgKTtcbiAgICBjb25zdCBtb3VzZUJveCA9IHJlY3QoIG1vdXNlQ29vcmRzLCBEaW1lbnNpb25zKHsgd2lkdGg6IDEsIGhlaWdodDogMSB9KSApO1xuXG4gICAgY29uc3QgWyBmcm9tQ29vcmRzLCB0b0Nvb3JkcyBdID0gcG9ydC5kaXJlY3Rpb24gPT09IE9VVCA/XG4gICAgICBbIHBvcnRDb29yZHMsIG1vdXNlQ29vcmRzIF0gOlxuICAgICAgWyBtb3VzZUNvb3JkcywgcG9ydENvb3JkcyBdO1xuXG4gICAgY29uc3QgWyBmcm9tQm94LCB0b0JveCBdID0gcG9ydC5kaXJlY3Rpb24gPT09IE9VVCA/XG4gICAgICBbIHBvcnRCb3gsIG1vdXNlQm94IF0gOlxuICAgICAgWyBtb3VzZUJveCwgcG9ydEJveCBdO1xuXG4gICAgY29uc3QgZGF0YSA9IHBhdGhpbmcuY3ViaWMoXG4gICAgICB4eShmcm9tQ29vcmRzKSwgeHkodG9Db29yZHMpLCAxLCBbIGZyb21Cb3gsIHRvQm94IF1cbiAgICApO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IGBuYmUtbGluayBuYmUtZ2hvc3QgbmJlLXR5cGUtJHtwb3J0LnR5cGV9YDtcbiAgICByZXR1cm4gPHBhdGggY2xhc3NOYW1lPXtjbGFzc2VzfSBkPXtkYXRhfSAvPjtcbiAgfVxuXG59KTtcblxuXG5mdW5jdGlvbiB4eSggY29vcmQgKSB7XG4gIHJldHVybiBbIGNvb3JkLmxlZnQsIGNvb3JkLnRvcCBdO1xufVxuXG5cbmZ1bmN0aW9uIHJlY3QoIGNvb3JkcywgZGltZW5zaW9ucyApIHtcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBjb29yZHMubGVmdCxcbiAgICB0b3A6IGNvb3Jkcy50b3AsXG4gICAgcmlnaHQ6IGNvb3Jkcy5sZWZ0ICsgZGltZW5zaW9ucy53aWR0aCxcbiAgICBib3R0b206IGNvb3Jkcy50b3AgKyBkaW1lbnNpb25zLmhlaWdodFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHaG9zdFBvcnQ7XG4iXX0=