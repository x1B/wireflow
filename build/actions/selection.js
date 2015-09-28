define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {
  'use strict';

  var DeleteSelection = (0, _immutable.Record)({
    type: function type() {
      return DeleteSelection;
    }
  }, 'DeleteSelection');

  var SelectEdge = (0, _immutable.Record)({
    edge: null,
    type: function type() {
      return SelectEdge;
    }
  }, 'SelectEdge');

  var SelectVertex = (0, _immutable.Record)({
    vertex: null,
    type: function type() {
      return SelectVertex;
    }
  }, 'SelectVertex');

  var DeselectEdge = (0, _immutable.Record)({
    edge: null,
    type: function type() {
      return DeselectEdge;
    }
  }, 'DeselectEdge');

  var DeselectVertex = (0, _immutable.Record)({
    vertex: null,
    type: function type() {
      return DeselectVertex;
    }
  }, 'DeselectVertex');

  var ResizeSelection = (0, _immutable.Record)({
    isExtension: false,
    coords: null,
    dimensions: null,
    type: function type() {
      return ResizeSelection;
    }
  }, 'ResizeSelection');

  var MoveSelection = (0, _immutable.Record)({
    reference: null,
    offset: null,
    type: function type() {
      return MoveSelection;
    }
  }, 'MoveEdge');

  var ClearSelection = (0, _immutable.Record)({
    type: function type() {
      return ClearSelection;
    }
  }, 'ClearSelection');

  module.exports = {
    DeleteSelection: DeleteSelection,
    ResizeSelection: ResizeSelection,
    MoveSelection: MoveSelection,
    ClearSelection: ClearSelection,
    DeselectVertex: DeselectVertex,
    SelectVertex: SelectVertex,
    DeselectEdge: DeselectEdge,
    SelectEdge: SelectEdge
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3NlbGVjdGlvbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBTSxlQUFlLEdBQUcsZUFIZixNQUFNLEVBR2dCO0FBQzdCLFFBQUksRUFBRTthQUFNLGVBQWU7S0FBQTtHQUM1QixFQUFFLGlCQUFpQixDQUFDLENBQUM7O0FBRXRCLE1BQU0sVUFBVSxHQUFHLGVBUFYsTUFBTSxFQU9XO0FBQ3hCLFFBQUksRUFBRSxJQUFJO0FBQ1YsUUFBSSxFQUFFO2FBQU0sVUFBVTtLQUFBO0dBQ3ZCLEVBQUUsWUFBWSxDQUFDLENBQUM7O0FBRWpCLE1BQU0sWUFBWSxHQUFHLGVBWlosTUFBTSxFQVlhO0FBQzFCLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFO2FBQU0sWUFBWTtLQUFBO0dBQ3pCLEVBQUUsY0FBYyxDQUFDLENBQUM7O0FBRW5CLE1BQU0sWUFBWSxHQUFHLGVBakJaLE1BQU0sRUFpQmE7QUFDMUIsUUFBSSxFQUFFLElBQUk7QUFDVixRQUFJLEVBQUU7YUFBTSxZQUFZO0tBQUE7R0FDekIsRUFBRSxjQUFjLENBQUMsQ0FBQzs7QUFFbkIsTUFBTSxjQUFjLEdBQUcsZUF0QmQsTUFBTSxFQXNCZTtBQUM1QixVQUFNLEVBQUUsSUFBSTtBQUNaLFFBQUksRUFBRTthQUFNLGNBQWM7S0FBQTtHQUMzQixFQUFFLGdCQUFnQixDQUFDLENBQUM7O0FBRXJCLE1BQU0sZUFBZSxHQUFHLGVBM0JmLE1BQU0sRUEyQmdCO0FBQzdCLGVBQVcsRUFBRSxLQUFLO0FBQ2xCLFVBQU0sRUFBRSxJQUFJO0FBQ1osY0FBVSxFQUFFLElBQUk7QUFDaEIsUUFBSSxFQUFFO2FBQU0sZUFBZTtLQUFBO0dBQzVCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzs7QUFFdEIsTUFBTSxhQUFhLEdBQUcsZUFsQ2IsTUFBTSxFQWtDYztBQUMzQixhQUFTLEVBQUUsSUFBSTtBQUNmLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFO2FBQU0sYUFBYTtLQUFBO0dBQzFCLEVBQUUsVUFBVSxDQUFDLENBQUM7O0FBRWYsTUFBTSxjQUFjLEdBQUcsZUF4Q2QsTUFBTSxFQXdDZTtBQUM1QixRQUFJLEVBQUU7YUFBTSxjQUFjO0tBQUE7R0FDM0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOzttQkFFTjtBQUNiLG1CQUFlLEVBQWYsZUFBZTtBQUNmLG1CQUFlLEVBQWYsZUFBZTtBQUNmLGlCQUFhLEVBQWIsYUFBYTtBQUNiLGtCQUFjLEVBQWQsY0FBYztBQUNkLGtCQUFjLEVBQWQsY0FBYztBQUNkLGdCQUFZLEVBQVosWUFBWTtBQUNaLGdCQUFZLEVBQVosWUFBWTtBQUNaLGNBQVUsRUFBVixVQUFVO0dBQ1giLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY29yZCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cblxuY29uc3QgRGVsZXRlU2VsZWN0aW9uID0gUmVjb3JkKHtcbiAgdHlwZTogKCkgPT4gRGVsZXRlU2VsZWN0aW9uXG59LCAnRGVsZXRlU2VsZWN0aW9uJyk7XG5cbmNvbnN0IFNlbGVjdEVkZ2UgPSBSZWNvcmQoe1xuICBlZGdlOiBudWxsLFxuICB0eXBlOiAoKSA9PiBTZWxlY3RFZGdlXG59LCAnU2VsZWN0RWRnZScpO1xuXG5jb25zdCBTZWxlY3RWZXJ0ZXggPSBSZWNvcmQoe1xuICB2ZXJ0ZXg6IG51bGwsXG4gIHR5cGU6ICgpID0+IFNlbGVjdFZlcnRleFxufSwgJ1NlbGVjdFZlcnRleCcpO1xuXG5jb25zdCBEZXNlbGVjdEVkZ2UgPSBSZWNvcmQoe1xuICBlZGdlOiBudWxsLFxuICB0eXBlOiAoKSA9PiBEZXNlbGVjdEVkZ2Vcbn0sICdEZXNlbGVjdEVkZ2UnKTtcblxuY29uc3QgRGVzZWxlY3RWZXJ0ZXggPSBSZWNvcmQoe1xuICB2ZXJ0ZXg6IG51bGwsXG4gIHR5cGU6ICgpID0+IERlc2VsZWN0VmVydGV4XG59LCAnRGVzZWxlY3RWZXJ0ZXgnKTtcblxuY29uc3QgUmVzaXplU2VsZWN0aW9uID0gUmVjb3JkKHtcbiAgaXNFeHRlbnNpb246IGZhbHNlLFxuICBjb29yZHM6IG51bGwsXG4gIGRpbWVuc2lvbnM6IG51bGwsXG4gIHR5cGU6ICgpID0+IFJlc2l6ZVNlbGVjdGlvblxufSwgJ1Jlc2l6ZVNlbGVjdGlvbicpO1xuXG5jb25zdCBNb3ZlU2VsZWN0aW9uID0gUmVjb3JkKHtcbiAgcmVmZXJlbmNlOiBudWxsLFxuICBvZmZzZXQ6IG51bGwsXG4gIHR5cGU6ICgpID0+IE1vdmVTZWxlY3Rpb25cbn0sICdNb3ZlRWRnZScpO1xuXG5jb25zdCBDbGVhclNlbGVjdGlvbiA9IFJlY29yZCh7XG4gIHR5cGU6ICgpID0+IENsZWFyU2VsZWN0aW9uXG59LCAnQ2xlYXJTZWxlY3Rpb24nKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBEZWxldGVTZWxlY3Rpb24sXG4gIFJlc2l6ZVNlbGVjdGlvbixcbiAgTW92ZVNlbGVjdGlvbixcbiAgQ2xlYXJTZWxlY3Rpb24sXG4gIERlc2VsZWN0VmVydGV4LFxuICBTZWxlY3RWZXJ0ZXgsXG4gIERlc2VsZWN0RWRnZSxcbiAgU2VsZWN0RWRnZVxufTtcbiJdfQ==