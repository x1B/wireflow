define(['exports', 'react', './data', '../wireflow'], function (exports, _react, _data, _wireflow) {
  'use strict';

  var Dispatcher = _wireflow.Dispatcher;
  var _api$actions = _wireflow.actions;
  var CreateCheckpoint = _api$actions.CreateCheckpoint;
  var AutoLayout = _api$actions.AutoLayout;
  var _api$model = _wireflow.model;
  var convert = _api$model.convert;
  var Settings = _api$model.Settings;
  var READ_ONLY = _api$model.READ_ONLY;
  var READ_WRITE = _api$model.READ_WRITE;
  var _api$stores = _wireflow.stores;
  var LayoutStore = _api$stores.LayoutStore;
  var GraphStore = _api$stores.GraphStore;
  var SelectionStore = _api$stores.SelectionStore;
  var HistoryStore = _api$stores.HistoryStore;
  var Graph = _wireflow.components.Graph;

  // application starting state:
  var graph = convert.graph(_data.graph);
  var layout = convert.layout(_data.layout);
  var types = convert.types(_data.types);
  var settings = Settings({ mode: READ_ONLY });

  var dispatcher = new Dispatcher(render);

  new HistoryStore(dispatcher);
  var graphStore = new GraphStore(dispatcher, graph, types);
  var layoutStore = new LayoutStore(dispatcher, layout, graphStore);
  var selectionStore = new SelectionStore(dispatcher, layoutStore, graphStore);

  function toggleMode() {
    settings = Settings({
      mode: settings.mode === READ_ONLY ? READ_WRITE : READ_ONLY
    });
    render();
  }

  function autoLayout() {
    dispatcher.dispatch(CreateCheckpoint());
    dispatcher.dispatch(AutoLayout());
    render();
  }

  function render() {
    // Later: <History checkpoints={historyStore.checkpoints } now={ historyStore.now } />

    _react.render(_react.createElement(
      'div',
      { className: 'demo-wrapper' },
      _react.createElement(
        'div',
        { className: 'demo-menu' },
        _react.createElement(
          'button',
          { onClick: autoLayout },
          'Auto-Layout'
        ),
        _react.createElement(
          'label',
          null,
          _react.createElement('input', { type: 'checkbox',
            checked: settings.mode === READ_ONLY,
            onChange: toggleMode }),
          ' Read-Only'
        )
      ),
      _react.createElement(
        'div',
        { className: 'demo-editor' },
        _react.createElement(Graph, { settings: settings,
          className: 'nbe-theme-fusebox-app',
          model: graphStore.graph,
          types: types,
          layout: layoutStore.layout,
          measurements: layoutStore.measurements,
          selection: selectionStore.selection,
          eventHandler: dispatcher.dispatch })
      )
    ), document.getElementById('demo-root'));
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvd2lyZWZsb3cvc3JjL2R1bW15LWZ1c2Vib3gvZnVzZWJveC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O01BTUUsVUFBVSxhQUFWLFVBQVU7K0JBQ1YsT0FBTztNQUNMLGdCQUFnQixnQkFBaEIsZ0JBQWdCO01BQ2hCLFVBQVUsZ0JBQVYsVUFBVTs2QkFFWixLQUFLO01BQ0gsT0FBTyxjQUFQLE9BQU87TUFDUCxRQUFRLGNBQVIsUUFBUTtNQUNSLFNBQVMsY0FBVCxTQUFTO01BQ1QsVUFBVSxjQUFWLFVBQVU7OEJBRVosTUFBTTtNQUNKLFdBQVcsZUFBWCxXQUFXO01BQ1gsVUFBVSxlQUFWLFVBQVU7TUFDVixjQUFjLGVBQWQsY0FBYztNQUNkLFlBQVksZUFBWixZQUFZO01BRUEsS0FBSyxhQUFuQixVQUFVLENBQUksS0FBSzs7O0FBS3JCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUUsTUFBSyxLQUFLLENBQUUsQ0FBQztBQUMxQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFFLE1BQUssTUFBTSxDQUFFLENBQUM7QUFDN0MsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBRSxNQUFLLEtBQUssQ0FBRSxDQUFDO0FBQzFDLE1BQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDOztBQUU3QyxNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBRSxNQUFNLENBQUUsQ0FBQzs7QUFFNUMsTUFBSSxZQUFZLENBQUUsVUFBVSxDQUFFLENBQUM7QUFDL0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUUsQ0FBQztBQUM5RCxNQUFNLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBRSxDQUFDO0FBQ3RFLE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFFLENBQUM7O0FBRWpGLFdBQVMsVUFBVSxHQUFHO0FBQ3BCLFlBQVEsR0FBRyxRQUFRLENBQUM7QUFDbEIsVUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEtBQUssU0FBUyxHQUFHLFVBQVUsR0FBRyxTQUFTO0tBQzNELENBQUMsQ0FBQztBQUNILFVBQU0sRUFBRSxDQUFDO0dBQ1Y7O0FBRUQsV0FBUyxVQUFVLEdBQUc7QUFDcEIsY0FBVSxDQUFDLFFBQVEsQ0FBRSxnQkFBZ0IsRUFBRSxDQUFFLENBQUM7QUFDMUMsY0FBVSxDQUFDLFFBQVEsQ0FBRSxVQUFVLEVBQUUsQ0FBRSxDQUFDO0FBQ3BDLFVBQU0sRUFBRSxDQUFDO0dBQ1Y7O0FBR0QsV0FBUyxNQUFNLEdBQUc7OztBQUdoQixXQUFNLE1BQU0sQ0FDVjs7UUFBSyxTQUFTLEVBQUMsY0FBYztNQUMzQjs7VUFBSyxTQUFTLEVBQUMsV0FBVztRQUN4Qjs7WUFBUSxPQUFPLEVBQUUsVUFBVSxBQUFDOztTQUFxQjtRQUNqRDs7O1VBQ0UsZ0NBQU8sSUFBSSxFQUFDLFVBQVU7QUFDZixtQkFBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEtBQUssU0FBUyxBQUFDO0FBQ3JDLG9CQUFRLEVBQUUsVUFBVSxBQUFDLEdBQUc7O1NBQ3pCO09BQ0o7TUFDTjs7VUFBSyxTQUFTLEVBQUMsYUFBYTtRQUMxQixxQkFBQyxLQUFLLElBQUMsUUFBUSxFQUFFLFFBQVEsQUFBQztBQUNuQixtQkFBUyxFQUFFLHVCQUF1QixBQUFDO0FBQ25DLGVBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxBQUFDO0FBQ3hCLGVBQUssRUFBRSxLQUFLLEFBQUM7QUFDYixnQkFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNLEFBQUM7QUFDM0Isc0JBQVksRUFBRSxXQUFXLENBQUMsWUFBWSxBQUFDO0FBQ3ZDLG1CQUFTLEVBQUUsY0FBYyxDQUFDLFNBQVMsQUFBQztBQUNwQyxzQkFBWSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEFBQUMsR0FBRztPQUN4QztLQUNGLEVBQ04sUUFBUSxDQUFDLGNBQWMsQ0FBRSxXQUFXLENBQUUsQ0FDdkMsQ0FBQztHQUNIIiwiZmlsZSI6Ii9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvd2lyZWZsb3cvc3JjL2R1bW15LWZ1c2Vib3gvZnVzZWJveC5qc3giLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgZGF0YSBmcm9tICcuL2RhdGEnO1xuXG5pbXBvcnQgKiBhcyBhcGkgZnJvbSAnLi4vd2lyZWZsb3cnO1xuXG5jb25zdCB7XG4gIERpc3BhdGNoZXIsXG4gIGFjdGlvbnM6IHtcbiAgICBDcmVhdGVDaGVja3BvaW50LFxuICAgIEF1dG9MYXlvdXRcbiAgfSxcbiAgbW9kZWw6IHtcbiAgICBjb252ZXJ0LFxuICAgIFNldHRpbmdzLFxuICAgIFJFQURfT05MWSxcbiAgICBSRUFEX1dSSVRFXG4gIH0sXG4gIHN0b3Jlczoge1xuICAgIExheW91dFN0b3JlLFxuICAgIEdyYXBoU3RvcmUsXG4gICAgU2VsZWN0aW9uU3RvcmUsXG4gICAgSGlzdG9yeVN0b3JlXG4gIH0sXG4gIGNvbXBvbmVudHM6IHsgR3JhcGggfVxufSA9IGFwaTtcblxuXG4vLyBhcHBsaWNhdGlvbiBzdGFydGluZyBzdGF0ZTpcbmNvbnN0IGdyYXBoID0gY29udmVydC5ncmFwaCggZGF0YS5ncmFwaCApO1xuY29uc3QgbGF5b3V0ID0gY29udmVydC5sYXlvdXQoIGRhdGEubGF5b3V0ICk7XG5jb25zdCB0eXBlcyA9IGNvbnZlcnQudHlwZXMoIGRhdGEudHlwZXMgKTtcbnZhciBzZXR0aW5ncyA9IFNldHRpbmdzKHsgbW9kZTogUkVBRF9PTkxZIH0pO1xuXG5jb25zdCBkaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoIHJlbmRlciApO1xuXG5uZXcgSGlzdG9yeVN0b3JlKCBkaXNwYXRjaGVyICk7XG5jb25zdCBncmFwaFN0b3JlID0gbmV3IEdyYXBoU3RvcmUoIGRpc3BhdGNoZXIsIGdyYXBoLCB0eXBlcyApO1xuY29uc3QgbGF5b3V0U3RvcmUgPSBuZXcgTGF5b3V0U3RvcmUoIGRpc3BhdGNoZXIsIGxheW91dCwgZ3JhcGhTdG9yZSApO1xuY29uc3Qgc2VsZWN0aW9uU3RvcmUgPSBuZXcgU2VsZWN0aW9uU3RvcmUoIGRpc3BhdGNoZXIsIGxheW91dFN0b3JlLCBncmFwaFN0b3JlICk7XG5cbmZ1bmN0aW9uIHRvZ2dsZU1vZGUoKSB7XG4gIHNldHRpbmdzID0gU2V0dGluZ3Moe1xuICAgIG1vZGU6IHNldHRpbmdzLm1vZGUgPT09IFJFQURfT05MWSA/IFJFQURfV1JJVEUgOiBSRUFEX09OTFlcbiAgfSk7XG4gIHJlbmRlcigpO1xufVxuXG5mdW5jdGlvbiBhdXRvTGF5b3V0KCkge1xuICBkaXNwYXRjaGVyLmRpc3BhdGNoKCBDcmVhdGVDaGVja3BvaW50KCkgKTtcbiAgZGlzcGF0Y2hlci5kaXNwYXRjaCggQXV0b0xheW91dCgpICk7XG4gIHJlbmRlcigpO1xufVxuXG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgLy8gTGF0ZXI6IDxIaXN0b3J5IGNoZWNrcG9pbnRzPXtoaXN0b3J5U3RvcmUuY2hlY2twb2ludHMgfSBub3c9eyBoaXN0b3J5U3RvcmUubm93IH0gLz5cblxuICBSZWFjdC5yZW5kZXIoXG4gICAgPGRpdiBjbGFzc05hbWU9J2RlbW8td3JhcHBlcic+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZGVtby1tZW51Jz5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXthdXRvTGF5b3V0fT5BdXRvLUxheW91dDwvYnV0dG9uPlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3NldHRpbmdzLm1vZGUgPT09IFJFQURfT05MWX1cbiAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RvZ2dsZU1vZGV9IC8+IFJlYWQtT25seVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZGVtby1lZGl0b3InPlxuICAgICAgICA8R3JhcGggc2V0dGluZ3M9e3NldHRpbmdzfVxuICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnbmJlLXRoZW1lLWZ1c2Vib3gtYXBwJ31cbiAgICAgICAgICAgICAgIG1vZGVsPXtncmFwaFN0b3JlLmdyYXBofVxuICAgICAgICAgICAgICAgdHlwZXM9e3R5cGVzfVxuICAgICAgICAgICAgICAgbGF5b3V0PXtsYXlvdXRTdG9yZS5sYXlvdXR9XG4gICAgICAgICAgICAgICBtZWFzdXJlbWVudHM9e2xheW91dFN0b3JlLm1lYXN1cmVtZW50c31cbiAgICAgICAgICAgICAgIHNlbGVjdGlvbj17c2VsZWN0aW9uU3RvcmUuc2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyPXtkaXNwYXRjaGVyLmRpc3BhdGNofSAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZGVtby1yb290JyApXG4gICk7XG59XG4iXX0=