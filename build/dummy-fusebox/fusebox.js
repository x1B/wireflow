define(['exports', 'react', './data', '../wireflow'], function (exports, _react, _data, _wireflow) {
  'use strict';

  var Dispatcher = _wireflow.Dispatcher;
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

  var dispatcher = new Dispatcher(render);

  new HistoryStore(dispatcher);
  var graphStore = new GraphStore(dispatcher, graph, types);
  var layoutStore = new LayoutStore(dispatcher, layout, types);
  var selectionStore = new SelectionStore(dispatcher, layoutStore, graphStore);

  var settings = Settings({ mode: READ_ONLY });
  var toggleMode = function toggleMode() {
    settings = Settings({
      mode: settings.mode === READ_ONLY ? READ_WRITE : READ_ONLY
    });
    render();
  };

  function render() {
    // Later: <History checkpoints={historyStore.checkpoints } now={ historyStore.now } />

    _react.render(_react.createElement(
      'div',
      { className: 'demo-wrapper' },
      _react.createElement(
        'div',
        { className: 'demo-menu' },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvd2lyZWZsb3cvc3JjL2R1bW15LWZ1c2Vib3gvZnVzZWJveC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O01BTUUsVUFBVSxhQUFWLFVBQVU7NkJBQ1YsS0FBSztNQUFJLE9BQU8sY0FBUCxPQUFPO01BQUUsUUFBUSxjQUFSLFFBQVE7TUFBRSxTQUFTLGNBQVQsU0FBUztNQUFFLFVBQVUsY0FBVixVQUFVOzhCQUNqRCxNQUFNO01BQUksV0FBVyxlQUFYLFdBQVc7TUFBRSxVQUFVLGVBQVYsVUFBVTtNQUFFLGNBQWMsZUFBZCxjQUFjO01BQUUsWUFBWSxlQUFaLFlBQVk7TUFDakQsS0FBSyxhQUFuQixVQUFVLENBQUksS0FBSzs7O0FBS3JCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUUsTUFBSyxLQUFLLENBQUUsQ0FBQztBQUMxQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFFLE1BQUssTUFBTSxDQUFFLENBQUM7QUFDN0MsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBRSxNQUFLLEtBQUssQ0FBRSxDQUFDOztBQUUxQyxNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBRSxNQUFNLENBQUUsQ0FBQzs7QUFFNUMsTUFBSSxZQUFZLENBQUUsVUFBVSxDQUFFLENBQUM7QUFDL0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUUsQ0FBQztBQUM5RCxNQUFNLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBRSxDQUFDO0FBQ2pFLE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFFLENBQUM7O0FBR2pGLE1BQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLE1BQU0sVUFBVSxHQUFHLFNBQWIsVUFBVSxHQUFTO0FBQ3ZCLFlBQVEsR0FBRyxRQUFRLENBQUM7QUFDbEIsVUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEtBQUssU0FBUyxHQUFHLFVBQVUsR0FBRyxTQUFTO0tBQzNELENBQUMsQ0FBQztBQUNILFVBQU0sRUFBRSxDQUFDO0dBQ1YsQ0FBQzs7QUFFRixXQUFTLE1BQU0sR0FBRzs7O0FBR2hCLFdBQU0sTUFBTSxDQUNWOztRQUFLLFNBQVMsRUFBQyxjQUFjO01BQzNCOztVQUFLLFNBQVMsRUFBQyxXQUFXO1FBQ3hCOzs7VUFDRSxnQ0FBTyxJQUFJLEVBQUMsVUFBVTtBQUNmLG1CQUFPLEVBQUUsUUFBUSxDQUFDLElBQUksS0FBSyxTQUFTLEFBQUM7QUFDckMsb0JBQVEsRUFBRSxVQUFVLEFBQUMsR0FBRzs7U0FDekI7T0FDSjtNQUNOOztVQUFLLFNBQVMsRUFBQyxhQUFhO1FBQzFCLHFCQUFDLEtBQUssSUFBQyxRQUFRLEVBQUUsUUFBUSxBQUFDO0FBQ25CLG1CQUFTLEVBQUUsdUJBQXVCLEFBQUM7QUFDbkMsZUFBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEFBQUM7QUFDeEIsZUFBSyxFQUFFLEtBQUssQUFBQztBQUNiLGdCQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU0sQUFBQztBQUMzQixzQkFBWSxFQUFFLFdBQVcsQ0FBQyxZQUFZLEFBQUM7QUFDdkMsbUJBQVMsRUFBRSxjQUFjLENBQUMsU0FBUyxBQUFDO0FBQ3BDLHNCQUFZLEVBQUUsVUFBVSxDQUFDLFFBQVEsQUFBQyxHQUFHO09BQ3hDO0tBQ0YsRUFDTixRQUFRLENBQUMsY0FBYyxDQUFFLFdBQVcsQ0FBRSxDQUN2QyxDQUFDO0dBQ0giLCJmaWxlIjoiL1VzZXJzL21pY2hhZWwvd29yay9naXRodWIuY29tL3gxQi93aXJlZmxvdy9zcmMvZHVtbXktZnVzZWJveC9mdXNlYm94LmpzeCIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBkYXRhIGZyb20gJy4vZGF0YSc7XG5cbmltcG9ydCAqIGFzIGFwaSBmcm9tICcuLi93aXJlZmxvdyc7XG5cbmNvbnN0IHtcbiAgRGlzcGF0Y2hlcixcbiAgbW9kZWw6IHsgY29udmVydCwgU2V0dGluZ3MsIFJFQURfT05MWSwgUkVBRF9XUklURSB9LFxuICBzdG9yZXM6IHsgTGF5b3V0U3RvcmUsIEdyYXBoU3RvcmUsIFNlbGVjdGlvblN0b3JlLCBIaXN0b3J5U3RvcmUgfSxcbiAgY29tcG9uZW50czogeyBHcmFwaCB9XG59ID0gYXBpO1xuXG5cbi8vIGFwcGxpY2F0aW9uIHN0YXJ0aW5nIHN0YXRlOlxuY29uc3QgZ3JhcGggPSBjb252ZXJ0LmdyYXBoKCBkYXRhLmdyYXBoICk7XG5jb25zdCBsYXlvdXQgPSBjb252ZXJ0LmxheW91dCggZGF0YS5sYXlvdXQgKTtcbmNvbnN0IHR5cGVzID0gY29udmVydC50eXBlcyggZGF0YS50eXBlcyApO1xuXG5jb25zdCBkaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoIHJlbmRlciApO1xuXG5uZXcgSGlzdG9yeVN0b3JlKCBkaXNwYXRjaGVyICk7XG5jb25zdCBncmFwaFN0b3JlID0gbmV3IEdyYXBoU3RvcmUoIGRpc3BhdGNoZXIsIGdyYXBoLCB0eXBlcyApO1xuY29uc3QgbGF5b3V0U3RvcmUgPSBuZXcgTGF5b3V0U3RvcmUoIGRpc3BhdGNoZXIsIGxheW91dCwgdHlwZXMgKTtcbmNvbnN0IHNlbGVjdGlvblN0b3JlID0gbmV3IFNlbGVjdGlvblN0b3JlKCBkaXNwYXRjaGVyLCBsYXlvdXRTdG9yZSwgZ3JhcGhTdG9yZSApO1xuXG5cbnZhciBzZXR0aW5ncyA9IFNldHRpbmdzKHsgbW9kZTogUkVBRF9PTkxZIH0pO1xuY29uc3QgdG9nZ2xlTW9kZSA9ICgpID0+IHtcbiAgc2V0dGluZ3MgPSBTZXR0aW5ncyh7XG4gICAgbW9kZTogc2V0dGluZ3MubW9kZSA9PT0gUkVBRF9PTkxZID8gUkVBRF9XUklURSA6IFJFQURfT05MWVxuICB9KTtcbiAgcmVuZGVyKCk7XG59O1xuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gIC8vIExhdGVyOiA8SGlzdG9yeSBjaGVja3BvaW50cz17aGlzdG9yeVN0b3JlLmNoZWNrcG9pbnRzIH0gbm93PXsgaGlzdG9yeVN0b3JlLm5vdyB9IC8+XG5cbiAgUmVhY3QucmVuZGVyKFxuICAgIDxkaXYgY2xhc3NOYW1lPSdkZW1vLXdyYXBwZXInPlxuICAgICAgPGRpdiBjbGFzc05hbWU9J2RlbW8tbWVudSc+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgY2hlY2tlZD17c2V0dGluZ3MubW9kZSA9PT0gUkVBRF9PTkxZfVxuICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dG9nZ2xlTW9kZX0gLz4gUmVhZC1Pbmx5XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdkZW1vLWVkaXRvcic+XG4gICAgICAgIDxHcmFwaCBzZXR0aW5ncz17c2V0dGluZ3N9XG4gICAgICAgICAgICAgICBjbGFzc05hbWU9eyduYmUtdGhlbWUtZnVzZWJveC1hcHAnfVxuICAgICAgICAgICAgICAgbW9kZWw9e2dyYXBoU3RvcmUuZ3JhcGh9XG4gICAgICAgICAgICAgICB0eXBlcz17dHlwZXN9XG4gICAgICAgICAgICAgICBsYXlvdXQ9e2xheW91dFN0b3JlLmxheW91dH1cbiAgICAgICAgICAgICAgIG1lYXN1cmVtZW50cz17bGF5b3V0U3RvcmUubWVhc3VyZW1lbnRzfVxuICAgICAgICAgICAgICAgc2VsZWN0aW9uPXtzZWxlY3Rpb25TdG9yZS5zZWxlY3Rpb259XG4gICAgICAgICAgICAgICBldmVudEhhbmRsZXI9e2Rpc3BhdGNoZXIuZGlzcGF0Y2h9IC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4sXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdkZW1vLXJvb3QnIClcbiAgKTtcbn1cbiJdfQ==