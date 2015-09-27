define(['exports', 'module', 'react', '../util/dragdrop', './port', '../util/shallow-equal', '../model', '../actions/selection', '../actions/history', '../actions/layout', '../util/metrics'], function (exports, module, _react, _utilDragdrop, _port, _utilShallowEqual, _model, _actionsSelection, _actionsHistory, _actionsLayout, _utilMetrics) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _count = _interopRequireDefault(_utilMetrics);

  var Vertex = _react.createClass({
    displayName: 'Vertex',

    getInitialState: function getInitialState() {
      return {
        measurements: (0, _actionsLayout.VertexMeasurements)()
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
        return (0, _utilDragdrop)({
          onStart: function onStart() {
            _this.bubble((0, _actionsHistory.CreateCheckpoint)({ before: 'Move Vertex' }));
          },
          onMove: function onMove(_ref) {
            var dragPayload = _ref.dragPayload;
            var dragX = _ref.dragX;
            var dragY = _ref.dragY;
            var dragNode = _ref.dragNode;

            if (selected) {
              eventHandler((0, _actionsSelection.MoveSelection)({
                reference: dragPayload,
                offset: (0, _model.Coords)({ left: dragX, top: dragY })
              }));
            } else {
              var _dragPayload$coords = dragPayload.coords;
              var left = _dragPayload$coords.left;
              var _top = _dragPayload$coords.top;

              eventHandler((0, _actionsLayout.MoveVertex)({
                vertex: vertex,
                to: (0, _model.Coords)({ left: left + dragX, top: _top + dragY })
              }));
            }
          },
          onClick: function onClick(ev) {
            if (ev.shiftKey) {
              _this.bubble((selected ? _actionsSelection.DeselectVertex : _actionsSelection.SelectVertex)({ vertex: vertex }));
            } else {
              _this.bubble((0, _actionsSelection.ClearSelection)());
              _this.bubble((0, _actionsSelection.SelectVertex)({ vertex: vertex }));
            }
          }
        });
      };

      var startDrag = function startDrag(ev) {
        return dd().start(ev, { coords: layout, id: {} });
      };

      return _react.createElement(
        'div',
        { style: style, className: classes, ref: 'vertex',
          onMouseDown: startDrag },
        _react.createElement(
          'div',
          { className: 'nbe-vertex-header' },
          label
        ),
        _react.createElement(
          'div',
          { className: 'nbe-port-group' },
          _react.createElement(
            'div',
            { className: 'nbe-ports nbe-inbound' },
            renderPorts(_model.IN)
          ),
          _react.createElement(
            'div',
            { className: 'nbe-ports nbe-outbound' },
            renderPorts(_model.OUT)
          )
        )
      );

      function renderPorts(direction) {
        return ports[direction].map(function (port) {
          return _react.createElement(_port, { key: port.id,
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
      if (type === _actionsLayout.MeasurePort) {
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

        this.bubble((0, _actionsLayout.MeasureVertex)({ vertex: vertex, measurements: measurements }));
      }
    },

    isComplete: function isComplete(measurements) {
      var ports = this.props.vertex.ports;

      return measurements.dimensions && measurements.inbound.size === ports.inbound.size && measurements.outbound.size === ports.outbound.size;
    },

    measure: function measure() {
      var _this3 = this;

      var domVertex = _react.findDOMNode(this.refs.vertex);
      this.setState(function (_ref3) {
        var measurements = _ref3.measurements;

        var newMeasurements = measurements.set('dimensions', (0, _model.Dimensions)({
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
      return !(0, _utilShallowEqual)(nextState, this.state) || !(0, _utilShallowEqual)(nextProps, this.props);
    }

  });

  module.exports = Vertex;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9jb21wb25lbnRzL3ZlcnRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQThCQSxNQUFNLE1BQU0sR0FBRyxPQUFNLFdBQVcsQ0FBQzs7O0FBRS9CLG1CQUFlLEVBQUEsMkJBQUc7QUFDaEIsYUFBTztBQUNMLG9CQUFZLEVBQUUsbUJBbEJsQixrQkFBa0IsR0FrQm9CO09BQ25DLENBQUM7S0FDSDs7QUFHRCxVQUFNLEVBQUEsa0JBQUc7OztBQUNQLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDMkMsSUFBSSxDQUFDLEtBQUs7VUFBL0QsTUFBTSxlQUFOLE1BQU07VUFBRSxRQUFRLGVBQVIsUUFBUTtVQUFFLE1BQU0sZUFBTixNQUFNO1VBQUUsWUFBWSxlQUFaLFlBQVk7VUFBRSxRQUFRLGVBQVIsUUFBUTs7QUFDeEQsNkJBQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7VUFDNUIsS0FBSyxHQUFZLE1BQU0sQ0FBdkIsS0FBSztVQUFFLEtBQUssR0FBSyxNQUFNLENBQWhCLEtBQUs7O0FBRXBCLFVBQU0sS0FBSyxHQUFHO0FBQ1osZ0JBQVEsRUFBRSxVQUFVO0FBQ3BCLGtCQUFVLEVBQUUsTUFBTSxHQUFHLFNBQVMsR0FBRyxRQUFRO0FBQ3pDLFlBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtBQUNqQixXQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7T0FDaEIsQ0FBQzs7QUFFRixVQUFNLGFBQWEsR0FBRyxRQUFRLEdBQUcsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUNyRCxVQUFNLE9BQU8sNEJBQTBCLGFBQWEsQUFBRSxDQUFDOztBQUV2RCxVQUFNLEVBQUUsR0FBRyxTQUFMLEVBQUU7ZUFBUyxtQkFBUztBQUN4QixpQkFBTyxFQUFFLG1CQUFNO0FBQ2Isa0JBQUssTUFBTSxDQUFFLG9CQS9DbkIsZ0JBQWdC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L3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9jb21wb25lbnRzL3ZlcnRleC5qc3giLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgZHJhZ2Ryb3AgZnJvbSAnLi4vdXRpbC9kcmFnZHJvcCc7XG5cbmltcG9ydCAqIGFzIFBvcnQgZnJvbSAnLi9wb3J0JztcbmltcG9ydCAqIGFzIHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlsL3NoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IHsgQ29vcmRzLCBEaW1lbnNpb25zLCBJTiwgT1VUIH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IHsgTW92ZVNlbGVjdGlvbiB9IGZyb20gJy4uL2FjdGlvbnMvc2VsZWN0aW9uJztcblxuXG5pbXBvcnQge1xuICBDcmVhdGVDaGVja3BvaW50XG59IGZyb20gJy4uL2FjdGlvbnMvaGlzdG9yeSc7XG5cblxuaW1wb3J0IHtcbiAgTWVhc3VyZVZlcnRleCxcbiAgVmVydGV4TWVhc3VyZW1lbnRzLFxuICBNZWFzdXJlUG9ydCxcbiAgTW92ZVZlcnRleFxufSBmcm9tICcuLi9hY3Rpb25zL2xheW91dCc7XG5cbmltcG9ydCB7XG4gIENsZWFyU2VsZWN0aW9uLFxuICBTZWxlY3RWZXJ0ZXgsXG4gIERlc2VsZWN0VmVydGV4XG59IGZyb20gJy4uL2FjdGlvbnMvc2VsZWN0aW9uJztcblxuaW1wb3J0IGNvdW50IGZyb20gJy4uL3V0aWwvbWV0cmljcyc7XG5cblxuY29uc3QgVmVydGV4ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVhc3VyZW1lbnRzOiBWZXJ0ZXhNZWFzdXJlbWVudHMoKVxuICAgIH07XG4gIH0sXG5cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgY29uc3QgeyB2ZXJ0ZXgsIHNlbGVjdGVkLCBsYXlvdXQsIGV2ZW50SGFuZGxlciwgc2V0dGluZ3MgfSA9IHNlbGYucHJvcHM7XG4gICAgY291bnQoeyB3aGF0OiBWZXJ0ZXguZGlzcGxheU5hbWUgfSk7XG4gICAgY29uc3QgeyBwb3J0cywgbGFiZWwgfSA9IHZlcnRleDtcblxuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIC8vIDpUT0RPOiBtb3ZlIHRvIHN0eWxlc2hlZXRcbiAgICAgIHZpc2liaWxpdHk6IGxheW91dCA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nLFxuICAgICAgbGVmdDogbGF5b3V0LmxlZnQsXG4gICAgICB0b3A6IGxheW91dC50b3BcbiAgICB9O1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRDbGFzcyA9IHNlbGVjdGVkID8gJ25iZS1zZWxlY3RlZCcgOiAnJztcbiAgICBjb25zdCBjbGFzc2VzID0gYG5iZS12ZXJ0ZXggbmJlLW5vZGUgJHtzZWxlY3RlZENsYXNzfWA7XG5cbiAgICBjb25zdCBkZCA9ICgpID0+IGRyYWdkcm9wKHtcbiAgICAgIG9uU3RhcnQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5idWJibGUoIENyZWF0ZUNoZWNrcG9pbnQoeyBiZWZvcmU6ICdNb3ZlIFZlcnRleCcgfSkgKTtcbiAgICAgIH0sXG4gICAgICBvbk1vdmU6ICh7IGRyYWdQYXlsb2FkLCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgaWYoIHNlbGVjdGVkICkge1xuICAgICAgICAgIGV2ZW50SGFuZGxlciggTW92ZVNlbGVjdGlvbih7XG4gICAgICAgICAgICByZWZlcmVuY2U6IGRyYWdQYXlsb2FkLFxuICAgICAgICAgICAgb2Zmc2V0OiBDb29yZHMoeyBsZWZ0OiBkcmFnWCwgdG9wOiBkcmFnWSB9KVxuICAgICAgICAgIH0pICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IGRyYWdQYXlsb2FkLmNvb3JkcztcbiAgICAgICAgICBldmVudEhhbmRsZXIoIE1vdmVWZXJ0ZXgoe1xuICAgICAgICAgICAgdmVydGV4OiB2ZXJ0ZXgsXG4gICAgICAgICAgICB0bzogQ29vcmRzKHsgbGVmdDogbGVmdCArIGRyYWdYLCB0b3A6IHRvcCArIGRyYWdZIH0pXG4gICAgICAgICAgfSkgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6ICggZXYgKSA9PiB7XG4gICAgICAgIGlmKCBldi5zaGlmdEtleSApIHtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggKHNlbGVjdGVkID8gRGVzZWxlY3RWZXJ0ZXggOiBTZWxlY3RWZXJ0ZXgpKHsgdmVydGV4IH0pICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIENsZWFyU2VsZWN0aW9uKCkgKTtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggU2VsZWN0VmVydGV4KHsgdmVydGV4IH0pICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0RHJhZyA9ICggZXYgKSA9PiBkZCgpLnN0YXJ0KCBldiwgeyBjb29yZHM6IGxheW91dCwgaWQ6IHt9IH0gKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc2VzfSByZWY9XCJ2ZXJ0ZXhcIlxuICAgICAgICAgICBvbk1vdXNlRG93bj17c3RhcnREcmFnfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtdmVydGV4LWhlYWRlclwiPntsYWJlbH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtcG9ydC1ncm91cFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLXBvcnRzIG5iZS1pbmJvdW5kXCI+XG4gICAgICAgICAgICB7cmVuZGVyUG9ydHMoIElOICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtcG9ydHMgbmJlLW91dGJvdW5kXCI+XG4gICAgICAgICAgICB7cmVuZGVyUG9ydHMoIE9VVCApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBmdW5jdGlvbiByZW5kZXJQb3J0cyggZGlyZWN0aW9uICkge1xuICAgICAgcmV0dXJuIHBvcnRzWyBkaXJlY3Rpb24gXS5tYXAoIHBvcnQgPT5cbiAgICAgICAgPFBvcnQga2V5PXtwb3J0LmlkfVxuICAgICAgICAgICAgICBwb3J0PXtwb3J0fVxuICAgICAgICAgICAgICB2ZXJ0ZXg9e3ZlcnRleH1cbiAgICAgICAgICAgICAgZXZlbnRIYW5kbGVyPXtzZWxmLmhhbmRsZUV2ZW50fVxuICAgICAgICAgICAgICBzZXR0aW5ncz17c2V0dGluZ3N9IC8+ICkudG9KUygpO1xuICAgIH1cbiAgfSxcblxuXG4gIGhhbmRsZUV2ZW50KCBldmVudCApIHtcbiAgICB2YXIgdHlwZSA9IGV2ZW50LnR5cGUoKTtcbiAgICBpZiggdHlwZSA9PT0gTWVhc3VyZVBvcnQgKSB7XG4gICAgICBjb25zdCB7IHBvcnQsIGNlbnRlciB9ID0gZXZlbnQ7XG4gICAgICB0aGlzLnNldFN0YXRlKCAoeyBtZWFzdXJlbWVudHMgfSkgPT4ge1xuICAgICAgICB2YXIgbmV3TWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRzLnNldEluKCBbIHBvcnQuZGlyZWN0aW9uLCBwb3J0LmlkIF0sIGNlbnRlciApO1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZU1lYXN1cmVtZW50cyggbmV3TWVhc3VyZW1lbnRzICk7XG4gICAgICAgIHJldHVybiB7IG1lYXN1cmVtZW50czogbmV3TWVhc3VyZW1lbnRzIH07XG4gICAgICB9ICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYnViYmxlKCBldmVudCApO1xuICB9LFxuXG5cbiAgYnViYmxlKCBldmVudCApIHtcbiAgICBjb25zdCB7IGV2ZW50SGFuZGxlciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyICYmIGV2ZW50SGFuZGxlciggZXZlbnQgKTtcbiAgfSxcblxuXG4gIHByb3BhZ2F0ZU1lYXN1cmVtZW50cyggbWVhc3VyZW1lbnRzICkge1xuICAgIGlmKCB0aGlzLmlzQ29tcGxldGUoIG1lYXN1cmVtZW50cyApICkge1xuICAgICAgdmFyIHsgdmVydGV4IH0gPSB0aGlzLnByb3BzO1xuICAgICAgdGhpcy5idWJibGUoIE1lYXN1cmVWZXJ0ZXgoIHsgdmVydGV4LCBtZWFzdXJlbWVudHMgfSApICk7XG4gICAgfVxuICB9LFxuXG5cbiAgaXNDb21wbGV0ZSggbWVhc3VyZW1lbnRzICkge1xuICAgIGNvbnN0IHsgcG9ydHMgfSA9IHRoaXMucHJvcHMudmVydGV4O1xuICAgIHJldHVybiBtZWFzdXJlbWVudHMuZGltZW5zaW9uc1xuICAgICAgJiYgbWVhc3VyZW1lbnRzLmluYm91bmQuc2l6ZSA9PT0gcG9ydHMuaW5ib3VuZC5zaXplXG4gICAgICAmJiBtZWFzdXJlbWVudHMub3V0Ym91bmQuc2l6ZSA9PT0gcG9ydHMub3V0Ym91bmQuc2l6ZTtcbiAgfSxcblxuXG4gIG1lYXN1cmUoKSB7XG4gICAgY29uc3QgZG9tVmVydGV4ID0gUmVhY3QuZmluZERPTU5vZGUoIHRoaXMucmVmcy52ZXJ0ZXggKTtcbiAgICB0aGlzLnNldFN0YXRlKCAoeyBtZWFzdXJlbWVudHMgfSkgPT4ge1xuICAgICAgY29uc3QgbmV3TWVhc3VyZW1lbnRzID1cbiAgICAgICAgbWVhc3VyZW1lbnRzLnNldCggJ2RpbWVuc2lvbnMnLCBEaW1lbnNpb25zKHtcbiAgICAgICAgICB3aWR0aDogZG9tVmVydGV4Lm9mZnNldFdpZHRoLFxuICAgICAgICAgIGhlaWdodDogZG9tVmVydGV4Lm9mZnNldEhlaWdodFxuICAgICAgICB9KSApO1xuICAgICAgdGhpcy5wcm9wYWdhdGVNZWFzdXJlbWVudHMoIG5ld01lYXN1cmVtZW50cyApO1xuICAgICAgcmV0dXJuIHsgbWVhc3VyZW1lbnRzOiBuZXdNZWFzdXJlbWVudHMgfTtcbiAgICB9ICk7XG4gIH0sXG5cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLm1lYXN1cmUoKTtcbiAgfSxcblxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzLCBuZXh0U3RhdGUgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRTdGF0ZSwgdGhpcy5zdGF0ZSApXG4gICAgICAgIHx8ICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9XG5cbn0pO1xuXG5cbmV4cG9ydCBkZWZhdWx0IFZlcnRleDtcbiJdfQ==