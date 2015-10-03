define(['exports', 'module', 'react', '../util/dragdrop', '../util/shallow-equal', '../util/metrics', '../flux/history/history-actions', '../flux/graph/graph-model', '../flux/layout/layout-model', '../flux/layout/layout-actions', '../flux/selection/selection-actions', './port'], function (exports, module, _react, _utilDragdrop, _utilShallowEqual, _utilMetrics, _fluxHistoryHistoryActions, _fluxGraphGraphModel, _fluxLayoutLayoutModel, _fluxLayoutLayoutActions, _fluxSelectionSelectionActions, _port) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _dragdrop = _interopRequireDefault(_utilDragdrop);

  var _shallowEqual = _interopRequireDefault(_utilShallowEqual);

  var _count = _interopRequireDefault(_utilMetrics);

  var _layoutActions = _interopRequireDefault(_fluxLayoutLayoutActions);

  var _Port = _interopRequireDefault(_port);

  var MeasureVertex = _layoutActions['default'].MeasureVertex;
  var MeasurePort = _layoutActions['default'].MeasurePort;
  var MoveVertex = _layoutActions['default'].MoveVertex;
  var VertexMeasurements = _layoutActions['default'].payload.VertexMeasurements;

  var Vertex = _React['default'].createClass({
    displayName: 'Vertex',

    getInitialState: function getInitialState() {
      return {
        measurements: VertexMeasurements()
      };
    },

    render: function render() {
      var _this = this;

      var self = this;
      var _self$props = self.props;
      var vertex = _self$props.vertex;
      var selected = _self$props.selected;
      var layout = _self$props.layout;
      var eventHandler = _self$props.eventHandler;
      var settings = _self$props.settings;

      (0, _count['default'])({ what: Vertex.displayName });
      var ports = vertex.ports;
      var label = vertex.label;

      var style = {
        position: 'absolute', // :TODO: move to stylesheet
        visibility: layout ? 'visible' : 'hidden',
        left: layout.left,
        top: layout.top
      };

      var selectedClass = selected ? 'nbe-selected' : '';
      var classes = 'nbe-vertex nbe-node ' + selectedClass;

      var dd = function dd() {
        return (0, _dragdrop['default'])({
          onStart: function onStart() {
            _this.bubble((0, _fluxHistoryHistoryActions.CreateCheckpoint)({ before: 'Move Vertex' }));
          },
          onMove: function onMove(_ref) {
            var dragPayload = _ref.dragPayload;
            var dragX = _ref.dragX;
            var dragY = _ref.dragY;
            var dragNode = _ref.dragNode;

            if (selected) {
              eventHandler((0, _fluxSelectionSelectionActions.MoveSelection)({
                reference: dragPayload,
                offset: (0, _fluxLayoutLayoutModel.Coords)({ left: dragX, top: dragY })
              }));
            } else {
              var _dragPayload$coords = dragPayload.coords;
              var left = _dragPayload$coords.left;
              var _top = _dragPayload$coords.top;

              eventHandler(MoveVertex({
                vertex: vertex,
                to: (0, _fluxLayoutLayoutModel.Coords)({ left: left + dragX, top: _top + dragY })
              }));
            }
          },
          onClick: function onClick(ev) {
            if (ev.shiftKey) {
              _this.bubble((selected ? _fluxSelectionSelectionActions.DeselectVertex : _fluxSelectionSelectionActions.SelectVertex)({ vertex: vertex }));
            } else {
              _this.bubble((0, _fluxSelectionSelectionActions.ClearSelection)());
              _this.bubble((0, _fluxSelectionSelectionActions.SelectVertex)({ vertex: vertex }));
            }
          }
        });
      };

      var startDrag = function startDrag(ev) {
        return dd().start(ev, { coords: layout, id: {} });
      };

      return _React['default'].createElement(
        'div',
        { style: style, className: classes, ref: 'vertex',
          onMouseDown: startDrag },
        _React['default'].createElement(
          'div',
          { className: 'nbe-vertex-header' },
          label
        ),
        _React['default'].createElement(
          'div',
          { className: 'nbe-port-group' },
          _React['default'].createElement(
            'div',
            { className: 'nbe-ports nbe-inbound' },
            renderPorts(_fluxGraphGraphModel.IN)
          ),
          _React['default'].createElement(
            'div',
            { className: 'nbe-ports nbe-outbound' },
            renderPorts(_fluxGraphGraphModel.OUT)
          )
        )
      );

      function renderPorts(direction) {
        return ports[direction].map(function (port) {
          return _React['default'].createElement(_Port['default'], { key: port.id,
            port: port,
            vertex: vertex,
            eventHandler: self.handleEvent,
            settings: settings });
        }).toJS();
      }
    },

    handleEvent: function handleEvent(event) {
      var _this2 = this;

      var type = event.type();
      if (type === MeasurePort) {
        var _ret = (function () {
          var port = event.port;
          var center = event.center;

          _this2.setState(function (_ref2) {
            var measurements = _ref2.measurements;

            var newMeasurements = measurements.setIn([port.direction, port.id], center);
            _this2.propagateMeasurements(newMeasurements);
            return { measurements: newMeasurements };
          });
          return {
            v: undefined
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      }
      this.bubble(event);
    },

    bubble: function bubble(event) {
      var eventHandler = this.props.eventHandler;

      return eventHandler && eventHandler(event);
    },

    propagateMeasurements: function propagateMeasurements(measurements) {
      if (this.isComplete(measurements)) {
        var vertex = this.props.vertex;

        this.bubble(MeasureVertex({ vertex: vertex, measurements: measurements }));
      }
    },

    isComplete: function isComplete(measurements) {
      var ports = this.props.vertex.ports;

      return measurements.dimensions && measurements.inbound.size === ports.inbound.size && measurements.outbound.size === ports.outbound.size;
    },

    measure: function measure() {
      var _this3 = this;

      var domVertex = _React['default'].findDOMNode(this.refs.vertex);
      this.setState(function (_ref3) {
        var measurements = _ref3.measurements;

        var newMeasurements = measurements.set('dimensions', (0, _fluxLayoutLayoutModel.Dimensions)({
          width: domVertex.offsetWidth,
          height: domVertex.offsetHeight
        }));
        _this3.propagateMeasurements(newMeasurements);
        return { measurements: newMeasurements };
      });
    },

    componentDidMount: function componentDidMount() {
      this.measure();
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shallowEqual['default'])(nextState, this.state) || !(0, _shallowEqual['default'])(nextProps, this.props);
    }

  });

  module.exports = Vertex;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3ZlcnRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFrQkUsYUFBYSw2QkFBYixhQUFhO01BQUUsV0FBVyw2QkFBWCxXQUFXO01BQUUsVUFBVSw2QkFBVixVQUFVO01BQWEsa0JBQWtCLDZCQUE3QixPQUFPLENBQUksa0JBQWtCOztBQUd2RSxNQUFNLE1BQU0sR0FBRyxrQkFBTSxXQUFXLENBQUM7OztBQUUvQixtQkFBZSxFQUFBLDJCQUFHO0FBQ2hCLGFBQU87QUFDTCxvQkFBWSxFQUFFLGtCQUFrQixFQUFFO09BQ25DLENBQUM7S0FDSDs7QUFHRCxVQUFNLEVBQUEsa0JBQUc7OztBQUNQLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDMkMsSUFBSSxDQUFDLEtBQUs7VUFBL0QsTUFBTSxlQUFOLE1BQU07VUFBRSxRQUFRLGVBQVIsUUFBUTtVQUFFLE1BQU0sZUFBTixNQUFNO1VBQUUsWUFBWSxlQUFaLFlBQVk7VUFBRSxRQUFRLGVBQVIsUUFBUTs7QUFDeEQsNkJBQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7VUFDNUIsS0FBSyxHQUFZLE1BQU0sQ0FBdkIsS0FBSztVQUFFLEtBQUssR0FBSyxNQUFNLENBQWhCLEtBQUs7O0FBRXBCLFVBQU0sS0FBSyxHQUFHO0FBQ1osZ0JBQVEsRUFBRSxVQUFVO0FBQ3BCLGtCQUFVLEVBQUUsTUFBTSxHQUFHLFNBQVMsR0FBRyxRQUFRO0FBQ3pDLFlBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtBQUNqQixXQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7T0FDaEIsQ0FBQzs7QUFFRixVQUFNLGFBQWEsR0FBRyxRQUFRLEdBQUcsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUNyRCxVQUFNLE9BQU8sNEJBQTBCLGFBQWEsQ0FBRzs7QUFFdkQsVUFBTSxFQUFFLEdBQUcsU0FBTCxFQUFFO2VBQVMsMEJBQVM7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b3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgZHJhZ2Ryb3AgZnJvbSAnLi4vdXRpbC9kcmFnZHJvcCc7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgY291bnQgZnJvbSAnLi4vdXRpbC9tZXRyaWNzJztcblxuaW1wb3J0IHsgQ3JlYXRlQ2hlY2twb2ludCB9IGZyb20gJy4uL2ZsdXgvaGlzdG9yeS9oaXN0b3J5LWFjdGlvbnMnO1xuaW1wb3J0IHsgSU4sIE9VVCB9IGZyb20gJy4uL2ZsdXgvZ3JhcGgvZ3JhcGgtbW9kZWwnO1xuaW1wb3J0IHsgQ29vcmRzLCBEaW1lbnNpb25zIH0gZnJvbSAnLi4vZmx1eC9sYXlvdXQvbGF5b3V0LW1vZGVsJztcbmltcG9ydCBsYXlvdXRBY3Rpb25zIGZyb20gJy4uL2ZsdXgvbGF5b3V0L2xheW91dC1hY3Rpb25zJztcbmltcG9ydCB7XG4gIENsZWFyU2VsZWN0aW9uLCBTZWxlY3RWZXJ0ZXgsIERlc2VsZWN0VmVydGV4LCBNb3ZlU2VsZWN0aW9uXG59IGZyb20gJy4uL2ZsdXgvc2VsZWN0aW9uL3NlbGVjdGlvbi1hY3Rpb25zJztcblxuaW1wb3J0IFBvcnQgZnJvbSAnLi9wb3J0JztcblxuXG5jb25zdCB7XG4gIE1lYXN1cmVWZXJ0ZXgsIE1lYXN1cmVQb3J0LCBNb3ZlVmVydGV4LCBwYXlsb2FkOiB7IFZlcnRleE1lYXN1cmVtZW50cyB9XG59ID0gbGF5b3V0QWN0aW9ucztcblxuY29uc3QgVmVydGV4ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVhc3VyZW1lbnRzOiBWZXJ0ZXhNZWFzdXJlbWVudHMoKVxuICAgIH07XG4gIH0sXG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgeyB2ZXJ0ZXgsIHNlbGVjdGVkLCBsYXlvdXQsIGV2ZW50SGFuZGxlciwgc2V0dGluZ3MgfSA9IHNlbGYucHJvcHM7XG4gICAgY291bnQoeyB3aGF0OiBWZXJ0ZXguZGlzcGxheU5hbWUgfSk7XG4gICAgY29uc3QgeyBwb3J0cywgbGFiZWwgfSA9IHZlcnRleDtcblxuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIC8vIDpUT0RPOiBtb3ZlIHRvIHN0eWxlc2hlZXRcbiAgICAgIHZpc2liaWxpdHk6IGxheW91dCA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nLFxuICAgICAgbGVmdDogbGF5b3V0LmxlZnQsXG4gICAgICB0b3A6IGxheW91dC50b3BcbiAgICB9O1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRDbGFzcyA9IHNlbGVjdGVkID8gJ25iZS1zZWxlY3RlZCcgOiAnJztcbiAgICBjb25zdCBjbGFzc2VzID0gYG5iZS12ZXJ0ZXggbmJlLW5vZGUgJHtzZWxlY3RlZENsYXNzfWA7XG5cbiAgICBjb25zdCBkZCA9ICgpID0+IGRyYWdkcm9wKHtcbiAgICAgIG9uU3RhcnQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5idWJibGUoIENyZWF0ZUNoZWNrcG9pbnQoeyBiZWZvcmU6ICdNb3ZlIFZlcnRleCcgfSkgKTtcbiAgICAgIH0sXG4gICAgICBvbk1vdmU6ICh7IGRyYWdQYXlsb2FkLCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgaWYoIHNlbGVjdGVkICkge1xuICAgICAgICAgIGV2ZW50SGFuZGxlciggTW92ZVNlbGVjdGlvbih7XG4gICAgICAgICAgICByZWZlcmVuY2U6IGRyYWdQYXlsb2FkLFxuICAgICAgICAgICAgb2Zmc2V0OiBDb29yZHMoeyBsZWZ0OiBkcmFnWCwgdG9wOiBkcmFnWSB9KVxuICAgICAgICAgIH0pICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IGRyYWdQYXlsb2FkLmNvb3JkcztcbiAgICAgICAgICBldmVudEhhbmRsZXIoIE1vdmVWZXJ0ZXgoe1xuICAgICAgICAgICAgdmVydGV4OiB2ZXJ0ZXgsXG4gICAgICAgICAgICB0bzogQ29vcmRzKHsgbGVmdDogbGVmdCArIGRyYWdYLCB0b3A6IHRvcCArIGRyYWdZIH0pXG4gICAgICAgICAgfSkgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6ICggZXYgKSA9PiB7XG4gICAgICAgIGlmKCBldi5zaGlmdEtleSApIHtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggKHNlbGVjdGVkID8gRGVzZWxlY3RWZXJ0ZXggOiBTZWxlY3RWZXJ0ZXgpKHsgdmVydGV4IH0pICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIENsZWFyU2VsZWN0aW9uKCkgKTtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggU2VsZWN0VmVydGV4KHsgdmVydGV4IH0pICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0RHJhZyA9ICggZXYgKSA9PiBkZCgpLnN0YXJ0KCBldiwgeyBjb29yZHM6IGxheW91dCwgaWQ6IHt9IH0gKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc2VzfSByZWY9XCJ2ZXJ0ZXhcIlxuICAgICAgICAgICBvbk1vdXNlRG93bj17c3RhcnREcmFnfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtdmVydGV4LWhlYWRlclwiPntsYWJlbH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtcG9ydC1ncm91cFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLXBvcnRzIG5iZS1pbmJvdW5kXCI+XG4gICAgICAgICAgICB7cmVuZGVyUG9ydHMoIElOICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtcG9ydHMgbmJlLW91dGJvdW5kXCI+XG4gICAgICAgICAgICB7cmVuZGVyUG9ydHMoIE9VVCApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBmdW5jdGlvbiByZW5kZXJQb3J0cyggZGlyZWN0aW9uICkge1xuICAgICAgcmV0dXJuIHBvcnRzWyBkaXJlY3Rpb24gXS5tYXAoIHBvcnQgPT5cbiAgICAgICAgPFBvcnQga2V5PXtwb3J0LmlkfVxuICAgICAgICAgICAgICBwb3J0PXtwb3J0fVxuICAgICAgICAgICAgICB2ZXJ0ZXg9e3ZlcnRleH1cbiAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyPXtzZWxmLmhhbmRsZUV2ZW50fVxuICAgICAgICAgICAgICBzZXR0aW5ncz17c2V0dGluZ3N9IC8+ICkudG9KUygpO1xuICAgIH1cbiAgfSxcblxuXG4gIGhhbmRsZUV2ZW50KCBldmVudCApIHtcbiAgICB2YXIgdHlwZSA9IGV2ZW50LnR5cGUoKTtcbiAgICBpZiggdHlwZSA9PT0gTWVhc3VyZVBvcnQgKSB7XG4gICAgICBjb25zdCB7IHBvcnQsIGNlbnRlciB9ID0gZXZlbnQ7XG4gICAgICB0aGlzLnNldFN0YXRlKCAoeyBtZWFzdXJlbWVudHMgfSkgPT4ge1xuICAgICAgICB2YXIgbmV3TWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRzLnNldEluKCBbIHBvcnQuZGlyZWN0aW9uLCBwb3J0LmlkIF0sIGNlbnRlciApO1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZU1lYXN1cmVtZW50cyggbmV3TWVhc3VyZW1lbnRzICk7XG4gICAgICAgIHJldHVybiB7IG1lYXN1cmVtZW50czogbmV3TWVhc3VyZW1lbnRzIH07XG4gICAgICB9ICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYnViYmxlKCBldmVudCApO1xuICB9LFxuXG5cbiAgYnViYmxlKCBldmVudCApIHtcbiAgICBjb25zdCB7IGV2ZW50SGFuZGxlciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyICYmIGV2ZW50SGFuZGxlciggZXZlbnQgKTtcbiAgfSxcblxuXG4gIHByb3BhZ2F0ZU1lYXN1cmVtZW50cyggbWVhc3VyZW1lbnRzICkge1xuICAgIGlmKCB0aGlzLmlzQ29tcGxldGUoIG1lYXN1cmVtZW50cyApICkge1xuICAgICAgdmFyIHsgdmVydGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgdGhpcy5idWJibGUoIE1lYXN1cmVWZXJ0ZXgoIHsgdmVydGV4LCBtZWFzdXJlbWVudHMgfSApICk7XG4gICAgfVxuICB9LFxuXG5cbiAgaXNDb21wbGV0ZSggbWVhc3VyZW1lbnRzICkge1xuICAgIGNvbnN0IHsgcG9ydHMgfSA9IHRoaXMucHJvcHMudmVydGV4O1xuICAgIHJldHVybiBtZWFzdXJlbWVudHMuZGltZW5zaW9uc1xuICAgICAgJiYgbWVhc3VyZW1lbnRzLmluYm91bmQuc2l6ZSA9PT0gcG9ydHMuaW5ib3VuZC5zaXplXG4gICAgICAmJiBtZWFzdXJlbWVudHMub3V0Ym91bmQuc2l6ZSA9PT0gcG9ydHMub3V0Ym91bmQuc2l6ZTtcbiAgfSxcblxuXG4gIG1lYXN1cmUoKSB7XG4gICAgY29uc3QgZG9tVmVydGV4ID0gUmVhY3QuZmluZERPTU5vZGUoIHRoaXMucmVmcy52ZXJ0ZXggKTtcbiAgICB0aGlzLnNldFN0YXRlKCAoeyBtZWFzdXJlbWVudHMgfSkgPT4ge1xuICAgICAgY29uc3QgbmV3TWVhc3VyZW1lbnRzID1cbiAgICAgICAgbWVhc3VyZW1lbnRzLnNldCggJ2RpbWVuc2lvbnMnLCBEaW1lbnNpb25zKHtcbiAgICAgICAgICB3aWR0aDogZG9tVmVydGV4Lm9mZnNldFdpZHRoLFxuICAgICAgICAgIGhlaWdodDogZG9tVmVydGV4Lm9mZnNldEhlaWdodFxuICAgICAgICB9KSApO1xuICAgICAgdGhpcy5wcm9wYWdhdGVNZWFzdXJlbWVudHMoIG5ld01lYXN1cmVtZW50cyApO1xuICAgICAgcmV0dXJuIHsgbWVhc3VyZW1lbnRzOiBuZXdNZWFzdXJlbWVudHMgfTtcbiAgICB9ICk7XG4gIH0sXG5cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLm1lYXN1cmUoKTtcbiAgfSxcblxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzLCBuZXh0U3RhdGUgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSApXG4gICAgICAgIHx8ICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9XG5cbn0pO1xuXG5cbmV4cG9ydCBkZWZhdWx0IFZlcnRleDtcbiJdfQ==