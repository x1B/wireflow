define(['exports', 'module', 'react', '../util/dragdrop', '../util/shallow-equal', '../util/metrics', '../flux/layout/layout-actions', '../flux/layout/layout-model', '../flux/graph/graph-actions', '../flux/history/history-actions', '../flux/graph/graph-model', '../flux/settings/settings-model'], function (exports, module, _react, _utilDragdrop, _utilShallowEqual, _utilMetrics, _fluxLayoutLayoutActions, _fluxLayoutLayoutModel, _fluxGraphGraphActions, _fluxHistoryHistoryActions, _fluxGraphGraphModel, _fluxSettingsSettingsModel) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _React = _interopRequireDefault(_react);

  var _dragdrop = _interopRequireDefault(_utilDragdrop);

  var _shallowEqual = _interopRequireDefault(_utilShallowEqual);

  var _count = _interopRequireDefault(_utilMetrics);

  var _layoutActions = _interopRequireDefault(_fluxLayoutLayoutActions);

  var _graphActions = _interopRequireDefault(_fluxGraphGraphActions);

  var MeasurePort = _layoutActions['default'].MeasurePort;
  var DragPort = _layoutActions['default'].DragPort;
  var PortDragInfo = _layoutActions['default'].payload.PortDragInfo;
  var ConnectPort = _graphActions['default'].ConnectPort;
  var DisconnectPort = _graphActions['default'].DisconnectPort;
  var Connectable = _graphActions['default'].payload.Connectable;

  var Port = _React['default'].createClass({
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
        return (0, _dragdrop['default'])({
          onBeforeStart: function onBeforeStart() {
            return settings.mode === _fluxSettingsSettingsModel.READ_WRITE;
          },
          onMove: function onMove(_ref) {
            var _ref$dragPayload = _ref.dragPayload;
            var left = _ref$dragPayload.left;
            var top = _ref$dragPayload.top;
            var dragX = _ref.dragX;
            var dragY = _ref.dragY;
            var dragNode = _ref.dragNode;

            (0, _count['default'])({ what: '!DragPort' });
            eventHandler(DragPort({
              info: PortDragInfo({
                port: port,
                vertex: vertex,
                portCoords: (0, _fluxLayoutLayoutModel.Coords)({ left: left, top: top }),
                mouseCoords: (0, _fluxLayoutLayoutModel.Coords)({ left: left + dragX, top: top + dragY })
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
            return matches ? Connectable({
              edgeId: data.nbeEdge,
              type: data.nbeType,
              vertexId: data.nbeVertex,
              portId: data.nbePort,
              direction: data.nbeDirection
            }) : null;
          },
          onDrop: function onDrop(_ref2) {
            var dropResult = _ref2.dropResult;

            eventHandler((0, _fluxHistoryHistoryActions.CreateCheckpoint)());
            eventHandler(ConnectPort({
              from: Connectable({
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
            eventHandler(DragPort({ info: null }));
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

      return _React['default'].createElement(
        'div',
        { className: classes,
          'data-nbe-connectable': true,
          'data-nbe-type': port.type,
          'data-nbe-direction': port.direction,
          'data-nbe-port': port.id,
          'data-nbe-vertex': vertex.id },
        port.direction === _fluxGraphGraphModel.OUT ? port.label : '',
        _React['default'].createElement('i', { className: 'nbe-port-handle',
          ref: 'handle',
          onMouseDown: startDrag,
          onDoubleClick: disconnect }),
        port.direction === _fluxGraphGraphModel.IN ? port.label : ''
      );

      function disconnect() {
        if (settings.mode === _fluxSettingsSettingsModel.READ_WRITE) {
          eventHandler((0, _fluxHistoryHistoryActions.CreateCheckpoint)());
          eventHandler(DisconnectPort({ vertex: vertex, port: port }));
        }
      }
    },

    componentDidMount: function componentDidMount() {
      var _props2 = this.props;
      var port = _props2.port;
      var eventHandler = _props2.eventHandler;

      var node = _React['default'].findDOMNode(this.refs.handle);
      var coords = (0, _fluxLayoutLayoutModel.Coords)({
        left: node.offsetLeft + node.offsetWidth / 2,
        top: node.offsetTop + node.offsetHeight / 2
      });
      eventHandler(MeasurePort({ port: port, center: coords }));
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3BvcnQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O01BYVEsV0FBVyw2QkFBWCxXQUFXO01BQUUsUUFBUSw2QkFBUixRQUFRO01BQWEsWUFBWSw2QkFBdkIsT0FBTyxDQUFJLFlBQVk7TUFDOUMsV0FBVyw0QkFBWCxXQUFXO01BQUUsY0FBYyw0QkFBZCxjQUFjO01BQWEsV0FBVyw0QkFBdEIsT0FBTyxDQUFJLFdBQVc7O0FBRTNELE1BQU0sSUFBSSxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7O0FBRTdCLFVBQU0sRUFBQSxrQkFBRzttQkFDMEMsSUFBSSxDQUFDLEtBQUs7VUFBbkQsSUFBSSxVQUFKLElBQUk7VUFBRSxNQUFNLFVBQU4sTUFBTTtVQUFFLFlBQVksVUFBWixZQUFZO1VBQUUsUUFBUSxVQUFSLFFBQVE7O0FBQzVDLDZCQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLFVBQU0sT0FBTywwQkFBd0IsSUFBSSxDQUFDLElBQUksQ0FBRzs7QUFFakQsVUFBTSxFQUFFLEdBQUcsU0FBTCxFQUFFO2VBQVMsMEJBQVM7QUFDeEIsdUJBQWEsRUFBRTttQkFBTSxRQUFRLENBQUMsSUFBSSxnQ0FiL0IsVUFBVTtXQWFvQztBQUNqRCxnQkFBTSxFQUFFLGdCQUFDLElBQXNELEVBQUs7bUNBQTNELElBQXNELENBQXBELFdBQVc7Z0JBQUksSUFBSSxvQkFBSixJQUFJO2dCQUFFLEdBQUcsb0JBQUgsR0FBRztnQkFBSSxLQUFLLEdBQW5DLElBQXNELENBQXhCLEtBQUs7Z0JBQUUsS0FBSyxHQUExQyxJQUFzRCxDQUFqQixLQUFLO2dCQUFFLFFBQVEsR0FBcEQsSUFBc0QsQ0FBVixRQUFROztBQUMzRCxtQ0FBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQzdCLHdCQUFZLENBQUUsUUFBUSxDQUFDO0FBQ3JCLGtCQUFJ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LGtCQUFZLENBQUUsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBRSxDQUFDO0tBQzdEOztBQUdELHlCQUFxQixFQUFBLCtCQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUc7QUFDNUMsYUFBTyxDQUFDLDhCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7S0FDL0M7O0dBRUYsQ0FBQyxDQUFDOztBQUVILFdBQVMsVUFBVSxDQUFFLElBQUksRUFBRztBQUMxQixRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQzdCLFdBQVEsTUFBTSxFQUFHO0FBQ2YsVUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBRSxFQUFHO0FBQzlDLGVBQU8sTUFBTSxDQUFDO09BQ2Y7QUFDRCxZQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztLQUM1QjtBQUNELFdBQU8sTUFBTSxDQUFDO0dBQ2Y7O21CQUdjLElBQUkiLCJmaWxlIjoicG9ydC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgZHJhZ2Ryb3AgZnJvbSAnLi4vdXRpbC9kcmFnZHJvcCc7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5pbXBvcnQgY291bnQgZnJvbSAnLi4vdXRpbC9tZXRyaWNzJztcblxuaW1wb3J0IGxheW91dEFjdGlvbnMgZnJvbSAnLi4vZmx1eC9sYXlvdXQvbGF5b3V0LWFjdGlvbnMnO1xuaW1wb3J0IHsgQ29vcmRzIH0gZnJvbSAnLi4vZmx1eC9sYXlvdXQvbGF5b3V0LW1vZGVsJztcbmltcG9ydCBncmFwaEFjdGlvbnMgZnJvbSAnLi4vZmx1eC9ncmFwaC9ncmFwaC1hY3Rpb25zJztcbmltcG9ydCB7IENyZWF0ZUNoZWNrcG9pbnQgfSBmcm9tICcuLi9mbHV4L2hpc3RvcnkvaGlzdG9yeS1hY3Rpb25zJztcbmltcG9ydCB7IElOLCBPVVQgfSBmcm9tICcuLi9mbHV4L2dyYXBoL2dyYXBoLW1vZGVsJztcbmltcG9ydCB7IFJFQURfV1JJVEUgfSBmcm9tICcuLi9mbHV4L3NldHRpbmdzL3NldHRpbmdzLW1vZGVsJztcblxuY29uc3QgeyBNZWFzdXJlUG9ydCwgRHJhZ1BvcnQsIHBheWxvYWQ6IHsgUG9ydERyYWdJbmZvIH0gfSA9IGxheW91dEFjdGlvbnM7XG5jb25zdCB7IENvbm5lY3RQb3J0LCBEaXNjb25uZWN0UG9ydCwgcGF5bG9hZDogeyBDb25uZWN0YWJsZSB9IH0gPSBncmFwaEFjdGlvbnM7XG5cbmNvbnN0IFBvcnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcG9ydCwgdmVydGV4LCBldmVudEhhbmRsZXIsIHNldHRpbmdzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvdW50KHsgd2hhdDogUG9ydC5kaXNwbGF5TmFtZSB9KTtcbiAgICBjb25zdCBjbGFzc2VzID0gYG5iZS1wb3J0IG5iZS10eXBlLSR7cG9ydC50eXBlfWA7XG5cbiAgICBjb25zdCBkZCA9ICgpID0+IGRyYWdkcm9wKHtcbiAgICAgIG9uQmVmb3JlU3RhcnQ6ICgpID0+IHNldHRpbmdzLm1vZGUgPT09IFJFQURfV1JJVEUsXG4gICAgICBvbk1vdmU6ICh7IGRyYWdQYXlsb2FkOiB7IGxlZnQsIHRvcCB9LCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgY291bnQoeyB3aGF0OiAnIURyYWdQb3J0JyB9KTtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBEcmFnUG9ydCh7XG4gICAgICAgICAgaW5mbzogUG9ydERyYWdJbmZvKHtcbiAgICAgICAgICAgIHBvcnQ6IHBvcnQsXG4gICAgICAgICAgICB2ZXJ0ZXg6IHZlcnRleCxcbiAgICAgICAgICAgIHBvcnRDb29yZHM6IENvb3Jkcyh7IGxlZnQsIHRvcCB9KSxcbiAgICAgICAgICAgIG1vdXNlQ29vcmRzOiBDb29yZHMoeyBsZWZ0OiBsZWZ0ICsgZHJhZ1gsIHRvcDogdG9wICsgZHJhZ1kgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KSApO1xuICAgICAgfSxcbiAgICAgIGdldERyb3BSZXN1bHQ6ICggaG92ZXJOb2RlICkgPT4ge1xuICAgICAgICBpZiggaG92ZXJOb2RlLm5vZGVOYW1lID09PSAnc3ZnJyApIHtcbiAgICAgICAgICAvLyBCYWNrZ3JvdW5kIG9yIG91dHNpZGUgb2YgZHJvcC16b25lXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGEgPSBob3Zlck5vZGUuZGF0YXNldDtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGRhdGEgJiZcbiAgICAgICAgICAgIGRhdGEubmJlQ29ubmVjdGFibGUgJiZcbiAgICAgICAgICAgIGRhdGEubmJlVHlwZSA9PT0gcG9ydC50eXBlICYmXG4gICAgICAgICAgICBkYXRhLm5iZURpcmVjdGlvbiAhPT0gcG9ydC5kaXJlY3Rpb247XG4gICAgICAgIHJldHVybiBtYXRjaGVzID8gQ29ubmVjdGFibGUoe1xuICAgICAgICAgIGVkZ2VJZDogZGF0YS5uYmVFZGdlLFxuICAgICAgICAgIHR5cGU6IGRhdGEubmJlVHlwZSxcbiAgICAgICAgICB2ZXJ0ZXhJZDogZGF0YS5uYmVWZXJ0ZXgsXG4gICAgICAgICAgcG9ydElkOiBkYXRhLm5iZVBvcnQsXG4gICAgICAgICAgZGlyZWN0aW9uOiBkYXRhLm5iZURpcmVjdGlvblxuICAgICAgICB9KSA6IG51bGw7XG4gICAgICB9LFxuICAgICAgb25Ecm9wOiAoeyBkcm9wUmVzdWx0IH0pID0+IHtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBDcmVhdGVDaGVja3BvaW50KCkgKTtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBDb25uZWN0UG9ydCh7XG4gICAgICAgICAgZnJvbTogQ29ubmVjdGFibGUoe1xuICAgICAgICAgICAgdHlwZTogcG9ydC50eXBlLFxuICAgICAgICAgICAgdmVydGV4SWQ6IHZlcnRleC5pZCxcbiAgICAgICAgICAgIHBvcnRJZDogcG9ydC5pZCxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogcG9ydC5kaXJlY3Rpb25cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBwb3J0OiBwb3J0LFxuICAgICAgICAgIHZlcnRleDogdmVydGV4LFxuICAgICAgICAgIHRvOiBkcm9wUmVzdWx0XG4gICAgICAgIH0pICk7XG4gICAgICB9LFxuICAgICAgb25FbmQ6ICgpID0+IHtcbiAgICAgICAgZXZlbnRIYW5kbGVyKCBEcmFnUG9ydCh7IGluZm86IG51bGwgfSkgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0RHJhZyA9ICggZXYgKSA9PiB7XG4gICAgICBjb25zdCBwID0gZXYuY3VycmVudFRhcmdldDtcbiAgICAgIGNvbnN0IHYgPSB2ZXJ0ZXhOb2RlKCBwICk7XG4gICAgICBjb25zdCBsZWZ0ID0gdi5vZmZzZXRMZWZ0ICsgcC5vZmZzZXRMZWZ0ICsgKHAub2Zmc2V0V2lkdGggLyAyKTtcbiAgICAgIGNvbnN0IHRvcCA9IHYub2Zmc2V0VG9wICsgcC5vZmZzZXRUb3AgKyAocC5vZmZzZXRIZWlnaHQgLyAyKTtcbiAgICAgIGRkKCkuc3RhcnQoIGV2LCB7IGxlZnQsIHRvcCB9ICk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfVxuICAgICAgICAgICBkYXRhLW5iZS1jb25uZWN0YWJsZT17dHJ1ZX1cbiAgICAgICAgICAgZGF0YS1uYmUtdHlwZT17cG9ydC50eXBlfVxuICAgICAgICAgICBkYXRhLW5iZS1kaXJlY3Rpb249e3BvcnQuZGlyZWN0aW9ufVxuICAgICAgICAgICBkYXRhLW5iZS1wb3J0PXtwb3J0LmlkfVxuICAgICAgICAgICBkYXRhLW5iZS12ZXJ0ZXg9e3ZlcnRleC5pZH0+XG4gICAgICAgIHsgcG9ydC5kaXJlY3Rpb24gPT09IE9VVCA/IHBvcnQubGFiZWwgOiAnJyB9XG4gICAgICAgIDxpIGNsYXNzTmFtZT1cIm5iZS1wb3J0LWhhbmRsZVwiXG4gICAgICAgICAgIHJlZj1cImhhbmRsZVwiXG4gICAgICAgICAgIG9uTW91c2VEb3duPXtzdGFydERyYWd9XG4gICAgICAgICAgIG9uRG91YmxlQ2xpY2s9e2Rpc2Nvbm5lY3R9IC8+XG4gICAgICAgIHsgcG9ydC5kaXJlY3Rpb24gPT09IElOID8gcG9ydC5sYWJlbCA6ICcnIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICBmdW5jdGlvbiBkaXNjb25uZWN0KCkge1xuICAgICAgaWYoIHNldHRpbmdzLm1vZGUgPT09IFJFQURfV1JJVEUgKSB7XG4gICAgICAgIGV2ZW50SGFuZGxlciggQ3JlYXRlQ2hlY2twb2ludCgpICk7XG4gICAgICAgIGV2ZW50SGFuZGxlciggRGlzY29ubmVjdFBvcnQoeyB2ZXJ0ZXg6IHZlcnRleCwgcG9ydDogcG9ydCB9KSApO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgcG9ydCwgZXZlbnRIYW5kbGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5vZGUgPSBSZWFjdC5maW5kRE9NTm9kZSggdGhpcy5yZWZzLmhhbmRsZSApO1xuICAgIGNvbnN0IGNvb3JkcyA9IENvb3Jkcyh7XG4gICAgICBsZWZ0OiBub2RlLm9mZnNldExlZnQgKyAobm9kZS5vZmZzZXRXaWR0aCAvIDIpLFxuICAgICAgdG9wOiBub2RlLm9mZnNldFRvcCArIChub2RlLm9mZnNldEhlaWdodCAvIDIpXG4gICAgfSk7XG4gICAgZXZlbnRIYW5kbGVyKCBNZWFzdXJlUG9ydCh7IHBvcnQ6IHBvcnQsIGNlbnRlcjogY29vcmRzIH0pICk7XG4gIH0sXG5cblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcywgbmV4dFN0YXRlICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuZnVuY3Rpb24gdmVydGV4Tm9kZSggcG9ydCApIHtcbiAgbGV0IHJlc3VsdCA9IHBvcnQucGFyZW50Tm9kZTtcbiAgd2hpbGUgKCByZXN1bHQgKSB7XG4gICAgaWYoIC9cXGJuYmUtdmVydGV4XFxiLy50ZXN0KCByZXN1bHQuY2xhc3NOYW1lICkgKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXN1bHQgPSByZXN1bHQucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBvcnQ7XG4iXX0=