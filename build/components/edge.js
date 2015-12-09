define(['exports', 'module', 'react', '../util/dragdrop', '../util/shallow-equal', '../util/metrics', '../flux/history/history-actions', '../flux/layout/layout-model', '../flux/layout/layout-actions', '../flux/selection/selection-actions'], function (exports, module, _react, _utilDragdrop, _utilShallowEqual, _utilMetrics, _fluxHistoryHistoryActions, _fluxLayoutLayoutModel, _fluxLayoutLayoutActions, _fluxSelectionSelectionActions) {'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _count = _interopRequireDefault(_utilMetrics);















  var Edge = _react.createClass({ displayName: 'Edge', 

    render: function render() {var _this = this;var _props = 
      this.props;var edge = _props.edge;var selected = _props.selected;var layout = _props.layout;var 
      id = edge.id;var type = edge.type;var label = edge.label;
      (0, _count['default'])({ what: Edge.displayName });

      var style = { 
        visibility: layout ? null : 'hidden', 
        left: layout ? layout.left : 50, 
        top: layout ? layout.top : 50 };


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VkZ2UuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsTUFBTSxJQUFJLEdBQUcsT0FBTSxXQUFXLENBQUM7O0FBRTdCLFVBQU0sRUFBQSxrQkFBRztBQUM0QixVQUFJLENBQUMsS0FBSyxLQUFyQyxJQUFJLFVBQUosSUFBSSxLQUFFLFFBQVEsVUFBUixRQUFRLEtBQUUsTUFBTSxVQUFOLE1BQU07QUFDdEIsUUFBRSxHQUFrQixJQUFJLENBQXhCLEVBQUUsS0FBRSxJQUFJLEdBQVksSUFBSSxDQUFwQixJQUFJLEtBQUUsS0FBSyxHQUFLLElBQUksQ0FBZCxLQUFLO0FBQ3ZCLDZCQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOztBQUVsQyxVQUFNLEtBQUssR0FBRztBQUNaLGtCQUFVLEVBQUUsTUFBTSxHQUFHLElBQUksR0FBRyxRQUFRO0FBQ3BDLFlBQUksRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFO0FBQy9CLFdBQUcsRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQzlCLENBQUM7OztBQUVGLFVBQU0sYUFBYSxHQUFHLFFBQVEsR0FBRyxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3JELFVBQU0sU0FBUyxtQ0FBaUMsSUFBSSxTQUFJLGFBQWEsQUFBRSxDQUFDOztBQUV4RSxVQUFNLEVBQUUsR0FBRyxTQUFMLEVBQUUsV0FBUyxtQkFBUztBQUN4QixpQkFBTyxFQUFFLG1CQUFNO0FBQ2Isa0JBQUssTUFBTSxDQUFFLCtCQTVCWixnQkFBZ0IsRUE0QmEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBRSxDQUFDO0FBQ3pELG1CQUFPLElBQUksQ0FBQyxDQUNiOztBQUNELGdCQUFNLEVBQUUsZ0JBQUMsSUFBdUMsRUFBSyxLQUExQyxXQUFXLEdBQWIsSUFBdUMsQ0FBckMs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QUFZLENBQUMsV0FBVztBQUMvQixrQkFBTSxFQUFFLFlBQVksQ0FBQyxZQUFZLEVBQ2xDLENBQUMsRUFDSCxDQUFDLEVBQ0gsQ0FBQyxDQUFFLENBQUMsQ0FDTjs7Ozs7O0FBRUQseUJBQXFCLEVBQUEsK0JBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRztBQUM1QyxhQUFPLENBQUMsdUJBQWMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUMvQyxFQUVGLENBQUMsQ0FBQzs7Ozs7QUFFWSxNQUFJIiwiZmlsZSI6ImVkZ2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgKiBhcyBkcmFnZHJvcCBmcm9tICcuLi91dGlsL2RyYWdkcm9wJztcbmltcG9ydCAqIGFzIHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlsL3NoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IGNvdW50IGZyb20gJy4uL3V0aWwvbWV0cmljcyc7XG5cbmltcG9ydCB7IENyZWF0ZUNoZWNrcG9pbnQgfSBmcm9tICcuLi9mbHV4L2hpc3RvcnkvaGlzdG9yeS1hY3Rpb25zJztcbmltcG9ydCB7XG4gIENvb3JkcywgRGltZW5zaW9ucywgRWRnZU1lYXN1cmVtZW50c1xufSBmcm9tICcuLi9mbHV4L2xheW91dC9sYXlvdXQtbW9kZWwnO1xuaW1wb3J0IHsgTWVhc3VyZUVkZ2UsIE1vdmVFZGdlIH0gZnJvbSAnLi4vZmx1eC9sYXlvdXQvbGF5b3V0LWFjdGlvbnMnO1xuaW1wb3J0IHtcbiAgTW92ZVNlbGVjdGlvbiwgU2VsZWN0RWRnZSwgRGVzZWxlY3RFZGdlLCBDbGVhclNlbGVjdGlvblxufSBmcm9tICcuLi9mbHV4L3NlbGVjdGlvbi9zZWxlY3Rpb24tYWN0aW9ucyc7XG5cblxuY29uc3QgRWRnZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBlZGdlLCBzZWxlY3RlZCwgbGF5b3V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgaWQsIHR5cGUsIGxhYmVsIH0gPSBlZGdlO1xuICAgIGNvdW50KHsgd2hhdDogRWRnZS5kaXNwbGF5TmFtZSB9KTtcblxuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgdmlzaWJpbGl0eTogbGF5b3V0ID8gbnVsbCA6ICdoaWRkZW4nLFxuICAgICAgbGVmdDogbGF5b3V0ID8gbGF5b3V0LmxlZnQgOiA1MCxcbiAgICAgIHRvcDogbGF5b3V0ID8gbGF5b3V0LnRvcCA6IDUwXG4gICAgfTtcblxuICAgIGNvbnN0IHNlbGVjdGVkQ2xhc3MgPSBzZWxlY3RlZCA/ICduYmUtc2VsZWN0ZWQnIDogJyc7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gYG5iZS1ub2RlIG5iZS1lZGdlIG5iZS10eXBlLSR7dHlwZX0gJHtzZWxlY3RlZENsYXNzfWA7XG5cbiAgICBjb25zdCBkZCA9ICgpID0+IGRyYWdkcm9wKHtcbiAgICAgIG9uU3RhcnQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5idWJibGUoIENyZWF0ZUNoZWNrcG9pbnQoeyBiZWZvcmU6ICdNb3ZlIEVkZ2UnIH0pICk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIG9uTW92ZTogKHsgZHJhZ1BheWxvYWQsIGRyYWdYLCBkcmFnWSwgZHJhZ05vZGUgfSkgPT4ge1xuICAgICAgICBpZiggc2VsZWN0ZWQgKSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIE1vdmVTZWxlY3Rpb24oe1xuICAgICAgICAgICAgcmVmZXJlbmNlOiBkcmFnUGF5bG9hZCxcbiAgICAgICAgICAgIG9mZnNldDogQ29vcmRzKHsgbGVmdDogZHJhZ1gsIHRvcDogZHJhZ1kgfSlcbiAgICAgICAgICB9KSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBkcmFnUGF5bG9hZC5jb29yZHM7XG4gICAgICAgICAgdGhpcy5idWJibGUoIE1vdmVFZGdlKHtcbiAgICAgICAgICAgIGVkZ2U6IGVkZ2UsXG4gICAgICAgICAgICB0bzogQ29vcmRzKHsgbGVmdDogbGVmdCArIGRyYWdYLCB0b3A6IHRvcCArIGRyYWdZIH0pXG4gICAgICAgICAgfSkgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6ICggZXYgKSA9PiB7XG4gICAgICAgIGlmKCBldi5zaGlmdEtleSApIHtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggKHNlbGVjdGVkID8gRGVzZWxlY3RFZGdlIDogU2VsZWN0RWRnZSkoeyBlZGdlIH0pICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIENsZWFyU2VsZWN0aW9uKCkgKTtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggU2VsZWN0RWRnZSh7IGVkZ2UgfSkgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3RhcnREcmFnID0gKCBldiApID0+IGRkKCkuc3RhcnQoIGV2LCB7IGNvb3JkczogbGF5b3V0LCBpZDoge30gfSApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLWVkZ2UtaWNvblwiXG4gICAgICAgICAgICAgcmVmPVwiaWNvblwiXG4gICAgICAgICAgICAgb25Nb3VzZURvd249e3N0YXJ0RHJhZ31cbiAgICAgICAgICAgICBkYXRhLW5iZS1jb25uZWN0YWJsZT17dHJ1ZX1cbiAgICAgICAgICAgICBkYXRhLW5iZS1lZGdlPXtpZH1cbiAgICAgICAgICAgICBkYXRhLW5iZS10eXBlPXt0eXBlfSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1lZGdlLWxhYmVsXCI+e2xhYmVsIHx8IGlkfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuICBidWJibGUoIGV2ZW50ICkge1xuICAgIGNvbnN0IHsgZXZlbnRIYW5kbGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBldmVudEhhbmRsZXIgJiYgZXZlbnRIYW5kbGVyKCBldmVudCApO1xuICB9LFxuXG4gIG1lYXN1cmUoKSB7XG4gICAgY29uc3QgZG9tSWNvbiA9IFJlYWN0LmZpbmRET01Ob2RlKCB0aGlzLnJlZnMuaWNvbiApO1xuICAgIGNvbnN0IGRvbUNvbnRhaW5lciA9IGRvbUljb24ucGFyZW50Tm9kZTtcbiAgICBjb25zdCB7IGVkZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5idWJibGUoIE1lYXN1cmVFZGdlKHtcbiAgICAgIGVkZ2U6IGVkZ2UsXG4gICAgICBtZWFzdXJlbWVudHM6IEVkZ2VNZWFzdXJlbWVudHMoe1xuICAgICAgICBkaW1lbnNpb25zOiBEaW1lbnNpb25zKHtcbiAgICAgICAgICB3aWR0aDogZG9tQ29udGFpbmVyLm9mZnNldFdpZHRoLFxuICAgICAgICAgIGhlaWdodDogZG9tQ29udGFpbmVyLm9mZnNldEhlaWdodFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KSApO1xuICB9LFxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzLCBuZXh0U3RhdGUgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBFZGdlO1xuIl19