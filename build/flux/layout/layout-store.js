define(['exports', 'module', 'immutable', '../../util/settings', '../../util/layout', '../graph/graph-actions', '../history/history-actions', './layout-model', './layout-actions'], function (exports, module, _immutable, _utilSettings, _utilLayout, _graphGraphActions, _historyHistoryActions, _layoutModel, _layoutActions) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _settings = _interopRequireDefault(_utilSettings);

  var edgeOffset = _settings['default'].layout.edgeOffset;

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
      this.measurements = (0, _layoutModel.Measurements)();
      this.save();

      dispatcher.register(_layoutActions.MeasureVertex, function (ev) {
        _this.measurements = _this.measurements.setIn(['vertices', ev.vertex.id], ev.measurements);
        _this.save();
      });

      dispatcher.register(_layoutActions.MeasureEdge, function (ev) {
        _this.measurements = _this.measurements.setIn(['edges', ev.edge.id], ev.measurements);
        _this.save();
      });

      dispatcher.register(_layoutActions.AutoLayout, function (ev) {
        _this.layout = _layoutModel.convert.layout((0, _utilLayout.calculateLayout)(graphStore.graph, (0, _immutable.Map)(_this.measurements)));
        _this.save();
      });

      dispatcher.register(_graphGraphActions.RemoveVertex, function (ev) {
        _this.layout = _this.layout.removeIn(['vertices', ev.vertexId]);
        _this.save();
      });

      dispatcher.register(_graphGraphActions.RemoveEdge, function (ev) {
        _this.layout = _this.layout.removeIn(['vertices', ev.edgeId]);
        _this.save();
      });

      dispatcher.register(_layoutActions.MoveVertex, function (ev) {
        _this.layout = _this.layout.setIn(['vertices', ev.vertex.id], ev.to);
        _this.save();
      });

      dispatcher.register(_layoutActions.MoveEdge, function (ev) {
        _this.layout = _this.layout.setIn(['edges', ev.edge.id], ev.to);
        _this.save();
      });

      dispatcher.register(_layoutActions.HandleEdgeInserted, function (ev) {
        _this.layout = _this.placeEdge(ev.edge, ev.from, ev.to);
        _this.save();
      });

      dispatcher.register(_historyHistoryActions.RestoreState, function (act) {
        if (act.storeId === _this.storeId) {
          _this.layout = act.state.get(0);
          _this.measurements = act.state.get(1);
        }
      });
    }

    _createClass(LayoutStore, [{
      key: 'save',
      value: function save() {
        this.dispatcher.dispatch((0, _historyHistoryActions.SaveState)({
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
              return (0, _layoutModel.Coords)({
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

        return this.layout.setIn(['edges', edge.id], (0, _layoutModel.Coords)({
          left: left,
          top: top
        }));
      }
    }]);

    return LayoutStore;
  })();

  module.exports = LayoutStore;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2xheW91dC9sYXlvdXQtc3RvcmUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O01Ba0JrQixVQUFVLHdCQUFwQixNQUFNLENBQUksVUFBVTs7Ozs7O01BS3RCLFdBQVc7QUFFSixhQUZQLFdBQVcsQ0FFRixVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRzs7OzRCQUYxQyxXQUFXOztBQUdiLFVBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztBQUU3QixVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUM3QixVQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQ3JDLFVBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFVBQUksQ0FBQyxZQUFZLEdBQUcsaUJBeEJQLFlBQVksR0F3QlMsQ0FBQztBQUNuQyxVQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBR1osZ0JBQVUsQ0FBQyxRQUFRLGdCQXZCckIsYUFBYSxFQXVCeUIsVUFBQSxFQUFFLEVBQUk7QUFDeEMsY0FBSyxZQUFZLEdBQUcsTUFBSyxZQUFZLENBQUMsS0FBSyxDQUN6QyxDQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBRSxFQUM1QixFQUFFLENBQUMsWUFBWSxDQUNoQixDQUFDO0FBQ0YsY0FBSyxJQUFJLEVBQUUsQ0FBQztPQUNiLENBQUUsQ0FBQzs7QUFFSixnQkFBVSxDQUFDLFFBQVEsZ0JBaENyQixXQUFXLEVBZ0N5QixVQUFBLEVBQUUsRUFBSTtBQUN0QyxjQUFLLFlBQVksR0FBRyxNQUFLLFlBQVksQ0FBQyxLQUFLLENBQ3pDLENBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFFLEVBQ3ZCLEVBQUUsQ0FBQyxZQUFZLENBQ2hCLENBQUM7QUFDRixjQUFLLElBQUksRUFBRSxDQUFDO09BQ2IsQ0FBRSxD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QUFDOztBQUVwRCxZQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBLEdBQUksQ0FBQyxDQUFDOztBQUV2RixZQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDO0FBQzVFLFlBQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBRSxFQUFFLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDO0FBQ3BFLFlBQU0sR0FBRyxHQUFHLENBQ1YsVUFBVSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsR0FDN0QsVUFBVSxDQUFBLEdBQ1YsQ0FBQyxDQUFDOztBQUVOLGVBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUUsQ0FBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBRSxFQUFFLGlCQS9IM0MsTUFBTSxFQStINEM7QUFDckQsY0FBSSxFQUFFLElBQUk7QUFDVixhQUFHLEVBQUUsR0FBRztTQUNULENBQUMsQ0FBRSxDQUFDO09BQ047OztXQW5IRyxXQUFXOzs7bUJBc0hGLFdBQVciLCJmaWxlIjoibGF5b3V0LXN0b3JlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3QsIE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuLi8uLi91dGlsL3NldHRpbmdzJztcbmltcG9ydCB7IGNhbGN1bGF0ZUxheW91dCB9IGZyb20gJy4uLy4uL3V0aWwvbGF5b3V0JztcblxuaW1wb3J0IHsgUmVtb3ZlVmVydGV4LCBSZW1vdmVFZGdlIH0gZnJvbSAnLi4vZ3JhcGgvZ3JhcGgtYWN0aW9ucyc7XG5pbXBvcnQgeyBTYXZlU3RhdGUsIFJlc3RvcmVTdGF0ZSB9IGZyb20gJy4uL2hpc3RvcnkvaGlzdG9yeS1hY3Rpb25zJztcbmltcG9ydCB7IENvb3JkcywgTWVhc3VyZW1lbnRzLCBjb252ZXJ0IH0gZnJvbSAnLi9sYXlvdXQtbW9kZWwnO1xuaW1wb3J0IHtcbiAgQXV0b0xheW91dCxcbiAgSGFuZGxlRWRnZUluc2VydGVkLFxuICBNZWFzdXJlRWRnZSxcbiAgTWVhc3VyZVZlcnRleCxcbiAgTW92ZUVkZ2UsXG4gIE1vdmVWZXJ0ZXhcbn0gZnJvbSAnLi9sYXlvdXQtYWN0aW9ucyc7XG5cblxuY29uc3QgeyBsYXlvdXQ6IHsgZWRnZU9mZnNldCB9IH0gPSBzZXR0aW5ncztcblxuLyoqXG4gKiBNYW5hZ2VzIHRoZSBncmFwaCBsYXlvdXQgcHJvcC5cbiAqL1xuY2xhc3MgTGF5b3V0U3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKCBkaXNwYXRjaGVyLCBsYXlvdXQsIGdyYXBoU3RvcmUgKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcblxuICAgIHRoaXMuZ3JhcGhTdG9yZSA9IGdyYXBoU3RvcmU7XG4gICAgdGhpcy5zdG9yZUlkID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHRoaXMubGF5b3V0ID0gbGF5b3V0O1xuICAgIHRoaXMubWVhc3VyZW1lbnRzID0gTWVhc3VyZW1lbnRzKCk7XG4gICAgdGhpcy5zYXZlKCk7XG5cblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIE1lYXN1cmVWZXJ0ZXgsIGV2ID0+IHtcbiAgICAgIHRoaXMubWVhc3VyZW1lbnRzID0gdGhpcy5tZWFzdXJlbWVudHMuc2V0SW4oXG4gICAgICAgIFsgJ3ZlcnRpY2VzJywgZXYudmVydGV4LmlkIF0sXG4gICAgICAgIGV2Lm1lYXN1cmVtZW50c1xuICAgICAgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIE1lYXN1cmVFZGdlLCBldiA9PiB7XG4gICAgICB0aGlzLm1lYXN1cmVtZW50cyA9IHRoaXMubWVhc3VyZW1lbnRzLnNldEluKFxuICAgICAgICBbICdlZGdlcycsIGV2LmVkZ2UuaWQgXSxcbiAgICAgICAgZXYubWVhc3VyZW1lbnRzXG4gICAgICApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggQXV0b0xheW91dCwgZXYgPT4ge1xuICAgICAgdGhpcy5sYXlvdXQgPSBjb252ZXJ0LmxheW91dChcbiAgICAgICAgY2FsY3VsYXRlTGF5b3V0KCBncmFwaFN0b3JlLmdyYXBoLCBNYXAodGhpcy5tZWFzdXJlbWVudHMpIClcbiAgICAgICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZW1vdmVWZXJ0ZXgsIGV2ID0+IHtcbiAgICAgIHRoaXMubGF5b3V0ID0gdGhpcy5sYXlvdXQucmVtb3ZlSW4oIFsgJ3ZlcnRpY2VzJywgZXYudmVydGV4SWQgXSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggUmVtb3ZlRWRnZSwgZXYgPT4ge1xuICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLmxheW91dC5yZW1vdmVJbiggWyAndmVydGljZXMnLCBldi5lZGdlSWQgXSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggTW92ZVZlcnRleCwgZXYgPT4ge1xuICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLmxheW91dC5zZXRJbiggWyAndmVydGljZXMnLCBldi52ZXJ0ZXguaWQgXSwgZXYudG8gKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIE1vdmVFZGdlLCBldiA9PiB7XG4gICAgICB0aGlzLmxheW91dCA9IHRoaXMubGF5b3V0LnNldEluKCBbICdlZGdlcycsIGV2LmVkZ2UuaWQgXSwgZXYudG8gKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIEhhbmRsZUVkZ2VJbnNlcnRlZCwgZXYgPT4ge1xuICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLnBsYWNlRWRnZSggZXYuZWRnZSwgZXYuZnJvbSwgZXYudG8gKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFJlc3RvcmVTdGF0ZSwgYWN0ID0+IHtcbiAgICAgIGlmKCBhY3Quc3RvcmVJZCA9PT0gdGhpcy5zdG9yZUlkICkge1xuICAgICAgICB0aGlzLmxheW91dCA9IGFjdC5zdGF0ZS5nZXQoMCk7XG4gICAgICAgIHRoaXMubWVhc3VyZW1lbnRzID0gYWN0LnN0YXRlLmdldCgxKTtcbiAgICAgIH1cbiAgICB9ICk7XG4gIH1cblxuXG4gIHNhdmUoKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoKCBTYXZlU3RhdGUoe1xuICAgICAgc3RvcmVJZDogdGhpcy5zdG9yZUlkLFxuICAgICAgc3RhdGU6IExpc3Qub2YoIHRoaXMubGF5b3V0LCB0aGlzLm1lYXN1cmVtZW50cyApXG4gICAgfSkgKTtcbiAgfVxuXG5cbiAgbW92ZVNlbGVjdGlvbiggc2VsZWN0aW9uLCByZWZlcmVuY2VMYXlvdXQsIG9mZnNldCApIHtcbiAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gb2Zmc2V0O1xuICAgIHZhciB0YXJnZXRMYXlvdXQgPSByZWZlcmVuY2VMYXlvdXQ7XG4gICAgWyAndmVydGljZXMnLCAnZWRnZXMnIF0uZm9yRWFjaCgga2luZCA9PlxuICAgICAgc2VsZWN0aW9uWyBraW5kIF0uZm9yRWFjaCggaWQgPT4ge1xuICAgICAgICB0YXJnZXRMYXlvdXQgPSB0YXJnZXRMYXlvdXQudXBkYXRlSW4oIFsga2luZCwgaWQgXSwgY29vcmRzID0+XG4gICAgICAgICAgQ29vcmRzKHtcbiAgICAgICAgICAgIGxlZnQ6IGNvb3Jkcy5sZWZ0ICsgbGVmdCxcbiAgICAgICAgICAgIHRvcDogY29vcmRzLnRvcCArIHRvcFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9IClcbiAgICApO1xuICAgIHRoaXMubGF5b3V0ID0gdGFyZ2V0TGF5b3V0O1xuICAgIHRoaXMuc2F2ZSgpO1xuICB9XG5cblxuICBwbGFjZUVkZ2UoIGVkZ2UsIGZyb20sIHRvICkge1xuICAgIGNvbnN0IHsgbWVhc3VyZW1lbnRzLCBsYXlvdXQgfSA9IHRoaXM7XG4gICAgY29uc3QgZnJvbU1lYXN1cmVtZW50cyA9IG1lYXN1cmVtZW50cy52ZXJ0aWNlcy5nZXQoIGZyb20udmVydGV4SWQgKTtcbiAgICBjb25zdCB0b01lYXN1cmVtZW50cyA9IG1lYXN1cmVtZW50cy52ZXJ0aWNlcy5nZXQoIHRvLnZlcnRleElkICk7XG4gICAgY29uc3QgZnJvbUNvb3JkcyA9IGxheW91dC52ZXJ0aWNlcy5nZXQoIGZyb20udmVydGV4SWQgKTtcbiAgICBjb25zdCB0b0Nvb3JkcyA9IGxheW91dC52ZXJ0aWNlcy5nZXQoIHRvLnZlcnRleElkICk7XG5cbiAgICBjb25zdCBsZWZ0ID0gKGZyb21Db29yZHMubGVmdCArIGZyb21NZWFzdXJlbWVudHMuZGltZW5zaW9ucy53aWR0aCArIHRvQ29vcmRzLmxlZnQpIC8gMjtcblxuICAgIGNvbnN0IGZyb21Qb3J0Qm94ID0gZnJvbU1lYXN1cmVtZW50cy5nZXRJbihbIGZyb20uZGlyZWN0aW9uLCBmcm9tLnBvcnRJZCBdKTtcbiAgICBjb25zdCB0b1BvcnRCb3ggPSB0b01lYXN1cmVtZW50cy5nZXRJbihbIHRvLmRpcmVjdGlvbiwgdG8ucG9ydElkIF0pO1xuICAgIGNvbnN0IHRvcCA9IChcbiAgICAgIGZyb21Db29yZHMudG9wICsgZnJvbVBvcnRCb3gudG9wICsgdG9Db29yZHMudG9wICsgdG9Qb3J0Qm94LnRvcFxuICAgICAgLSBlZGdlT2Zmc2V0XG4gICAgKSAvIDI7XG5cbiAgICByZXR1cm4gdGhpcy5sYXlvdXQuc2V0SW4oIFsgJ2VkZ2VzJywgZWRnZS5pZCBdLCBDb29yZHMoe1xuICAgICAgbGVmdDogbGVmdCxcbiAgICAgIHRvcDogdG9wXG4gICAgfSkgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMYXlvdXRTdG9yZTtcbiJdfQ==