define(['exports', 'module', 'react', '../util/dragdrop', '../util/shallow-equal', '../util/metrics', '../flux/history/history-actions', '../flux/graph/graph-model', '../flux/graph/graph-actions', '../flux/layout/layout-model', '../flux/layout/layout-actions', '../flux/selection/selection-actions', './port'], function (exports, module, _react, _utilDragdrop, _utilShallowEqual, _utilMetrics, _fluxHistoryHistoryActions, _fluxGraphGraphModel, _fluxGraphGraphActions, _fluxLayoutLayoutModel, _fluxLayoutLayoutActions, _fluxSelectionSelectionActions, _port) {'use strict';var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}function _defaultProps(defaultProps, props) {if (defaultProps) {for (var propName in defaultProps) {if (typeof props[propName] === 'undefined') {props[propName] = defaultProps[propName];}}}return props;}var _React = _interopRequireDefault(_react);var _dragdrop = _interopRequireDefault(_utilDragdrop);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _count = _interopRequireDefault(_utilMetrics);var _layoutActions = _interopRequireDefault(_fluxLayoutLayoutActions);var _Port = _interopRequireDefault(_port);var 




















  MeasureVertex = _layoutActions['default'].MeasureVertex;var MeasurePort = _layoutActions['default'].MeasurePort;var MoveVertex = _layoutActions['default'].MoveVertex;


  var Vertex = _React['default'].createClass({ displayName: 'Vertex', 

    render: function render() {var _this = this;
      var self = this;var _self$props = 
      self.props;var vertex = _self$props.vertex;var selected = _self$props.selected;var layout = _self$props.layout;var measurements = _self$props.measurements;var eventHandler = _self$props.eventHandler;var mode = _self$props.mode;
      (0, _count['default'])({ what: Vertex.displayName });var 
      ports = vertex.ports;var label = vertex.label;

      var style = { 
        visibility: layout ? null : 'hidden', 
        transform: layout && 'translate(' + layout.left + 'px, ' + layout.top + 'px)', 
        width: measurements && measurements.dimensions.width, 
        height: measurements && measurements.dimensions.height };


      var selectedClass = selected ? 'nbe-selected' : '';
      var classes = 'nbe-vertex nbe-node nbe-kind-' + 
      vertex.kind + ' ' + selectedClass;

      var dd = function dd() {return (0, _dragdrop['default'])({ 
          onStart: function onStart() {
            _this.bubble((0, _fluxHistoryHistoryActions.CreateCheckpoint)({ before: 'Move Vertex' }));}, 

          onMove: function onMove(_ref) {var dragPayload = _ref.dragPayload;var dragX = _ref.dragX;var dragY = _ref.dragY;var dragNode = _ref.dragNode;
            if (selected) {
              eventHandler((0, _fluxSelectionSelectionActions.MoveSelection)({ 
                reference: dragPayload, 
                offset: (0, _fluxLayoutLayoutModel.Coords)({ left: dragX, top: dragY }) }));} else 


            {var _dragPayload$coords = 
              dragPayload.coords;var left = _dragPayload$coords.left;var _top = _dragPayload$coords.top;
              eventHandler(MoveVertex({ 
                vertex: vertex, 
                to: (0, _fluxLayoutLayoutModel.Coords)({ left: left + dragX, top: _top + dragY }) }));}}, 



          onClick: function onClick(ev) {
            if (ev.shiftKey) {
              _this.bubble((selected ? _fluxSelectionSelectionActions.DeselectVertex : _fluxSelectionSelectionActions.SelectVertex)({ vertex: vertex }));} else 

            {
              _this.bubble((0, _fluxSelectionSelectionActions.ClearSelection)());
              _this.bubble((0, _fluxSelectionSelectionActions.SelectVertex)({ vertex: vertex }));}} });};




      var startDrag = function startDrag(ev) {return dd().start(ev, { coords: layout, id: {} });};

      var activate = function activate(ev) {_this.bubble((0, _fluxGraphGraphActions.ActivateVertex)({ vertex: vertex }));};

      return (
        _React['default'].createElement('div', { style: style, className: classes, ref: 'vertex', 
          onDoubleClick: activate, 
          onMouseDown: startDrag }, { $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { children: 
            label, className: 'nbe-vertex-header' }, _owner: null }, { $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { children: [{ $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { children: 


                renderPorts(_fluxGraphGraphModel.IN), className: 'nbe-ports nbe-inbound' }, _owner: null }, { $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { children: 


                renderPorts(_fluxGraphGraphModel.OUT), className: 'nbe-ports nbe-outbound' }, _owner: null }], className: 'nbe-port-group' }, _owner: null }));





      function renderPorts(direction) {
        return ports[direction].map(function (port) {return { $$typeof: _typeofReactElement, type: _Port['default'], key: 
            port.id, ref: null, props: _defaultProps(_Port['default'].defaultProps, { 
              port: port, 
              vertex: vertex, 
              eventHandler: self.handleEvent, 
              mode: mode }), _owner: null };}).toJS();}}, 



    handleEvent: function handleEvent(event) {
      this.bubble(event);}, 



    bubble: function bubble(event) {var 
      eventHandler = this.props.eventHandler;
      return eventHandler && eventHandler(event);}, 



    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);} });module.exports = 





  Vertex;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3ZlcnRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJFLGVBQWEsNkJBQWIsYUFBYSxLQUFFLFdBQVcsNkJBQVgsV0FBVyxLQUFFLFVBQVUsNkJBQVYsVUFBVTs7O0FBR3hDLE1BQU0sTUFBTSxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7QUFFL0IsVUFBTSxFQUFBLGtCQUFHO0FBQ1AsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3FELFVBQUksQ0FBQyxLQUFLLEtBQXpFLE1BQU0sZUFBTixNQUFNLEtBQUUsUUFBUSxlQUFSLFFBQVEsS0FBRSxNQUFNLGVBQU4sTUFBTSxLQUFFLFlBQVksZUFBWixZQUFZLEtBQUUsWUFBWSxlQUFaLFlBQVksS0FBRSxJQUFJLGVBQUosSUFBSTtBQUNsRSw2QkFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUM1QixXQUFLLEdBQVksTUFBTSxDQUF2QixLQUFLLEtBQUUsS0FBSyxHQUFLLE1BQU0sQ0FBaEIsS0FBSzs7QUFFcEIsVUFBTSxLQUFLLEdBQUc7QUFDWixrQkFBVSxFQUFFLE1BQU0sR0FBRyxJQUFJLEdBQUcsUUFBUTtBQUNwQyxpQkFBUyxFQUFFLE1BQU0sSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLO0FBQzdFLGFBQUssRUFBRSxZQUFZLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLO0FBQ3BELGNBQU0sRUFBRSxZQUFZLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQ3ZELENBQUM7OztBQUVGLFVBQU0sYUFBYSxHQUFHLFFBQVEsR0FBRyxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3JELFVBQU0sT0FBTztBQUNxQixZQUFNLENBQUMsSUFBSSxTQUFJLGFBQWEsQUFBRSxDQUFDOztB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QUk7QUFDdEIsZ0JBQUksQ0FBQyxFQUFFO0FBQ1osa0JBQUksRUFBRSxJQUFJO0FBQ1Ysb0JBQU0sRUFBRSxNQUFNO0FBQ2QsMEJBQVksRUFBRSxJQUFJLENBQUMsV0FBVztBQUM5QixrQkFBSSxFQUFFLElBQUkscUJBQUksQ0FBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQ2pDLENBQ0Y7Ozs7QUFFRCxlQUFXLEVBQUEscUJBQUUsS0FBSyxFQUFHO0FBQ25CLFVBQUksQ0FBQyxNQUFNLENBQUUsS0FBSyxDQUFFLENBQUMsQ0FDdEI7Ozs7QUFHRCxVQUFNLEVBQUEsZ0JBQUUsS0FBSyxFQUFHO0FBQ04sa0JBQVksR0FBSyxJQUFJLENBQUMsS0FBSyxDQUEzQixZQUFZO0FBQ3BCLGFBQU8sWUFBWSxJQUFJLFlBQVksQ0FBRSxLQUFLLENBQUUsQ0FBQyxDQUM5Qzs7OztBQUdELHlCQUFxQixFQUFBLCtCQUFFLFNBQVMsRUFBRztBQUNqQyxhQUFPLENBQUMsOEJBQWMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUMvQyxFQUVGLENBQUMsQ0FBQzs7Ozs7O0FBR1ksUUFBTSIsImZpbGUiOiJ2ZXJ0ZXguanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IGRyYWdkcm9wIGZyb20gJy4uL3V0aWwvZHJhZ2Ryb3AnO1xuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlsL3NoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IGNvdW50IGZyb20gJy4uL3V0aWwvbWV0cmljcyc7XG5cbmltcG9ydCB7IENyZWF0ZUNoZWNrcG9pbnQgfSBmcm9tICcuLi9mbHV4L2hpc3RvcnkvaGlzdG9yeS1hY3Rpb25zJztcbmltcG9ydCB7IElOLCBPVVQgfSBmcm9tICcuLi9mbHV4L2dyYXBoL2dyYXBoLW1vZGVsJztcbmltcG9ydCB7IEFjdGl2YXRlVmVydGV4IH0gZnJvbSAnLi4vZmx1eC9ncmFwaC9ncmFwaC1hY3Rpb25zJztcbmltcG9ydCB7XG4gIENvb3JkcywgRGltZW5zaW9ucywgVmVydGV4TWVhc3VyZW1lbnRzXG59IGZyb20gJy4uL2ZsdXgvbGF5b3V0L2xheW91dC1tb2RlbCc7XG5pbXBvcnQgbGF5b3V0QWN0aW9ucyBmcm9tICcuLi9mbHV4L2xheW91dC9sYXlvdXQtYWN0aW9ucyc7XG5pbXBvcnQge1xuICBDbGVhclNlbGVjdGlvbiwgU2VsZWN0VmVydGV4LCBEZXNlbGVjdFZlcnRleCwgTW92ZVNlbGVjdGlvblxufSBmcm9tICcuLi9mbHV4L3NlbGVjdGlvbi9zZWxlY3Rpb24tYWN0aW9ucyc7XG5cbmltcG9ydCBQb3J0IGZyb20gJy4vcG9ydCc7XG5cblxuY29uc3Qge1xuICBNZWFzdXJlVmVydGV4LCBNZWFzdXJlUG9ydCwgTW92ZVZlcnRleFxufSA9IGxheW91dEFjdGlvbnM7XG5cbmNvbnN0IFZlcnRleCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgeyB2ZXJ0ZXgsIHNlbGVjdGVkLCBsYXlvdXQsIG1lYXN1cmVtZW50cywgZXZlbnRIYW5kbGVyLCBtb2RlIH0gPSBzZWxmLnByb3BzO1xuICAgIGNvdW50KHsgd2hhdDogVmVydGV4LmRpc3BsYXlOYW1lIH0pO1xuICAgIGNvbnN0IHsgcG9ydHMsIGxhYmVsIH0gPSB2ZXJ0ZXg7XG5cbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIHZpc2liaWxpdHk6IGxheW91dCA/IG51bGwgOiAnaGlkZGVuJyxcbiAgICAgIHRyYW5zZm9ybTogbGF5b3V0ICYmICd0cmFuc2xhdGUoJyArIGxheW91dC5sZWZ0ICsgJ3B4LCAnICsgbGF5b3V0LnRvcCArICdweCknLFxuICAgICAgd2lkdGg6IG1lYXN1cmVtZW50cyAmJiBtZWFzdXJlbWVudHMuZGltZW5zaW9ucy53aWR0aCxcbiAgICAgIGhlaWdodDogbWVhc3VyZW1lbnRzICYmIG1lYXN1cmVtZW50cy5kaW1lbnNpb25zLmhlaWdodFxuICAgIH07XG5cbiAgICBjb25zdCBzZWxlY3RlZENsYXNzID0gc2VsZWN0ZWQgPyAnbmJlLXNlbGVjdGVkJyA6ICcnO1xuICAgIGNvbnN0IGNsYXNzZXMgPVxuICAgICAgYG5iZS12ZXJ0ZXggbmJlLW5vZGUgbmJlLWtpbmQtJHt2ZXJ0ZXgua2luZH0gJHtzZWxlY3RlZENsYXNzfWA7XG5cbiAgICBjb25zdCBkZCA9ICgpID0+IGRyYWdkcm9wKHtcbiAgICAgIG9uU3RhcnQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5idWJibGUoIENyZWF0ZUNoZWNrcG9pbnQoeyBiZWZvcmU6ICdNb3ZlIFZlcnRleCcgfSkgKTtcbiAgICAgIH0sXG4gICAgICBvbk1vdmU6ICh7IGRyYWdQYXlsb2FkLCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgaWYoIHNlbGVjdGVkICkge1xuICAgICAgICAgIGV2ZW50SGFuZGxlciggTW92ZVNlbGVjdGlvbih7XG4gICAgICAgICAgICByZWZlcmVuY2U6IGRyYWdQYXlsb2FkLFxuICAgICAgICAgICAgb2Zmc2V0OiBDb29yZHMoeyBsZWZ0OiBkcmFnWCwgdG9wOiBkcmFnWSB9KVxuICAgICAgICAgIH0pICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IGRyYWdQYXlsb2FkLmNvb3JkcztcbiAgICAgICAgICBldmVudEhhbmRsZXIoIE1vdmVWZXJ0ZXgoe1xuICAgICAgICAgICAgdmVydGV4OiB2ZXJ0ZXgsXG4gICAgICAgICAgICB0bzogQ29vcmRzKHsgbGVmdDogbGVmdCArIGRyYWdYLCB0b3A6IHRvcCArIGRyYWdZIH0pXG4gICAgICAgICAgfSkgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6ICggZXYgKSA9PiB7XG4gICAgICAgIGlmKCBldi5zaGlmdEtleSApIHtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggKHNlbGVjdGVkID8gRGVzZWxlY3RWZXJ0ZXggOiBTZWxlY3RWZXJ0ZXgpKHsgdmVydGV4IH0pICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIENsZWFyU2VsZWN0aW9uKCkgKTtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggU2VsZWN0VmVydGV4KHsgdmVydGV4IH0pICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0RHJhZyA9ICggZXYgKSA9PiBkZCgpLnN0YXJ0KCBldiwgeyBjb29yZHM6IGxheW91dCwgaWQ6IHt9IH0gKTtcblxuICAgIGNvbnN0IGFjdGl2YXRlID0gKCBldiApID0+IHsgdGhpcy5idWJibGUoIEFjdGl2YXRlVmVydGV4KHsgdmVydGV4IH0pICkgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc2VzfSByZWY9XCJ2ZXJ0ZXhcIlxuICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXthY3RpdmF0ZX1cbiAgICAgICAgICAgb25Nb3VzZURvd249e3N0YXJ0RHJhZ30+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLXZlcnRleC1oZWFkZXJcIj57bGFiZWx9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLXBvcnQtZ3JvdXBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1wb3J0cyBuYmUtaW5ib3VuZFwiPlxuICAgICAgICAgICAge3JlbmRlclBvcnRzKCBJTiApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLXBvcnRzIG5iZS1vdXRib3VuZFwiPlxuICAgICAgICAgICAge3JlbmRlclBvcnRzKCBPVVQgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyUG9ydHMoIGRpcmVjdGlvbiApIHtcbiAgICAgIHJldHVybiBwb3J0c1sgZGlyZWN0aW9uIF0ubWFwKCBwb3J0ID0+XG4gICAgICAgIDxQb3J0IGtleT17cG9ydC5pZH1cbiAgICAgICAgICAgICAgcG9ydD17cG9ydH1cbiAgICAgICAgICAgICAgdmVydGV4PXt2ZXJ0ZXh9XG4gICAgICAgICAgICAgIGV2ZW50SGFuZGxlcj17c2VsZi5oYW5kbGVFdmVudH1cbiAgICAgICAgICAgICAgbW9kZT17bW9kZX0gLz4gKS50b0pTKCk7XG4gICAgfVxuICB9LFxuXG4gIGhhbmRsZUV2ZW50KCBldmVudCApIHtcbiAgICB0aGlzLmJ1YmJsZSggZXZlbnQgKTtcbiAgfSxcblxuXG4gIGJ1YmJsZSggZXZlbnQgKSB7XG4gICAgY29uc3QgeyBldmVudEhhbmRsZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlciAmJiBldmVudEhhbmRsZXIoIGV2ZW50ICk7XG4gIH0sXG5cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApIHtcbiAgICByZXR1cm4gIXNoYWxsb3dFcXVhbCggbmV4dFByb3BzLCB0aGlzLnByb3BzICk7XG4gIH1cblxufSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgVmVydGV4O1xuIl19