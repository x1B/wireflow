define(['exports', 'module', 'react', '../util/dragdrop', '../util/shallow-equal', '../util/metrics', '../flux/layout/layout-actions', '../flux/layout/layout-model', '../flux/graph/graph-actions', '../flux/history/history-actions', '../flux/graph/graph-model', '../flux/settings/settings-model'], function (exports, module, _react, _utilDragdrop, _utilShallowEqual, _utilMetrics, _fluxLayoutLayoutActions, _fluxLayoutLayoutModel, _fluxGraphGraphActions, _fluxHistoryHistoryActions, _fluxGraphGraphModel, _fluxSettingsSettingsModel) {'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);var _dragdrop = _interopRequireDefault(_utilDragdrop);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _count = _interopRequireDefault(_utilMetrics);var _layoutActions = _interopRequireDefault(_fluxLayoutLayoutActions);var _graphActions = _interopRequireDefault(_fluxGraphGraphActions);var 












  DragPort = _layoutActions['default'].DragPort;var 
  ConnectPort = _graphActions['default'].ConnectPort;var DisconnectPort = _graphActions['default'].DisconnectPort;

  var Port = _React['default'].createClass({ displayName: 'Port', 

    render: function render() {var _props = 
      this.props;var port = _props.port;var vertex = _props.vertex;var eventHandler = _props.eventHandler;var settings = _props.settings;
      (0, _count['default'])({ what: Port.displayName });
      var classes = 'nbe-port nbe-type-' + port.type;

      var dd = function dd() {return (0, _dragdrop['default'])({ 
          onBeforeStart: function onBeforeStart() {return settings.mode === _fluxSettingsSettingsModel.READ_WRITE;}, 
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
        if (settings.mode === _fluxSettingsSettingsModel.READ_WRITE) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3BvcnQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFhUSxVQUFRLDZCQUFSLFFBQVE7QUFDUixhQUFXLDRCQUFYLFdBQVcsS0FBRSxjQUFjLDRCQUFkLGNBQWM7O0FBRW5DLE1BQU0sSUFBSSxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7QUFFN0IsVUFBTSxFQUFBLGtCQUFHO0FBQzBDLFVBQUksQ0FBQyxLQUFLLEtBQW5ELElBQUksVUFBSixJQUFJLEtBQUUsTUFBTSxVQUFOLE1BQU0sS0FBRSxZQUFZLFVBQVosWUFBWSxLQUFFLFFBQVEsVUFBUixRQUFRO0FBQzVDLDZCQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLFVBQU0sT0FBTywwQkFBd0IsSUFBSSxDQUFDLElBQUksQUFBRSxDQUFDOztBQUVqRCxVQUFNLEVBQUUsR0FBRyxTQUFMLEVBQUUsV0FBUywwQkFBUztBQUN4Qix1QkFBYSxFQUFFLGlDQUFNLFFBQVEsQ0FBQyxJQUFJLGdDQWIvQixVQUFVLEFBYW9DLEVBQUE7QUFDakQsZ0JBQU0sRUFBRSxnQkFBQyxJQUFzRCxFQUFLLHdCQUEzRCxJQUFzRCxDQUFwRCxXQUFXLEtBQUksSUFBSSxvQkFBSixJQUFJLEtBQUUsR0FBRyxvQkFBSCxHQUFHLEtBQUksS0FBSyxHQUFuQyxJQUFzRCxDQUF4QixLQUFLLEtBQUUsS0FBSyxHQUExQyxJQUFzRCxDQUFqQixLQUFLLEtBQUUsUUFBUSxHQUFwRCxJQUFzRCxDQUFWLFFBQVE7QUFDM0QsbUNBQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUM3Qix3QkFBWSxDQUFFLFFBQVEsQ0FBQztBQUNyQixrQkFBSSxFQUFFLDJCQXJCQyxZQUFZLEVBcUJBO0FBQ2pCLG9CQUFJLEVBQUUsSUFBSTtBQUNWLHNCQUFNLEVBQUUsTUFBTTtBQUNkLDBCQUFVLEVBQUUsMkJBeEJmLE1BQU0sRUF3QmdCLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxHQUFHLEVBQUgsR0FBRyxFQUFFLENBQUM7QUFDakMsMkJBQVcsRUFBRSwyQkF6QmhCLE1BQU0sRUF5QmlCLEVBQUUsSUFBSSxFQUFFLElBQUksR0FBRyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUM5RCxDQUFDLEVBQ0gsQ0FBQyxDQUFFLENBQUMsQ0FDTjs7OztBQUNELHVCQUFhLEVBQUUsdUJBQUUsU0FBUyxFQUFNO0FBQzlCLGdCQUFJLFNBQVMsQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFHOztBQUVqQyxxQkFBTyxLQUFLLENBQUMsQ0FDZDs7QUFDRCxnQkFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztBQUMvQixnQkFBTSxPQUFPLEdBQUcsSUFBSTtBQUNoQixnQkFBSSxDQUFDLGNBQWM7QUFDbkIsZ0JBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLElBQUk7QUFDMUIsZ0JBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUN6QyxtQkFBTyxPQUFPLEdBQUcseUJBcENoQixXQUFXLEVBb0NpQjtBQUMzQixvQkFBTSxFQUFFLElBQUksQ0FBQyxPQUFPO0FBQ3BCLGtCQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU87QUFDbEIsc0JBQVEsRUFBRSxJQUFJLENBQUMsU0FBUztBQUN4QixvQkFBTSxFQUFFLElBQUksQ0FBQyxPQUFPO0FBQ3BCLHVCQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFDN0IsQ0FBQztBQUFHLGdCQUFJLENBQUMsQ0FDWDs7QUFDRCxnQkFBTSxFQUFFLGdCQUFDLEtBQWMsRUFBSyxLQUFqQixVQUFVLEdBQVosS0FBYyxDQUFaLFVBQVU7QUFDbkIsd0JBQVksQ0FBRSwrQkE5Q2IsZ0JBQWdCLEdBOENlLENBQUUsQ0FBQztBQUNuQyx3QkFBWSxDQUFFLFdBQVcsQ0FBQztBQUN4QixrQkFBSSxFQUFFLHlCQS9DUCxXQUFXLEVBK0NRO0FBQ2hCLG9CQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7QUFDZix3QkFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO0FBQ25CLHNCQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDZix5QkFBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQzFCLENBQUM7O0FBQ0Ysa0JBQUksRUFBRSxJQUFJO0FBQ1Ysb0JBQU0sRUFBRSxNQUFNO0FBQ2QsZ0JBQUUsRUFBRSxVQUFVLEVBQ2YsQ0FBQyxDQUFFLENBQUMsQ0FDTjs7O0FBQ0QsZUFBSyxFQUFFLGlCQUFNO0FBQ1gsd0JBQVksQ0FBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQzFDLEVBQ0YsQ0FBQyxFQUFBLENBQUM7Ozs7QUFFSCxVQUFNLFNBQVMsR0FBRyxTQUFaLFNBQVMsQ0FBSyxFQUFFLEVBQU07QUFDMUIsWUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztBQUMzQixZQUFNLENBQUMsR0FBRyxVQUFVLENBQUUsQ0FBQyxDQUFFLENBQUM7QUFDMUIsWUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsVUFBVSxHQUFJLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxBQUFDLENBQUM7QUFDL0QsWUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxHQUFJLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxBQUFDLENBQUM7QUFDN0QsVUFBRSxFQUFFLENBQUMsS0FBSyxDQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsR0FBRyxFQUFILEdBQUcsRUFBRSxDQUFFLENBQUM7QUFDaEMsVUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQ3RCLENBQUM7OztBQUVGO0FBQ0UsaURBQUssU0FBUyxFQUFFLE9BQU8sQUFBQztBQUNuQixrQ0FBc0IsSUFBSSxBQUFDO0FBQzNCLDJCQUFlLElBQUksQ0FBQyxJQUFJLEFBQUM7QUFDekIsZ0NBQW9CLElBQUksQ0FBQyxTQUFTLEFBQUM7QUFDbkMsMkJBQWUsSUFBSSxDQUFDLEVBQUUsQUFBQztBQUN2Qiw2QkFBaUIsTUFBTSxDQUFDLEVBQUUsQUFBQztBQUM1QixZQUFJLENBQUMsU0FBUywwQkEvRUUsR0FBRyxBQStFRyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRTtBQUMxQywrQ0FBRyxTQUFTLEVBQUMsaUJBQWlCO0FBQzNCLGFBQUcsRUFBQyxRQUFRO0FBQ1oscUJBQVcsRUFBRSxTQUFTLEFBQUM7QUFDdkIsdUJBQWEsRUFBRSxVQUFVLEFBQUMsR0FBRztBQUM5QixZQUFJLENBQUMsU0FBUywwQkFwRkYsRUFBRSxBQW9GTyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUNyQyxFQUNOOzs7O0FBRUYsZUFBUyxVQUFVLEdBQUc7QUFDcEIsWUFBSSxRQUFRLENBQUMsSUFBSSxnQ0F4RmQsVUFBVSxBQXdGbUIsRUFBRztBQUNqQyxzQkFBWSxDQUFFLCtCQTNGYixnQkFBZ0IsR0EyRmUsQ0FBRSxDQUFDO0FBQ25DLHNCQUFZLENBQUUsY0FBYyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQ2hFLENBQ0YsQ0FDRjs7Ozs7QUFFRCx5QkFBcUIsRUFBQSwrQkFBRSxTQUFTLEVBQUUsU0FBUyxFQUFHO0FBQzVDLGFBQU8sQ0FBQyw4QkFBYyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDLENBQy9DLEVBRUYsQ0FBQyxDQUFDOzs7OztBQUVILFdBQVMsVUFBVSxDQUFFLElBQUksRUFBRztBQUMxQixRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQzdCLFdBQVEsTUFBTSxFQUFHO0FBQ2YsVUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBRSxFQUFHO0FBQzlDLGVBQU8sTUFBTSxDQUFDLENBQ2Y7O0FBQ0QsWUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FDNUI7O0FBQ0QsV0FBTyxNQUFNLENBQUMsQ0FDZjs7OztBQUdjLE1BQUkiLCJmaWxlIjoicG9ydC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgZHJhZ2Ryb3AgZnJvbSAnLi4vdXRpbC9kcmFnZHJvcCc7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgY291bnQgZnJvbSAnLi4vdXRpbC9tZXRyaWNzJztcblxuaW1wb3J0IGxheW91dEFjdGlvbnMgZnJvbSAnLi4vZmx1eC9sYXlvdXQvbGF5b3V0LWFjdGlvbnMnO1xuaW1wb3J0IHsgQ29vcmRzLCBQb3J0RHJhZ0luZm8gfSBmcm9tICcuLi9mbHV4L2xheW91dC9sYXlvdXQtbW9kZWwnO1xuaW1wb3J0IGdyYXBoQWN0aW9ucyBmcm9tICcuLi9mbHV4L2dyYXBoL2dyYXBoLWFjdGlvbnMnO1xuaW1wb3J0IHsgQ3JlYXRlQ2hlY2twb2ludCB9IGZyb20gJy4uL2ZsdXgvaGlzdG9yeS9oaXN0b3J5LWFjdGlvbnMnO1xuaW1wb3J0IHsgQ29ubmVjdGFibGUsIElOLCBPVVQgfSBmcm9tICcuLi9mbHV4L2dyYXBoL2dyYXBoLW1vZGVsJztcbmltcG9ydCB7IFJFQURfV1JJVEUgfSBmcm9tICcuLi9mbHV4L3NldHRpbmdzL3NldHRpbmdzLW1vZGVsJztcblxuY29uc3QgeyBEcmFnUG9ydCB9ID0gbGF5b3V0QWN0aW9ucztcbmNvbnN0IHsgQ29ubmVjdFBvcnQsIERpc2Nvbm5lY3RQb3J0IH0gPSBncmFwaEFjdGlvbnM7XG5cbmNvbnN0IFBvcnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcG9ydCwgdmVydGV4LCBldmVudEhhbmRsZXIsIHNldHRpbmdzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvdW50KHsgd2hhdDogUG9ydC5kaXNwbGF5TmFtZSB9KTtcbiAgICBjb25zdCBjbGFzc2VzID0gYG5iZS1wb3J0IG5iZS10eXBlLSR7cG9ydC50eXBlfWA7XG5cbiAgICBjb25zdCBkZCA9ICgpID0+IGRyYWdkcm9wKHtcbiAgICAgIG9uQmVmb3JlU3RhcnQ6ICgpID0+IHNldHRpbmdzLm1vZGUgPT09IFJFQURfV1JJVEUsXG4gICAgICBvbk1vdmU6ICh7IGRyYWdQYXlsb2FkOiB7IGxlZnQsIHRvcCB9LCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgY291bnQoeyB3aGF0OiAnIURyYWdQb3J0JyB9KTtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBEcmFnUG9ydCh7XG4gICAgICAgICAgaW5mbzogUG9ydERyYWdJbmZvKHtcbiAgICAgICAgICAgIHBvcnQ6IHBvcnQsXG4gICAgICAgICAgICB2ZXJ0ZXg6IHZlcnRleCxcbiAgICAgICAgICAgIHBvcnRDb29yZHM6IENvb3Jkcyh7IGxlZnQsIHRvcCB9KSxcbiAgICAgICAgICAgIG1vdXNlQ29vcmRzOiBDb29yZHMoeyBsZWZ0OiBsZWZ0ICsgZHJhZ1gsIHRvcDogdG9wICsgZHJhZ1kgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KSApO1xuICAgICAgfSxcbiAgICAgIGdldERyb3BSZXN1bHQ6ICggaG92ZXJOb2RlICkgPT4ge1xuICAgICAgICBpZiggaG92ZXJOb2RlLm5vZGVOYW1lID09PSAnc3ZnJyApIHtcbiAgICAgICAgICAvLyBCYWNrZ3JvdW5kIG9yIG91dHNpZGUgb2YgZHJvcC16b25lXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGEgPSBob3Zlck5vZGUuZGF0YXNldDtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGRhdGEgJiZcbiAgICAgICAgICAgIGRhdGEubmJlQ29ubmVjdGFibGUgJiZcbiAgICAgICAgICAgIGRhdGEubmJlVHlwZSA9PT0gcG9ydC50eXBlICYmXG4gICAgICAgICAgICBkYXRhLm5iZURpcmVjdGlvbiAhPT0gcG9ydC5kaXJlY3Rpb247XG4gICAgICAgIHJldHVybiBtYXRjaGVzID8gQ29ubmVjdGFibGUoe1xuICAgICAgICAgIGVkZ2VJZDogZGF0YS5uYmVFZGdlLFxuICAgICAgICAgIHR5cGU6IGRhdGEubmJlVHlwZSxcbiAgICAgICAgICB2ZXJ0ZXhJZDogZGF0YS5uYmVWZXJ0ZXgsXG4gICAgICAgICAgcG9ydElkOiBkYXRhLm5iZVBvcnQsXG4gICAgICAgICAgZGlyZWN0aW9uOiBkYXRhLm5iZURpcmVjdGlvblxuICAgICAgICB9KSA6IG51bGw7XG4gICAgICB9LFxuICAgICAgb25Ecm9wOiAoeyBkcm9wUmVzdWx0IH0pID0+IHtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBDcmVhdGVDaGVja3BvaW50KCkgKTtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBDb25uZWN0UG9ydCh7XG4gICAgICAgICAgZnJvbTogQ29ubmVjdGFibGUoe1xuICAgICAgICAgICAgdHlwZTogcG9ydC50eXBlLFxuICAgICAgICAgICAgdmVydGV4SWQ6IHZlcnRleC5pZCxcbiAgICAgICAgICAgIHBvcnRJZDogcG9ydC5pZCxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogcG9ydC5kaXJlY3Rpb25cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBwb3J0OiBwb3J0LFxuICAgICAgICAgIHZlcnRleDogdmVydGV4LFxuICAgICAgICAgIHRvOiBkcm9wUmVzdWx0XG4gICAgICAgIH0pICk7XG4gICAgICB9LFxuICAgICAgb25FbmQ6ICgpID0+IHtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBEcmFnUG9ydCh7IGluZm86IG51bGwgfSkgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0RHJhZyA9ICggZXYgKSA9PiB7XG4gICAgICBjb25zdCBwID0gZXYuY3VycmVudFRhcmdldDtcbiAgICAgIGNvbnN0IHYgPSB2ZXJ0ZXhOb2RlKCBwICk7XG4gICAgICBjb25zdCBsZWZ0ID0gdi5vZmZzZXRMZWZ0ICsgcC5vZmZzZXRMZWZ0ICsgKHAub2Zmc2V0V2lkdGggLyAyKTtcbiAgICAgIGNvbnN0IHRvcCA9IHYub2Zmc2V0VG9wICsgcC5vZmZzZXRUb3AgKyAocC5vZmZzZXRIZWlnaHQgLyAyKTtcbiAgICAgIGRkKCkuc3RhcnQoIGV2LCB7IGxlZnQsIHRvcCB9ICk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfVxuICAgICAgICAgICBkYXRhLW5iZS1jb25uZWN0YWJsZT17dHJ1ZX1cbiAgICAgICAgICAgZGF0YS1uYmUtdHlwZT17cG9ydC50eXBlfVxuICAgICAgICAgICBkYXRhLW5iZS1kaXJlY3Rpb249e3BvcnQuZGlyZWN0aW9ufVxuICAgICAgICAgICBkYXRhLW5iZS1wb3J0PXtwb3J0LmlkfVxuICAgICAgICAgICBkYXRhLW5iZS12ZXJ0ZXg9e3ZlcnRleC5pZH0+XG4gICAgICAgIHsgcG9ydC5kaXJlY3Rpb24gPT09IE9VVCA/IHBvcnQubGFiZWwgOiAnJyB9XG4gICAgICAgIDxpIGNsYXNzTmFtZT1cIm5iZS1wb3J0LWhhbmRsZVwiXG4gICAgICAgICAgIHJlZj1cImhhbmRsZVwiXG4gICAgICAgICAgIG9uTW91c2VEb3duPXtzdGFydERyYWd9XG4gICAgICAgICAgIG9uRG91YmxlQ2xpY2s9e2Rpc2Nvbm5lY3R9IC8+XG4gICAgICAgIHsgcG9ydC5kaXJlY3Rpb24gPT09IElOID8gcG9ydC5sYWJlbCA6ICcnIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBmdW5jdGlvbiBkaXNjb25uZWN0KCkge1xuICAgICAgaWYoIHNldHRpbmdzLm1vZGUgPT09IFJFQURfV1JJVEUgKSB7XG4gICAgICAgIGV2ZW50SGFuZGxlciggQ3JlYXRlQ2hlY2twb2ludCgpICk7XG4gICAgICAgIGV2ZW50SGFuZGxlciggRGlzY29ubmVjdFBvcnQoeyB2ZXJ0ZXg6IHZlcnRleCwgcG9ydDogcG9ydCB9KSApO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcywgbmV4dFN0YXRlICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuZnVuY3Rpb24gdmVydGV4Tm9kZSggcG9ydCApIHtcbiAgbGV0IHJlc3VsdCA9IHBvcnQucGFyZW50Tm9kZTtcbiAgd2hpbGUgKCByZXN1bHQgKSB7XG4gICAgaWYoIC9cXGJuYmUtdmVydGV4XFxiLy50ZXN0KCByZXN1bHQuY2xhc3NOYW1lICkgKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXN1bHQgPSByZXN1bHQucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBvcnQ7XG4iXX0=