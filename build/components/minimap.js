define(['exports', 'module', 'react', '../util/shallow-equal', '../util/dragdrop', '../flux/settings/settings-actions', './links'], function (exports, module, _react, _utilShallowEqual, _utilDragdrop, _fluxSettingsSettingsActions, _links) {
  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _shallowEqual = _interopRequireDefault(_utilShallowEqual);

  var _dragdrop = _interopRequireDefault(_utilDragdrop);

  var _Links = _interopRequireDefault(_links);

  var min = Math.min;
  var max = Math.max;

  var Minimap = _React['default'].createClass({
    displayName: 'Minimap',

    render: function render() {
      var _props = this.props;
      var vertices = _props.vertices;
      var types = _props.types;
      var settings = _props.settings;
      var layout = _props.layout;
      var measurements = _props.measurements;
      var canvasSize = _props.canvasSize;
      var viewport = settings.viewport;

      var viewbox = [0, 0, canvasSize.width, canvasSize.height].join(' ');

      var mapWidth = settings.minimap.width;
      var mapHeight = mapWidth * (canvasSize.height / canvasSize.width);

      var boxStyle = {
        width: viewport.width / canvasSize.width * mapWidth,
        height: viewport.height / canvasSize.height * mapHeight,
        left: viewport.left / canvasSize.width * mapWidth,
        top: viewport.top / canvasSize.height * mapHeight
      };

      var showMap = viewport.width !== null && (canvasSize.width > viewport.width || canvasSize.height > viewport.height);

      var classes = 'nbe-minimap' + (showMap ? '' : ' nbe-hidden');

      return _React['default'].createElement(
        'div',
        { className: classes,
          onMouseDown: this.startDragReposition,
          style: { width: mapWidth, height: mapHeight } },
        _React['default'].createElement('div', { className: 'nbe-minimap-viewport',
          style: boxStyle }),
        _React['default'].createElement(
          'svg',
          { className: 'nbe-minimap-links',
            style: { width: mapWidth, height: mapHeight },
            viewBox: viewbox },
          _React['default'].createElement(_Links['default'], { measurements: measurements,
            types: types,
            vertices: vertices,
            layout: layout }),
          _React['default'].createElement(
            'g',
            { className: 'nbe-minimap-vertices' },
            this.vertices(layout, measurements)
          ),
          _React['default'].createElement(
            'g',
            { className: 'nbe-minimap-edges' },
            this.edges(layout, measurements)
          )
        ),
        _React['default'].createElement('div', { className: 'nbe-minimap-handle',
          onMouseDown: this.startDragResize })
      );
    },

    startDragReposition: function startDragReposition(ev) {
      var _this = this;

      (0, _dragdrop['default'])({
        dragThreshold: 0,
        onBeforeStart: function onBeforeStart(_, baseX, baseY) {
          _this.reposition(baseX, baseY);
          return true;
        },
        onMove: function onMove(_ref) {
          var _ref$base = _ref.base;
          var baseX = _ref$base.baseX;
          var baseY = _ref$base.baseY;
          var dragX = _ref.dragX;
          var dragY = _ref.dragY;
          var dragNode = _ref.dragNode;

          _this.reposition(baseX + dragX, baseY + dragY);
        }
      }).start(ev);
      ev.stopPropagation();
    },

    reposition: function reposition(mapX, mapY) {
      var _props2 = this.props;
      var _props2$settings = _props2.settings;
      var minimap = _props2$settings.minimap;
      var viewport = _props2$settings.viewport;
      var canvasSize = _props2.canvasSize;

      var toLeft = mapX / minimap.width * canvasSize.width;
      var toTop = mapY / this.mapHeight() * canvasSize.height;
      // center viewport at target coordinate:
      var left = max(0, min(toLeft - viewport.width / 2, canvasSize.width - viewport.width));
      var top = max(0, min(toTop - viewport.height / 2, canvasSize.height - viewport.height));
      this.bubble((0, _fluxSettingsSettingsActions.ViewportMoved)({ left: left, top: top, by: ':MINIMAP:' }));
    },

    startDragResize: function startDragResize(ev) {
      var _this2 = this;

      var minimap = this.props.settings.minimap;

      (0, _dragdrop['default'])({
        onMove: function onMove(_ref2) {
          var _ref2$dragPayload = _ref2.dragPayload;
          var baseWidth = _ref2$dragPayload.baseWidth;
          var baseHeight = _ref2$dragPayload.baseHeight;
          var dragX = _ref2.dragX;
          var dragY = _ref2.dragY;
          var dragNode = _ref2.dragNode;

          _this2.resize(baseWidth + dragX, baseHeight + dragY);
        }
      }).start(ev, { baseWidth: minimap.width, baseHeight: minimap.height });
      ev.stopPropagation();
    },

    resize: function resize(width, height) {
      this.bubble((0, _fluxSettingsSettingsActions.MinimapResized)({ width: width, height: height }));
    },

    mapHeight: function mapHeight() {
      var _props3 = this.props;
      var canvasSize = _props3.canvasSize;
      var width = _props3.settings.minimap.width;

      return width * (canvasSize.height / canvasSize.width);
    },

    bubble: function bubble(event) {
      var eventHandler = this.props.eventHandler;

      return eventHandler && eventHandler(event);
    },

    edges: function edges(layout, measurements) {
      return layout.edges.entrySeq().map(function (_ref3) {
        var _ref32 = _slicedToArray(_ref3, 2);

        var id = _ref32[0];
        var _ref32$1 = _ref32[1];
        var left = _ref32$1.left;
        var top = _ref32$1.top;

        var _ref4 = measurements.edges.get(id) || {};

        var dimensions = _ref4.dimensions;

        if (!dimensions) {
          return null;
        }
        var width = dimensions.width;

        var r = width / 2;
        return _React['default'].createElement('circle', { key: id, cx: left + r, cy: top + r, r: r });
      }).filter(function (_) {
        return _ !== null;
      });
    },

    vertices: function vertices(layout, measurements) {
      return layout.vertices.entrySeq().map(function (_ref5) {
        var _ref52 = _slicedToArray(_ref5, 2);

        var id = _ref52[0];
        var _ref52$1 = _ref52[1];
        var left = _ref52$1.left;
        var top = _ref52$1.top;

        var _ref6 = measurements.vertices.get(id) || {};

        var dimensions = _ref6.dimensions;

        if (!dimensions) {
          return null;
        }
        var width = dimensions.width;
        var height = dimensions.height;

        return _React['default'].createElement('rect', { key: id, x: left, y: top, height: height, width: width });
      }).filter(function (_) {
        return _ !== null;
      });
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);
    }

  });

  module.exports = Minimap;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21pbmltYXAuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztNQVNRLEdBQUcsR0FBVSxJQUFJLENBQWpCLEdBQUc7TUFBRSxHQUFHLEdBQUssSUFBSSxDQUFaLEdBQUc7O0FBRWhCLE1BQU0sT0FBTyxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7O0FBRWhDLFVBQU0sRUFBQSxrQkFBRzttQkFTSCxJQUFJLENBQUMsS0FBSztVQU5aLFFBQVEsVUFBUixRQUFRO1VBQ1IsS0FBSyxVQUFMLEtBQUs7VUFDTCxRQUFRLFVBQVIsUUFBUTtVQUNSLE1BQU0sVUFBTixNQUFNO1VBQ04sWUFBWSxVQUFaLFlBQVk7VUFDWixVQUFVLFVBQVYsVUFBVTtVQUdKLFFBQVEsR0FBSyxRQUFRLENBQXJCLFFBQVE7O0FBQ2hCLFVBQU0sT0FBTyxHQUFHLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUUsQ0FBQyxJQUFJLENBQUUsR0FBRyxDQUFFLENBQUM7O0FBRTFFLFVBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQ3hDLFVBQU0sU0FBUyxHQUFHLFFBQVEsSUFBSyxVQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUEsQ0FBRzs7QUFFdEUsVUFBTSxRQUFRLEdBQUc7QUFDZixhQUFLLEVBQUUsUUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFLLFFBQVE7QUFDdkQsY0FBTSxFQUFFLFFBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBSyxTQUFTO0FBQzNELFlBQUksRUFBRSxRQUFVLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLEdBQUssUUFBUTtBQUNyRCxXQUFHLEVBQUUsUUFBVSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsTUFBTSxHQUFLLFNB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TSxDQUFFLFVBQUEsQ0FBQztlQUFJLENBQUMsS0FBSyxJQUFJO09BQUEsQ0FBRSxDQUFDO0tBQy9COztBQUVELFlBQVEsRUFBQSxrQkFBRSxNQUFNLEVBQUUsWUFBWSxFQUFHO0FBQy9CLGFBQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUUsVUFBQyxLQUFxQixFQUFLO29DQUExQixLQUFxQjs7WUFBbkIsRUFBRTs7WUFBSSxJQUFJLFlBQUosSUFBSTtZQUFFLEdBQUcsWUFBSCxHQUFHOztvQkFDaEMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUUsRUFBRSxDQUFFLElBQUksRUFBRTs7WUFBcEQsVUFBVSxTQUFWLFVBQVU7O0FBQ2xCLFlBQUksQ0FBQyxVQUFVLEVBQUc7QUFDaEIsaUJBQU8sSUFBSSxDQUFDO1NBQ2I7WUFDTyxLQUFLLEdBQWEsVUFBVSxDQUE1QixLQUFLO1lBQUUsTUFBTSxHQUFLLFVBQVUsQ0FBckIsTUFBTTs7QUFDckIsZUFBTywwQ0FBTSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEdBQUksQ0FBQztPQUN6RSxDQUFFLENBQUMsTUFBTSxDQUFFLFVBQUEsQ0FBQztlQUFJLENBQUMsS0FBSyxJQUFJO09BQUEsQ0FBRSxDQUFDO0tBQy9COztBQUVELHlCQUFxQixFQUFBLCtCQUFFLFNBQVMsRUFBRztBQUNqQyxhQUFPLENBQUMsOEJBQWMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQztLQUMvQzs7R0FFRixDQUFDLENBQUM7O21CQUVZLE9BQU8iLCJmaWxlIjoibWluaW1hcC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgZHJhZ2Ryb3AgZnJvbSAnLi4vdXRpbC9kcmFnZHJvcCc7XG5pbXBvcnQgeyBWaWV3cG9ydE1vdmVkLCBNaW5pbWFwUmVzaXplZCB9IGZyb20gJy4uL2ZsdXgvc2V0dGluZ3Mvc2V0dGluZ3MtYWN0aW9ucyc7XG5cbmltcG9ydCBMaW5rcyBmcm9tICcuL2xpbmtzJztcblxuXG5jb25zdCB7IG1pbiwgbWF4IH0gPSBNYXRoO1xuXG5jb25zdCBNaW5pbWFwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IHtcbiAgICAgIHZlcnRpY2VzLFxuICAgICAgdHlwZXMsXG4gICAgICBzZXR0aW5ncyxcbiAgICAgIGxheW91dCxcbiAgICAgIG1lYXN1cmVtZW50cyxcbiAgICAgIGNhbnZhc1NpemVcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHsgdmlld3BvcnQgfSA9IHNldHRpbmdzO1xuICAgIGNvbnN0IHZpZXdib3ggPSBbIDAsIDAsIGNhbnZhc1NpemUud2lkdGgsIGNhbnZhc1NpemUuaGVpZ2h0IF0uam9pbiggJyAnICk7XG5cbiAgICBjb25zdCBtYXBXaWR0aCA9IHNldHRpbmdzLm1pbmltYXAud2lkdGg7XG4gICAgY29uc3QgbWFwSGVpZ2h0ID0gbWFwV2lkdGggKiAoIGNhbnZhc1NpemUuaGVpZ2h0IC8gY2FudmFzU2l6ZS53aWR0aCApO1xuXG4gICAgY29uc3QgYm94U3R5bGUgPSB7XG4gICAgICB3aWR0aDogKCB2aWV3cG9ydC53aWR0aCAvIGNhbnZhc1NpemUud2lkdGggKSAqIG1hcFdpZHRoLFxuICAgICAgaGVpZ2h0OiAoIHZpZXdwb3J0LmhlaWdodCAvIGNhbnZhc1NpemUuaGVpZ2h0ICkgKiBtYXBIZWlnaHQsXG4gICAgICBsZWZ0OiAoIHZpZXdwb3J0LmxlZnQgLyBjYW52YXNTaXplLndpZHRoICkgKiBtYXBXaWR0aCxcbiAgICAgIHRvcDogKCB2aWV3cG9ydC50b3AgLyBjYW52YXNTaXplLmhlaWdodCApICogbWFwSGVpZ2h0XG4gICAgfTtcblxuICAgIGNvbnN0IHNob3dNYXAgPSB2aWV3cG9ydC53aWR0aCAhPT0gbnVsbCAmJiAoXG4gICAgICBjYW52YXNTaXplLndpZHRoID4gdmlld3BvcnQud2lkdGggfHxcbiAgICAgIGNhbnZhc1NpemUuaGVpZ2h0ID4gdmlld3BvcnQuaGVpZ2h0ICk7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gJ25iZS1taW5pbWFwJyArICggc2hvd01hcCA/ICcnIDogJyBuYmUtaGlkZGVuJyApO1xuXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfVxuICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLnN0YXJ0RHJhZ1JlcG9zaXRpb259XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IG1hcFdpZHRoLCBoZWlnaHQ6IG1hcEhlaWdodCB9fT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSduYmUtbWluaW1hcC12aWV3cG9ydCdcbiAgICAgICAgICAgc3R5bGU9e2JveFN0eWxlfSAvPlxuICAgICAgPHN2ZyBjbGFzc05hbWU9J25iZS1taW5pbWFwLWxpbmtzJ1xuICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogbWFwV2lkdGgsIGhlaWdodDogbWFwSGVpZ2h0IH19XG4gICAgICAgICAgIHZpZXdCb3g9e3ZpZXdib3h9PlxuICAgICAgICA8TGlua3MgbWVhc3VyZW1lbnRzPXttZWFzdXJlbWVudHN9XG4gICAgICAgICAgICAgICB0eXBlcz17dHlwZXN9XG4gICAgICAgICAgICAgICB2ZXJ0aWNlcz17dmVydGljZXN9XG4gICAgICAgICAgICAgICBsYXlvdXQ9e2xheW91dH0gLz5cbiAgICAgICAgPGcgY2xhc3NOYW1lPSduYmUtbWluaW1hcC12ZXJ0aWNlcyc+XG4gICAgICAgICAge3RoaXMudmVydGljZXMoIGxheW91dCwgbWVhc3VyZW1lbnRzICl9XG4gICAgICAgIDwvZz5cbiAgICAgICAgPGcgY2xhc3NOYW1lPSduYmUtbWluaW1hcC1lZGdlcyc+XG4gICAgICAgICAge3RoaXMuZWRnZXMoIGxheW91dCwgbWVhc3VyZW1lbnRzICl9XG4gICAgICAgIDwvZz5cbiAgICAgIDwvc3ZnPlxuICAgICAgPGRpdiBjbGFzc05hbWU9J25iZS1taW5pbWFwLWhhbmRsZSdcbiAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuc3RhcnREcmFnUmVzaXplfS8+XG4gICAgPC9kaXY+O1xuICB9LFxuXG5cbiAgc3RhcnREcmFnUmVwb3NpdGlvbiggZXYgKSB7XG4gICAgZHJhZ2Ryb3Aoe1xuICAgICAgZHJhZ1RocmVzaG9sZDogMCxcbiAgICAgIG9uQmVmb3JlU3RhcnQ6ICggXywgYmFzZVgsIGJhc2VZICkgPT4ge1xuICAgICAgICB0aGlzLnJlcG9zaXRpb24oIGJhc2VYLCBiYXNlWSApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBvbk1vdmU6ICh7IGJhc2U6IHsgYmFzZVgsIGJhc2VZIH0sIGRyYWdYLCBkcmFnWSwgZHJhZ05vZGUgfSkgPT4ge1xuICAgICAgICB0aGlzLnJlcG9zaXRpb24oIGJhc2VYICsgZHJhZ1gsIGJhc2VZICsgZHJhZ1kgKTtcbiAgICAgIH1cbiAgICB9KS5zdGFydCggZXYgKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSxcblxuICByZXBvc2l0aW9uKCBtYXBYLCBtYXBZICkge1xuICAgIGNvbnN0IHsgc2V0dGluZ3M6IHsgbWluaW1hcCwgdmlld3BvcnQgfSwgY2FudmFzU2l6ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB0b0xlZnQgPSAobWFwWCAvIG1pbmltYXAud2lkdGgpICogY2FudmFzU2l6ZS53aWR0aDtcbiAgICBjb25zdCB0b1RvcCA9IChtYXBZIC8gdGhpcy5tYXBIZWlnaHQoKSkgKiBjYW52YXNTaXplLmhlaWdodDtcbiAgICAvLyBjZW50ZXIgdmlld3BvcnQgYXQgdGFyZ2V0IGNvb3JkaW5hdGU6XG4gICAgY29uc3QgbGVmdCA9IG1heCggMCxcbiAgICAgIG1pbiggdG9MZWZ0IC0gdmlld3BvcnQud2lkdGggLyAyLCBjYW52YXNTaXplLndpZHRoIC0gdmlld3BvcnQud2lkdGggKSApO1xuICAgIGNvbnN0IHRvcCA9IG1heCggMCxcbiAgICAgIG1pbiggdG9Ub3AgLSB2aWV3cG9ydC5oZWlnaHQgLyAyLCBjYW52YXNTaXplLmhlaWdodCAtIHZpZXdwb3J0LmhlaWdodCApICk7XG4gICAgdGhpcy5idWJibGUoIFZpZXdwb3J0TW92ZWQoeyBsZWZ0LCB0b3AsIGJ5OiAnOk1JTklNQVA6JyB9KSApO1xuICB9LFxuXG4gIHN0YXJ0RHJhZ1Jlc2l6ZSggZXYgKSB7XG4gICAgY29uc3QgeyBzZXR0aW5nczogeyBtaW5pbWFwIH0gfSA9IHRoaXMucHJvcHM7XG4gICAgZHJhZ2Ryb3Aoe1xuICAgICAgb25Nb3ZlOiAoeyBkcmFnUGF5bG9hZDogeyBiYXNlV2lkdGgsIGJhc2VIZWlnaHQgfSwgZHJhZ1gsIGRyYWdZLCBkcmFnTm9kZSB9KSA9PiB7XG4gICAgICAgIHRoaXMucmVzaXplKCBiYXNlV2lkdGggKyBkcmFnWCwgYmFzZUhlaWdodCArIGRyYWdZICk7XG4gICAgICB9XG4gICAgfSkuc3RhcnQoIGV2LCB7IGJhc2VXaWR0aDogbWluaW1hcC53aWR0aCwgYmFzZUhlaWdodDogbWluaW1hcC5oZWlnaHQgfSApO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9LFxuXG4gIHJlc2l6ZSggd2lkdGgsIGhlaWdodCApIHtcbiAgICB0aGlzLmJ1YmJsZSggTWluaW1hcFJlc2l6ZWQoeyB3aWR0aCwgaGVpZ2h0IH0pICk7XG4gIH0sXG5cbiAgbWFwSGVpZ2h0KCkge1xuICAgIGNvbnN0IHsgY2FudmFzU2l6ZSwgc2V0dGluZ3M6IHsgbWluaW1hcDogeyB3aWR0aCB9IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIHdpZHRoICogKCBjYW52YXNTaXplLmhlaWdodCAvIGNhbnZhc1NpemUud2lkdGggKTtcbiAgfSxcblxuICBidWJibGUoIGV2ZW50ICkge1xuICAgIGNvbnN0IHsgZXZlbnRIYW5kbGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBldmVudEhhbmRsZXIgJiYgZXZlbnRIYW5kbGVyKCBldmVudCApO1xuICB9LFxuXG4gIGVkZ2VzKCBsYXlvdXQsIG1lYXN1cmVtZW50cyApIHtcbiAgICByZXR1cm4gbGF5b3V0LmVkZ2VzLmVudHJ5U2VxKCkubWFwKCAoWyBpZCwgeyBsZWZ0LCB0b3AgfSBdKSA9PiB7XG4gICAgICBjb25zdCB7IGRpbWVuc2lvbnMgfSA9IG1lYXN1cmVtZW50cy5lZGdlcy5nZXQoIGlkICkgfHwge307XG4gICAgICBpZiggIWRpbWVuc2lvbnMgKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgeyB3aWR0aCB9ID0gZGltZW5zaW9ucztcbiAgICAgIGNvbnN0IHIgPSB3aWR0aCAvIDI7XG4gICAgICByZXR1cm4gPGNpcmNsZSBrZXk9e2lkfSBjeD17bGVmdCArIHJ9IGN5PXt0b3AgKyByfSByPXtyfSAvPjtcbiAgICB9ICkuZmlsdGVyKCBfID0+IF8gIT09IG51bGwgKTtcbiAgfSxcblxuICB2ZXJ0aWNlcyggbGF5b3V0LCBtZWFzdXJlbWVudHMgKSB7XG4gICAgcmV0dXJuIGxheW91dC52ZXJ0aWNlcy5lbnRyeVNlcSgpLm1hcCggKFsgaWQsIHsgbGVmdCwgdG9wIH0gXSkgPT4ge1xuICAgICAgY29uc3QgeyBkaW1lbnNpb25zIH0gPSBtZWFzdXJlbWVudHMudmVydGljZXMuZ2V0KCBpZCApIHx8IHt9O1xuICAgICAgaWYoICFkaW1lbnNpb25zICkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gZGltZW5zaW9ucztcbiAgICAgIHJldHVybiA8cmVjdCBrZXk9e2lkfSB4PXtsZWZ0fSB5PXt0b3B9IGhlaWdodD17aGVpZ2h0fSB3aWR0aD17d2lkdGh9IC8+O1xuICAgIH0gKS5maWx0ZXIoIF8gPT4gXyAhPT0gbnVsbCApO1xuICB9LFxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTWluaW1hcDtcbiJdfQ==