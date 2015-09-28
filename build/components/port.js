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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3BvcnQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFZQSxNQUFNLElBQUksR0FBRyxPQUFNLFdBQVcsQ0FBQzs7O0FBRTdCLFVBQU0sRUFBQSxrQkFBRzttQkFDMEMsSUFBSSxDQUFDLEtBQUs7VUFBbkQsSUFBSSxVQUFKLElBQUk7VUFBRSxNQUFNLFVBQU4sTUFBTTtVQUFFLFlBQVksVUFBWixZQUFZO1VBQUUsUUFBUSxVQUFSLFFBQVE7O0FBQzVDLDZCQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLFVBQU0sT0FBTywwQkFBd0IsSUFBSSxDQUFDLElBQUksQ0FBRzs7QUFFakQsVUFBTSxFQUFFLEdBQUcsU0FBTCxFQUFFO2VBQVMsbUJBQVM7QUFDeEIsdUJBQWEsRUFBRTttQkFBTSxRQUFRLENBQUMsSUFBSSxZQWZkLFVBQVU7V0FlbUI7QUFDakQsZ0JBQU0sRUFBRSxnQkFBQyxJQUFzRCxFQUFLO21DQUEzRCxJQUFzRCxDQUFwRCxXQUFXO2dCQUFJLElBQUksb0JBQUosSUFBSTtnQkFBRSxHQUFHLG9CQUFILEdBQUc7Z0JBQUksS0FBSyxHQUFuQyxJQUFzRCxDQUF4QixLQUFLO2dCQUFFLEtBQUssR0FBMUMsSUFBc0QsQ0FBakIsS0FBSztnQkFBRSxRQUFRLEdBQXBELElBQXNELENBQVYsUUFBUTs7QUFDM0QsbUNBQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUM3Qix3QkFBWSxDQUFFLG1CQWpCQSxRQUFRLEVBaUJDO0FBQ3JCLGtCQUFJLEVBQUUsbUJBbEJnQixZQUFZLEVBa0JmO0FBQ2pCLG9CQUFJLEVBQUUsSUFBSTtBQUNWLHNCQUFNLEVBQUUsTUFBTTtBQUNkLDBCQUFVLEVBQUUsV0F0QmYsTUFBTSxFQXNCZ0IsRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLEdBQUcsRUFBSCxHQUFHLEVBQUUsQ0FBQztBQUNq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Q0FBQyxDQUFDOztBQUVILFdBQVMsVUFBVSxDQUFFLElBQUksRUFBRztBQUMxQixRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQzdCLFdBQVEsTUFBTSxFQUFHO0FBQ2YsVUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBRSxFQUFHO0FBQzlDLGVBQU8sTUFBTSxDQUFDO09BQ2Y7QUFDRCxZQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztLQUM1QjtBQUNELFdBQU8sTUFBTSxDQUFDO0dBQ2Y7O21CQUdjLElBQUkiLCJmaWxlIjoicG9ydC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCAqIGFzIGRyYWdkcm9wIGZyb20gJy4uL3V0aWwvZHJhZ2Ryb3AnO1xuaW1wb3J0ICogYXMgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5cbmltcG9ydCB7IENvb3JkcywgSU4sIE9VVCwgUkVBRF9XUklURSB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7IE1lYXN1cmVQb3J0LCBEcmFnUG9ydCwgUG9ydERyYWdJbmZvIH0gZnJvbSAnLi4vYWN0aW9ucy9sYXlvdXQnO1xuaW1wb3J0IHsgQ29ubmVjdFBvcnQsIERpc2Nvbm5lY3RQb3J0LCBDb25uZWN0YWJsZSB9IGZyb20gJy4uL2FjdGlvbnMvZ3JhcGgnO1xuXG5pbXBvcnQgY291bnQgZnJvbSAnLi4vdXRpbC9tZXRyaWNzJztcblxuXG5jb25zdCBQb3J0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHBvcnQsIHZlcnRleCwgZXZlbnRIYW5kbGVyLCBzZXR0aW5ncyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb3VudCh7IHdoYXQ6IFBvcnQuZGlzcGxheU5hbWUgfSk7XG4gICAgY29uc3QgY2xhc3NlcyA9IGBuYmUtcG9ydCBuYmUtdHlwZS0ke3BvcnQudHlwZX1gO1xuXG4gICAgY29uc3QgZGQgPSAoKSA9PiBkcmFnZHJvcCh7XG4gICAgICBvbkJlZm9yZVN0YXJ0OiAoKSA9PiBzZXR0aW5ncy5tb2RlID09PSBSRUFEX1dSSVRFLFxuICAgICAgb25Nb3ZlOiAoeyBkcmFnUGF5bG9hZDogeyBsZWZ0LCB0b3AgfSwgZHJhZ1gsIGRyYWdZLCBkcmFnTm9kZSB9KSA9PiB7XG4gICAgICAgIGNvdW50KHsgd2hhdDogJyFEcmFnUG9ydCcgfSk7XG4gICAgICAgIGV2ZW50SGFuZGxlciggRHJhZ1BvcnQoe1xuICAgICAgICAgIGluZm86IFBvcnREcmFnSW5mbyh7XG4gICAgICAgICAgICBwb3J0OiBwb3J0LFxuICAgICAgICAgICAgdmVydGV4OiB2ZXJ0ZXgsXG4gICAgICAgICAgICBwb3J0Q29vcmRzOiBDb29yZHMoeyBsZWZ0LCB0b3AgfSksXG4gICAgICAgICAgICBtb3VzZUNvb3JkczogQ29vcmRzKHsgbGVmdDogbGVmdCArIGRyYWdYLCB0b3A6IHRvcCArIGRyYWdZIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSkgKTtcbiAgICAgIH0sXG4gICAgICBnZXREcm9wUmVzdWx0OiAoIGhvdmVyTm9kZSApID0+IHtcbiAgICAgICAgaWYoIGhvdmVyTm9kZS5ub2RlTmFtZSA9PT0gJ3N2ZycgKSB7XG4gICAgICAgICAgLy8gQmFja2dyb3VuZCBvciBvdXRzaWRlIG9mIGRyb3Atem9uZVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gaG92ZXJOb2RlLmRhdGFzZXQ7XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBkYXRhICYmXG4gICAgICAgICAgICBkYXRhLm5iZUNvbm5lY3RhYmxlICYmXG4gICAgICAgICAgICBkYXRhLm5iZVR5cGUgPT09IHBvcnQudHlwZSAmJlxuICAgICAgICAgICAgZGF0YS5uYmVEaXJlY3Rpb24gIT09IHBvcnQuZGlyZWN0aW9uO1xuICAgICAgICByZXR1cm4gbWF0Y2hlcyA/IENvbm5lY3RhYmxlKHtcbiAgICAgICAgICBlZGdlSWQ6IGRhdGEubmJlRWRnZSxcbiAgICAgICAgICB0eXBlOiBkYXRhLm5iZVR5cGUsXG4gICAgICAgICAgdmVydGV4SWQ6IGRhdGEubmJlVmVydGV4LFxuICAgICAgICAgIHBvcnRJZDogZGF0YS5uYmVQb3J0LFxuICAgICAgICAgIGRpcmVjdGlvbjogZGF0YS5uYmVEaXJlY3Rpb25cbiAgICAgICAgfSkgOiBudWxsO1xuICAgICAgfSxcbiAgICAgIG9uRHJvcDogKHsgZHJvcFJlc3VsdCB9KSA9PiB7XG4gICAgICAgIGV2ZW50SGFuZGxlciggQ29ubmVjdFBvcnQoe1xuICAgICAgICAgIGZyb206IENvbm5lY3RhYmxlKHtcbiAgICAgICAgICAgIHR5cGU6IHBvcnQudHlwZSxcbiAgICAgICAgICAgIHZlcnRleElkOiB2ZXJ0ZXguaWQsXG4gICAgICAgICAgICBwb3J0SWQ6IHBvcnQuaWQsXG4gICAgICAgICAgICBkaXJlY3Rpb246IHBvcnQuZGlyZWN0aW9uXG4gICAgICAgICAgfSksXG4gICAgICAgICAgcG9ydDogcG9ydCxcbiAgICAgICAgICB2ZXJ0ZXg6IHZlcnRleCxcbiAgICAgICAgICB0bzogZHJvcFJlc3VsdFxuICAgICAgICB9KSApO1xuICAgICAgfSxcbiAgICAgIG9uRW5kOiAoKSA9PiB7XG4gICAgICAgIGV2ZW50SGFuZGxlciggRHJhZ1BvcnQoeyBpbmZvOiBudWxsIH0pICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBzdGFydERyYWcgPSAoIGV2ICkgPT4ge1xuICAgICAgY29uc3QgcCA9IGV2LmN1cnJlbnRUYXJnZXQ7XG4gICAgICBjb25zdCB2ID0gdmVydGV4Tm9kZSggcCApO1xuICAgICAgY29uc3QgbGVmdCA9IHYub2Zmc2V0TGVmdCArIHAub2Zmc2V0TGVmdCArIChwLm9mZnNldFdpZHRoIC8gMik7XG4gICAgICBjb25zdCB0b3AgPSB2Lm9mZnNldFRvcCArIHAub2Zmc2V0VG9wICsgKHAub2Zmc2V0SGVpZ2h0IC8gMik7XG4gICAgICBkZCgpLnN0YXJ0KCBldiwgeyBsZWZ0LCB0b3AgfSApO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc31cbiAgICAgICAgICAgZGF0YS1uYmUtY29ubmVjdGFibGU9e3RydWV9XG4gICAgICAgICAgIGRhdGEtbmJlLXR5cGU9e3BvcnQudHlwZX1cbiAgICAgICAgICAgZGF0YS1uYmUtZGlyZWN0aW9uPXtwb3J0LmRpcmVjdGlvbn1cbiAgICAgICAgICAgZGF0YS1uYmUtcG9ydD17cG9ydC5pZH1cbiAgICAgICAgICAgZGF0YS1uYmUtdmVydGV4PXt2ZXJ0ZXguaWR9PlxuICAgICAgICB7IHBvcnQuZGlyZWN0aW9uID09PSBPVVQgPyBwb3J0LmxhYmVsIDogJycgfVxuICAgICAgICA8aSBjbGFzc05hbWU9XCJuYmUtcG9ydC1oYW5kbGVcIlxuICAgICAgICAgICByZWY9XCJoYW5kbGVcIlxuICAgICAgICAgICBvbk1vdXNlRG93bj17c3RhcnREcmFnfVxuICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXtkaXNjb25uZWN0fSAvPlxuICAgICAgICB7IHBvcnQuZGlyZWN0aW9uID09PSBJTiA/IHBvcnQubGFiZWwgOiAnJyB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gICAgZnVuY3Rpb24gZGlzY29ubmVjdCgpIHtcbiAgICAgIGlmKCBzZXR0aW5ncy5tb2RlID09PSBSRUFEX1dSSVRFICkge1xuICAgICAgICBldmVudEhhbmRsZXIoIERpc2Nvbm5lY3RQb3J0KHsgdmVydGV4OiB2ZXJ0ZXgsIHBvcnQ6IHBvcnQgfSkgKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IHBvcnQsIGV2ZW50SGFuZGxlciB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBub2RlID0gUmVhY3QuZmluZERPTU5vZGUoIHRoaXMucmVmcy5oYW5kbGUgKTtcbiAgICBjb25zdCBjb29yZHMgPSBDb29yZHMoe1xuICAgICAgbGVmdDogbm9kZS5vZmZzZXRMZWZ0ICsgKG5vZGUub2Zmc2V0V2lkdGggLyAyKSxcbiAgICAgIHRvcDogbm9kZS5vZmZzZXRUb3AgKyAobm9kZS5vZmZzZXRIZWlnaHQgLyAyKVxuICAgIH0pO1xuICAgIGV2ZW50SGFuZGxlciggTWVhc3VyZVBvcnQoeyBwb3J0OiBwb3J0LCBjZW50ZXI6IGNvb3JkcyB9KSApO1xuICB9LFxuXG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMsIG5leHRTdGF0ZSApIHtcbiAgICByZXR1cm4gIXNoYWxsb3dFcXVhbCggbmV4dFByb3BzLCB0aGlzLnByb3BzICk7XG4gIH1cblxufSk7XG5cbmZ1bmN0aW9uIHZlcnRleE5vZGUoIHBvcnQgKSB7XG4gIGxldCByZXN1bHQgPSBwb3J0LnBhcmVudE5vZGU7XG4gIHdoaWxlICggcmVzdWx0ICkge1xuICAgIGlmKCAvXFxibmJlLXZlcnRleFxcYi8udGVzdCggcmVzdWx0LmNsYXNzTmFtZSApICkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVzdWx0ID0gcmVzdWx0LnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBQb3J0O1xuIl19