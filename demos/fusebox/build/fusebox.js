define(['exports', 'react', './data', '../wireflow'], function (exports, _react, _data, _wireflow) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _data2 = _interopRequireDefault(_data);

  var _api = _interopRequireDefault(_wireflow);

  var SelectionStore = _api['default'].selection.SelectionStore;
  var _api$history = _api['default'].history;
  var CreateCheckpoint = _api$history.actions.CreateCheckpoint;
  var HistoryStore = _api$history.HistoryStore;
  var _api$layout = _api['default'].layout;
  var AutoLayout = _api$layout.actions.AutoLayout;
  var layout = _api$layout.model.convert.layout;
  var LayoutStore = _api$layout.LayoutStore;
  var _api$graph = _api['default'].graph;
  var _api$graph$model$convert = _api$graph.model.convert;
  var graph = _api$graph$model$convert.graph;
  var types = _api$graph$model$convert.types;
  var GraphStore = _api$graph.GraphStore;
  var _api$settings = _api['default'].settings;
  var ChangeMode = _api$settings.actions.ChangeMode;
  var _api$settings$model = _api$settings.model;
  var Settings = _api$settings$model.Settings;
  var READ_ONLY = _api$settings$model.READ_ONLY;
  var READ_WRITE = _api$settings$model.READ_WRITE;
  var SettingsStore = _api$settings.SettingsStore;
  var Dispatcher = _api['default'].Dispatcher;
  var Graph = _api['default'].components.Graph;

  var dispatcher = new Dispatcher(render);

  new HistoryStore(dispatcher);
  var graphStore = new GraphStore(dispatcher, graph(_data2['default'].graph), types(_data2['default'].types));
  var layoutStore = new LayoutStore(dispatcher, layout(_data2['default'].layout), graphStore);
  var settingsStore = new SettingsStore(dispatcher, Settings({ mode: READ_WRITE }));
  var selectionStore = new SelectionStore(dispatcher, layoutStore, graphStore);

  function toggleMode() {
    dispatcher.dispatch(ChangeMode({
      mode: settingsStore.settings.mode === READ_ONLY ? READ_WRITE : READ_ONLY
    }));
    render();
  }

  function autoLayout() {
    dispatcher.dispatch(CreateCheckpoint());
    dispatcher.dispatch(AutoLayout());
    render();
  }

  function render() {
    _React['default'].render(_React['default'].createElement(
      'div',
      { className: 'demo-wrapper' },
      _React['default'].createElement(
        'div',
        { className: 'demo-menu' },
        _React['default'].createElement(
          'button',
          { onClick: autoLayout },
          'Auto-Layout'
        ),
        _React['default'].createElement(
          'label',
          null,
          _React['default'].createElement('input', { type: 'checkbox',
            checked: settingsStore.settings.mode === READ_ONLY,
            onChange: toggleMode }),
          ' Read-Only'
        )
      ),
      _React['default'].createElement(
        'div',
        { className: 'demo-editor' },
        _React['default'].createElement(Graph, { className: 'nbe-theme-fusebox-app',
          types: graphStore.types,
          model: graphStore.graph,
          layout: layoutStore.layout,
          measurements: layoutStore.measurements,
          settings: settingsStore.settings,
          selection: selectionStore.selection,
          eventHandler: dispatcher.dispatch })
      )
    ), document.getElementById('demo-root'));
  }
});
//# sourceMappingURL=data:application/json;base64,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QVEsRUFBRSxhQUFhLENBQUMsUUFBUTtBQUNoQyxtQkFBUyxFQUFFLGNBQWMsQ0FBQyxTQUFTO0FBQ25DLHNCQUFZLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBSTtPQUN4QztLQUNGLEVBQ04sUUFBUSxDQUFDLGNBQWMsQ0FBRSxXQUFXLENBQUUsQ0FDdkMsQ0FBQztHQUNIIiwiZmlsZSI6ImZ1c2Vib3guanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IGRhdGEgZnJvbSAnLi9kYXRhJztcbmltcG9ydCBhcGkgZnJvbSAnLi4vd2lyZWZsb3cnO1xuXG5cbmNvbnN0IHtcbiAgc2VsZWN0aW9uOiB7XG4gICAgU2VsZWN0aW9uU3RvcmVcbiAgfSxcbiAgaGlzdG9yeToge1xuICAgIGFjdGlvbnM6IHsgQ3JlYXRlQ2hlY2twb2ludCB9LFxuICAgIEhpc3RvcnlTdG9yZVxuICB9LFxuICBsYXlvdXQ6IHtcbiAgICBhY3Rpb25zOiB7IEF1dG9MYXlvdXQgfSxcbiAgICBtb2RlbDogeyBjb252ZXJ0OiB7IGxheW91dCB9IH0sXG4gICAgTGF5b3V0U3RvcmVcbiAgfSxcbiAgZ3JhcGg6IHtcbiAgICBtb2RlbDogeyBjb252ZXJ0OiB7IGdyYXBoLCB0eXBlcyB9IH0sXG4gICAgR3JhcGhTdG9yZVxuICB9LFxuICBzZXR0aW5nczoge1xuICAgIGFjdGlvbnM6IHsgQ2hhbmdlTW9kZSB9LFxuICAgIG1vZGVsOiB7IFNldHRpbmdzLCBSRUFEX09OTFksIFJFQURfV1JJVEUgfSxcbiAgICBTZXR0aW5nc1N0b3JlXG4gIH0sXG4gIERpc3BhdGNoZXIsXG4gIGNvbXBvbmVudHM6IHsgR3JhcGggfVxufSA9IGFwaTtcblxuXG5jb25zdCBkaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoIHJlbmRlciApO1xuXG5uZXcgSGlzdG9yeVN0b3JlKCBkaXNwYXRjaGVyICk7XG5jb25zdCBncmFwaFN0b3JlID0gbmV3IEdyYXBoU3RvcmUoIGRpc3BhdGNoZXIsIGdyYXBoKCBkYXRhLmdyYXBoICksIHR5cGVzKCBkYXRhLnR5cGVzICkgKTtcbmNvbnN0IGxheW91dFN0b3JlID0gbmV3IExheW91dFN0b3JlKCBkaXNwYXRjaGVyLCBsYXlvdXQoIGRhdGEubGF5b3V0ICksIGdyYXBoU3RvcmUgKTtcbmNvbnN0IHNldHRpbmdzU3RvcmUgPSBuZXcgU2V0dGluZ3NTdG9yZSggZGlzcGF0Y2hlciwgU2V0dGluZ3MoeyBtb2RlOiBSRUFEX1dSSVRFIH0pICk7XG5jb25zdCBzZWxlY3Rpb25TdG9yZSA9IG5ldyBTZWxlY3Rpb25TdG9yZSggZGlzcGF0Y2hlciwgbGF5b3V0U3RvcmUsIGdyYXBoU3RvcmUgKTtcblxuZnVuY3Rpb24gdG9nZ2xlTW9kZSgpIHtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCggQ2hhbmdlTW9kZSh7XG4gICAgbW9kZTogc2V0dGluZ3NTdG9yZS5zZXR0aW5ncy5tb2RlID09PSBSRUFEX09OTFkgPyBSRUFEX1dSSVRFIDogUkVBRF9PTkxZXG4gIH0pICk7XG4gIHJlbmRlcigpO1xufVxuXG5mdW5jdGlvbiBhdXRvTGF5b3V0KCkge1xuICBkaXNwYXRjaGVyLmRpc3BhdGNoKCBDcmVhdGVDaGVja3BvaW50KCkgKTtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCggQXV0b0xheW91dCgpICk7XG4gIHJlbmRlcigpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgUmVhY3QucmVuZGVyKFxuICAgIDxkaXYgY2xhc3NOYW1lPSdkZW1vLXdyYXBwZXInPlxuICAgICAgPGRpdiBjbGFzc05hbWU9J2RlbW8tbWVudSc+XG4gICAgICAgIDxidXR0b24gb25DbGljaz17YXV0b0xheW91dH0+QXV0by1MYXlvdXQ8L2J1dHRvbj5cbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICBjaGVja2VkPXtzZXR0aW5nc1N0b3JlLnNldHRpbmdzLm1vZGUgPT09IFJFQURfT05MWX1cbiAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RvZ2dsZU1vZGV9IC8+IFJlYWQtT25seVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZGVtby1lZGl0b3InPlxuICAgICAgICA8R3JhcGggY2xhc3NOYW1lPXsnbmJlLXRoZW1lLWZ1c2Vib3gtYXBwJ31cbiAgICAgICAgICAgICAgIHR5cGVzPXtncmFwaFN0b3JlLnR5cGVzfVxuICAgICAgICAgICAgICAgbW9kZWw9e2dyYXBoU3RvcmUuZ3JhcGh9XG4gICAgICAgICAgICAgICBsYXlvdXQ9e2xheW91dFN0b3JlLmxheW91dH1cbiAgICAgICAgICAgICAgIG1lYXN1cmVtZW50cz17bGF5b3V0U3RvcmUubWVhc3VyZW1lbnRzfVxuICAgICAgICAgICAgICAgc2V0dGluZ3M9e3NldHRpbmdzU3RvcmUuc2V0dGluZ3N9XG4gICAgICAgICAgICAgICBzZWxlY3Rpb249e3NlbGVjdGlvblN0b3JlLnNlbGVjdGlvbn1cbiAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlcj17ZGlzcGF0Y2hlci5kaXNwYXRjaH0gLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PixcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2RlbW8tcm9vdCcgKVxuICApO1xufVxuIl19