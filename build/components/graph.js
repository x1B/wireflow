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
            _React['default'].createElement(_Vertex['default'], { mode: settings.mode, 
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
      var domGraph = _React['default'].findDOMNode(this.refs.graph);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2dyYXBoLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNDUSxLQUFHLEdBQWUsSUFBSSxDQUF0QixHQUFHLEtBQUUsR0FBRyxHQUFVLElBQUksQ0FBakIsR0FBRyxLQUFFLEdBQUcsR0FBSyxJQUFJLENBQVosR0FBRzs7QUFFckIsTUFBTSxLQUFLLEdBQUcsa0JBQU0sV0FBVyxDQUFDOztBQUU5QixtQkFBZSxFQUFBLDJCQUFHO0FBQ2hCLGFBQU87QUFDTCxvQkFBWSxFQUFFLElBQUksRUFDbkIsQ0FBQyxDQUNIOzs7O0FBRUQsbUJBQWUsRUFBQSwyQkFBRztBQUNoQixhQUFPO0FBQ0wsZ0JBQVEsRUFBRSwrQkFqQ1AsUUFBUSxHQWlDUztBQUNwQixhQUFLLEVBQUUsZUFsREosR0FBRyxHQWtETTtBQUNaLGFBQUssRUFBRSx5QkFsQ0osS0FBSyxHQWtDVztBQUNuQixjQUFNLEVBQUUsMkJBckNMLE1BQU0sR0FxQ087QUFDaEIsWUFBSSxFQUFFLEdBQUc7QUFDVCxnQkFBUSxFQUFFLEtBQUssRUFDaEIsQ0FBQyxDQUNIOzs7O0FBRUQsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsNkJBQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7O0FBRW5DLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7QUFXZCxVQUFJLENBQUMsS0FBSywyQkFUWixLQUFLLEtBQUksUUFBUSxnQkFBUixRQUFRLEtBQUUsS0FBSyxnQkFBTCxLQUFLLEtBQ3hCLEtBQUssVUFBTCxLQUFLLEtBQ0wsTUFBTSxVQUFOLE1BQU0sS0FDTixZQUFZLFVBQVosWUFBWSxLQUNaLFNBQVMsVUFBVCxTQUFTLEtBQ1QsSUFBSSxVQUFKLElBQUksS0FDSixRQUFRLFVBQVIsUUFBUSxLQUNSLFFBQVEsVUFBUixRQUFRLEtBQ1IsU0FBUyxVQUFULFNBQVM7O0FBR0gsa0JBQVksR0FBSyxJQUFJLENBQUMsS0FBSyxDQUEzQixZQUFZOztBQUVwQixVQUFNLFVBQVU7QUFDZCxjQUFRLEdBQUcsZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUNsQyxVQUFNLGtCQUFrQjtBQUN0QixrQkFBWSwyQkFBeUIsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUssRUFBRSxDQUFDO0FBQ3JFLFVBQU0sdUJBQXVCO0FBQzNCLEFBQUUsZUFBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFLLEVBQUUsR0FBRyx5QkFBeUIsQ0FBQztBQUNqRyxVQUFNLE9BQU87QUFDVyxVQUFJLFNBQUksVUFBVSxTQUFJLGtCQUFrQixTQUFJLHVCQUF1QixTQUFJLFNBQVMsQUFBRSxDQUFDOztBQUUzRyxVQUFNLEVBQUUsR0FBRyxTQUFMLEVBQUUsV0FBUywwQkFBUztBQUN4QixnQkFBTSxFQUFFLGdCQUFDLElBQW1FLEVBQUssd0JBQXhFLElBQW1FLENBQWpFLFdBQVcsS0FBSSxJQUFJLG9CQUFKLElBQUksS0FBRSxHQUFHLG9CQUFILEdBQUcsS0FBRSxXQUFXLG9CQUFYLFdBQVcsS0FBSSxLQUFLLEdBQWhELElBQW1FLENBQXhCLEtBQUssS0FBRSxLQUFLLEdBQXZELElBQW1FLENBQWpCLEtBQUssS0FBRSxRQUFRLEdBQWpFLElBQW1FLENBQVYsUUFBUTtBQUN4RSxtQ0FBTSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7QUFDbEMsZ0JBQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBRSxDQUFDO0FBQ2pDLGdCQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFFLENBQUMsRUFBRSxLQUFLLENBQUUsQ0FBQztBQUNoQyxnQkFBTSxDQUFDLEdBQUcsR0FBRyxDQUFFLEtBQUssQ0FBRSxDQUFDO0FBQ3ZCLGdCQUFNLENBQUMsR0FBRyxHQUFHLENBQUUsS0FBSyxDQUFFLENBQUM7QUFDdkIsa0JBQUssTUFBTSxDQUFFLG1DQTdEbkIsZUFBZSxFQTZEb0I7QUFDM0IseUJBQVcsRUFBWCxXQUFXO0FBQ1gsb0JBQU0sRUFBRSwyQkEvRUQsTUFBTSxFQStFRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ25DLHdCQUFVLEVBQUUsMkJBaEZHLFVBQVUsRUFnRkYsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUNoRCxDQUFDLENBQUUsQ0FBQyxDQUNOOzs7QUFDRCxlQUFLLEVBQUUseUJBQU0sTUFBSyxNQUFNLENBQUUsbUNBbkU5QixlQUFlLEVBbUUrQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUUsRUFBQTtBQUMvRSxpQkFBTyxFQUFFLDJCQUFNLE1BQUssTUFBTSxDQUFFLG1DQW5FaEMsY0FBYyxHQW1Fa0MsQ0FBRSxFQUFBLEVBQy9DLENBQUMsRUFBQSxDQUFDOzs7QUFFSCxVQUFNLFdBQVcsR0FBRyxTQUFkLFdBQVcsQ0FBSyxFQUFFLEVBQU07QUFDNUIsWUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQ3RELFlBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNwQyxZQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbEMsWUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUNoQyxVQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxHQUFHLEVBQUgsR0FBRyxFQUFFLFdBQVcsRUFBWCxXQUFXLEVBQUUsQ0FBRSxDQUFDLENBQzlDLENBQUM7OztBQUVGLFVBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBRSxDQUFDOzs7QUFHM0QsVUFBTSxXQUFXLEdBQUc7QUFDbEIsa0JBQVUsRUFBRSxDQUFDO0FBQ2Isa0JBQVUsRUFBRSxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUk7QUFDbkMsbUJBQVcsRUFBRSxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksRUFDdEMsQ0FBQzs7O0FBRUY7QUFDRSxpREFBSyxRQUFRLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBRSxPQUFPLEFBQUMsRUFBQyxHQUFHLEVBQUMsT0FBTztBQUMvQywrREFBUyxZQUFZLEVBQUUsWUFBWSxBQUFDO0FBQzNCLG9CQUFVLEVBQUUsVUFBVSxBQUFDO0FBQ3ZCLGVBQUssRUFBRSxLQUFLLEFBQUM7QUFDYixlQUFLLEVBQUUsS0FBSyxBQUFDO0FBQ2Isa0JBQVEsRUFBRSxRQUFRLEFBQUM7QUFDbkIsZ0JBQU0sRUFBRSxNQUFNLEFBQUM7QUFDZixrQkFBUSxFQUFFLFFBQVEsQUFBQztBQUNuQixzQkFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLEFBQUM7QUFDL0IsbUJBQVMsRUFBRSxTQUFTLEFBQUMsR0FBRztBQUNqQyxpREFBSyxTQUFTLEVBQUMsb0JBQW9CO0FBQzlCLGtCQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQUFBQztBQUMvQixpREFBSyxTQUFTLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFFLFdBQVcsQUFBQztBQUNuRCxvRUFBYyxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU0sQUFBQztBQUN6QixvQkFBVSxFQUFFLFNBQVMsQ0FBQyxVQUFVLEFBQUMsR0FBRztBQUNsRCxpREFBSyxTQUFTLEVBQUMsaUJBQWlCO0FBQzdCLG1CQUFXLEVBQUU7QUFDYixzQkFBYyxFQUFFLENBQ2I7O0FBQ04saURBQUssU0FBUyxFQUFDLFdBQVcsRUFBQyxXQUFXLEVBQUUsV0FBVyxBQUFDO0FBQ2xELDZEQUFPLFlBQVksRUFBRSxZQUFZLEFBQUM7QUFDM0IsZUFBSyxFQUFFLEtBQUssQUFBQztBQUNiLGtCQUFRLEVBQUUsUUFBUSxBQUFDO0FBQ25CLGdCQUFNLEVBQUUsTUFBTSxBQUFDO0FBQ2YsbUJBQVMsRUFBRSxTQUFTLEFBQUMsR0FBRztBQUMvQixpRUFBVyxRQUFRLEVBQUUsWUFBWSxBQUFDLEdBQUcsQ0FDakMsQ0FDRixDQUNGLENBQ0YsRUFDTjs7Ozs7OztBQUVGLGVBQVMsY0FBYyxHQUFHO0FBQ3hCLGVBQU8sUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBRSxVQUFBLE1BQU07QUFDcEMsa0VBQVEsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEFBQUM7QUFDcEIsaUJBQUcsRUFBRSxNQUFNLENBQUMsRUFBRSxBQUFDO0FBQ2Ysb0JBQU0sRUFBRSxNQUFNLEFBQUM7QUFDZixzQkFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQUFBQztBQUM1QyxvQkFBTSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUUsQUFBQztBQUN6QywwQkFBWSxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUUsQUFBQztBQUNyRCwwQkFBWSxFQUFFLElBQUksQ0FBQyxXQUFXLEFBQUMsR0FBRyxHQUFBLENBQzNDO0FBQUMsWUFBSSxFQUFFLENBQUMsQ0FDVjs7O0FBRUQsZUFBUyxXQUFXLEdBQUc7QUFDckIsZUFBTyxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ3RCLGNBQU0sQ0FBRSxVQUFBLElBQUksVUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBRSxDQUFDLFVBQVUsRUFBQSxDQUFFO0FBQ3BELFdBQUcsQ0FBRSxVQUFBLElBQUk7QUFDUixnRUFBTSxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQUFBQztBQUNiLGtCQUFJLEVBQUUsSUFBSSxBQUFDO0FBQ1gsc0JBQVEsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEFBQUM7QUFDdkMsb0JBQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFFLEFBQUM7QUFDcEMsMEJBQVksRUFBRSxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFFLEFBQUM7QUFDaEQsMEJBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxBQUFDLEdBQUcsR0FBQSxDQUN6Qzs7QUFDQSxZQUFJLEVBQUUsQ0FBQyxDQUNULENBQ0Y7Ozs7QUFFRCxlQUFXLEVBQUEscUJBQUUsS0FBSyxFQUFHO0FBQ25CLGNBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtBQUNsQixzQ0F2S0csUUFBUTtBQXdLVCxpQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFFLFVBQUMsS0FBYyxPQUFiLFlBQVksR0FBYixLQUFjLENBQWIsWUFBWSxRQUFPO0FBQ3pDLDBCQUFZLEVBQUUsS0FBSyxDQUFDLElBQUksRUFDekIsRUFBQyxDQUFFLENBQUM7OztBQUVQO0FBQ0UsY0FBSSxDQUFDLE1BQU0sQ0FBRSxLQUFLLENBQUUsQ0FBQyxDQUN4QixDQUNGOzs7O0FBRUQsVUFBTSxFQUFBLGdCQUFFLEtBQUssRUFBRztBQUNOLGtCQUFZLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBM0IsWUFBWTtBQUNwQixhQUFPLFlBQVksSUFBSSxZQUFZLENBQUUsS0FBSyxDQUFFLENBQUMsQ0FDOUM7OztBQUVELHlCQUFxQixFQUFBLCtCQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUc7QUFDNUMsYUFBTyxDQUFDLDhCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFO0FBQ3hDLE9BQUMsOEJBQWMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUM3Qzs7O0FBRUQsY0FBVSxFQUFBLG9CQUFFLFlBQVksRUFBRSxNQUFNLEVBQUc7OztBQUdqQyxVQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxZQUFZLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUc7QUFDekUsZUFBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQzVCOzs7QUFFRCxVQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDVixVQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDVixVQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbkIsVUFBTSxPQUFPLEdBQUcsU0FBVixPQUFPLENBQUssVUFBVSxVQUFNLFVBQUMsZ0JBQWdCLEVBQUUsRUFBRSxFQUFLO0FBQzFELGNBQUksVUFBVSxDQUFDLGNBQWMsQ0FBRSxFQUFFLENBQUUsRUFBRztBQUNNLDRCQUFnQixDQUFDLElBQUksRUFBRSxnRUFBekQsVUFBVSxLQUFJLEtBQUsscUNBQUwsS0FBSyxLQUFFLE1BQU0scUNBQU4sTUFBTTtBQUNiLHNCQUFVLENBQUUsRUFBRSxDQUFFLEtBQTlCLElBQUksa0JBQUosSUFBSSxLQUFFLElBQUcsa0JBQUgsR0FBRztBQUNqQixhQUFDLEdBQUcsR0FBRyxDQUFFLENBQUMsRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFFLENBQUM7QUFDM0IsYUFBQyxHQUFHLEdBQUcsQ0FBRSxDQUFDLEVBQUUsSUFBRyxHQUFHLE1BQU0sQ0FBRSxDQUFDLENBQzVCLENBQ0YsRUFBQSxDQUFDOzs7QUFDRixrQkFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsT0FBTyxDQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBRSxDQUFDO0FBQ25FLGtCQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBRSxPQUFPLENBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFFLENBQUM7O0FBRTdELFVBQUksQ0FBQyxnQkFBZ0IsR0FBRyxZQUFZLENBQUM7QUFDckMsVUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7QUFDekIsVUFBSSxDQUFDLGNBQWMsR0FBRztBQUNwQixhQUFLLEVBQUUsQ0FBQyxHQUFHLE9BQU87QUFDbEIsY0FBTSxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQ3BCLENBQUM7OztBQUVGLGFBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUM1Qjs7O0FBRUQsV0FBTyxFQUFBLG1CQUFHO0FBQ1IsVUFBTSxRQUFRLEdBQUcsa0JBQU0sV0FBVyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7QUFDdEQsVUFBSSxDQUFDLFFBQVEsRUFBRztBQUNkLGVBQU8sQ0FDUjs7QUFDTyxjQUFRLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQWhDLFFBQVE7QUFDaEIsVUFBSSxRQUFRLENBQUMsV0FBVyxLQUFLLFFBQVEsQ0FBQyxLQUFLO0FBQ3ZDLGNBQVEsQ0FBQyxZQUFZLEtBQUssUUFBUSxDQUFDLE1BQU0sRUFBRztBQUM5QyxZQUFJLENBQUMsTUFBTSxDQUFFLGlDQXhORixnQkFBZ0IsRUF3Tkc7QUFDNUIsZUFBSyxFQUFFLFFBQVEsQ0FBQyxXQUFXO0FBQzNCLGdCQUFNLEVBQUUsUUFBUSxDQUFDLFlBQVksRUFDOUIsQ0FBQyxDQUFFLENBQUMsQ0FDTixDQUNGOzs7OztBQUVELGdCQUFZLEVBQUEsc0JBQUUsRUFBRSxFQUFHO0FBQ2pCLFVBQUksQ0FBQyxNQUFNLENBQUUsaUNBaE9mLGFBQWEsRUFnT2dCO0FBQ3pCLFlBQUksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVU7QUFDMUIsV0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUztBQUN4QixVQUFFLEVBQUUsU0FBUyxFQUNkLENBQUMsQ0FBRSxDQUFDLENBQ047Ozs7QUFFRCxxQkFBaUIsRUFBQSw2QkFBRztBQUNsQixVQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDZixZQUFNLENBQUMsZ0JBQWdCLENBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQzs7QUFFbEQsVUFBTSxRQUFRLEdBQUcsa0JBQU0sV0FBVyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7QUFDdEQsVUFBTSxNQUFNLEdBQUcsU0FBVCxNQUFNLENBQUssR0FBRyxVQUFNLE9BQUssTUFBTSxDQUFFLEdBQUcsQ0FBRSxFQUFBLENBQUM7QUFDN0MsVUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ25CO0FBQ0UsY0FBUSxFQUFFO0FBQ1Isa0JBQVUsRUFBQSxzQkFBRztBQUNYLGlCQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksZ0NBelB2QixTQUFTLEFBeVA0QixDQUFDLENBQ2hEOztBQUNELHVCQUFlLEVBQUEsMkJBQUc7QUFDaEIsZ0JBQU0sQ0FBRSxpQ0FwUGlCLG1CQUFtQixFQW9QaEIsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQ3REOztBQUNELG1CQUFXLEVBQUEsdUJBQUc7QUFDWixnQkFBTSxDQUFFLGlDQXZQc0MsZUFBZSxFQXVQckMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQ2xEOztBQUNELGNBQU0sRUFBQSxrQkFBRztBQUNQLGdCQUFNLENBQUUsK0JBOVBoQixNQUFNLEdBOFBrQixDQUFFLENBQUMsQ0FDcEI7O0FBQ0QsY0FBTSxFQUFBLGtCQUFHO0FBQ1AsZ0JBQU0sQ0FBRSwrQkFqUVIsTUFBTSxHQWlRVSxDQUFFLENBQUMsQ0FDcEI7O0FBQ0QsZ0JBQVEsRUFBQSxvQkFBRztBQUNULGdCQUFNLENBQUUsK0JBcFFBLGdCQUFnQixFQW9RQyxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxDQUFDLENBQUUsQ0FBQztBQUMzRCxnQkFBTSxDQUFFLG1DQXhQaEIsZUFBZSxHQXdQa0IsQ0FBRSxDQUFDLENBQzdCOztBQUNELGFBQUssRUFBQSxpQkFBRztBQUNOLGdCQUFNLENBQUUsK0JBeFFBLGdCQUFnQixFQXdRQyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFFLENBQUM7QUFDeEQsZ0JBQU0sQ0FBRSxtQ0EvUGhCLFlBQVksR0ErUGtCLENBQUUsQ0FBQyxDQUMxQjs7QUFDRCxjQUFNLEVBQUEsa0JBQUc7QUFDUCxnQkFBTSxDQUFFLG1DQW5RaEIsYUFBYSxHQW1Ra0IsQ0FBRSxDQUFDLENBQzNCOztBQUNELGVBQU8sRUFBQSxtQkFBRztBQUNSLGdCQUFNLENBQUUsK0JBL1FBLGdCQUFnQixFQStRQyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUUsQ0FBQztBQUMxRCxnQkFBTSxDQUFFLG1DQXhRaEIsY0FBYyxHQXdRa0IsQ0FBRSxDQUFDLENBQzVCLEVBQ0YsQ0FDRixDQUFDLENBQ0g7Ozs7OztBQUVELHNCQUFrQixFQUFBLDhCQUFHO0FBQ0MsY0FBUSxHQUFPLElBQUksQ0FBQyxLQUFLLENBQXJDLFFBQVEsQ0FBSSxRQUFRO0FBQzVCLFVBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFZixVQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFHO0FBQ25DLGVBQU8sQ0FDUjs7QUFDRCxVQUFNLFFBQVEsR0FBRztBQUNkLGlCQUFXLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUU7QUFDOUIsbUJBQWEsQ0FBRSxxQkFBcUIsQ0FBRSxDQUFDO0FBQzFDLGNBQVEsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQztBQUNsQyxjQUFRLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FDckMsRUFFRixDQUFDLENBQUM7Ozs7O0FBRVksT0FBSyIsImZpbGUiOiJncmFwaC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlsL3NoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IGNvdW50IGZyb20gJy4uL3V0aWwvbWV0cmljcyc7XG5pbXBvcnQgZHJhZ2Ryb3AgZnJvbSAnLi4vdXRpbC9kcmFnZHJvcCc7XG5pbXBvcnQga2V5Ym9hcmQgZnJvbSAnLi4vdXRpbC9rZXlib2FyZCc7XG5cbmltcG9ydCBFZGdlIGZyb20gJy4vZWRnZSc7XG5pbXBvcnQgVmVydGV4IGZyb20gJy4vdmVydGV4JztcbmltcG9ydCBMaW5rcyBmcm9tICcuL2xpbmtzJztcbmltcG9ydCBHaG9zdFBvcnQgZnJvbSAnLi9naG9zdC1wb3J0JztcbmltcG9ydCBTZWxlY3Rpb25Cb3ggZnJvbSAnLi9zZWxlY3Rpb24tYm94JztcbmltcG9ydCBNaW5pbWFwIGZyb20gJy4vbWluaW1hcCc7XG5cbmltcG9ydCB7IERyYWdQb3J0IH0gZnJvbSAnLi4vZmx1eC9sYXlvdXQvbGF5b3V0LWFjdGlvbnMnO1xuaW1wb3J0IHsgTGF5b3V0LCBDb29yZHMsIERpbWVuc2lvbnMgfSBmcm9tICcuLi9mbHV4L2xheW91dC9sYXlvdXQtbW9kZWwnO1xuaW1wb3J0IHsgU2V0dGluZ3MsIFJFQURfT05MWSB9IGZyb20gJy4uL2ZsdXgvc2V0dGluZ3Mvc2V0dGluZ3MtbW9kZWwnO1xuaW1wb3J0IHsgR3JhcGggYXMgR3JhcGhNb2RlbCB9IGZyb20gJy4uL2ZsdXgvZ3JhcGgvZ3JhcGgtbW9kZWwnO1xuXG5pbXBvcnQge1xuICBVaVVuZG8sIFVpUmVkbywgQ3JlYXRlQ2hlY2twb2ludFxufSBmcm9tICcuLi9mbHV4L2hpc3RvcnkvaGlzdG9yeS1hY3Rpb25zJztcblxuaW1wb3J0IHtcbiAgVmlld3BvcnRNb3ZlZCwgVmlld3BvcnRNZWFzdXJlZCwgSGFuZGxlRm9jdXNSZWNlaXZlZCwgSGFuZGxlRm9jdXNMb3N0XG59IGZyb20gJy4uL2ZsdXgvc2V0dGluZ3Mvc2V0dGluZ3MtYWN0aW9ucyc7XG5cbmltcG9ydCB7XG4gIFBhc3RlQ2xpcGJvYXJkLFxuICBDb3B5U2VsZWN0aW9uLFxuICBDdXRTZWxlY3Rpb24sXG4gIFJlc2l6ZVNlbGVjdGlvbixcbiAgQ2xlYXJTZWxlY3Rpb24sXG4gIERlbGV0ZVNlbGVjdGlvblxufSBmcm9tICcuLi9mbHV4L3NlbGVjdGlvbi9zZWxlY3Rpb24tYWN0aW9ucyc7XG5cblxuY29uc3QgeyBhYnMsIG1pbiwgbWF4IH0gPSBNYXRoO1xuXG5jb25zdCBHcmFwaCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvcnREcmFnSW5mbzogbnVsbFxuICAgIH07XG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZXR0aW5nczogU2V0dGluZ3MoKSxcbiAgICAgIHR5cGVzOiBNYXAoKSxcbiAgICAgIG1vZGVsOiBHcmFwaE1vZGVsKCksXG4gICAgICBsYXlvdXQ6IExheW91dCgpLFxuICAgICAgem9vbTogMTAwLFxuICAgICAgaGFzRm9jdXM6IGZhbHNlXG4gICAgfTtcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY291bnQoeyB3aGF0OiBHcmFwaC5kaXNwbGF5TmFtZSB9KTtcblxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IHtcbiAgICAgIG1vZGVsOiB7IHZlcnRpY2VzLCBlZGdlcyB9LFxuICAgICAgdHlwZXMsXG4gICAgICBsYXlvdXQsXG4gICAgICBtZWFzdXJlbWVudHMsXG4gICAgICBzZWxlY3Rpb24sXG4gICAgICB6b29tLFxuICAgICAgaGFzRm9jdXMsXG4gICAgICBzZXR0aW5ncyxcbiAgICAgIGNsYXNzTmFtZVxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgeyBwb3J0RHJhZ0luZm8gfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBmb2N1c0NsYXNzID1cbiAgICAgIGhhc0ZvY3VzID8gJ25iZS1oYXMtZm9jdXMnIDogJyc7XG4gICAgY29uc3QgaGlnaGxpZ2h0VHlwZUNsYXNzID1cbiAgICAgIHBvcnREcmFnSW5mbyA/IGBuYmUtaGlnaGxpZ2h0LXR5cGUtJHtwb3J0RHJhZ0luZm8ucG9ydC50eXBlfWAgOiAnJztcbiAgICBjb25zdCBoaWdobGlnaHRTZWxlY3Rpb25DbGFzcyA9XG4gICAgICAoIHNlbGVjdGlvbi5lZGdlcy5pc0VtcHR5KCkgJiYgc2VsZWN0aW9uLnZlcnRpY2VzLmlzRW1wdHkoKSApID8gJycgOiAnbmJlLWhpZ2hsaWdodC1zZWxlY3Rpb24nO1xuICAgIGNvbnN0IGNsYXNzZXMgPVxuICAgICAgYG5iZS1ncmFwaCBuYmUtem9vbS0ke3pvb219ICR7Zm9jdXNDbGFzc30gJHtoaWdobGlnaHRUeXBlQ2xhc3N9ICR7aGlnaGxpZ2h0U2VsZWN0aW9uQ2xhc3N9ICR7Y2xhc3NOYW1lfWA7XG5cbiAgICBjb25zdCBkZCA9ICgpID0+IGRyYWdkcm9wKHtcbiAgICAgIG9uTW92ZTogKHsgZHJhZ1BheWxvYWQ6IHsgbGVmdCwgdG9wLCBpc0V4dGVuc2lvbiB9LCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgY291bnQoeyB3aGF0OiAnIURyYWdTZWxlY3Rpb24nIH0pO1xuICAgICAgICBjb25zdCB4ID0gbGVmdCArIG1pbiggMCwgZHJhZ1ggKTtcbiAgICAgICAgY29uc3QgeSA9IHRvcCArIG1pbiggMCwgZHJhZ1kgKTtcbiAgICAgICAgY29uc3QgdyA9IGFicyggZHJhZ1ggKTtcbiAgICAgICAgY29uc3QgaCA9IGFicyggZHJhZ1kgKTtcbiAgICAgICAgdGhpcy5idWJibGUoIFJlc2l6ZVNlbGVjdGlvbih7XG4gICAgICAgICAgaXNFeHRlbnNpb24sXG4gICAgICAgICAgY29vcmRzOiBDb29yZHMoeyBsZWZ0OiB4LCB0b3A6IHkgfSksXG4gICAgICAgICAgZGltZW5zaW9uczogRGltZW5zaW9ucyh7IHdpZHRoOiB3LCBoZWlnaHQ6IGggfSlcbiAgICAgICAgfSkgKTtcbiAgICAgIH0sXG4gICAgICBvbkVuZDogKCkgPT4gdGhpcy5idWJibGUoIFJlc2l6ZVNlbGVjdGlvbih7IGNvb3JkczogbnVsbCwgZGltZW5zaW9uczogbnVsbCB9KSApLFxuICAgICAgb25DbGljazogKCkgPT4gdGhpcy5idWJibGUoIENsZWFyU2VsZWN0aW9uKCkgKVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3RhcnRTZWxlY3QgPSAoIGV2ICkgPT4ge1xuICAgICAgY29uc3QgcmVjdCA9IGV2LmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCBsZWZ0ID0gZXYuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgIGNvbnN0IHRvcCA9IGV2LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgIGNvbnN0IGlzRXh0ZW5zaW9uID0gZXYuc2hpZnRLZXk7XG4gICAgICBkZCgpLnN0YXJ0KCBldiwgeyBsZWZ0LCB0b3AsIGlzRXh0ZW5zaW9uIH0gKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2FudmFzU2l6ZSA9IHNlbGYuY2FudmFzU2l6ZSggbWVhc3VyZW1lbnRzLCBsYXlvdXQgKTtcbiAgICAvLyBUT0RPOiAnZm9udC1zaXplOiAwJyBpcyBhIHdlaXJkIGhhY2suXG4gICAgLy8gZmluZCBhIGJldHRlciB3YXkgdG8gbWFrZSBzdXJlIHRoYXQgbm8gc2Nyb2xsYmFyIGlzIHNob3duXG4gICAgY29uc3QgY2FudmFzU3R5bGUgPSB7XG4gICAgICAnZm9udFNpemUnOiAwLFxuICAgICAgJ21pbldpZHRoJzogY2FudmFzU2l6ZS53aWR0aCArICdweCcsXG4gICAgICAnbWluSGVpZ2h0JzogY2FudmFzU2l6ZS5oZWlnaHQgKyAncHgnXG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHRhYkluZGV4PVwiMFwiIGNsYXNzTmFtZT17Y2xhc3Nlc30gcmVmPVwiZ3JhcGhcIj5cbiAgICAgICAgPE1pbmltYXAgbWVhc3VyZW1lbnRzPXttZWFzdXJlbWVudHN9XG4gICAgICAgICAgICAgICAgIGNhbnZhc1NpemU9e2NhbnZhc1NpemV9XG4gICAgICAgICAgICAgICAgIHR5cGVzPXt0eXBlc31cbiAgICAgICAgICAgICAgICAgZWRnZXM9e2VkZ2VzfVxuICAgICAgICAgICAgICAgICB2ZXJ0aWNlcz17dmVydGljZXN9XG4gICAgICAgICAgICAgICAgIGxheW91dD17bGF5b3V0fVxuICAgICAgICAgICAgICAgICBzZXR0aW5ncz17c2V0dGluZ3N9XG4gICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlcj17c2VsZi5oYW5kbGVFdmVudH1cbiAgICAgICAgICAgICAgICAgc2VsZWN0aW9uPXtzZWxlY3Rpb259IC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLWdyYXBoLXZpZXdwb3J0XCJcbiAgICAgICAgICAgICBvblNjcm9sbD17dGhpcy5oYW5kbGVTY3JvbGx9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLWdyYXBoLWNhbnZhc1wiIHN0eWxlPXtjYW52YXNTdHlsZX0+XG4gICAgICAgICAgICA8U2VsZWN0aW9uQm94IGNvb3Jkcz17c2VsZWN0aW9uLmNvb3Jkc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucz17c2VsZWN0aW9uLmRpbWVuc2lvbnN9IC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1ncmFwaC1ub2Rlc1wiPlxuICAgICAgICAgICAgICB7cmVuZGVyRWRnZXMoKX1cbiAgICAgICAgICAgICAge3JlbmRlclZlcnRpY2VzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwibmJlLWxpbmtzXCIgb25Nb3VzZURvd249e3N0YXJ0U2VsZWN0fT5cbiAgICAgICAgICAgICAgPExpbmtzIG1lYXN1cmVtZW50cz17bWVhc3VyZW1lbnRzfVxuICAgICAgICAgICAgICAgICAgICAgdHlwZXM9e3R5cGVzfVxuICAgICAgICAgICAgICAgICAgICAgdmVydGljZXM9e3ZlcnRpY2VzfVxuICAgICAgICAgICAgICAgICAgICAgbGF5b3V0PXtsYXlvdXR9XG4gICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb249e3NlbGVjdGlvbn0gLz5cbiAgICAgICAgICAgICAgPEdob3N0UG9ydCBkcmFnSW5mbz17cG9ydERyYWdJbmZvfSAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlclZlcnRpY2VzKCkge1xuICAgICAgcmV0dXJuIHZlcnRpY2VzLnZhbHVlU2VxKCkubWFwKCB2ZXJ0ZXggPT5cbiAgICAgICAgPFZlcnRleCBtb2RlPXtzZXR0aW5ncy5tb2RlfVxuICAgICAgICAgICAgICAgIGtleT17dmVydGV4LmlkfVxuICAgICAgICAgICAgICAgIHZlcnRleD17dmVydGV4fVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3Rpb24udmVydGljZXMuaGFzKHZlcnRleC5pZCl9XG4gICAgICAgICAgICAgICAgbGF5b3V0PXtsYXlvdXQudmVydGljZXMuZ2V0KCB2ZXJ0ZXguaWQgKX1cbiAgICAgICAgICAgICAgICBtZWFzdXJlbWVudHM9e21lYXN1cmVtZW50cy52ZXJ0aWNlcy5nZXQoIHZlcnRleC5pZCApfVxuICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlcj17c2VsZi5oYW5kbGVFdmVudH0gLz5cbiAgICAgICkudG9KUygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckVkZ2VzKCkge1xuICAgICAgcmV0dXJuIGVkZ2VzLnZhbHVlU2VxKClcbiAgICAgIC5maWx0ZXIoIGVkZ2UgPT4gIXR5cGVzLmdldCggZWRnZS50eXBlICkub3duaW5nUG9ydCApXG4gICAgICAubWFwKCBlZGdlID0+XG4gICAgICAgIDxFZGdlIGtleT17ZWRnZS5pZH1cbiAgICAgICAgICAgICAgZWRnZT17ZWRnZX1cbiAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGlvbi5lZGdlcy5oYXMoZWRnZS5pZCl9XG4gICAgICAgICAgICAgIGxheW91dD17bGF5b3V0LmVkZ2VzLmdldCggZWRnZS5pZCApfVxuICAgICAgICAgICAgICBtZWFzdXJlbWVudHM9e21lYXN1cmVtZW50cy5lZGdlcy5nZXQoIGVkZ2UuaWQgKX1cbiAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyPXtzZWxmLmhhbmRsZUV2ZW50fSAvPlxuICAgICAgKVxuICAgICAgLnRvSlMoKTtcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlRXZlbnQoIGV2ZW50ICkge1xuICAgIHN3aXRjaCggZXZlbnQudHlwZSgpICkge1xuICAgICAgY2FzZSBEcmFnUG9ydDpcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoICh7cG9ydERyYWdJbmZvfSkgPT4gKHtcbiAgICAgICAgICBwb3J0RHJhZ0luZm86IGV2ZW50LmluZm9cbiAgICAgICAgfSkgKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5idWJibGUoIGV2ZW50ICk7XG4gICAgfVxuICB9LFxuXG4gIGJ1YmJsZSggZXZlbnQgKSB7XG4gICAgY29uc3QgeyBldmVudEhhbmRsZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlciAmJiBldmVudEhhbmRsZXIoIGV2ZW50ICk7XG4gIH0sXG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMsIG5leHRTdGF0ZSApIHtcbiAgICByZXR1cm4gIXNoYWxsb3dFcXVhbCggbmV4dFN0YXRlLCB0aGlzLnN0YXRlIClcbiAgICAgIHx8ICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9LFxuXG4gIGNhbnZhc1NpemUoIG1lYXN1cmVtZW50cywgbGF5b3V0ICkge1xuICAgIC8vIHByb2ZpbGluZyBzaG93cyB0aGF0IHRoaXMgaXMgZXhwZW5zaXZlOiBtZW1vaXplLlxuICAgIC8vIEFjdHVhbGx5LCB3ZSBtYXkgd2FudCB0byBtb3ZlIHRoaXMgdG8gYSBzdG9yZS5cbiAgICBpZiggdGhpcy5sYXN0TWVhc3VyZW1lbnRzID09PSBtZWFzdXJlbWVudHMgJiYgdGhpcy5sYXN0TGF5b3V0ID09PSBsYXlvdXQgKSB7XG4gICAgICByZXR1cm4gdGhpcy5sYXN0Q2FudmFzU2l6ZTtcbiAgICB9XG5cbiAgICB2YXIgdyA9IDA7XG4gICAgdmFyIGggPSAwO1xuICAgIGNvbnN0IHBhZGRpbmcgPSA1MDtcbiAgICBjb25zdCBtZWFzdXJlID0gKCBub2RlQ29vcmRzICkgPT4gKG5vZGVNZWFzdXJlbWVudHMsIGlkKSA9PiB7XG4gICAgICBpZiggbm9kZUNvb3Jkcy5oYXNPd25Qcm9wZXJ0eSggaWQgKSApIHtcbiAgICAgICAgY29uc3QgeyBkaW1lbnNpb25zOiB7IHdpZHRoLCBoZWlnaHQgfSB9ID0gbm9kZU1lYXN1cmVtZW50cy50b0pTKCk7XG4gICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBub2RlQ29vcmRzWyBpZCBdO1xuICAgICAgICB3ID0gbWF4KCB3LCBsZWZ0ICsgd2lkdGggKTtcbiAgICAgICAgaCA9IG1heCggaCwgdG9wICsgaGVpZ2h0ICk7XG4gICAgICB9XG4gICAgfTtcbiAgICBtZWFzdXJlbWVudHMudmVydGljZXMuZm9yRWFjaCggbWVhc3VyZSggbGF5b3V0LnZlcnRpY2VzLnRvSlMoKSApICk7XG4gICAgbWVhc3VyZW1lbnRzLmVkZ2VzLmZvckVhY2goIG1lYXN1cmUoIGxheW91dC5lZGdlcy50b0pTKCkgKSApO1xuXG4gICAgdGhpcy5sYXN0TWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRzO1xuICAgIHRoaXMubGFzdExheW91dCA9IGxheW91dDtcbiAgICB0aGlzLmxhc3RDYW52YXNTaXplID0ge1xuICAgICAgd2lkdGg6IHcgKyBwYWRkaW5nLFxuICAgICAgaGVpZ2h0OiBoICsgcGFkZGluZ1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5sYXN0Q2FudmFzU2l6ZTtcbiAgfSxcblxuICBtZWFzdXJlKCkge1xuICAgIGNvbnN0IGRvbUdyYXBoID0gUmVhY3QuZmluZERPTU5vZGUoIHRoaXMucmVmcy5ncmFwaCApO1xuICAgIGlmKCAhZG9tR3JhcGggKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgdmlld3BvcnQgfSA9IHRoaXMucHJvcHMuc2V0dGluZ3M7XG4gICAgaWYoIGRvbUdyYXBoLm9mZnNldFdpZHRoICE9PSB2aWV3cG9ydC53aWR0aCB8fFxuICAgICAgICBkb21HcmFwaC5vZmZzZXRIZWlnaHQgIT09IHZpZXdwb3J0LmhlaWdodCApIHtcbiAgICAgIHRoaXMuYnViYmxlKCBWaWV3cG9ydE1lYXN1cmVkKHtcbiAgICAgICAgd2lkdGg6IGRvbUdyYXBoLm9mZnNldFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGRvbUdyYXBoLm9mZnNldEhlaWdodFxuICAgICAgfSkgKTtcbiAgICB9XG4gIH0sXG5cbiAgaGFuZGxlU2Nyb2xsKCBldiApIHtcbiAgICB0aGlzLmJ1YmJsZSggVmlld3BvcnRNb3ZlZCh7XG4gICAgICBsZWZ0OiBldi50YXJnZXQuc2Nyb2xsTGVmdCxcbiAgICAgIHRvcDogZXYudGFyZ2V0LnNjcm9sbFRvcCxcbiAgICAgIGJ5OiAnOkdSQVBIOidcbiAgICB9KSApO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMubWVhc3VyZSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgdGhpcy5tZWFzdXJlICk7XG5cbiAgICBjb25zdCBkb21HcmFwaCA9IFJlYWN0LmZpbmRET01Ob2RlKCB0aGlzLnJlZnMuZ3JhcGggKTtcbiAgICBjb25zdCBidWJibGUgPSAoIGFjdCApID0+IHRoaXMuYnViYmxlKCBhY3QgKTtcbiAgICBjb25zdCBncmFwaCA9IHRoaXM7XG4gICAga2V5Ym9hcmQoXG4gICAgICBkb21HcmFwaCwge1xuICAgICAgICBpc1JlYWRPbmx5KCkge1xuICAgICAgICAgIHJldHVybiBncmFwaC5wcm9wcy5zZXR0aW5ncy5tb2RlID09PSBSRUFEX09OTFk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRm9jdXNSZWNlaXZlZCgpIHtcbiAgICAgICAgICBidWJibGUoIEhhbmRsZUZvY3VzUmVjZWl2ZWQoeyBkb21Ob2RlOiBkb21HcmFwaCB9KSApO1xuICAgICAgICB9LFxuICAgICAgICBvbkZvY3VzTG9zdCgpIHtcbiAgICAgICAgICBidWJibGUoIEhhbmRsZUZvY3VzTG9zdCh7IGRvbU5vZGU6IGRvbUdyYXBoIH0pICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uVW5kbygpIHtcbiAgICAgICAgICBidWJibGUoIFVpVW5kbygpICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVkbygpIHtcbiAgICAgICAgICBidWJibGUoIFVpUmVkbygpICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRGVsZXRlKCkge1xuICAgICAgICAgIGJ1YmJsZSggQ3JlYXRlQ2hlY2twb2ludCh7IGJlZm9yZTogJ0RlbGV0ZSBTZWxlY3Rpb24nIH0pICk7XG4gICAgICAgICAgYnViYmxlKCBEZWxldGVTZWxlY3Rpb24oKSApO1xuICAgICAgICB9LFxuICAgICAgICBvbkN1dCgpIHtcbiAgICAgICAgICBidWJibGUoIENyZWF0ZUNoZWNrcG9pbnQoeyBiZWZvcmU6ICdDdXQgU2VsZWN0aW9uJyB9KSApO1xuICAgICAgICAgIGJ1YmJsZSggQ3V0U2VsZWN0aW9uKCkgKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Db3B5KCkge1xuICAgICAgICAgIGJ1YmJsZSggQ29weVNlbGVjdGlvbigpICk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUGFzdGUoKSB7XG4gICAgICAgICAgYnViYmxlKCBDcmVhdGVDaGVja3BvaW50KHsgYmVmb3JlOiAnUGFzdGUgQ2xpcGJvYXJkJyB9KSApO1xuICAgICAgICAgIGJ1YmJsZSggUGFzdGVDbGlwYm9hcmQoKSApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfSxcblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgY29uc3QgeyBzZXR0aW5nczogeyB2aWV3cG9ydCB9IH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMubWVhc3VyZSgpO1xuXG4gICAgaWYoIHZpZXdwb3J0Lm1vdmVkQnkgPT09ICc6R1JBUEg6JyApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZG9tR3JhcGggPSBSZWFjdFxuICAgICAgLmZpbmRET01Ob2RlKCB0aGlzLnJlZnMuZ3JhcGggKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoICcubmJlLWdyYXBoLXZpZXdwb3J0JyApO1xuICAgIGRvbUdyYXBoLnNjcm9sbFRvcCA9IHZpZXdwb3J0LnRvcDtcbiAgICBkb21HcmFwaC5zY3JvbGxMZWZ0ID0gdmlld3BvcnQubGVmdDtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgR3JhcGg7XG4iXX0=