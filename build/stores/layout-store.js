define(['exports', 'module', 'immutable', '../model', '../actions/layout', '../actions/graph', '../actions/history', '../util/settings', '../util/layout'], function (exports, module, _immutable, _model, _actionsLayout, _actionsGraph, _actionsHistory, _utilSettings, _utilLayout) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var edgeOffset = _utilSettings.layout.edgeOffset;

  /**
   * Manages the graph layout prop.
   */

  var LayoutStore = (function () {
    function LayoutStore(dispatcher, layout, graphStore) {
      var _this = this;

      _classCallCheck(this, LayoutStore);

      this.dispatcher = dispatcher;

      this.graphStore = graphStore;
      this.storeId = this.constructor.name;
      this.layout = layout;
      this.measurements = (0, _model.Measurements)();
      this.save();

      dispatcher.register(_actionsLayout.MeasureVertex, function (ev) {
        _this.measurements = _this.measurements.setIn(['vertices', ev.vertex.id], ev.measurements);
        _this.save();
      });

      dispatcher.register(_actionsLayout.MeasureEdge, function (ev) {
        _this.measurements = _this.measurements.setIn(['edges', ev.edge.id], ev.measurements);
        _this.save();
      });

      dispatcher.register(_actionsLayout.AutoLayout, function (ev) {
        _this.layout = _model.convert.layout((0, _utilLayout.calculateLayout)(graphStore.graph, (0, _immutable.Map)(_this.measurements)));
        _this.save();
      });

      dispatcher.register(_actionsGraph.RemoveVertex, function (ev) {
        _this.layout = _this.layout.removeIn(['vertices', ev.vertexId]);
        _this.save();
      });

      dispatcher.register(_actionsGraph.RemoveEdge, function (ev) {
        _this.layout = _this.layout.removeIn(['vertices', ev.edgeId]);
        _this.save();
      });

      dispatcher.register(_actionsLayout.MoveVertex, function (ev) {
        _this.layout = _this.layout.setIn(['vertices', ev.vertex.id], ev.to);
        _this.save();
      });

      dispatcher.register(_actionsLayout.MoveEdge, function (ev) {
        _this.layout = _this.layout.setIn(['edges', ev.edge.id], ev.to);
        _this.save();
      });

      dispatcher.register(_actionsLayout.HandleEdgeInserted, function (ev) {
        _this.layout = _this.placeEdge(ev.edge, ev.from, ev.to);
        _this.save();
      });

      dispatcher.register(_actionsHistory.RestoreState, function (act) {
        if (act.storeId === _this.storeId) {
          _this.layout = act.state.get(0);
          _this.measurements = act.state.get(1);
        }
      });
    }

    _createClass(LayoutStore, [{
      key: 'save',
      value: function save() {
        this.dispatcher.dispatch((0, _actionsHistory.SaveState)({
          storeId: this.storeId,
          state: _immutable.List.of(this.layout, this.measurements)
        }));
      }
    }, {
      key: 'moveSelection',
      value: function moveSelection(selection, referenceLayout, offset) {
        var left = offset.left;
        var top = offset.top;

        var targetLayout = referenceLayout;
        ['vertices', 'edges'].forEach(function (kind) {
          return selection[kind].forEach(function (id) {
            targetLayout = targetLayout.updateIn([kind, id], function (coords) {
              return (0, _model.Coords)({
                left: coords.left + left,
                top: coords.top + top
              });
            });
          });
        });
        this.layout = targetLayout;
        this.save();
      }
    }, {
      key: 'placeEdge',
      value: function placeEdge(edge, from, to) {
        var measurements = this.measurements;
        var layout = this.layout;

        var fromMeasurements = measurements.vertices.get(from.vertexId);
        var toMeasurements = measurements.vertices.get(to.vertexId);
        var fromCoords = layout.vertices.get(from.vertexId);
        var toCoords = layout.vertices.get(to.vertexId);

        var left = (fromCoords.left + fromMeasurements.dimensions.width + toCoords.left) / 2;

        var fromPortBox = fromMeasurements.getIn([from.direction, from.portId]);
        var toPortBox = toMeasurements.getIn([to.direction, to.portId]);
        var top = (fromCoords.top + fromPortBox.top + toCoords.top + toPortBox.top - edgeOffset) / 2;

        return this.layout.setIn(['edges', edge.id], (0, _model.Coords)({
          left: left,
          top: top
        }));
      }
    }]);

    return LayoutStore;
  })();

  module.exports = LayoutStore;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvd2lyZWZsb3cvc3JjL3N0b3Jlcy9sYXlvdXQtc3RvcmUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7TUFla0IsVUFBVSxpQkFBcEIsTUFBTSxDQUFJLFVBQVU7Ozs7OztNQVF0QixXQUFXO0FBRUosYUFGUCxXQUFXLENBRUYsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUc7Ozs0QkFGMUMsV0FBVzs7QUFHYixVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDN0IsVUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztBQUNyQyxVQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixVQUFJLENBQUMsWUFBWSxHQUFHLFdBN0JQLFlBQVksR0E2QlMsQ0FBQztBQUNuQyxVQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBR1osZ0JBQVUsQ0FBQyxRQUFRLGdCQTVCckIsYUFBYSxFQTRCeUIsVUFBQSxFQUFFLEVBQUk7QUFDeEMsY0FBSyxZQUFZLEdBQUcsTUFBSyxZQUFZLENBQUMsS0FBSyxDQUN6QyxDQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBRSxFQUM1QixFQUFFLENBQUMsWUFBWSxDQUNoQixDQUFDO0FBQ0YsY0FBSyxJQUFJLEVBQUUsQ0FBQztPQUNiLENBQUUsQ0FBQzs7QUFFSixnQkFBVSxDQUFDLFFBQVEsZ0JBckNyQixXQUFXLEVBcUN5QixVQUFBLEVBQUUsRUFBSTtBQUN0QyxjQUFLLFlBQVksR0FBRyxNQUFLLFlBQVksQ0FBQyxLQUFLLENBQ3pDLENBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFFLEVBQ3ZCLEVBQUUsQ0FBQyxZQUFZLENBQ2hCLENBQUM7QUFDRixjQUFLLElB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RUFBRSxDQUFDLFFBQVEsQ0FBRSxDQUFDOztBQUVwRCxZQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBLEdBQUksQ0FBQyxDQUFDOztBQUV2RixZQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDO0FBQzVFLFlBQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBRSxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDO0FBQ3BFLFlBQU0sR0FBRyxHQUFHLENBQ1YsVUFBVSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsR0FDN0QsVUFBVSxDQUFBLEdBQ1YsQ0FBQyxDQUFDOztBQUVOLGVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsQ0FBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBRSxFQUFFLFdBcEkzQyxNQUFNLEVBb0k0QztBQUNyRCxjQUFJLEVBQUUsSUFBSTtBQUNWLGFBQUcsRUFBRSxHQUFHO1NBQ1QsQ0FBQyxDQUFFLENBQUM7T0FDTjs7O1dBbkhHLFdBQVc7OzttQkFzSEYsV0FBVyIsImZpbGUiOiIvVXNlcnMvbWljaGFlbC93b3JrL2dpdGh1Yi5jb20veDFCL3dpcmVmbG93L3NyYy9zdG9yZXMvbGF5b3V0LXN0b3JlLmpzeCIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0LCBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuXG5pbXBvcnQgeyBDb29yZHMsIE1lYXN1cmVtZW50cywgY29udmVydCB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7XG4gIEF1dG9MYXlvdXQsXG4gIEhhbmRsZUVkZ2VJbnNlcnRlZCxcbiAgTWVhc3VyZUVkZ2UsXG4gIE1lYXN1cmVWZXJ0ZXgsXG4gIE1vdmVFZGdlLFxuICBNb3ZlVmVydGV4XG59IGZyb20gJy4uL2FjdGlvbnMvbGF5b3V0JztcblxuaW1wb3J0IHsgUmVtb3ZlVmVydGV4LCBSZW1vdmVFZGdlIH0gZnJvbSAnLi4vYWN0aW9ucy9ncmFwaCc7XG5pbXBvcnQgeyBTYXZlU3RhdGUsIFJlc3RvcmVTdGF0ZSB9IGZyb20gJy4uL2FjdGlvbnMvaGlzdG9yeSc7XG5pbXBvcnQgKiBhcyBzZXR0aW5ncyBmcm9tICcuLi91dGlsL3NldHRpbmdzJztcbmNvbnN0IHsgbGF5b3V0OiB7IGVkZ2VPZmZzZXQgfSB9ID0gc2V0dGluZ3M7XG5cbmltcG9ydCB7IGNhbGN1bGF0ZUxheW91dCB9IGZyb20gJy4uL3V0aWwvbGF5b3V0JztcblxuXG4vKipcbiAqIE1hbmFnZXMgdGhlIGdyYXBoIGxheW91dCBwcm9wLlxuICovXG5jbGFzcyBMYXlvdXRTdG9yZSB7XG5cbiAgY29uc3RydWN0b3IoIGRpc3BhdGNoZXIsIGxheW91dCwgZ3JhcGhTdG9yZSApIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuXG4gICAgdGhpcy5ncmFwaFN0b3JlID0gZ3JhcGhTdG9yZTtcbiAgICB0aGlzLnN0b3JlSWQgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgdGhpcy5sYXlvdXQgPSBsYXlvdXQ7XG4gICAgdGhpcy5tZWFzdXJlbWVudHMgPSBNZWFzdXJlbWVudHMoKTtcbiAgICB0aGlzLnNhdmUoKTtcblxuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggTWVhc3VyZVZlcnRleCwgZXYgPT4ge1xuICAgICAgdGhpcy5tZWFzdXJlbWVudHMgPSB0aGlzLm1lYXN1cmVtZW50cy5zZXRJbihcbiAgICAgICAgWyAndmVydGljZXMnLCBldi52ZXJ0ZXguaWQgXSxcbiAgICAgICAgZXYubWVhc3VyZW1lbnRzXG4gICAgICApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggTWVhc3VyZUVkZ2UsIGV2ID0+IHtcbiAgICAgIHRoaXMubWVhc3VyZW1lbnRzID0gdGhpcy5tZWFzdXJlbWVudHMuc2V0SW4oXG4gICAgICAgIFsgJ2VkZ2VzJywgZXYuZWRnZS5pZCBdLFxuICAgICAgICBldi5tZWFzdXJlbWVudHNcbiAgICAgICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBBdXRvTGF5b3V0LCBldiA9PiB7XG4gICAgICB0aGlzLmxheW91dCA9IGNvbnZlcnQubGF5b3V0KFxuICAgICAgICBjYWxjdWxhdGVMYXlvdXQoIGdyYXBoU3RvcmUuZ3JhcGgsIE1hcCh0aGlzLm1lYXN1cmVtZW50cykgKVxuICAgICAgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFJlbW92ZVZlcnRleCwgZXYgPT4ge1xuICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLmxheW91dC5yZW1vdmVJbiggWyAndmVydGljZXMnLCBldi52ZXJ0ZXhJZCBdICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZW1vdmVFZGdlLCBldiA9PiB7XG4gICAgICB0aGlzLmxheW91dCA9IHRoaXMubGF5b3V0LnJlbW92ZUluKCBbICd2ZXJ0aWNlcycsIGV2LmVkZ2VJZCBdICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBNb3ZlVmVydGV4LCBldiA9PiB7XG4gICAgICB0aGlzLmxheW91dCA9IHRoaXMubGF5b3V0LnNldEluKCBbICd2ZXJ0aWNlcycsIGV2LnZlcnRleC5pZCBdLCBldi50byApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggTW92ZUVkZ2UsIGV2ID0+IHtcbiAgICAgIHRoaXMubGF5b3V0ID0gdGhpcy5sYXlvdXQuc2V0SW4oIFsgJ2VkZ2VzJywgZXYuZWRnZS5pZCBdLCBldi50byApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggSGFuZGxlRWRnZUluc2VydGVkLCBldiA9PiB7XG4gICAgICB0aGlzLmxheW91dCA9IHRoaXMucGxhY2VFZGdlKCBldi5lZGdlLCBldi5mcm9tLCBldi50byApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggUmVzdG9yZVN0YXRlLCBhY3QgPT4ge1xuICAgICAgaWYoIGFjdC5zdG9yZUlkID09PSB0aGlzLnN0b3JlSWQgKSB7XG4gICAgICAgIHRoaXMubGF5b3V0ID0gYWN0LnN0YXRlLmdldCgwKTtcbiAgICAgICAgdGhpcy5tZWFzdXJlbWVudHMgPSBhY3Quc3RhdGUuZ2V0KDEpO1xuICAgICAgfVxuICAgIH0gKTtcbiAgfVxuXG5cbiAgc2F2ZSgpIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIuZGlzcGF0Y2goIFNhdmVTdGF0ZSh7XG4gICAgICBzdG9yZUlkOiB0aGlzLnN0b3JlSWQsXG4gICAgICBzdGF0ZTogTGlzdC5vZiggdGhpcy5sYXlvdXQsIHRoaXMubWVhc3VyZW1lbnRzIClcbiAgICB9KSApO1xuICB9XG5cblxuICBtb3ZlU2VsZWN0aW9uKCBzZWxlY3Rpb24sIHJlZmVyZW5jZUxheW91dCwgb2Zmc2V0ICkge1xuICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBvZmZzZXQ7XG4gICAgdmFyIHRhcmdldExheW91dCA9IHJlZmVyZW5jZUxheW91dDtcbiAgICBbICd2ZXJ0aWNlcycsICdlZGdlcycgXS5mb3JFYWNoKCBraW5kID0+XG4gICAgICBzZWxlY3Rpb25bIGtpbmQgXS5mb3JFYWNoKCBpZCA9PiB7XG4gICAgICAgIHRhcmdldExheW91dCA9IHRhcmdldExheW91dC51cGRhdGVJbiggWyBraW5kLCBpZCBdLCBjb29yZHMgPT5cbiAgICAgICAgICBDb29yZHMoe1xuICAgICAgICAgICAgbGVmdDogY29vcmRzLmxlZnQgKyBsZWZ0LFxuICAgICAgICAgICAgdG9wOiBjb29yZHMudG9wICsgdG9wXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0gKVxuICAgICk7XG4gICAgdGhpcy5sYXlvdXQgPSB0YXJnZXRMYXlvdXQ7XG4gICAgdGhpcy5zYXZlKCk7XG4gIH1cblxuXG4gIHBsYWNlRWRnZSggZWRnZSwgZnJvbSwgdG8gKSB7XG4gICAgY29uc3QgeyBtZWFzdXJlbWVudHMsIGxheW91dCB9ID0gdGhpcztcbiAgICBjb25zdCBmcm9tTWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmdldCggZnJvbS52ZXJ0ZXhJZCApO1xuICAgIGNvbnN0IHRvTWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmdldCggdG8udmVydGV4SWQgKTtcbiAgICBjb25zdCBmcm9tQ29vcmRzID0gbGF5b3V0LnZlcnRpY2VzLmdldCggZnJvbS52ZXJ0ZXhJZCApO1xuICAgIGNvbnN0IHRvQ29vcmRzID0gbGF5b3V0LnZlcnRpY2VzLmdldCggdG8udmVydGV4SWQgKTtcblxuICAgIGNvbnN0IGxlZnQgPSAoZnJvbUNvb3Jkcy5sZWZ0ICsgZnJvbU1lYXN1cmVtZW50cy5kaW1lbnNpb25zLndpZHRoICsgdG9Db29yZHMubGVmdCkgLyAyO1xuXG4gICAgY29uc3QgZnJvbVBvcnRCb3ggPSBmcm9tTWVhc3VyZW1lbnRzLmdldEluKFsgZnJvbS5kaXJlY3Rpb24sIGZyb20ucG9ydElkIF0pO1xuICAgIGNvbnN0IHRvUG9ydEJveCA9IHRvTWVhc3VyZW1lbnRzLmdldEluKFsgdG8uZGlyZWN0aW9uLCB0by5wb3J0SWQgXSk7XG4gICAgY29uc3QgdG9wID0gKFxuICAgICAgZnJvbUNvb3Jkcy50b3AgKyBmcm9tUG9ydEJveC50b3AgKyB0b0Nvb3Jkcy50b3AgKyB0b1BvcnRCb3gudG9wXG4gICAgICAtIGVkZ2VPZmZzZXRcbiAgICApIC8gMjtcblxuICAgIHJldHVybiB0aGlzLmxheW91dC5zZXRJbiggWyAnZWRnZXMnLCBlZGdlLmlkIF0sIENvb3Jkcyh7XG4gICAgICBsZWZ0OiBsZWZ0LFxuICAgICAgdG9wOiB0b3BcbiAgICB9KSApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExheW91dFN0b3JlO1xuIl19