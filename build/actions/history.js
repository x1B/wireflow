define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {
  'use strict';

  var UiUndo = (0, _immutable.Record)({
    type: function type() {
      return UiUndo;
    }
  }, 'UiUndo');

  var UiRedo = (0, _immutable.Record)({
    type: function type() {
      return UiRedo;
    }
  }, 'UiRedo');

  /**
   * Dispatched by various stores to insert a checkpoint
   * *before* performing a destructive operation.
   */
  var CreateCheckpoint = (0, _immutable.Record)({
    before: '',
    type: function type() {
      return CreateCheckpoint;
    }
  }, 'CreateCheckpoint');

  /** Dispatched by various stores to save state changes. */
  var SaveState = (0, _immutable.Record)({
    storeId: null,
    state: null,
    type: function type() {
      return SaveState;
    }
  }, 'SaveState');

  /** Dispatched by the history store to restore the state at a checkpoint. */
  var RestoreState = (0, _immutable.Record)({
    storeId: null,
    state: null,
    type: function type() {
      return RestoreState;
    }
  }, 'RestoreState');

  module.exports = {
    CreateCheckpoint: CreateCheckpoint,
    SaveState: SaveState,
    RestoreState: RestoreState,
    UiUndo: UiUndo,
    UiRedo: UiRedo
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2hpc3RvcnkuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQU0sTUFBTSxHQUFHLGVBSE4sTUFBTSxFQUdPO0FBQ3BCLFFBQUksRUFBRTthQUFNLE1BQU07S0FBQTtHQUNuQixFQUFFLFFBQVEsQ0FBQyxDQUFDOztBQUViLE1BQU0sTUFBTSxHQUFHLGVBUE4sTUFBTSxFQU9PO0FBQ3BCLFFBQUksRUFBRTthQUFNLE1BQU07S0FBQTtHQUNuQixFQUFFLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7QUFNYixNQUFNLGdCQUFnQixHQUFHLGVBZmhCLE1BQU0sRUFlaUI7QUFDOUIsVUFBTSxFQUFFLEVBQUU7QUFDVixRQUFJLEVBQUU7YUFBTSxnQkFBZ0I7S0FBQTtHQUM3QixFQUFFLGtCQUFrQixDQUFDLENBQUM7OztBQUd2QixNQUFNLFNBQVMsR0FBRyxlQXJCVCxNQUFNLEVBcUJVO0FBQ3ZCLFdBQU8sRUFBRSxJQUFJO0FBQ2IsU0FBSyxFQUFFLElBQUk7QUFDWCxRQUFJLEVBQUU7YUFBTSxTQUFTO0tBQUE7R0FDdEIsRUFBRSxXQUFXLENBQUMsQ0FBQzs7O0FBR2hCLE1BQU0sWUFBWSxHQUFHLGVBNUJaLE1BQU0sRUE0QmE7QUFDMUIsV0FBTyxFQUFFLElBQUk7QUFDYixTQUFLLEVBQUUsSUFBSTtBQUNYLFFBQUksRUFBRTthQUFNLFlBQVk7S0FBQTtHQUN6QixFQUFFLGNBQWMsQ0FBQyxDQUFDOzttQkFHSjtBQUNiLG9CQUFnQixFQUFoQixnQkFBZ0I7QUFDaEIsYUFBUyxFQUFULFNBQVM7QUFDVCxnQkFBWSxFQUFaLFlBQVk7QUFDWixVQUFNLEVBQU4sTUFBTTtBQUNOLFVBQU0sRUFBTixNQUFNO0dBQ1AiLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWNvcmQgfSBmcm9tICdpbW11dGFibGUnO1xuXG5cbmNvbnN0IFVpVW5kbyA9IFJlY29yZCh7XG4gIHR5cGU6ICgpID0+IFVpVW5kb1xufSwgJ1VpVW5kbycpO1xuXG5jb25zdCBVaVJlZG8gPSBSZWNvcmQoe1xuICB0eXBlOiAoKSA9PiBVaVJlZG9cbn0sICdVaVJlZG8nKTtcblxuLyoqXG4gKiBEaXNwYXRjaGVkIGJ5IHZhcmlvdXMgc3RvcmVzIHRvIGluc2VydCBhIGNoZWNrcG9pbnRcbiAqICpiZWZvcmUqIHBlcmZvcm1pbmcgYSBkZXN0cnVjdGl2ZSBvcGVyYXRpb24uXG4gKi9cbmNvbnN0IENyZWF0ZUNoZWNrcG9pbnQgPSBSZWNvcmQoe1xuICBiZWZvcmU6ICcnLFxuICB0eXBlOiAoKSA9PiBDcmVhdGVDaGVja3BvaW50XG59LCAnQ3JlYXRlQ2hlY2twb2ludCcpO1xuXG4vKiogRGlzcGF0Y2hlZCBieSB2YXJpb3VzIHN0b3JlcyB0byBzYXZlIHN0YXRlIGNoYW5nZXMuICovXG5jb25zdCBTYXZlU3RhdGUgPSBSZWNvcmQoe1xuICBzdG9yZUlkOiBudWxsLFxuICBzdGF0ZTogbnVsbCxcbiAgdHlwZTogKCkgPT4gU2F2ZVN0YXRlXG59LCAnU2F2ZVN0YXRlJyk7XG5cbi8qKiBEaXNwYXRjaGVkIGJ5IHRoZSBoaXN0b3J5IHN0b3JlIHRvIHJlc3RvcmUgdGhlIHN0YXRlIGF0IGEgY2hlY2twb2ludC4gKi9cbmNvbnN0IFJlc3RvcmVTdGF0ZSA9IFJlY29yZCh7XG4gIHN0b3JlSWQ6IG51bGwsXG4gIHN0YXRlOiBudWxsLFxuICB0eXBlOiAoKSA9PiBSZXN0b3JlU3RhdGVcbn0sICdSZXN0b3JlU3RhdGUnKTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIENyZWF0ZUNoZWNrcG9pbnQsXG4gIFNhdmVTdGF0ZSxcbiAgUmVzdG9yZVN0YXRlLFxuICBVaVVuZG8sXG4gIFVpUmVkb1xufTtcbiJdfQ==