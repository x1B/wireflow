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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2dyYXBoLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztNQWtCUSxHQUFHLEdBQWUsSUFBSSxDQUF0QixHQUFHO01BQUUsR0FBRyxHQUFVLElBQUksQ0FBakIsR0FBRztNQUFFLEdBQUcsR0FBSyxJQUFJLENBQVosR0FBRzs7QUFHckIsTUFBTSxLQUFLLEdBQUcsT0FBTSxXQUFXLENBQUM7OztBQUU5QixtQkFBZSxFQUFBLDJCQUFHO0FBQ2hCLGFBQU87QUFDTCxvQkFBWSxFQUFFLElBQUk7T0FDbkIsQ0FBQztLQUNIOztBQUVELG1CQUFlLEVBQUEsMkJBQUc7QUFDaEIsYUFBTztBQUNMLGdCQUFRLEVBQUUsV0F0QjBDLFFBQVEsR0FzQnhDO0FBQ3BCLGFBQUssRUFBRSxlQS9CSixHQUFHLEdBK0JNO0FBQ1osYUFBSyxFQUFFLFdBeEJ3QixLQUFLLEdBd0JqQjtBQUNuQixjQUFNLEVBQUUsV0F6QkwsTUFBTSxHQXlCTztBQUNoQixZQUFJLEVBQUUsR0FBRztBQUNULGdCQUFRLEVBQUUsS0FBSztPQUNoQixDQUFDO0tBQ0g7O0FBRUQsVUFBTSxFQUFBLGtCQUFHOzs7QUFDUCw2QkFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7QUFFbkMsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO21CQVdkLElBQUksQ0FBQyxLQUFLO2dDQVRaLEtBQUs7VUFBSSxRQUFRLGdCQUFSLFFBQVE7VUFBRSxLQUFLLGdCQUFMLEtBQUs7VUFDeEIsS0FBSyxVQUFMLEtBQUs7VUFDTCxNQUFNLFVBQU4sTUFBTTtVQUNOLFlBQVksVUFBWixZQUFZO1VBQ1osU0FBUyxVQUFULFNBQVM7VUFDVCxJQUFJLFVBQUosSUFBSTtVQUNKLFFBQVEsVUFBUixRQUFRO1VBQ1IsUUFBUSxVQUFSLFFBQVE7VUFDUixTQUFTLFVBQVQsU0FBUztVQUdILFlBQVksR0FBSyxJQUFJLENBQUMsS0FBSyxD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Q0FBQztBQUN0RCxnQ0FBVSxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtlQUFNLE9BQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFlBeExDLFNBQVM7T0F3TEksQ0FBRSxDQUFDO0tBQ2pGOztHQUVGLENBQUMsQ0FBQzs7bUJBRVksS0FBSyIsImZpbGUiOiJncmFwaC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuXG5pbXBvcnQgKiBhcyBMaW5rcyBmcm9tICcuL2xpbmtzJztcbmltcG9ydCAqIGFzIEVkZ2UgZnJvbSAnLi9lZGdlJztcbmltcG9ydCAqIGFzIFNlbGVjdGlvbkJveCBmcm9tICcuL3NlbGVjdGlvbi1ib3gnO1xuaW1wb3J0ICogYXMgVmVydGV4IGZyb20gJy4vdmVydGV4JztcbmltcG9ydCAqIGFzIEdob3N0UG9ydCBmcm9tICcuL2dob3N0LXBvcnQnO1xuXG5pbXBvcnQgeyBMYXlvdXQsIENvb3JkcywgRGltZW5zaW9ucywgR3JhcGggYXMgR3JhcGhNb2RlbCwgU2V0dGluZ3MsIFJFQURfT05MWSB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7IERyYWdQb3J0IH0gZnJvbSAnLi4vYWN0aW9ucy9sYXlvdXQnO1xuaW1wb3J0IHsgUmVzaXplU2VsZWN0aW9uLCBDbGVhclNlbGVjdGlvbiB9IGZyb20gJy4uL2FjdGlvbnMvc2VsZWN0aW9uJztcblxuaW1wb3J0ICogYXMgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgY291bnQgZnJvbSAnLi4vdXRpbC9tZXRyaWNzJztcbmltcG9ydCBkcmFnZHJvcCBmcm9tICcuLi91dGlsL2RyYWdkcm9wJztcbmltcG9ydCBrZXlib2FyZCBmcm9tICcuLi91dGlsL2tleWJvYXJkJztcblxuY29uc3QgeyBhYnMsIG1pbiwgbWF4IH0gPSBNYXRoO1xuXG5cbmNvbnN0IEdyYXBoID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9ydERyYWdJbmZvOiBudWxsXG4gICAgfTtcbiAgfSxcblxuICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNldHRpbmdzOiBTZXR0aW5ncygpLFxuICAgICAgdHlwZXM6IE1hcCgpLFxuICAgICAgbW9kZWw6IEdyYXBoTW9kZWwoKSxcbiAgICAgIGxheW91dDogTGF5b3V0KCksXG4gICAgICB6b29tOiAxMDAsXG4gICAgICBoYXNGb2N1czogZmFsc2VcbiAgICB9O1xuICB9LFxuXG4gIHJlbmRlcigpIHtcbiAgICBjb3VudCh7IHdoYXQ6IEdyYXBoLmRpc3BsYXlOYW1lIH0pO1xuXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3Qge1xuICAgICAgbW9kZWw6IHsgdmVydGljZXMsIGVkZ2VzIH0sXG4gICAgICB0eXBlcyxcbiAgICAgIGxheW91dCxcbiAgICAgIG1lYXN1cmVtZW50cyxcbiAgICAgIHNlbGVjdGlvbixcbiAgICAgIHpvb20sXG4gICAgICBoYXNGb2N1cyxcbiAgICAgIHNldHRpbmdzLFxuICAgICAgY2xhc3NOYW1lXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7IHBvcnREcmFnSW5mbyB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IGNhbnZhc1NpemUgPSBzZWxmLmNhbnZhc1NpemUoIG1lYXN1cmVtZW50cywgbGF5b3V0ICk7XG5cbiAgICBjb25zdCBmb2N1c0NsYXNzID1cbiAgICAgIGhhc0ZvY3VzID8gJ25iZS1oYXMtZm9jdXMnIDogJyc7XG4gICAgY29uc3QgaGlnaGxpZ2h0Q2xhc3MgPVxuICAgICAgcG9ydERyYWdJbmZvID8gYG5iZS1oaWdobGlnaHQtdHlwZS0ke3BvcnREcmFnSW5mby5wb3J0LnR5cGV9YCA6ICcnO1xuICAgIGNvbnN0IGNsYXNzZXMgPVxuICAgICAgYG5iZS1ncmFwaCBuYmUtem9vbS0ke3pvb219ICR7Zm9jdXNDbGFzc30gJHtoaWdobGlnaHRDbGFzc30gJHtjbGFzc05hbWV9YDtcblxuICAgIGNvbnN0IGRkID0gKCkgPT4gZHJhZ2Ryb3Aoe1xuICAgICAgb25Nb3ZlOiAoeyBkcmFnUGF5bG9hZDogeyBsZWZ0LCB0b3AsIGlzRXh0ZW5zaW9uIH0sIGRyYWdYLCBkcmFnWSwgZHJhZ05vZGUgfSkgPT4ge1xuICAgICAgICBjb3VudCh7IHdoYXQ6ICchRHJhZ1NlbGVjdGlvbicgfSk7XG4gICAgICAgIGNvbnN0IHggPSBsZWZ0ICsgbWluKCAwLCBkcmFnWCApO1xuICAgICAgICBjb25zdCB5ID0gdG9wICsgbWluKCAwLCBkcmFnWSApO1xuICAgICAgICBjb25zdCB3ID0gYWJzKCBkcmFnWCApO1xuICAgICAgICBjb25zdCBoID0gYWJzKCBkcmFnWSApO1xuICAgICAgICB0aGlzLmJ1YmJsZSggUmVzaXplU2VsZWN0aW9uKHtcbiAgICAgICAgICBpc0V4dGVuc2lvbixcbiAgICAgICAgICBjb29yZHM6IENvb3Jkcyh7IGxlZnQ6IHgsIHRvcDogeSB9KSxcbiAgICAgICAgICBkaW1lbnNpb25zOiBEaW1lbnNpb25zKHsgd2lkdGg6IHcsIGhlaWdodDogaCB9KVxuICAgICAgICB9KSApO1xuICAgICAgfSxcbiAgICAgIG9uRW5kOiAoKSA9PiB0aGlzLmJ1YmJsZSggUmVzaXplU2VsZWN0aW9uKHsgY29vcmRzOiBudWxsLCBkaW1lbnNpb25zOiBudWxsIH0pICksXG4gICAgICBvbkNsaWNrOiAoKSA9PiB0aGlzLmJ1YmJsZSggQ2xlYXJTZWxlY3Rpb24oKSApXG4gICAgfSk7XG5cbiAgICBjb25zdCBzdGFydFNlbGVjdCA9ICggZXYgKSA9PiB7XG4gICAgICBjb25zdCByZWN0ID0gZXYuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGxlZnQgPSBldi5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgY29uc3QgdG9wID0gZXYuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgY29uc3QgaXNFeHRlbnNpb24gPSBldi5zaGlmdEtleTtcbiAgICAgIGRkKCkuc3RhcnQoIGV2LCB7IGxlZnQsIHRvcCwgaXNFeHRlbnNpb24gfSApO1xuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiB0YWJJbmRleD1cIjBcIiBjbGFzc05hbWU9e2NsYXNzZXN9IHJlZj1cImdyYXBoXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLWdyYXBoLXZpZXdwb3J0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtZ3JhcGgtY2FudmFzXCIgc3R5bGU9e2NhbnZhc1NpemV9PlxuICAgICAgICAgICAgPFNlbGVjdGlvbkJveCBjb29yZHM9e3NlbGVjdGlvbi5jb29yZHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM9e3NlbGVjdGlvbi5kaW1lbnNpb25zfSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtZ3JhcGgtbm9kZXNcIj5cbiAgICAgICAgICAgICAge3JlbmRlckVkZ2VzKCl9XG4gICAgICAgICAgICAgIHtyZW5kZXJWZXJ0aWNlcygpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cIm5iZS1saW5rc1wiIG9uTW91c2VEb3duPXtzdGFydFNlbGVjdH0+XG4gICAgICAgICAgICAgIDxMaW5rcyBtZWFzdXJlbWVudHM9e21lYXN1cmVtZW50c31cbiAgICAgICAgICAgICAgICAgICAgIHR5cGVzPXt0eXBlc31cbiAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2VzPXt2ZXJ0aWNlc31cbiAgICAgICAgICAgICAgICAgICAgIGVkZ2VzPXtlZGdlc31cbiAgICAgICAgICAgICAgICAgICAgIGxheW91dD17bGF5b3V0fSAvPlxuICAgICAgICAgICAgICA8R2hvc3RQb3J0IGRyYWdJbmZvPXtwb3J0RHJhZ0luZm99IC8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyVmVydGljZXMoKSB7XG4gICAgICByZXR1cm4gdmVydGljZXMudmFsdWVTZXEoKS5tYXAoIHZlcnRleCA9PlxuICAgICAgICA8VmVydGV4IHNldHRpbmdzPXtzZXR0aW5nc31cbiAgICAgICAgICAgICAgICBrZXk9e3ZlcnRleC5pZH1cbiAgICAgICAgICAgICAgICB2ZXJ0ZXg9e3ZlcnRleH1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0aW9uLnZlcnRpY2VzLmhhcyh2ZXJ0ZXguaWQpfVxuICAgICAgICAgICAgICAgIGxheW91dD17bGF5b3V0LnZlcnRpY2VzLmdldCggdmVydGV4LmlkICl9XG4gICAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyPXtzZWxmLmhhbmRsZUV2ZW50fSAvPlxuICAgICAgKS50b0pTKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRWRnZXMoKSB7XG4gICAgICByZXR1cm4gZWRnZXMudmFsdWVTZXEoKVxuICAgICAgLmZpbHRlciggZWRnZSA9PiAhdHlwZXMuZ2V0KCBlZGdlLnR5cGUgKS5vd25pbmdQb3J0IClcbiAgICAgIC5tYXAoIGVkZ2UgPT5cbiAgICAgICAgPEVkZ2Uga2V5PXtlZGdlLmlkfVxuICAgICAgICAgICAgICBlZGdlPXtlZGdlfVxuICAgICAgICAgICAgICBzZWxlY3RlZD17c2VsZWN0aW9uLmVkZ2VzLmhhcyhlZGdlLmlkKX1cbiAgICAgICAgICAgICAgbGF5b3V0PXtsYXlvdXQuZWRnZXMuZ2V0KCBlZGdlLmlkICl9XG4gICAgICAgICAgICAgIGV2ZW50SGFuZGxlcj17c2VsZi5oYW5kbGVFdmVudH0gLz5cbiAgICAgIClcbiAgICAgIC50b0pTKCk7XG4gICAgfVxuICB9LFxuXG5cbiAgaGFuZGxlRXZlbnQoIGV2ZW50ICkge1xuICAgIHN3aXRjaCggZXZlbnQudHlwZSgpICkge1xuICAgICAgY2FzZSBEcmFnUG9ydDpcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoICh7cG9ydERyYWdJbmZvfSkgPT4gKHtcbiAgICAgICAgICBwb3J0RHJhZ0luZm86IGV2ZW50LmluZm9cbiAgICAgICAgfSkgKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5idWJibGUoIGV2ZW50ICk7XG4gICAgfVxuICB9LFxuXG5cbiAgYnViYmxlKCBldmVudCApIHtcbiAgICBjb25zdCB7IGV2ZW50SGFuZGxlciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyICYmIGV2ZW50SGFuZGxlciggZXZlbnQgKTtcbiAgfSxcblxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzLCBuZXh0U3RhdGUgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSApXG4gICAgICB8fCAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfSxcblxuXG4gIGNhbnZhc1NpemUoIG1lYXN1cmVtZW50cywgbGF5b3V0ICkge1xuICAgIHZhciB3ID0gMDtcbiAgICB2YXIgaCA9IDA7XG4gICAgY29uc3QgcGFkZGluZyA9IDUwO1xuXG4gICAgY29uc3QgbWVhc3VyZSA9ICggbm9kZUNvb3JkcyApID0+IChub2RlTWVhc3VyZW1lbnRzLCBpZCkgPT4ge1xuICAgICAgaWYoIG5vZGVDb29yZHMuaGFzT3duUHJvcGVydHkoIGlkICkgKSB7XG4gICAgICAgIGNvbnN0IHsgZGltZW5zaW9uczogeyB3aWR0aCwgaGVpZ2h0IH0gfSA9IG5vZGVNZWFzdXJlbWVudHMudG9KUygpO1xuICAgICAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gbm9kZUNvb3Jkc1sgaWQgXTtcbiAgICAgICAgdyA9IG1heCggdywgbGVmdCArIHdpZHRoICk7XG4gICAgICAgIGggPSBtYXgoIGgsIHRvcCArIGhlaWdodCApO1xuICAgICAgfVxuICAgIH07XG4gICAgbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmZvckVhY2goIG1lYXN1cmUoIGxheW91dC52ZXJ0aWNlcy50b0pTKCkgKSApO1xuICAgIG1lYXN1cmVtZW50cy5lZGdlcy5mb3JFYWNoKCBtZWFzdXJlKCBsYXlvdXQuZWRnZXMudG9KUygpICkgKTtcblxuICAgIC8vIFRPRE86ICdmb250LXNpemU6IDAnIGlzIGEgd2VpcmQgaGFjay5cbiAgICAvLyBmaW5kIGEgYmV0dGVyIHdheSB0byBtYWtlIHN1cmUgdGhhdCBubyBzY3JvbGxiYXIgaXMgc2hvd25cbiAgICByZXR1cm4ge1xuICAgICAgJ2ZvbnRTaXplJzogMCxcbiAgICAgICdtaW5XaWR0aCc6ICh3ICsgcGFkZGluZykgKyAncHgnLFxuICAgICAgJ21pbkhlaWdodCc6IChoICsgcGFkZGluZykgKyAncHgnXG4gICAgfTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBkb21HcmFwaCA9IFJlYWN0LmZpbmRET01Ob2RlKCB0aGlzLnJlZnMuZ3JhcGggKTtcbiAgICBrZXlib2FyZCggZG9tR3JhcGgsIHRoaXMuYnViYmxlLCAoKSA9PiB0aGlzLnByb3BzLnNldHRpbmdzLm1vZGUgPT09IFJFQURfT05MWSApO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBHcmFwaDtcbiJdfQ==