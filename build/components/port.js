define(['exports', 'module', 'react', '../util/dragdrop', '../util/shallow-equal', '../model', '../actions/layout', '../actions/graph', '../util/metrics'], function (exports, module, _react, _utilDragdrop, _utilShallowEqual, _model, _actionsLayout, _actionsGraph, _utilMetrics) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _count = _interopRequireDefault(_utilMetrics);

  var Port = _react.createClass({
    displayName: 'Port',

    render: function render() {
      var _props = this.props;
      var port = _props.port;
      var vertex = _props.vertex;
      var eventHandler = _props.eventHandler;
      var settings = _props.settings;

      (0, _count['default'])({ what: Port.displayName });
      var classes = 'nbe-port nbe-type-' + port.type;

      var dd = function dd() {
        return (0, _utilDragdrop)({
          onBeforeStart: function onBeforeStart() {
            return settings.mode === _model.READ_WRITE;
          },
          onMove: function onMove(_ref) {
            var _ref$dragPayload = _ref.dragPayload;
            var left = _ref$dragPayload.left;
            var top = _ref$dragPayload.top;
            var dragX = _ref.dragX;
            var dragY = _ref.dragY;
            var dragNode = _ref.dragNode;

            (0, _count['default'])({ what: '!DragPort' });
            eventHandler((0, _actionsLayout.DragPort)({
              info: (0, _actionsLayout.PortDragInfo)({
                port: port,
                vertex: vertex,
                portCoords: (0, _model.Coords)({ left: left, top: top }),
                mouseCoords: (0, _model.Coords)({ left: left + dragX, top: top + dragY })
              })
            }));
          },
          getDropResult: function getDropResult(hoverNode) {
            if (hoverNode.nodeName === 'svg') {
              // Background or outside of drop-zone
              return false;
            }
            var data = hoverNode.dataset;
            var matches = data && data.nbeConnectable && data.nbeType === port.type && data.nbeDirection !== port.direction;
            return matches ? (0, _actionsGraph.Connectable)({
              edgeId: data.nbeEdge,
              type: data.nbeType,
              vertexId: data.nbeVertex,
              portId: data.nbePort,
              direction: data.nbeDirection
            }) : null;
          },
          onDrop: function onDrop(_ref2) {
            var dropResult = _ref2.dropResult;

            eventHandler((0, _actionsGraph.ConnectPort)({
              from: (0, _actionsGraph.Connectable)({
                type: port.type,
                vertexId: vertex.id,
                portId: port.id,
                direction: port.direction
              }),
              port: port,
              vertex: vertex,
              to: dropResult
            }));
          },
          onEnd: function onEnd() {
            eventHandler((0, _actionsLayout.DragPort)({ info: null }));
          }
        });
      };

      var startDrag = function startDrag(ev) {
        var p = ev.currentTarget;
        var v = vertexNode(p);
        var left = v.offsetLeft + p.offsetLeft + p.offsetWidth / 2;
        var top = v.offsetTop + p.offsetTop + p.offsetHeight / 2;
        dd().start(ev, { left: left, top: top });
        ev.stopPropagation();
      };

      return _react.createElement(
        'div',
        { className: classes,
          'data-nbe-connectable': true,
          'data-nbe-type': port.type,
          'data-nbe-direction': port.direction,
          'data-nbe-port': port.id,
          'data-nbe-vertex': vertex.id },
        port.direction === _model.OUT ? port.label : '',
        _react.createElement('i', { className: 'nbe-port-handle',
          ref: 'handle',
          onMouseDown: startDrag,
          onDoubleClick: disconnect }),
        port.direction === _model.IN ? port.label : ''
      );

      function disconnect() {
        if (settings.mode === _model.READ_WRITE) {
          eventHandler((0, _actionsGraph.DisconnectPort)({ vertex: vertex, port: port }));
        }
      }
    },

    componentDidMount: function componentDidMount() {
      var _props2 = this.props;
      var port = _props2.port;
      var eventHandler = _props2.eventHandler;

      var node = _react.findDOMNode(this.refs.handle);
      var coords = (0, _model.Coords)({
        left: node.offsetLeft + node.offsetWidth / 2,
        top: node.offsetTop + node.offsetHeight / 2
      });
      eventHandler((0, _actionsLayout.MeasurePort)({ port: port, center: coords }));
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utilShallowEqual)(nextProps, this.props);
    }

  });

  function vertexNode(port) {
    var result = port.parentNode;
    while (result) {
      if (/\bnbe-vertex\b/.test(result.className)) {
        return result;
      }
      result = result.parentNode;
    }
    return result;
  }

  module.exports = Port;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9jb21wb25lbnRzL3BvcnQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFZQSxNQUFNLElBQUksR0FBRyxPQUFNLFdBQVcsQ0FBQzs7O0FBRTdCLFVBQU0sRUFBQSxrQkFBRzttQkFDMEMsSUFBSSxDQUFDLEtBQUs7VUFBbkQsSUFBSSxVQUFKLElBQUk7VUFBRSxNQUFNLFVBQU4sTUFBTTtVQUFFLFlBQVksVUFBWixZQUFZO1VBQUUsUUFBUSxVQUFSLFFBQVE7O0FBQzVDLDZCQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLFVBQU0sT0FBTywwQkFBd0IsSUFBSSxDQUFDLElBQUksQUFBRSxDQUFDOztBQUVqRCxVQUFNLEVBQUUsR0FBRyxTQUFMLEVBQUU7ZUFBUyxtQkFBUztBQUN4Qix1QkFBYSxFQUFFO21CQUFNLFFBQVEsQ0FBQyxJQUFJLFlBZmQsVUFBVSxBQWVtQjtXQUFBO0FBQ2pELGdCQUFNLEVBQUUsZ0JBQUMsSUFBc0QsRUFBSzttQ0FBM0QsSUFBc0QsQ0FBcEQsV0FBVztnQkFBSSxJQUFJLG9CQUFKLElBQUk7Z0JBQUUsR0FBRyxvQkFBSCxHQUFHO2dCQUFJLEtBQUssR0FBbkMsSUFBc0QsQ0FBeEIsS0FBSztnQkFBRSxLQUFLLEdBQTFDLElBQXNELENBQWpCLEtBQUs7Z0JBQUUsUUFBUSxHQUFwRCxJQUFzRCxDQUFWLFFBQVE7O0FBQzNELG1DQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDN0Isd0JBQVksQ0FBRSxtQkFqQkEsUUFBUSxFQWlCQztBQUNyQixrQkFBSSxFQUFFLG1CQWxCZ0IsWUFBWSxFQWtCZjtBQUNqQixvQkFBSSxFQUFFLElBQUk7QUFDVixzQkFBTSxFQUFFLE1BQU07QUFDZCwwQkFBVSxFQUFFLFdBdEJmLE1BQU0sRUFzQmdCLEVBQUUs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Q0FBQztLQUM3RDs7QUFHRCx5QkFBcUIsRUFBQSwrQkFBRSxTQUFTLEVBQUUsU0FBUyxFQUFHO0FBQzVDLGFBQU8sQ0FBQyx1QkFBYyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDO0tBQy9DOztHQUVGLENBQUMsQ0FBQzs7QUFFSCxXQUFTLFVBQVUsQ0FBRSxJQUFJLEVBQUc7QUFDMUIsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUM3QixXQUFRLE1BQU0sRUFBRztBQUNmLFVBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUUsRUFBRztBQUM5QyxlQUFPLE1BQU0sQ0FBQztPQUNmO0FBQ0QsWUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7S0FDNUI7QUFDRCxXQUFPLE1BQU0sQ0FBQztHQUNmOzttQkFHYyxJQUFJIiwiZmlsZSI6Ii9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9jb21wb25lbnRzL3BvcnQuanN4Iiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0ICogYXMgZHJhZ2Ryb3AgZnJvbSAnLi4vdXRpbC9kcmFnZHJvcCc7XG5pbXBvcnQgKiBhcyBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbC9zaGFsbG93LWVxdWFsJztcblxuaW1wb3J0IHsgQ29vcmRzLCBJTiwgT1VULCBSRUFEX1dSSVRFIH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IHsgTWVhc3VyZVBvcnQsIERyYWdQb3J0LCBQb3J0RHJhZ0luZm8gfSBmcm9tICcuLi9hY3Rpb25zL2xheW91dCc7XG5pbXBvcnQgeyBDb25uZWN0UG9ydCwgRGlzY29ubmVjdFBvcnQsIENvbm5lY3RhYmxlIH0gZnJvbSAnLi4vYWN0aW9ucy9ncmFwaCc7XG5cbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuXG5cbmNvbnN0IFBvcnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcG9ydCwgdmVydGV4LCBldmVudEhhbmRsZXIsIHNldHRpbmdzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvdW50KHsgd2hhdDogUG9ydC5kaXNwbGF5TmFtZSB9KTtcbiAgICBjb25zdCBjbGFzc2VzID0gYG5iZS1wb3J0IG5iZS10eXBlLSR7cG9ydC50eXBlfWA7XG5cbiAgICBjb25zdCBkZCA9ICgpID0+IGRyYWdkcm9wKHtcbiAgICAgIG9uQmVmb3JlU3RhcnQ6ICgpID0+IHNldHRpbmdzLm1vZGUgPT09IFJFQURfV1JJVEUsXG4gICAgICBvbk1vdmU6ICh7IGRyYWdQYXlsb2FkOiB7IGxlZnQsIHRvcCB9LCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgY291bnQoeyB3aGF0OiAnIURyYWdQb3J0JyB9KTtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBEcmFnUG9ydCh7XG4gICAgICAgICAgaW5mbzogUG9ydERyYWdJbmZvKHtcbiAgICAgICAgICAgIHBvcnQ6IHBvcnQsXG4gICAgICAgICAgICB2ZXJ0ZXg6IHZlcnRleCxcbiAgICAgICAgICAgIHBvcnRDb29yZHM6IENvb3Jkcyh7IGxlZnQsIHRvcCB9KSxcbiAgICAgICAgICAgIG1vdXNlQ29vcmRzOiBDb29yZHMoeyBsZWZ0OiBsZWZ0ICsgZHJhZ1gsIHRvcDogdG9wICsgZHJhZ1kgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KSApO1xuICAgICAgfSxcbiAgICAgIGdldERyb3BSZXN1bHQ6ICggaG92ZXJOb2RlICkgPT4ge1xuICAgICAgICBpZiggaG92ZXJOb2RlLm5vZGVOYW1lID09PSAnc3ZnJyApIHtcbiAgICAgICAgICAvLyBCYWNrZ3JvdW5kIG9yIG91dHNpZGUgb2YgZHJvcC16b25lXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGEgPSBob3Zlck5vZGUuZGF0YXNldDtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGRhdGEgJiZcbiAgICAgICAgICAgIGRhdGEubmJlQ29ubmVjdGFibGUgJiZcbiAgICAgICAgICAgIGRhdGEubmJlVHlwZSA9PT0gcG9ydC50eXBlICYmXG4gICAgICAgICAgICBkYXRhLm5iZURpcmVjdGlvbiAhPT0gcG9ydC5kaXJlY3Rpb247XG4gICAgICAgIHJldHVybiBtYXRjaGVzID8gQ29ubmVjdGFibGUoe1xuICAgICAgICAgIGVkZ2VJZDogZGF0YS5uYmVFZGdlLFxuICAgICAgICAgIHR5cGU6IGRhdGEubmJlVHlwZSxcbiAgICAgICAgICB2ZXJ0ZXhJZDogZGF0YS5uYmVWZXJ0ZXgsXG4gICAgICAgICAgcG9ydElkOiBkYXRhLm5iZVBvcnQsXG4gICAgICAgICAgZGlyZWN0aW9uOiBkYXRhLm5iZURpcmVjdGlvblxuICAgICAgICB9KSA6IG51bGw7XG4gICAgICB9LFxuICAgICAgb25Ecm9wOiAoeyBkcm9wUmVzdWx0IH0pID0+IHtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBDb25uZWN0UG9ydCh7XG4gICAgICAgICAgZnJvbTogQ29ubmVjdGFibGUoe1xuICAgICAgICAgICAgdHlwZTogcG9ydC50eXBlLFxuICAgICAgICAgICAgdmVydGV4SWQ6IHZlcnRleC5pZCxcbiAgICAgICAgICAgIHBvcnRJZDogcG9ydC5pZCxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogcG9ydC5kaXJlY3Rpb25cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBwb3J0OiBwb3J0LFxuICAgICAgICAgIHZlcnRleDogdmVydGV4LFxuICAgICAgICAgIHRvOiBkcm9wUmVzdWx0XG4gICAgICAgIH0pICk7XG4gICAgICB9LFxuICAgICAgb25FbmQ6ICgpID0+IHtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBEcmFnUG9ydCh7IGluZm86IG51bGwgfSkgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0RHJhZyA9ICggZXYgKSA9PiB7XG4gICAgICBjb25zdCBwID0gZXYuY3VycmVudFRhcmdldDtcbiAgICAgIGNvbnN0IHYgPSB2ZXJ0ZXhOb2RlKCBwICk7XG4gICAgICBjb25zdCBsZWZ0ID0gdi5vZmZzZXRMZWZ0ICsgcC5vZmZzZXRMZWZ0ICsgKHAub2Zmc2V0V2lkdGggLyAyKTtcbiAgICAgIGNvbnN0IHRvcCA9IHYub2Zmc2V0VG9wICsgcC5vZmZzZXRUb3AgKyAocC5vZmZzZXRIZWlnaHQgLyAyKTtcbiAgICAgIGRkKCkuc3RhcnQoIGV2LCB7IGxlZnQsIHRvcCB9ICk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfVxuICAgICAgICAgICBkYXRhLW5iZS1jb25uZWN0YWJsZT17dHJ1ZX1cbiAgICAgICAgICAgZGF0YS1uYmUtdHlwZT17cG9ydC50eXBlfVxuICAgICAgICAgICBkYXRhLW5iZS1kaXJlY3Rpb249e3BvcnQuZGlyZWN0aW9ufVxuICAgICAgICAgICBkYXRhLW5iZS1wb3J0PXtwb3J0LmlkfVxuICAgICAgICAgICBkYXRhLW5iZS12ZXJ0ZXg9e3ZlcnRleC5pZH0+XG4gICAgICAgIHsgcG9ydC5kaXJlY3Rpb24gPT09IE9VVCA/IHBvcnQubGFiZWwgOiAnJyB9XG4gICAgICAgIDxpIGNsYXNzTmFtZT1cIm5iZS1wb3J0LWhhbmRsZVwiXG4gICAgICAgICAgIHJlZj1cImhhbmRsZVwiXG4gICAgICAgICAgIG9uTW91c2VEb3duPXtzdGFydERyYWd9XG4gICAgICAgICAgIG9uRG91YmxlQ2xpY2s9e2Rpc2Nvbm5lY3R9IC8+XG4gICAgICAgIHsgcG9ydC5kaXJlY3Rpb24gPT09IElOID8gcG9ydC5sYWJlbCA6ICcnIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBmdW5jdGlvbiBkaXNjb25uZWN0KCkge1xuICAgICAgaWYoIHNldHRpbmdzLm1vZGUgPT09IFJFQURfV1JJVEUgKSB7XG4gICAgICAgIGV2ZW50SGFuZGxlciggRGlzY29ubmVjdFBvcnQoeyB2ZXJ0ZXg6IHZlcnRleCwgcG9ydDogcG9ydCB9KSApO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgcG9ydCwgZXZlbnRIYW5kbGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5vZGUgPSBSZWFjdC5maW5kRE9NTm9kZSggdGhpcy5yZWZzLmhhbmRsZSApO1xuICAgIGNvbnN0IGNvb3JkcyA9IENvb3Jkcyh7XG4gICAgICBsZWZ0OiBub2RlLm9mZnNldExlZnQgKyAobm9kZS5vZmZzZXRXaWR0aCAvIDIpLFxuICAgICAgdG9wOiBub2RlLm9mZnNldFRvcCArIChub2RlLm9mZnNldEhlaWdodCAvIDIpXG4gICAgfSk7XG4gICAgZXZlbnRIYW5kbGVyKCBNZWFzdXJlUG9ydCh7IHBvcnQ6IHBvcnQsIGNlbnRlcjogY29vcmRzIH0pICk7XG4gIH0sXG5cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcywgbmV4dFN0YXRlICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuZnVuY3Rpb24gdmVydGV4Tm9kZSggcG9ydCApIHtcbiAgbGV0IHJlc3VsdCA9IHBvcnQucGFyZW50Tm9kZTtcbiAgd2hpbGUgKCByZXN1bHQgKSB7XG4gICAgaWYoIC9cXGJuYmUtdmVydGV4XFxiLy50ZXN0KCByZXN1bHQuY2xhc3NOYW1lICkgKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXN1bHQgPSByZXN1bHQucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBvcnQ7XG4iXX0=