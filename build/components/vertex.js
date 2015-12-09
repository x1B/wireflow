define(['exports', 'module', 'react', '../util/dragdrop', '../util/shallow-equal', '../util/metrics', '../flux/history/history-actions', '../flux/graph/graph-model', '../flux/layout/layout-model', '../flux/layout/layout-actions', '../flux/selection/selection-actions', './port'], function (exports, module, _react, _utilDragdrop, _utilShallowEqual, _utilMetrics, _fluxHistoryHistoryActions, _fluxGraphGraphModel, _fluxLayoutLayoutModel, _fluxLayoutLayoutActions, _fluxSelectionSelectionActions, _port) {'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);var _dragdrop = _interopRequireDefault(_utilDragdrop);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _count = _interopRequireDefault(_utilMetrics);var _layoutActions = _interopRequireDefault(_fluxLayoutLayoutActions);var _Port = _interopRequireDefault(_port);var 



















  MeasureVertex = _layoutActions['default'].MeasureVertex;var MeasurePort = _layoutActions['default'].MeasurePort;var MoveVertex = _layoutActions['default'].MoveVertex;


  var Vertex = _React['default'].createClass({ displayName: 'Vertex', 

    render: function render() {var _this = this;
      var self = this;var _self$props = 
      self.props;var vertex = _self$props.vertex;var selected = _self$props.selected;var layout = _self$props.layout;var measurements = _self$props.measurements;var eventHandler = _self$props.eventHandler;var settings = _self$props.settings;
      (0, _count['default'])({ what: Vertex.displayName });var 
      ports = vertex.ports;var label = vertex.label;

      var style = { 
        visibility: layout ? null : 'hidden', 
        left: layout && layout.left, 
        top: layout && layout.top, 
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

      return (
        _React['default'].createElement('div', { style: style, className: classes, ref: 'vertex', 
          onMouseDown: startDrag }, 
        _React['default'].createElement('div', { className: 'nbe-vertex-header' }, label), 
        _React['default'].createElement('div', { className: 'nbe-port-group' }, 
        _React['default'].createElement('div', { className: 'nbe-ports nbe-inbound' }, 
        renderPorts(_fluxGraphGraphModel.IN)), 

        _React['default'].createElement('div', { className: 'nbe-ports nbe-outbound' }, 
        renderPorts(_fluxGraphGraphModel.OUT)))));





      function renderPorts(direction) {
        return ports[direction].map(function (port) {return (
            _React['default'].createElement(_Port['default'], { key: port.id, 
              port: port, 
              vertex: vertex, 
              eventHandler: self.handleEvent, 
              settings: settings }));}).toJS();}}, 




    handleEvent: function handleEvent(event) {
      this.bubble(event);}, 



    bubble: function bubble(event) {var 
      eventHandler = this.props.eventHandler;
      return eventHandler && eventHandler(event);}, 



    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shallowEqual['default'])(nextState, this.state) || 
      !(0, _shallowEqual['default'])(nextProps, this.props);} });module.exports = 





  Vertex;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3ZlcnRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkUsZUFBYSw2QkFBYixhQUFhLEtBQUUsV0FBVyw2QkFBWCxXQUFXLEtBQUUsVUFBVSw2QkFBVixVQUFVOzs7QUFHeEMsTUFBTSxNQUFNLEdBQUcsa0JBQU0sV0FBVyxDQUFDOztBQUUvQixVQUFNLEVBQUEsa0JBQUc7QUFDUCxVQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFDeUQsVUFBSSxDQUFDLEtBQUssS0FBN0UsTUFBTSxlQUFOLE1BQU0sS0FBRSxRQUFRLGVBQVIsUUFBUSxLQUFFLE1BQU0sZUFBTixNQUFNLEtBQUUsWUFBWSxlQUFaLFlBQVksS0FBRSxZQUFZLGVBQVosWUFBWSxLQUFFLFFBQVEsZUFBUixRQUFRO0FBQ3RFLDZCQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQzVCLFdBQUssR0FBWSxNQUFNLENBQXZCLEtBQUssS0FBRSxLQUFLLEdBQUssTUFBTSxDQUFoQixLQUFLOztBQUVwQixVQUFNLEtBQUssR0FBRztBQUNaLGtCQUFVLEVBQUUsTUFBTSxHQUFHLElBQUksR0FBRyxRQUFRO0FBQ3BDLFlBQUksRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLElBQUk7QUFDM0IsV0FBRyxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRztBQUN6QixhQUFLLEVBQUUsWUFBWSxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSztBQUNwRCxjQUFNLEVBQUUsWUFBWSxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUN2RCxDQUFDOzs7QUFFRixVQUFNLGFBQWEsR0FBRyxRQUFRLEdBQUcsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUNyRCxVQUFNLE9BQU87QUFDcUIsWUFBTSxDQUFDLElBQUksU0FBSSxhQUFhLEFBQUUsQ0FBQzs7QUFFakUsVUFBTSxF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LHNCQUFRLEVBQUUsUUFBUSxBQUFDLEdBQUcsR0FBQSxDQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FDekMsQ0FDRjs7Ozs7QUFHRCxlQUFXLEVBQUEscUJBQUUsS0FBSyxFQUFHO0FBQ25CLFVBQUksQ0FBQyxNQUFNLENBQUUsS0FBSyxDQUFFLENBQUMsQ0FDdEI7Ozs7QUFHRCxVQUFNLEVBQUEsZ0JBQUUsS0FBSyxFQUFHO0FBQ04sa0JBQVksR0FBSyxJQUFJLENBQUMsS0FBSyxDQUEzQixZQUFZO0FBQ3BCLGFBQU8sWUFBWSxJQUFJLFlBQVksQ0FBRSxLQUFLLENBQUUsQ0FBQyxDQUM5Qzs7OztBQUdELHlCQUFxQixFQUFBLCtCQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUc7QUFDNUMsYUFBTyxDQUFDLDhCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFO0FBQ3RDLE9BQUMsOEJBQWMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUMvQyxFQUVGLENBQUMsQ0FBQzs7Ozs7O0FBR1ksUUFBTSIsImZpbGUiOiJ2ZXJ0ZXguanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IGRyYWdkcm9wIGZyb20gJy4uL3V0aWwvZHJhZ2Ryb3AnO1xuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlsL3NoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IGNvdW50IGZyb20gJy4uL3V0aWwvbWV0cmljcyc7XG5cbmltcG9ydCB7IENyZWF0ZUNoZWNrcG9pbnQgfSBmcm9tICcuLi9mbHV4L2hpc3RvcnkvaGlzdG9yeS1hY3Rpb25zJztcbmltcG9ydCB7IElOLCBPVVQgfSBmcm9tICcuLi9mbHV4L2dyYXBoL2dyYXBoLW1vZGVsJztcbmltcG9ydCB7XG4gIENvb3JkcywgRGltZW5zaW9ucywgVmVydGV4TWVhc3VyZW1lbnRzXG59IGZyb20gJy4uL2ZsdXgvbGF5b3V0L2xheW91dC1tb2RlbCc7XG5pbXBvcnQgbGF5b3V0QWN0aW9ucyBmcm9tICcuLi9mbHV4L2xheW91dC9sYXlvdXQtYWN0aW9ucyc7XG5pbXBvcnQge1xuICBDbGVhclNlbGVjdGlvbiwgU2VsZWN0VmVydGV4LCBEZXNlbGVjdFZlcnRleCwgTW92ZVNlbGVjdGlvblxufSBmcm9tICcuLi9mbHV4L3NlbGVjdGlvbi9zZWxlY3Rpb24tYWN0aW9ucyc7XG5cbmltcG9ydCBQb3J0IGZyb20gJy4vcG9ydCc7XG5cblxuY29uc3Qge1xuICBNZWFzdXJlVmVydGV4LCBNZWFzdXJlUG9ydCwgTW92ZVZlcnRleFxufSA9IGxheW91dEFjdGlvbnM7XG5cbmNvbnN0IFZlcnRleCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgeyB2ZXJ0ZXgsIHNlbGVjdGVkLCBsYXlvdXQsIG1lYXN1cmVtZW50cywgZXZlbnRIYW5kbGVyLCBzZXR0aW5ncyB9ID0gc2VsZi5wcm9wcztcbiAgICBjb3VudCh7IHdoYXQ6IFZlcnRleC5kaXNwbGF5TmFtZSB9KTtcbiAgICBjb25zdCB7IHBvcnRzLCBsYWJlbCB9ID0gdmVydGV4O1xuXG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICB2aXNpYmlsaXR5OiBsYXlvdXQgPyBudWxsIDogJ2hpZGRlbicsXG4gICAgICBsZWZ0OiBsYXlvdXQgJiYgbGF5b3V0LmxlZnQsXG4gICAgICB0b3A6IGxheW91dCAmJiBsYXlvdXQudG9wLFxuICAgICAgd2lkdGg6IG1lYXN1cmVtZW50cyAmJiBtZWFzdXJlbWVudHMuZGltZW5zaW9ucy53aWR0aCxcbiAgICAgIGhlaWdodDogbWVhc3VyZW1lbnRzICYmIG1lYXN1cmVtZW50cy5kaW1lbnNpb25zLmhlaWdodFxuICAgIH07XG5cbiAgICBjb25zdCBzZWxlY3RlZENsYXNzID0gc2VsZWN0ZWQgPyAnbmJlLXNlbGVjdGVkJyA6ICcnO1xuICAgIGNvbnN0IGNsYXNzZXMgPVxuICAgICAgYG5iZS12ZXJ0ZXggbmJlLW5vZGUgbmJlLWtpbmQtJHt2ZXJ0ZXgua2luZH0gJHtzZWxlY3RlZENsYXNzfWA7XG5cbiAgICBjb25zdCBkZCA9ICgpID0+IGRyYWdkcm9wKHtcbiAgICAgIG9uU3RhcnQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5idWJibGUoIENyZWF0ZUNoZWNrcG9pbnQoeyBiZWZvcmU6ICdNb3ZlIFZlcnRleCcgfSkgKTtcbiAgICAgIH0sXG4gICAgICBvbk1vdmU6ICh7IGRyYWdQYXlsb2FkLCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgaWYoIHNlbGVjdGVkICkge1xuICAgICAgICAgIGV2ZW50SGFuZGxlciggTW92ZVNlbGVjdGlvbih7XG4gICAgICAgICAgICByZWZlcmVuY2U6IGRyYWdQYXlsb2FkLFxuICAgICAgICAgICAgb2Zmc2V0OiBDb29yZHMoeyBsZWZ0OiBkcmFnWCwgdG9wOiBkcmFnWSB9KVxuICAgICAgICAgIH0pICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IGRyYWdQYXlsb2FkLmNvb3JkcztcbiAgICAgICAgICBldmVudEhhbmRsZXIoIE1vdmVWZXJ0ZXgoe1xuICAgICAgICAgICAgdmVydGV4OiB2ZXJ0ZXgsXG4gICAgICAgICAgICB0bzogQ29vcmRzKHsgbGVmdDogbGVmdCArIGRyYWdYLCB0b3A6IHRvcCArIGRyYWdZIH0pXG4gICAgICAgICAgfSkgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6ICggZXYgKSA9PiB7XG4gICAgICAgIGlmKCBldi5zaGlmdEtleSApIHtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggKHNlbGVjdGVkID8gRGVzZWxlY3RWZXJ0ZXggOiBTZWxlY3RWZXJ0ZXgpKHsgdmVydGV4IH0pICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIENsZWFyU2VsZWN0aW9uKCkgKTtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggU2VsZWN0VmVydGV4KHsgdmVydGV4IH0pICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0RHJhZyA9ICggZXYgKSA9PiBkZCgpLnN0YXJ0KCBldiwgeyBjb29yZHM6IGxheW91dCwgaWQ6IHt9IH0gKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc2VzfSByZWY9XCJ2ZXJ0ZXhcIlxuICAgICAgICAgICBvbk1vdXNlRG93bj17c3RhcnREcmFnfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtdmVydGV4LWhlYWRlclwiPntsYWJlbH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtcG9ydC1ncm91cFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLXBvcnRzIG5iZS1pbmJvdW5kXCI+XG4gICAgICAgICAgICB7cmVuZGVyUG9ydHMoIElOICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtcG9ydHMgbmJlLW91dGJvdW5kXCI+XG4gICAgICAgICAgICB7cmVuZGVyUG9ydHMoIE9VVCApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBmdW5jdGlvbiByZW5kZXJQb3J0cyggZGlyZWN0aW9uICkge1xuICAgICAgcmV0dXJuIHBvcnRzWyBkaXJlY3Rpb24gXS5tYXAoIHBvcnQgPT5cbiAgICAgICAgPFBvcnQga2V5PXtwb3J0LmlkfVxuICAgICAgICAgICAgICBwb3J0PXtwb3J0fVxuICAgICAgICAgICAgICB2ZXJ0ZXg9e3ZlcnRleH1cbiAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyPXtzZWxmLmhhbmRsZUV2ZW50fVxuICAgICAgICAgICAgICBzZXR0aW5ncz17c2V0dGluZ3N9IC8+ICkudG9KUygpO1xuICAgIH1cbiAgfSxcblxuXG4gIGhhbmRsZUV2ZW50KCBldmVudCApIHtcbiAgICB0aGlzLmJ1YmJsZSggZXZlbnQgKTtcbiAgfSxcblxuXG4gIGJ1YmJsZSggZXZlbnQgKSB7XG4gICAgY29uc3QgeyBldmVudEhhbmRsZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlciAmJiBldmVudEhhbmRsZXIoIGV2ZW50ICk7XG4gIH0sXG5cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcywgbmV4dFN0YXRlICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0U3RhdGUsIHRoaXMuc3RhdGUgKVxuICAgICAgICB8fCAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuXG5leHBvcnQgZGVmYXVsdCBWZXJ0ZXg7XG4iXX0=