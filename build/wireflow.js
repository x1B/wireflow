define(['exports', 'module', './components/graph', './util/auto-layout', './util/auto-measurements', './flux/graph/graph-actions', './flux/graph/graph-model', './flux/graph/graph-store', './flux/history/history-actions', './flux/history/history-store', './flux/layout/layout-actions', './flux/layout/layout-model', './flux/layout/layout-store', './flux/settings/settings-actions', './flux/settings/settings-model', './flux/settings/settings-store', './flux/selection/selection-store', './flux/dispatcher', './components/history'], function (exports, module, _componentsGraph, _utilAutoLayout, _utilAutoMeasurements, _fluxGraphGraphActions, _fluxGraphGraphModel, _fluxGraphGraphStore, _fluxHistoryHistoryActions, _fluxHistoryHistoryStore, _fluxLayoutLayoutActions, _fluxLayoutLayoutModel, _fluxLayoutLayoutStore, _fluxSettingsSettingsActions, _fluxSettingsSettingsModel, _fluxSettingsSettingsStore, _fluxSelectionSelectionStore, _fluxDispatcher, _componentsHistory) {// The wireflow API:
  'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _Graph = _interopRequireDefault(_componentsGraph);var _calculateLayout = _interopRequireDefault(_utilAutoLayout);var _calculateMeasurements = _interopRequireDefault(_utilAutoMeasurements);var _graphActions = _interopRequireDefault(_fluxGraphGraphActions);var _graphModel = _interopRequireDefault(_fluxGraphGraphModel);var _GraphStore = _interopRequireDefault(_fluxGraphGraphStore);var _historyActions = _interopRequireDefault(_fluxHistoryHistoryActions);var _HistoryStore = _interopRequireDefault(_fluxHistoryHistoryStore);var _layoutActions = _interopRequireDefault(_fluxLayoutLayoutActions);var _layoutModel = _interopRequireDefault(_fluxLayoutLayoutModel);var _LayoutStore = _interopRequireDefault(_fluxLayoutLayoutStore);var _settingsActions = _interopRequireDefault(_fluxSettingsSettingsActions);var _settingsModel = _interopRequireDefault(_fluxSettingsSettingsModel);var _SettingsStore = _interopRequireDefault(_fluxSettingsSettingsStore);var _SelectionStore = _interopRequireDefault(_fluxSelectionSelectionStore);var _Dispatcher = _interopRequireDefault(_fluxDispatcher);var _History = _interopRequireDefault(_componentsHistory);module.exports = 



























  { 
    selection: { 
      SelectionStore: _SelectionStore['default'] }, 

    history: { 
      actions: _historyActions['default'], 
      HistoryStore: _HistoryStore['default'] }, 

    layout: { 
      actions: _layoutActions['default'], 
      model: _layoutModel['default'], 
      LayoutStore: _LayoutStore['default'] }, 

    graph: { 
      actions: _graphActions['default'], 
      model: _graphModel['default'], 
      GraphStore: _GraphStore['default'] }, 

    settings: { 
      actions: _settingsActions['default'], 
      model: _settingsModel['default'], 
      SettingsStore: _SettingsStore['default'] }, 

    util: { 
      calculateLayout: _calculateLayout['default'], 
      calculateMeasurements: _calculateMeasurements['default'] }, 

    Dispatcher: _Dispatcher['default'], 
    components: { 
      Graph: _Graph['default'], 
      History: _History['default'] } };});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93aXJlZmxvdy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QmU7QUFDYixhQUFTLEVBQUU7QUFDVCxvQkFBYyw0QkFBQSxFQUNmOztBQUNELFdBQU8sRUFBRTtBQUNQLGFBQU8sNEJBQWdCO0FBQ3ZCLGtCQUFZLDBCQUFBLEVBQ2I7O0FBQ0QsVUFBTSxFQUFFO0FBQ04sYUFBTywyQkFBZTtBQUN0QixXQUFLLHlCQUFhO0FBQ2xCLGlCQUFXLHlCQUFBLEVBQ1o7O0FBQ0QsU0FBSyxFQUFFO0FBQ0wsYUFBTywwQkFBYztBQUNyQixXQUFLLHdCQUFZO0FBQ2pCLGdCQUFVLHdCQUFBLEVBQ1g7O0FBQ0QsWUFBUSxFQUFFO0FBQ1IsYUFBTyw2QkFBaUI7QUFDeEIsV0FBSywyQkFBZTtBQUNwQixtQkFBYSwyQkFBQSxFQUNkOztBQUNELFFBQUksRUFBRTtBQUNKLHFCQUFlLDZCQUFBO0FBQ2YsMkJBQXFCLG1DQUFBLEVBQ3RCOztBQUNELGNBQVUsd0JBQUE7QUFDVixjQUFVLEVBQUU7QUFDVixXQUFLLG1CQUFBO0FBQ0wsYUFBTyxxQkFBQSxFQUNSLEVBQ0YiLCJmaWxlIjoid2lyZWZsb3cuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHdpcmVmbG93IEFQSTpcblxuaW1wb3J0IEdyYXBoIGZyb20gJy4vY29tcG9uZW50cy9ncmFwaCc7XG5cbmltcG9ydCBjYWxjdWxhdGVMYXlvdXQgZnJvbSAnLi91dGlsL2F1dG8tbGF5b3V0JztcbmltcG9ydCBjYWxjdWxhdGVNZWFzdXJlbWVudHMgZnJvbSAnLi91dGlsL2F1dG8tbWVhc3VyZW1lbnRzJztcblxuaW1wb3J0IGdyYXBoQWN0aW9ucyBmcm9tICcuL2ZsdXgvZ3JhcGgvZ3JhcGgtYWN0aW9ucyc7XG5pbXBvcnQgZ3JhcGhNb2RlbCBmcm9tICcuL2ZsdXgvZ3JhcGgvZ3JhcGgtbW9kZWwnO1xuaW1wb3J0IEdyYXBoU3RvcmUgZnJvbSAnLi9mbHV4L2dyYXBoL2dyYXBoLXN0b3JlJztcblxuaW1wb3J0IGhpc3RvcnlBY3Rpb25zIGZyb20gJy4vZmx1eC9oaXN0b3J5L2hpc3RvcnktYWN0aW9ucyc7XG5pbXBvcnQgSGlzdG9yeVN0b3JlIGZyb20gJy4vZmx1eC9oaXN0b3J5L2hpc3Rvcnktc3RvcmUnO1xuXG5pbXBvcnQgbGF5b3V0QWN0aW9ucyBmcm9tICcuL2ZsdXgvbGF5b3V0L2xheW91dC1hY3Rpb25zJztcbmltcG9ydCBsYXlvdXRNb2RlbCBmcm9tICcuL2ZsdXgvbGF5b3V0L2xheW91dC1tb2RlbCc7XG5pbXBvcnQgTGF5b3V0U3RvcmUgZnJvbSAnLi9mbHV4L2xheW91dC9sYXlvdXQtc3RvcmUnO1xuXG5pbXBvcnQgc2V0dGluZ3NBY3Rpb25zIGZyb20gJy4vZmx1eC9zZXR0aW5ncy9zZXR0aW5ncy1hY3Rpb25zJztcbmltcG9ydCBzZXR0aW5nc01vZGVsIGZyb20gJy4vZmx1eC9zZXR0aW5ncy9zZXR0aW5ncy1tb2RlbCc7XG5pbXBvcnQgU2V0dGluZ3NTdG9yZSBmcm9tICcuL2ZsdXgvc2V0dGluZ3Mvc2V0dGluZ3Mtc3RvcmUnO1xuXG5pbXBvcnQgU2VsZWN0aW9uU3RvcmUgZnJvbSAnLi9mbHV4L3NlbGVjdGlvbi9zZWxlY3Rpb24tc3RvcmUnO1xuXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL2ZsdXgvZGlzcGF0Y2hlcic7XG5cbmltcG9ydCBIaXN0b3J5IGZyb20gJy4vY29tcG9uZW50cy9oaXN0b3J5JztcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNlbGVjdGlvbjoge1xuICAgIFNlbGVjdGlvblN0b3JlXG4gIH0sXG4gIGhpc3Rvcnk6IHtcbiAgICBhY3Rpb25zOiBoaXN0b3J5QWN0aW9ucyxcbiAgICBIaXN0b3J5U3RvcmVcbiAgfSxcbiAgbGF5b3V0OiB7XG4gICAgYWN0aW9uczogbGF5b3V0QWN0aW9ucyxcbiAgICBtb2RlbDogbGF5b3V0TW9kZWwsXG4gICAgTGF5b3V0U3RvcmVcbiAgfSxcbiAgZ3JhcGg6IHtcbiAgICBhY3Rpb25zOiBncmFwaEFjdGlvbnMsXG4gICAgbW9kZWw6IGdyYXBoTW9kZWwsXG4gICAgR3JhcGhTdG9yZVxuICB9LFxuICBzZXR0aW5nczoge1xuICAgIGFjdGlvbnM6IHNldHRpbmdzQWN0aW9ucyxcbiAgICBtb2RlbDogc2V0dGluZ3NNb2RlbCxcbiAgICBTZXR0aW5nc1N0b3JlXG4gIH0sXG4gIHV0aWw6IHtcbiAgICBjYWxjdWxhdGVMYXlvdXQsXG4gICAgY2FsY3VsYXRlTWVhc3VyZW1lbnRzXG4gIH0sXG4gIERpc3BhdGNoZXIsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBHcmFwaCxcbiAgICBIaXN0b3J5XG4gIH1cbn07XG4iXX0=