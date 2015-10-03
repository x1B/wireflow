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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L3NlbGVjdGlvbi9zZWxlY3Rpb24tYWN0aW9ucy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBTSxlQUFlLEdBQUcsZUFIZixNQUFNLEVBR2dCO0FBQzdCLFFBQUksRUFBRTthQUFNLGVBQWU7S0FBQTtHQUM1QixFQUFFLGlCQUFpQixDQUFDLENBQUM7O0FBRXRCLE1BQU0sVUFBVSxHQUFHLGVBUFYsTUFBTSxFQU9XO0FBQ3hCLFFBQUksRUFBRSxJQUFJO0FBQ1YsUUFBSSxFQUFFO2FBQU0sVUFBVTtLQUFBO0dBQ3ZCLEVBQUUsWUFBWSxDQUFDLENBQUM7O0FBRWpCLE1BQU0sWUFBWSxHQUFHLGVBWlosTUFBTSxFQVlhO0FBQzFCLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFO2FBQU0sWUFBWTtLQUFBO0dBQ3pCLEVBQUUsY0FBYyxDQUFDLENBQUM7O0FBRW5CLE1BQU0sWUFBWSxHQUFHLGVBakJaLE1BQU0sRUFpQmE7QUFDMUIsUUFBSSxFQUFFLElBQUk7QUFDVixRQUFJLEVBQUU7YUFBTSxZQUFZO0tBQUE7R0FDekIsRUFBRSxjQUFjLENBQUMsQ0FBQzs7QUFFbkIsTUFBTSxjQUFjLEdBQUcsZUF0QmQsTUFBTSxFQXNCZTtBQUM1QixVQUFNLEVBQUUsSUFBSTtBQUNaLFFBQUksRUFBRTthQUFNLGNBQWM7S0FBQTtHQUMzQixFQUFFLGdCQUFnQixDQUFDLENBQUM7O0FBRXJCLE1BQU0sZUFBZSxHQUFHLGVBM0JmLE1BQU0sRUEyQmdCO0FBQzdCLGVBQVcsRUFBRSxLQUFLO0FBQ2xCLFVBQU0sRUFBRSxJQUFJO0FBQ1osY0FBVSxFQUFFLElBQUk7QUFDaEIsUUFBSSxFQUFFO2FBQU0sZUFBZTtLQUFBO0dBQzVCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzs7QUFFdEIsTUFBTSxhQUFhLEdBQUcsZUFsQ2IsTUFBTSxFQWtDYztBQUMzQixhQUFTLEVBQUUsSUFBSTtBQUNmLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFO2FBQU0sYUFBYTtLQUFBO0dBQzFCLEVBQUUsVUFBVSxDQUFDLENBQUM7O0FBRWYsTUFBTSxjQUFjLEdBQUcsZUF4Q2QsTUFBTSxFQXdDZTtBQUM1QixRQUFJLEVBQUU7YUFBTSxjQUFjO0tBQUE7R0FDM0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOzttQkFFTjtBQUNiLG1CQUFlLEVBQWYsZUFBZTtBQUNmLG1CQUFlLEVBQWYsZUFBZTtBQUNmLGlCQUFhLEVBQWIsYUFBYTtBQUNiLGtCQUFjLEVBQWQsY0FBYztBQUNkLGtCQUFjLEVBQWQsY0FBYztBQUNkLGdCQUFZLEVBQVosWUFBWTtBQUNaLGdCQUFZLEVBQVosWUFBWTtBQUNaLGNBQVUsRUFBVixVQUFVO0dBQ1giLCJmaWxlIjoic2VsZWN0aW9uLWFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuXG5jb25zdCBEZWxldGVTZWxlY3Rpb24gPSBSZWNvcmQoe1xuICB0eXBlOiAoKSA9PiBEZWxldGVTZWxlY3Rpb25cbn0sICdEZWxldGVTZWxlY3Rpb24nKTtcblxuY29uc3QgU2VsZWN0RWRnZSA9IFJlY29yZCh7XG4gIGVkZ2U6IG51bGwsXG4gIHR5cGU6ICgpID0+IFNlbGVjdEVkZ2Vcbn0sICdTZWxlY3RFZGdlJyk7XG5cbmNvbnN0IFNlbGVjdFZlcnRleCA9IFJlY29yZCh7XG4gIHZlcnRleDogbnVsbCxcbiAgdHlwZTogKCkgPT4gU2VsZWN0VmVydGV4XG59LCAnU2VsZWN0VmVydGV4Jyk7XG5cbmNvbnN0IERlc2VsZWN0RWRnZSA9IFJlY29yZCh7XG4gIGVkZ2U6IG51bGwsXG4gIHR5cGU6ICgpID0+IERlc2VsZWN0RWRnZVxufSwgJ0Rlc2VsZWN0RWRnZScpO1xuXG5jb25zdCBEZXNlbGVjdFZlcnRleCA9IFJlY29yZCh7XG4gIHZlcnRleDogbnVsbCxcbiAgdHlwZTogKCkgPT4gRGVzZWxlY3RWZXJ0ZXhcbn0sICdEZXNlbGVjdFZlcnRleCcpO1xuXG5jb25zdCBSZXNpemVTZWxlY3Rpb24gPSBSZWNvcmQoe1xuICBpc0V4dGVuc2lvbjogZmFsc2UsXG4gIGNvb3JkczogbnVsbCxcbiAgZGltZW5zaW9uczogbnVsbCxcbiAgdHlwZTogKCkgPT4gUmVzaXplU2VsZWN0aW9uXG59LCAnUmVzaXplU2VsZWN0aW9uJyk7XG5cbmNvbnN0IE1vdmVTZWxlY3Rpb24gPSBSZWNvcmQoe1xuICByZWZlcmVuY2U6IG51bGwsXG4gIG9mZnNldDogbnVsbCxcbiAgdHlwZTogKCkgPT4gTW92ZVNlbGVjdGlvblxufSwgJ01vdmVFZGdlJyk7XG5cbmNvbnN0IENsZWFyU2VsZWN0aW9uID0gUmVjb3JkKHtcbiAgdHlwZTogKCkgPT4gQ2xlYXJTZWxlY3Rpb25cbn0sICdDbGVhclNlbGVjdGlvbicpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIERlbGV0ZVNlbGVjdGlvbixcbiAgUmVzaXplU2VsZWN0aW9uLFxuICBNb3ZlU2VsZWN0aW9uLFxuICBDbGVhclNlbGVjdGlvbixcbiAgRGVzZWxlY3RWZXJ0ZXgsXG4gIFNlbGVjdFZlcnRleCxcbiAgRGVzZWxlY3RFZGdlLFxuICBTZWxlY3RFZGdlXG59O1xuIl19