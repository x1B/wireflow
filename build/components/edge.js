define(['exports', 'module', 'react', '../util/dragdrop', '../model', '../actions/layout', '../actions/selection', '../util/metrics', '../util/shallow-equal', '../actions/history'], function (exports, module, _react, _utilDragdrop, _model, _actionsLayout, _actionsSelection, _utilMetrics, _utilShallowEqual, _actionsHistory) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _count = _interopRequireDefault(_utilMetrics);

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
            _this.bubble((0, _actionsHistory.CreateCheckpoint)({ before: 'Move Edge' }));
            return true;
          },
          onMove: function onMove(_ref) {
            var dragPayload = _ref.dragPayload;
            var dragX = _ref.dragX;
            var dragY = _ref.dragY;
            var dragNode = _ref.dragNode;

            if (selected) {
              _this.bubble((0, _actionsSelection.MoveSelection)({
                reference: dragPayload,
                offset: (0, _model.Coords)({ left: dragX, top: dragY })
              }));
            } else {
              var _dragPayload$coords = dragPayload.coords;
              var left = _dragPayload$coords.left;
              var _top = _dragPayload$coords.top;

              _this.bubble((0, _actionsLayout.MoveEdge)({
                edge: edge,
                to: (0, _model.Coords)({ left: left + dragX, top: _top + dragY })
              }));
            }
          },
          onClick: function onClick(ev) {
            if (ev.shiftKey) {
              _this.bubble((selected ? _actionsSelection.DeselectEdge : _actionsSelection.SelectEdge)({ edge: edge }));
            } else {
              _this.bubble((0, _actionsSelection.ClearSelection)());
              _this.bubble((0, _actionsSelection.SelectEdge)({ edge: edge }));
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

      this.bubble((0, _actionsLayout.MeasureEdge)({
        edge: edge,
        measurements: (0, _actionsLayout.EdgeMeasurements)({
          dimensions: (0, _model.Dimensions)({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VkZ2UuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFvQkEsTUFBTSxJQUFJLEdBQUcsT0FBTSxXQUFXLENBQUM7OztBQUU3QixVQUFNLEVBQUEsa0JBQUc7OzttQkFDNEIsSUFBSSxDQUFDLEtBQUs7VUFBckMsSUFBSSxVQUFKLElBQUk7VUFBRSxRQUFRLFVBQVIsUUFBUTtVQUFFLE1BQU0sVUFBTixNQUFNO1VBQ3RCLEVBQUUsR0FBa0IsSUFBSSxDQUF4QixFQUFFO1VBQUUsSUFBSSxHQUFZLElBQUksQ0FBcEIsSUFBSTtVQUFFLEtBQUssR0FBSyxJQUFJLENBQWQsS0FBSzs7QUFDdkIsNkJBQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7O0FBRWxDLFVBQU0sS0FBSyxHQUFHO0FBQ1osZ0JBQVEsRUFBRSxVQUFVO0FBQ3BCLGtCQUFVLEVBQUUsTUFBTSxHQUFHLFNBQVMsR0FBRyxRQUFRO0FBQ3pDLFlBQUksRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFO0FBQy9CLFdBQUcsRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFO09BQzlCLENBQUM7O0FBRUYsVUFBTSxhQUFhLEdBQUcsUUFBUSxHQUFHLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDckQsVUFBTSxTQUFTLG1DQUFpQyxJQUFJLFNBQUksYUFBYSxDQUFHOztBQUV4RSxVQUFNLEVBQUUsR0FBRyxTQUFMLEVBQUU7ZUFBUyxtQkFBUztBQUN4QixpQkFBTyxFQUFFLG1CQUFNO0FBQ2Isa0JBQUssTUFBTSxDQUFFLG9CQTdCbkIsZ0JBQWdCLEVBNkJvQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFFLENBQUM7QUFDekQsbUJBQU8sSUFBSSxDQUFDO1dBQ2I7QUFDRCxnQkFBTSxFQUFFLGdCQUFDLElBQXVDLEVBQUs7Z0JBQTFDLFdBQVcsR0FB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RSxXQW5HSCxVQUFVLEVBbUdJO0FBQ3JCLGlCQUFLLEVBQUUsWUFBWSxDQUFDLFdBQVc7QUFDL0Isa0JBQU0sRUFBRSxZQUFZLENBQUMsWUFBWTtXQUNsQyxDQUFDO1NBQ0gsQ0FBQztPQUNILENBQUMsQ0FBRSxDQUFDO0tBQ047O0FBRUQseUJBQXFCLEVBQUEsK0JBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRztBQUM1QyxhQUFPLENBQUMsdUJBQWMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQztLQUMvQzs7R0FFRixDQUFDLENBQUM7O21CQUVZLElBQUkiLCJmaWxlIjoiZWRnZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBkcmFnZHJvcCBmcm9tICcuLi91dGlsL2RyYWdkcm9wJztcblxuaW1wb3J0IHsgQ29vcmRzLCBEaW1lbnNpb25zIH0gZnJvbSAnLi4vbW9kZWwnO1xuaW1wb3J0IHsgTWVhc3VyZUVkZ2UsIEVkZ2VNZWFzdXJlbWVudHMsIE1vdmVFZGdlIH0gZnJvbSAnLi4vYWN0aW9ucy9sYXlvdXQnO1xuaW1wb3J0IHsgTW92ZVNlbGVjdGlvbiB9IGZyb20gJy4uL2FjdGlvbnMvc2VsZWN0aW9uJztcbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuaW1wb3J0ICogYXMgc2hhbGxvd0VxdWFsIGZyb20gJy4uL3V0aWwvc2hhbGxvdy1lcXVhbCc7XG5cbmltcG9ydCB7XG4gIENyZWF0ZUNoZWNrcG9pbnRcbn0gZnJvbSAnLi4vYWN0aW9ucy9oaXN0b3J5JztcblxuaW1wb3J0IHtcbiAgU2VsZWN0RWRnZSxcbiAgRGVzZWxlY3RFZGdlLFxuICBDbGVhclNlbGVjdGlvblxufSBmcm9tICcuLi9hY3Rpb25zL3NlbGVjdGlvbic7XG5cblxuY29uc3QgRWRnZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBlZGdlLCBzZWxlY3RlZCwgbGF5b3V0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgaWQsIHR5cGUsIGxhYmVsIH0gPSBlZGdlO1xuICAgIGNvdW50KHsgd2hhdDogRWRnZS5kaXNwbGF5TmFtZSB9KTtcblxuICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIC8vIDpUT0RPOiBtb3ZlIHRvIHN0eWxlc2hlZXRcbiAgICAgIHZpc2liaWxpdHk6IGxheW91dCA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nLFxuICAgICAgbGVmdDogbGF5b3V0ID8gbGF5b3V0LmxlZnQgOiA1MCxcbiAgICAgIHRvcDogbGF5b3V0ID8gbGF5b3V0LnRvcCA6IDUwXG4gICAgfTtcblxuICAgIGNvbnN0IHNlbGVjdGVkQ2xhc3MgPSBzZWxlY3RlZCA/ICduYmUtc2VsZWN0ZWQnIDogJyc7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gYG5iZS1ub2RlIG5iZS1lZGdlIG5iZS10eXBlLSR7dHlwZX0gJHtzZWxlY3RlZENsYXNzfWA7XG5cbiAgICBjb25zdCBkZCA9ICgpID0+IGRyYWdkcm9wKHtcbiAgICAgIG9uU3RhcnQ6ICgpID0+IHtcbiAgICAgICAgdGhpcy5idWJibGUoIENyZWF0ZUNoZWNrcG9pbnQoeyBiZWZvcmU6ICdNb3ZlIEVkZ2UnIH0pICk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIG9uTW92ZTogKHsgZHJhZ1BheWxvYWQsIGRyYWdYLCBkcmFnWSwgZHJhZ05vZGUgfSkgPT4ge1xuICAgICAgICBpZiggc2VsZWN0ZWQgKSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIE1vdmVTZWxlY3Rpb24oe1xuICAgICAgICAgICAgcmVmZXJlbmNlOiBkcmFnUGF5bG9hZCxcbiAgICAgICAgICAgIG9mZnNldDogQ29vcmRzKHsgbGVmdDogZHJhZ1gsIHRvcDogZHJhZ1kgfSlcbiAgICAgICAgICB9KSApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBkcmFnUGF5bG9hZC5jb29yZHM7XG4gICAgICAgICAgdGhpcy5idWJibGUoIE1vdmVFZGdlKHtcbiAgICAgICAgICAgIGVkZ2U6IGVkZ2UsXG4gICAgICAgICAgICB0bzogQ29vcmRzKHsgbGVmdDogbGVmdCArIGRyYWdYLCB0b3A6IHRvcCArIGRyYWdZIH0pXG4gICAgICAgICAgfSkgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uQ2xpY2s6ICggZXYgKSA9PiB7XG4gICAgICAgIGlmKCBldi5zaGlmdEtleSApIHtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggKHNlbGVjdGVkID8gRGVzZWxlY3RFZGdlIDogU2VsZWN0RWRnZSkoeyBlZGdlIH0pICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5idWJibGUoIENsZWFyU2VsZWN0aW9uKCkgKTtcbiAgICAgICAgICB0aGlzLmJ1YmJsZSggU2VsZWN0RWRnZSh7IGVkZ2UgfSkgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qgc3RhcnREcmFnID0gKCBldiApID0+IGRkKCkuc3RhcnQoIGV2LCB7IGNvb3JkczogbGF5b3V0LCBpZDoge30gfSApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmJlLWVkZ2UtaWNvblwiXG4gICAgICAgICAgICAgcmVmPVwiaWNvblwiXG4gICAgICAgICAgICAgb25Nb3VzZURvd249e3N0YXJ0RHJhZ31cbiAgICAgICAgICAgICBkYXRhLW5iZS1jb25uZWN0YWJsZT17dHJ1ZX1cbiAgICAgICAgICAgICBkYXRhLW5iZS1lZGdlPXtpZH1cbiAgICAgICAgICAgICBkYXRhLW5iZS10eXBlPXt0eXBlfSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5iZS1lZGdlLWxhYmVsXCI+e2xhYmVsIHx8IGlkfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcblxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMubWVhc3VyZSgpO1xuICB9LFxuXG5cbiAgYnViYmxlKCBldmVudCApIHtcbiAgICBjb25zdCB7IGV2ZW50SGFuZGxlciB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyICYmIGV2ZW50SGFuZGxlciggZXZlbnQgKTtcbiAgfSxcblxuXG4gIG1lYXN1cmUoKSB7XG4gICAgY29uc3QgZG9tSWNvbiA9IFJlYWN0LmZpbmRET01Ob2RlKCB0aGlzLnJlZnMuaWNvbiApO1xuICAgIGNvbnN0IGRvbUNvbnRhaW5lciA9IGRvbUljb24ucGFyZW50Tm9kZTtcbiAgICBjb25zdCB7IGVkZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgdGhpcy5idWJibGUoIE1lYXN1cmVFZGdlKHtcbiAgICAgIGVkZ2U6IGVkZ2UsXG4gICAgICBtZWFzdXJlbWVudHM6IEVkZ2VNZWFzdXJlbWVudHMoe1xuICAgICAgICBkaW1lbnNpb25zOiBEaW1lbnNpb25zKHtcbiAgICAgICAgICB3aWR0aDogZG9tQ29udGFpbmVyLm9mZnNldFdpZHRoLFxuICAgICAgICAgIGhlaWdodDogZG9tQ29udGFpbmVyLm9mZnNldEhlaWdodFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KSApO1xuICB9LFxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzLCBuZXh0U3RhdGUgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBFZGdlO1xuIl19