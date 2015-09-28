define(['exports', 'module', './components/graph', './components/history', './dispatcher', './model', './actions/history', './actions/layout', './stores/layout-store', './stores/graph-store', './stores/selection-store', './stores/history-store'], function (exports, module, _componentsGraph, _componentsHistory, _dispatcher, _model, _actionsHistory, _actionsLayout, _storesLayoutStore, _storesGraphStore, _storesSelectionStore, _storesHistoryStore) {
  // The wireflow API:

  'use strict';

  module.exports = {
    actions: {
      CreateCheckpoint: _actionsHistory.CreateCheckpoint,
      AutoLayout: _actionsLayout.AutoLayout,
      UiUndo: _actionsHistory.UiUndo,
      UiRedo: _actionsHistory.UiRedo
    },
    stores: {
      LayoutStore: _storesLayoutStore,
      GraphStore: _storesGraphStore,
      SelectionStore: _storesSelectionStore,
      HistoryStore: _storesHistoryStore
    },
    components: {
      Graph: _componentsGraph,
      History: _componentsHistory
    },
    model: _model,
    Dispatcher: _dispatcher
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvd2lyZWZsb3cvc3JjL3dpcmVmbG93LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OzttQkFnQmU7QUFDYixXQUFPLEVBQUU7QUFDUCxzQkFBZ0Isa0JBVlgsZ0JBQWdCLEFBVUw7QUFDaEIsZ0JBQVUsaUJBVkwsVUFBVSxBQVVMO0FBQ1YsWUFBTSxrQkFaaUIsTUFBTSxBQVl2QjtBQUNOLFlBQU0sa0JBYnlCLE1BQU0sQUFhL0I7S0FDUDtBQUNELFVBQU0sRUFBRTtBQUNOLGlCQUFXLG9CQUFBO0FBQ1gsZ0JBQVUsbUJBQUE7QUFDVixvQkFBYyx1QkFBQTtBQUNkLGtCQUFZLHFCQUFBO0tBQ2I7QUFDRCxjQUFVLEVBQUU7QUFDVixXQUFLLGtCQUFBO0FBQ0wsYUFBTyxvQkFBQTtLQUNSO0FBQ0QsU0FBSyxRQUFBO0FBQ0wsY0FBVSxhQUFBO0dBQ1giLCJmaWxlIjoiL1VzZXJzL21pY2hhZWwvd29yay9naXRodWIuY29tL3gxQi93aXJlZmxvdy9zcmMvd2lyZWZsb3cuanN4Iiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSB3aXJlZmxvdyBBUEk6XG5cbmltcG9ydCAqIGFzIEdyYXBoIGZyb20gJy4vY29tcG9uZW50cy9ncmFwaCc7XG5pbXBvcnQgKiBhcyBIaXN0b3J5IGZyb20gJy4vY29tcG9uZW50cy9oaXN0b3J5JztcblxuaW1wb3J0ICogYXMgRGlzcGF0Y2hlciBmcm9tICcuL2Rpc3BhdGNoZXInO1xuaW1wb3J0ICogYXMgbW9kZWwgZnJvbSAnLi9tb2RlbCc7XG5cbmltcG9ydCB7IENyZWF0ZUNoZWNrcG9pbnQsIFVpVW5kbywgVWlSZWRvIH0gZnJvbSAnLi9hY3Rpb25zL2hpc3RvcnknO1xuaW1wb3J0IHsgQXV0b0xheW91dCB9IGZyb20gJy4vYWN0aW9ucy9sYXlvdXQnO1xuXG5pbXBvcnQgKiBhcyBMYXlvdXRTdG9yZSBmcm9tICcuL3N0b3Jlcy9sYXlvdXQtc3RvcmUnO1xuaW1wb3J0ICogYXMgR3JhcGhTdG9yZSBmcm9tICcuL3N0b3Jlcy9ncmFwaC1zdG9yZSc7XG5pbXBvcnQgKiBhcyBTZWxlY3Rpb25TdG9yZSBmcm9tICcuL3N0b3Jlcy9zZWxlY3Rpb24tc3RvcmUnO1xuaW1wb3J0ICogYXMgSGlzdG9yeVN0b3JlIGZyb20gJy4vc3RvcmVzL2hpc3Rvcnktc3RvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGFjdGlvbnM6IHtcbiAgICBDcmVhdGVDaGVja3BvaW50LFxuICAgIEF1dG9MYXlvdXQsXG4gICAgVWlVbmRvLFxuICAgIFVpUmVkb1xuICB9LFxuICBzdG9yZXM6IHtcbiAgICBMYXlvdXRTdG9yZSxcbiAgICBHcmFwaFN0b3JlLFxuICAgIFNlbGVjdGlvblN0b3JlLFxuICAgIEhpc3RvcnlTdG9yZVxuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgR3JhcGgsXG4gICAgSGlzdG9yeVxuICB9LFxuICBtb2RlbCxcbiAgRGlzcGF0Y2hlclxufTtcbiJdfQ==