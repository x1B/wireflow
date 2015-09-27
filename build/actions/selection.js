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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9hY3Rpb25zL3NlbGVjdGlvbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBTSxlQUFlLEdBQUcsZUFIZixNQUFNLEVBR2dCO0FBQzdCLFFBQUksRUFBRTthQUFNLGVBQWU7S0FBQTtHQUM1QixFQUFFLGlCQUFpQixDQUFDLENBQUM7O0FBRXRCLE1BQU0sVUFBVSxHQUFHLGVBUFYsTUFBTSxFQU9XO0FBQ3hCLFFBQUksRUFBRSxJQUFJO0FBQ1YsUUFBSSxFQUFFO2FBQU0sVUFBVTtLQUFBO0dBQ3ZCLEVBQUUsWUFBWSxDQUFDLENBQUM7O0FBRWpCLE1BQU0sWUFBWSxHQUFHLGVBWlosTUFBTSxFQVlhO0FBQzFCLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFO2FBQU0sWUFBWTtLQUFBO0dBQ3pCLEVBQUUsY0FBYyxDQUFDLENBQUM7O0FBRW5CLE1BQU0sWUFBWSxHQUFHLGVBakJaLE1BQU0sRUFpQmE7QUFDMUIsUUFBSSxFQUFFLElBQUk7QUFDVixRQUFJLEVBQUU7YUFBTSxZQUFZO0tBQUE7R0FDekIsRUFBRSxjQUFjLENBQUMsQ0FBQzs7QUFFbkIsTUFBTSxjQUFjLEdBQUcsZUF0QmQsTUFBTSxFQXNCZTtBQUM1QixVQUFNLEVBQUUsSUFBSTtBQUNaLFFBQUksRUFBRTthQUFNLGNBQWM7S0FBQTtHQUMzQixFQUFFLGdCQUFnQixDQUFDLENBQUM7O0FBRXJCLE1BQU0sZUFBZSxHQUFHLGVBM0JmLE1BQU0sRUEyQmdCO0FBQzdCLGVBQVcsRUFBRSxLQUFLO0FBQ2xCLFVBQU0sRUFBRSxJQUFJO0FBQ1osY0FBVSxFQUFFLElBQUk7QUFDaEIsUUFBSSxFQUFFO2FBQU0sZUFBZTtLQUFBO0dBQzVCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzs7QUFFdEIsTUFBTSxhQUFhLEdBQUcsZUFsQ2IsTUFBTSxFQWtDYztBQUMzQixhQUFTLEVBQUUsSUFBSTtBQUNmLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFO2FBQU0sYUFBYTtLQUFBO0dBQzFCLEVBQUUsVUFBVSxDQUFDLENBQUM7O0FBRWYsTUFBTSxjQUFjLEdBQUcsZUF4Q2QsTUFBTSxFQXdDZTtBQUM1QixRQUFJLEVBQUU7YUFBTSxjQUFjO0tBQUE7R0FDM0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOzttQkFFTjtBQUNiLG1CQUFlLEVBQWYsZUFBZTtBQUNmLG1CQUFlLEVBQWYsZUFBZTtBQUNmLGlCQUFhLEVBQWIsYUFBYTtBQUNiLGtCQUFjLEVBQWQsY0FBYztBQUNkLGtCQUFjLEVBQWQsY0FBYztBQUNkLGdCQUFZLEVBQVosWUFBWTtBQUNaLGdCQUFZLEVBQVosWUFBWTtBQUNaLGNBQVUsRUFBVixVQUFVO0dBQ1giLCJmaWxlIjoiL1VzZXJzL21pY2hhZWwvd29yay9naXRodWIuY29tL3gxQi9uYmUtcmVhY3Qvc3JjL2FjdGlvbnMvc2VsZWN0aW9uLmpzeCIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWNvcmQgfSBmcm9tICdpbW11dGFibGUnO1xuXG5cbmNvbnN0IERlbGV0ZVNlbGVjdGlvbiA9IFJlY29yZCh7XG4gIHR5cGU6ICgpID0+IERlbGV0ZVNlbGVjdGlvblxufSwgJ0RlbGV0ZVNlbGVjdGlvbicpO1xuXG5jb25zdCBTZWxlY3RFZGdlID0gUmVjb3JkKHtcbiAgZWRnZTogbnVsbCxcbiAgdHlwZTogKCkgPT4gU2VsZWN0RWRnZVxufSwgJ1NlbGVjdEVkZ2UnKTtcblxuY29uc3QgU2VsZWN0VmVydGV4ID0gUmVjb3JkKHtcbiAgdmVydGV4OiBudWxsLFxuICB0eXBlOiAoKSA9PiBTZWxlY3RWZXJ0ZXhcbn0sICdTZWxlY3RWZXJ0ZXgnKTtcblxuY29uc3QgRGVzZWxlY3RFZGdlID0gUmVjb3JkKHtcbiAgZWRnZTogbnVsbCxcbiAgdHlwZTogKCkgPT4gRGVzZWxlY3RFZGdlXG59LCAnRGVzZWxlY3RFZGdlJyk7XG5cbmNvbnN0IERlc2VsZWN0VmVydGV4ID0gUmVjb3JkKHtcbiAgdmVydGV4OiBudWxsLFxuICB0eXBlOiAoKSA9PiBEZXNlbGVjdFZlcnRleFxufSwgJ0Rlc2VsZWN0VmVydGV4Jyk7XG5cbmNvbnN0IFJlc2l6ZVNlbGVjdGlvbiA9IFJlY29yZCh7XG4gIGlzRXh0ZW5zaW9uOiBmYWxzZSxcbiAgY29vcmRzOiBudWxsLFxuICBkaW1lbnNpb25zOiBudWxsLFxuICB0eXBlOiAoKSA9PiBSZXNpemVTZWxlY3Rpb25cbn0sICdSZXNpemVTZWxlY3Rpb24nKTtcblxuY29uc3QgTW92ZVNlbGVjdGlvbiA9IFJlY29yZCh7XG4gIHJlZmVyZW5jZTogbnVsbCxcbiAgb2Zmc2V0OiBudWxsLFxuICB0eXBlOiAoKSA9PiBNb3ZlU2VsZWN0aW9uXG59LCAnTW92ZUVkZ2UnKTtcblxuY29uc3QgQ2xlYXJTZWxlY3Rpb24gPSBSZWNvcmQoe1xuICB0eXBlOiAoKSA9PiBDbGVhclNlbGVjdGlvblxufSwgJ0NsZWFyU2VsZWN0aW9uJyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgRGVsZXRlU2VsZWN0aW9uLFxuICBSZXNpemVTZWxlY3Rpb24sXG4gIE1vdmVTZWxlY3Rpb24sXG4gIENsZWFyU2VsZWN0aW9uLFxuICBEZXNlbGVjdFZlcnRleCxcbiAgU2VsZWN0VmVydGV4LFxuICBEZXNlbGVjdEVkZ2UsXG4gIFNlbGVjdEVkZ2Vcbn07XG4iXX0=