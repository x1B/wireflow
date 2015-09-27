define(['exports', 'module', 'immutable', '../model', './graph'], function (exports, module, _immutable, _model, _graph) {
  'use strict';

  // event payload used during port drag/drop
  var PortDragInfo = (0, _immutable.Record)({
    vertex: null,
    port: null,
    portCoords: null,
    mouseCoords: null
  }, 'PortDragInfo');

  var MeasurePort = (0, _immutable.Record)({
    port: null,
    center: (0, _model.Coords)(),
    type: function type() {
      return MeasurePort;
    }
  }, 'MeasurePort');

  var MeasureVertex = (0, _immutable.Record)({
    vertex: null,
    measurements: (0, _model.VertexMeasurements)(),
    type: function type() {
      return MeasureVertex;
    }
  }, 'MeasureVertex');

  var MeasureEdge = (0, _immutable.Record)({
    edge: null,
    measurements: (0, _model.EdgeMeasurements)(),
    type: function type() {
      return MeasureEdge;
    }
  }, 'MeasureEdge');

  var DragPort = (0, _immutable.Record)({
    info: PortDragInfo(),
    type: function type() {
      return DragPort;
    }
  }, 'DragPort');

  var MoveEdge = (0, _immutable.Record)({
    edge: null,
    to: (0, _model.Coords)(),
    type: function type() {
      return MoveEdge;
    }
  }, 'MoveEdge');

  var MoveVertex = (0, _immutable.Record)({
    vertex: null,
    to: (0, _model.Coords)(),
    type: function type() {
      return MoveVertex;
    }
  }, 'MoveVertex');

  var HandleEdgeInserted = (0, _immutable.Record)({
    edge: null,
    from: (0, _graph.Connectable)(),
    to: (0, _graph.Connectable)(),
    type: function type() {
      return HandleEdgeInserted;
    }
  }, 'HandleEdgeInserted');

  module.exports = {
    MeasurePort: MeasurePort,
    MeasureVertex: MeasureVertex,
    MeasureEdge: MeasureEdge,
    MoveEdge: MoveEdge,
    MoveVertex: MoveVertex,
    DragPort: DragPort,
    HandleEdgeInserted: HandleEdgeInserted,

    PortDragInfo: PortDragInfo,
    EdgeMeasurements: _model.EdgeMeasurements,
    VertexMeasurements: _model.VertexMeasurements
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2xheW91dC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU1BLE1BQU0sWUFBWSxHQUFHLGVBTlosTUFBTSxFQU1hO0FBQzFCLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFLElBQUk7QUFDVixjQUFVLEVBQUUsSUFBSTtBQUNoQixlQUFXLEVBQUUsSUFBSTtHQUNsQixFQUFFLGNBQWMsQ0FBQyxDQUFDOztBQUduQixNQUFNLFdBQVcsR0FBRyxlQWRYLE1BQU0sRUFjWTtBQUN6QixRQUFJLEVBQUUsSUFBSTtBQUNWLFVBQU0sRUFBRSxXQWZELE1BQU0sR0FlRztBQUNoQixRQUFJLEVBQUU7YUFBTSxXQUFXO0tBQUE7R0FDeEIsRUFBRSxhQUFhLENBQUMsQ0FBQzs7QUFFbEIsTUFBTSxhQUFhLEdBQUcsZUFwQmIsTUFBTSxFQW9CYztBQUMzQixVQUFNLEVBQUUsSUFBSTtBQUNaLGdCQUFZLEVBQUUsV0FyQkMsa0JBQWtCLEdBcUJDO0FBQ2xDLFFBQUksRUFBRTthQUFNLGFBQWE7S0FBQTtHQUMxQixFQUFFLGVBQWUsQ0FBQyxDQUFDOztBQUVwQixNQUFNLFdBQVcsR0FBRyxlQTFCWCxNQUFNLEVBMEJZO0FBQ3pCLFFBQUksRUFBRSxJQUFJO0FBQ1YsZ0JBQVksRUFBRSxXQTNCcUIsZ0JBQWdCLEdBMkJuQjtBQUNoQyxRQUFJLEVBQUU7YUFBTSxXQUFXO0tBQUE7R0FDeEIsRUFBRSxhQUFhLENBQUMsQ0FBQzs7QUFHbEIsTUFBTSxRQUFRLEdBQUcsZUFqQ1IsTUFBTSxFQWlDUztBQUN0QixRQUFJLEVBQUUsWUFBWSxFQUFFO0FBQ3BCLFFBQUksRUFBRTthQUFNLFFBQVE7S0FBQTtHQUNyQixFQUFFLFVBQVUsQ0FBQyxDQUFDOztBQUVmLE1BQU0sUUFBUSxHQUFHLGVBdENSLE1BQU0sRUFzQ1M7QUFDdEIsUUFBSSxFQUFFLElBQUk7QUFDVixNQUFFLEVBQUUsV0F2Q0csTUFBTSxHQXVDRDtBQUNaLFFBQUksRUFBRTthQUFNLFFBQVE7S0FBQTtHQUNyQixFQUFFLFVBQVUsQ0FBQyxDQUFDOztBQUVmLE1BQU0sVUFBVSxHQUFHLGVBNUNWLE1BQU0sRUE0Q1c7QUFDeEIsVUFBTSxFQUFFLElBQUk7QUFDWixNQUFFLEVBQUUsV0E3Q0csTUFBTSxHQTZDRDtBQUNaLFFBQUksRUFBRTthQUFNLFVBQVU7S0FBQTtHQUN2QixFQUFFLFlBQVksQ0FBQyxDQUFDOztBQUdqQixNQUFNLGtCQUFrQixHQUFHLGVBbkRsQixNQUFNLEVBbURtQjtBQUNoQyxRQUFJLEVBQUUsSUFBSTtBQUNWLFFBQUksRUFBRSxXQW5EQyxXQUFXLEdBbURDO0FBQ25CLE1BQUUsRUFBRSxXQXBERyxXQUFXLEdBb0REO0FBQ2pCLFFBQUksRUFBRTthQUFNLGtCQUFrQjtLQUFBO0dBQy9CLEVBQUUsb0JBQW9CLENBQUMsQ0FBQzs7bUJBSVY7QUFDYixlQUFXLEVBQVgsV0FBVztBQUNYLGlCQUFhLEVBQWIsYUFBYTtBQUNiLGVBQVcsRUFBWCxXQUFXO0FBQ1gsWUFBUSxFQUFSLFFBQVE7QUFDUixjQUFVLEVBQVYsVUFBVTtBQUNWLFlBQVEsRUFBUixRQUFRO0FBQ1Isc0JBQWtCLEVBQWxCLGtCQUFrQjs7QUFFbEIsZ0JBQVksRUFBWixZQUFZO0FBQ1osb0JBQWdCLFNBckVtQixnQkFBZ0I7QUFzRW5ELHNCQUFrQixTQXRFSCxrQkFBa0I7R0F1RWxDIiwiZmlsZSI6ImxheW91dC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWNvcmQgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IHsgQ29vcmRzLCBWZXJ0ZXhNZWFzdXJlbWVudHMsIEVkZ2VNZWFzdXJlbWVudHMgfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQgeyBDb25uZWN0YWJsZSB9IGZyb20gJy4vZ3JhcGgnO1xuXG5cbi8vIGV2ZW50IHBheWxvYWQgdXNlZCBkdXJpbmcgcG9ydCBkcmFnL2Ryb3BcbmNvbnN0IFBvcnREcmFnSW5mbyA9IFJlY29yZCh7XG4gIHZlcnRleDogbnVsbCxcbiAgcG9ydDogbnVsbCxcbiAgcG9ydENvb3JkczogbnVsbCxcbiAgbW91c2VDb29yZHM6IG51bGxcbn0sICdQb3J0RHJhZ0luZm8nKTtcblxuXG5jb25zdCBNZWFzdXJlUG9ydCA9IFJlY29yZCh7XG4gIHBvcnQ6IG51bGwsXG4gIGNlbnRlcjogQ29vcmRzKCksXG4gIHR5cGU6ICgpID0+IE1lYXN1cmVQb3J0XG59LCAnTWVhc3VyZVBvcnQnKTtcblxuY29uc3QgTWVhc3VyZVZlcnRleCA9IFJlY29yZCh7XG4gIHZlcnRleDogbnVsbCxcbiAgbWVhc3VyZW1lbnRzOiBWZXJ0ZXhNZWFzdXJlbWVudHMoKSxcbiAgdHlwZTogKCkgPT4gTWVhc3VyZVZlcnRleFxufSwgJ01lYXN1cmVWZXJ0ZXgnKTtcblxuY29uc3QgTWVhc3VyZUVkZ2UgPSBSZWNvcmQoe1xuICBlZGdlOiBudWxsLFxuICBtZWFzdXJlbWVudHM6IEVkZ2VNZWFzdXJlbWVudHMoKSxcbiAgdHlwZTogKCkgPT4gTWVhc3VyZUVkZ2Vcbn0sICdNZWFzdXJlRWRnZScpO1xuXG5cbmNvbnN0IERyYWdQb3J0ID0gUmVjb3JkKHtcbiAgaW5mbzogUG9ydERyYWdJbmZvKCksXG4gIHR5cGU6ICgpID0+IERyYWdQb3J0XG59LCAnRHJhZ1BvcnQnKTtcblxuY29uc3QgTW92ZUVkZ2UgPSBSZWNvcmQoe1xuICBlZGdlOiBudWxsLFxuICB0bzogQ29vcmRzKCksXG4gIHR5cGU6ICgpID0+IE1vdmVFZGdlXG59LCAnTW92ZUVkZ2UnKTtcblxuY29uc3QgTW92ZVZlcnRleCA9IFJlY29yZCh7XG4gIHZlcnRleDogbnVsbCxcbiAgdG86IENvb3JkcygpLFxuICB0eXBlOiAoKSA9PiBNb3ZlVmVydGV4XG59LCAnTW92ZVZlcnRleCcpO1xuXG5cbmNvbnN0IEhhbmRsZUVkZ2VJbnNlcnRlZCA9IFJlY29yZCh7XG4gIGVkZ2U6IG51bGwsXG4gIGZyb206IENvbm5lY3RhYmxlKCksXG4gIHRvOiBDb25uZWN0YWJsZSgpLFxuICB0eXBlOiAoKSA9PiBIYW5kbGVFZGdlSW5zZXJ0ZWRcbn0sICdIYW5kbGVFZGdlSW5zZXJ0ZWQnKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgTWVhc3VyZVBvcnQsXG4gIE1lYXN1cmVWZXJ0ZXgsXG4gIE1lYXN1cmVFZGdlLFxuICBNb3ZlRWRnZSxcbiAgTW92ZVZlcnRleCxcbiAgRHJhZ1BvcnQsXG4gIEhhbmRsZUVkZ2VJbnNlcnRlZCxcblxuICBQb3J0RHJhZ0luZm8sXG4gIEVkZ2VNZWFzdXJlbWVudHMsXG4gIFZlcnRleE1lYXN1cmVtZW50c1xufTtcbiJdfQ==