define(['exports', 'module', './components/graph', './flux/graph/graph-model', './flux/graph/graph-store', './flux/history/history-actions', './flux/history/history-store', './flux/layout/layout-actions', './flux/layout/layout-model', './flux/layout/layout-store', './flux/settings/settings-actions', './flux/settings/settings-model', './flux/settings/settings-store', './flux/selection/selection-store', './flux/dispatcher', './components/history'], function (exports, module, _componentsGraph, _fluxGraphGraphModel, _fluxGraphGraphStore, _fluxHistoryHistoryActions, _fluxHistoryHistoryStore, _fluxLayoutLayoutActions, _fluxLayoutLayoutModel, _fluxLayoutLayoutStore, _fluxSettingsSettingsActions, _fluxSettingsSettingsModel, _fluxSettingsSettingsStore, _fluxSelectionSelectionStore, _fluxDispatcher, _componentsHistory) {
  // The wireflow API:

  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Graph = _interopRequireDefault(_componentsGraph);

  var _graphModel = _interopRequireDefault(_fluxGraphGraphModel);

  var _GraphStore = _interopRequireDefault(_fluxGraphGraphStore);

  var _historyActions = _interopRequireDefault(_fluxHistoryHistoryActions);

  var _HistoryStore = _interopRequireDefault(_fluxHistoryHistoryStore);

  var _layoutActions = _interopRequireDefault(_fluxLayoutLayoutActions);

  var _layoutModel = _interopRequireDefault(_fluxLayoutLayoutModel);

  var _LayoutStore = _interopRequireDefault(_fluxLayoutLayoutStore);

  var _settingsActions = _interopRequireDefault(_fluxSettingsSettingsActions);

  var _settingsModel = _interopRequireDefault(_fluxSettingsSettingsModel);

  var _SettingsStore = _interopRequireDefault(_fluxSettingsSettingsStore);

  var _SelectionStore = _interopRequireDefault(_fluxSelectionSelectionStore);

  var _Dispatcher = _interopRequireDefault(_fluxDispatcher);

  var _History = _interopRequireDefault(_componentsHistory);

  module.exports = {
    selection: {
      SelectionStore: _SelectionStore['default']
    },
    history: {
      actions: _historyActions['default'],
      HistoryStore: _HistoryStore['default']
    },
    layout: {
      actions: _layoutActions['default'],
      model: _layoutModel['default'],
      LayoutStore: _LayoutStore['default']
    },
    graph: {
      model: _graphModel['default'],
      GraphStore: _GraphStore['default']
    },
    settings: {
      actions: _settingsActions['default'],
      model: _settingsModel['default'],
      SettingsStore: _SettingsStore['default']
    },
    Dispatcher: _Dispatcher['default'],
    components: {
      Graph: _Graph['default'],
      History: _History['default']
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93aXJlZmxvdy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBeUJlO0FBQ2IsYUFBUyxFQUFFO0FBQ1Qsb0JBQWMsNEJBQUE7S0FDZjtBQUNELFdBQU8sRUFBRTtBQUNQLGFBQU8sNEJBQWdCO0FBQ3ZCLGtCQUFZLDBCQUFBO0tBQ2I7QUFDRCxVQUFNLEVBQUU7QUFDTixhQUFPLDJCQUFlO0FBQ3RCLFdBQUsseUJBQWE7QUFDbEIsaUJBQVcseUJBQUE7S0FDWjtBQUNELFNBQUssRUFBRTtBQUNMLFdBQUssd0JBQVk7QUFDakIsZ0JBQVUsd0JBQUE7S0FDWDtBQUNELFlBQVEsRUFBRTtBQUNSLGFBQU8sNkJBQWlCO0FBQ3hCLFdBQUssMkJBQWU7QUFDcEIsbUJBQWEsMkJBQUE7S0FDZDtBQUNELGNBQVUsd0JBQUE7QUFDVixjQUFVLEVBQUU7QUFDVixXQUFLLG1CQUFBO0FBQ0wsYUFBTyxxQkFBQTtLQUNSO0dBQ0YiLCJmaWxlIjoid2lyZWZsb3cuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHdpcmVmbG93IEFQSTpcblxuaW1wb3J0IEdyYXBoIGZyb20gJy4vY29tcG9uZW50cy9ncmFwaCc7XG5cbmltcG9ydCBncmFwaE1vZGVsIGZyb20gJy4vZmx1eC9ncmFwaC9ncmFwaC1tb2RlbCc7XG5pbXBvcnQgR3JhcGhTdG9yZSBmcm9tICcuL2ZsdXgvZ3JhcGgvZ3JhcGgtc3RvcmUnO1xuXG5pbXBvcnQgaGlzdG9yeUFjdGlvbnMgZnJvbSAnLi9mbHV4L2hpc3RvcnkvaGlzdG9yeS1hY3Rpb25zJztcbmltcG9ydCBIaXN0b3J5U3RvcmUgZnJvbSAnLi9mbHV4L2hpc3RvcnkvaGlzdG9yeS1zdG9yZSc7XG5cbmltcG9ydCBsYXlvdXRBY3Rpb25zIGZyb20gJy4vZmx1eC9sYXlvdXQvbGF5b3V0LWFjdGlvbnMnO1xuaW1wb3J0IGxheW91dE1vZGVsIGZyb20gJy4vZmx1eC9sYXlvdXQvbGF5b3V0LW1vZGVsJztcbmltcG9ydCBMYXlvdXRTdG9yZSBmcm9tICcuL2ZsdXgvbGF5b3V0L2xheW91dC1zdG9yZSc7XG5cbmltcG9ydCBzZXR0aW5nc0FjdGlvbnMgZnJvbSAnLi9mbHV4L3NldHRpbmdzL3NldHRpbmdzLWFjdGlvbnMnO1xuaW1wb3J0IHNldHRpbmdzTW9kZWwgZnJvbSAnLi9mbHV4L3NldHRpbmdzL3NldHRpbmdzLW1vZGVsJztcbmltcG9ydCBTZXR0aW5nc1N0b3JlIGZyb20gJy4vZmx1eC9zZXR0aW5ncy9zZXR0aW5ncy1zdG9yZSc7XG5cbmltcG9ydCBTZWxlY3Rpb25TdG9yZSBmcm9tICcuL2ZsdXgvc2VsZWN0aW9uL3NlbGVjdGlvbi1zdG9yZSc7XG5cbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJy4vZmx1eC9kaXNwYXRjaGVyJztcblxuaW1wb3J0IEhpc3RvcnkgZnJvbSAnLi9jb21wb25lbnRzL2hpc3RvcnknO1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2VsZWN0aW9uOiB7XG4gICAgU2VsZWN0aW9uU3RvcmVcbiAgfSxcbiAgaGlzdG9yeToge1xuICAgIGFjdGlvbnM6IGhpc3RvcnlBY3Rpb25zLFxuICAgIEhpc3RvcnlTdG9yZVxuICB9LFxuICBsYXlvdXQ6IHtcbiAgICBhY3Rpb25zOiBsYXlvdXRBY3Rpb25zLFxuICAgIG1vZGVsOiBsYXlvdXRNb2RlbCxcbiAgICBMYXlvdXRTdG9yZVxuICB9LFxuICBncmFwaDoge1xuICAgIG1vZGVsOiBncmFwaE1vZGVsLFxuICAgIEdyYXBoU3RvcmVcbiAgfSxcbiAgc2V0dGluZ3M6IHtcbiAgICBhY3Rpb25zOiBzZXR0aW5nc0FjdGlvbnMsXG4gICAgbW9kZWw6IHNldHRpbmdzTW9kZWwsXG4gICAgU2V0dGluZ3NTdG9yZVxuICB9LFxuICBEaXNwYXRjaGVyLFxuICBjb21wb25lbnRzOiB7XG4gICAgR3JhcGgsXG4gICAgSGlzdG9yeVxuICB9XG59O1xuIl19