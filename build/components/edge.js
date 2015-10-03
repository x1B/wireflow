define(['exports', 'module', 'react', '../util/dragdrop', '../util/shallow-equal', '../util/metrics', '../flux/history/history-actions', '../flux/layout/layout-model', '../flux/layout/layout-actions', '../flux/selection/selection-actions'], function (exports, module, _react, _utilDragdrop, _utilShallowEqual, _utilMetrics, _fluxHistoryHistoryActions, _fluxLayoutLayoutModel, _fluxLayoutLayoutActions, _fluxSelectionSelectionActions) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _count = _interopRequireDefault(_utilMetrics);

  var EdgeMeasurements = _fluxLayoutLayoutActions.payload.EdgeMeasurements;

  var Edge = _react.createClass({
    displayName: 'Edge',

    render: function render() {
      var _this = this;

      var _props = this.props;
      var edge = _props.edge;
      var selected = _props.selected;
      var layout = _props.layout;
      var id = edge.id;
      var type = edge.type;
      var label = edge.label;

      (0, _count['default'])({ what: Edge.displayName });

      var style = {
        position: 'absolute', // :TODO: move to stylesheet
        visibility: layout ? 'visible' : 'hidden',
        left: layout ? layout.left : 50,
        top: layout ? layout.top : 50
      };

      var selectedClass = selected ? 'nbe-selected' : '';
      var className = 'nbe-node nbe-edge nbe-type-' + type + ' ' + selectedClass;

      var dd = function dd() {
        return (0, _utilDragdrop)({
          onStart: function onStart() {
            _this.bubble((0, _fluxHistoryHistoryActions.CreateCheckpoint)({ before: 'Move Edge' }));
            return true;
          },
          onMove: function onMove(_ref) {
            var dragPayload = _ref.dragPayload;
            var dragX = _ref.dragX;
            var dragY = _ref.dragY;
            var dragNode = _ref.dragNode;

            if (selected) {
              _this.bubble((0, _fluxSelectionSelectionActions.MoveSelection)({
                reference: dragPayload,
                offset: (0, _fluxLayoutLayoutModel.Coords)({ left: dragX, top: dragY })
              }));
            } else {
              var _dragPayload$coords = dragPayload.coords;
              var left = _dragPayload$coords.left;
              var _top = _dragPayload$coords.top;

              _this.bubble((0, _fluxLayoutLayoutActions.MoveEdge)({
                edge: edge,
                to: (0, _fluxLayoutLayoutModel.Coords)({ left: left + dragX, top: _top + dragY })
              }));
            }
          },
          onClick: function onClick(ev) {
            if (ev.shiftKey) {
              _this.bubble((selected ? _fluxSelectionSelectionActions.DeselectEdge : _fluxSelectionSelectionActions.SelectEdge)({ edge: edge }));
            } else {
              _this.bubble((0, _fluxSelectionSelectionActions.ClearSelection)());
              _this.bubble((0, _fluxSelectionSelectionActions.SelectEdge)({ edge: edge }));
            }
          }
        });
      };

      var startDrag = function startDrag(ev) {
        return dd().start(ev, { coords: layout, id: {} });
      };

      return _react.createElement(
        'div',
        { style: style, className: className },
        _react.createElement('div', { className: 'nbe-edge-icon',
          ref: 'icon',
          onMouseDown: startDrag,
          'data-nbe-connectable': true,
          'data-nbe-edge': id,
          'data-nbe-type': type }),
        _react.createElement(
          'div',
          { className: 'nbe-edge-label' },
          label || id
        )
      );
    },

    componentDidMount: function componentDidMount() {
      this.measure();
    },

    bubble: function bubble(event) {
      var eventHandler = this.props.eventHandler;

      return eventHandler && eventHandler(event);
    },

    measure: function measure() {
      var domIcon = _react.findDOMNode(this.refs.icon);
      var domContainer = domIcon.parentNode;
      var edge = this.props.edge;

      this.bubble((0, _fluxLayoutLayoutActions.MeasureEdge)({
        edge: edge,
        measurements: EdgeMeasurements({
          dimensions: (0, _fluxLayoutLayoutModel.Dimensions)({
            width: domContainer.offsetWidth,
            height: domContainer.offsetHeight
          })
        })
      }));
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _utilShallowEqual)(nextProps, this.props);
    }

  });

  module.exports = Edge;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VkZ2UuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7TUFjUSxnQkFBZ0IsNEJBTlEsT0FBTyxDQU0vQixnQkFBZ0I7O0FBRXhCLE1BQU0sSUFBSSxHQUFHLE9BQU0sV0FBVyxDQUFDOzs7QUFFN0IsVUFBTSxFQUFBLGtCQUFHOzs7bUJBQzRCLElBQUksQ0FBQyxLQUFLO1VBQXJDLElBQUksVUFBSixJQUFJO1VBQUUsUUFBUSxVQUFSLFFBQVE7VUFBRSxNQUFNLFVBQU4sTUFBTTtVQUN0QixFQUFFLEdBQWtCLElBQUksQ0FBeEIsRUFBRTtVQUFFLElBQUksR0FBWSxJQUFJLENBQXBCLElBQUk7VUFBRSxLQUFLLEdBQUssSUFBSSxDQUFkLEtBQUs7O0FBQ3ZCLDZCQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDOztBQUVsQyxVQUFNLEtBQUssR0FBRztBQUNaLGdCQUFRLEVBQUUsVUFBVTtBQUNwQixrQkFBVSxFQUFFLE1BQU0sR0FBRyxTQUFTLEdBQUcsUUFBUTtBQUN6QyxZQUFJLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRTtBQUMvQixXQUFHLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRTtPQUM5QixDQUFDOztBQUVGLFVBQU0sYUFBYSxHQUFHLFFBQVEsR0FBRyxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3JELFVBQU0sU0FBUyxtQ0FBaUMsSUFBSSxTQUFJLGFBQWEsQ0FBRzs7QUFFeEUsVUFBTSxFQUFFLEdBQUcsU0FBTCxFQUFFO2VBQVMsbUJBQVM7QUFDeEIsaUJBQU8sRUFBRSxtQkFBTTtBQUNiLGtCQUFLLE1BQU0sQ0FBRSwrQkE3QlosZ0JBQWdCLEVBNkJhLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUUsQ0FBQztBQUN6RCxtQkFBTyxJQUFJLENBQUM7V0FDYjtBQUNELGdCQUFNLEVB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Z0JBQWdCLENBQUM7QUFDN0Isb0JBQVUsRUFBRSwyQkF4RkgsVUFBVSxFQXdGSTtBQUNyQixpQkFBSyxFQUFFLFlBQVksQ0FBQyxXQUFXO0FBQy9CLGtCQUFNLEVBQUUsWUFBWSxDQUFDLFlBQVk7V0FDbEMsQ0FBQztTQUNILENBQUM7T0FDSCxDQUFDLENBQUUsQ0FBQztLQUNOOztBQUVELHlCQUFxQixFQUFBLCtCQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUc7QUFDNUMsYUFBTyxDQUFDLHVCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7S0FDL0M7O0dBRUYsQ0FBQyxDQUFDOzttQkFFWSxJQUFJIiwiZmlsZSI6ImVkZ2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgKiBhcyBkcmFnZHJvcCBmcm9tICcuLi91dGlsL2RyYWdkcm9wJztcbmltcG9ydCAqIGFzIHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlsL3NoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IGNvdW50IGZyb20gJy4uL3V0aWwvbWV0cmljcyc7XG5cbmltcG9ydCB7IENyZWF0ZUNoZWNrcG9pbnQgfSBmcm9tICcuLi9mbHV4L2hpc3RvcnkvaGlzdG9yeS1hY3Rpb25zJztcbmltcG9ydCB7IENvb3JkcywgRGltZW5zaW9ucyB9IGZyb20gJy4uL2ZsdXgvbGF5b3V0L2xheW91dC1tb2RlbCc7XG5pbXBvcnQgeyBNZWFzdXJlRWRnZSwgTW92ZUVkZ2UsIHBheWxvYWQgfSBmcm9tICcuLi9mbHV4L2xheW91dC9sYXlvdXQtYWN0aW9ucyc7XG5pbXBvcnQge1xuICBNb3ZlU2VsZWN0aW9uLCBTZWxlY3RFZGdlLCBEZXNlbGVjdEVkZ2UsIENsZWFyU2VsZWN0aW9uXG59IGZyb20gJy4uL2ZsdXgvc2VsZWN0aW9uL3NlbGVjdGlvbi1hY3Rpb25zJztcblxuXG5jb25zdCB7IEVkZ2VNZWFzdXJlbWVudHMgfSA9IHBheWxvYWQ7XG5cbmNvbnN0IEVkZ2UgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZWRnZSwgc2VsZWN0ZWQsIGxheW91dCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGlkLCB0eXBlLCBsYWJlbCB9ID0gZWRnZTtcbiAgICBjb3VudCh7IHdoYXQ6IEVkZ2UuZGlzcGxheU5hbWUgfSk7XG5cbiAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCAvLyA6VE9ETzogbW92ZSB0byBzdHlsZXNoZWV0XG4gICAgICB2aXNpYmlsaXR5OiBsYXlvdXQgPyAndmlzaWJsZScgOiAnaGlkZGVuJyxcbiAgICAgIGxlZnQ6IGxheW91dCA/IGxheW91dC5sZWZ0IDogNTAsXG4gICAgICB0b3A6IGxheW91dCA/IGxheW91dC50b3AgOiA1MFxuICAgIH07XG5cbiAgICBjb25zdCBzZWxlY3RlZENsYXNzID0gc2VsZWN0ZWQgPyAnbmJlLXNlbGVjdGVkJyA6ICcnO1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGBuYmUtbm9kZSBuYmUtZWRnZSBuYmUtdHlwZS0ke3R5cGV9ICR7c2VsZWN0ZWRDbGFzc31gO1xuXG4gICAgY29uc3QgZGQgPSAoKSA9PiBkcmFnZHJvcCh7XG4gICAgICBvblN0YXJ0OiAoKSA9PiB7XG4gICAgICAgIHRoaXMuYnViYmxlKCBDcmVhdGVDaGVja3BvaW50KHsgYmVmb3JlOiAnTW92ZSBFZGdlJyB9KSApO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBvbk1vdmU6ICh7IGRyYWdQYXlsb2FkLCBkcmFnWCwgZHJhZ1ksIGRyYWdOb2RlIH0pID0+IHtcbiAgICAgICAgaWYoIHNlbGVjdGVkICkge1xuICAgICAgICAgIHRoaXMuYnViYmxlKCBNb3ZlU2VsZWN0aW9uKHtcbiAgICAgICAgICAgIHJlZmVyZW5jZTogZHJhZ1BheWxvYWQsXG4gICAgICAgICAgICBvZmZzZXQ6IENvb3Jkcyh7IGxlZnQ6IGRyYWdYLCB0b3A6IGRyYWdZIH0pXG4gICAgICAgICAgfSkgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gZHJhZ1BheWxvYWQuY29vcmRzO1xuICAgICAgICAgIHRoaXMuYnViYmxlKCBNb3ZlRWRnZSh7XG4gICAgICAgICAgICBlZGdlOiBlZGdlLFxuICAgICAgICAgICAgdG86IENvb3Jkcyh7IGxlZnQ6IGxlZnQgKyBkcmFnWCwgdG9wOiB0b3AgKyBkcmFnWSB9KVxuICAgICAgICAgIH0pICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvbkNsaWNrOiAoIGV2ICkgPT4ge1xuICAgICAgICBpZiggZXYuc2hpZnRLZXkgKSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIChzZWxlY3RlZCA/IERlc2VsZWN0RWRnZSA6IFNlbGVjdEVkZ2UpKHsgZWRnZSB9KSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMuYnViYmxlKCBDbGVhclNlbGVjdGlvbigpICk7XG4gICAgICAgICAgdGhpcy5idWJibGUoIFNlbGVjdEVkZ2UoeyBlZGdlIH0pICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0RHJhZyA9ICggZXYgKSA9PiBkZCgpLnN0YXJ0KCBldiwgeyBjb29yZHM6IGxheW91dCwgaWQ6IHt9IH0gKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbGFzc05hbWV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1lZGdlLWljb25cIlxuICAgICAgICAgICAgIHJlZj1cImljb25cIlxuICAgICAgICAgICAgIG9uTW91c2VEb3duPXtzdGFydERyYWd9XG4gICAgICAgICAgICAgZGF0YS1uYmUtY29ubmVjdGFibGU9e3RydWV9XG4gICAgICAgICAgICAgZGF0YS1uYmUtZWRnZT17aWR9XG4gICAgICAgICAgICAgZGF0YS1uYmUtdHlwZT17dHlwZX0gLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYmUtZWRnZS1sYWJlbFwiPntsYWJlbCB8fCBpZH08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5tZWFzdXJlKCk7XG4gIH0sXG5cbiAgYnViYmxlKCBldmVudCApIHtcbiAgICBjb25zdCB7IGV2ZW50SGFuZGxlciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyICYmIGV2ZW50SGFuZGxlciggZXZlbnQgKTtcbiAgfSxcblxuICBtZWFzdXJlKCkge1xuICAgIGNvbnN0IGRvbUljb24gPSBSZWFjdC5maW5kRE9NTm9kZSggdGhpcy5yZWZzLmljb24gKTtcbiAgICBjb25zdCBkb21Db250YWluZXIgPSBkb21JY29uLnBhcmVudE5vZGU7XG4gICAgY29uc3QgeyBlZGdlIH0gPSB0aGlzLnByb3BzO1xuICAgIHRoaXMuYnViYmxlKCBNZWFzdXJlRWRnZSh7XG4gICAgICBlZGdlOiBlZGdlLFxuICAgICAgbWVhc3VyZW1lbnRzOiBFZGdlTWVhc3VyZW1lbnRzKHtcbiAgICAgICAgZGltZW5zaW9uczogRGltZW5zaW9ucyh7XG4gICAgICAgICAgd2lkdGg6IGRvbUNvbnRhaW5lci5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGRvbUNvbnRhaW5lci5vZmZzZXRIZWlnaHRcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSkgKTtcbiAgfSxcblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcywgbmV4dFN0YXRlICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgRWRnZTtcbiJdfQ==