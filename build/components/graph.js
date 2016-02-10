define(['exports', 'module', 'react', 'react-dom', 'immutable', '../util/shallow-equal', '../util/metrics', '../util/dragdrop', '../util/keyboard', './edge', './vertex', './links', './ghost-port', './selection-box', './minimap', '../flux/layout/layout-actions', '../flux/layout/layout-model', '../flux/settings/settings-model', '../flux/graph/graph-model', '../flux/history/history-actions', '../flux/settings/settings-actions', '../flux/selection/selection-actions'], function (exports, module, _react, _reactDom, _immutable, _utilShallowEqual, _utilMetrics, _utilDragdrop, _utilKeyboard, _edge, _vertex, _links, _ghostPort, _selectionBox, _minimap, _fluxLayoutLayoutActions, _fluxLayoutLayoutModel, _fluxSettingsSettingsModel, _fluxGraphGraphModel, _fluxHistoryHistoryActions, _fluxSettingsSettingsActions, _fluxSelectionSelectionActions) {'use strict';var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}function _defaultProps(defaultProps, props) {if (defaultProps) {for (var propName in defaultProps) {if (typeof props[propName] === 'undefined') {props[propName] = defaultProps[propName];}}}return props;}var _React = _interopRequireDefault(_react);var _ReactDom = _interopRequireDefault(_reactDom);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _count = _interopRequireDefault(_utilMetrics);var _dragdrop = _interopRequireDefault(_utilDragdrop);var _keyboard = _interopRequireDefault(_utilKeyboard);var _Edge = _interopRequireDefault(_edge);var _Vertex = _interopRequireDefault(_vertex);var _Links = _interopRequireDefault(_links);var _GhostPort = _interopRequireDefault(_ghostPort);var _SelectionBox = _interopRequireDefault(_selectionBox);var _Minimap = _interopRequireDefault(_minimap);var 






































  abs = Math.abs;var min = Math.min;var max = Math.max;

  var Graph = _React['default'].createClass({ displayName: 'Graph', 

    getInitialState: function getInitialState() {
      return { 
        portDragInfo: null };}, 



    getDefaultProps: function getDefaultProps() {
      return { 
        settings: (0, _fluxSettingsSettingsModel.Settings)(), 
        types: (0, _immutable.Map)(), 
        model: (0, _fluxGraphGraphModel.Graph)(), 
        layout: (0, _fluxLayoutLayoutModel.Layout)(), 
        zoom: 100, 
        hasFocus: false };}, 



    render: function render() {var _this = this;
      (0, _count['default'])({ what: Graph.displayName });

      var self = this;var _props = 










      this.props;var _props$model = _props.model;var vertices = _props$model.vertices;var edges = _props$model.edges;var types = _props.types;var layout = _props.layout;var measurements = _props.measurements;var selection = _props.selection;var zoom = _props.zoom;var hasFocus = _props.hasFocus;var settings = _props.settings;var className = _props.className;var 

      portDragInfo = this.state.portDragInfo;

      var focusClass = 
      hasFocus ? 'nbe-has-focus' : '';
      var highlightTypeClass = 
      portDragInfo ? 'nbe-highlight-type-' + portDragInfo.port.type : '';
      var highlightSelectionClass = 
      selection.edges.isEmpty() && selection.vertices.isEmpty() ? '' : 'nbe-highlight-selection';
      var classes = 'nbe-graph nbe-zoom-' + 
      zoom + ' ' + focusClass + ' ' + highlightTypeClass + ' ' + highlightSelectionClass + ' ' + className;

      var dd = function dd() {return (0, _dragdrop['default'])({ 
          onMove: function onMove(_ref) {var _ref$dragPayload = _ref.dragPayload;var left = _ref$dragPayload.left;var top = _ref$dragPayload.top;var isExtension = _ref$dragPayload.isExtension;var dragX = _ref.dragX;var dragY = _ref.dragY;var dragNode = _ref.dragNode;
            (0, _count['default'])({ what: '!DragSelection' });
            var x = left + min(0, dragX);
            var y = top + min(0, dragY);
            var w = abs(dragX);
            var h = abs(dragY);
            _this.bubble((0, _fluxSelectionSelectionActions.ResizeSelection)({ 
              isExtension: isExtension, 
              coords: (0, _fluxLayoutLayoutModel.Coords)({ left: x, top: y }), 
              dimensions: (0, _fluxLayoutLayoutModel.Dimensions)({ width: w, height: h }) }));}, 


          onEnd: function onEnd() {return _this.bubble((0, _fluxSelectionSelectionActions.ResizeSelection)({ coords: null, dimensions: null }));}, 
          onClick: function onClick() {return _this.bubble((0, _fluxSelectionSelectionActions.ClearSelection)());} });};


      var startSelect = function startSelect(ev) {
        var rect = ev.currentTarget.getBoundingClientRect();
        var left = ev.clientX - rect.left;
        var top = ev.clientY - rect.top;
        var isExtension = ev.shiftKey;
        dd().start(ev, { left: left, top: top, isExtension: isExtension });};


      var canvasSize = self.canvasSize(measurements, layout);
      // TODO: 'font-size: 0' is a weird hack.
      // find a better way to make sure that no scrollbar is shown
      var canvasStyle = { 
        'fontSize': 0, 
        'minWidth': canvasSize.width + 'px', 
        'minHeight': canvasSize.height + 'px' };


      return (
        _React['default'].createElement('div', { tabIndex: '0', className: classes, ref: 'graph' }, { $$typeof: _typeofReactElement, type: _Minimap['default'], key: null, ref: null, props: _defaultProps(_Minimap['default'].defaultProps, { 
            measurements: measurements, 
            canvasSize: canvasSize, 
            types: types, 
            edges: edges, 
            vertices: vertices, 
            layout: layout, 
            settings: settings, 
            eventHandler: self.handleEvent, 
            selection: selection }), _owner: null }, { $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { children: { $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { children: [{ $$typeof: _typeofReactElement, type: _SelectionBox['default'], key: null, ref: null, props: _defaultProps(_SelectionBox['default'].defaultProps, { 



                    coords: selection.coords, 
                    dimensions: selection.dimensions }), _owner: null }, { $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { children: [

                    renderEdges(), 
                    renderVertices()], className: 'nbe-graph-nodes' }, _owner: null }, { $$typeof: _typeofReactElement, type: 'svg', key: null, ref: null, props: { children: [{ $$typeof: _typeofReactElement, type: _Links['default'], key: null, ref: null, props: _defaultProps(_Links['default'].defaultProps, { 


                        measurements: measurements, 
                        types: types, 
                        vertices: vertices, 
                        layout: layout, 
                        selection: selection }), _owner: null }, { $$typeof: _typeofReactElement, type: _GhostPort['default'], key: null, ref: null, props: _defaultProps(_GhostPort['default'].defaultProps, { 
                        dragInfo: portDragInfo }), _owner: null }], className: 'nbe-links', onMouseDown: startSelect }, _owner: null }], className: 'nbe-graph-canvas', style: canvasStyle }, _owner: null }, className: 'nbe-graph-viewport', onScroll: this.handleScroll }, _owner: null }));






      function renderVertices() {
        return vertices.valueSeq().map(function (vertex) {return { $$typeof: _typeofReactElement, type: _Vertex['default'], key: 

            vertex.id, ref: null, props: _defaultProps(_Vertex['default'].defaultProps, { mode: settings.mode, 
              vertex: vertex, 
              selected: selection.vertices.has(vertex.id), 
              layout: layout.vertices.get(vertex.id), 
              measurements: measurements.vertices.get(vertex.id), 
              eventHandler: self.handleEvent }), _owner: null };}).
        toJS();}


      function renderEdges() {
        return edges.valueSeq().
        filter(function (edge) {return !types.get(edge.type).owningPort;}).
        map(function (edge) {return { $$typeof: _typeofReactElement, type: _Edge['default'], key: 
            edge.id, ref: null, props: _defaultProps(_Edge['default'].defaultProps, { 
              edge: edge, 
              selected: selection.edges.has(edge.id), 
              layout: layout.edges.get(edge.id), 
              measurements: measurements.edges.get(edge.id), 
              eventHandler: self.handleEvent }), _owner: null };}).

        toJS();}}, 



    handleEvent: function handleEvent(event) {
      switch (event.type()) {
        case _fluxLayoutLayoutActions.DragPort:
          return this.setState(function (_ref2) {var portDragInfo = _ref2.portDragInfo;return { 
              portDragInfo: event.info };});


        default:
          this.bubble(event);}}, 



    bubble: function bubble(event) {var 
      eventHandler = this.props.eventHandler;
      return eventHandler && eventHandler(event);}, 


    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shallowEqual['default'])(nextState, this.state) || 
      !(0, _shallowEqual['default'])(nextProps, this.props);}, 


    canvasSize: function canvasSize(measurements, layout) {
      // profiling shows that this is expensive: memoize.
      // Actually, we may want to move this to a store.
      if (this.lastMeasurements === measurements && this.lastLayout === layout) {
        return this.lastCanvasSize;}


      var w = 0;
      var h = 0;
      var padding = 50;
      var measure = function measure(nodeCoords) {return function (nodeMeasurements, id) {
          if (nodeCoords.hasOwnProperty(id)) {var _nodeMeasurements$toJS = 
            nodeMeasurements.toJS();var _nodeMeasurements$toJS$dimensions = _nodeMeasurements$toJS.dimensions;var width = _nodeMeasurements$toJS$dimensions.width;var height = _nodeMeasurements$toJS$dimensions.height;var _nodeCoords$id = 
            nodeCoords[id];var left = _nodeCoords$id.left;var _top = _nodeCoords$id.top;
            w = max(w, left + width);
            h = max(h, _top + height);}};};


      measurements.vertices.forEach(measure(layout.vertices.toJS()));
      measurements.edges.forEach(measure(layout.edges.toJS()));

      this.lastMeasurements = measurements;
      this.lastLayout = layout;
      this.lastCanvasSize = { 
        width: w + padding, 
        height: h + padding };


      return this.lastCanvasSize;}, 


    measure: function measure() {
      var domGraph = _ReactDom['default'].findDOMNode(this.refs.graph);
      if (!domGraph) {
        return;}var 

      viewport = this.props.settings.viewport;
      if (domGraph.offsetWidth !== viewport.width || 
      domGraph.offsetHeight !== viewport.height) {
        this.bubble((0, _fluxSettingsSettingsActions.ViewportMeasured)({ 
          width: domGraph.offsetWidth, 
          height: domGraph.offsetHeight }));}}, 




    handleScroll: function handleScroll(ev) {
      this.bubble((0, _fluxSettingsSettingsActions.ViewportMoved)({ 
        left: ev.target.scrollLeft, 
        top: ev.target.scrollTop, 
        by: ':GRAPH:' }));}, 



    componentDidMount: function componentDidMount() {var _this2 = this;
      this.measure();
      window.addEventListener('resize', this.measure);

      var domGraph = _ReactDom['default'].findDOMNode(this.refs.graph);
      var bubble = function bubble(act) {return _this2.bubble(act);};
      var graph = this;
      (0, _keyboard['default'])(
      domGraph, { 
        isReadOnly: function isReadOnly() {
          return graph.props.settings.mode === _fluxSettingsSettingsModel.READ_ONLY;}, 

        onFocusReceived: function onFocusReceived() {
          bubble((0, _fluxSettingsSettingsActions.HandleFocusReceived)({ domNode: domGraph }));}, 

        onFocusLost: function onFocusLost() {
          bubble((0, _fluxSettingsSettingsActions.HandleFocusLost)({ domNode: domGraph }));}, 

        onUndo: function onUndo() {
          bubble((0, _fluxHistoryHistoryActions.UiUndo)());}, 

        onRedo: function onRedo() {
          bubble((0, _fluxHistoryHistoryActions.UiRedo)());}, 

        onDelete: function onDelete() {
          bubble((0, _fluxHistoryHistoryActions.CreateCheckpoint)({ before: 'Delete Selection' }));
          bubble((0, _fluxSelectionSelectionActions.DeleteSelection)());}, 

        onCut: function onCut() {
          bubble((0, _fluxHistoryHistoryActions.CreateCheckpoint)({ before: 'Cut Selection' }));
          bubble((0, _fluxSelectionSelectionActions.CutSelection)());}, 

        onCopy: function onCopy() {
          bubble((0, _fluxSelectionSelectionActions.CopySelection)());}, 

        onPaste: function onPaste() {
          bubble((0, _fluxHistoryHistoryActions.CreateCheckpoint)({ before: 'Paste Clipboard' }));
          bubble((0, _fluxSelectionSelectionActions.PasteClipboard)());} });}, 





    componentDidUpdate: function componentDidUpdate() {var 
      viewport = this.props.settings.viewport;
      this.measure();

      if (viewport.movedBy === ':GRAPH:') {
        return;}

      var domGraph = _ReactDom['default'].
      findDOMNode(this.refs.graph).
      querySelector('.nbe-graph-viewport');
      domGraph.scrollTop = viewport.top;
      domGraph.scrollLeft = viewport.left;} });module.exports = 




  Graph;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2dyYXBoLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1Q1EsS0FBRyxHQUFlLElBQUksQ0FBdEIsR0FBRyxLQUFFLEdBQUcsR0FBVSxJQUFJLENBQWpCLEdBQUcsS0FBRSxHQUFHLEdBQUssSUFBSSxDQUFaLEdBQUc7O0FBRXJCLE1BQU0sS0FBSyxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7QUFFOUIsbUJBQWUsRUFBQSwyQkFBRztBQUNoQixhQUFPO0FBQ0wsb0JBQVksRUFBRSxJQUFJLEVBQ25CLENBQUMsQ0FDSDs7OztBQUVELG1CQUFlLEVBQUEsMkJBQUc7QUFDaEIsYUFBTztBQUNMLGdCQUFRLEVBQUUsK0JBakNQLFFBQVEsR0FpQ1M7QUFDcEIsYUFBSyxFQUFFLGVBbERKLEdBQUcsR0FrRE07QUFDWixhQUFLLEVBQUUseUJBbENKLEtBQUssR0FrQ1c7QUFDbkIsY0FBTSxFQUFFLDJCQXJDTCxNQUFNLEdBcUNPO0FBQ2hCLFlBQUksRUFBRSxHQUFHO0FBQ1QsZ0JBQVEsRUFBRSxLQUFLLEVBQ2hCLENBQUMsQ0FDSDs7OztBQUVELFVBQU0sRUFBQSxrQkFBRztBQUNQLDZCQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOztBQUVuQyxVQUFNLElBQUksR0FBRyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O0FBV2QsVUFBSSxDQUFDLEtBQUssMkJBVFosS0FBSyxLQUFJLFFBQVEsZ0JBQVIsUUFBUSxLQUFFLEtBQUssZ0JBQUwsS0FBSyxLQUN4QixLQUFLLFVBQUwsS0FBSyxLQUNMLE1BQU0sVUFBTixNQUFNLEtBQ04sWUFBWSxVQUFaLFlBQVksS0FDWixTQUFTLFVBQVQsU0FBUyxLQUNULElBQUksVUFBSixJQUFJLEtBQ0osUUFBUSxVQUFSLFFBQVEsS0FDUixRQUFRLFVBQVIsUUFBUSxLQUNSLFNBQVMsVUFB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QyxjQUFRLEdBQU8sSUFBSSxDQUFDLEtBQUssQ0FBckMsUUFBUSxDQUFJLFFBQVE7QUFDNUIsVUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUVmLFVBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUc7QUFDbkMsZUFBTyxDQUNSOztBQUNELFVBQU0sUUFBUSxHQUFHO0FBQ2QsaUJBQVcsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRTtBQUM5QixtQkFBYSxDQUFFLHFCQUFxQixDQUFFLENBQUM7QUFDMUMsY0FBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQ2xDLGNBQVEsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUNyQyxFQUVGLENBQUMsQ0FBQzs7Ozs7QUFFWSxPQUFLIiwiZmlsZSI6ImdyYXBoLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3REb20gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbC9zaGFsbG93LWVxdWFsJztcbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuaW1wb3J0IGRyYWdkcm9wIGZyb20gJy4uL3V0aWwvZHJhZ2Ryb3AnO1xuaW1wb3J0IGtleWJvYXJkIGZyb20gJy4uL3V0aWwva2V5Ym9hcmQnO1xuXG5pbXBvcnQgRWRnZSBmcm9tICcuL2VkZ2UnO1xuaW1wb3J0IFZlcnRleCBmcm9tICcuL3ZlcnRleCc7XG5pbXBvcnQgTGlua3MgZnJvbSAnLi9saW5rcyc7XG5pbXBvcnQgR2hvc3RQb3J0IGZyb20gJy4vZ2hvc3QtcG9ydCc7XG5pbXBvcnQgU2VsZWN0aW9uQm94IGZyb20gJy4vc2VsZWN0aW9uLWJveCc7XG5pbXBvcnQgTWluaW1hcCBmcm9tICcuL21pbmltYXAnO1xuXG5pbXBvcnQgeyBEcmFnUG9ydCB9IGZyb20gJy4uL2ZsdXgvbGF5b3V0L2xheW91dC1hY3Rpb25zJztcbmltcG9ydCB7IExheW91dCwgQ29vcmRzLCBEaW1lbnNpb25zIH0gZnJvbSAnLi4vZmx1eC9sYXlvdXQvbGF5b3V0LW1vZGVsJztcbmltcG9ydCB7IFNldHRpbmdzLCBSRUFEX09OTFkgfSBmcm9tICcuLi9mbHV4L3NldHRpbmdzL3NldHRpbmdzLW1vZGVsJztcbmltcG9ydCB7IEdyYXBoIGFzIEdyYXBoTW9kZWwgfSBmcm9tICcuLi9mbHV4L2dyYXBoL2dyYXBoLW1vZGVsJztcblxuaW1wb3J0IHtcbiAgVWlVbmRvLCBVaVJlZG8sIENyZWF0ZUNoZWNrcG9pbnRcbn0gZnJvbSAnLi4vZmx1eC9oaXN0b3J5L2hpc3RvcnktYWN0aW9ucyc7XG5cbmltcG9ydCB7XG4gIFZpZXdwb3J0TW92ZWQsIFZpZXdwb3J0TWVhc3VyZWQsIEhhbmRsZUZvY3VzUmVjZWl2ZWQsIEhhbmRsZUZvY3VzTG9zdFxufSBmcm9tICcuLi9mbHV4L3NldHRpbmdzL3NldHRpbmdzLWFjdGlvbnMnO1xuXG5pbXBvcnQge1xuICBQYXN0ZUNsaXBib2FyZCxcbiAgQ29weVNlbGVjdGlvbixcbiAgQ3V0U2VsZWN0aW9uLFxuICBSZXNpemVTZWxlY3Rpb24sXG4gIENsZWFyU2VsZWN0aW9uLFxuICBEZWxldGVTZWxlY3Rpb25cbn0gZnJvbSAnLi4vZmx1eC9zZWxlY3Rpb24vc2VsZWN0aW9uLWFjdGlvbnMnO1xuXG5cbmNvbnN0IHsgYWJzLCBtaW4sIG1heCB9ID0gTWF0aDtcblxuY29uc3QgR3JhcGggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3J0RHJhZ0luZm86IG51bGxcbiAgICB9O1xuICB9LFxuXG4gIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2V0dGluZ3M6IFNldHRpbmdzKCksXG4gICAgICB0eXBlczogTWFwKCksXG4gICAgICBtb2RlbDogR3JhcGhNb2RlbCgpLFxuICAgICAgbGF5b3V0OiBMYXlvdXQoKSxcbiAgICAgIHpvb206IDEwMCxcbiAgICAgIGhhc0ZvY3VzOiBmYWxzZVxuICAgIH07XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvdW50KHsgd2hhdDogR3JhcGguZGlzcGxheU5hbWUgfSk7XG5cbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCB7XG4gICAgICBtb2RlbDogeyB2ZXJ0aWNlcywgZWRnZXMgfSxcbiAgICAgIHR5cGVzLFxuICAgICAgbGF5b3V0LFxuICAgICAgbWVhc3VyZW1lbnRzLFxuICAgICAgc2VsZWN0aW9uLFxuICAgICAgem9vbSxcbiAgICAgIGhhc0ZvY3VzLFxuICAgICAgc2V0dGluZ3MsXG4gICAgICBjbGFzc05hbWVcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHsgcG9ydERyYWdJbmZvIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgZm9jdXNDbGFzcyA9XG4gICAgICBoYXNGb2N1cyA/ICduYmUtaGFzLWZvY3VzJyA6ICcnO1xuICAgIGNvbnN0IGhpZ2hsaWdodFR5cGVDbGFzcyA9XG4gICAgICBwb3J0RHJhZ0luZm8gPyBgbmJlLWhpZ2hsaWdodC10eXBlLSR7cG9ydERyYWdJbmZvLnBvcnQudHlwZX1gIDogJyc7XG4gICAgY29uc3QgaGlnaGxpZ2h0U2VsZWN0aW9uQ2xhc3MgPVxuICAgICAgKCBzZWxlY3Rpb24uZWRnZXMuaXNFbXB0eSgpICYmIHNlbGVjdGlvbi52ZXJ0aWNlcy5pc0VtcHR5KCkgKSA/ICcnIDogJ25iZS1oaWdobGlnaHQtc2VsZWN0aW9uJztcbiAgICBjb25zdCBjbGFzc2VzID1cbiAgICAgIGBuYmUtZ3JhcGggbmJlLXpvb20tJHt6b29tfSAke2ZvY3VzQ2xhc3N9ICR7aGlnaGxpZ2h0VHlwZUNsYXNzfSAke2hpZ2hsaWdodFNlbGVjdGlvbkNsYXNzfSAke2NsYXNzTmFtZX1gO1xuXG4gICAgY29uc3QgZGQgPSAoKSA9PiBkcmFnZHJvcCh7XG4gICAgICBvbk1vdmU6ICh7IGRyYWdQYXlsb2FkOiB7IGxlZnQsIHRvcCwgaXNFeHRlbnNpb24gfSwgZHJhZ1gsIGRyYWdZLCBkcmFnTm9kZSB9KSA9PiB7XG4gICAgICAgIGNvdW50KHsgd2hhdDogJyFEcmFnU2VsZWN0aW9uJyB9KTtcbiAgICAgICAgY29uc3QgeCA9IGxlZnQgKyBtaW4oIDAsIGRyYWdYICk7XG4gICAgICAgIGNvbnN0IHkgPSB0b3AgKyBtaW4oIDAsIGRyYWdZICk7XG4gICAgICAgIGNvbnN0IHcgPSBhYnMoIGRyYWdYICk7XG4gICAgICAgIGNvbnN0IGggPSBhYnMoIGRyYWdZICk7XG4gICAgICAgIHRoaXMuYnViYmxlKCBSZXNpemVTZWxlY3Rpb24oe1xuICAgICAgICAgIGlzRXh0ZW5zaW9uLFxuICAgICAgICAgIGNvb3JkczogQ29vcmRzKHsgbGVmdDogeCwgdG9wOiB5IH0pLFxuICAgICAgICAgIGRpbWVuc2lvbnM6IERpbWVuc2lvbnMoeyB3aWR0aDogdywgaGVpZ2h0OiBoIH0pXG4gICAgICAgIH0pICk7XG4gICAgICB9LFxuICAgICAgb25FbmQ6ICgpID0+IHRoaXMuYnViYmxlKCBSZXNpemVTZWxlY3Rpb24oeyBjb29yZHM6IG51bGwsIGRpbWVuc2lvbnM6IG51bGwgfSkgKSxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuYnViYmxlKCBDbGVhclNlbGVjdGlvbigpIClcbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0U2VsZWN0ID0gKCBldiApID0+IHtcbiAgICAgIGNvbnN0IHJlY3QgPSBldi5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgbGVmdCA9IGV2LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICBjb25zdCB0b3AgPSBldi5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICBjb25zdCBpc0V4dGVuc2lvbiA9IGV2LnNoaWZ0S2V5O1xuICAgICAgZGQoKS5zdGFydCggZXYsIHsgbGVmdCwgdG9wLCBpc0V4dGVuc2lvbiB9ICk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNhbnZhc1NpemUgPSBzZWxmLmNhbnZhc1NpemUoIG1lYXN1cmVtZW50cywgbGF5b3V0ICk7XG4gICAgLy8gVE9ETzogJ2ZvbnQtc2l6ZTogMCcgaXMgYSB3ZWlyZCBoYWNrLlxuICAgIC8vIGZpbmQgYSBiZXR0ZXIgd2F5IHRvIG1ha2Ugc3VyZSB0aGF0IG5vIHNjcm9sbGJhciBpcyBzaG93blxuICAgIGNvbnN0IGNhbnZhc1N0eWxlID0ge1xuICAgICAgJ2ZvbnRTaXplJzogMCxcbiAgICAgICdtaW5XaWR0aCc6IGNhbnZhc1NpemUud2lkdGggKyAncHgnLFxuICAgICAgJ21pbkhlaWdodCc6IGNhbnZhc1NpemUuaGVpZ2h0ICsgJ3B4J1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiB0YWJJbmRleD1cIjBcIiBjbGFzc05hbWU9e2NsYXNzZXN9IHJlZj1cImdyYXBoXCI+XG4gICAgICAgIDxNaW5pbWFwIG1lYXN1cmVtZW50cz17bWVhc3VyZW1lbnRzfVxuICAgICAgICAgICAgICAgICBjYW52YXNTaXplPXtjYW52YXNTaXplfVxuICAgICAgICAgICAgICAgICB0eXBlcz17dHlwZXN9XG4gICAgICAgICAgICAgICAgIGVkZ2VzPXtlZGdlc31cbiAgICAgICAgICAgICAgICAgdmVydGljZXM9e3ZlcnRpY2VzfVxuICAgICAgICAgICAgICAgICBsYXlvdXQ9e2xheW91dH1cbiAgICAgICAgICAgICAgICAgc2V0dGluZ3M9e3NldHRpbmdzfVxuICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXI9e3NlbGYuaGFuZGxlRXZlbnR9XG4gICAgICAgICAgICAgICAgIHNlbGVjdGlvbj17c2VsZWN0aW9ufSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1ncmFwaC12aWV3cG9ydFwiXG4gICAgICAgICAgICAgb25TY3JvbGw9e3RoaXMuaGFuZGxlU2Nyb2xsfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1ncmFwaC1jYW52YXNcIiBzdHlsZT17Y2FudmFzU3R5bGV9PlxuICAgICAgICAgICAgPFNlbGVjdGlvbkJveCBjb29yZHM9e3NlbGVjdGlvbi5jb29yZHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM9e3NlbGVjdGlvbi5kaW1lbnNpb25zfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtZ3JhcGgtbm9kZXNcIj5cbiAgICAgICAgICAgICAge3JlbmRlckVkZ2VzKCl9XG4gICAgICAgICAgICAgIHtyZW5kZXJWZXJ0aWNlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cIm5iZS1saW5rc1wiIG9uTW91c2VEb3duPXtzdGFydFNlbGVjdH0+XG4gICAgICAgICAgICAgIDxMaW5rcyBtZWFzdXJlbWVudHM9e21lYXN1cmVtZW50c31cbiAgICAgICAgICAgICAgICAgICAgIHR5cGVzPXt0eXBlc31cbiAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzPXt2ZXJ0aWNlc31cbiAgICAgICAgICAgICAgICAgICAgIGxheW91dD17bGF5b3V0fVxuICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uPXtzZWxlY3Rpb259IC8+XG4gICAgICAgICAgICAgIDxHaG9zdFBvcnQgZHJhZ0luZm89e3BvcnREcmFnSW5mb30gLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBmdW5jdGlvbiByZW5kZXJWZXJ0aWNlcygpIHtcbiAgICAgIHJldHVybiB2ZXJ0aWNlcy52YWx1ZVNlcSgpLm1hcCggdmVydGV4ID0+XG4gICAgICAgIDxWZXJ0ZXggbW9kZT17c2V0dGluZ3MubW9kZX1cbiAgICAgICAgICAgICAgICBrZXk9e3ZlcnRleC5pZH1cbiAgICAgICAgICAgICAgICB2ZXJ0ZXg9e3ZlcnRleH1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0aW9uLnZlcnRpY2VzLmhhcyh2ZXJ0ZXguaWQpfVxuICAgICAgICAgICAgICAgIGxheW91dD17bGF5b3V0LnZlcnRpY2VzLmdldCggdmVydGV4LmlkICl9XG4gICAgICAgICAgICAgICAgbWVhc3VyZW1lbnRzPXttZWFzdXJlbWVudHMudmVydGljZXMuZ2V0KCB2ZXJ0ZXguaWQgKX1cbiAgICAgICAgICAgICAgICBldmVudEhhbmRsZXI9e3NlbGYuaGFuZGxlRXZlbnR9IC8+XG4gICAgICApLnRvSlMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJFZGdlcygpIHtcbiAgICAgIHJldHVybiBlZGdlcy52YWx1ZVNlcSgpXG4gICAgICAuZmlsdGVyKCBlZGdlID0+ICF0eXBlcy5nZXQoIGVkZ2UudHlwZSApLm93bmluZ1BvcnQgKVxuICAgICAgLm1hcCggZWRnZSA9PlxuICAgICAgICA8RWRnZSBrZXk9e2VkZ2UuaWR9XG4gICAgICAgICAgICAgIGVkZ2U9e2VkZ2V9XG4gICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3Rpb24uZWRnZXMuaGFzKGVkZ2UuaWQpfVxuICAgICAgICAgICAgICBsYXlvdXQ9e2xheW91dC5lZGdlcy5nZXQoIGVkZ2UuaWQgKX1cbiAgICAgICAgICAgICAgbWVhc3VyZW1lbnRzPXttZWFzdXJlbWVudHMuZWRnZXMuZ2V0KCBlZGdlLmlkICl9XG4gICAgICAgICAgICAgIGV2ZW50SGFuZGxlcj17c2VsZi5oYW5kbGVFdmVudH0gLz5cbiAgICAgIClcbiAgICAgIC50b0pTKCk7XG4gICAgfVxuICB9LFxuXG4gIGhhbmRsZUV2ZW50KCBldmVudCApIHtcbiAgICBzd2l0Y2goIGV2ZW50LnR5cGUoKSApIHtcbiAgICAgIGNhc2UgRHJhZ1BvcnQ6XG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKCAoe3BvcnREcmFnSW5mb30pID0+ICh7XG4gICAgICAgICAgcG9ydERyYWdJbmZvOiBldmVudC5pbmZvXG4gICAgICAgIH0pICk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuYnViYmxlKCBldmVudCApO1xuICAgIH1cbiAgfSxcblxuICBidWJibGUoIGV2ZW50ICkge1xuICAgIGNvbnN0IHsgZXZlbnRIYW5kbGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBldmVudEhhbmRsZXIgJiYgZXZlbnRIYW5kbGVyKCBldmVudCApO1xuICB9LFxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzLCBuZXh0U3RhdGUgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSApXG4gICAgICB8fCAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfSxcblxuICBjYW52YXNTaXplKCBtZWFzdXJlbWVudHMsIGxheW91dCApIHtcbiAgICAvLyBwcm9maWxpbmcgc2hvd3MgdGhhdCB0aGlzIGlzIGV4cGVuc2l2ZTogbWVtb2l6ZS5cbiAgICAvLyBBY3R1YWxseSwgd2UgbWF5IHdhbnQgdG8gbW92ZSB0aGlzIHRvIGEgc3RvcmUuXG4gICAgaWYoIHRoaXMubGFzdE1lYXN1cmVtZW50cyA9PT0gbWVhc3VyZW1lbnRzICYmIHRoaXMubGFzdExheW91dCA9PT0gbGF5b3V0ICkge1xuICAgICAgcmV0dXJuIHRoaXMubGFzdENhbnZhc1NpemU7XG4gICAgfVxuXG4gICAgdmFyIHcgPSAwO1xuICAgIHZhciBoID0gMDtcbiAgICBjb25zdCBwYWRkaW5nID0gNTA7XG4gICAgY29uc3QgbWVhc3VyZSA9ICggbm9kZUNvb3JkcyApID0+IChub2RlTWVhc3VyZW1lbnRzLCBpZCkgPT4ge1xuICAgICAgaWYoIG5vZGVDb29yZHMuaGFzT3duUHJvcGVydHkoIGlkICkgKSB7XG4gICAgICAgIGNvbnN0IHsgZGltZW5zaW9uczogeyB3aWR0aCwgaGVpZ2h0IH0gfSA9IG5vZGVNZWFzdXJlbWVudHMudG9KUygpO1xuICAgICAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gbm9kZUNvb3Jkc1sgaWQgXTtcbiAgICAgICAgdyA9IG1heCggdywgbGVmdCArIHdpZHRoICk7XG4gICAgICAgIGggPSBtYXgoIGgsIHRvcCArIGhlaWdodCApO1xuICAgICAgfVxuICAgIH07XG4gICAgbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmZvckVhY2goIG1lYXN1cmUoIGxheW91dC52ZXJ0aWNlcy50b0pTKCkgKSApO1xuICAgIG1lYXN1cmVtZW50cy5lZGdlcy5mb3JFYWNoKCBtZWFzdXJlKCBsYXlvdXQuZWRnZXMudG9KUygpICkgKTtcblxuICAgIHRoaXMubGFzdE1lYXN1cmVtZW50cyA9IG1lYXN1cmVtZW50cztcbiAgICB0aGlzLmxhc3RMYXlvdXQgPSBsYXlvdXQ7XG4gICAgdGhpcy5sYXN0Q2FudmFzU2l6ZSA9IHtcbiAgICAgIHdpZHRoOiB3ICsgcGFkZGluZyxcbiAgICAgIGhlaWdodDogaCArIHBhZGRpbmdcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMubGFzdENhbnZhc1NpemU7XG4gIH0sXG5cbiAgbWVhc3VyZSgpIHtcbiAgICBjb25zdCBkb21HcmFwaCA9IFJlYWN0RG9tLmZpbmRET01Ob2RlKCB0aGlzLnJlZnMuZ3JhcGggKTtcbiAgICBpZiggIWRvbUdyYXBoICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IHZpZXdwb3J0IH0gPSB0aGlzLnByb3BzLnNldHRpbmdzO1xuICAgIGlmKCBkb21HcmFwaC5vZmZzZXRXaWR0aCAhPT0gdmlld3BvcnQud2lkdGggfHxcbiAgICAgICAgZG9tR3JhcGgub2Zmc2V0SGVpZ2h0ICE9PSB2aWV3cG9ydC5oZWlnaHQgKSB7XG4gICAgICB0aGlzLmJ1YmJsZSggVmlld3BvcnRNZWFzdXJlZCh7XG4gICAgICAgIHdpZHRoOiBkb21HcmFwaC5vZmZzZXRXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBkb21HcmFwaC5vZmZzZXRIZWlnaHRcbiAgICAgIH0pICk7XG4gICAgfVxuICB9LFxuXG4gIGhhbmRsZVNjcm9sbCggZXYgKSB7XG4gICAgdGhpcy5idWJibGUoIFZpZXdwb3J0TW92ZWQoe1xuICAgICAgbGVmdDogZXYudGFyZ2V0LnNjcm9sbExlZnQsXG4gICAgICB0b3A6IGV2LnRhcmdldC5zY3JvbGxUb3AsXG4gICAgICBieTogJzpHUkFQSDonXG4gICAgfSkgKTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLm1lYXN1cmUoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHRoaXMubWVhc3VyZSApO1xuXG4gICAgY29uc3QgZG9tR3JhcGggPSBSZWFjdERvbS5maW5kRE9NTm9kZSggdGhpcy5yZWZzLmdyYXBoICk7XG4gICAgY29uc3QgYnViYmxlID0gKCBhY3QgKSA9PiB0aGlzLmJ1YmJsZSggYWN0ICk7XG4gICAgY29uc3QgZ3JhcGggPSB0aGlzO1xuICAgIGtleWJvYXJkKFxuICAgICAgZG9tR3JhcGgsIHtcbiAgICAgICAgaXNSZWFkT25seSgpIHtcbiAgICAgICAgICByZXR1cm4gZ3JhcGgucHJvcHMuc2V0dGluZ3MubW9kZSA9PT0gUkVBRF9PTkxZO1xuICAgICAgICB9LFxuICAgICAgICBvbkZvY3VzUmVjZWl2ZWQoKSB7XG4gICAgICAgICAgYnViYmxlKCBIYW5kbGVGb2N1c1JlY2VpdmVkKHsgZG9tTm9kZTogZG9tR3JhcGggfSkgKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Gb2N1c0xvc3QoKSB7XG4gICAgICAgICAgYnViYmxlKCBIYW5kbGVGb2N1c0xvc3QoeyBkb21Ob2RlOiBkb21HcmFwaCB9KSApO1xuICAgICAgICB9LFxuICAgICAgICBvblVuZG8oKSB7XG4gICAgICAgICAgYnViYmxlKCBVaVVuZG8oKSApO1xuICAgICAgICB9LFxuICAgICAgICBvblJlZG8oKSB7XG4gICAgICAgICAgYnViYmxlKCBVaVJlZG8oKSApO1xuICAgICAgICB9LFxuICAgICAgICBvbkRlbGV0ZSgpIHtcbiAgICAgICAgICBidWJibGUoIENyZWF0ZUNoZWNrcG9pbnQoeyBiZWZvcmU6ICdEZWxldGUgU2VsZWN0aW9uJyB9KSApO1xuICAgICAgICAgIGJ1YmJsZSggRGVsZXRlU2VsZWN0aW9uKCkgKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DdXQoKSB7XG4gICAgICAgICAgYnViYmxlKCBDcmVhdGVDaGVja3BvaW50KHsgYmVmb3JlOiAnQ3V0IFNlbGVjdGlvbicgfSkgKTtcbiAgICAgICAgICBidWJibGUoIEN1dFNlbGVjdGlvbigpICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ29weSgpIHtcbiAgICAgICAgICBidWJibGUoIENvcHlTZWxlY3Rpb24oKSApO1xuICAgICAgICB9LFxuICAgICAgICBvblBhc3RlKCkge1xuICAgICAgICAgIGJ1YmJsZSggQ3JlYXRlQ2hlY2twb2ludCh7IGJlZm9yZTogJ1Bhc3RlIENsaXBib2FyZCcgfSkgKTtcbiAgICAgICAgICBidWJibGUoIFBhc3RlQ2xpcGJvYXJkKCkgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHsgc2V0dGluZ3M6IHsgdmlld3BvcnQgfSB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLm1lYXN1cmUoKTtcblxuICAgIGlmKCB2aWV3cG9ydC5tb3ZlZEJ5ID09PSAnOkdSQVBIOicgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRvbUdyYXBoID0gUmVhY3REb21cbiAgICAgIC5maW5kRE9NTm9kZSggdGhpcy5yZWZzLmdyYXBoIClcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCAnLm5iZS1ncmFwaC12aWV3cG9ydCcgKTtcbiAgICBkb21HcmFwaC5zY3JvbGxUb3AgPSB2aWV3cG9ydC50b3A7XG4gICAgZG9tR3JhcGguc2Nyb2xsTGVmdCA9IHZpZXdwb3J0LmxlZnQ7XG4gIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEdyYXBoO1xuIl19