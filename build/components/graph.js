define(['exports', 'module', 'react', 'immutable', '../util/shallow-equal', '../util/metrics', '../util/dragdrop', '../util/keyboard', './edge', './vertex', './links', './ghost-port', './selection-box', './minimap', '../flux/layout/layout-actions', '../flux/layout/layout-model', '../flux/settings/settings-model', '../flux/graph/graph-model', '../flux/history/history-actions', '../flux/settings/settings-actions', '../flux/selection/selection-actions'], function (exports, module, _react, _immutable, _utilShallowEqual, _utilMetrics, _utilDragdrop, _utilKeyboard, _edge, _vertex, _links, _ghostPort, _selectionBox, _minimap, _fluxLayoutLayoutActions, _fluxLayoutLayoutModel, _fluxSettingsSettingsModel, _fluxGraphGraphModel, _fluxHistoryHistoryActions, _fluxSettingsSettingsActions, _fluxSelectionSelectionActions) {'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _count = _interopRequireDefault(_utilMetrics);var _dragdrop = _interopRequireDefault(_utilDragdrop);var _keyboard = _interopRequireDefault(_utilKeyboard);var _Edge = _interopRequireDefault(_edge);var _Vertex = _interopRequireDefault(_vertex);var _Links = _interopRequireDefault(_links);var _GhostPort = _interopRequireDefault(_ghostPort);var _SelectionBox = _interopRequireDefault(_selectionBox);var _Minimap = _interopRequireDefault(_minimap);var 





































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
        _React['default'].createElement('div', { tabIndex: '0', className: classes, ref: 'graph' }, 
        _React['default'].createElement(_Minimap['default'], { measurements: measurements, 
          canvasSize: canvasSize, 
          types: types, 
          edges: edges, 
          vertices: vertices, 
          layout: layout, 
          settings: settings, 
          eventHandler: self.handleEvent, 
          selection: selection }), 
        _React['default'].createElement('div', { className: 'nbe-graph-viewport', 
          onScroll: this.handleScroll }, 
        _React['default'].createElement('div', { className: 'nbe-graph-canvas', style: canvasStyle }, 
        _React['default'].createElement(_SelectionBox['default'], { coords: selection.coords, 
          dimensions: selection.dimensions }), 
        _React['default'].createElement('div', { className: 'nbe-graph-nodes' }, 
        renderEdges(), 
        renderVertices()), 

        _React['default'].createElement('svg', { className: 'nbe-links', onMouseDown: startSelect }, 
        _React['default'].createElement(_Links['default'], { measurements: measurements, 
          types: types, 
          vertices: vertices, 
          layout: layout, 
          selection: selection }), 
        _React['default'].createElement(_GhostPort['default'], { dragInfo: portDragInfo }))))));






      function renderVertices() {
        return vertices.valueSeq().map(function (vertex) {return (
            _React['default'].createElement(_Vertex['default'], { settings: settings, 
              key: vertex.id, 
              vertex: vertex, 
              selected: selection.vertices.has(vertex.id), 
              layout: layout.vertices.get(vertex.id), 
              measurements: measurements.vertices.get(vertex.id), 
              eventHandler: self.handleEvent }));}).
        toJS();}


      function renderEdges() {
        return edges.valueSeq().
        filter(function (edge) {return !types.get(edge.type).owningPort;}).
        map(function (edge) {return (
            _React['default'].createElement(_Edge['default'], { key: edge.id, 
              edge: edge, 
              selected: selection.edges.has(edge.id), 
              layout: layout.edges.get(edge.id), 
              measurements: measurements.edges.get(edge.id), 
              eventHandler: self.handleEvent }));}).

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
      return { 
        width: w + padding, 
        height: h + padding };}, 



    measure: function measure() {
      var domGraph = _React['default'].findDOMNode(this.refs.graph);var 
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

      var domGraph = _React['default'].findDOMNode(this.refs.graph);
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

      var domGraph = _React['default'].
      findDOMNode(this.refs.graph).
      querySelector('.nbe-graph-viewport');
      domGraph.scrollTop = viewport.top;
      domGraph.scrollLeft = viewport.left;} });module.exports = 




  Graph;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2dyYXBoLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNDUSxLQUFHLEdBQWUsSUFBSSxDQUF0QixHQUFHLEtBQUUsR0FBRyxHQUFVLElBQUksQ0FBakIsR0FBRyxLQUFFLEdBQUcsR0FBSyxJQUFJLENBQVosR0FBRzs7QUFFckIsTUFBTSxLQUFLLEdBQUcsa0JBQU0sV0FBVyxDQUFDOztBQUU5QixtQkFBZSxFQUFBLDJCQUFHO0FBQ2hCLGFBQU87QUFDTCxvQkFBWSxFQUFFLElBQUksRUFDbkIsQ0FBQyxDQUNIOzs7O0FBRUQsbUJBQWUsRUFBQSwyQkFBRztBQUNoQixhQUFPO0FBQ0wsZ0JBQVEsRUFBRSwrQkFqQ1AsUUFBUSxHQWlDUztBQUNwQixhQUFLLEVBQUUsZUFsREosR0FBRyxHQWtETTtBQUNaLGFBQUssRUFBRSx5QkFsQ0osS0FBSyxHQWtDVztBQUNuQixjQUFNLEVBQUUsMkJBckNMLE1BQU0sR0FxQ087QUFDaEIsWUFBSSxFQUFFLEdBQUc7QUFDVCxnQkFBUSxFQUFFLEtBQUssRUFDaEIsQ0FBQyxDQUNIOzs7O0FBRUQsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsNkJBQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7O0FBRW5DLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7QUFXZCxVQUFJLENBQUMsS0FBSywyQkFUWixLQUFLLEtBQUksUUFBUSxnQkFBUixRQUFRLEtBQUUsS0FBSyxnQkFBTCxLQUFLLEtBQ3hCLEtBQUssVUFBTCxLQUFLLEtBQ0wsTUFBTSxVQUFOLE1BQU0sS0FDTixZQUFZLFVBQVosWUFBWSxLQUNaLFNBQVMsVUFBVCxTQUFTLEtBQ1QsSUFBSSxVQUFKLElBQUksS0FDSixRQUFRLFVBQVIsUUFBUSxLQUNSLFFBQVEsVUFBUixRQUFRLEtBQ1IsU0FBUyxVQUFU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QUFJLENBQUMsS0FBSyxDQUFyQyxRQUFRLENBQUksUUFBUTtBQUM1QixVQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7O0FBRWYsVUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRztBQUNuQyxlQUFPLENBQ1I7O0FBQ0QsVUFBTSxRQUFRLEdBQUc7QUFDZCxpQkFBVyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFO0FBQzlCLG1CQUFhLENBQUUscUJBQXFCLENBQUUsQ0FBQztBQUMxQyxjQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7QUFDbEMsY0FBUSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQ3JDLEVBRUYsQ0FBQyxDQUFDOzs7OztBQUVZLE9BQUsiLCJmaWxlIjoiZ3JhcGguanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbC9zaGFsbG93LWVxdWFsJztcbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuaW1wb3J0IGRyYWdkcm9wIGZyb20gJy4uL3V0aWwvZHJhZ2Ryb3AnO1xuaW1wb3J0IGtleWJvYXJkIGZyb20gJy4uL3V0aWwva2V5Ym9hcmQnO1xuXG5pbXBvcnQgRWRnZSBmcm9tICcuL2VkZ2UnO1xuaW1wb3J0IFZlcnRleCBmcm9tICcuL3ZlcnRleCc7XG5pbXBvcnQgTGlua3MgZnJvbSAnLi9saW5rcyc7XG5pbXBvcnQgR2hvc3RQb3J0IGZyb20gJy4vZ2hvc3QtcG9ydCc7XG5pbXBvcnQgU2VsZWN0aW9uQm94IGZyb20gJy4vc2VsZWN0aW9uLWJveCc7XG5pbXBvcnQgTWluaW1hcCBmcm9tICcuL21pbmltYXAnO1xuXG5pbXBvcnQgeyBEcmFnUG9ydCB9IGZyb20gJy4uL2ZsdXgvbGF5b3V0L2xheW91dC1hY3Rpb25zJztcbmltcG9ydCB7IExheW91dCwgQ29vcmRzLCBEaW1lbnNpb25zIH0gZnJvbSAnLi4vZmx1eC9sYXlvdXQvbGF5b3V0LW1vZGVsJztcbmltcG9ydCB7IFNldHRpbmdzLCBSRUFEX09OTFkgfSBmcm9tICcuLi9mbHV4L3NldHRpbmdzL3NldHRpbmdzLW1vZGVsJztcbmltcG9ydCB7IEdyYXBoIGFzIEdyYXBoTW9kZWwgfSBmcm9tICcuLi9mbHV4L2dyYXBoL2dyYXBoLW1vZGVsJztcblxuaW1wb3J0IHtcbiAgVWlVbmRvLCBVaVJlZG8sIENyZWF0ZUNoZWNrcG9pbnRcbn0gZnJvbSAnLi4vZmx1eC9oaXN0b3J5L2hpc3RvcnktYWN0aW9ucyc7XG5cbmltcG9ydCB7XG4gIFZpZXdwb3J0TW92ZWQsIFZpZXdwb3J0TWVhc3VyZWQsIEhhbmRsZUZvY3VzUmVjZWl2ZWQsIEhhbmRsZUZvY3VzTG9zdFxufSBmcm9tICcuLi9mbHV4L3NldHRpbmdzL3NldHRpbmdzLWFjdGlvbnMnO1xuXG5pbXBvcnQge1xuICBQYXN0ZUNsaXBib2FyZCxcbiAgQ29weVNlbGVjdGlvbixcbiAgQ3V0U2VsZWN0aW9uLFxuICBSZXNpemVTZWxlY3Rpb24sXG4gIENsZWFyU2VsZWN0aW9uLFxuICBEZWxldGVTZWxlY3Rpb25cbn0gZnJvbSAnLi4vZmx1eC9zZWxlY3Rpb24vc2VsZWN0aW9uLWFjdGlvbnMnO1xuXG5cbmNvbnN0IHsgYWJzLCBtaW4sIG1heCB9ID0gTWF0aDtcblxuY29uc3QgR3JhcGggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3J0RHJhZ0luZm86IG51bGxcbiAgICB9O1xuICB9LFxuXG4gIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2V0dGluZ3M6IFNldHRpbmdzKCksXG4gICAgICB0eXBlczogTWFwKCksXG4gICAgICBtb2RlbDogR3JhcGhNb2RlbCgpLFxuICAgICAgbGF5b3V0OiBMYXlvdXQoKSxcbiAgICAgIHpvb206IDEwMCxcbiAgICAgIGhhc0ZvY3VzOiBmYWxzZVxuICAgIH07XG4gIH0sXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvdW50KHsgd2hhdDogR3JhcGguZGlzcGxheU5hbWUgfSk7XG5cbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCB7XG4gICAgICBtb2RlbDogeyB2ZXJ0aWNlcywgZWRnZXMgfSxcbiAgICAgIHR5cGVzLFxuICAgICAgbGF5b3V0LFxuICAgICAgbWVhc3VyZW1lbnRzLFxuICAgICAgc2VsZWN0aW9uLFxuICAgICAgem9vbSxcbiAgICAgIGhhc0ZvY3VzLFxuICAgICAgc2V0dGluZ3MsXG4gICAgICBjbGFzc05hbWVcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHsgcG9ydERyYWdJbmZvIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgZm9jdXNDbGFzcyA9XG4gICAgICBoYXNGb2N1cyA/ICduYmUtaGFzLWZvY3VzJyA6ICcnO1xuICAgIGNvbnN0IGhpZ2hsaWdodFR5cGVDbGFzcyA9XG4gICAgICBwb3J0RHJhZ0luZm8gPyBgbmJlLWhpZ2hsaWdodC10eXBlLSR7cG9ydERyYWdJbmZvLnBvcnQudHlwZX1gIDogJyc7XG4gICAgY29uc3QgaGlnaGxpZ2h0U2VsZWN0aW9uQ2xhc3MgPVxuICAgICAgKCBzZWxlY3Rpb24uZWRnZXMuaXNFbXB0eSgpICYmIHNlbGVjdGlvbi52ZXJ0aWNlcy5pc0VtcHR5KCkgKSA/ICcnIDogJ25iZS1oaWdobGlnaHQtc2VsZWN0aW9uJztcbiAgICBjb25zdCBjbGFzc2VzID1cbiAgICAgIGBuYmUtZ3JhcGggbmJlLXpvb20tJHt6b29tfSAke2ZvY3VzQ2xhc3N9ICR7aGlnaGxpZ2h0VHlwZUNsYXNzfSAke2hpZ2hsaWdodFNlbGVjdGlvbkNsYXNzfSAke2NsYXNzTmFtZX1gO1xuXG4gICAgY29uc3QgZGQgPSAoKSA9PiBkcmFnZHJvcCh7XG4gICAgICBvbk1vdmU6ICh7IGRyYWdQYXlsb2FkOiB7IGxlZnQsIHRvcCwgaXNFeHRlbnNpb24gfSwgZHJhZ1gsIGRyYWdZLCBkcmFnTm9kZSB9KSA9PiB7XG4gICAgICAgIGNvdW50KHsgd2hhdDogJyFEcmFnU2VsZWN0aW9uJyB9KTtcbiAgICAgICAgY29uc3QgeCA9IGxlZnQgKyBtaW4oIDAsIGRyYWdYICk7XG4gICAgICAgIGNvbnN0IHkgPSB0b3AgKyBtaW4oIDAsIGRyYWdZICk7XG4gICAgICAgIGNvbnN0IHcgPSBhYnMoIGRyYWdYICk7XG4gICAgICAgIGNvbnN0IGggPSBhYnMoIGRyYWdZICk7XG4gICAgICAgIHRoaXMuYnViYmxlKCBSZXNpemVTZWxlY3Rpb24oe1xuICAgICAgICAgIGlzRXh0ZW5zaW9uLFxuICAgICAgICAgIGNvb3JkczogQ29vcmRzKHsgbGVmdDogeCwgdG9wOiB5IH0pLFxuICAgICAgICAgIGRpbWVuc2lvbnM6IERpbWVuc2lvbnMoeyB3aWR0aDogdywgaGVpZ2h0OiBoIH0pXG4gICAgICAgIH0pICk7XG4gICAgICB9LFxuICAgICAgb25FbmQ6ICgpID0+IHRoaXMuYnViYmxlKCBSZXNpemVTZWxlY3Rpb24oeyBjb29yZHM6IG51bGwsIGRpbWVuc2lvbnM6IG51bGwgfSkgKSxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuYnViYmxlKCBDbGVhclNlbGVjdGlvbigpIClcbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0U2VsZWN0ID0gKCBldiApID0+IHtcbiAgICAgIGNvbnN0IHJlY3QgPSBldi5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgbGVmdCA9IGV2LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICBjb25zdCB0b3AgPSBldi5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICBjb25zdCBpc0V4dGVuc2lvbiA9IGV2LnNoaWZ0S2V5O1xuICAgICAgZGQoKS5zdGFydCggZXYsIHsgbGVmdCwgdG9wLCBpc0V4dGVuc2lvbiB9ICk7XG4gICAgfTtcblxuICAgIGNvbnN0IGNhbnZhc1NpemUgPSBzZWxmLmNhbnZhc1NpemUoIG1lYXN1cmVtZW50cywgbGF5b3V0ICk7XG4gICAgLy8gVE9ETzogJ2ZvbnQtc2l6ZTogMCcgaXMgYSB3ZWlyZCBoYWNrLlxuICAgIC8vIGZpbmQgYSBiZXR0ZXIgd2F5IHRvIG1ha2Ugc3VyZSB0aGF0IG5vIHNjcm9sbGJhciBpcyBzaG93blxuICAgIGNvbnN0IGNhbnZhc1N0eWxlID0ge1xuICAgICAgJ2ZvbnRTaXplJzogMCxcbiAgICAgICdtaW5XaWR0aCc6IGNhbnZhc1NpemUud2lkdGggKyAncHgnLFxuICAgICAgJ21pbkhlaWdodCc6IGNhbnZhc1NpemUuaGVpZ2h0ICsgJ3B4J1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiB0YWJJbmRleD1cIjBcIiBjbGFzc05hbWU9e2NsYXNzZXN9IHJlZj1cImdyYXBoXCI+XG4gICAgICAgIDxNaW5pbWFwIG1lYXN1cmVtZW50cz17bWVhc3VyZW1lbnRzfVxuICAgICAgICAgICAgICAgICBjYW52YXNTaXplPXtjYW52YXNTaXplfVxuICAgICAgICAgICAgICAgICB0eXBlcz17dHlwZXN9XG4gICAgICAgICAgICAgICAgIGVkZ2VzPXtlZGdlc31cbiAgICAgICAgICAgICAgICAgdmVydGljZXM9e3ZlcnRpY2VzfVxuICAgICAgICAgICAgICAgICBsYXlvdXQ9e2xheW91dH1cbiAgICAgICAgICAgICAgICAgc2V0dGluZ3M9e3NldHRpbmdzfVxuICAgICAgICAgICAgICAgICBldmVudEhhbmRsZXI9e3NlbGYuaGFuZGxlRXZlbnR9XG4gICAgICAgICAgICAgICAgIHNlbGVjdGlvbj17c2VsZWN0aW9ufSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1ncmFwaC12aWV3cG9ydFwiXG4gICAgICAgICAgICAgb25TY3JvbGw9e3RoaXMuaGFuZGxlU2Nyb2xsfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1ncmFwaC1jYW52YXNcIiBzdHlsZT17Y2FudmFzU3R5bGV9PlxuICAgICAgICAgICAgPFNlbGVjdGlvbkJveCBjb29yZHM9e3NlbGVjdGlvbi5jb29yZHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM9e3NlbGVjdGlvbi5kaW1lbnNpb25zfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtZ3JhcGgtbm9kZXNcIj5cbiAgICAgICAgICAgICAge3JlbmRlckVkZ2VzKCl9XG4gICAgICAgICAgICAgIHtyZW5kZXJWZXJ0aWNlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cIm5iZS1saW5rc1wiIG9uTW91c2VEb3duPXtzdGFydFNlbGVjdH0+XG4gICAgICAgICAgICAgIDxMaW5rcyBtZWFzdXJlbWVudHM9e21lYXN1cmVtZW50c31cbiAgICAgICAgICAgICAgICAgICAgIHR5cGVzPXt0eXBlc31cbiAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzPXt2ZXJ0aWNlc31cbiAgICAgICAgICAgICAgICAgICAgIGxheW91dD17bGF5b3V0fVxuICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uPXtzZWxlY3Rpb259IC8+XG4gICAgICAgICAgICAgIDxHaG9zdFBvcnQgZHJhZ0luZm89e3BvcnREcmFnSW5mb30gLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBmdW5jdGlvbiByZW5kZXJWZXJ0aWNlcygpIHtcbiAgICAgIHJldHVybiB2ZXJ0aWNlcy52YWx1ZVNlcSgpLm1hcCggdmVydGV4ID0+XG4gICAgICAgIDxWZXJ0ZXggc2V0dGluZ3M9e3NldHRpbmdzfVxuICAgICAgICAgICAgICAgIGtleT17dmVydGV4LmlkfVxuICAgICAgICAgICAgICAgIHZlcnRleD17dmVydGV4fVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3Rpb24udmVydGljZXMuaGFzKHZlcnRleC5pZCl9XG4gICAgICAgICAgICAgICAgbGF5b3V0PXtsYXlvdXQudmVydGljZXMuZ2V0KCB2ZXJ0ZXguaWQgKX1cbiAgICAgICAgICAgICAgICBtZWFzdXJlbWVudHM9e21lYXN1cmVtZW50cy52ZXJ0aWNlcy5nZXQoIHZlcnRleC5pZCApfVxuICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlcj17c2VsZi5oYW5kbGVFdmVudH0gLz5cbiAgICAgICkudG9KUygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckVkZ2VzKCkge1xuICAgICAgcmV0dXJuIGVkZ2VzLnZhbHVlU2VxKClcbiAgICAgIC5maWx0ZXIoIGVkZ2UgPT4gIXR5cGVzLmdldCggZWRnZS50eXBlICkub3duaW5nUG9ydCApXG4gICAgICAubWFwKCBlZGdlID0+XG4gICAgICAgIDxFZGdlIGtleT17ZWRnZS5pZH1cbiAgICAgICAgICAgICAgZWRnZT17ZWRnZX1cbiAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGlvbi5lZGdlcy5oYXMoZWRnZS5pZCl9XG4gICAgICAgICAgICAgIGxheW91dD17bGF5b3V0LmVkZ2VzLmdldCggZWRnZS5pZCApfVxuICAgICAgICAgICAgICBtZWFzdXJlbWVudHM9e21lYXN1cmVtZW50cy5lZGdlcy5nZXQoIGVkZ2UuaWQgKX1cbiAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyPXtzZWxmLmhhbmRsZUV2ZW50fSAvPlxuICAgICAgKVxuICAgICAgLnRvSlMoKTtcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlRXZlbnQoIGV2ZW50ICkge1xuICAgIHN3aXRjaCggZXZlbnQudHlwZSgpICkge1xuICAgICAgY2FzZSBEcmFnUG9ydDpcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoICh7cG9ydERyYWdJbmZvfSkgPT4gKHtcbiAgICAgICAgICBwb3J0RHJhZ0luZm86IGV2ZW50LmluZm9cbiAgICAgICAgfSkgKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5idWJibGUoIGV2ZW50ICk7XG4gICAgfVxuICB9LFxuXG4gIGJ1YmJsZSggZXZlbnQgKSB7XG4gICAgY29uc3QgeyBldmVudEhhbmRsZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlciAmJiBldmVudEhhbmRsZXIoIGV2ZW50ICk7XG4gIH0sXG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMsIG5leHRTdGF0ZSApIHtcbiAgICByZXR1cm4gIXNoYWxsb3dFcXVhbCggbmV4dFN0YXRlLCB0aGlzLnN0YXRlIClcbiAgICAgIHx8ICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9LFxuXG4gIGNhbnZhc1NpemUoIG1lYXN1cmVtZW50cywgbGF5b3V0ICkge1xuICAgIHZhciB3ID0gMDtcbiAgICB2YXIgaCA9IDA7XG4gICAgY29uc3QgcGFkZGluZyA9IDUwO1xuICAgIGNvbnN0IG1lYXN1cmUgPSAoIG5vZGVDb29yZHMgKSA9PiAobm9kZU1lYXN1cmVtZW50cywgaWQpID0+IHtcbiAgICAgIGlmKCBub2RlQ29vcmRzLmhhc093blByb3BlcnR5KCBpZCApICkge1xuICAgICAgICBjb25zdCB7IGRpbWVuc2lvbnM6IHsgd2lkdGgsIGhlaWdodCB9IH0gPSBub2RlTWVhc3VyZW1lbnRzLnRvSlMoKTtcbiAgICAgICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IG5vZGVDb29yZHNbIGlkIF07XG4gICAgICAgIHcgPSBtYXgoIHcsIGxlZnQgKyB3aWR0aCApO1xuICAgICAgICBoID0gbWF4KCBoLCB0b3AgKyBoZWlnaHQgKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG1lYXN1cmVtZW50cy52ZXJ0aWNlcy5mb3JFYWNoKCBtZWFzdXJlKCBsYXlvdXQudmVydGljZXMudG9KUygpICkgKTtcbiAgICBtZWFzdXJlbWVudHMuZWRnZXMuZm9yRWFjaCggbWVhc3VyZSggbGF5b3V0LmVkZ2VzLnRvSlMoKSApICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiB3ICsgcGFkZGluZyxcbiAgICAgIGhlaWdodDogaCArIHBhZGRpbmdcbiAgICB9O1xuICB9LFxuXG4gIG1lYXN1cmUoKSB7XG4gICAgY29uc3QgZG9tR3JhcGggPSBSZWFjdC5maW5kRE9NTm9kZSggdGhpcy5yZWZzLmdyYXBoICk7XG4gICAgY29uc3QgeyB2aWV3cG9ydCB9ID0gdGhpcy5wcm9wcy5zZXR0aW5ncztcbiAgICBpZiggZG9tR3JhcGgub2Zmc2V0V2lkdGggIT09IHZpZXdwb3J0LndpZHRoIHx8XG4gICAgICAgIGRvbUdyYXBoLm9mZnNldEhlaWdodCAhPT0gdmlld3BvcnQuaGVpZ2h0ICkge1xuICAgICAgdGhpcy5idWJibGUoIFZpZXdwb3J0TWVhc3VyZWQoe1xuICAgICAgICB3aWR0aDogZG9tR3JhcGgub2Zmc2V0V2lkdGgsXG4gICAgICAgIGhlaWdodDogZG9tR3JhcGgub2Zmc2V0SGVpZ2h0XG4gICAgICB9KSApO1xuICAgIH1cbiAgfSxcblxuICBoYW5kbGVTY3JvbGwoIGV2ICkge1xuICAgIHRoaXMuYnViYmxlKCBWaWV3cG9ydE1vdmVkKHtcbiAgICAgIGxlZnQ6IGV2LnRhcmdldC5zY3JvbGxMZWZ0LFxuICAgICAgdG9wOiBldi50YXJnZXQuc2Nyb2xsVG9wLFxuICAgICAgYnk6ICc6R1JBUEg6J1xuICAgIH0pICk7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5tZWFzdXJlKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzLm1lYXN1cmUgKTtcblxuICAgIGNvbnN0IGRvbUdyYXBoID0gUmVhY3QuZmluZERPTU5vZGUoIHRoaXMucmVmcy5ncmFwaCApO1xuICAgIGNvbnN0IGJ1YmJsZSA9ICggYWN0ICkgPT4gdGhpcy5idWJibGUoIGFjdCApO1xuICAgIGNvbnN0IGdyYXBoID0gdGhpcztcbiAgICBrZXlib2FyZChcbiAgICAgIGRvbUdyYXBoLCB7XG4gICAgICAgIGlzUmVhZE9ubHkoKSB7XG4gICAgICAgICAgcmV0dXJuIGdyYXBoLnByb3BzLnNldHRpbmdzLm1vZGUgPT09IFJFQURfT05MWTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Gb2N1c1JlY2VpdmVkKCkge1xuICAgICAgICAgIGJ1YmJsZSggSGFuZGxlRm9jdXNSZWNlaXZlZCh7IGRvbU5vZGU6IGRvbUdyYXBoIH0pICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRm9jdXNMb3N0KCkge1xuICAgICAgICAgIGJ1YmJsZSggSGFuZGxlRm9jdXNMb3N0KHsgZG9tTm9kZTogZG9tR3JhcGggfSkgKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25VbmRvKCkge1xuICAgICAgICAgIGJ1YmJsZSggVWlVbmRvKCkgKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZWRvKCkge1xuICAgICAgICAgIGJ1YmJsZSggVWlSZWRvKCkgKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EZWxldGUoKSB7XG4gICAgICAgICAgYnViYmxlKCBDcmVhdGVDaGVja3BvaW50KHsgYmVmb3JlOiAnRGVsZXRlIFNlbGVjdGlvbicgfSkgKTtcbiAgICAgICAgICBidWJibGUoIERlbGV0ZVNlbGVjdGlvbigpICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ3V0KCkge1xuICAgICAgICAgIGJ1YmJsZSggQ3JlYXRlQ2hlY2twb2ludCh7IGJlZm9yZTogJ0N1dCBTZWxlY3Rpb24nIH0pICk7XG4gICAgICAgICAgYnViYmxlKCBDdXRTZWxlY3Rpb24oKSApO1xuICAgICAgICB9LFxuICAgICAgICBvbkNvcHkoKSB7XG4gICAgICAgICAgYnViYmxlKCBDb3B5U2VsZWN0aW9uKCkgKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25QYXN0ZSgpIHtcbiAgICAgICAgICBidWJibGUoIENyZWF0ZUNoZWNrcG9pbnQoeyBiZWZvcmU6ICdQYXN0ZSBDbGlwYm9hcmQnIH0pICk7XG4gICAgICAgICAgYnViYmxlKCBQYXN0ZUNsaXBib2FyZCgpICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCB7IHNldHRpbmdzOiB7IHZpZXdwb3J0IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5tZWFzdXJlKCk7XG5cbiAgICBpZiggdmlld3BvcnQubW92ZWRCeSA9PT0gJzpHUkFQSDonICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkb21HcmFwaCA9IFJlYWN0XG4gICAgICAuZmluZERPTU5vZGUoIHRoaXMucmVmcy5ncmFwaCApXG4gICAgICAucXVlcnlTZWxlY3RvciggJy5uYmUtZ3JhcGgtdmlld3BvcnQnICk7XG4gICAgZG9tR3JhcGguc2Nyb2xsVG9wID0gdmlld3BvcnQudG9wO1xuICAgIGRvbUdyYXBoLnNjcm9sbExlZnQgPSB2aWV3cG9ydC5sZWZ0O1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHcmFwaDtcbiJdfQ==