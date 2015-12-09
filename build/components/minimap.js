define(['exports', 'module', 'react', '../util/shallow-equal', '../util/settings', '../util/dragdrop', '../flux/settings/settings-actions', './links'], function (exports, module, _react, _utilShallowEqual, _utilSettings, _utilDragdrop, _fluxSettingsSettingsActions, _links) {'use strict';var _slicedToArray = (function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i['return']) _i['return']();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError('Invalid attempt to destructure non-iterable instance');}};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _dragdrop = _interopRequireDefault(_utilDragdrop);var _Links = _interopRequireDefault(_links);var 









  min = Math.min;var max = Math.max;

  var Minimap = _React['default'].createClass({ displayName: 'Minimap', 

    mapDimensions: function mapDimensions(canvasSize, settings) {var 
      viewport = settings.viewport;
      var maxWidth = viewport.width * 0.8;
      var minBoxWidth = viewport.width * 0.02;
      var maxHeight = viewport.height * 0.95;
      var minBoxHeight = viewport.height * 0.02;

      var boxWidth = min(max(minBoxWidth, settings.minimap.width), maxHeight);
      var boxHeight = min(max(minBoxHeight, boxWidth * (canvasSize.height / canvasSize.width)), maxHeight);
      var width = min(boxWidth, boxHeight * (canvasSize.width / canvasSize.height));
      var height = width * (canvasSize.height / canvasSize.width);

      return { 
        width: width, 
        height: height, 
        boxWidth: boxWidth, 
        boxHeight: boxHeight };}, 



    render: function render() {var _props = 










      this.props;var edges = _props.edges;var vertices = _props.vertices;var types = _props.types;var settings = _props.settings;var layout = _props.layout;var selection = _props.selection;var measurements = _props.measurements;var canvasSize = _props.canvasSize;var 

      viewport = settings.viewport;var _mapDimensions = 






      this.mapDimensions(canvasSize, settings);var width = _mapDimensions.width;var height = _mapDimensions.height;var boxWidth = _mapDimensions.boxWidth;var boxHeight = _mapDimensions.boxHeight;

      var viewportStyle = { 
        width: viewport.width / canvasSize.width * width, 
        height: viewport.height / canvasSize.height * height, 
        left: viewport.left / canvasSize.width * width, 
        top: viewport.top / canvasSize.height * height };

      var viewbox = [0, 0, canvasSize.width, canvasSize.height].join(' ');

      var showMap = viewport.width !== null && (
      canvasSize.width > viewport.width || 
      canvasSize.height > viewport.height);

      var classes = 'nbe-minimap' + (showMap ? '' : ' nbe-hidden');

      return _React['default'].createElement('div', { className: classes, 
        onMouseDown: this.startDragReposition, 
        style: { width: boxWidth, height: boxHeight }, 
        ref: 'mapContainer' }, 
      _React['default'].createElement('div', { className: 'nbe-minimap-viewport', 
        style: viewportStyle }), 
      _React['default'].createElement('svg', { className: 'nbe-minimap-links', 
        style: { width: width, height: height }, 
        viewBox: viewbox }, 
      _React['default'].createElement(_Links['default'], { measurements: measurements, 
        types: types, 
        vertices: vertices, 
        layout: layout, 
        selection: selection }), 
      _React['default'].createElement('g', { className: 'nbe-minimap-vertices' }, 
      this.vertices(layout, measurements, vertices, selection.vertices)), 

      _React['default'].createElement('g', { className: 'nbe-minimap-edges' }, 
      this.edges(layout, measurements, edges, types, selection.edges))), 


      _React['default'].createElement('div', { className: 'nbe-minimap-handle', 
        onMouseDown: this.startDragResize }));}, 




    startDragReposition: function startDragReposition(ev) {var _this = this;
      (0, _dragdrop['default'])({ 
        dragThreshold: 0, 
        onBeforeStart: function onBeforeStart(_, baseX, baseY) {
          _this.reposition(baseX, baseY);
          return true;}, 

        onMove: function onMove(_ref) {var _ref$base = _ref.base;var baseX = _ref$base.baseX;var baseY = _ref$base.baseY;var dragX = _ref.dragX;var dragY = _ref.dragY;var dragNode = _ref.dragNode;
          _this.reposition(baseX + dragX, baseY + dragY);} }).

      start(ev, null, { target: _React['default'].findDOMNode(this.refs.mapContainer) });
      ev.stopPropagation();}, 


    reposition: function reposition(mapX, mapY) {var _props2 = 
      this.props;var canvasSize = _props2.canvasSize;var settings = _props2.settings;var _mapDimensions2 = 
      this.mapDimensions(canvasSize, settings);var width = _mapDimensions2.width;var height = _mapDimensions2.height;var 
      viewport = settings.viewport;
      var toLeft = mapX / width * canvasSize.width;
      var toTop = mapY / height * canvasSize.height;
      // center viewport at target coordinate:
      var left = max(0, 
      min(toLeft - viewport.width / 2, canvasSize.width - viewport.width));
      var top = max(0, 
      min(toTop - viewport.height / 2, canvasSize.height - viewport.height));
      this.bubble((0, _fluxSettingsSettingsActions.ViewportMoved)({ left: left, top: top, by: ':MINIMAP:' }));}, 


    startDragResize: function startDragResize(ev) {var _this2 = this;var _props3 = 
      this.props;var canvasSize = _props3.canvasSize;var settings = _props3.settings;var 
      minimap = settings.minimap;var _mapDimensions3 = 
      this.mapDimensions(canvasSize, settings);var boxWidth = _mapDimensions3.boxWidth;var boxHeight = _mapDimensions3.boxHeight;

      (0, _dragdrop['default'])({ 
        onMove: function onMove(_ref2) {var _ref2$dragPayload = _ref2.dragPayload;var baseWidth = _ref2$dragPayload.baseWidth;var baseHeight = _ref2$dragPayload.baseHeight;var dragX = _ref2.dragX;var dragY = _ref2.dragY;var dragNode = _ref2.dragNode;
          _this2.resize(baseWidth + dragX, baseHeight + dragY);} }).

      start(ev, { baseWidth: boxWidth, baseHeight: boxHeight });
      ev.stopPropagation();}, 


    resize: function resize(width, height) {
      this.bubble((0, _fluxSettingsSettingsActions.MinimapResized)({ width: width, height: height }));}, 


    mapHeight: function mapHeight() {var _props4 = 
      this.props;var canvasSize = _props4.canvasSize;var width = _props4.settings.minimap.width;
      return width * (canvasSize.height / canvasSize.width);}, 


    bubble: function bubble(event) {var 
      eventHandler = this.props.eventHandler;
      return eventHandler && eventHandler(event);}, 


    edges: function edges(layout, measurements, _edges, types, edgeSelection) {
      return layout.edges.entrySeq().map(function (_ref3) {var _ref32 = _slicedToArray(_ref3, 2);var id = _ref32[0];var _ref32$1 = _ref32[1];var left = _ref32$1.left;var top = _ref32$1.top;
        var edge = _edges.get(id);
        if (!edge || types.get(edge.type).owningPort) {
          return null;}var _ref4 = 

        measurements.edges.get(id) || {};var dimensions = _ref4.dimensions;
        if (!dimensions) {
          return null;}


        var r = _utilSettings.layout.edgeOffset;
        var selectionStateClass = 
        edgeSelection.has(id) ? 'nbe-selected' : '';
        var classes = 'nbe-minimap-edge nbe-type-' + 
        edge.type + ' ' + selectionStateClass;
        return _React['default'].createElement('circle', { className: classes, key: id, 
          cx: left + r, cy: top + r, r: r });}).
      filter(function (_) {return _ !== null;});}, 


    vertices: function vertices(layout, measurements, _vertices, vertexSelection) {
      return layout.vertices.entrySeq().map(function (_ref5) {var _ref52 = _slicedToArray(_ref5, 2);var id = _ref52[0];var _ref52$1 = _ref52[1];var left = _ref52$1.left;var top = _ref52$1.top;var _ref6 = 
        measurements.vertices.get(id) || {};var dimensions = _ref6.dimensions;
        if (!dimensions) {
          return null;}var _vertices$get = 

        _vertices.get(id);var kind = _vertices$get.kind;var 
        width = dimensions.width;var height = dimensions.height;
        var selectionStateClass = vertexSelection.has(id) ? 'nbe-selected' : '';
        var classes = 'nbe-minimap-vertex nbe-kind-' + 
        kind + ' ' + selectionStateClass;
        return _React['default'].createElement('rect', { className: classes, key: id, 
          x: left, y: top, height: height, width: width });}).
      filter(function (_) {return _ !== null;});}, 


    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);} });module.exports = 




  Minimap;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21pbmltYXAuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFVUSxLQUFHLEdBQVUsSUFBSSxDQUFqQixHQUFHLEtBQUUsR0FBRyxHQUFLLElBQUksQ0FBWixHQUFHOztBQUVoQixNQUFNLE9BQU8sR0FBRyxrQkFBTSxXQUFXLENBQUM7O0FBRWhDLGlCQUFhLEVBQUEsdUJBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRztBQUM1QixjQUFRLEdBQUssUUFBUSxDQUFyQixRQUFRO0FBQ2hCLFVBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ3RDLFVBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQzFDLFVBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ3pDLFVBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOztBQUU1QyxVQUFNLFFBQVEsR0FBRyxHQUFHLENBQUUsR0FBRyxDQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBRSxFQUFFLFNBQVMsQ0FBRSxDQUFDO0FBQzlFLFVBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBRSxHQUFHLENBQUUsWUFBWSxFQUFFLFFBQVEsSUFBSyxVQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUEsQUFBRSxDQUFFLEVBQUUsU0FBUyxDQUFFLENBQUM7QUFDN0csVUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFFLFFBQVEsRUFBRSxTQUFTLElBQUssVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFBLEFBQUUsQ0FBRSxDQUFDO0FBQ3BGLFVBQU0sTUFBTSxHQUFHLEtBQUssSUFBSyxVQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUEsQUFBRSxDQUFDOztBQUVoRSxh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QUFPIiwiZmlsZSI6Im1pbmltYXAuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlsL3NoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IHsgbGF5b3V0IGFzIGxheW91dFNldHRpbmdzIH0gZnJvbSAnLi4vdXRpbC9zZXR0aW5ncyc7XG5pbXBvcnQgZHJhZ2Ryb3AgZnJvbSAnLi4vdXRpbC9kcmFnZHJvcCc7XG5pbXBvcnQgeyBWaWV3cG9ydE1vdmVkLCBNaW5pbWFwUmVzaXplZCB9IGZyb20gJy4uL2ZsdXgvc2V0dGluZ3Mvc2V0dGluZ3MtYWN0aW9ucyc7XG5cbmltcG9ydCBMaW5rcyBmcm9tICcuL2xpbmtzJztcblxuXG5jb25zdCB7IG1pbiwgbWF4IH0gPSBNYXRoO1xuXG5jb25zdCBNaW5pbWFwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIG1hcERpbWVuc2lvbnMoIGNhbnZhc1NpemUsIHNldHRpbmdzICkge1xuICAgIGNvbnN0IHsgdmlld3BvcnQgfSA9IHNldHRpbmdzO1xuICAgIGNvbnN0IG1heFdpZHRoID0gdmlld3BvcnQud2lkdGggKiAwLjg7XG4gICAgY29uc3QgbWluQm94V2lkdGggPSB2aWV3cG9ydC53aWR0aCAqIDAuMDI7XG4gICAgY29uc3QgbWF4SGVpZ2h0ID0gdmlld3BvcnQuaGVpZ2h0ICogMC45NTtcbiAgICBjb25zdCBtaW5Cb3hIZWlnaHQgPSB2aWV3cG9ydC5oZWlnaHQgKiAwLjAyO1xuXG4gICAgY29uc3QgYm94V2lkdGggPSBtaW4oIG1heCggbWluQm94V2lkdGgsIHNldHRpbmdzLm1pbmltYXAud2lkdGggKSwgbWF4SGVpZ2h0ICk7XG4gICAgY29uc3QgYm94SGVpZ2h0ID0gbWluKCBtYXgoIG1pbkJveEhlaWdodCwgYm94V2lkdGggKiAoIGNhbnZhc1NpemUuaGVpZ2h0IC8gY2FudmFzU2l6ZS53aWR0aCApICksIG1heEhlaWdodCApO1xuICAgIGNvbnN0IHdpZHRoID0gbWluKCBib3hXaWR0aCwgYm94SGVpZ2h0ICogKCBjYW52YXNTaXplLndpZHRoIC8gY2FudmFzU2l6ZS5oZWlnaHQgKSApO1xuICAgIGNvbnN0IGhlaWdodCA9IHdpZHRoICogKCBjYW52YXNTaXplLmhlaWdodCAvIGNhbnZhc1NpemUud2lkdGggKTtcblxuICAgIHJldHVybiB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIGJveFdpZHRoLFxuICAgICAgYm94SGVpZ2h0XG4gICAgfTtcbiAgfSxcblxuICByZW5kZXIoKSB7XG5cbiAgICBjb25zdCB7XG4gICAgICBlZGdlcyxcbiAgICAgIHZlcnRpY2VzLFxuICAgICAgdHlwZXMsXG4gICAgICBzZXR0aW5ncyxcbiAgICAgIGxheW91dCxcbiAgICAgIHNlbGVjdGlvbixcbiAgICAgIG1lYXN1cmVtZW50cyxcbiAgICAgIGNhbnZhc1NpemVcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHsgdmlld3BvcnQgfSA9IHNldHRpbmdzO1xuXG4gICAgY29uc3Qge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBib3hXaWR0aCxcbiAgICAgIGJveEhlaWdodFxuICAgIH0gPSB0aGlzLm1hcERpbWVuc2lvbnMoIGNhbnZhc1NpemUsIHNldHRpbmdzICk7XG5cbiAgICBjb25zdCB2aWV3cG9ydFN0eWxlID0ge1xuICAgICAgd2lkdGg6ICggdmlld3BvcnQud2lkdGggLyBjYW52YXNTaXplLndpZHRoICkgKiB3aWR0aCxcbiAgICAgIGhlaWdodDogKCB2aWV3cG9ydC5oZWlnaHQgLyBjYW52YXNTaXplLmhlaWdodCApICogaGVpZ2h0LFxuICAgICAgbGVmdDogKCB2aWV3cG9ydC5sZWZ0IC8gY2FudmFzU2l6ZS53aWR0aCApICogd2lkdGgsXG4gICAgICB0b3A6ICggdmlld3BvcnQudG9wIC8gY2FudmFzU2l6ZS5oZWlnaHQgKSAqIGhlaWdodFxuICAgIH07XG4gICAgY29uc3Qgdmlld2JveCA9IFsgMCwgMCwgY2FudmFzU2l6ZS53aWR0aCwgY2FudmFzU2l6ZS5oZWlnaHQgXS5qb2luKCAnICcgKTtcblxuICAgIGNvbnN0IHNob3dNYXAgPSB2aWV3cG9ydC53aWR0aCAhPT0gbnVsbCAmJiAoXG4gICAgICBjYW52YXNTaXplLndpZHRoID4gdmlld3BvcnQud2lkdGggfHxcbiAgICAgIGNhbnZhc1NpemUuaGVpZ2h0ID4gdmlld3BvcnQuaGVpZ2h0ICk7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gJ25iZS1taW5pbWFwJyArICggc2hvd01hcCA/ICcnIDogJyBuYmUtaGlkZGVuJyApO1xuXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfVxuICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLnN0YXJ0RHJhZ1JlcG9zaXRpb259XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGJveFdpZHRoLCBoZWlnaHQ6IGJveEhlaWdodCB9fVxuICAgICAgICAgICAgICAgIHJlZj0nbWFwQ29udGFpbmVyJz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSduYmUtbWluaW1hcC12aWV3cG9ydCdcbiAgICAgICAgICAgc3R5bGU9e3ZpZXdwb3J0U3R5bGV9IC8+XG4gICAgICA8c3ZnIGNsYXNzTmFtZT0nbmJlLW1pbmltYXAtbGlua3MnXG4gICAgICAgICAgIHN0eWxlPXt7IHdpZHRoLCBoZWlnaHQgfX1cbiAgICAgICAgICAgdmlld0JveD17dmlld2JveH0+XG4gICAgICAgIDxMaW5rcyBtZWFzdXJlbWVudHM9e21lYXN1cmVtZW50c31cbiAgICAgICAgICAgICAgIHR5cGVzPXt0eXBlc31cbiAgICAgICAgICAgICAgIHZlcnRpY2VzPXt2ZXJ0aWNlc31cbiAgICAgICAgICAgICAgIGxheW91dD17bGF5b3V0fVxuICAgICAgICAgICAgICAgc2VsZWN0aW9uPXtzZWxlY3Rpb259IC8+XG4gICAgICAgIDxnIGNsYXNzTmFtZT0nbmJlLW1pbmltYXAtdmVydGljZXMnPlxuICAgICAgICAgIHt0aGlzLnZlcnRpY2VzKCBsYXlvdXQsIG1lYXN1cmVtZW50cywgdmVydGljZXMsIHNlbGVjdGlvbi52ZXJ0aWNlcyApfVxuICAgICAgICA8L2c+XG4gICAgICAgIDxnIGNsYXNzTmFtZT0nbmJlLW1pbmltYXAtZWRnZXMnPlxuICAgICAgICAgIHt0aGlzLmVkZ2VzKCBsYXlvdXQsIG1lYXN1cmVtZW50cywgZWRnZXMsIHR5cGVzLCBzZWxlY3Rpb24uZWRnZXMgKX1cbiAgICAgICAgPC9nPlxuICAgICAgPC9zdmc+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nbmJlLW1pbmltYXAtaGFuZGxlJ1xuICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5zdGFydERyYWdSZXNpemV9Lz5cbiAgICA8L2Rpdj47XG4gIH0sXG5cblxuICBzdGFydERyYWdSZXBvc2l0aW9uKCBldiApIHtcbiAgICBkcmFnZHJvcCh7XG4gICAgICBkcmFnVGhyZXNob2xkOiAwLFxuICAgICAgb25CZWZvcmVTdGFydDogKCBfLCBiYXNlWCwgYmFzZVkgKSA9PiB7XG4gICAgICAgIHRoaXMucmVwb3NpdGlvbiggYmFzZVgsIGJhc2VZICk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIG9uTW92ZTogKHsgYmFzZTogeyBiYXNlWCwgYmFzZVkgfSwgZHJhZ1gsIGRyYWdZLCBkcmFnTm9kZSB9KSA9PiB7XG4gICAgICAgIHRoaXMucmVwb3NpdGlvbiggYmFzZVggKyBkcmFnWCwgYmFzZVkgKyBkcmFnWSApO1xuICAgICAgfVxuICAgIH0pLnN0YXJ0KCBldiwgbnVsbCwgeyB0YXJnZXQ6IFJlYWN0LmZpbmRET01Ob2RlKCB0aGlzLnJlZnMubWFwQ29udGFpbmVyICkgfSApO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9LFxuXG4gIHJlcG9zaXRpb24oIG1hcFgsIG1hcFkgKSB7XG4gICAgY29uc3QgeyBjYW52YXNTaXplLCBzZXR0aW5ncyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMubWFwRGltZW5zaW9ucyggY2FudmFzU2l6ZSwgc2V0dGluZ3MgKTtcbiAgICBjb25zdCB7IHZpZXdwb3J0IH0gPSBzZXR0aW5ncztcbiAgICBjb25zdCB0b0xlZnQgPSAobWFwWCAvIHdpZHRoKSAqIGNhbnZhc1NpemUud2lkdGg7XG4gICAgY29uc3QgdG9Ub3AgPSAobWFwWSAvIGhlaWdodCkgKiBjYW52YXNTaXplLmhlaWdodDtcbiAgICAvLyBjZW50ZXIgdmlld3BvcnQgYXQgdGFyZ2V0IGNvb3JkaW5hdGU6XG4gICAgY29uc3QgbGVmdCA9IG1heCggMCxcbiAgICAgIG1pbiggdG9MZWZ0IC0gdmlld3BvcnQud2lkdGggLyAyLCBjYW52YXNTaXplLndpZHRoIC0gdmlld3BvcnQud2lkdGggKSApO1xuICAgIGNvbnN0IHRvcCA9IG1heCggMCxcbiAgICAgIG1pbiggdG9Ub3AgLSB2aWV3cG9ydC5oZWlnaHQgLyAyLCBjYW52YXNTaXplLmhlaWdodCAtIHZpZXdwb3J0LmhlaWdodCApICk7XG4gICAgdGhpcy5idWJibGUoIFZpZXdwb3J0TW92ZWQoeyBsZWZ0LCB0b3AsIGJ5OiAnOk1JTklNQVA6JyB9KSApO1xuICB9LFxuXG4gIHN0YXJ0RHJhZ1Jlc2l6ZSggZXYgKSB7XG4gICAgY29uc3QgeyBjYW52YXNTaXplLCBzZXR0aW5ncyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG1pbmltYXAgfSA9IHNldHRpbmdzO1xuICAgIGNvbnN0IHsgYm94V2lkdGgsIGJveEhlaWdodCB9ID0gdGhpcy5tYXBEaW1lbnNpb25zKCBjYW52YXNTaXplLCBzZXR0aW5ncyApO1xuXG4gICAgZHJhZ2Ryb3Aoe1xuICAgICAgb25Nb3ZlOiAoeyBkcmFnUGF5bG9hZDogeyBiYXNlV2lkdGgsIGJhc2VIZWlnaHQgfSwgZHJhZ1gsIGRyYWdZLCBkcmFnTm9kZSB9KSA9PiB7XG4gICAgICAgIHRoaXMucmVzaXplKCBiYXNlV2lkdGggKyBkcmFnWCwgYmFzZUhlaWdodCArIGRyYWdZICk7XG4gICAgICB9XG4gICAgfSkuc3RhcnQoIGV2LCB7IGJhc2VXaWR0aDogYm94V2lkdGgsIGJhc2VIZWlnaHQ6IGJveEhlaWdodCB9ICk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0sXG5cbiAgcmVzaXplKCB3aWR0aCwgaGVpZ2h0ICkge1xuICAgIHRoaXMuYnViYmxlKCBNaW5pbWFwUmVzaXplZCh7IHdpZHRoLCBoZWlnaHQgfSkgKTtcbiAgfSxcblxuICBtYXBIZWlnaHQoKSB7XG4gICAgY29uc3QgeyBjYW52YXNTaXplLCBzZXR0aW5nczogeyBtaW5pbWFwOiB7IHdpZHRoIH0gfSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gd2lkdGggKiAoIGNhbnZhc1NpemUuaGVpZ2h0IC8gY2FudmFzU2l6ZS53aWR0aCApO1xuICB9LFxuXG4gIGJ1YmJsZSggZXZlbnQgKSB7XG4gICAgY29uc3QgeyBldmVudEhhbmRsZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlciAmJiBldmVudEhhbmRsZXIoIGV2ZW50ICk7XG4gIH0sXG5cbiAgZWRnZXMoIGxheW91dCwgbWVhc3VyZW1lbnRzLCBlZGdlcywgdHlwZXMsIGVkZ2VTZWxlY3Rpb24gKSB7XG4gICAgcmV0dXJuIGxheW91dC5lZGdlcy5lbnRyeVNlcSgpLm1hcCggKFsgaWQsIHsgbGVmdCwgdG9wIH0gXSkgPT4ge1xuICAgICAgY29uc3QgZWRnZSA9IGVkZ2VzLmdldCggaWQgKTtcbiAgICAgIGlmKCAhZWRnZSB8fCB0eXBlcy5nZXQoIGVkZ2UudHlwZSApLm93bmluZ1BvcnQgKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBkaW1lbnNpb25zIH0gPSBtZWFzdXJlbWVudHMuZWRnZXMuZ2V0KCBpZCApIHx8IHt9O1xuICAgICAgaWYoICFkaW1lbnNpb25zICkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgciA9IGxheW91dFNldHRpbmdzLmVkZ2VPZmZzZXQ7XG4gICAgICBjb25zdCBzZWxlY3Rpb25TdGF0ZUNsYXNzID1cbiAgICAgICAgZWRnZVNlbGVjdGlvbi5oYXMoIGlkICkgPyAnbmJlLXNlbGVjdGVkJyA6ICcnO1xuICAgICAgY29uc3QgY2xhc3NlcyA9XG4gICAgICAgIGBuYmUtbWluaW1hcC1lZGdlIG5iZS10eXBlLSR7ZWRnZS50eXBlfSAke3NlbGVjdGlvblN0YXRlQ2xhc3N9YDtcbiAgICAgIHJldHVybiA8Y2lyY2xlIGNsYXNzTmFtZT17Y2xhc3Nlc30ga2V5PXtpZH1cbiAgICAgICAgICAgICAgICAgICAgIGN4PXtsZWZ0ICsgcn0gY3k9e3RvcCArIHJ9IHI9e3J9IC8+O1xuICAgIH0gKS5maWx0ZXIoIF8gPT4gXyAhPT0gbnVsbCApO1xuICB9LFxuXG4gIHZlcnRpY2VzKCBsYXlvdXQsIG1lYXN1cmVtZW50cywgdmVydGljZXMsIHZlcnRleFNlbGVjdGlvbiApIHtcbiAgICByZXR1cm4gbGF5b3V0LnZlcnRpY2VzLmVudHJ5U2VxKCkubWFwKCAoWyBpZCwgeyBsZWZ0LCB0b3AgfSBdKSA9PiB7XG4gICAgICBjb25zdCB7IGRpbWVuc2lvbnMgfSA9IG1lYXN1cmVtZW50cy52ZXJ0aWNlcy5nZXQoIGlkICkgfHwge307XG4gICAgICBpZiggIWRpbWVuc2lvbnMgKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBraW5kIH0gPSB2ZXJ0aWNlcy5nZXQoIGlkICk7XG4gICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGRpbWVuc2lvbnM7XG4gICAgICBjb25zdCBzZWxlY3Rpb25TdGF0ZUNsYXNzID0gdmVydGV4U2VsZWN0aW9uLmhhcyggaWQgKSA/ICduYmUtc2VsZWN0ZWQnIDogJyc7XG4gICAgICBjb25zdCBjbGFzc2VzID1cbiAgICAgICAgYG5iZS1taW5pbWFwLXZlcnRleCBuYmUta2luZC0ke2tpbmR9ICR7c2VsZWN0aW9uU3RhdGVDbGFzc31gO1xuICAgICAgcmV0dXJuIDxyZWN0IGNsYXNzTmFtZT17Y2xhc3Nlc30ga2V5PXtpZH1cbiAgICAgICAgICAgICAgICAgICB4PXtsZWZ0fSB5PXt0b3B9IGhlaWdodD17aGVpZ2h0fSB3aWR0aD17d2lkdGh9IC8+O1xuICAgIH0gKS5maWx0ZXIoIF8gPT4gXyAhPT0gbnVsbCApO1xuICB9LFxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTWluaW1hcDtcbiJdfQ==