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

  var AutoLayout = (0, _immutable.Record)({ type: function type() {
      return AutoLayout;
    } }, 'AutoLayout');

  module.exports = {
    MeasurePort: MeasurePort,
    MeasureVertex: MeasureVertex,
    MeasureEdge: MeasureEdge,
    MoveEdge: MoveEdge,
    MoveVertex: MoveVertex,
    DragPort: DragPort,
    HandleEdgeInserted: HandleEdgeInserted,
    AutoLayout: AutoLayout,

    PortDragInfo: PortDragInfo,
    EdgeMeasurements: _model.EdgeMeasurements,
    VertexMeasurements: _model.VertexMeasurements
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvd2lyZWZsb3cvc3JjL2FjdGlvbnMvbGF5b3V0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsTUFBTSxZQUFZLEdBQUcsZUFOWixNQUFNLEVBTWE7QUFDMUIsVUFBTSxFQUFFLElBQUk7QUFDWixRQUFJLEVBQUUsSUFBSTtBQUNWLGNBQVUsRUFBRSxJQUFJO0FBQ2hCLGVBQVcsRUFBRSxJQUFJO0dBQ2xCLEVBQUUsY0FBYyxDQUFDLENBQUM7O0FBR25CLE1BQU0sV0FBVyxHQUFHLGVBZFgsTUFBTSxFQWNZO0FBQ3pCLFFBQUksRUFBRSxJQUFJO0FBQ1YsVUFBTSxFQUFFLFdBZkQsTUFBTSxHQWVHO0FBQ2hCLFFBQUksRUFBRTthQUFNLFdBQVc7S0FBQTtHQUN4QixFQUFFLGFBQWEsQ0FBQyxDQUFDOztBQUVsQixNQUFNLGFBQWEsR0FBRyxlQXBCYixNQUFNLEVBb0JjO0FBQzNCLFVBQU0sRUFBRSxJQUFJO0FBQ1osZ0JBQVksRUFBRSxXQXJCQyxrQkFBa0IsR0FxQkM7QUFDbEMsUUFBSSxFQUFFO2FBQU0sYUFBYTtLQUFBO0dBQzFCLEVBQUUsZUFBZSxDQUFDLENBQUM7O0FBRXBCLE1BQU0sV0FBVyxHQUFHLGVBMUJYLE1BQU0sRUEwQlk7QUFDekIsUUFBSSxFQUFFLElBQUk7QUFDVixnQkFBWSxFQUFFLFdBM0JxQixnQkFBZ0IsR0EyQm5CO0FBQ2hDLFFBQUksRUFBRTthQUFNLFdBQVc7S0FBQTtHQUN4QixFQUFFLGFBQWEsQ0FBQyxDQUFDOztBQUdsQixNQUFNLFFBQVEsR0FBRyxlQWpDUixNQUFNLEVBaUNTO0FBQ3RCLFFBQUksRUFBRSxZQUFZLEVBQUU7QUFDcEIsUUFBSSxFQUFFO2FBQU0sUUFBUTtLQUFBO0dBQ3JCLEVBQUUsVUFBVSxDQUFDLENBQUM7O0FBRWYsTUFBTSxRQUFRLEdBQUcsZUF0Q1IsTUFBTSxFQXNDUztBQUN0QixRQUFJLEVBQUUsSUFBSTtBQUNWLE1BQUUsRUFBRSxXQXZDRyxNQUFNLEdBdUNEO0FBQ1osUUFBSSxFQUFFO2FBQU0sUUFBUTtLQUFBO0dBQ3JCLEVBQUUsVUFBVSxDQUFDLENBQUM7O0FBRWYsTUFBTSxVQUFVLEdBQUcsZUE1Q1YsTUFBTSxFQTRDVztBQUN4QixVQUFNLEVBQUUsSUFBSTtBQUNaLE1BQUUsRUFBRSxXQTdDRyxNQUFNLEdBNkNEO0FBQ1osUUFBSSxFQUFFO2FBQU0sVUFBVTtLQUFBO0dBQ3ZCLEVBQUUsWUFBWSxDQUFDLENBQUM7O0FBR2pCLE1BQU0sa0JBQWtCLEdBQUcsZUFuRGxCLE1BQU0sRUFtRG1CO0FBQ2hDLFFBQUksRUFBRSxJQUFJO0FBQ1YsUUFBSSxFQUFFLFdBbkRDLFdBQVcsR0FtREM7QUFDbkIsTUFBRSxFQUFFLFdBcERHLFdBQVcsR0FvREQ7QUFDakIsUUFBSSxFQUFFO2FBQU0sa0JBQWtCO0tBQUE7R0FDL0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDOztBQUV6QixNQUFNLFVBQVUsR0FBRyxlQTFEVixNQUFNLEVBMERXLEVBQUUsSUFBSSxFQUFFO2FBQU0sVUFBVTtLQUFBLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQzs7bUJBRXJEO0FBQ2IsZUFBVyxFQUFYLFdBQVc7QUFDWCxpQkFBYSxFQUFiLGFBQWE7QUFDYixlQUFXLEVBQVgsV0FBVztBQUNYLFlBQVEsRUFBUixRQUFRO0FBQ1IsY0FBVSxFQUFWLFVBQVU7QUFDVixZQUFRLEVBQVIsUUFBUTtBQUNSLHNCQUFrQixFQUFsQixrQkFBa0I7QUFDbEIsY0FBVSxFQUFWLFVBQVU7O0FBRVYsZ0JBQVksRUFBWixZQUFZO0FBQ1osb0JBQWdCLFNBdEVtQixnQkFBZ0IsQUFzRW5DO0FBQ2hCLHNCQUFrQixTQXZFSCxrQkFBa0IsQUF1RWY7R0FDbkIiLCJmaWxlIjoiL1VzZXJzL21pY2hhZWwvd29yay9naXRodWIuY29tL3gxQi93aXJlZmxvdy9zcmMvYWN0aW9ucy9sYXlvdXQuanN4Iiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY29yZCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBDb29yZHMsIFZlcnRleE1lYXN1cmVtZW50cywgRWRnZU1lYXN1cmVtZW50cyB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7IENvbm5lY3RhYmxlIH0gZnJvbSAnLi9ncmFwaCc7XG5cblxuLy8gZXZlbnQgcGF5bG9hZCB1c2VkIGR1cmluZyBwb3J0IGRyYWcvZHJvcFxuY29uc3QgUG9ydERyYWdJbmZvID0gUmVjb3JkKHtcbiAgdmVydGV4OiBudWxsLFxuICBwb3J0OiBudWxsLFxuICBwb3J0Q29vcmRzOiBudWxsLFxuICBtb3VzZUNvb3JkczogbnVsbFxufSwgJ1BvcnREcmFnSW5mbycpO1xuXG5cbmNvbnN0IE1lYXN1cmVQb3J0ID0gUmVjb3JkKHtcbiAgcG9ydDogbnVsbCxcbiAgY2VudGVyOiBDb29yZHMoKSxcbiAgdHlwZTogKCkgPT4gTWVhc3VyZVBvcnRcbn0sICdNZWFzdXJlUG9ydCcpO1xuXG5jb25zdCBNZWFzdXJlVmVydGV4ID0gUmVjb3JkKHtcbiAgdmVydGV4OiBudWxsLFxuICBtZWFzdXJlbWVudHM6IFZlcnRleE1lYXN1cmVtZW50cygpLFxuICB0eXBlOiAoKSA9PiBNZWFzdXJlVmVydGV4XG59LCAnTWVhc3VyZVZlcnRleCcpO1xuXG5jb25zdCBNZWFzdXJlRWRnZSA9IFJlY29yZCh7XG4gIGVkZ2U6IG51bGwsXG4gIG1lYXN1cmVtZW50czogRWRnZU1lYXN1cmVtZW50cygpLFxuICB0eXBlOiAoKSA9PiBNZWFzdXJlRWRnZVxufSwgJ01lYXN1cmVFZGdlJyk7XG5cblxuY29uc3QgRHJhZ1BvcnQgPSBSZWNvcmQoe1xuICBpbmZvOiBQb3J0RHJhZ0luZm8oKSxcbiAgdHlwZTogKCkgPT4gRHJhZ1BvcnRcbn0sICdEcmFnUG9ydCcpO1xuXG5jb25zdCBNb3ZlRWRnZSA9IFJlY29yZCh7XG4gIGVkZ2U6IG51bGwsXG4gIHRvOiBDb29yZHMoKSxcbiAgdHlwZTogKCkgPT4gTW92ZUVkZ2Vcbn0sICdNb3ZlRWRnZScpO1xuXG5jb25zdCBNb3ZlVmVydGV4ID0gUmVjb3JkKHtcbiAgdmVydGV4OiBudWxsLFxuICB0bzogQ29vcmRzKCksXG4gIHR5cGU6ICgpID0+IE1vdmVWZXJ0ZXhcbn0sICdNb3ZlVmVydGV4Jyk7XG5cblxuY29uc3QgSGFuZGxlRWRnZUluc2VydGVkID0gUmVjb3JkKHtcbiAgZWRnZTogbnVsbCxcbiAgZnJvbTogQ29ubmVjdGFibGUoKSxcbiAgdG86IENvbm5lY3RhYmxlKCksXG4gIHR5cGU6ICgpID0+IEhhbmRsZUVkZ2VJbnNlcnRlZFxufSwgJ0hhbmRsZUVkZ2VJbnNlcnRlZCcpO1xuXG5jb25zdCBBdXRvTGF5b3V0ID0gUmVjb3JkKHsgdHlwZTogKCkgPT4gQXV0b0xheW91dCB9LCAnQXV0b0xheW91dCcpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIE1lYXN1cmVQb3J0LFxuICBNZWFzdXJlVmVydGV4LFxuICBNZWFzdXJlRWRnZSxcbiAgTW92ZUVkZ2UsXG4gIE1vdmVWZXJ0ZXgsXG4gIERyYWdQb3J0LFxuICBIYW5kbGVFZGdlSW5zZXJ0ZWQsXG4gIEF1dG9MYXlvdXQsXG5cbiAgUG9ydERyYWdJbmZvLFxuICBFZGdlTWVhc3VyZW1lbnRzLFxuICBWZXJ0ZXhNZWFzdXJlbWVudHNcbn07XG4iXX0=