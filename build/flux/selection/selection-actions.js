define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {'use strict';


  var DeleteSelection = (0, _immutable.Record)({ 
    type: function type() {return DeleteSelection;} }, 
  'DeleteSelection');

  var SelectEdge = (0, _immutable.Record)({ 
    edge: null, 
    type: function type() {return SelectEdge;} }, 
  'SelectEdge');

  var SelectVertex = (0, _immutable.Record)({ 
    vertex: null, 
    type: function type() {return SelectVertex;} }, 
  'SelectVertex');

  var DeselectEdge = (0, _immutable.Record)({ 
    edge: null, 
    type: function type() {return DeselectEdge;} }, 
  'DeselectEdge');

  var DeselectVertex = (0, _immutable.Record)({ 
    vertex: null, 
    type: function type() {return DeselectVertex;} }, 
  'DeselectVertex');

  var ResizeSelection = (0, _immutable.Record)({ 
    isExtension: false, 
    coords: null, 
    dimensions: null, 
    type: function type() {return ResizeSelection;} }, 
  'ResizeSelection');

  var MoveSelection = (0, _immutable.Record)({ 
    reference: null, 
    offset: null, 
    type: function type() {return MoveSelection;} }, 
  'MoveEdge');

  var ClearSelection = (0, _immutable.Record)({ 
    type: function type() {return ClearSelection;} }, 
  'ClearSelection');

  var CopySelection = (0, _immutable.Record)({ 
    copyEvent: null, 
    type: function type() {return CopySelection;} }, 
  'CopySelection');

  var CutSelection = (0, _immutable.Record)({ 
    cutEvent: null, 
    type: function type() {return CutSelection;} }, 
  'CutSelection');

  var PasteClipboard = (0, _immutable.Record)({ 
    pasteEvent: null, 
    type: function type() {return PasteClipboard;} }, 
  'PasteClipboard');module.exports = 

  { 
    CopySelection: CopySelection, 
    CutSelection: CutSelection, 
    PasteClipboard: PasteClipboard, 
    DeleteSelection: DeleteSelection, 
    ResizeSelection: ResizeSelection, 
    MoveSelection: MoveSelection, 
    ClearSelection: ClearSelection, 
    DeselectVertex: DeselectVertex, 
    SelectVertex: SelectVertex, 
    DeselectEdge: DeselectEdge, 
    SelectEdge: SelectEdge };});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L3NlbGVjdGlvbi9zZWxlY3Rpb24tYWN0aW9ucy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBTSxlQUFlLEdBQUcsZUFIZixNQUFNLEVBR2dCO0FBQzdCLFFBQUksRUFBRSx3QkFBTSxlQUFlLEVBQUEsRUFDNUI7QUFBRSxtQkFBaUIsQ0FBQyxDQUFDOztBQUV0QixNQUFNLFVBQVUsR0FBRyxlQVBWLE1BQU0sRUFPVztBQUN4QixRQUFJLEVBQUUsSUFBSTtBQUNWLFFBQUksRUFBRSx3QkFBTSxVQUFVLEVBQUEsRUFDdkI7QUFBRSxjQUFZLENBQUMsQ0FBQzs7QUFFakIsTUFBTSxZQUFZLEdBQUcsZUFaWixNQUFNLEVBWWE7QUFDMUIsVUFBTSxFQUFFLElBQUk7QUFDWixRQUFJLEVBQUUsd0JBQU0sWUFBWSxFQUFBLEVBQ3pCO0FBQUUsZ0JBQWMsQ0FBQyxDQUFDOztBQUVuQixNQUFNLFlBQVksR0FBRyxlQWpCWixNQUFNLEVBaUJhO0FBQzFCLFFBQUksRUFBRSxJQUFJO0FBQ1YsUUFBSSxFQUFFLHdCQUFNLFlBQVksRUFBQSxFQUN6QjtBQUFFLGdCQUFjLENBQUMsQ0FBQzs7QUFFbkIsTUFBTSxjQUFjLEdBQUcsZUF0QmQsTUFBTSxFQXNCZTtBQUM1QixVQUFNLEVBQUUsSUFBSTtBQUNaLFFBQUksRUFBRSx3QkFBTSxjQUFjLEVBQUEsRUFDM0I7QUFBRSxrQkFBZ0IsQ0FBQyxDQUFDOztBQUVyQixNQUFNLGVBQWUsR0FBRyxlQTNCZixNQUFNLEVBMkJnQjtBQUM3QixlQUFXLEVBQUUsS0FBSztBQUNsQixVQUFNLEVBQUUsSUFBSTtBQUNaLGNBQVUsRUFBRSxJQUFJO0FBQ2hCLFFBQUksRUFBRSx3QkFBTSxlQUFlLEVBQUEsRUFDNUI7QUFBRSxtQkFBaUIsQ0FBQyxDQUFDOztBQUV0QixNQUFNLGFBQWEsR0FBRyxlQWxDYixNQUFNLEVBa0NjO0FBQzNCLGFBQVMsRUFBRSxJQUFJO0FBQ2YsVUFBTSxFQUFFLElBQUk7QUFDWixRQUFJLEVBQUUsd0JBQU0sYUFBYSxFQUFBLEVBQzFCO0FBQUUsWUFBVSxDQUFDLENBQUM7O0FBRWYsTUFBTSxjQUFjLEdBQUcsZUF4Q2QsTUFBTSxFQXdDZTtBQUM1QixRQUFJLEVBQUUsd0JBQU0sY0FBYyxFQUFBLEVBQzNCO0FBQUUsa0JBQWdCLENBQUMsQ0FBQzs7QUFFckIsTUFBTSxhQUFhLEdBQUcsZUE1Q2IsTUFBTSxFQTRDYztBQUMzQixhQUFTLEVBQUUsSUFBSTtBQUNmLFFBQUksRUFBRSx3QkFBTSxhQUFhLEVBQUEsRUFDMUI7QUFBRSxpQkFBZSxDQUFFLENBQUM7O0FBRXJCLE1BQU0sWUFBWSxHQUFHLGVBakRaLE1BQU0sRUFpRGE7QUFDMUIsWUFBUSxFQUFFLElBQUk7QUFDZCxRQUFJLEVBQUUsd0JBQU0sWUFBWSxFQUFBLEVBQ3pCO0FBQUUsZ0JBQWMsQ0FBRSxDQUFDOztBQUVwQixNQUFNLGNBQWMsR0FBRyxlQXREZCxNQUFNLEVBc0RlO0FBQzVCLGNBQVUsRUFBRSxJQUFJO0FBQ2hCLFFBQUksRUFBRSx3QkFBTSxjQUFjLEVBQUEsRUFDM0I7QUFBRSxrQkFBZ0IsQ0FBRSxDQUFDOztBQUVQO0FBQ2IsaUJBQWEsRUFBYixhQUFhO0FBQ2IsZ0JBQVksRUFBWixZQUFZO0FBQ1osa0JBQWMsRUFBZCxjQUFjO0FBQ2QsbUJBQWUsRUFBZixlQUFlO0FBQ2YsbUJBQWUsRUFBZixlQUFlO0FBQ2YsaUJBQWEsRUFBYixhQUFhO0FBQ2Isa0JBQWMsRUFBZCxjQUFjO0FBQ2Qsa0JBQWMsRUFBZCxjQUFjO0FBQ2QsZ0JBQVksRUFBWixZQUFZO0FBQ1osZ0JBQVksRUFBWixZQUFZO0FBQ1osY0FBVSxFQUFWLFVBQVUsRUFDWCIsImZpbGUiOiJzZWxlY3Rpb24tYWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWNvcmQgfSBmcm9tICdpbW11dGFibGUnO1xuXG5cbmNvbnN0IERlbGV0ZVNlbGVjdGlvbiA9IFJlY29yZCh7XG4gIHR5cGU6ICgpID0+IERlbGV0ZVNlbGVjdGlvblxufSwgJ0RlbGV0ZVNlbGVjdGlvbicpO1xuXG5jb25zdCBTZWxlY3RFZGdlID0gUmVjb3JkKHtcbiAgZWRnZTogbnVsbCxcbiAgdHlwZTogKCkgPT4gU2VsZWN0RWRnZVxufSwgJ1NlbGVjdEVkZ2UnKTtcblxuY29uc3QgU2VsZWN0VmVydGV4ID0gUmVjb3JkKHtcbiAgdmVydGV4OiBudWxsLFxuICB0eXBlOiAoKSA9PiBTZWxlY3RWZXJ0ZXhcbn0sICdTZWxlY3RWZXJ0ZXgnKTtcblxuY29uc3QgRGVzZWxlY3RFZGdlID0gUmVjb3JkKHtcbiAgZWRnZTogbnVsbCxcbiAgdHlwZTogKCkgPT4gRGVzZWxlY3RFZGdlXG59LCAnRGVzZWxlY3RFZGdlJyk7XG5cbmNvbnN0IERlc2VsZWN0VmVydGV4ID0gUmVjb3JkKHtcbiAgdmVydGV4OiBudWxsLFxuICB0eXBlOiAoKSA9PiBEZXNlbGVjdFZlcnRleFxufSwgJ0Rlc2VsZWN0VmVydGV4Jyk7XG5cbmNvbnN0IFJlc2l6ZVNlbGVjdGlvbiA9IFJlY29yZCh7XG4gIGlzRXh0ZW5zaW9uOiBmYWxzZSxcbiAgY29vcmRzOiBudWxsLFxuICBkaW1lbnNpb25zOiBudWxsLFxuICB0eXBlOiAoKSA9PiBSZXNpemVTZWxlY3Rpb25cbn0sICdSZXNpemVTZWxlY3Rpb24nKTtcblxuY29uc3QgTW92ZVNlbGVjdGlvbiA9IFJlY29yZCh7XG4gIHJlZmVyZW5jZTogbnVsbCxcbiAgb2Zmc2V0OiBudWxsLFxuICB0eXBlOiAoKSA9PiBNb3ZlU2VsZWN0aW9uXG59LCAnTW92ZUVkZ2UnKTtcblxuY29uc3QgQ2xlYXJTZWxlY3Rpb24gPSBSZWNvcmQoe1xuICB0eXBlOiAoKSA9PiBDbGVhclNlbGVjdGlvblxufSwgJ0NsZWFyU2VsZWN0aW9uJyk7XG5cbmNvbnN0IENvcHlTZWxlY3Rpb24gPSBSZWNvcmQoe1xuICBjb3B5RXZlbnQ6IG51bGwsXG4gIHR5cGU6ICgpID0+IENvcHlTZWxlY3Rpb25cbn0sICdDb3B5U2VsZWN0aW9uJyApO1xuXG5jb25zdCBDdXRTZWxlY3Rpb24gPSBSZWNvcmQoe1xuICBjdXRFdmVudDogbnVsbCxcbiAgdHlwZTogKCkgPT4gQ3V0U2VsZWN0aW9uXG59LCAnQ3V0U2VsZWN0aW9uJyApO1xuXG5jb25zdCBQYXN0ZUNsaXBib2FyZCA9IFJlY29yZCh7XG4gIHBhc3RlRXZlbnQ6IG51bGwsXG4gIHR5cGU6ICgpID0+IFBhc3RlQ2xpcGJvYXJkXG59LCAnUGFzdGVDbGlwYm9hcmQnICk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQ29weVNlbGVjdGlvbixcbiAgQ3V0U2VsZWN0aW9uLFxuICBQYXN0ZUNsaXBib2FyZCxcbiAgRGVsZXRlU2VsZWN0aW9uLFxuICBSZXNpemVTZWxlY3Rpb24sXG4gIE1vdmVTZWxlY3Rpb24sXG4gIENsZWFyU2VsZWN0aW9uLFxuICBEZXNlbGVjdFZlcnRleCxcbiAgU2VsZWN0VmVydGV4LFxuICBEZXNlbGVjdEVkZ2UsXG4gIFNlbGVjdEVkZ2Vcbn07XG4iXX0=