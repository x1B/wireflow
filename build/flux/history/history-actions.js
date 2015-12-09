define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {'use strict';


  var UiUndo = (0, _immutable.Record)({ 
    type: function type() {return UiUndo;} }, 
  'UiUndo');

  var UiRedo = (0, _immutable.Record)({ 
    type: function type() {return UiRedo;} }, 
  'UiRedo');

  /**
   * Dispatched by various stores to insert a checkpoint
   * *before* performing a destructive operation.
   */
  var CreateCheckpoint = (0, _immutable.Record)({ 
    before: '', 
    type: function type() {return CreateCheckpoint;} }, 
  'CreateCheckpoint');

  /**
   * Dispatched by various stores to save state to the history store.
   * The next checkpoint will include all changes saved up to that point.
   */
  var SaveState = (0, _immutable.Record)({ 
    storeId: null, 
    state: null, 
    type: function type() {return SaveState;} }, 
  'SaveState');

  /**
   * Dispatched by the history store to restore the state at a checkpoint.
   */
  var RestoreState = (0, _immutable.Record)({ 
    storeId: null, 
    state: null, 
    type: function type() {return RestoreState;} }, 
  'RestoreState');module.exports = 


  { 
    CreateCheckpoint: CreateCheckpoint, 
    SaveState: SaveState, 
    RestoreState: RestoreState, 
    UiUndo: UiUndo, 
    UiRedo: UiRedo };});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2hpc3RvcnkvaGlzdG9yeS1hY3Rpb25zLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFNLE1BQU0sR0FBRyxlQUhOLE1BQU0sRUFHTztBQUNwQixRQUFJLEVBQUUsd0JBQU0sTUFBTSxFQUFBLEVBQ25CO0FBQUUsVUFBUSxDQUFDLENBQUM7O0FBRWIsTUFBTSxNQUFNLEdBQUcsZUFQTixNQUFNLEVBT087QUFDcEIsUUFBSSxFQUFFLHdCQUFNLE1BQU0sRUFBQSxFQUNuQjtBQUFFLFVBQVEsQ0FBQyxDQUFDOzs7Ozs7QUFNYixNQUFNLGdCQUFnQixHQUFHLGVBZmhCLE1BQU0sRUFlaUI7QUFDOUIsVUFBTSxFQUFFLEVBQUU7QUFDVixRQUFJLEVBQUUsd0JBQU0sZ0JBQWdCLEVBQUEsRUFDN0I7QUFBRSxvQkFBa0IsQ0FBQyxDQUFDOzs7Ozs7QUFNdkIsTUFBTSxTQUFTLEdBQUcsZUF4QlQsTUFBTSxFQXdCVTtBQUN2QixXQUFPLEVBQUUsSUFBSTtBQUNiLFNBQUssRUFBRSxJQUFJO0FBQ1gsUUFBSSxFQUFFLHdCQUFNLFNBQVMsRUFBQSxFQUN0QjtBQUFFLGFBQVcsQ0FBQyxDQUFDOzs7OztBQUtoQixNQUFNLFlBQVksR0FBRyxlQWpDWixNQUFNLEVBaUNhO0FBQzFCLFdBQU8sRUFBRSxJQUFJO0FBQ2IsU0FBSyxFQUFFLElBQUk7QUFDWCxRQUFJLEVBQUUsd0JBQU0sWUFBWSxFQUFBLEVBQ3pCO0FBQUUsZ0JBQWMsQ0FBQyxDQUFDOzs7QUFHSjtBQUNiLG9CQUFnQixFQUFoQixnQkFBZ0I7QUFDaEIsYUFBUyxFQUFULFNBQVM7QUFDVCxnQkFBWSxFQUFaLFlBQVk7QUFDWixVQUFNLEVBQU4sTUFBTTtBQUNOLFVBQU0sRUFBTixNQUFNLEVBQ1AiLCJmaWxlIjoiaGlzdG9yeS1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY29yZCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cblxuY29uc3QgVWlVbmRvID0gUmVjb3JkKHtcbiAgdHlwZTogKCkgPT4gVWlVbmRvXG59LCAnVWlVbmRvJyk7XG5cbmNvbnN0IFVpUmVkbyA9IFJlY29yZCh7XG4gIHR5cGU6ICgpID0+IFVpUmVkb1xufSwgJ1VpUmVkbycpO1xuXG4vKipcbiAqIERpc3BhdGNoZWQgYnkgdmFyaW91cyBzdG9yZXMgdG8gaW5zZXJ0IGEgY2hlY2twb2ludFxuICogKmJlZm9yZSogcGVyZm9ybWluZyBhIGRlc3RydWN0aXZlIG9wZXJhdGlvbi5cbiAqL1xuY29uc3QgQ3JlYXRlQ2hlY2twb2ludCA9IFJlY29yZCh7XG4gIGJlZm9yZTogJycsXG4gIHR5cGU6ICgpID0+IENyZWF0ZUNoZWNrcG9pbnRcbn0sICdDcmVhdGVDaGVja3BvaW50Jyk7XG5cbi8qKlxuICogRGlzcGF0Y2hlZCBieSB2YXJpb3VzIHN0b3JlcyB0byBzYXZlIHN0YXRlIHRvIHRoZSBoaXN0b3J5IHN0b3JlLlxuICogVGhlIG5leHQgY2hlY2twb2ludCB3aWxsIGluY2x1ZGUgYWxsIGNoYW5nZXMgc2F2ZWQgdXAgdG8gdGhhdCBwb2ludC5cbiAqL1xuY29uc3QgU2F2ZVN0YXRlID0gUmVjb3JkKHtcbiAgc3RvcmVJZDogbnVsbCxcbiAgc3RhdGU6IG51bGwsXG4gIHR5cGU6ICgpID0+IFNhdmVTdGF0ZVxufSwgJ1NhdmVTdGF0ZScpO1xuXG4vKipcbiAqIERpc3BhdGNoZWQgYnkgdGhlIGhpc3Rvcnkgc3RvcmUgdG8gcmVzdG9yZSB0aGUgc3RhdGUgYXQgYSBjaGVja3BvaW50LlxuICovXG5jb25zdCBSZXN0b3JlU3RhdGUgPSBSZWNvcmQoe1xuICBzdG9yZUlkOiBudWxsLFxuICBzdGF0ZTogbnVsbCxcbiAgdHlwZTogKCkgPT4gUmVzdG9yZVN0YXRlXG59LCAnUmVzdG9yZVN0YXRlJyk7XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBDcmVhdGVDaGVja3BvaW50LFxuICBTYXZlU3RhdGUsXG4gIFJlc3RvcmVTdGF0ZSxcbiAgVWlVbmRvLFxuICBVaVJlZG9cbn07XG4iXX0=