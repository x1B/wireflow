define(['exports', 'module', 'react', '../util/dragdrop', '../util/shallow-equal', '../util/metrics', '../flux/history/history-actions', '../flux/layout/layout-model', '../flux/layout/layout-actions', '../flux/selection/selection-actions'], function (exports, module, _react, _utilDragdrop, _utilShallowEqual, _utilMetrics, _fluxHistoryHistoryActions, _fluxLayoutLayoutModel, _fluxLayoutLayoutActions, _fluxSelectionSelectionActions) {'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _count = _interopRequireDefault(_utilMetrics);















  var Edge = _react.createClass({ displayName: 'Edge', 

    render: function render() {var _this = this;var _props = 
      this.props;var edge = _props.edge;var selected = _props.selected;var layout = _props.layout;var 
      id = edge.id;var type = edge.type;var label = edge.label;
      (0, _count['default'])({ what: Edge.displayName });

      var style = { 
        visibility: layout ? null : 'hidden', 
        transform: layout && 'translate(' + layout.left + 'px, ' + layout.top + 'px)' };


      var selectedClass = selected ? 'nbe-selected' : '';
      var className = 'nbe-node nbe-edge nbe-type-' + type + ' ' + selectedClass;

      var dd = function dd() {return (0, _utilDragdrop)({ 
          onStart: function onStart() {
            _this.bubble((0, _fluxHistoryHistoryActions.CreateCheckpoint)({ before: 'Move Edge' }));
            return true;}, 

          onMove: function onMove(_ref) {var dragPayload = _ref.dragPayload;var dragX = _ref.dragX;var dragY = _ref.dragY;var dragNode = _ref.dragNode;
            if (selected) {
              _this.bubble((0, _fluxSelectionSelectionActions.MoveSelection)({ 
                reference: dragPayload, 
                offset: (0, _fluxLayoutLayoutModel.Coords)({ left: dragX, top: dragY }) }));} else 


            {var _dragPayload$coords = 
              dragPayload.coords;var left = _dragPayload$coords.left;var _top = _dragPayload$coords.top;
              _this.bubble((0, _fluxLayoutLayoutActions.MoveEdge)({ 
                edge: edge, 
                to: (0, _fluxLayoutLayoutModel.Coords)({ left: left + dragX, top: _top + dragY }) }));}}, 



          onClick: function onClick(ev) {
            if (ev.shiftKey) {
              _this.bubble((selected ? _fluxSelectionSelectionActions.DeselectEdge : _fluxSelectionSelectionActions.SelectEdge)({ edge: edge }));} else 

            {
              _this.bubble((0, _fluxSelectionSelectionActions.ClearSelection)());
              _this.bubble((0, _fluxSelectionSelectionActions.SelectEdge)({ edge: edge }));}} });};




      var startDrag = function startDrag(ev) {return dd().start(ev, { coords: layout, id: {} });};

      return (
        _react.createElement('div', { style: style, className: className }, 
        _react.createElement('div', { className: 'nbe-edge-icon', 
          ref: 'icon', 
          onMouseDown: startDrag, 
          'data-nbe-connectable': true, 
          'data-nbe-edge': id, 
          'data-nbe-type': type }), 
        _react.createElement('div', { className: 'nbe-edge-label' }, label || id)));}, 




    bubble: function bubble(event) {var 
      eventHandler = this.props.eventHandler;
      return eventHandler && eventHandler(event);}, 


    measure: function measure() {
      var domIcon = _react.findDOMNode(this.refs.icon);
      var domContainer = domIcon.parentNode;var 
      edge = this.props.edge;
      this.bubble((0, _fluxLayoutLayoutActions.MeasureEdge)({ 
        edge: edge, 
        measurements: (0, _fluxLayoutLayoutModel.EdgeMeasurements)({ 
          dimensions: (0, _fluxLayoutLayoutModel.Dimensions)({ 
            width: domContainer.offsetWidth, 
            height: domContainer.offsetHeight }) }) }));}, 





    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utilShallowEqual)(nextProps, this.props);} });module.exports = 




  Edge;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VkZ2UuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsTUFBTSxJQUFJLEdBQUcsT0FBTSxXQUFXLENBQUM7O0FBRTdCLFVBQU0sRUFBQSxrQkFBRztBQUM0QixVQUFJLENBQUMsS0FBSyxLQUFyQyxJQUFJLFVBQUosSUFBSSxLQUFFLFFBQVEsVUFBUixRQUFRLEtBQUUsTUFBTSxVQUFOLE1BQU07QUFDdEIsUUFBRSxHQUFrQixJQUFJLENBQXhCLEVBQUUsS0FBRSxJQUFJLEdBQVksSUFBSSxDQUFwQixJQUFJLEtBQUUsS0FBSyxHQUFLLElBQUksQ0FBZCxLQUFLO0FBQ3ZCLDZCQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOztBQUVsQyxVQUFNLEtBQUssR0FBRztBQUNaLGtCQUFVLEVBQUUsTUFBTSxHQUFHLElBQUksR0FBRyxRQUFRO0FBQ3BDLGlCQUFTLEVBQUUsTUFBTSxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssRUFDOUUsQ0FBQzs7O0FBRUYsVUFBTSxhQUFhLEdBQUcsUUFBUSxHQUFHLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDckQsVUFBTSxTQUFTLG1DQUFpQyxJQUFJLFNBQUksYUFBYSxBQUFFLENBQUM7O0FBRXhFLFVBQU0sRUFBRSxHQUFHLFNBQUwsRUFBRSxXQUFTLG1CQUFTO0FBQ3hCLGlCQUFPLEVBQUUsbUJBQU07QUFDYixrQkFBSyxNQUFNLENBQUUsK0JBM0JaLGdCQUFnQixFQTJCYSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFFLENBQUM7QUFDekQsbUJBQU8sSUFBSSxDQUFDLENBQ2I7O0FBQ0QsZ0JBQU0sRUFBRSxnQkFBQyxJQUF1QyxFQUFLLEtBQTFDLFdBQVcsR0FBYixJQUF1QyxDQUFyQyxXQUFXLEtBQUUsS0FBSyxHQUFwQixJQUF1QyxDQUF4QixLQUFLLEtBQUUsS0FBSyxHQUEzQixJQUF1QyxDQUFqQixLQUFLLEtBQUUsUUFBUSxHQUFyQyxJQUF1QyxDQUFWLFFBQVE7QUFDNUMsZ0JBQUksUUFBUSxFQUFHO0FBQ2Isb0JBQUssTUFBTSxDQUFFLG1DQTFCckIsYUFBYSxFQTBCc0I7QUFDekIseUJBQVMsRUFBRSxXQUFXO0FBQ3RCLHNCQUFNLEVBQUUsMkJBaENsQixNQUFNLEVBZ0NtQixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQzVDLENBQUMsQ0FBRSxDQUFDLENBQ047OztBQUNJO0FBQ21CLHlCQUFXLENBQUMsTUFBTSxLQUFoQyxJQUFJLHVCQUFKLElBQUksS0FBRSxJQUFHLHVCQUFILEdBQUc7QUFDakIsb0JBQUssTUFBTSxDQUFFLDZCQW5DRCxRQUFRLEVBbUNFO0FBQ3BCLG9CQUFJLEVBQUUsSUFBSTtBQUNWLGtCQUFFLEVBQUUsMkJBdkNkLE1BQU0sRUF1Q2UsRUFBRSxJQUFJLEVBQUUsSUFBSSxHQUFHLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBRyxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQ3JELENBQUMsQ0FBRSxDQUFDLENBQ04sQ0FDRjs7OztBQUNELGlCQUFPLEVBQUUsaUJBQUUsRUFBRSxFQUFNO0FBQ2pCLGdCQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUc7QUFDaEIsb0JBQUssTUFBTSxDQUFFLENBQUMsUUFBUSxrQ0F6Q0gsWUFBWSxrQ0FBeEIsVUFBVSxDQXlDaUMsQ0FBRSxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FDakU7O0FBQ0k7QUFDSCxvQkFBSyxNQUFNLENBQUUsbUNBNUNvQixjQUFjLEdBNENsQixDQUFFLENBQUM7QUFDaEMsb0JBQUssTUFBTSxDQUFFLG1DQTdDTixVQUFVLEVBNkNPLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUNyQyxDQUNGLEVBQ0YsQ0FBQyxFQUFBLENBQUM7Ozs7O0FBRUgsVUFBTSxTQUFTLEdBQUcsU0FBWixTQUFTLENBQUssRUFBRSxVQUFNLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBRSxFQUFBLENBQUM7O0FBRXpFO0FBQ0Usc0NBQUssS0FBSyxFQUFFLEtBQUssQUFBQyxFQUFDLFNBQVMsRUFBRSxTQUFTLEFBQUM7QUFDdEMsc0NBQUssU0FBUyxFQUFDLGVBQWU7QUFDekIsYUFBRyxFQUFDLE1BQU07QUFDVixxQkFBVyxFQUFFLFNBQVMsQUFBQztBQUN2QixrQ0FBc0IsSUFBSSxBQUFDO0FBQzNCLDJCQUFlLEVBQUUsQUFBQztBQUNsQiwyQkFBZSxJQUFJLEFBQUMsR0FBRztBQUM1QixzQ0FBSyxTQUFTLEVBQUMsZ0JBQWdCLElBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBTyxDQUMvQyxFQUNOLENBQ0g7Ozs7O0FBRUQsVUFBTSxFQUFBLGdCQUFFLEtBQUssRUFBRztBQUNOLGtCQUFZLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBM0IsWUFBWTtBQUNwQixhQUFPLFlBQVksSUFBSSxZQUFZLENBQUUsS0FBSyxDQUFFLENBQUMsQ0FDOUM7OztBQUVELFdBQU8sRUFBQSxtQkFBRztBQUNSLFVBQU0sT0FBTyxHQUFHLE9BQU0sV0FBVyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUM7QUFDcEQsVUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNoQyxVQUFJLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBbkIsSUFBSTtBQUNaLFVBQUksQ0FBQyxNQUFNLENBQUUsNkJBNUVSLFdBQVcsRUE0RVM7QUFDdkIsWUFBSSxFQUFFLElBQUk7QUFDVixvQkFBWSxFQUFFLDJCQWhGRSxnQkFBZ0IsRUFnRkQ7QUFDN0Isb0JBQVUsRUFBRSwyQkFqRlYsVUFBVSxFQWlGVztBQUNyQixpQkFBSyxFQUFFLFlBQVksQ0FBQyxXQUFXO0FBQy9CLGtCQUFNLEVBQUUsWUFBWSxDQUFDLFlBQVksRUFDbEMsQ0FBQyxFQUNILENBQUMsRUFDSCxDQUFDLENBQUUsQ0FBQyxDQUNOOzs7Ozs7QUFFRCx5QkFBcUIsRUFBQSwrQkFBRSxTQUFTLEVBQUUsU0FBUyxFQUFHO0FBQzVDLGFBQU8sQ0FBQyx1QkFBYyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDLENBQy9DLEVBRUYsQ0FBQyxDQUFDOzs7OztBQUVZLE1BQUkiLCJmaWxlIjoiZWRnZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCAqIGFzIGRyYWdkcm9wIGZyb20gJy4uL3V0aWwvZHJhZ2Ryb3AnO1xuaW1wb3J0ICogYXMgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgY291bnQgZnJvbSAnLi4vdXRpbC9tZXRyaWNzJztcblxuaW1wb3J0IHsgQ3JlYXRlQ2hlY2twb2ludCB9IGZyb20gJy4uL2ZsdXgvaGlzdG9yeS9oaXN0b3J5LWFjdGlvbnMnO1xuaW1wb3J0IHtcbiAgQ29vcmRzLCBEaW1lbnNpb25zLCBFZGdlTWVhc3VyZW1lbnRzXG59IGZyb20gJy4uL2ZsdXgvbGF5b3V0L2xheW91dC1tb2RlbCc7XG5pbXBvcnQgeyBNZWFzdXJlRWRnZSwgTW92ZUVkZ2UgfSBmcm9tICcuLi9mbHV4L2xheW91dC9sYXlvdXQtYWN0aW9ucyc7XG5pbXBvcnQge1xuICBNb3ZlU2VsZWN0aW9uLCBTZWxlY3RFZGdlLCBEZXNlbGVjdEVkZ2UsIENsZWFyU2VsZWN0aW9uXG59IGZyb20gJy4uL2ZsdXgvc2VsZWN0aW9uL3NlbGVjdGlvbi1hY3Rpb25zJztcblxuXG5jb25zdCBFZGdlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGVkZ2UsIHNlbGVjdGVkLCBsYXlvdXQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBpZCwgdHlwZSwgbGFiZWwgfSA9IGVkZ2U7XG4gICAgY291bnQoeyB3aGF0OiBFZGdlLmRpc3BsYXlOYW1lIH0pO1xuXG4gICAgY29uc3Qgc3R5bGUgPSB7XG4gICAgICB2aXNpYmlsaXR5OiBsYXlvdXQgPyBudWxsIDogJ2hpZGRlbicsXG4gICAgICB0cmFuc2Zvcm06IGxheW91dCAmJiAndHJhbnNsYXRlKCcgKyBsYXlvdXQubGVmdCArICdweCwgJyArIGxheW91dC50b3AgKyAncHgpJ1xuICAgIH07XG5cbiAgICBjb25zdCBzZWxlY3RlZENsYXNzID0gc2VsZWN0ZWQgPyAnbmJlLXNlbGVjdGVkJyA6ICcnO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGBuYmUtbm9kZSBuYmUtZWRnZSBuYmUtdHlwZS0ke3R5cGV9ICR7c2VsZWN0ZWRDbGFzc31gO1xuXG4gICAgY29uc3QgZGQgPSAoKSA9PiBkcmFnZHJvcCh7XG4gICAgICBvblN0YXJ0OiAoKSA9PiB7XG4gICAgICAgIHRoaXMuYnViYmxlKCBDcmVhdGVDaGVja3BvaW50KHsgYmVmb3JlOiAnTW92ZSBFZGdlJyB9KSApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBvbk1vdmU6ICh7IGRyYWdQYXlsb2FkLCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgaWYoIHNlbGVjdGVkICkge1xuICAgICAgICAgIHRoaXMuYnViYmxlKCBNb3ZlU2VsZWN0aW9uKHtcbiAgICAgICAgICAgIHJlZmVyZW5jZTogZHJhZ1BheWxvYWQsXG4gICAgICAgICAgICBvZmZzZXQ6IENvb3Jkcyh7IGxlZnQ6IGRyYWdYLCB0b3A6IGRyYWdZIH0pXG4gICAgICAgICAgfSkgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gZHJhZ1BheWxvYWQuY29vcmRzO1xuICAgICAgICAgIHRoaXMuYnViYmxlKCBNb3ZlRWRnZSh7XG4gICAgICAgICAgICBlZGdlOiBlZGdlLFxuICAgICAgICAgICAgdG86IENvb3Jkcyh7IGxlZnQ6IGxlZnQgKyBkcmFnWCwgdG9wOiB0b3AgKyBkcmFnWSB9KVxuICAgICAgICAgIH0pICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvbkNsaWNrOiAoIGV2ICkgPT4ge1xuICAgICAgICBpZiggZXYuc2hpZnRLZXkgKSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIChzZWxlY3RlZCA/IERlc2VsZWN0RWRnZSA6IFNlbGVjdEVkZ2UpKHsgZWRnZSB9KSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuYnViYmxlKCBDbGVhclNlbGVjdGlvbigpICk7XG4gICAgICAgICAgdGhpcy5idWJibGUoIFNlbGVjdEVkZ2UoeyBlZGdlIH0pICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0RHJhZyA9ICggZXYgKSA9PiBkZCgpLnN0YXJ0KCBldiwgeyBjb29yZHM6IGxheW91dCwgaWQ6IHt9IH0gKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1lZGdlLWljb25cIlxuICAgICAgICAgICAgIHJlZj1cImljb25cIlxuICAgICAgICAgICAgIG9uTW91c2VEb3duPXtzdGFydERyYWd9XG4gICAgICAgICAgICAgZGF0YS1uYmUtY29ubmVjdGFibGU9e3RydWV9XG4gICAgICAgICAgICAgZGF0YS1uYmUtZWRnZT17aWR9XG4gICAgICAgICAgICAgZGF0YS1uYmUtdHlwZT17dHlwZX0gLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtZWRnZS1sYWJlbFwiPntsYWJlbCB8fCBpZH08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cbiAgYnViYmxlKCBldmVudCApIHtcbiAgICBjb25zdCB7IGV2ZW50SGFuZGxlciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyICYmIGV2ZW50SGFuZGxlciggZXZlbnQgKTtcbiAgfSxcblxuICBtZWFzdXJlKCkge1xuICAgIGNvbnN0IGRvbUljb24gPSBSZWFjdC5maW5kRE9NTm9kZSggdGhpcy5yZWZzLmljb24gKTtcbiAgICBjb25zdCBkb21Db250YWluZXIgPSBkb21JY29uLnBhcmVudE5vZGU7XG4gICAgY29uc3QgeyBlZGdlIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuYnViYmxlKCBNZWFzdXJlRWRnZSh7XG4gICAgICBlZGdlOiBlZGdlLFxuICAgICAgbWVhc3VyZW1lbnRzOiBFZGdlTWVhc3VyZW1lbnRzKHtcbiAgICAgICAgZGltZW5zaW9uczogRGltZW5zaW9ucyh7XG4gICAgICAgICAgd2lkdGg6IGRvbUNvbnRhaW5lci5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGRvbUNvbnRhaW5lci5vZmZzZXRIZWlnaHRcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSkgKTtcbiAgfSxcblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcywgbmV4dFN0YXRlICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgRWRnZTtcbiJdfQ==