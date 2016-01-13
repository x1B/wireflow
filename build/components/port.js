define(['exports', 'module', 'react', '../util/dragdrop', '../util/shallow-equal', '../util/metrics', '../flux/layout/layout-actions', '../flux/layout/layout-model', '../flux/graph/graph-actions', '../flux/history/history-actions', '../flux/graph/graph-model', '../flux/settings/settings-model'], function (exports, module, _react, _utilDragdrop, _utilShallowEqual, _utilMetrics, _fluxLayoutLayoutActions, _fluxLayoutLayoutModel, _fluxGraphGraphActions, _fluxHistoryHistoryActions, _fluxGraphGraphModel, _fluxSettingsSettingsModel) {'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);var _dragdrop = _interopRequireDefault(_utilDragdrop);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _count = _interopRequireDefault(_utilMetrics);var _layoutActions = _interopRequireDefault(_fluxLayoutLayoutActions);var _graphActions = _interopRequireDefault(_fluxGraphGraphActions);var 












  DragPort = _layoutActions['default'].DragPort;var 
  ConnectPort = _graphActions['default'].ConnectPort;var DisconnectPort = _graphActions['default'].DisconnectPort;

  var Port = _React['default'].createClass({ displayName: 'Port', 

    render: function render() {var _props = 
      this.props;var port = _props.port;var vertex = _props.vertex;var eventHandler = _props.eventHandler;var mode = _props.mode;
      (0, _count['default'])({ what: Port.displayName });
      var classes = 'nbe-port nbe-type-' + port.type;

      var dd = function dd() {return (0, _dragdrop['default'])({ 
          onBeforeStart: function onBeforeStart() {return mode === _fluxSettingsSettingsModel.READ_WRITE;}, 
          onMove: function onMove(_ref) {var _ref$dragPayload = _ref.dragPayload;var left = _ref$dragPayload.left;var top = _ref$dragPayload.top;var dragX = _ref.dragX;var dragY = _ref.dragY;var dragNode = _ref.dragNode;
            (0, _count['default'])({ what: '!DragPort' });
            eventHandler(DragPort({ 
              info: (0, _fluxLayoutLayoutModel.PortDragInfo)({ 
                port: port, 
                vertex: vertex, 
                portCoords: (0, _fluxLayoutLayoutModel.Coords)({ left: left, top: top }), 
                mouseCoords: (0, _fluxLayoutLayoutModel.Coords)({ left: left + dragX, top: top + dragY }) }) }));}, 



          getDropResult: function getDropResult(hoverNode) {
            if (hoverNode.nodeName === 'svg') {
              // Background or outside of drop-zone
              return false;}

            var data = hoverNode.dataset;
            var matches = data && 
            data.nbeConnectable && 
            data.nbeType === port.type && 
            data.nbeDirection !== port.direction;
            return matches ? (0, _fluxGraphGraphModel.Connectable)({ 
              edgeId: data.nbeEdge, 
              type: data.nbeType, 
              vertexId: data.nbeVertex, 
              portId: data.nbePort, 
              direction: data.nbeDirection }) : 
            null;}, 

          onDrop: function onDrop(_ref2) {var dropResult = _ref2.dropResult;
            eventHandler((0, _fluxHistoryHistoryActions.CreateCheckpoint)());
            eventHandler(ConnectPort({ 
              from: (0, _fluxGraphGraphModel.Connectable)({ 
                type: port.type, 
                vertexId: vertex.id, 
                portId: port.id, 
                direction: port.direction }), 

              port: port, 
              vertex: vertex, 
              to: dropResult }));}, 


          onEnd: function onEnd() {
            eventHandler(DragPort({ info: null }));} });};



      var startDrag = function startDrag(ev) {
        var p = ev.currentTarget;
        var v = vertexNode(p);
        var left = v.offsetLeft + p.offsetLeft + p.offsetWidth / 2;
        var top = v.offsetTop + p.offsetTop + p.offsetHeight / 2;
        dd().start(ev, { left: left, top: top });
        ev.stopPropagation();};


      return (
        _React['default'].createElement('div', { className: classes, 
          'data-nbe-connectable': true, 
          'data-nbe-type': port.type, 
          'data-nbe-direction': port.direction, 
          'data-nbe-port': port.id, 
          'data-nbe-vertex': vertex.id }, 
        port.direction === _fluxGraphGraphModel.OUT ? port.label : '', 
        _React['default'].createElement('i', { className: 'nbe-port-handle', 
          ref: 'handle', 
          onMouseDown: startDrag, 
          onDoubleClick: disconnect }), 
        port.direction === _fluxGraphGraphModel.IN ? port.label : ''));



      function disconnect() {
        if (mode === _fluxSettingsSettingsModel.READ_WRITE) {
          eventHandler((0, _fluxHistoryHistoryActions.CreateCheckpoint)());
          eventHandler(DisconnectPort({ vertex: vertex, port: port }));}}}, 




    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);} });




  function vertexNode(port) {
    var result = port.parentNode;
    while (result) {
      if (/\bnbe-vertex\b/.test(result.className)) {
        return result;}

      result = result.parentNode;}

    return result;}module.exports = 



  Port;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3BvcnQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFhUSxVQUFRLDZCQUFSLFFBQVE7QUFDUixhQUFXLDRCQUFYLFdBQVcsS0FBRSxjQUFjLDRCQUFkLGNBQWM7O0FBRW5DLE1BQU0sSUFBSSxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7QUFFN0IsVUFBTSxFQUFBLGtCQUFHO0FBQ3NDLFVBQUksQ0FBQyxLQUFLLEtBQS9DLElBQUksVUFBSixJQUFJLEtBQUUsTUFBTSxVQUFOLE1BQU0sS0FBRSxZQUFZLFVBQVosWUFBWSxLQUFFLElBQUksVUFBSixJQUFJO0FBQ3hDLDZCQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLFVBQU0sT0FBTywwQkFBd0IsSUFBSSxDQUFDLElBQUksQUFBRSxDQUFDOztBQUVqRCxVQUFNLEVBQUUsR0FBRyxTQUFMLEVBQUUsV0FBUywwQkFBUztBQUN4Qix1QkFBYSxFQUFFLGlDQUFNLElBQUksZ0NBYnRCLFVBQVUsQUFhMkIsRUFBQTtBQUN4QyxnQkFBTSxFQUFFLGdCQUFDLElBQXNELEVBQUssd0JBQTNELElBQXNELENBQXBELFdBQVcsS0FBSSxJQUFJLG9CQUFKLElBQUksS0FBRSxHQUFHLG9CQUFILEdBQUcsS0FBSSxLQUFLLEdBQW5DLElBQXNELENBQXhCLEtBQUssS0FBRSxLQUFLLEdBQTFDLElBQXNELENBQWpCLEtBQUssS0FBRSxRQUFRLEdBQXBELElBQXNELENBQVYsUUFBUTtBQUMzRCxtQ0FBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQzdCLHdCQUFZLENBQUUsUUFBUSxDQUFDO0FBQ3JCLGtCQUFJLEVBQUUsMkJBckJDLFlBQVksRUFxQkE7QUFDakIsb0JBQUksRUFBRSxJQUFJO0FBQ1Ysc0JBQU0sRUFBRSxNQUFNO0FBQ2QsMEJBQVUsRUFBRSwyQkF4QmYsTUFBTSxFQXdC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O0FBQ0QsV0FBTyxNQUFNLENBQUMsQ0FDZjs7OztBQUdjLE1BQUkiLCJmaWxlIjoicG9ydC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgZHJhZ2Ryb3AgZnJvbSAnLi4vdXRpbC9kcmFnZHJvcCc7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgY291bnQgZnJvbSAnLi4vdXRpbC9tZXRyaWNzJztcblxuaW1wb3J0IGxheW91dEFjdGlvbnMgZnJvbSAnLi4vZmx1eC9sYXlvdXQvbGF5b3V0LWFjdGlvbnMnO1xuaW1wb3J0IHsgQ29vcmRzLCBQb3J0RHJhZ0luZm8gfSBmcm9tICcuLi9mbHV4L2xheW91dC9sYXlvdXQtbW9kZWwnO1xuaW1wb3J0IGdyYXBoQWN0aW9ucyBmcm9tICcuLi9mbHV4L2dyYXBoL2dyYXBoLWFjdGlvbnMnO1xuaW1wb3J0IHsgQ3JlYXRlQ2hlY2twb2ludCB9IGZyb20gJy4uL2ZsdXgvaGlzdG9yeS9oaXN0b3J5LWFjdGlvbnMnO1xuaW1wb3J0IHsgQ29ubmVjdGFibGUsIElOLCBPVVQgfSBmcm9tICcuLi9mbHV4L2dyYXBoL2dyYXBoLW1vZGVsJztcbmltcG9ydCB7IFJFQURfV1JJVEUgfSBmcm9tICcuLi9mbHV4L3NldHRpbmdzL3NldHRpbmdzLW1vZGVsJztcblxuY29uc3QgeyBEcmFnUG9ydCB9ID0gbGF5b3V0QWN0aW9ucztcbmNvbnN0IHsgQ29ubmVjdFBvcnQsIERpc2Nvbm5lY3RQb3J0IH0gPSBncmFwaEFjdGlvbnM7XG5cbmNvbnN0IFBvcnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcG9ydCwgdmVydGV4LCBldmVudEhhbmRsZXIsIG1vZGUgfSA9IHRoaXMucHJvcHM7XG4gICAgY291bnQoeyB3aGF0OiBQb3J0LmRpc3BsYXlOYW1lIH0pO1xuICAgIGNvbnN0IGNsYXNzZXMgPSBgbmJlLXBvcnQgbmJlLXR5cGUtJHtwb3J0LnR5cGV9YDtcblxuICAgIGNvbnN0IGRkID0gKCkgPT4gZHJhZ2Ryb3Aoe1xuICAgICAgb25CZWZvcmVTdGFydDogKCkgPT4gbW9kZSA9PT0gUkVBRF9XUklURSxcbiAgICAgIG9uTW92ZTogKHsgZHJhZ1BheWxvYWQ6IHsgbGVmdCwgdG9wIH0sIGRyYWdYLCBkcmFnWSwgZHJhZ05vZGUgfSkgPT4ge1xuICAgICAgICBjb3VudCh7IHdoYXQ6ICchRHJhZ1BvcnQnIH0pO1xuICAgICAgICBldmVudEhhbmRsZXIoIERyYWdQb3J0KHtcbiAgICAgICAgICBpbmZvOiBQb3J0RHJhZ0luZm8oe1xuICAgICAgICAgICAgcG9ydDogcG9ydCxcbiAgICAgICAgICAgIHZlcnRleDogdmVydGV4LFxuICAgICAgICAgICAgcG9ydENvb3JkczogQ29vcmRzKHsgbGVmdCwgdG9wIH0pLFxuICAgICAgICAgICAgbW91c2VDb29yZHM6IENvb3Jkcyh7IGxlZnQ6IGxlZnQgKyBkcmFnWCwgdG9wOiB0b3AgKyBkcmFnWSB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pICk7XG4gICAgICB9LFxuICAgICAgZ2V0RHJvcFJlc3VsdDogKCBob3Zlck5vZGUgKSA9PiB7XG4gICAgICAgIGlmKCBob3Zlck5vZGUubm9kZU5hbWUgPT09ICdzdmcnICkge1xuICAgICAgICAgIC8vIEJhY2tncm91bmQgb3Igb3V0c2lkZSBvZiBkcm9wLXpvbmVcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IGhvdmVyTm9kZS5kYXRhc2V0O1xuICAgICAgICBjb25zdCBtYXRjaGVzID0gZGF0YSAmJlxuICAgICAgICAgICAgZGF0YS5uYmVDb25uZWN0YWJsZSAmJlxuICAgICAgICAgICAgZGF0YS5uYmVUeXBlID09PSBwb3J0LnR5cGUgJiZcbiAgICAgICAgICAgIGRhdGEubmJlRGlyZWN0aW9uICE9PSBwb3J0LmRpcmVjdGlvbjtcbiAgICAgICAgcmV0dXJuIG1hdGNoZXMgPyBDb25uZWN0YWJsZSh7XG4gICAgICAgICAgZWRnZUlkOiBkYXRhLm5iZUVkZ2UsXG4gICAgICAgICAgdHlwZTogZGF0YS5uYmVUeXBlLFxuICAgICAgICAgIHZlcnRleElkOiBkYXRhLm5iZVZlcnRleCxcbiAgICAgICAgICBwb3J0SWQ6IGRhdGEubmJlUG9ydCxcbiAgICAgICAgICBkaXJlY3Rpb246IGRhdGEubmJlRGlyZWN0aW9uXG4gICAgICAgIH0pIDogbnVsbDtcbiAgICAgIH0sXG4gICAgICBvbkRyb3A6ICh7IGRyb3BSZXN1bHQgfSkgPT4ge1xuICAgICAgICBldmVudEhhbmRsZXIoIENyZWF0ZUNoZWNrcG9pbnQoKSApO1xuICAgICAgICBldmVudEhhbmRsZXIoIENvbm5lY3RQb3J0KHtcbiAgICAgICAgICBmcm9tOiBDb25uZWN0YWJsZSh7XG4gICAgICAgICAgICB0eXBlOiBwb3J0LnR5cGUsXG4gICAgICAgICAgICB2ZXJ0ZXhJZDogdmVydGV4LmlkLFxuICAgICAgICAgICAgcG9ydElkOiBwb3J0LmlkLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiBwb3J0LmRpcmVjdGlvblxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHBvcnQ6IHBvcnQsXG4gICAgICAgICAgdmVydGV4OiB2ZXJ0ZXgsXG4gICAgICAgICAgdG86IGRyb3BSZXN1bHRcbiAgICAgICAgfSkgKTtcbiAgICAgIH0sXG4gICAgICBvbkVuZDogKCkgPT4ge1xuICAgICAgICBldmVudEhhbmRsZXIoIERyYWdQb3J0KHsgaW5mbzogbnVsbCB9KSApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3RhcnREcmFnID0gKCBldiApID0+IHtcbiAgICAgIGNvbnN0IHAgPSBldi5jdXJyZW50VGFyZ2V0O1xuICAgICAgY29uc3QgdiA9IHZlcnRleE5vZGUoIHAgKTtcbiAgICAgIGNvbnN0IGxlZnQgPSB2Lm9mZnNldExlZnQgKyBwLm9mZnNldExlZnQgKyAocC5vZmZzZXRXaWR0aCAvIDIpO1xuICAgICAgY29uc3QgdG9wID0gdi5vZmZzZXRUb3AgKyBwLm9mZnNldFRvcCArIChwLm9mZnNldEhlaWdodCAvIDIpO1xuICAgICAgZGQoKS5zdGFydCggZXYsIHsgbGVmdCwgdG9wIH0gKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9XG4gICAgICAgICAgIGRhdGEtbmJlLWNvbm5lY3RhYmxlPXt0cnVlfVxuICAgICAgICAgICBkYXRhLW5iZS10eXBlPXtwb3J0LnR5cGV9XG4gICAgICAgICAgIGRhdGEtbmJlLWRpcmVjdGlvbj17cG9ydC5kaXJlY3Rpb259XG4gICAgICAgICAgIGRhdGEtbmJlLXBvcnQ9e3BvcnQuaWR9XG4gICAgICAgICAgIGRhdGEtbmJlLXZlcnRleD17dmVydGV4LmlkfT5cbiAgICAgICAgeyBwb3J0LmRpcmVjdGlvbiA9PT0gT1VUID8gcG9ydC5sYWJlbCA6ICcnIH1cbiAgICAgICAgPGkgY2xhc3NOYW1lPVwibmJlLXBvcnQtaGFuZGxlXCJcbiAgICAgICAgICAgcmVmPVwiaGFuZGxlXCJcbiAgICAgICAgICAgb25Nb3VzZURvd249e3N0YXJ0RHJhZ31cbiAgICAgICAgICAgb25Eb3VibGVDbGljaz17ZGlzY29ubmVjdH0gLz5cbiAgICAgICAgeyBwb3J0LmRpcmVjdGlvbiA9PT0gSU4gPyBwb3J0LmxhYmVsIDogJycgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIGRpc2Nvbm5lY3QoKSB7XG4gICAgICBpZiggbW9kZSA9PT0gUkVBRF9XUklURSApIHtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBDcmVhdGVDaGVja3BvaW50KCkgKTtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBEaXNjb25uZWN0UG9ydCh7IHZlcnRleDogdmVydGV4LCBwb3J0OiBwb3J0IH0pICk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzLCBuZXh0U3RhdGUgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9XG5cbn0pO1xuXG5mdW5jdGlvbiB2ZXJ0ZXhOb2RlKCBwb3J0ICkge1xuICBsZXQgcmVzdWx0ID0gcG9ydC5wYXJlbnROb2RlO1xuICB3aGlsZSAoIHJlc3VsdCApIHtcbiAgICBpZiggL1xcYm5iZS12ZXJ0ZXhcXGIvLnRlc3QoIHJlc3VsdC5jbGFzc05hbWUgKSApIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlc3VsdCA9IHJlc3VsdC5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgUG9ydDtcbiJdfQ==