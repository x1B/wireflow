define(['exports', 'module', 'react', 'immutable', '../util/shallow-equal', '../util/metrics', '../util/dragdrop', '../util/keyboard', './edge', './vertex', './links', './ghost-port', './selection-box', './minimap', '../flux/layout/layout-actions', '../flux/layout/layout-model', '../flux/settings/settings-model', '../flux/graph/graph-model', '../flux/settings/settings-actions', '../flux/selection/selection-actions'], function (exports, module, _react, _immutable, _utilShallowEqual, _utilMetrics, _utilDragdrop, _utilKeyboard, _edge, _vertex, _links, _ghostPort, _selectionBox, _minimap, _fluxLayoutLayoutActions, _fluxLayoutLayoutModel, _fluxSettingsSettingsModel, _fluxGraphGraphModel, _fluxSettingsSettingsActions, _fluxSelectionSelectionActions) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _shallowEqual = _interopRequireDefault(_utilShallowEqual);

  var _count = _interopRequireDefault(_utilMetrics);

  var _dragdrop = _interopRequireDefault(_utilDragdrop);

  var _keyboard = _interopRequireDefault(_utilKeyboard);

  var _Edge = _interopRequireDefault(_edge);

  var _Vertex = _interopRequireDefault(_vertex);

  var _Links = _interopRequireDefault(_links);

  var _GhostPort = _interopRequireDefault(_ghostPort);

  var _SelectionBox = _interopRequireDefault(_selectionBox);

  var _Minimap = _interopRequireDefault(_minimap);

  var abs = Math.abs;
  var min = Math.min;
  var max = Math.max;

  var Graph = _React['default'].createClass({
    displayName: 'Graph',

    getInitialState: function getInitialState() {
      return {
        portDragInfo: null
      };
    },

    getDefaultProps: function getDefaultProps() {
      return {
        settings: (0, _fluxSettingsSettingsModel.Settings)(),
        types: (0, _immutable.Map)(),
        model: (0, _fluxGraphGraphModel.Graph)(),
        layout: (0, _fluxLayoutLayoutModel.Layout)(),
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
            _this.bubble((0, _fluxSelectionSelectionActions.ResizeSelection)({
              isExtension: isExtension,
              coords: (0, _fluxLayoutLayoutModel.Coords)({ left: x, top: y }),
              dimensions: (0, _fluxLayoutLayoutModel.Dimensions)({ width: w, height: h })
            }));
          },
          onEnd: function onEnd() {
            return _this.bubble((0, _fluxSelectionSelectionActions.ResizeSelection)({ coords: null, dimensions: null }));
          },
          onClick: function onClick() {
            return _this.bubble((0, _fluxSelectionSelectionActions.ClearSelection)());
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

      var canvasSize = self.canvasSize(measurements, layout);
      // TODO: 'font-size: 0' is a weird hack.
      // find a better way to make sure that no scrollbar is shown
      var canvasStyle = {
        'fontSize': 0,
        'minWidth': canvasSize.width + 'px',
        'minHeight': canvasSize.height + 'px'
      };

      return _React['default'].createElement(
        'div',
        { tabIndex: '0', className: classes, ref: 'graph' },
        _React['default'].createElement(_Minimap['default'], { measurements: measurements,
          canvasSize: canvasSize,
          types: types,
          vertices: vertices,
          layout: layout,
          settings: settings,
          eventHandler: self.handleEvent }),
        _React['default'].createElement(
          'div',
          { className: 'nbe-graph-viewport',
            onScroll: this.handleScroll },
          _React['default'].createElement(
            'div',
            { className: 'nbe-graph-canvas', style: canvasStyle },
            _React['default'].createElement(_SelectionBox['default'], { coords: selection.coords,
              dimensions: selection.dimensions }),
            _React['default'].createElement(
              'div',
              { className: 'nbe-graph-nodes' },
              renderEdges(),
              renderVertices()
            ),
            _React['default'].createElement(
              'svg',
              { className: 'nbe-links', onMouseDown: startSelect },
              _React['default'].createElement(_Links['default'], { measurements: measurements,
                types: types,
                vertices: vertices,
                layout: layout }),
              _React['default'].createElement(_GhostPort['default'], { dragInfo: portDragInfo })
            )
          )
        )
      );

      function renderVertices() {
        return vertices.valueSeq().map(function (vertex) {
          return _React['default'].createElement(_Vertex['default'], { settings: settings,
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
          return _React['default'].createElement(_Edge['default'], { key: edge.id,
            edge: edge,
            selected: selection.edges.has(edge.id),
            layout: layout.edges.get(edge.id),
            eventHandler: self.handleEvent });
        }).toJS();
      }
    },

    handleEvent: function handleEvent(event) {
      switch (event.type()) {
        case _fluxLayoutLayoutActions.DragPort:
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
      return !(0, _shallowEqual['default'])(nextState, this.state) || !(0, _shallowEqual['default'])(nextProps, this.props);
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
      return {
        width: w + padding,
        height: h + padding
      };
    },

    measure: function measure() {
      var domGraph = _React['default'].findDOMNode(this.refs.graph);
      this.bubble((0, _fluxSettingsSettingsActions.ViewportMeasured)({
        width: domGraph.offsetWidth,
        height: domGraph.offsetHeight
      }));
    },

    handleScroll: function handleScroll(ev) {
      this.bubble((0, _fluxSettingsSettingsActions.ViewportMoved)({
        left: ev.target.scrollLeft,
        top: ev.target.scrollTop,
        by: ':GRAPH:'
      }));
    },

    componentDidMount: function componentDidMount() {
      var _this2 = this;

      this.measure();
      var domGraph = _React['default'].findDOMNode(this.refs.graph);
      window.addEventListener('resize', function () {
        return _this2.measure();
      });
      (0, _keyboard['default'])(domGraph, this.bubble, function () {
        return _this2.props.settings.mode === _fluxSettingsSettingsModel.READ_ONLY;
      });
    },

    componentDidUpdate: function componentDidUpdate() {
      var viewport = this.props.settings.viewport;

      if (viewport.movedBy === ':GRAPH:') {
        return;
      }
      var domGraph = _React['default'].findDOMNode(this.refs.graph).querySelector('.nbe-graph-viewport');
      domGraph.scrollTop = viewport.top;
      domGraph.scrollLeft = viewport.left;
    }

  });

  module.exports = Graph;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2dyYXBoLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUEyQlEsR0FBRyxHQUFlLElBQUksQ0FBdEIsR0FBRztNQUFFLEdBQUcsR0FBVSxJQUFJLENBQWpCLEdBQUc7TUFBRSxHQUFHLEdBQUssSUFBSSxDQUFaLEdBQUc7O0FBRXJCLE1BQU0sS0FBSyxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7O0FBRTlCLG1CQUFlLEVBQUEsMkJBQUc7QUFDaEIsYUFBTztBQUNMLG9CQUFZLEVBQUUsSUFBSTtPQUNuQixDQUFDO0tBQ0g7O0FBRUQsbUJBQWUsRUFBQSwyQkFBRztBQUNoQixhQUFPO0FBQ0wsZ0JBQVEsRUFBRSwrQkF0QlAsUUFBUSxHQXNCUztBQUNwQixhQUFLLEVBQUUsZUF2Q0osR0FBRyxHQXVDTTtBQUNaLGFBQUssRUFBRSx5QkF2QkosS0FBSyxHQXVCVztBQUNuQixjQUFNLEVBQUUsMkJBMUJMLE1BQU0sR0EwQk87QUFDaEIsWUFBSSxFQUFFLEdBQUc7QUFDVCxnQkFBUSxFQUFFLEtBQUs7T0FDaEIsQ0FBQztLQUNIOztBQUVELFVBQU0sRUFBQSxrQkFBRzs7O0FBQ1AsNkJBQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7O0FBRW5DLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQzttQkFXZCxJQUFJLENBQUMsS0FBSztnQ0FUWixLQUFLO1VBQUksUUFBUSxnQkFBUixRQUFRO1VBQUUsS0FBSyxnQkFBTCxLQUFLO1VBQ3hCLEtBQUssVUFBTCxLQUFLO1VBQ0wsTUFBTSxVQUFOLE1BQU07VUFDTixZQUFZLFVBQVosWUFBWTtVQUNaLFNBQVMsVUFBVCxTQUFTO1VBQ1QsSUFBSSxVQUFKLElBQUk7VUFDSixRQUFRLFVBQVIsUUFBUTtVQUNSLFFBQVEsVUFBUixRQUFRO1VBQ1IsU0FBUyxVQUFULFNBQVM7VUFHSCxZQUFZLEdBQUss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QVEsQ0FBQyxJQUFJLGdDQS9NaEQsU0FBUztPQStNcUQsQ0FBRSxDQUFDO0tBQ2pGOztBQUVELHNCQUFrQixFQUFBLDhCQUFHO1VBQ0MsUUFBUSxHQUFPLElBQUksQ0FBQyxLQUFLLENBQXJDLFFBQVEsQ0FBSSxRQUFROztBQUM1QixVQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFHO0FBQ25DLGVBQU87T0FDUjtBQUNELFVBQU0sUUFBUSxHQUFHLGtCQUNkLFdBQVcsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUM5QixhQUFhLENBQUUscUJBQXFCLENBQUUsQ0FBQztBQUMxQyxjQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7QUFDbEMsY0FBUSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0tBQ3JDOztHQUVGLENBQUMsQ0FBQzs7bUJBRVksS0FBSyIsImZpbGUiOiJncmFwaC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlsL3NoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IGNvdW50IGZyb20gJy4uL3V0aWwvbWV0cmljcyc7XG5pbXBvcnQgZHJhZ2Ryb3AgZnJvbSAnLi4vdXRpbC9kcmFnZHJvcCc7XG5pbXBvcnQga2V5Ym9hcmQgZnJvbSAnLi4vdXRpbC9rZXlib2FyZCc7XG5cbmltcG9ydCBFZGdlIGZyb20gJy4vZWRnZSc7XG5pbXBvcnQgVmVydGV4IGZyb20gJy4vdmVydGV4JztcbmltcG9ydCBMaW5rcyBmcm9tICcuL2xpbmtzJztcbmltcG9ydCBHaG9zdFBvcnQgZnJvbSAnLi9naG9zdC1wb3J0JztcbmltcG9ydCBTZWxlY3Rpb25Cb3ggZnJvbSAnLi9zZWxlY3Rpb24tYm94JztcbmltcG9ydCBNaW5pbWFwIGZyb20gJy4vbWluaW1hcCc7XG5cbmltcG9ydCB7IERyYWdQb3J0IH0gZnJvbSAnLi4vZmx1eC9sYXlvdXQvbGF5b3V0LWFjdGlvbnMnO1xuaW1wb3J0IHsgTGF5b3V0LCBDb29yZHMsIERpbWVuc2lvbnMgfSBmcm9tICcuLi9mbHV4L2xheW91dC9sYXlvdXQtbW9kZWwnO1xuaW1wb3J0IHsgU2V0dGluZ3MsIFJFQURfT05MWSB9IGZyb20gJy4uL2ZsdXgvc2V0dGluZ3Mvc2V0dGluZ3MtbW9kZWwnO1xuaW1wb3J0IHsgR3JhcGggYXMgR3JhcGhNb2RlbCB9IGZyb20gJy4uL2ZsdXgvZ3JhcGgvZ3JhcGgtbW9kZWwnO1xuaW1wb3J0IHtcbiAgVmlld3BvcnRNb3ZlZCwgVmlld3BvcnRNZWFzdXJlZFxufSBmcm9tICcuLi9mbHV4L3NldHRpbmdzL3NldHRpbmdzLWFjdGlvbnMnO1xuaW1wb3J0IHtcbiAgUmVzaXplU2VsZWN0aW9uLCBDbGVhclNlbGVjdGlvblxufSBmcm9tICcuLi9mbHV4L3NlbGVjdGlvbi9zZWxlY3Rpb24tYWN0aW9ucyc7XG5cblxuY29uc3QgeyBhYnMsIG1pbiwgbWF4IH0gPSBNYXRoO1xuXG5jb25zdCBHcmFwaCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvcnREcmFnSW5mbzogbnVsbFxuICAgIH07XG4gIH0sXG5cbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzZXR0aW5nczogU2V0dGluZ3MoKSxcbiAgICAgIHR5cGVzOiBNYXAoKSxcbiAgICAgIG1vZGVsOiBHcmFwaE1vZGVsKCksXG4gICAgICBsYXlvdXQ6IExheW91dCgpLFxuICAgICAgem9vbTogMTAwLFxuICAgICAgaGFzRm9jdXM6IGZhbHNlXG4gICAgfTtcbiAgfSxcblxuICByZW5kZXIoKSB7XG4gICAgY291bnQoeyB3aGF0OiBHcmFwaC5kaXNwbGF5TmFtZSB9KTtcblxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IHtcbiAgICAgIG1vZGVsOiB7IHZlcnRpY2VzLCBlZGdlcyB9LFxuICAgICAgdHlwZXMsXG4gICAgICBsYXlvdXQsXG4gICAgICBtZWFzdXJlbWVudHMsXG4gICAgICBzZWxlY3Rpb24sXG4gICAgICB6b29tLFxuICAgICAgaGFzRm9jdXMsXG4gICAgICBzZXR0aW5ncyxcbiAgICAgIGNsYXNzTmFtZVxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgeyBwb3J0RHJhZ0luZm8gfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBmb2N1c0NsYXNzID1cbiAgICAgIGhhc0ZvY3VzID8gJ25iZS1oYXMtZm9jdXMnIDogJyc7XG4gICAgY29uc3QgaGlnaGxpZ2h0Q2xhc3MgPVxuICAgICAgcG9ydERyYWdJbmZvID8gYG5iZS1oaWdobGlnaHQtdHlwZS0ke3BvcnREcmFnSW5mby5wb3J0LnR5cGV9YCA6ICcnO1xuICAgIGNvbnN0IGNsYXNzZXMgPVxuICAgICAgYG5iZS1ncmFwaCBuYmUtem9vbS0ke3pvb219ICR7Zm9jdXNDbGFzc30gJHtoaWdobGlnaHRDbGFzc30gJHtjbGFzc05hbWV9YDtcblxuICAgIGNvbnN0IGRkID0gKCkgPT4gZHJhZ2Ryb3Aoe1xuICAgICAgb25Nb3ZlOiAoeyBkcmFnUGF5bG9hZDogeyBsZWZ0LCB0b3AsIGlzRXh0ZW5zaW9uIH0sIGRyYWdYLCBkcmFnWSwgZHJhZ05vZGUgfSkgPT4ge1xuICAgICAgICBjb3VudCh7IHdoYXQ6ICchRHJhZ1NlbGVjdGlvbicgfSk7XG4gICAgICAgIGNvbnN0IHggPSBsZWZ0ICsgbWluKCAwLCBkcmFnWCApO1xuICAgICAgICBjb25zdCB5ID0gdG9wICsgbWluKCAwLCBkcmFnWSApO1xuICAgICAgICBjb25zdCB3ID0gYWJzKCBkcmFnWCApO1xuICAgICAgICBjb25zdCBoID0gYWJzKCBkcmFnWSApO1xuICAgICAgICB0aGlzLmJ1YmJsZSggUmVzaXplU2VsZWN0aW9uKHtcbiAgICAgICAgICBpc0V4dGVuc2lvbixcbiAgICAgICAgICBjb29yZHM6IENvb3Jkcyh7IGxlZnQ6IHgsIHRvcDogeSB9KSxcbiAgICAgICAgICBkaW1lbnNpb25zOiBEaW1lbnNpb25zKHsgd2lkdGg6IHcsIGhlaWdodDogaCB9KVxuICAgICAgICB9KSApO1xuICAgICAgfSxcbiAgICAgIG9uRW5kOiAoKSA9PiB0aGlzLmJ1YmJsZSggUmVzaXplU2VsZWN0aW9uKHsgY29vcmRzOiBudWxsLCBkaW1lbnNpb25zOiBudWxsIH0pICksXG4gICAgICBvbkNsaWNrOiAoKSA9PiB0aGlzLmJ1YmJsZSggQ2xlYXJTZWxlY3Rpb24oKSApXG4gICAgfSk7XG5cbiAgICBjb25zdCBzdGFydFNlbGVjdCA9ICggZXYgKSA9PiB7XG4gICAgICBjb25zdCByZWN0ID0gZXYuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGxlZnQgPSBldi5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgY29uc3QgdG9wID0gZXYuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgY29uc3QgaXNFeHRlbnNpb24gPSBldi5zaGlmdEtleTtcbiAgICAgIGRkKCkuc3RhcnQoIGV2LCB7IGxlZnQsIHRvcCwgaXNFeHRlbnNpb24gfSApO1xuICAgIH07XG5cbiAgICBjb25zdCBjYW52YXNTaXplID0gc2VsZi5jYW52YXNTaXplKCBtZWFzdXJlbWVudHMsIGxheW91dCApO1xuICAgIC8vIFRPRE86ICdmb250LXNpemU6IDAnIGlzIGEgd2VpcmQgaGFjay5cbiAgICAvLyBmaW5kIGEgYmV0dGVyIHdheSB0byBtYWtlIHN1cmUgdGhhdCBubyBzY3JvbGxiYXIgaXMgc2hvd25cbiAgICBjb25zdCBjYW52YXNTdHlsZSA9IHtcbiAgICAgICdmb250U2l6ZSc6IDAsXG4gICAgICAnbWluV2lkdGgnOiBjYW52YXNTaXplLndpZHRoICsgJ3B4JyxcbiAgICAgICdtaW5IZWlnaHQnOiBjYW52YXNTaXplLmhlaWdodCArICdweCdcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgdGFiSW5kZXg9XCIwXCIgY2xhc3NOYW1lPXtjbGFzc2VzfSByZWY9XCJncmFwaFwiPlxuICAgICAgICA8TWluaW1hcCBtZWFzdXJlbWVudHM9e21lYXN1cmVtZW50c31cbiAgICAgICAgICAgICAgICAgY2FudmFzU2l6ZT17Y2FudmFzU2l6ZX1cbiAgICAgICAgICAgICAgICAgdHlwZXM9e3R5cGVzfVxuICAgICAgICAgICAgICAgICB2ZXJ0aWNlcz17dmVydGljZXN9XG4gICAgICAgICAgICAgICAgIGxheW91dD17bGF5b3V0fVxuICAgICAgICAgICAgICAgICBzZXR0aW5ncz17c2V0dGluZ3N9XG4gICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlcj17c2VsZi5oYW5kbGVFdmVudH0gLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtZ3JhcGgtdmlld3BvcnRcIlxuICAgICAgICAgICAgIG9uU2Nyb2xsPXt0aGlzLmhhbmRsZVNjcm9sbH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtZ3JhcGgtY2FudmFzXCIgc3R5bGU9e2NhbnZhc1N0eWxlfT5cbiAgICAgICAgICAgIDxTZWxlY3Rpb25Cb3ggY29vcmRzPXtzZWxlY3Rpb24uY29vcmRzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBkaW1lbnNpb25zPXtzZWxlY3Rpb24uZGltZW5zaW9uc30gLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLWdyYXBoLW5vZGVzXCI+XG4gICAgICAgICAgICAgIHtyZW5kZXJFZGdlcygpfVxuICAgICAgICAgICAgICB7cmVuZGVyVmVydGljZXMoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJuYmUtbGlua3NcIiBvbk1vdXNlRG93bj17c3RhcnRTZWxlY3R9PlxuICAgICAgICAgICAgICA8TGlua3MgbWVhc3VyZW1lbnRzPXttZWFzdXJlbWVudHN9XG4gICAgICAgICAgICAgICAgICAgICB0eXBlcz17dHlwZXN9XG4gICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNlcz17dmVydGljZXN9XG4gICAgICAgICAgICAgICAgICAgICBsYXlvdXQ9e2xheW91dH0gLz5cbiAgICAgICAgICAgICAgPEdob3N0UG9ydCBkcmFnSW5mbz17cG9ydERyYWdJbmZvfSAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlclZlcnRpY2VzKCkge1xuICAgICAgcmV0dXJuIHZlcnRpY2VzLnZhbHVlU2VxKCkubWFwKCB2ZXJ0ZXggPT5cbiAgICAgICAgPFZlcnRleCBzZXR0aW5ncz17c2V0dGluZ3N9XG4gICAgICAgICAgICAgICAga2V5PXt2ZXJ0ZXguaWR9XG4gICAgICAgICAgICAgICAgdmVydGV4PXt2ZXJ0ZXh9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGlvbi52ZXJ0aWNlcy5oYXModmVydGV4LmlkKX1cbiAgICAgICAgICAgICAgICBsYXlvdXQ9e2xheW91dC52ZXJ0aWNlcy5nZXQoIHZlcnRleC5pZCApfVxuICAgICAgICAgICAgICAgIGV2ZW50SGFuZGxlcj17c2VsZi5oYW5kbGVFdmVudH0gLz5cbiAgICAgICkudG9KUygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckVkZ2VzKCkge1xuICAgICAgcmV0dXJuIGVkZ2VzLnZhbHVlU2VxKClcbiAgICAgIC5maWx0ZXIoIGVkZ2UgPT4gIXR5cGVzLmdldCggZWRnZS50eXBlICkub3duaW5nUG9ydCApXG4gICAgICAubWFwKCBlZGdlID0+XG4gICAgICAgIDxFZGdlIGtleT17ZWRnZS5pZH1cbiAgICAgICAgICAgICAgZWRnZT17ZWRnZX1cbiAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGlvbi5lZGdlcy5oYXMoZWRnZS5pZCl9XG4gICAgICAgICAgICAgIGxheW91dD17bGF5b3V0LmVkZ2VzLmdldCggZWRnZS5pZCApfVxuICAgICAgICAgICAgICBldmVudEhhbmRsZXI9e3NlbGYuaGFuZGxlRXZlbnR9IC8+XG4gICAgICApXG4gICAgICAudG9KUygpO1xuICAgIH1cbiAgfSxcblxuICBoYW5kbGVFdmVudCggZXZlbnQgKSB7XG4gICAgc3dpdGNoKCBldmVudC50eXBlKCkgKSB7XG4gICAgICBjYXNlIERyYWdQb3J0OlxuICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZSggKHtwb3J0RHJhZ0luZm99KSA9PiAoe1xuICAgICAgICAgIHBvcnREcmFnSW5mbzogZXZlbnQuaW5mb1xuICAgICAgICB9KSApO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmJ1YmJsZSggZXZlbnQgKTtcbiAgICB9XG4gIH0sXG5cbiAgYnViYmxlKCBldmVudCApIHtcbiAgICBjb25zdCB7IGV2ZW50SGFuZGxlciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyICYmIGV2ZW50SGFuZGxlciggZXZlbnQgKTtcbiAgfSxcblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcywgbmV4dFN0YXRlICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0U3RhdGUsIHRoaXMuc3RhdGUgKVxuICAgICAgfHwgIXNoYWxsb3dFcXVhbCggbmV4dFByb3BzLCB0aGlzLnByb3BzICk7XG4gIH0sXG5cbiAgY2FudmFzU2l6ZSggbWVhc3VyZW1lbnRzLCBsYXlvdXQgKSB7XG4gICAgdmFyIHcgPSAwO1xuICAgIHZhciBoID0gMDtcbiAgICBjb25zdCBwYWRkaW5nID0gNTA7XG4gICAgY29uc3QgbWVhc3VyZSA9ICggbm9kZUNvb3JkcyApID0+IChub2RlTWVhc3VyZW1lbnRzLCBpZCkgPT4ge1xuICAgICAgaWYoIG5vZGVDb29yZHMuaGFzT3duUHJvcGVydHkoIGlkICkgKSB7XG4gICAgICAgIGNvbnN0IHsgZGltZW5zaW9uczogeyB3aWR0aCwgaGVpZ2h0IH0gfSA9IG5vZGVNZWFzdXJlbWVudHMudG9KUygpO1xuICAgICAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gbm9kZUNvb3Jkc1sgaWQgXTtcbiAgICAgICAgdyA9IG1heCggdywgbGVmdCArIHdpZHRoICk7XG4gICAgICAgIGggPSBtYXgoIGgsIHRvcCArIGhlaWdodCApO1xuICAgICAgfVxuICAgIH07XG4gICAgbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmZvckVhY2goIG1lYXN1cmUoIGxheW91dC52ZXJ0aWNlcy50b0pTKCkgKSApO1xuICAgIG1lYXN1cmVtZW50cy5lZGdlcy5mb3JFYWNoKCBtZWFzdXJlKCBsYXlvdXQuZWRnZXMudG9KUygpICkgKTtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHcgKyBwYWRkaW5nLFxuICAgICAgaGVpZ2h0OiBoICsgcGFkZGluZ1xuICAgIH07XG4gIH0sXG5cbiAgbWVhc3VyZSgpIHtcbiAgICBjb25zdCBkb21HcmFwaCA9IFJlYWN0LmZpbmRET01Ob2RlKCB0aGlzLnJlZnMuZ3JhcGggKTtcbiAgICB0aGlzLmJ1YmJsZSggVmlld3BvcnRNZWFzdXJlZCh7XG4gICAgICB3aWR0aDogZG9tR3JhcGgub2Zmc2V0V2lkdGgsXG4gICAgICBoZWlnaHQ6IGRvbUdyYXBoLm9mZnNldEhlaWdodFxuICAgIH0pICk7XG4gIH0sXG5cbiAgaGFuZGxlU2Nyb2xsKCBldiApIHtcbiAgICB0aGlzLmJ1YmJsZSggVmlld3BvcnRNb3ZlZCh7XG4gICAgICBsZWZ0OiBldi50YXJnZXQuc2Nyb2xsTGVmdCxcbiAgICAgIHRvcDogZXYudGFyZ2V0LnNjcm9sbFRvcCxcbiAgICAgIGJ5OiAnOkdSQVBIOidcbiAgICB9KSApO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMubWVhc3VyZSgpO1xuICAgIGNvbnN0IGRvbUdyYXBoID0gUmVhY3QuZmluZERPTU5vZGUoIHRoaXMucmVmcy5ncmFwaCApO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgKCkgPT4gdGhpcy5tZWFzdXJlKCkgKTtcbiAgICBrZXlib2FyZCggZG9tR3JhcGgsIHRoaXMuYnViYmxlLCAoKSA9PiB0aGlzLnByb3BzLnNldHRpbmdzLm1vZGUgPT09IFJFQURfT05MWSApO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCB7IHNldHRpbmdzOiB7IHZpZXdwb3J0IH0gfSA9IHRoaXMucHJvcHM7XG4gICAgaWYoIHZpZXdwb3J0Lm1vdmVkQnkgPT09ICc6R1JBUEg6JyApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZG9tR3JhcGggPSBSZWFjdFxuICAgICAgLmZpbmRET01Ob2RlKCB0aGlzLnJlZnMuZ3JhcGggKVxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoICcubmJlLWdyYXBoLXZpZXdwb3J0JyApO1xuICAgIGRvbUdyYXBoLnNjcm9sbFRvcCA9IHZpZXdwb3J0LnRvcDtcbiAgICBkb21HcmFwaC5zY3JvbGxMZWZ0ID0gdmlld3BvcnQubGVmdDtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgR3JhcGg7XG4iXX0=