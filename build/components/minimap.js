define(['exports', 'module', 'react', '../util/shallow-equal', '../util/settings', '../util/dragdrop', '../flux/settings/settings-actions', './links'], function (exports, module, _react, _utilShallowEqual, _utilSettings, _utilDragdrop, _fluxSettingsSettingsActions, _links) {'use strict';var _slicedToArray = (function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i['return']) _i['return']();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError('Invalid attempt to destructure non-iterable instance');}};})();var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}function _defaultProps(defaultProps, props) {if (defaultProps) {for (var propName in defaultProps) {if (typeof props[propName] === 'undefined') {props[propName] = defaultProps[propName];}}}return props;}var _React = _interopRequireDefault(_react);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _dragdrop = _interopRequireDefault(_utilDragdrop);var _Links = _interopRequireDefault(_links);var 









  min = Math.min;var max = Math.max;

  var Minimap = _React['default'].createClass({ displayName: 'Minimap', 

    mapDimensions: function mapDimensions(canvasSize, settings) {var 
      viewport = settings.viewport;
      var maxWidth = viewport.width * 0.9;
      var minBoxWidth = viewport.width * 0.02;
      var maxHeight = viewport.height * 0.95;
      var minBoxHeight = viewport.height * 0.02;

      var boxWidth = min(
      max(minBoxWidth, settings.minimap.width), 
      maxWidth);
      var boxHeight = min(
      max(minBoxHeight, boxWidth * (canvasSize.height / canvasSize.width)), 
      maxHeight);

      var width = 
      min(boxWidth, boxHeight * (canvasSize.width / canvasSize.height));
      var height = 
      width * (canvasSize.height / canvasSize.width);

      return { 
        width: width, 
        height: height, 
        boxWidth: boxWidth, 
        boxHeight: boxHeight };}, 



    render: function render() {var _props = 










      this.props;var edges = _props.edges;var vertices = _props.vertices;var types = _props.types;var settings = _props.settings;var layout = _props.layout;var selection = _props.selection;var measurements = _props.measurements;var canvasSize = _props.canvasSize;var 

      viewport = settings.viewport;var _mapDimensions = 






      this.mapDimensions(canvasSize, settings);var width = _mapDimensions.width;var height = _mapDimensions.height;var boxWidth = _mapDimensions.boxWidth;var boxHeight = _mapDimensions.boxHeight;

      var viewportStyleLeft = viewport.left / canvasSize.width * width;
      var viewportStyleTop = viewport.top / canvasSize.height * height;
      var viewportStyle = { 
        width: viewport.width / canvasSize.width * width, 
        height: viewport.height / canvasSize.height * height, 
        transform: 'translate(' + viewportStyleLeft + 'px, ' + viewportStyleTop + 'px)' };

      var viewbox = [0, 0, canvasSize.width, canvasSize.height].join(' ');

      var showMap = viewport.width !== null && (
      canvasSize.width > viewport.width || 
      canvasSize.height > viewport.height);

      var classes = 'nbe-minimap' + (showMap ? '' : ' nbe-hidden');

      return _React['default'].createElement('div', { className: classes, 
        onMouseDown: this.startDragReposition, 
        style: { width: boxWidth, height: boxHeight }, 
        ref: 'mapContainer' }, { $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { 
          className: 'nbe-minimap-viewport', 
          style: viewportStyle }, _owner: null }, { $$typeof: _typeofReactElement, type: 'svg', key: null, ref: null, props: { children: [{ $$typeof: _typeofReactElement, type: _Links['default'], key: null, ref: null, props: _defaultProps(_Links['default'].defaultProps, { 



              measurements: measurements, 
              types: types, 
              vertices: vertices, 
              layout: layout, 
              selection: selection }), _owner: null }, { $$typeof: _typeofReactElement, type: 'g', key: null, ref: null, props: { children: 

              this.vertices(layout, measurements, vertices, selection.vertices), className: 'nbe-minimap-vertices' }, _owner: null }, { $$typeof: _typeofReactElement, type: 'g', key: null, ref: null, props: { children: 


              this.edges(layout, measurements, edges, types, selection.edges), className: 'nbe-minimap-edges' }, _owner: null }], className: 'nbe-minimap-links', style: { width: width, height: height }, viewBox: viewbox }, _owner: null }, { $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { 


          className: 'nbe-minimap-handle', 
          onMouseDown: this.startDragResize }, _owner: null });}, 




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
        return { $$typeof: _typeofReactElement, type: 'circle', key: id, ref: null, props: { className: classes, 
            cx: left + r, cy: top + r, r: r }, _owner: null };}).
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
        return { $$typeof: _typeofReactElement, type: 'rect', key: id, ref: null, props: { className: classes, 
            x: left, y: top, height: height, width: width }, _owner: null };}).
      filter(function (_) {return _ !== null;});}, 


    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);} });module.exports = 




  Minimap;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21pbmltYXAuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFVUSxLQUFHLEdBQVUsSUFBSSxDQUFqQixHQUFHLEtBQUUsR0FBRyxHQUFLLElBQUksQ0FBWixHQUFHOztBQUVoQixNQUFNLE9BQU8sR0FBRyxrQkFBTSxXQUFXLENBQUM7O0FBRWhDLGlCQUFhLEVBQUEsdUJBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRztBQUM1QixjQUFRLEdBQUssUUFBUSxDQUFyQixRQUFRO0FBQ2hCLFVBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ3RDLFVBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQzFDLFVBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ3pDLFVBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOztBQUU1QyxVQUFNLFFBQVEsR0FBRyxHQUFHO0FBQ2xCLFNBQUcsQ0FBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUU7QUFDMUMsY0FBUSxDQUFFLENBQUM7QUFDYixVQUFNLFNBQVMsR0FBRyxHQUFHO0FBQ25CLFNBQUcsQ0FBRSxZQUFZLEVBQUUsUUFBUSxJQUFLLFVBQVUsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQSxBQUFFLENBQUU7QUFDeEUsZUFBUyxDQUFFLENBQUM7O0FBRWQsVUFBTSxLQUFLO0FBQ1QsU0FBRyxDQUFFLFFBQVEsRUFBRSxTQUFTLElBQUssVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFBLEFBQUUsQ0FBRSxDQUFDO0FBQ3hFLFVBQU0sTUFBTTtBQUNWLFdBQUssSUFBSyxVQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUEsQUFBRSxDQUFDOztBQUVu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LEVBQUUsQ0FBQyxHQUFHLENBQUUsVUFBQyxLQUFxQixFQUFLLDZCQUExQixLQUFxQixTQUFuQixFQUFFLDBDQUFJLElBQUksWUFBSixJQUFJLEtBQUUsR0FBRyxZQUFILEdBQUc7QUFDaEMsb0JBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBRSxJQUFJLEVBQUUsS0FBcEQsVUFBVSxTQUFWLFVBQVU7QUFDbEIsWUFBSSxDQUFDLFVBQVUsRUFBRztBQUNoQixpQkFBTyxJQUFJLENBQUMsQ0FDYjs7QUFDZ0IsaUJBQVEsQ0FBQyxHQUFHLENBQUUsRUFBRSxDQUFFLEtBQTNCLElBQUksaUJBQUosSUFBSTtBQUNKLGFBQUssR0FBYSxVQUFVLENBQTVCLEtBQUssS0FBRSxNQUFNLEdBQUssVUFBVSxDQUFyQixNQUFNO0FBQ3JCLFlBQU0sbUJBQW1CLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUUsR0FBRyxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQzVFLFlBQU0sT0FBTztBQUNvQixZQUFJLFNBQUksbUJBQW1CLEFBQUUsQ0FBQztBQUMvRCxtRUFBc0MsRUFBRSxzQkFBM0IsU0FBUyxFQUFFLE9BQU87QUFDbEIsYUFBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssbUJBQUssQ0FDaEUsQ0FBRTtBQUFDLFlBQU0sQ0FBRSxVQUFBLENBQUMsVUFBSSxDQUFDLEtBQUssSUFBSSxFQUFBLENBQUUsQ0FBQyxDQUMvQjs7O0FBRUQseUJBQXFCLEVBQUEsK0JBQUUsU0FBUyxFQUFHO0FBQ2pDLGFBQU8sQ0FBQyw4QkFBYyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDLENBQy9DLEVBRUYsQ0FBQyxDQUFDOzs7OztBQUVZLFNBQU8iLCJmaWxlIjoibWluaW1hcC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgeyBsYXlvdXQgYXMgbGF5b3V0U2V0dGluZ3MgfSBmcm9tICcuLi91dGlsL3NldHRpbmdzJztcbmltcG9ydCBkcmFnZHJvcCBmcm9tICcuLi91dGlsL2RyYWdkcm9wJztcbmltcG9ydCB7IFZpZXdwb3J0TW92ZWQsIE1pbmltYXBSZXNpemVkIH0gZnJvbSAnLi4vZmx1eC9zZXR0aW5ncy9zZXR0aW5ncy1hY3Rpb25zJztcblxuaW1wb3J0IExpbmtzIGZyb20gJy4vbGlua3MnO1xuXG5cbmNvbnN0IHsgbWluLCBtYXggfSA9IE1hdGg7XG5cbmNvbnN0IE1pbmltYXAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgbWFwRGltZW5zaW9ucyggY2FudmFzU2l6ZSwgc2V0dGluZ3MgKSB7XG4gICAgY29uc3QgeyB2aWV3cG9ydCB9ID0gc2V0dGluZ3M7XG4gICAgY29uc3QgbWF4V2lkdGggPSB2aWV3cG9ydC53aWR0aCAqIDAuOTtcbiAgICBjb25zdCBtaW5Cb3hXaWR0aCA9IHZpZXdwb3J0LndpZHRoICogMC4wMjtcbiAgICBjb25zdCBtYXhIZWlnaHQgPSB2aWV3cG9ydC5oZWlnaHQgKiAwLjk1O1xuICAgIGNvbnN0IG1pbkJveEhlaWdodCA9IHZpZXdwb3J0LmhlaWdodCAqIDAuMDI7XG5cbiAgICBjb25zdCBib3hXaWR0aCA9IG1pbihcbiAgICAgIG1heCggbWluQm94V2lkdGgsIHNldHRpbmdzLm1pbmltYXAud2lkdGggKSxcbiAgICAgIG1heFdpZHRoICk7XG4gICAgY29uc3QgYm94SGVpZ2h0ID0gbWluKFxuICAgICAgbWF4KCBtaW5Cb3hIZWlnaHQsIGJveFdpZHRoICogKCBjYW52YXNTaXplLmhlaWdodCAvIGNhbnZhc1NpemUud2lkdGggKSApLFxuICAgICAgbWF4SGVpZ2h0ICk7XG5cbiAgICBjb25zdCB3aWR0aCA9XG4gICAgICBtaW4oIGJveFdpZHRoLCBib3hIZWlnaHQgKiAoIGNhbnZhc1NpemUud2lkdGggLyBjYW52YXNTaXplLmhlaWdodCApICk7XG4gICAgY29uc3QgaGVpZ2h0ID1cbiAgICAgIHdpZHRoICogKCBjYW52YXNTaXplLmhlaWdodCAvIGNhbnZhc1NpemUud2lkdGggKTtcblxuICAgIHJldHVybiB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIGJveFdpZHRoLFxuICAgICAgYm94SGVpZ2h0XG4gICAgfTtcbiAgfSxcblxuICByZW5kZXIoKSB7XG5cbiAgICBjb25zdCB7XG4gICAgICBlZGdlcyxcbiAgICAgIHZlcnRpY2VzLFxuICAgICAgdHlwZXMsXG4gICAgICBzZXR0aW5ncyxcbiAgICAgIGxheW91dCxcbiAgICAgIHNlbGVjdGlvbixcbiAgICAgIG1lYXN1cmVtZW50cyxcbiAgICAgIGNhbnZhc1NpemVcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHsgdmlld3BvcnQgfSA9IHNldHRpbmdzO1xuXG4gICAgY29uc3Qge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBib3hXaWR0aCxcbiAgICAgIGJveEhlaWdodFxuICAgIH0gPSB0aGlzLm1hcERpbWVuc2lvbnMoIGNhbnZhc1NpemUsIHNldHRpbmdzICk7XG5cbiAgICBjb25zdCB2aWV3cG9ydFN0eWxlTGVmdCA9ICggdmlld3BvcnQubGVmdCAvIGNhbnZhc1NpemUud2lkdGggKSAqIHdpZHRoO1xuICAgIGNvbnN0IHZpZXdwb3J0U3R5bGVUb3AgPSAoIHZpZXdwb3J0LnRvcCAvIGNhbnZhc1NpemUuaGVpZ2h0ICkgKiBoZWlnaHQ7XG4gICAgY29uc3Qgdmlld3BvcnRTdHlsZSA9IHtcbiAgICAgIHdpZHRoOiAoIHZpZXdwb3J0LndpZHRoIC8gY2FudmFzU2l6ZS53aWR0aCApICogd2lkdGgsXG4gICAgICBoZWlnaHQ6ICggdmlld3BvcnQuaGVpZ2h0IC8gY2FudmFzU2l6ZS5oZWlnaHQgKSAqIGhlaWdodCxcbiAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgnICsgdmlld3BvcnRTdHlsZUxlZnQgKyAncHgsICcgKyB2aWV3cG9ydFN0eWxlVG9wICsgJ3B4KSdcbiAgICB9O1xuICAgIGNvbnN0IHZpZXdib3ggPSBbIDAsIDAsIGNhbnZhc1NpemUud2lkdGgsIGNhbnZhc1NpemUuaGVpZ2h0IF0uam9pbiggJyAnICk7XG5cbiAgICBjb25zdCBzaG93TWFwID0gdmlld3BvcnQud2lkdGggIT09IG51bGwgJiYgKFxuICAgICAgY2FudmFzU2l6ZS53aWR0aCA+IHZpZXdwb3J0LndpZHRoIHx8XG4gICAgICBjYW52YXNTaXplLmhlaWdodCA+IHZpZXdwb3J0LmhlaWdodCApO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9ICduYmUtbWluaW1hcCcgKyAoIHNob3dNYXAgPyAnJyA6ICcgbmJlLWhpZGRlbicgKTtcblxuICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9XG4gICAgICAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuc3RhcnREcmFnUmVwb3NpdGlvbn1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogYm94V2lkdGgsIGhlaWdodDogYm94SGVpZ2h0IH19XG4gICAgICAgICAgICAgICAgcmVmPSdtYXBDb250YWluZXInPlxuICAgICAgPGRpdiBjbGFzc05hbWU9J25iZS1taW5pbWFwLXZpZXdwb3J0J1xuICAgICAgICAgICBzdHlsZT17dmlld3BvcnRTdHlsZX0+PC9kaXY+XG4gICAgICA8c3ZnIGNsYXNzTmFtZT0nbmJlLW1pbmltYXAtbGlua3MnXG4gICAgICAgICAgIHN0eWxlPXt7IHdpZHRoLCBoZWlnaHQgfX1cbiAgICAgICAgICAgdmlld0JveD17dmlld2JveH0+XG4gICAgICAgIDxMaW5rcyBtZWFzdXJlbWVudHM9e21lYXN1cmVtZW50c31cbiAgICAgICAgICAgICAgIHR5cGVzPXt0eXBlc31cbiAgICAgICAgICAgICAgIHZlcnRpY2VzPXt2ZXJ0aWNlc31cbiAgICAgICAgICAgICAgIGxheW91dD17bGF5b3V0fVxuICAgICAgICAgICAgICAgc2VsZWN0aW9uPXtzZWxlY3Rpb259PjwvTGlua3M+XG4gICAgICAgIDxnIGNsYXNzTmFtZT0nbmJlLW1pbmltYXAtdmVydGljZXMnPlxuICAgICAgICAgIHt0aGlzLnZlcnRpY2VzKCBsYXlvdXQsIG1lYXN1cmVtZW50cywgdmVydGljZXMsIHNlbGVjdGlvbi52ZXJ0aWNlcyApfVxuICAgICAgICA8L2c+XG4gICAgICAgIDxnIGNsYXNzTmFtZT0nbmJlLW1pbmltYXAtZWRnZXMnPlxuICAgICAgICAgIHt0aGlzLmVkZ2VzKCBsYXlvdXQsIG1lYXN1cmVtZW50cywgZWRnZXMsIHR5cGVzLCBzZWxlY3Rpb24uZWRnZXMgKX1cbiAgICAgICAgPC9nPlxuICAgICAgPC9zdmc+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nbmJlLW1pbmltYXAtaGFuZGxlJ1xuICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5zdGFydERyYWdSZXNpemV9IC8+XG4gICAgPC9kaXY+KTtcbiAgfSxcblxuXG4gIHN0YXJ0RHJhZ1JlcG9zaXRpb24oIGV2ICkge1xuICAgIGRyYWdkcm9wKHtcbiAgICAgIGRyYWdUaHJlc2hvbGQ6IDAsXG4gICAgICBvbkJlZm9yZVN0YXJ0OiAoIF8sIGJhc2VYLCBiYXNlWSApID0+IHtcbiAgICAgICAgdGhpcy5yZXBvc2l0aW9uKCBiYXNlWCwgYmFzZVkgKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAgb25Nb3ZlOiAoeyBiYXNlOiB7IGJhc2VYLCBiYXNlWSB9LCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgdGhpcy5yZXBvc2l0aW9uKCBiYXNlWCArIGRyYWdYLCBiYXNlWSArIGRyYWdZICk7XG4gICAgICB9XG4gICAgfSkuc3RhcnQoIGV2LCBudWxsLCB7IHRhcmdldDogUmVhY3QuZmluZERPTU5vZGUoIHRoaXMucmVmcy5tYXBDb250YWluZXIgKSB9ICk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0sXG5cbiAgcmVwb3NpdGlvbiggbWFwWCwgbWFwWSApIHtcbiAgICBjb25zdCB7IGNhbnZhc1NpemUsIHNldHRpbmdzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5tYXBEaW1lbnNpb25zKCBjYW52YXNTaXplLCBzZXR0aW5ncyApO1xuICAgIGNvbnN0IHsgdmlld3BvcnQgfSA9IHNldHRpbmdzO1xuICAgIGNvbnN0IHRvTGVmdCA9IChtYXBYIC8gd2lkdGgpICogY2FudmFzU2l6ZS53aWR0aDtcbiAgICBjb25zdCB0b1RvcCA9IChtYXBZIC8gaGVpZ2h0KSAqIGNhbnZhc1NpemUuaGVpZ2h0O1xuICAgIC8vIGNlbnRlciB2aWV3cG9ydCBhdCB0YXJnZXQgY29vcmRpbmF0ZTpcbiAgICBjb25zdCBsZWZ0ID0gbWF4KCAwLFxuICAgICAgbWluKCB0b0xlZnQgLSB2aWV3cG9ydC53aWR0aCAvIDIsIGNhbnZhc1NpemUud2lkdGggLSB2aWV3cG9ydC53aWR0aCApICk7XG4gICAgY29uc3QgdG9wID0gbWF4KCAwLFxuICAgICAgbWluKCB0b1RvcCAtIHZpZXdwb3J0LmhlaWdodCAvIDIsIGNhbnZhc1NpemUuaGVpZ2h0IC0gdmlld3BvcnQuaGVpZ2h0ICkgKTtcbiAgICB0aGlzLmJ1YmJsZSggVmlld3BvcnRNb3ZlZCh7IGxlZnQsIHRvcCwgYnk6ICc6TUlOSU1BUDonIH0pICk7XG4gIH0sXG5cbiAgc3RhcnREcmFnUmVzaXplKCBldiApIHtcbiAgICBjb25zdCB7IGNhbnZhc1NpemUsIHNldHRpbmdzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgbWluaW1hcCB9ID0gc2V0dGluZ3M7XG4gICAgY29uc3QgeyBib3hXaWR0aCwgYm94SGVpZ2h0IH0gPSB0aGlzLm1hcERpbWVuc2lvbnMoIGNhbnZhc1NpemUsIHNldHRpbmdzICk7XG5cbiAgICBkcmFnZHJvcCh7XG4gICAgICBvbk1vdmU6ICh7IGRyYWdQYXlsb2FkOiB7IGJhc2VXaWR0aCwgYmFzZUhlaWdodCB9LCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgdGhpcy5yZXNpemUoIGJhc2VXaWR0aCArIGRyYWdYLCBiYXNlSGVpZ2h0ICsgZHJhZ1kgKTtcbiAgICAgIH1cbiAgICB9KS5zdGFydCggZXYsIHsgYmFzZVdpZHRoOiBib3hXaWR0aCwgYmFzZUhlaWdodDogYm94SGVpZ2h0IH0gKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSxcblxuICByZXNpemUoIHdpZHRoLCBoZWlnaHQgKSB7XG4gICAgdGhpcy5idWJibGUoIE1pbmltYXBSZXNpemVkKHsgd2lkdGgsIGhlaWdodCB9KSApO1xuICB9LFxuXG4gIG1hcEhlaWdodCgpIHtcbiAgICBjb25zdCB7IGNhbnZhc1NpemUsIHNldHRpbmdzOiB7IG1pbmltYXA6IHsgd2lkdGggfSB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiB3aWR0aCAqICggY2FudmFzU2l6ZS5oZWlnaHQgLyBjYW52YXNTaXplLndpZHRoICk7XG4gIH0sXG5cbiAgYnViYmxlKCBldmVudCApIHtcbiAgICBjb25zdCB7IGV2ZW50SGFuZGxlciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyICYmIGV2ZW50SGFuZGxlciggZXZlbnQgKTtcbiAgfSxcblxuICBlZGdlcyggbGF5b3V0LCBtZWFzdXJlbWVudHMsIGVkZ2VzLCB0eXBlcywgZWRnZVNlbGVjdGlvbiApIHtcbiAgICByZXR1cm4gbGF5b3V0LmVkZ2VzLmVudHJ5U2VxKCkubWFwKCAoWyBpZCwgeyBsZWZ0LCB0b3AgfSBdKSA9PiB7XG4gICAgICBjb25zdCBlZGdlID0gZWRnZXMuZ2V0KCBpZCApO1xuICAgICAgaWYoICFlZGdlIHx8IHR5cGVzLmdldCggZWRnZS50eXBlICkub3duaW5nUG9ydCApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB7IGRpbWVuc2lvbnMgfSA9IG1lYXN1cmVtZW50cy5lZGdlcy5nZXQoIGlkICkgfHwge307XG4gICAgICBpZiggIWRpbWVuc2lvbnMgKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByID0gbGF5b3V0U2V0dGluZ3MuZWRnZU9mZnNldDtcbiAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXRlQ2xhc3MgPVxuICAgICAgICBlZGdlU2VsZWN0aW9uLmhhcyggaWQgKSA/ICduYmUtc2VsZWN0ZWQnIDogJyc7XG4gICAgICBjb25zdCBjbGFzc2VzID1cbiAgICAgICAgYG5iZS1taW5pbWFwLWVkZ2UgbmJlLXR5cGUtJHtlZGdlLnR5cGV9ICR7c2VsZWN0aW9uU3RhdGVDbGFzc31gO1xuICAgICAgcmV0dXJuIDxjaXJjbGUgY2xhc3NOYW1lPXtjbGFzc2VzfSBrZXk9e2lkfVxuICAgICAgICAgICAgICAgICAgICAgY3g9e2xlZnQgKyByfSBjeT17dG9wICsgcn0gcj17cn0gLz47XG4gICAgfSApLmZpbHRlciggXyA9PiBfICE9PSBudWxsICk7XG4gIH0sXG5cbiAgdmVydGljZXMoIGxheW91dCwgbWVhc3VyZW1lbnRzLCB2ZXJ0aWNlcywgdmVydGV4U2VsZWN0aW9uICkge1xuICAgIHJldHVybiBsYXlvdXQudmVydGljZXMuZW50cnlTZXEoKS5tYXAoIChbIGlkLCB7IGxlZnQsIHRvcCB9IF0pID0+IHtcbiAgICAgIGNvbnN0IHsgZGltZW5zaW9ucyB9ID0gbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmdldCggaWQgKSB8fCB7fTtcbiAgICAgIGlmKCAhZGltZW5zaW9ucyApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB7IGtpbmQgfSA9IHZlcnRpY2VzLmdldCggaWQgKTtcbiAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gZGltZW5zaW9ucztcbiAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXRlQ2xhc3MgPSB2ZXJ0ZXhTZWxlY3Rpb24uaGFzKCBpZCApID8gJ25iZS1zZWxlY3RlZCcgOiAnJztcbiAgICAgIGNvbnN0IGNsYXNzZXMgPVxuICAgICAgICBgbmJlLW1pbmltYXAtdmVydGV4IG5iZS1raW5kLSR7a2luZH0gJHtzZWxlY3Rpb25TdGF0ZUNsYXNzfWA7XG4gICAgICByZXR1cm4gPHJlY3QgY2xhc3NOYW1lPXtjbGFzc2VzfSBrZXk9e2lkfVxuICAgICAgICAgICAgICAgICAgIHg9e2xlZnR9IHk9e3RvcH0gaGVpZ2h0PXtoZWlnaHR9IHdpZHRoPXt3aWR0aH0gLz47XG4gICAgfSApLmZpbHRlciggXyA9PiBfICE9PSBudWxsICk7XG4gIH0sXG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBNaW5pbWFwO1xuIl19