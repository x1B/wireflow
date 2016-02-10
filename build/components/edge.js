define(['exports', 'module', 'react', '../util/dragdrop', '../util/shallow-equal', '../util/metrics', '../flux/history/history-actions', '../flux/layout/layout-model', '../flux/layout/layout-actions', '../flux/selection/selection-actions'], function (exports, module, _react, _utilDragdrop, _utilShallowEqual, _utilMetrics, _fluxHistoryHistoryActions, _fluxLayoutLayoutModel, _fluxLayoutLayoutActions, _fluxSelectionSelectionActions) {'use strict';var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _count = _interopRequireDefault(_utilMetrics);















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

      return { $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { children: [

          _react.createElement('div', { className: 'nbe-edge-icon', 
            ref: 'icon', 
            onMouseDown: startDrag, 
            'data-nbe-connectable': true, 
            'data-nbe-edge': id, 
            'data-nbe-type': type }), { $$typeof: _typeofReactElement, type: 'div', key: null, ref: null, props: { children: 
              label || id, className: 'nbe-edge-label' }, _owner: null }], style: style, className: className }, _owner: null };}, 




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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VkZ2UuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsTUFBTSxJQUFJLEdBQUcsT0FBTSxXQUFXLENBQUM7O0FBRTdCLFVBQU0sRUFBQSxrQkFBRztBQUM0QixVQUFJLENBQUMsS0FBSyxLQUFyQyxJQUFJLFVBQUosSUFBSSxLQUFFLFFBQVEsVUFBUixRQUFRLEtBQUUsTUFBTSxVQUFOLE1BQU07QUFDdEIsUUFBRSxHQUFrQixJQUFJLENBQXhCLEVBQUUsS0FBRSxJQUFJLEdBQVksSUFBSSxDQUFwQixJQUFJLEtBQUUsS0FBSyxHQUFLLElBQUksQ0FBZCxLQUFLO0FBQ3ZCLDZCQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOztBQUVsQyxVQUFNLEtBQUssR0FBRztBQUNaLGtCQUFVLEVBQUUsTUFBTSxHQUFHLElBQUksR0FBRyxRQUFRO0FBQ3BDLGlCQUFTLEVBQUUsTUFBTSxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssRUFDOUUsQ0FBQzs7O0FBRUYsVUFBTSxhQUFhLEdBQUcsUUFBUSxHQUFHLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDckQsVUFBTSxTQUFTLG1DQUFpQyxJQUFJLFNBQUksYUFBYSxBQUFFLENBQUM7O0FBRXhFLFVBQU0sRUFBRSxHQUFHLFNBQUwsRUFBRSxXQUFTLG1CQUFTO0FBQ3hCLGlCQUFPLEVBQUUsbUJBQU07QUFDYixrQkFBSyxNQUFNLENBQUUsK0JBM0JaLGdCQUFnQixFQTJCYSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFFLENBQUM7QUFDekQsbUJBQU8sSUFBSSxDQUFDLENBQ2I7O0FBQ0QsZ0JBQU0sRUFBRSxnQkFBQyxJQUF1QyxFQUFLLEtBQTFDLFdBQVcsR0FBYixJQUF1QyxDQUFyQyxXQUFXLEtBQUUs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QUMsWUFBWSxFQUNsQyxDQUFDLEVBQ0gsQ0FBQyxFQUNILENBQUMsQ0FBRSxDQUFDLENBQ047Ozs7OztBQUVELHlCQUFxQixFQUFBLCtCQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUc7QUFDNUMsYUFBTyxDQUFDLHVCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FDL0MsRUFFRixDQUFDLENBQUM7Ozs7O0FBRVksTUFBSSIsImZpbGUiOiJlZGdlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0ICogYXMgZHJhZ2Ryb3AgZnJvbSAnLi4vdXRpbC9kcmFnZHJvcCc7XG5pbXBvcnQgKiBhcyBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbC9zaGFsbG93LWVxdWFsJztcbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuXG5pbXBvcnQgeyBDcmVhdGVDaGVja3BvaW50IH0gZnJvbSAnLi4vZmx1eC9oaXN0b3J5L2hpc3RvcnktYWN0aW9ucyc7XG5pbXBvcnQge1xuICBDb29yZHMsIERpbWVuc2lvbnMsIEVkZ2VNZWFzdXJlbWVudHNcbn0gZnJvbSAnLi4vZmx1eC9sYXlvdXQvbGF5b3V0LW1vZGVsJztcbmltcG9ydCB7IE1lYXN1cmVFZGdlLCBNb3ZlRWRnZSB9IGZyb20gJy4uL2ZsdXgvbGF5b3V0L2xheW91dC1hY3Rpb25zJztcbmltcG9ydCB7XG4gIE1vdmVTZWxlY3Rpb24sIFNlbGVjdEVkZ2UsIERlc2VsZWN0RWRnZSwgQ2xlYXJTZWxlY3Rpb25cbn0gZnJvbSAnLi4vZmx1eC9zZWxlY3Rpb24vc2VsZWN0aW9uLWFjdGlvbnMnO1xuXG5cbmNvbnN0IEVkZ2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZWRnZSwgc2VsZWN0ZWQsIGxheW91dCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGlkLCB0eXBlLCBsYWJlbCB9ID0gZWRnZTtcbiAgICBjb3VudCh7IHdoYXQ6IEVkZ2UuZGlzcGxheU5hbWUgfSk7XG5cbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIHZpc2liaWxpdHk6IGxheW91dCA/IG51bGwgOiAnaGlkZGVuJyxcbiAgICAgIHRyYW5zZm9ybTogbGF5b3V0ICYmICd0cmFuc2xhdGUoJyArIGxheW91dC5sZWZ0ICsgJ3B4LCAnICsgbGF5b3V0LnRvcCArICdweCknXG4gICAgfTtcblxuICAgIGNvbnN0IHNlbGVjdGVkQ2xhc3MgPSBzZWxlY3RlZCA/ICduYmUtc2VsZWN0ZWQnIDogJyc7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gYG5iZS1ub2RlIG5iZS1lZGdlIG5iZS10eXBlLSR7dHlwZX0gJHtzZWxlY3RlZENsYXNzfWA7XG5cbiAgICBjb25zdCBkZCA9ICgpID0+IGRyYWdkcm9wKHtcbiAgICAgIG9uU3RhcnQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5idWJibGUoIENyZWF0ZUNoZWNrcG9pbnQoeyBiZWZvcmU6ICdNb3ZlIEVkZ2UnIH0pICk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIG9uTW92ZTogKHsgZHJhZ1BheWxvYWQsIGRyYWdYLCBkcmFnWSwgZHJhZ05vZGUgfSkgPT4ge1xuICAgICAgICBpZiggc2VsZWN0ZWQgKSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIE1vdmVTZWxlY3Rpb24oe1xuICAgICAgICAgICAgcmVmZXJlbmNlOiBkcmFnUGF5bG9hZCxcbiAgICAgICAgICAgIG9mZnNldDogQ29vcmRzKHsgbGVmdDogZHJhZ1gsIHRvcDogZHJhZ1kgfSlcbiAgICAgICAgICB9KSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBkcmFnUGF5bG9hZC5jb29yZHM7XG4gICAgICAgICAgdGhpcy5idWJibGUoIE1vdmVFZGdlKHtcbiAgICAgICAgICAgIGVkZ2U6IGVkZ2UsXG4gICAgICAgICAgICB0bzogQ29vcmRzKHsgbGVmdDogbGVmdCArIGRyYWdYLCB0b3A6IHRvcCArIGRyYWdZIH0pXG4gICAgICAgICAgfSkgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6ICggZXYgKSA9PiB7XG4gICAgICAgIGlmKCBldi5zaGlmdEtleSApIHtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggKHNlbGVjdGVkID8gRGVzZWxlY3RFZGdlIDogU2VsZWN0RWRnZSkoeyBlZGdlIH0pICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIENsZWFyU2VsZWN0aW9uKCkgKTtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggU2VsZWN0RWRnZSh7IGVkZ2UgfSkgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3RhcnREcmFnID0gKCBldiApID0+IGRkKCkuc3RhcnQoIGV2LCB7IGNvb3JkczogbGF5b3V0LCBpZDoge30gfSApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLWVkZ2UtaWNvblwiXG4gICAgICAgICAgICAgcmVmPVwiaWNvblwiXG4gICAgICAgICAgICAgb25Nb3VzZURvd249e3N0YXJ0RHJhZ31cbiAgICAgICAgICAgICBkYXRhLW5iZS1jb25uZWN0YWJsZT17dHJ1ZX1cbiAgICAgICAgICAgICBkYXRhLW5iZS1lZGdlPXtpZH1cbiAgICAgICAgICAgICBkYXRhLW5iZS10eXBlPXt0eXBlfSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1lZGdlLWxhYmVsXCI+e2xhYmVsIHx8IGlkfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuICBidWJibGUoIGV2ZW50ICkge1xuICAgIGNvbnN0IHsgZXZlbnRIYW5kbGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBldmVudEhhbmRsZXIgJiYgZXZlbnRIYW5kbGVyKCBldmVudCApO1xuICB9LFxuXG4gIG1lYXN1cmUoKSB7XG4gICAgY29uc3QgZG9tSWNvbiA9IFJlYWN0LmZpbmRET01Ob2RlKCB0aGlzLnJlZnMuaWNvbiApO1xuICAgIGNvbnN0IGRvbUNvbnRhaW5lciA9IGRvbUljb24ucGFyZW50Tm9kZTtcbiAgICBjb25zdCB7IGVkZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5idWJibGUoIE1lYXN1cmVFZGdlKHtcbiAgICAgIGVkZ2U6IGVkZ2UsXG4gICAgICBtZWFzdXJlbWVudHM6IEVkZ2VNZWFzdXJlbWVudHMoe1xuICAgICAgICBkaW1lbnNpb25zOiBEaW1lbnNpb25zKHtcbiAgICAgICAgICB3aWR0aDogZG9tQ29udGFpbmVyLm9mZnNldFdpZHRoLFxuICAgICAgICAgIGhlaWdodDogZG9tQ29udGFpbmVyLm9mZnNldEhlaWdodFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KSApO1xuICB9LFxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzLCBuZXh0U3RhdGUgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBFZGdlO1xuIl19