define(['exports', 'react', './data', '../wireflow'], function (exports, _react, _data, _wireflow) {'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);var _data2 = _interopRequireDefault(_data);var _api = _interopRequireDefault(_wireflow);var 







  SelectionStore = _api['default'].selection.SelectionStore;var _api$history = _api['default'].

  history;var 
  CreateCheckpoint = _api$history.actions.CreateCheckpoint;var 
  HistoryStore = _api$history.HistoryStore;var _api$layout = _api['default'].

  layout;var 
  AutoLayout = _api$layout.actions.AutoLayout;var 
  layout = _api$layout.model.convert.layout;var 
  LayoutStore = _api$layout.LayoutStore;var _api$graph = _api['default'].

  graph;var _api$graph$model$convert = _api$graph.
  model.convert;var graph = _api$graph$model$convert.graph;var types = _api$graph$model$convert.types;var 
  GraphStore = _api$graph.GraphStore;var _api$settings = _api['default'].

  settings;var 
  ChangeMode = _api$settings.actions.ChangeMode;var _api$settings$model = _api$settings.
  model;var Settings = _api$settings$model.Settings;var READ_ONLY = _api$settings$model.READ_ONLY;var READ_WRITE = _api$settings$model.READ_WRITE;var 
  SettingsStore = _api$settings.SettingsStore;var 

  Dispatcher = _api['default'].Dispatcher;var 
  Graph = _api['default'].components.Graph;



  var dispatcher = new Dispatcher(render);
  new HistoryStore(dispatcher);
  var graphStore = new GraphStore(dispatcher, graph(_data2['default'].test.graph), types(_data2['default'].test.types));
  var layoutStore = new LayoutStore(dispatcher, graphStore, { layout: layout(_data2['default'].test.layout) });
  var settingsStore = new SettingsStore(dispatcher, Settings({ mode: READ_WRITE }));
  var selectionStore = new SelectionStore(dispatcher, layoutStore, graphStore);

  function toggleMode() {
    dispatcher.dispatch(ChangeMode({ 
      mode: settingsStore.settings.mode === READ_ONLY ? READ_WRITE : READ_ONLY }));

    render();}


  function autoLayout() {
    dispatcher.dispatch(CreateCheckpoint());
    dispatcher.dispatch(AutoLayout());
    render();}



  function render() {

    _React['default'].render(
    _React['default'].createElement('div', { className: 'demo-wrapper' }, 
    _React['default'].createElement('div', { className: 'demo-menu' }, 
    _React['default'].createElement('button', { onClick: autoLayout }, 'Auto-Layout'), 
    _React['default'].createElement('label', null, 
    _React['default'].createElement('input', { type: 'checkbox', 
      checked: settingsStore.settings.mode === READ_ONLY, 
      onChange: toggleMode }), ' Read-Only')), 


    _React['default'].createElement('div', { className: 'demo-editor' }, 
    _React['default'].createElement(Graph, { className: 'nbe-theme-fusebox-app', 
      types: graphStore.types, 
      model: graphStore.graph, 
      layout: layoutStore.layout, 
      measurements: layoutStore.measurements, 
      settings: settingsStore.settings, 
      selection: selectionStore.selection, 
      eventHandler: dispatcher.dispatch }))), 


    document.getElementById('demo-root'));}});
//# sourceMappingURL=data:application/json;base64,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SyxBQUFDO0FBQ3hCLFlBQU0sRUFBRSxXQUFXLENBQUMsTUFBTSxBQUFDO0FBQzNCLGtCQUFZLEVBQUUsV0FBVyxDQUFDLFlBQVksQUFBQztBQUN2QyxjQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVEsQUFBQztBQUNqQyxlQUFTLEVBQUUsY0FBYyxDQUFDLFNBQVMsQUFBQztBQUNwQyxrQkFBWSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEFBQUMsR0FBRyxDQUN4QyxDQUNGOzs7QUFDTixZQUFRLENBQUMsY0FBYyxDQUFFLFdBQVcsQ0FBRSxDQUN2QyxDQUFDLENBQ0giLCJmaWxlIjoiZnVzZWJveC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgZGF0YSBmcm9tICcuL2RhdGEnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi93aXJlZmxvdyc7XG5cblxuY29uc3Qge1xuICBzZWxlY3Rpb246IHtcbiAgICBTZWxlY3Rpb25TdG9yZVxuICB9LFxuICBoaXN0b3J5OiB7XG4gICAgYWN0aW9uczogeyBDcmVhdGVDaGVja3BvaW50IH0sXG4gICAgSGlzdG9yeVN0b3JlXG4gIH0sXG4gIGxheW91dDoge1xuICAgIGFjdGlvbnM6IHsgQXV0b0xheW91dCB9LFxuICAgIG1vZGVsOiB7IGNvbnZlcnQ6IHsgbGF5b3V0IH0gfSxcbiAgICBMYXlvdXRTdG9yZVxuICB9LFxuICBncmFwaDoge1xuICAgIG1vZGVsOiB7IGNvbnZlcnQ6IHsgZ3JhcGgsIHR5cGVzIH0gfSxcbiAgICBHcmFwaFN0b3JlXG4gIH0sXG4gIHNldHRpbmdzOiB7XG4gICAgYWN0aW9uczogeyBDaGFuZ2VNb2RlIH0sXG4gICAgbW9kZWw6IHsgU2V0dGluZ3MsIFJFQURfT05MWSwgUkVBRF9XUklURSB9LFxuICAgIFNldHRpbmdzU3RvcmVcbiAgfSxcbiAgRGlzcGF0Y2hlcixcbiAgY29tcG9uZW50czogeyBHcmFwaCB9XG59ID0gYXBpO1xuXG5cbmNvbnN0IGRpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlciggcmVuZGVyICk7XG5uZXcgSGlzdG9yeVN0b3JlKCBkaXNwYXRjaGVyICk7XG5jb25zdCBncmFwaFN0b3JlID0gbmV3IEdyYXBoU3RvcmUoIGRpc3BhdGNoZXIsIGdyYXBoKCBkYXRhLnRlc3QuZ3JhcGggKSwgdHlwZXMoIGRhdGEudGVzdC50eXBlcyApICk7XG5jb25zdCBsYXlvdXRTdG9yZSA9IG5ldyBMYXlvdXRTdG9yZSggZGlzcGF0Y2hlciwgZ3JhcGhTdG9yZSwgeyBsYXlvdXQ6IGxheW91dCggZGF0YS50ZXN0LmxheW91dCApIH0gKTtcbmNvbnN0IHNldHRpbmdzU3RvcmUgPSBuZXcgU2V0dGluZ3NTdG9yZSggZGlzcGF0Y2hlciwgU2V0dGluZ3MoeyBtb2RlOiBSRUFEX1dSSVRFIH0pICk7XG5jb25zdCBzZWxlY3Rpb25TdG9yZSA9IG5ldyBTZWxlY3Rpb25TdG9yZSggZGlzcGF0Y2hlciwgbGF5b3V0U3RvcmUsIGdyYXBoU3RvcmUgKTtcblxuZnVuY3Rpb24gdG9nZ2xlTW9kZSgpIHtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCggQ2hhbmdlTW9kZSh7XG4gICAgbW9kZTogc2V0dGluZ3NTdG9yZS5zZXR0aW5ncy5tb2RlID09PSBSRUFEX09OTFkgPyBSRUFEX1dSSVRFIDogUkVBRF9PTkxZXG4gIH0pICk7XG4gIHJlbmRlcigpO1xufVxuXG5mdW5jdGlvbiBhdXRvTGF5b3V0KCkge1xuICBkaXNwYXRjaGVyLmRpc3BhdGNoKCBDcmVhdGVDaGVja3BvaW50KCkgKTtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCggQXV0b0xheW91dCgpICk7XG4gIHJlbmRlcigpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcblxuICBSZWFjdC5yZW5kZXIoXG4gICAgPGRpdiBjbGFzc05hbWU9J2RlbW8td3JhcHBlcic+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZGVtby1tZW51Jz5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXthdXRvTGF5b3V0fT5BdXRvLUxheW91dDwvYnV0dG9uPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3NldHRpbmdzU3RvcmUuc2V0dGluZ3MubW9kZSA9PT0gUkVBRF9PTkxZfVxuICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dG9nZ2xlTW9kZX0gLz4gUmVhZC1Pbmx5XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdkZW1vLWVkaXRvcic+XG4gICAgICAgIDxHcmFwaCBjbGFzc05hbWU9eyduYmUtdGhlbWUtZnVzZWJveC1hcHAnfVxuICAgICAgICAgICAgICAgdHlwZXM9e2dyYXBoU3RvcmUudHlwZXN9XG4gICAgICAgICAgICAgICBtb2RlbD17Z3JhcGhTdG9yZS5ncmFwaH1cbiAgICAgICAgICAgICAgIGxheW91dD17bGF5b3V0U3RvcmUubGF5b3V0fVxuICAgICAgICAgICAgICAgbWVhc3VyZW1lbnRzPXtsYXlvdXRTdG9yZS5tZWFzdXJlbWVudHN9XG4gICAgICAgICAgICAgICBzZXR0aW5ncz17c2V0dGluZ3NTdG9yZS5zZXR0aW5nc31cbiAgICAgICAgICAgICAgIHNlbGVjdGlvbj17c2VsZWN0aW9uU3RvcmUuc2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyPXtkaXNwYXRjaGVyLmRpc3BhdGNofSAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGVtby1yb290JyApXG4gICk7XG59XG4iXX0=