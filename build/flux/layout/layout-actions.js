define(['exports', 'module', 'immutable', '../graph/graph-model', './layout-model'], function (exports, module, _immutable, _graphGraphModel, _layoutModel) {'use strict';






  var HandleEdgeInserted = (0, _immutable.Record)({ 
    edge: null, 
    from: (0, _graphGraphModel.Connectable)(), 
    to: (0, _graphGraphModel.Connectable)(), 
    type: function type() {return HandleEdgeInserted;} }, 
  'HandleEdgeInserted');

  var MeasurePort = (0, _immutable.Record)({ 
    port: null, 
    center: (0, _layoutModel.Coords)(), 
    type: function type() {return MeasurePort;} }, 
  'MeasurePort');

  var MeasureVertex = (0, _immutable.Record)({ 
    vertex: null, 
    measurements: (0, _layoutModel.VertexMeasurements)(), 
    type: function type() {return MeasureVertex;} }, 
  'MeasureVertex');

  var MeasureEdge = (0, _immutable.Record)({ 
    edge: null, 
    measurements: (0, _layoutModel.EdgeMeasurements)(), 
    type: function type() {return MeasureEdge;} }, 
  'MeasureEdge');

  var DragPort = (0, _immutable.Record)({ 
    info: (0, _layoutModel.PortDragInfo)(), 
    type: function type() {return DragPort;} }, 
  'DragPort');

  var MoveEdge = (0, _immutable.Record)({ 
    edge: null, 
    to: (0, _layoutModel.Coords)(), 
    type: function type() {return MoveEdge;} }, 
  'MoveEdge');

  var MoveVertex = (0, _immutable.Record)({ 
    vertex: null, 
    to: (0, _layoutModel.Coords)(), 
    type: function type() {return MoveVertex;} }, 
  'MoveVertex');

  var AutoLayout = (0, _immutable.Record)({ 
    type: function type() {return AutoLayout;} }, 
  'AutoLayout');module.exports = 


  { 
    MeasurePort: MeasurePort, 
    MeasureVertex: MeasureVertex, 
    MeasureEdge: MeasureEdge, 
    MoveEdge: MoveEdge, 
    MoveVertex: MoveVertex, 
    DragPort: DragPort, 
    HandleEdgeInserted: HandleEdgeInserted, 
    AutoLayout: AutoLayout };});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2xheW91dC9sYXlvdXQtYWN0aW9ucy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU9BLE1BQU0sa0JBQWtCLEdBQUcsZUFQbEIsTUFBTSxFQU9tQjtBQUNoQyxRQUFJLEVBQUUsSUFBSTtBQUNWLFFBQUksRUFBRSxxQkFQQyxXQUFXLEdBT0M7QUFDbkIsTUFBRSxFQUFFLHFCQVJHLFdBQVcsR0FRRDtBQUNqQixRQUFJLEVBQUUsd0JBQU0sa0JBQWtCLEVBQUEsRUFDL0I7QUFBRSxzQkFBb0IsQ0FBQyxDQUFDOztBQUV6QixNQUFNLFdBQVcsR0FBRyxlQWRYLE1BQU0sRUFjWTtBQUN6QixRQUFJLEVBQUUsSUFBSTtBQUNWLFVBQU0sRUFBRSxpQkFaUixNQUFNLEdBWVU7QUFDaEIsUUFBSSxFQUFFLHdCQUFNLFdBQVcsRUFBQSxFQUN4QjtBQUFFLGVBQWEsQ0FBQyxDQUFDOztBQUVsQixNQUFNLGFBQWEsR0FBRyxlQXBCYixNQUFNLEVBb0JjO0FBQzNCLFVBQU0sRUFBRSxJQUFJO0FBQ1osZ0JBQVksRUFBRSxpQkFsQk4sa0JBQWtCLEdBa0JRO0FBQ2xDLFFBQUksRUFBRSx3QkFBTSxhQUFhLEVBQUEsRUFDMUI7QUFBRSxpQkFBZSxDQUFDLENBQUM7O0FBRXBCLE1BQU0sV0FBVyxHQUFHLGVBMUJYLE1BQU0sRUEwQlk7QUFDekIsUUFBSSxFQUFFLElBQUk7QUFDVixnQkFBWSxFQUFFLGlCQXhCYyxnQkFBZ0IsR0F3Qlo7QUFDaEMsUUFBSSxFQUFFLHdCQUFNLFdBQVcsRUFBQSxFQUN4QjtBQUFFLGVBQWEsQ0FBQyxDQUFDOztBQUVsQixNQUFNLFFBQVEsR0FBRyxlQWhDUixNQUFNLEVBZ0NTO0FBQ3RCLFFBQUksRUFBRSxpQkE3QndDLFlBQVksR0E2QnRDO0FBQ3BCLFFBQUksRUFBRSx3QkFBTSxRQUFRLEVBQUEsRUFDckI7QUFBRSxZQUFVLENBQUMsQ0FBQzs7QUFFZixNQUFNLFFBQVEsR0FBRyxlQXJDUixNQUFNLEVBcUNTO0FBQ3RCLFFBQUksRUFBRSxJQUFJO0FBQ1YsTUFBRSxFQUFFLGlCQW5DSixNQUFNLEdBbUNNO0FBQ1osUUFBSSxFQUFFLHdCQUFNLFFBQVEsRUFBQSxFQUNyQjtBQUFFLFlBQVUsQ0FBQyxDQUFDOztBQUVmLE1BQU0sVUFBVSxHQUFHLGVBM0NWLE1BQU0sRUEyQ1c7QUFDeEIsVUFBTSxFQUFFLElBQUk7QUFDWixNQUFFLEVBQUUsaUJBekNKLE1BQU0sR0F5Q007QUFDWixRQUFJLEVBQUUsd0JBQU0sVUFBVSxFQUFBLEVBQ3ZCO0FBQUUsY0FBWSxDQUFDLENBQUM7O0FBRWpCLE1BQU0sVUFBVSxHQUFHLGVBakRWLE1BQU0sRUFpRFc7QUFDeEIsUUFBSSxFQUFFLHdCQUFNLFVBQVUsRUFBQSxFQUN2QjtBQUFFLGNBQVksQ0FBQyxDQUFDOzs7QUFHRjtBQUNiLGVBQVcsRUFBWCxXQUFXO0FBQ1gsaUJBQWEsRUFBYixhQUFhO0FBQ2IsZUFBVyxFQUFYLFdBQVc7QUFDWCxZQUFRLEVBQVIsUUFBUTtBQUNSLGNBQVUsRUFBVixVQUFVO0FBQ1YsWUFBUSxFQUFSLFFBQVE7QUFDUixzQkFBa0IsRUFBbEIsa0JBQWtCO0FBQ2xCLGNBQVUsRUFBVixVQUFVLEVBQ1giLCJmaWxlIjoibGF5b3V0LWFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHsgQ29ubmVjdGFibGUgfSBmcm9tICcuLi9ncmFwaC9ncmFwaC1tb2RlbCc7XG5pbXBvcnQge1xuICBDb29yZHMsIFZlcnRleE1lYXN1cmVtZW50cywgRWRnZU1lYXN1cmVtZW50cywgUG9ydERyYWdJbmZvXG59IGZyb20gJy4vbGF5b3V0LW1vZGVsJztcblxuY29uc3QgSGFuZGxlRWRnZUluc2VydGVkID0gUmVjb3JkKHtcbiAgZWRnZTogbnVsbCxcbiAgZnJvbTogQ29ubmVjdGFibGUoKSxcbiAgdG86IENvbm5lY3RhYmxlKCksXG4gIHR5cGU6ICgpID0+IEhhbmRsZUVkZ2VJbnNlcnRlZFxufSwgJ0hhbmRsZUVkZ2VJbnNlcnRlZCcpO1xuXG5jb25zdCBNZWFzdXJlUG9ydCA9IFJlY29yZCh7XG4gIHBvcnQ6IG51bGwsXG4gIGNlbnRlcjogQ29vcmRzKCksXG4gIHR5cGU6ICgpID0+IE1lYXN1cmVQb3J0XG59LCAnTWVhc3VyZVBvcnQnKTtcblxuY29uc3QgTWVhc3VyZVZlcnRleCA9IFJlY29yZCh7XG4gIHZlcnRleDogbnVsbCxcbiAgbWVhc3VyZW1lbnRzOiBWZXJ0ZXhNZWFzdXJlbWVudHMoKSxcbiAgdHlwZTogKCkgPT4gTWVhc3VyZVZlcnRleFxufSwgJ01lYXN1cmVWZXJ0ZXgnKTtcblxuY29uc3QgTWVhc3VyZUVkZ2UgPSBSZWNvcmQoe1xuICBlZGdlOiBudWxsLFxuICBtZWFzdXJlbWVudHM6IEVkZ2VNZWFzdXJlbWVudHMoKSxcbiAgdHlwZTogKCkgPT4gTWVhc3VyZUVkZ2Vcbn0sICdNZWFzdXJlRWRnZScpO1xuXG5jb25zdCBEcmFnUG9ydCA9IFJlY29yZCh7XG4gIGluZm86IFBvcnREcmFnSW5mbygpLFxuICB0eXBlOiAoKSA9PiBEcmFnUG9ydFxufSwgJ0RyYWdQb3J0Jyk7XG5cbmNvbnN0IE1vdmVFZGdlID0gUmVjb3JkKHtcbiAgZWRnZTogbnVsbCxcbiAgdG86IENvb3JkcygpLFxuICB0eXBlOiAoKSA9PiBNb3ZlRWRnZVxufSwgJ01vdmVFZGdlJyk7XG5cbmNvbnN0IE1vdmVWZXJ0ZXggPSBSZWNvcmQoe1xuICB2ZXJ0ZXg6IG51bGwsXG4gIHRvOiBDb29yZHMoKSxcbiAgdHlwZTogKCkgPT4gTW92ZVZlcnRleFxufSwgJ01vdmVWZXJ0ZXgnKTtcblxuY29uc3QgQXV0b0xheW91dCA9IFJlY29yZCh7XG4gIHR5cGU6ICgpID0+IEF1dG9MYXlvdXRcbn0sICdBdXRvTGF5b3V0Jyk7XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBNZWFzdXJlUG9ydCxcbiAgTWVhc3VyZVZlcnRleCxcbiAgTWVhc3VyZUVkZ2UsXG4gIE1vdmVFZGdlLFxuICBNb3ZlVmVydGV4LFxuICBEcmFnUG9ydCxcbiAgSGFuZGxlRWRnZUluc2VydGVkLFxuICBBdXRvTGF5b3V0XG59O1xuIl19