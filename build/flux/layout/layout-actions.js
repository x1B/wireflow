define(['exports', 'module', 'immutable', './layout-model', '../graph/graph-actions'], function (exports, module, _immutable, _layoutModel, _graphGraphActions) {
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
    center: (0, _layoutModel.Coords)(),
    type: function type() {
      return MeasurePort;
    }
  }, 'MeasurePort');

  var MeasureVertex = (0, _immutable.Record)({
    vertex: null,
    measurements: (0, _layoutModel.VertexMeasurements)(),
    type: function type() {
      return MeasureVertex;
    }
  }, 'MeasureVertex');

  var MeasureEdge = (0, _immutable.Record)({
    edge: null,
    measurements: (0, _layoutModel.EdgeMeasurements)(),
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
    to: (0, _layoutModel.Coords)(),
    type: function type() {
      return MoveEdge;
    }
  }, 'MoveEdge');

  var MoveVertex = (0, _immutable.Record)({
    vertex: null,
    to: (0, _layoutModel.Coords)(),
    type: function type() {
      return MoveVertex;
    }
  }, 'MoveVertex');

  var HandleEdgeInserted = (0, _immutable.Record)({
    edge: null,
    from: _graphGraphActions.payload.Connectable(),
    to: _graphGraphActions.payload.Connectable(),
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

    payload: {
      PortDragInfo: PortDragInfo,
      EdgeMeasurements: _layoutModel.EdgeMeasurements,
      VertexMeasurements: _layoutModel.VertexMeasurements
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2xheW91dC9sYXlvdXQtYWN0aW9ucy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU9BLE1BQU0sWUFBWSxHQUFHLGVBUFosTUFBTSxFQU9hO0FBQzFCLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFLElBQUk7QUFDVixjQUFVLEVBQUUsSUFBSTtBQUNoQixlQUFXLEVBQUUsSUFBSTtHQUNsQixFQUFFLGNBQWMsQ0FBQyxDQUFDOztBQUduQixNQUFNLFdBQVcsR0FBRyxlQWZYLE1BQU0sRUFlWTtBQUN6QixRQUFJLEVBQUUsSUFBSTtBQUNWLFVBQU0sRUFBRSxpQkFmRCxNQUFNLEdBZUc7QUFDaEIsUUFBSSxFQUFFO2FBQU0sV0FBVztLQUFBO0dBQ3hCLEVBQUUsYUFBYSxDQUFDLENBQUM7O0FBRWxCLE1BQU0sYUFBYSxHQUFHLGVBckJiLE1BQU0sRUFxQmM7QUFDM0IsVUFBTSxFQUFFLElBQUk7QUFDWixnQkFBWSxFQUFFLGlCQXJCQyxrQkFBa0IsR0FxQkM7QUFDbEMsUUFBSSxFQUFFO2FBQU0sYUFBYTtLQUFBO0dBQzFCLEVBQUUsZUFBZSxDQUFDLENBQUM7O0FBRXBCLE1BQU0sV0FBVyxHQUFHLGVBM0JYLE1BQU0sRUEyQlk7QUFDekIsUUFBSSxFQUFFLElBQUk7QUFDVixnQkFBWSxFQUFFLGlCQTNCcUIsZ0JBQWdCLEdBMkJuQjtBQUNoQyxRQUFJLEVBQUU7YUFBTSxXQUFXO0tBQUE7R0FDeEIsRUFBRSxhQUFhLENBQUMsQ0FBQzs7QUFHbEIsTUFBTSxRQUFRLEdBQUcsZUFsQ1IsTUFBTSxFQWtDUztBQUN0QixRQUFJLEVBQUUsWUFBWSxFQUFFO0FBQ3BCLFFBQUksRUFBRTthQUFNLFFBQVE7S0FBQTtHQUNyQixFQUFFLFVBQVUsQ0FBQyxDQUFDOztBQUVmLE1BQU0sUUFBUSxHQUFHLGVBdkNSLE1BQU0sRUF1Q1M7QUFDdEIsUUFBSSxFQUFFLElBQUk7QUFDVixNQUFFLEVBQUUsaUJBdkNHLE1BQU0sR0F1Q0Q7QUFDWixRQUFJLEVBQUU7YUFBTSxRQUFRO0tBQUE7R0FDckIsRUFBRSxVQUFVLENBQUMsQ0FBQzs7QUFFZixNQUFNLFVBQVUsR0FBRyxlQTdDVixNQUFNLEVBNkNXO0FBQ3hCLFVBQU0sRUFBRSxJQUFJO0FBQ1osTUFBRSxFQUFFLGlCQTdDRyxNQUFNLEdBNkNEO0FBQ1osUUFBSSxFQUFFO2FBQU0sVUFBVTtLQUFBO0dBQ3ZCLEVBQUUsWUFBWSxDQUFDLENBQUM7O0FBR2pCLE1BQU0sa0JBQWtCLEdBQUcsZUFwRGxCLE1BQU0sRUFvRG1CO0FBQ2hDLFFBQUksRUFBRSxJQUFJO0FBQ1YsUUFBSSxFQUFFLG1CQW5EQyxPQUFPLENBbURBLFdBQVcsRUFBRTtBQUMzQixNQUFFLEVBQUUsbUJBcERHLE9BQU8sQ0FvREYsV0FBVyxFQUFFO0FBQ3pCLFFBQUksRUFBRTthQUFNLGtCQUFrQjtLQUFBO0dBQy9CLEVBQUUsb0JBQW9CLENBQUMsQ0FBQzs7QUFFekIsTUFBTSxVQUFVLEdBQUcsZUEzRFYsTUFBTSxFQTJEVyxFQUFFLElBQUksRUFBRTthQUFNLFVBQVU7S0FBQSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7O21CQUdyRDtBQUNiLGVBQVcsRUFBWCxXQUFXO0FBQ1gsaUJBQWEsRUFBYixhQUFhO0FBQ2IsZUFBVyxFQUFYLFdBQVc7QUFDWCxZQUFRLEVBQVIsUUFBUTtBQUNSLGNBQVUsRUFBVixVQUFVO0FBQ1YsWUFBUSxFQUFSLFFBQVE7QUFDUixzQkFBa0IsRUFBbEIsa0JBQWtCO0FBQ2xCLGNBQVUsRUFBVixVQUFVOztBQUVWLFdBQU8sRUFBRTtBQUNQLGtCQUFZLEVBQVosWUFBWTtBQUNaLHNCQUFnQixlQXhFaUIsZ0JBQWdCO0FBeUVqRCx3QkFBa0IsZUF6RUwsa0JBQWtCO0tBMEVoQztHQUNGIiwiZmlsZSI6ImxheW91dC1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY29yZCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCB7IENvb3JkcywgVmVydGV4TWVhc3VyZW1lbnRzLCBFZGdlTWVhc3VyZW1lbnRzIH0gZnJvbSAnLi9sYXlvdXQtbW9kZWwnO1xuaW1wb3J0IHsgcGF5bG9hZCB9IGZyb20gJy4uL2dyYXBoL2dyYXBoLWFjdGlvbnMnO1xuXG5cbi8vIGV2ZW50IHBheWxvYWQgdXNlZCBkdXJpbmcgcG9ydCBkcmFnL2Ryb3BcbmNvbnN0IFBvcnREcmFnSW5mbyA9IFJlY29yZCh7XG4gIHZlcnRleDogbnVsbCxcbiAgcG9ydDogbnVsbCxcbiAgcG9ydENvb3JkczogbnVsbCxcbiAgbW91c2VDb29yZHM6IG51bGxcbn0sICdQb3J0RHJhZ0luZm8nKTtcblxuXG5jb25zdCBNZWFzdXJlUG9ydCA9IFJlY29yZCh7XG4gIHBvcnQ6IG51bGwsXG4gIGNlbnRlcjogQ29vcmRzKCksXG4gIHR5cGU6ICgpID0+IE1lYXN1cmVQb3J0XG59LCAnTWVhc3VyZVBvcnQnKTtcblxuY29uc3QgTWVhc3VyZVZlcnRleCA9IFJlY29yZCh7XG4gIHZlcnRleDogbnVsbCxcbiAgbWVhc3VyZW1lbnRzOiBWZXJ0ZXhNZWFzdXJlbWVudHMoKSxcbiAgdHlwZTogKCkgPT4gTWVhc3VyZVZlcnRleFxufSwgJ01lYXN1cmVWZXJ0ZXgnKTtcblxuY29uc3QgTWVhc3VyZUVkZ2UgPSBSZWNvcmQoe1xuICBlZGdlOiBudWxsLFxuICBtZWFzdXJlbWVudHM6IEVkZ2VNZWFzdXJlbWVudHMoKSxcbiAgdHlwZTogKCkgPT4gTWVhc3VyZUVkZ2Vcbn0sICdNZWFzdXJlRWRnZScpO1xuXG5cbmNvbnN0IERyYWdQb3J0ID0gUmVjb3JkKHtcbiAgaW5mbzogUG9ydERyYWdJbmZvKCksXG4gIHR5cGU6ICgpID0+IERyYWdQb3J0XG59LCAnRHJhZ1BvcnQnKTtcblxuY29uc3QgTW92ZUVkZ2UgPSBSZWNvcmQoe1xuICBlZGdlOiBudWxsLFxuICB0bzogQ29vcmRzKCksXG4gIHR5cGU6ICgpID0+IE1vdmVFZGdlXG59LCAnTW92ZUVkZ2UnKTtcblxuY29uc3QgTW92ZVZlcnRleCA9IFJlY29yZCh7XG4gIHZlcnRleDogbnVsbCxcbiAgdG86IENvb3JkcygpLFxuICB0eXBlOiAoKSA9PiBNb3ZlVmVydGV4XG59LCAnTW92ZVZlcnRleCcpO1xuXG5cbmNvbnN0IEhhbmRsZUVkZ2VJbnNlcnRlZCA9IFJlY29yZCh7XG4gIGVkZ2U6IG51bGwsXG4gIGZyb206IHBheWxvYWQuQ29ubmVjdGFibGUoKSxcbiAgdG86IHBheWxvYWQuQ29ubmVjdGFibGUoKSxcbiAgdHlwZTogKCkgPT4gSGFuZGxlRWRnZUluc2VydGVkXG59LCAnSGFuZGxlRWRnZUluc2VydGVkJyk7XG5cbmNvbnN0IEF1dG9MYXlvdXQgPSBSZWNvcmQoeyB0eXBlOiAoKSA9PiBBdXRvTGF5b3V0IH0sICdBdXRvTGF5b3V0Jyk7XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBNZWFzdXJlUG9ydCxcbiAgTWVhc3VyZVZlcnRleCxcbiAgTWVhc3VyZUVkZ2UsXG4gIE1vdmVFZGdlLFxuICBNb3ZlVmVydGV4LFxuICBEcmFnUG9ydCxcbiAgSGFuZGxlRWRnZUluc2VydGVkLFxuICBBdXRvTGF5b3V0LFxuXG4gIHBheWxvYWQ6IHtcbiAgICBQb3J0RHJhZ0luZm8sXG4gICAgRWRnZU1lYXN1cmVtZW50cyxcbiAgICBWZXJ0ZXhNZWFzdXJlbWVudHNcbiAgfVxufTtcbiJdfQ==