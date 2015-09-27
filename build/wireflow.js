define(['exports', 'module', './components/graph', './components/history', './dispatcher', './model', './stores/layout-store', './stores/graph-store', './stores/selection-store', './stores/history-store'], function (exports, module, _componentsGraph, _componentsHistory, _dispatcher, _model, _storesLayoutStore, _storesGraphStore, _storesSelectionStore, _storesHistoryStore) {
  // The wireflow API:

  'use strict';

  module.exports = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy93aXJlZmxvdy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7bUJBYWU7QUFDYixVQUFNLEVBQUU7QUFDTixpQkFBVyxvQkFBQTtBQUNYLGdCQUFVLG1CQUFBO0FBQ1Ysb0JBQWMsdUJBQUE7QUFDZCxrQkFBWSxxQkFBQTtLQUNiO0FBQ0QsY0FBVSxFQUFFO0FBQ1YsV0FBSyxrQkFBQTtBQUNMLGFBQU8sb0JBQUE7S0FDUjtBQUNELFNBQUssUUFBQTtBQUNMLGNBQVUsYUFBQTtHQUNYIiwiZmlsZSI6Ii9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy93aXJlZmxvdy5qc3giLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHdpcmVmbG93IEFQSTpcblxuaW1wb3J0ICogYXMgR3JhcGggZnJvbSAnLi9jb21wb25lbnRzL2dyYXBoJztcbmltcG9ydCAqIGFzIEhpc3RvcnkgZnJvbSAnLi9jb21wb25lbnRzL2hpc3RvcnknO1xuXG5pbXBvcnQgKiBhcyBEaXNwYXRjaGVyIGZyb20gJy4vZGlzcGF0Y2hlcic7XG5pbXBvcnQgKiBhcyBtb2RlbCBmcm9tICcuL21vZGVsJztcblxuaW1wb3J0ICogYXMgTGF5b3V0U3RvcmUgZnJvbSAnLi9zdG9yZXMvbGF5b3V0LXN0b3JlJztcbmltcG9ydCAqIGFzIEdyYXBoU3RvcmUgZnJvbSAnLi9zdG9yZXMvZ3JhcGgtc3RvcmUnO1xuaW1wb3J0ICogYXMgU2VsZWN0aW9uU3RvcmUgZnJvbSAnLi9zdG9yZXMvc2VsZWN0aW9uLXN0b3JlJztcbmltcG9ydCAqIGFzIEhpc3RvcnlTdG9yZSBmcm9tICcuL3N0b3Jlcy9oaXN0b3J5LXN0b3JlJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdG9yZXM6IHtcbiAgICBMYXlvdXRTdG9yZSxcbiAgICBHcmFwaFN0b3JlLFxuICAgIFNlbGVjdGlvblN0b3JlLFxuICAgIEhpc3RvcnlTdG9yZVxuICB9LFxuICBjb21wb25lbnRzOiB7XG4gICAgR3JhcGgsXG4gICAgSGlzdG9yeVxuICB9LFxuICBtb2RlbCxcbiAgRGlzcGF0Y2hlclxufTtcbiJdfQ==