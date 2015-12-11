define(['exports', 'module', './components/graph', './util/auto-layout', './util/auto-measurements', './flux/graph/graph-model', './flux/graph/graph-store', './flux/history/history-actions', './flux/history/history-store', './flux/layout/layout-actions', './flux/layout/layout-model', './flux/layout/layout-store', './flux/settings/settings-actions', './flux/settings/settings-model', './flux/settings/settings-store', './flux/selection/selection-store', './flux/dispatcher', './components/history'], function (exports, module, _componentsGraph, _utilAutoLayout, _utilAutoMeasurements, _fluxGraphGraphModel, _fluxGraphGraphStore, _fluxHistoryHistoryActions, _fluxHistoryHistoryStore, _fluxLayoutLayoutActions, _fluxLayoutLayoutModel, _fluxLayoutLayoutStore, _fluxSettingsSettingsActions, _fluxSettingsSettingsModel, _fluxSettingsSettingsStore, _fluxSelectionSelectionStore, _fluxDispatcher, _componentsHistory) {// The wireflow API:
  'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _Graph = _interopRequireDefault(_componentsGraph);var _calculateLayout = _interopRequireDefault(_utilAutoLayout);var _calculateMeasurements = _interopRequireDefault(_utilAutoMeasurements);var _graphModel = _interopRequireDefault(_fluxGraphGraphModel);var _GraphStore = _interopRequireDefault(_fluxGraphGraphStore);var _historyActions = _interopRequireDefault(_fluxHistoryHistoryActions);var _HistoryStore = _interopRequireDefault(_fluxHistoryHistoryStore);var _layoutActions = _interopRequireDefault(_fluxLayoutLayoutActions);var _layoutModel = _interopRequireDefault(_fluxLayoutLayoutModel);var _LayoutStore = _interopRequireDefault(_fluxLayoutLayoutStore);var _settingsActions = _interopRequireDefault(_fluxSettingsSettingsActions);var _settingsModel = _interopRequireDefault(_fluxSettingsSettingsModel);var _SettingsStore = _interopRequireDefault(_fluxSettingsSettingsStore);var _SelectionStore = _interopRequireDefault(_fluxSelectionSelectionStore);var _Dispatcher = _interopRequireDefault(_fluxDispatcher);var _History = _interopRequireDefault(_componentsHistory);module.exports = 


























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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93aXJlZmxvdy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCZTtBQUNiLGFBQVMsRUFBRTtBQUNULG9CQUFjLDRCQUFBLEVBQ2Y7O0FBQ0QsV0FBTyxFQUFFO0FBQ1AsYUFBTyw0QkFBZ0I7QUFDdkIsa0JBQVksMEJBQUEsRUFDYjs7QUFDRCxVQUFNLEVBQUU7QUFDTixhQUFPLDJCQUFlO0FBQ3RCLFdBQUsseUJBQWE7QUFDbEIsaUJBQVcseUJBQUEsRUFDWjs7QUFDRCxTQUFLLEVBQUU7QUFDTCxXQUFLLHdCQUFZO0FBQ2pCLGdCQUFVLHdCQUFBLEVBQ1g7O0FBQ0QsWUFBUSxFQUFFO0FBQ1IsYUFBTyw2QkFBaUI7QUFDeEIsV0FBSywyQkFBZTtBQUNwQixtQkFBYSwyQkFBQSxFQUNkOztBQUNELFFBQUksRUFBRTtBQUNKLHFCQUFlLDZCQUFBO0FBQ2YsMkJBQXFCLG1DQUFBLEVBQ3RCOztBQUNELGNBQVUsd0JBQUE7QUFDVixjQUFVLEVBQUU7QUFDVixXQUFLLG1CQUFBO0FBQ0wsYUFBTyxxQkFBQSxFQUNSLEVBQ0YiLCJmaWxlIjoid2lyZWZsb3cuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHdpcmVmbG93IEFQSTpcblxuaW1wb3J0IEdyYXBoIGZyb20gJy4vY29tcG9uZW50cy9ncmFwaCc7XG5cbmltcG9ydCBjYWxjdWxhdGVMYXlvdXQgZnJvbSAnLi91dGlsL2F1dG8tbGF5b3V0JztcbmltcG9ydCBjYWxjdWxhdGVNZWFzdXJlbWVudHMgZnJvbSAnLi91dGlsL2F1dG8tbWVhc3VyZW1lbnRzJztcblxuaW1wb3J0IGdyYXBoTW9kZWwgZnJvbSAnLi9mbHV4L2dyYXBoL2dyYXBoLW1vZGVsJztcbmltcG9ydCBHcmFwaFN0b3JlIGZyb20gJy4vZmx1eC9ncmFwaC9ncmFwaC1zdG9yZSc7XG5cbmltcG9ydCBoaXN0b3J5QWN0aW9ucyBmcm9tICcuL2ZsdXgvaGlzdG9yeS9oaXN0b3J5LWFjdGlvbnMnO1xuaW1wb3J0IEhpc3RvcnlTdG9yZSBmcm9tICcuL2ZsdXgvaGlzdG9yeS9oaXN0b3J5LXN0b3JlJztcblxuaW1wb3J0IGxheW91dEFjdGlvbnMgZnJvbSAnLi9mbHV4L2xheW91dC9sYXlvdXQtYWN0aW9ucyc7XG5pbXBvcnQgbGF5b3V0TW9kZWwgZnJvbSAnLi9mbHV4L2xheW91dC9sYXlvdXQtbW9kZWwnO1xuaW1wb3J0IExheW91dFN0b3JlIGZyb20gJy4vZmx1eC9sYXlvdXQvbGF5b3V0LXN0b3JlJztcblxuaW1wb3J0IHNldHRpbmdzQWN0aW9ucyBmcm9tICcuL2ZsdXgvc2V0dGluZ3Mvc2V0dGluZ3MtYWN0aW9ucyc7XG5pbXBvcnQgc2V0dGluZ3NNb2RlbCBmcm9tICcuL2ZsdXgvc2V0dGluZ3Mvc2V0dGluZ3MtbW9kZWwnO1xuaW1wb3J0IFNldHRpbmdzU3RvcmUgZnJvbSAnLi9mbHV4L3NldHRpbmdzL3NldHRpbmdzLXN0b3JlJztcblxuaW1wb3J0IFNlbGVjdGlvblN0b3JlIGZyb20gJy4vZmx1eC9zZWxlY3Rpb24vc2VsZWN0aW9uLXN0b3JlJztcblxuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSAnLi9mbHV4L2Rpc3BhdGNoZXInO1xuXG5pbXBvcnQgSGlzdG9yeSBmcm9tICcuL2NvbXBvbmVudHMvaGlzdG9yeSc7XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBzZWxlY3Rpb246IHtcbiAgICBTZWxlY3Rpb25TdG9yZVxuICB9LFxuICBoaXN0b3J5OiB7XG4gICAgYWN0aW9uczogaGlzdG9yeUFjdGlvbnMsXG4gICAgSGlzdG9yeVN0b3JlXG4gIH0sXG4gIGxheW91dDoge1xuICAgIGFjdGlvbnM6IGxheW91dEFjdGlvbnMsXG4gICAgbW9kZWw6IGxheW91dE1vZGVsLFxuICAgIExheW91dFN0b3JlXG4gIH0sXG4gIGdyYXBoOiB7XG4gICAgbW9kZWw6IGdyYXBoTW9kZWwsXG4gICAgR3JhcGhTdG9yZVxuICB9LFxuICBzZXR0aW5nczoge1xuICAgIGFjdGlvbnM6IHNldHRpbmdzQWN0aW9ucyxcbiAgICBtb2RlbDogc2V0dGluZ3NNb2RlbCxcbiAgICBTZXR0aW5nc1N0b3JlXG4gIH0sXG4gIHV0aWw6IHtcbiAgICBjYWxjdWxhdGVMYXlvdXQsXG4gICAgY2FsY3VsYXRlTWVhc3VyZW1lbnRzXG4gIH0sXG4gIERpc3BhdGNoZXIsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBHcmFwaCxcbiAgICBIaXN0b3J5XG4gIH1cbn07XG4iXX0=