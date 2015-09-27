define(['exports', 'module', 'immutable', '../model', '../actions/layout', '../actions/graph', '../actions/history', '../util/settings'], function (exports, module, _immutable, _model, _actionsLayout, _actionsGraph, _actionsHistory, _utilSettings) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var edgeOffset = _utilSettings.layout.edgeOffset;

  /**
   * Manages the graph layout prop.
   */

  var LayoutStore = (function () {
    function LayoutStore(dispatcher, layout) {
      var _this = this;

      _classCallCheck(this, LayoutStore);

      this.dispatcher = dispatcher;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9zdG9yZXMvbGF5b3V0LXN0b3JlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O01BU2tCLFVBQVUsaUJBQXBCLE1BQU0sQ0FBSSxVQUFVOzs7Ozs7TUFNdEIsV0FBVztBQUVKLGFBRlAsV0FBVyxDQUVGLFVBQVUsRUFBRSxNQUFNLEVBQUc7Ozs0QkFGOUIsV0FBVzs7QUFHYixVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztBQUNyQyxVQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixVQUFJLENBQUMsWUFBWSxHQUFHLFdBcEJQLFlBQVksR0FvQlMsQ0FBQztBQUNuQyxVQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBR1osZ0JBQVUsQ0FBQyxRQUFRLGdCQXRCa0MsYUFBYSxFQXNCOUIsVUFBQSxFQUFFLEVBQUk7QUFDeEMsY0FBSyxZQUFZLEdBQUcsTUFBSyxZQUFZLENBQUMsS0FBSyxDQUN6QyxDQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBRSxFQUM1QixFQUFFLENBQUMsWUFBWSxDQUNoQixDQUFDO0FBQ0YsY0FBSyxJQUFJLEVBQUUsQ0FBQztPQUNiLENBQUUsQ0FBQzs7QUFFSixnQkFBVSxDQUFDLFFBQVEsZ0JBOUJxQixXQUFXLEVBOEJqQixVQUFBLEVBQUUsRUFBSTtBQUN0QyxjQUFLLFlBQVksR0FBRyxNQUFLLFlBQVksQ0FBQyxLQUFLLENBQ3pDLENBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFFLEVBQ3ZCLEVBQUUsQ0FBQyxZQUFZLENBQ2hCLENBQUM7QUFDRixjQUFLLElBQUksRUFBRSxDQUFDO09BQ2IsQ0FBRSxDQUFDOztBQUVKLGdCQUFVLENBQUMs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LEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUM7QUFDcEUsWUFBTSxHQUFHLEdBQUcsQ0FDVixVQUFVLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxHQUM3RCxVQUFVLENBQUEsR0FDVixDQUFDLENBQUM7O0FBRU4sZUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFFLEVBQUUsV0FwSDNDLE1BQU0sRUFvSDRDO0FBQ3JELGNBQUksRUFBRSxJQUFJO0FBQ1YsYUFBRyxFQUFFLEdBQUc7U0FDVCxDQUFDLENBQUUsQ0FBQztPQUNOOzs7V0EzR0csV0FBVzs7O21CQThHRixXQUFXIiwiZmlsZSI6Ii9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9zdG9yZXMvbGF5b3V0LXN0b3JlLmpzeCIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0IH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHsgQ29vcmRzLCBNZWFzdXJlbWVudHMgfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQge1xuICBNb3ZlVmVydGV4LCBNb3ZlRWRnZSwgSGFuZGxlRWRnZUluc2VydGVkLCBNZWFzdXJlRWRnZSwgTWVhc3VyZVZlcnRleFxufSBmcm9tICcuLi9hY3Rpb25zL2xheW91dCc7XG5pbXBvcnQgeyBSZW1vdmVWZXJ0ZXgsIFJlbW92ZUVkZ2UgfSBmcm9tICcuLi9hY3Rpb25zL2dyYXBoJztcbmltcG9ydCB7IFNhdmVTdGF0ZSwgUmVzdG9yZVN0YXRlIH0gZnJvbSAnLi4vYWN0aW9ucy9oaXN0b3J5JztcbmltcG9ydCAqIGFzIHNldHRpbmdzIGZyb20gJy4uL3V0aWwvc2V0dGluZ3MnO1xuY29uc3QgeyBsYXlvdXQ6IHsgZWRnZU9mZnNldCB9IH0gPSBzZXR0aW5ncztcblxuXG4vKipcbiAqIE1hbmFnZXMgdGhlIGdyYXBoIGxheW91dCBwcm9wLlxuICovXG5jbGFzcyBMYXlvdXRTdG9yZSB7XG5cbiAgY29uc3RydWN0b3IoIGRpc3BhdGNoZXIsIGxheW91dCApIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuXG4gICAgdGhpcy5zdG9yZUlkID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHRoaXMubGF5b3V0ID0gbGF5b3V0O1xuICAgIHRoaXMubWVhc3VyZW1lbnRzID0gTWVhc3VyZW1lbnRzKCk7XG4gICAgdGhpcy5zYXZlKCk7XG5cblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIE1lYXN1cmVWZXJ0ZXgsIGV2ID0+IHtcbiAgICAgIHRoaXMubWVhc3VyZW1lbnRzID0gdGhpcy5tZWFzdXJlbWVudHMuc2V0SW4oXG4gICAgICAgIFsgJ3ZlcnRpY2VzJywgZXYudmVydGV4LmlkIF0sXG4gICAgICAgIGV2Lm1lYXN1cmVtZW50c1xuICAgICAgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIE1lYXN1cmVFZGdlLCBldiA9PiB7XG4gICAgICB0aGlzLm1lYXN1cmVtZW50cyA9IHRoaXMubWVhc3VyZW1lbnRzLnNldEluKFxuICAgICAgICBbICdlZGdlcycsIGV2LmVkZ2UuaWQgXSxcbiAgICAgICAgZXYubWVhc3VyZW1lbnRzXG4gICAgICApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggUmVtb3ZlVmVydGV4LCBldiA9PiB7XG4gICAgICB0aGlzLmxheW91dCA9IHRoaXMubGF5b3V0LnJlbW92ZUluKCBbICd2ZXJ0aWNlcycsIGV2LnZlcnRleElkIF0gKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFJlbW92ZUVkZ2UsIGV2ID0+IHtcbiAgICAgIHRoaXMubGF5b3V0ID0gdGhpcy5sYXlvdXQucmVtb3ZlSW4oIFsgJ3ZlcnRpY2VzJywgZXYuZWRnZUlkIF0gKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIE1vdmVWZXJ0ZXgsIGV2ID0+IHtcbiAgICAgIHRoaXMubGF5b3V0ID0gdGhpcy5sYXlvdXQuc2V0SW4oIFsgJ3ZlcnRpY2VzJywgZXYudmVydGV4LmlkIF0sIGV2LnRvICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBNb3ZlRWRnZSwgZXYgPT4ge1xuICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLmxheW91dC5zZXRJbiggWyAnZWRnZXMnLCBldi5lZGdlLmlkIF0sIGV2LnRvICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBIYW5kbGVFZGdlSW5zZXJ0ZWQsIGV2ID0+IHtcbiAgICAgIHRoaXMubGF5b3V0ID0gdGhpcy5wbGFjZUVkZ2UoIGV2LmVkZ2UsIGV2LmZyb20sIGV2LnRvICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZXN0b3JlU3RhdGUsIGFjdCA9PiB7XG4gICAgICBpZiggYWN0LnN0b3JlSWQgPT09IHRoaXMuc3RvcmVJZCApIHtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBhY3Quc3RhdGUuZ2V0KDApO1xuICAgICAgICB0aGlzLm1lYXN1cmVtZW50cyA9IGFjdC5zdGF0ZS5nZXQoMSk7XG4gICAgICB9XG4gICAgfSApO1xuICB9XG5cblxuICBzYXZlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaCggU2F2ZVN0YXRlKHtcbiAgICAgIHN0b3JlSWQ6IHRoaXMuc3RvcmVJZCxcbiAgICAgIHN0YXRlOiBMaXN0Lm9mKCB0aGlzLmxheW91dCwgdGhpcy5tZWFzdXJlbWVudHMgKVxuICAgIH0pICk7XG4gIH1cblxuXG4gIG1vdmVTZWxlY3Rpb24oIHNlbGVjdGlvbiwgcmVmZXJlbmNlTGF5b3V0LCBvZmZzZXQgKSB7XG4gICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IG9mZnNldDtcbiAgICB2YXIgdGFyZ2V0TGF5b3V0ID0gcmVmZXJlbmNlTGF5b3V0O1xuICAgIFsgJ3ZlcnRpY2VzJywgJ2VkZ2VzJyBdLmZvckVhY2goIGtpbmQgPT5cbiAgICAgIHNlbGVjdGlvblsga2luZCBdLmZvckVhY2goIGlkID0+IHtcbiAgICAgICAgdGFyZ2V0TGF5b3V0ID0gdGFyZ2V0TGF5b3V0LnVwZGF0ZUluKCBbIGtpbmQsIGlkIF0sIGNvb3JkcyA9PlxuICAgICAgICAgIENvb3Jkcyh7XG4gICAgICAgICAgICBsZWZ0OiBjb29yZHMubGVmdCArIGxlZnQsXG4gICAgICAgICAgICB0b3A6IGNvb3Jkcy50b3AgKyB0b3BcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSApXG4gICAgKTtcbiAgICB0aGlzLmxheW91dCA9IHRhcmdldExheW91dDtcbiAgICB0aGlzLnNhdmUoKTtcbiAgfVxuXG5cbiAgcGxhY2VFZGdlKCBlZGdlLCBmcm9tLCB0byApIHtcbiAgICBjb25zdCB7IG1lYXN1cmVtZW50cywgbGF5b3V0IH0gPSB0aGlzO1xuICAgIGNvbnN0IGZyb21NZWFzdXJlbWVudHMgPSBtZWFzdXJlbWVudHMudmVydGljZXMuZ2V0KCBmcm9tLnZlcnRleElkICk7XG4gICAgY29uc3QgdG9NZWFzdXJlbWVudHMgPSBtZWFzdXJlbWVudHMudmVydGljZXMuZ2V0KCB0by52ZXJ0ZXhJZCApO1xuICAgIGNvbnN0IGZyb21Db29yZHMgPSBsYXlvdXQudmVydGljZXMuZ2V0KCBmcm9tLnZlcnRleElkICk7XG4gICAgY29uc3QgdG9Db29yZHMgPSBsYXlvdXQudmVydGljZXMuZ2V0KCB0by52ZXJ0ZXhJZCApO1xuXG4gICAgY29uc3QgbGVmdCA9IChmcm9tQ29vcmRzLmxlZnQgKyBmcm9tTWVhc3VyZW1lbnRzLmRpbWVuc2lvbnMud2lkdGggKyB0b0Nvb3Jkcy5sZWZ0KSAvIDI7XG5cbiAgICBjb25zdCBmcm9tUG9ydEJveCA9IGZyb21NZWFzdXJlbWVudHMuZ2V0SW4oWyBmcm9tLmRpcmVjdGlvbiwgZnJvbS5wb3J0SWQgXSk7XG4gICAgY29uc3QgdG9Qb3J0Qm94ID0gdG9NZWFzdXJlbWVudHMuZ2V0SW4oWyB0by5kaXJlY3Rpb24sIHRvLnBvcnRJZCBdKTtcbiAgICBjb25zdCB0b3AgPSAoXG4gICAgICBmcm9tQ29vcmRzLnRvcCArIGZyb21Qb3J0Qm94LnRvcCArIHRvQ29vcmRzLnRvcCArIHRvUG9ydEJveC50b3BcbiAgICAgIC0gZWRnZU9mZnNldFxuICAgICkgLyAyO1xuXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0LnNldEluKCBbICdlZGdlcycsIGVkZ2UuaWQgXSwgQ29vcmRzKHtcbiAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICB0b3A6IHRvcFxuICAgIH0pICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0U3RvcmU7XG4iXX0=