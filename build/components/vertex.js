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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3ZlcnRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQThCQSxNQUFNLE1BQU0sR0FBRyxPQUFNLFdBQVcsQ0FBQzs7O0FBRS9CLG1CQUFlLEVBQUEsMkJBQUc7QUFDaEIsYUFBTztBQUNMLG9CQUFZLEVBQUUsbUJBbEJsQixrQkFBa0IsR0FrQm9CO09BQ25DLENBQUM7S0FDSDs7QUFHRCxVQUFNLEVBQUEsa0JBQUc7OztBQUNQLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQzt3QkFDMkMsSUFBSSxDQUFDLEtBQUs7VUFBL0QsTUFBTSxlQUFOLE1BQU07VUFBRSxRQUFRLGVBQVIsUUFBUTtVQUFFLE1BQU0sZUFBTixNQUFNO1VBQUUsWUFBWSxlQUFaLFlBQVk7VUFBRSxRQUFRLGVBQVIsUUFBUTs7QUFDeEQsNkJBQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7VUFDNUIsS0FBSyxHQUFZLE1BQU0sQ0FBdkIsS0FBSztVQUFFLEtBQUssR0FBSyxNQUFNLENBQWhCLEtBQUs7O0FBRXBCLFVBQU0sS0FBSyxHQUFHO0FBQ1osZ0JBQVEsRUFBRSxVQUFVO0FBQ3BCLGtCQUFVLEVBQUUsTUFBTSxHQUFHLFNBQVMsR0FBRyxRQUFRO0FBQ3pDLFlBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtBQUNqQixXQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7T0FDaEIsQ0FBQzs7QUFFRixVQUFNLGFBQWEsR0FBRyxRQUFRLEdBQUcsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUNyRCxVQUFNLE9BQU8sNEJBQTBCLGFBQWEsQ0FBRzs7QUFFdkQsVUFBTSxFQUFFLEdBQUcsU0FBTCxFQUFFO2VBQVMsbUJBQVM7QUFDeEIsaUJBQU8sRUFBRSxtQkFBTTtBQUNiLGtCQUFLLE1BQU0sQ0FBRSxvQkEvQ25CLGdCQUFnQixFQStDb0IsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBRSxD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LENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksSUFDaEQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7S0FDekQ7O0FBR0QsV0FBTyxFQUFBLG1CQUFHOzs7QUFDUixVQUFNLFNBQVMsR0FBRyxPQUFNLFdBQVcsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDO0FBQ3hELFVBQUksQ0FBQyxRQUFRLENBQUUsVUFBQyxLQUFnQixFQUFLO1lBQW5CLFlBQVksR0FBZCxLQUFnQixDQUFkLFlBQVk7O0FBQzVCLFlBQU0sZUFBZSxHQUNuQixZQUFZLENBQUMsR0FBRyxDQUFFLFlBQVksRUFBRSxXQXJKdkIsVUFBVSxFQXFKd0I7QUFDekMsZUFBSyxFQUFFLFNBQVMsQ0FBQyxXQUFXO0FBQzVCLGdCQUFNLEVBQUUsU0FBUyxDQUFDLFlBQVk7U0FDL0IsQ0FBQyxDQUFFLENBQUM7QUFDUCxlQUFLLHFCQUFxQixDQUFFLGVBQWUsQ0FBRSxDQUFDO0FBQzlDLGVBQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLENBQUM7T0FDMUMsQ0FBRSxDQUFDO0tBQ0w7O0FBR0QscUJBQWlCLEVBQUEsNkJBQUc7QUFDbEIsVUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ2hCOztBQUdELHlCQUFxQixFQUFBLCtCQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUc7QUFDNUMsYUFBTyxDQUFDLHVCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFLElBQ3RDLENBQUMsdUJBQWMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQztLQUMvQzs7R0FFRixDQUFDLENBQUM7O21CQUdZLE1BQU0iLCJmaWxlIjoidmVydGV4LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIGRyYWdkcm9wIGZyb20gJy4uL3V0aWwvZHJhZ2Ryb3AnO1xuXG5pbXBvcnQgKiBhcyBQb3J0IGZyb20gJy4vcG9ydCc7XG5pbXBvcnQgKiBhcyBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbC9zaGFsbG93LWVxdWFsJztcbmltcG9ydCB7IENvb3JkcywgRGltZW5zaW9ucywgSU4sIE9VVCB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7IE1vdmVTZWxlY3Rpb24gfSBmcm9tICcuLi9hY3Rpb25zL3NlbGVjdGlvbic7XG5cblxuaW1wb3J0IHtcbiAgQ3JlYXRlQ2hlY2twb2ludFxufSBmcm9tICcuLi9hY3Rpb25zL2hpc3RvcnknO1xuXG5cbmltcG9ydCB7XG4gIE1lYXN1cmVWZXJ0ZXgsXG4gIFZlcnRleE1lYXN1cmVtZW50cyxcbiAgTWVhc3VyZVBvcnQsXG4gIE1vdmVWZXJ0ZXhcbn0gZnJvbSAnLi4vYWN0aW9ucy9sYXlvdXQnO1xuXG5pbXBvcnQge1xuICBDbGVhclNlbGVjdGlvbixcbiAgU2VsZWN0VmVydGV4LFxuICBEZXNlbGVjdFZlcnRleFxufSBmcm9tICcuLi9hY3Rpb25zL3NlbGVjdGlvbic7XG5cbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuXG5cbmNvbnN0IFZlcnRleCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lYXN1cmVtZW50czogVmVydGV4TWVhc3VyZW1lbnRzKClcbiAgICB9O1xuICB9LFxuXG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0IHsgdmVydGV4LCBzZWxlY3RlZCwgbGF5b3V0LCBldmVudEhhbmRsZXIsIHNldHRpbmdzIH0gPSBzZWxmLnByb3BzO1xuICAgIGNvdW50KHsgd2hhdDogVmVydGV4LmRpc3BsYXlOYW1lIH0pO1xuICAgIGNvbnN0IHsgcG9ydHMsIGxhYmVsIH0gPSB2ZXJ0ZXg7XG5cbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCAvLyA6VE9ETzogbW92ZSB0byBzdHlsZXNoZWV0XG4gICAgICB2aXNpYmlsaXR5OiBsYXlvdXQgPyAndmlzaWJsZScgOiAnaGlkZGVuJyxcbiAgICAgIGxlZnQ6IGxheW91dC5sZWZ0LFxuICAgICAgdG9wOiBsYXlvdXQudG9wXG4gICAgfTtcblxuICAgIGNvbnN0IHNlbGVjdGVkQ2xhc3MgPSBzZWxlY3RlZCA/ICduYmUtc2VsZWN0ZWQnIDogJyc7XG4gICAgY29uc3QgY2xhc3NlcyA9IGBuYmUtdmVydGV4IG5iZS1ub2RlICR7c2VsZWN0ZWRDbGFzc31gO1xuXG4gICAgY29uc3QgZGQgPSAoKSA9PiBkcmFnZHJvcCh7XG4gICAgICBvblN0YXJ0OiAoKSA9PiB7XG4gICAgICAgIHRoaXMuYnViYmxlKCBDcmVhdGVDaGVja3BvaW50KHsgYmVmb3JlOiAnTW92ZSBWZXJ0ZXgnIH0pICk7XG4gICAgICB9LFxuICAgICAgb25Nb3ZlOiAoeyBkcmFnUGF5bG9hZCwgZHJhZ1gsIGRyYWdZLCBkcmFnTm9kZSB9KSA9PiB7XG4gICAgICAgIGlmKCBzZWxlY3RlZCApIHtcbiAgICAgICAgICBldmVudEhhbmRsZXIoIE1vdmVTZWxlY3Rpb24oe1xuICAgICAgICAgICAgcmVmZXJlbmNlOiBkcmFnUGF5bG9hZCxcbiAgICAgICAgICAgIG9mZnNldDogQ29vcmRzKHsgbGVmdDogZHJhZ1gsIHRvcDogZHJhZ1kgfSlcbiAgICAgICAgICB9KSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBkcmFnUGF5bG9hZC5jb29yZHM7XG4gICAgICAgICAgZXZlbnRIYW5kbGVyKCBNb3ZlVmVydGV4KHtcbiAgICAgICAgICAgIHZlcnRleDogdmVydGV4LFxuICAgICAgICAgICAgdG86IENvb3Jkcyh7IGxlZnQ6IGxlZnQgKyBkcmFnWCwgdG9wOiB0b3AgKyBkcmFnWSB9KVxuICAgICAgICAgIH0pICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvbkNsaWNrOiAoIGV2ICkgPT4ge1xuICAgICAgICBpZiggZXYuc2hpZnRLZXkgKSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIChzZWxlY3RlZCA/IERlc2VsZWN0VmVydGV4IDogU2VsZWN0VmVydGV4KSh7IHZlcnRleCB9KSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuYnViYmxlKCBDbGVhclNlbGVjdGlvbigpICk7XG4gICAgICAgICAgdGhpcy5idWJibGUoIFNlbGVjdFZlcnRleCh7IHZlcnRleCB9KSApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBzdGFydERyYWcgPSAoIGV2ICkgPT4gZGQoKS5zdGFydCggZXYsIHsgY29vcmRzOiBsYXlvdXQsIGlkOiB7fSB9ICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17c3R5bGV9IGNsYXNzTmFtZT17Y2xhc3Nlc30gcmVmPVwidmVydGV4XCJcbiAgICAgICAgICAgb25Nb3VzZURvd249e3N0YXJ0RHJhZ30+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLXZlcnRleC1oZWFkZXJcIj57bGFiZWx9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLXBvcnQtZ3JvdXBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1wb3J0cyBuYmUtaW5ib3VuZFwiPlxuICAgICAgICAgICAge3JlbmRlclBvcnRzKCBJTiApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLXBvcnRzIG5iZS1vdXRib3VuZFwiPlxuICAgICAgICAgICAge3JlbmRlclBvcnRzKCBPVVQgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyUG9ydHMoIGRpcmVjdGlvbiApIHtcbiAgICAgIHJldHVybiBwb3J0c1sgZGlyZWN0aW9uIF0ubWFwKCBwb3J0ID0+XG4gICAgICAgIDxQb3J0IGtleT17cG9ydC5pZH1cbiAgICAgICAgICAgICAgcG9ydD17cG9ydH1cbiAgICAgICAgICAgICAgdmVydGV4PXt2ZXJ0ZXh9XG4gICAgICAgICAgICAgIGV2ZW50SGFuZGxlcj17c2VsZi5oYW5kbGVFdmVudH1cbiAgICAgICAgICAgICAgc2V0dGluZ3M9e3NldHRpbmdzfSAvPiApLnRvSlMoKTtcbiAgICB9XG4gIH0sXG5cblxuICBoYW5kbGVFdmVudCggZXZlbnQgKSB7XG4gICAgdmFyIHR5cGUgPSBldmVudC50eXBlKCk7XG4gICAgaWYoIHR5cGUgPT09IE1lYXN1cmVQb3J0ICkge1xuICAgICAgY29uc3QgeyBwb3J0LCBjZW50ZXIgfSA9IGV2ZW50O1xuICAgICAgdGhpcy5zZXRTdGF0ZSggKHsgbWVhc3VyZW1lbnRzIH0pID0+IHtcbiAgICAgICAgdmFyIG5ld01lYXN1cmVtZW50cyA9IG1lYXN1cmVtZW50cy5zZXRJbiggWyBwb3J0LmRpcmVjdGlvbiwgcG9ydC5pZCBdLCBjZW50ZXIgKTtcbiAgICAgICAgdGhpcy5wcm9wYWdhdGVNZWFzdXJlbWVudHMoIG5ld01lYXN1cmVtZW50cyApO1xuICAgICAgICByZXR1cm4geyBtZWFzdXJlbWVudHM6IG5ld01lYXN1cmVtZW50cyB9O1xuICAgICAgfSApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmJ1YmJsZSggZXZlbnQgKTtcbiAgfSxcblxuXG4gIGJ1YmJsZSggZXZlbnQgKSB7XG4gICAgY29uc3QgeyBldmVudEhhbmRsZXIgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlciAmJiBldmVudEhhbmRsZXIoIGV2ZW50ICk7XG4gIH0sXG5cblxuICBwcm9wYWdhdGVNZWFzdXJlbWVudHMoIG1lYXN1cmVtZW50cyApIHtcbiAgICBpZiggdGhpcy5pc0NvbXBsZXRlKCBtZWFzdXJlbWVudHMgKSApIHtcbiAgICAgIHZhciB7IHZlcnRleCB9ID0gdGhpcy5wcm9wcztcbiAgICAgIHRoaXMuYnViYmxlKCBNZWFzdXJlVmVydGV4KCB7IHZlcnRleCwgbWVhc3VyZW1lbnRzIH0gKSApO1xuICAgIH1cbiAgfSxcblxuXG4gIGlzQ29tcGxldGUoIG1lYXN1cmVtZW50cyApIHtcbiAgICBjb25zdCB7IHBvcnRzIH0gPSB0aGlzLnByb3BzLnZlcnRleDtcbiAgICByZXR1cm4gbWVhc3VyZW1lbnRzLmRpbWVuc2lvbnNcbiAgICAgICYmIG1lYXN1cmVtZW50cy5pbmJvdW5kLnNpemUgPT09IHBvcnRzLmluYm91bmQuc2l6ZVxuICAgICAgJiYgbWVhc3VyZW1lbnRzLm91dGJvdW5kLnNpemUgPT09IHBvcnRzLm91dGJvdW5kLnNpemU7XG4gIH0sXG5cblxuICBtZWFzdXJlKCkge1xuICAgIGNvbnN0IGRvbVZlcnRleCA9IFJlYWN0LmZpbmRET01Ob2RlKCB0aGlzLnJlZnMudmVydGV4ICk7XG4gICAgdGhpcy5zZXRTdGF0ZSggKHsgbWVhc3VyZW1lbnRzIH0pID0+IHtcbiAgICAgIGNvbnN0IG5ld01lYXN1cmVtZW50cyA9XG4gICAgICAgIG1lYXN1cmVtZW50cy5zZXQoICdkaW1lbnNpb25zJywgRGltZW5zaW9ucyh7XG4gICAgICAgICAgd2lkdGg6IGRvbVZlcnRleC5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGRvbVZlcnRleC5vZmZzZXRIZWlnaHRcbiAgICAgICAgfSkgKTtcbiAgICAgIHRoaXMucHJvcGFnYXRlTWVhc3VyZW1lbnRzKCBuZXdNZWFzdXJlbWVudHMgKTtcbiAgICAgIHJldHVybiB7IG1lYXN1cmVtZW50czogbmV3TWVhc3VyZW1lbnRzIH07XG4gICAgfSApO1xuICB9LFxuXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5tZWFzdXJlKCk7XG4gIH0sXG5cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcywgbmV4dFN0YXRlICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0U3RhdGUsIHRoaXMuc3RhdGUgKVxuICAgICAgICB8fCAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuXG5leHBvcnQgZGVmYXVsdCBWZXJ0ZXg7XG4iXX0=