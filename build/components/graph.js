define(['exports', 'module', 'react', 'immutable', './links', './edge', './selection-box', './vertex', './ghost-port', '../model', '../actions/layout', '../actions/selection', '../util/shallow-equal', '../util/metrics', '../util/dragdrop', '../util/keyboard'], function (exports, module, _react, _immutable, _links, _edge, _selectionBox, _vertex, _ghostPort, _model, _actionsLayout, _actionsSelection, _utilShallowEqual, _utilMetrics, _utilDragdrop, _utilKeyboard) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _count = _interopRequireDefault(_utilMetrics);

  var _dragdrop = _interopRequireDefault(_utilDragdrop);

  var _keyboard = _interopRequireDefault(_utilKeyboard);

  var abs = Math.abs;
  var min = Math.min;
  var max = Math.max;

  var Graph = _react.createClass({
    displayName: 'Graph',

    getInitialState: function getInitialState() {
      return {
        portDragInfo: null
      };
    },

    getDefaultProps: function getDefaultProps() {
      return {
        settings: (0, _model.Settings)(),
        types: (0, _immutable.Map)(),
        model: (0, _model.Graph)(),
        layout: (0, _model.Layout)(),
        zoom: 100,
        hasFocus: false
      };
    },

    render: function render() {
      var _this = this;

      (0, _count['default'])({ what: Graph.displayName });

      var self = this;
      var _props = this.props;
      var _props$model = _props.model;
      var vertices = _props$model.vertices;
      var edges = _props$model.edges;
      var types = _props.types;
      var layout = _props.layout;
      var measurements = _props.measurements;
      var selection = _props.selection;
      var zoom = _props.zoom;
      var hasFocus = _props.hasFocus;
      var settings = _props.settings;
      var className = _props.className;
      var portDragInfo = this.state.portDragInfo;

      var canvasSize = self.canvasSize(measurements, layout);

      var focusClass = hasFocus ? 'nbe-has-focus' : '';
      var highlightClass = portDragInfo ? 'nbe-highlight-type-' + portDragInfo.port.type : '';
      var classes = 'nbe-graph nbe-zoom-' + zoom + ' ' + focusClass + ' ' + highlightClass + ' ' + className;

      var dd = function dd() {
        return (0, _dragdrop['default'])({
          onMove: function onMove(_ref) {
            var _ref$dragPayload = _ref.dragPayload;
            var left = _ref$dragPayload.left;
            var top = _ref$dragPayload.top;
            var isExtension = _ref$dragPayload.isExtension;
            var dragX = _ref.dragX;
            var dragY = _ref.dragY;
            var dragNode = _ref.dragNode;

            (0, _count['default'])({ what: '!DragSelection' });
            var x = left + min(0, dragX);
            var y = top + min(0, dragY);
            var w = abs(dragX);
            var h = abs(dragY);
            _this.bubble((0, _actionsSelection.ResizeSelection)({
              isExtension: isExtension,
              coords: (0, _model.Coords)({ left: x, top: y }),
              dimensions: (0, _model.Dimensions)({ width: w, height: h })
            }));
          },
          onEnd: function onEnd() {
            return _this.bubble((0, _actionsSelection.ResizeSelection)({ coords: null, dimensions: null }));
          },
          onClick: function onClick() {
            return _this.bubble((0, _actionsSelection.ClearSelection)());
          }
        });
      };

      var startSelect = function startSelect(ev) {
        var rect = ev.currentTarget.getBoundingClientRect();
        var left = ev.clientX - rect.left;
        var top = ev.clientY - rect.top;
        var isExtension = ev.shiftKey;
        dd().start(ev, { left: left, top: top, isExtension: isExtension });
      };

      return _react.createElement(
        'div',
        { tabIndex: '0', className: classes, ref: 'graph' },
        _react.createElement(
          'div',
          { className: 'nbe-graph-viewport' },
          _react.createElement(
            'div',
            { className: 'nbe-graph-canvas', style: canvasSize },
            _react.createElement(_selectionBox, { coords: selection.coords,
              dimensions: selection.dimensions }),
            _react.createElement(
              'div',
              { className: 'nbe-graph-nodes' },
              renderEdges(),
              renderVertices()
            ),
            _react.createElement(
              'svg',
              { className: 'nbe-links', onMouseDown: startSelect },
              _react.createElement(_links, { measurements: measurements,
                types: types,
                vertices: vertices,
                edges: edges,
                layout: layout }),
              _react.createElement(_ghostPort, { dragInfo: portDragInfo })
            )
          )
        )
      );

      function renderVertices() {
        return vertices.valueSeq().map(function (vertex) {
          return _react.createElement(_vertex, { settings: settings,
            key: vertex.id,
            vertex: vertex,
            selected: selection.vertices.has(vertex.id),
            layout: layout.vertices.get(vertex.id),
            eventHandler: self.handleEvent });
        }).toJS();
      }

      function renderEdges() {
        return edges.valueSeq().filter(function (edge) {
          return !types.get(edge.type).owningPort;
        }).map(function (edge) {
          return _react.createElement(_edge, { key: edge.id,
            edge: edge,
            selected: selection.edges.has(edge.id),
            layout: layout.edges.get(edge.id),
            eventHandler: self.handleEvent });
        }).toJS();
      }
    },

    handleEvent: function handleEvent(event) {
      switch (event.type()) {
        case _actionsLayout.DragPort:
          return this.setState(function (_ref2) {
            var portDragInfo = _ref2.portDragInfo;
            return {
              portDragInfo: event.info
            };
          });

        default:
          this.bubble(event);
      }
    },

    bubble: function bubble(event) {
      var eventHandler = this.props.eventHandler;

      return eventHandler && eventHandler(event);
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utilShallowEqual)(nextState, this.state) || !(0, _utilShallowEqual)(nextProps, this.props);
    },

    canvasSize: function canvasSize(measurements, layout) {
      var w = 0;
      var h = 0;
      var padding = 50;

      var measure = function measure(nodeCoords) {
        return function (nodeMeasurements, id) {
          if (nodeCoords.hasOwnProperty(id)) {
            var _nodeMeasurements$toJS = nodeMeasurements.toJS();

            var _nodeMeasurements$toJS$dimensions = _nodeMeasurements$toJS.dimensions;
            var width = _nodeMeasurements$toJS$dimensions.width;
            var height = _nodeMeasurements$toJS$dimensions.height;
            var _nodeCoords$id = nodeCoords[id];
            var left = _nodeCoords$id.left;
            var _top = _nodeCoords$id.top;

            w = max(w, left + width);
            h = max(h, _top + height);
          }
        };
      };
      measurements.vertices.forEach(measure(layout.vertices.toJS()));
      measurements.edges.forEach(measure(layout.edges.toJS()));

      // TODO: 'font-size: 0' is a weird hack.
      // find a better way to make sure that no scrollbar is shown
      return {
        'fontSize': 0,
        'minWidth': w + padding + 'px',
        'minHeight': h + padding + 'px'
      };
    },

    componentDidMount: function componentDidMount() {
      var _this2 = this;

      var domGraph = _react.findDOMNode(this.refs.graph);
      (0, _keyboard['default'])(domGraph, this.bubble, function () {
        return _this2.props.settings.mode === _model.READ_ONLY;
      });
    }

  });

  module.exports = Graph;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9jb21wb25lbnRzL2dyYXBoLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztNQWtCUSxHQUFHLEdBQWUsSUFBSSxDQUF0QixHQUFHO01BQUUsR0FBRyxHQUFVLElBQUksQ0FBakIsR0FBRztNQUFFLEdBQUcsR0FBSyxJQUFJLENBQVosR0FBRzs7QUFHckIsTUFBTSxLQUFLLEdBQUcsT0FBTSxXQUFXLENBQUM7OztBQUU5QixtQkFBZSxFQUFBLDJCQUFHO0FBQ2hCLGFBQU87QUFDTCxvQkFBWSxFQUFFLElBQUk7T0FDbkIsQ0FBQztLQUNIOztBQUVELG1CQUFlLEVBQUEsMkJBQUc7QUFDaEIsYUFBTztBQUNMLGdCQUFRLEVBQUUsV0F0QjBDLFFBQVEsR0FzQnhDO0FBQ3BCLGFBQUssRUFBRSxlQS9CSixHQUFHLEdBK0JNO0FBQ1osYUFBSyxFQUFFLFdBeEJ3QixLQUFLLEdBd0JqQjtBQUNuQixjQUFNLEVBQUUsV0F6QkwsTUFBTSxHQXlCTztBQUNoQixZQUFJLEVBQUUsR0FBRztBQUNULGdCQUFRLEVBQUUsS0FBSztPQUNoQixDQUFDO0tBQ0g7O0FBRUQsVUFBTSxFQUFBLGtCQUFHOzs7QUFDUCw2QkFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7QUFFbkMsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO21CQVdkLElBQUksQ0FBQyxLQUFLO2dDQVRaLEtBQUs7VUFBSSxRQUFRLGdCQUFSLFFBQVE7VUFBRSxLQUFLLGdCQUFMLEtBQUs7VUFDeEIsS0FBSyxVQUFMLEtBQUs7VUFDTCxNQUFNLFVBQU4sTUFBTTtVQUNOLFlBQVksVUFBWixZQUFZO1VBQ1osU0FBUyxVQUFULFNBQVM7VUFDVCxJQUFJLFVBQUosSUFBSTtVQUNKLFFBQVEsVUFBUixRQUFRO1VBQ1IsUUFBUSxVQUFSLFFBQVE7VUFDUixTQUFTLFVB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QUFPLEdBQUksSUFBSTtBQUNoQyxtQkFBVyxFQUFFLEFBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBSSxJQUFJO09BQ2xDLENBQUM7S0FDSDs7QUFFRCxxQkFBaUIsRUFBQSw2QkFBRzs7O0FBQ2xCLFVBQU0sUUFBUSxHQUFHLE9BQU0sV0FBVyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7QUFDdEQsZ0NBQVUsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7ZUFBTSxPQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxZQXhMQyxTQUFTLEFBd0xJO09BQUEsQ0FBRSxDQUFDO0tBQ2pGOztHQUVGLENBQUMsQ0FBQzs7bUJBRVksS0FBSyIsImZpbGUiOiIvVXNlcnMvbWljaGFlbC93b3JrL2dpdGh1Yi5jb20veDFCL25iZS1yZWFjdC9zcmMvY29tcG9uZW50cy9ncmFwaC5qc3giLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0ICogYXMgTGlua3MgZnJvbSAnLi9saW5rcyc7XG5pbXBvcnQgKiBhcyBFZGdlIGZyb20gJy4vZWRnZSc7XG5pbXBvcnQgKiBhcyBTZWxlY3Rpb25Cb3ggZnJvbSAnLi9zZWxlY3Rpb24tYm94JztcbmltcG9ydCAqIGFzIFZlcnRleCBmcm9tICcuL3ZlcnRleCc7XG5pbXBvcnQgKiBhcyBHaG9zdFBvcnQgZnJvbSAnLi9naG9zdC1wb3J0JztcblxuaW1wb3J0IHsgTGF5b3V0LCBDb29yZHMsIERpbWVuc2lvbnMsIEdyYXBoIGFzIEdyYXBoTW9kZWwsIFNldHRpbmdzLCBSRUFEX09OTFkgfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQgeyBEcmFnUG9ydCB9IGZyb20gJy4uL2FjdGlvbnMvbGF5b3V0JztcbmltcG9ydCB7IFJlc2l6ZVNlbGVjdGlvbiwgQ2xlYXJTZWxlY3Rpb24gfSBmcm9tICcuLi9hY3Rpb25zL3NlbGVjdGlvbic7XG5cbmltcG9ydCAqIGFzIHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlsL3NoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IGNvdW50IGZyb20gJy4uL3V0aWwvbWV0cmljcyc7XG5pbXBvcnQgZHJhZ2Ryb3AgZnJvbSAnLi4vdXRpbC9kcmFnZHJvcCc7XG5pbXBvcnQga2V5Ym9hcmQgZnJvbSAnLi4vdXRpbC9rZXlib2FyZCc7XG5cbmNvbnN0IHsgYWJzLCBtaW4sIG1heCB9ID0gTWF0aDtcblxuXG5jb25zdCBHcmFwaCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvcnREcmFnSW5mbzogbnVsbFxuICAgIH07XG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZXR0aW5nczogU2V0dGluZ3MoKSxcbiAgICAgIHR5cGVzOiBNYXAoKSxcbiAgICAgIG1vZGVsOiBHcmFwaE1vZGVsKCksXG4gICAgICBsYXlvdXQ6IExheW91dCgpLFxuICAgICAgem9vbTogMTAwLFxuICAgICAgaGFzRm9jdXM6IGZhbHNlXG4gICAgfTtcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY291bnQoeyB3aGF0OiBHcmFwaC5kaXNwbGF5TmFtZSB9KTtcblxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IHtcbiAgICAgIG1vZGVsOiB7IHZlcnRpY2VzLCBlZGdlcyB9LFxuICAgICAgdHlwZXMsXG4gICAgICBsYXlvdXQsXG4gICAgICBtZWFzdXJlbWVudHMsXG4gICAgICBzZWxlY3Rpb24sXG4gICAgICB6b29tLFxuICAgICAgaGFzRm9jdXMsXG4gICAgICBzZXR0aW5ncyxcbiAgICAgIGNsYXNzTmFtZVxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgeyBwb3J0RHJhZ0luZm8gfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBjYW52YXNTaXplID0gc2VsZi5jYW52YXNTaXplKCBtZWFzdXJlbWVudHMsIGxheW91dCApO1xuXG4gICAgY29uc3QgZm9jdXNDbGFzcyA9XG4gICAgICBoYXNGb2N1cyA/ICduYmUtaGFzLWZvY3VzJyA6ICcnO1xuICAgIGNvbnN0IGhpZ2hsaWdodENsYXNzID1cbiAgICAgIHBvcnREcmFnSW5mbyA/IGBuYmUtaGlnaGxpZ2h0LXR5cGUtJHtwb3J0RHJhZ0luZm8ucG9ydC50eXBlfWAgOiAnJztcbiAgICBjb25zdCBjbGFzc2VzID1cbiAgICAgIGBuYmUtZ3JhcGggbmJlLXpvb20tJHt6b29tfSAke2ZvY3VzQ2xhc3N9ICR7aGlnaGxpZ2h0Q2xhc3N9ICR7Y2xhc3NOYW1lfWA7XG5cbiAgICBjb25zdCBkZCA9ICgpID0+IGRyYWdkcm9wKHtcbiAgICAgIG9uTW92ZTogKHsgZHJhZ1BheWxvYWQ6IHsgbGVmdCwgdG9wLCBpc0V4dGVuc2lvbiB9LCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgY291bnQoeyB3aGF0OiAnIURyYWdTZWxlY3Rpb24nIH0pO1xuICAgICAgICBjb25zdCB4ID0gbGVmdCArIG1pbiggMCwgZHJhZ1ggKTtcbiAgICAgICAgY29uc3QgeSA9IHRvcCArIG1pbiggMCwgZHJhZ1kgKTtcbiAgICAgICAgY29uc3QgdyA9IGFicyggZHJhZ1ggKTtcbiAgICAgICAgY29uc3QgaCA9IGFicyggZHJhZ1kgKTtcbiAgICAgICAgdGhpcy5idWJibGUoIFJlc2l6ZVNlbGVjdGlvbih7XG4gICAgICAgICAgaXNFeHRlbnNpb24sXG4gICAgICAgICAgY29vcmRzOiBDb29yZHMoeyBsZWZ0OiB4LCB0b3A6IHkgfSksXG4gICAgICAgICAgZGltZW5zaW9uczogRGltZW5zaW9ucyh7IHdpZHRoOiB3LCBoZWlnaHQ6IGggfSlcbiAgICAgICAgfSkgKTtcbiAgICAgIH0sXG4gICAgICBvbkVuZDogKCkgPT4gdGhpcy5idWJibGUoIFJlc2l6ZVNlbGVjdGlvbih7IGNvb3JkczogbnVsbCwgZGltZW5zaW9uczogbnVsbCB9KSApLFxuICAgICAgb25DbGljazogKCkgPT4gdGhpcy5idWJibGUoIENsZWFyU2VsZWN0aW9uKCkgKVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3RhcnRTZWxlY3QgPSAoIGV2ICkgPT4ge1xuICAgICAgY29uc3QgcmVjdCA9IGV2LmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCBsZWZ0ID0gZXYuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICAgIGNvbnN0IHRvcCA9IGV2LmNsaWVudFkgLSByZWN0LnRvcDtcbiAgICAgIGNvbnN0IGlzRXh0ZW5zaW9uID0gZXYuc2hpZnRLZXk7XG4gICAgICBkZCgpLnN0YXJ0KCBldiwgeyBsZWZ0LCB0b3AsIGlzRXh0ZW5zaW9uIH0gKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgdGFiSW5kZXg9XCIwXCIgY2xhc3NOYW1lPXtjbGFzc2VzfSByZWY9XCJncmFwaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1ncmFwaC12aWV3cG9ydFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLWdyYXBoLWNhbnZhc1wiIHN0eWxlPXtjYW52YXNTaXplfT5cbiAgICAgICAgICAgIDxTZWxlY3Rpb25Cb3ggY29vcmRzPXtzZWxlY3Rpb24uY29vcmRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zPXtzZWxlY3Rpb24uZGltZW5zaW9uc30gLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLWdyYXBoLW5vZGVzXCI+XG4gICAgICAgICAgICAgIHtyZW5kZXJFZGdlcygpfVxuICAgICAgICAgICAgICB7cmVuZGVyVmVydGljZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJuYmUtbGlua3NcIiBvbk1vdXNlRG93bj17c3RhcnRTZWxlY3R9PlxuICAgICAgICAgICAgICA8TGlua3MgbWVhc3VyZW1lbnRzPXttZWFzdXJlbWVudHN9XG4gICAgICAgICAgICAgICAgICAgICB0eXBlcz17dHlwZXN9XG4gICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNlcz17dmVydGljZXN9XG4gICAgICAgICAgICAgICAgICAgICBlZGdlcz17ZWRnZXN9XG4gICAgICAgICAgICAgICAgICAgICBsYXlvdXQ9e2xheW91dH0gLz5cbiAgICAgICAgICAgICAgPEdob3N0UG9ydCBkcmFnSW5mbz17cG9ydERyYWdJbmZvfSAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlclZlcnRpY2VzKCkge1xuICAgICAgcmV0dXJuIHZlcnRpY2VzLnZhbHVlU2VxKCkubWFwKCB2ZXJ0ZXggPT5cbiAgICAgICAgPFZlcnRleCBzZXR0aW5ncz17c2V0dGluZ3N9XG4gICAgICAgICAgICAgICAga2V5PXt2ZXJ0ZXguaWR9XG4gICAgICAgICAgICAgICAgdmVydGV4PXt2ZXJ0ZXh9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGlvbi52ZXJ0aWNlcy5oYXModmVydGV4LmlkKX1cbiAgICAgICAgICAgICAgICBsYXlvdXQ9e2xheW91dC52ZXJ0aWNlcy5nZXQoIHZlcnRleC5pZCApfVxuICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlcj17c2VsZi5oYW5kbGVFdmVudH0gLz5cbiAgICAgICkudG9KUygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckVkZ2VzKCkge1xuICAgICAgcmV0dXJuIGVkZ2VzLnZhbHVlU2VxKClcbiAgICAgIC5maWx0ZXIoIGVkZ2UgPT4gIXR5cGVzLmdldCggZWRnZS50eXBlICkub3duaW5nUG9ydCApXG4gICAgICAubWFwKCBlZGdlID0+XG4gICAgICAgIDxFZGdlIGtleT17ZWRnZS5pZH1cbiAgICAgICAgICAgICAgZWRnZT17ZWRnZX1cbiAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGlvbi5lZGdlcy5oYXMoZWRnZS5pZCl9XG4gICAgICAgICAgICAgIGxheW91dD17bGF5b3V0LmVkZ2VzLmdldCggZWRnZS5pZCApfVxuICAgICAgICAgICAgICBldmVudEhhbmRsZXI9e3NlbGYuaGFuZGxlRXZlbnR9IC8+XG4gICAgICApXG4gICAgICAudG9KUygpO1xuICAgIH1cbiAgfSxcblxuXG4gIGhhbmRsZUV2ZW50KCBldmVudCApIHtcbiAgICBzd2l0Y2goIGV2ZW50LnR5cGUoKSApIHtcbiAgICAgIGNhc2UgRHJhZ1BvcnQ6XG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKCAoe3BvcnREcmFnSW5mb30pID0+ICh7XG4gICAgICAgICAgcG9ydERyYWdJbmZvOiBldmVudC5pbmZvXG4gICAgICAgIH0pICk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuYnViYmxlKCBldmVudCApO1xuICAgIH1cbiAgfSxcblxuXG4gIGJ1YmJsZSggZXZlbnQgKSB7XG4gICAgY29uc3QgeyBldmVudEhhbmRsZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlciAmJiBldmVudEhhbmRsZXIoIGV2ZW50ICk7XG4gIH0sXG5cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcywgbmV4dFN0YXRlICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0U3RhdGUsIHRoaXMuc3RhdGUgKVxuICAgICAgfHwgIXNoYWxsb3dFcXVhbCggbmV4dFByb3BzLCB0aGlzLnByb3BzICk7XG4gIH0sXG5cblxuICBjYW52YXNTaXplKCBtZWFzdXJlbWVudHMsIGxheW91dCApIHtcbiAgICB2YXIgdyA9IDA7XG4gICAgdmFyIGggPSAwO1xuICAgIGNvbnN0IHBhZGRpbmcgPSA1MDtcblxuICAgIGNvbnN0IG1lYXN1cmUgPSAoIG5vZGVDb29yZHMgKSA9PiAobm9kZU1lYXN1cmVtZW50cywgaWQpID0+IHtcbiAgICAgIGlmKCBub2RlQ29vcmRzLmhhc093blByb3BlcnR5KCBpZCApICkge1xuICAgICAgICBjb25zdCB7IGRpbWVuc2lvbnM6IHsgd2lkdGgsIGhlaWdodCB9IH0gPSBub2RlTWVhc3VyZW1lbnRzLnRvSlMoKTtcbiAgICAgICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IG5vZGVDb29yZHNbIGlkIF07XG4gICAgICAgIHcgPSBtYXgoIHcsIGxlZnQgKyB3aWR0aCApO1xuICAgICAgICBoID0gbWF4KCBoLCB0b3AgKyBoZWlnaHQgKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG1lYXN1cmVtZW50cy52ZXJ0aWNlcy5mb3JFYWNoKCBtZWFzdXJlKCBsYXlvdXQudmVydGljZXMudG9KUygpICkgKTtcbiAgICBtZWFzdXJlbWVudHMuZWRnZXMuZm9yRWFjaCggbWVhc3VyZSggbGF5b3V0LmVkZ2VzLnRvSlMoKSApICk7XG5cbiAgICAvLyBUT0RPOiAnZm9udC1zaXplOiAwJyBpcyBhIHdlaXJkIGhhY2suXG4gICAgLy8gZmluZCBhIGJldHRlciB3YXkgdG8gbWFrZSBzdXJlIHRoYXQgbm8gc2Nyb2xsYmFyIGlzIHNob3duXG4gICAgcmV0dXJuIHtcbiAgICAgICdmb250U2l6ZSc6IDAsXG4gICAgICAnbWluV2lkdGgnOiAodyArIHBhZGRpbmcpICsgJ3B4JyxcbiAgICAgICdtaW5IZWlnaHQnOiAoaCArIHBhZGRpbmcpICsgJ3B4J1xuICAgIH07XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgZG9tR3JhcGggPSBSZWFjdC5maW5kRE9NTm9kZSggdGhpcy5yZWZzLmdyYXBoICk7XG4gICAga2V5Ym9hcmQoIGRvbUdyYXBoLCB0aGlzLmJ1YmJsZSwgKCkgPT4gdGhpcy5wcm9wcy5zZXR0aW5ncy5tb2RlID09PSBSRUFEX09OTFkgKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgR3JhcGg7XG4iXX0=