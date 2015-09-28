define(['exports', 'module', 'immutable', '../actions/graph', '../actions/selection', '../actions/history'], function (exports, module, _immutable, _actionsGraph, _actionsSelection, _actionsHistory) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var Selection = (0, _immutable.Record)({
    vertices: (0, _immutable.Set)(),
    edges: (0, _immutable.Set)(),
    extensionOf: null,
    coords: null,
    dimensions: null
  });

  var SelectionStore = (function () {
    function SelectionStore(dispatcher, layoutStore, graphStore) {
      var _this = this;

      _classCallCheck(this, SelectionStore);

      this.dispatcher = dispatcher;
      this.moveReference = { id: null };
      this.layoutStore = layoutStore;
      this.graphStore = graphStore;

      this.storeId = this.constructor.name;
      this.selection = Selection();
      this.save();

      dispatcher.register(_actionsSelection.ClearSelection, function (act) {
        _this.clear();
      });

      dispatcher.register(_actionsGraph.RemoveVertex, function (act) {
        _this.selection = _this.selection.update('vertices', function (_) {
          return _.remove(act.vertexId);
        });
        _this.save();
      });

      dispatcher.register(_actionsGraph.RemoveEdge, function (act) {
        _this.selection = _this.selection.update('edges', function (_) {
          return _.remove(act.edgeId);
        });
        _this.save();
      });

      dispatcher.register(_actionsSelection.ResizeSelection, function (act) {
        _this.selection = _this.selection.set('extensionOf', act.isExtension ? _this.selection.extensionOf || _this.selection : null);
        _this.selection = _this.selection.set('coords', act.coords).set('dimensions', act.dimensions);
        _this.updateRectangleContents();
      });

      dispatcher.register(_actionsSelection.SelectEdge, function (act) {
        _this.selection = _this.selection.update('edges', function (_) {
          return _.add(act.edge.id);
        });
        _this.save();
      });

      dispatcher.register(_actionsSelection.DeselectEdge, function (act) {
        _this.selection = _this.selection.update('edges', function (_) {
          return _.remove(act.edge.id);
        });
        _this.save();
      });

      dispatcher.register(_actionsSelection.SelectVertex, function (act) {
        _this.selection = _this.selection.update('vertices', function (_) {
          return _.add(act.vertex.id);
        });
        _this.save();
      });

      dispatcher.register(_actionsSelection.DeselectVertex, function (act) {
        _this.selection = _this.selection.update('vertices', function (_) {
          return _.remove(act.vertex.id);
        });
        _this.save();
      });

      dispatcher.register(_actionsSelection.MoveSelection, function (act) {
        _this.moveContents(act.reference, act.offset);
        _this.save();
      });

      dispatcher.register(_actionsSelection.DeleteSelection, function (act) {
        var _selection = _this.selection;
        var vertices = _selection.vertices;
        var edges = _selection.edges;

        vertices.forEach(function (_, id) {
          dispatcher.dispatch((0, _actionsGraph.RemoveVertex)({ vertexId: id }));
        });
        edges.forEach(function (_, id) {
          dispatcher.dispatch((0, _actionsGraph.RemoveEdge)({ edgeId: id }));
        });
      });
    }

    _createClass(SelectionStore, [{
      key: 'save',
      value: function save() {
        this.dispatcher.dispatch((0, _actionsHistory.SaveState)({
          storeId: this.storeId,
          state: this.selection
        }));
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.selection = this.selection.set('edges', (0, _immutable.Set)()).set('vertices', (0, _immutable.Set)());
      }
    }, {
      key: 'isEmpty',
      value: function isEmpty() {
        return this.selection.vertices.isEmpty() && this.selection.edges.isEmpty();
      }
    }, {
      key: 'moveContents',
      value: function moveContents(reference, offset) {
        if (reference.id !== this.moveReference.id) {
          this.moveReference = {
            id: reference.id,
            coords: reference.coords,
            layout: this.layoutStore.layout
          };
        }

        this.layoutStore.moveSelection(this.selection, this.moveReference.layout, offset);
      }
    }, {
      key: 'updateRectangleContents',
      value: function updateRectangleContents() {
        if (!this.selection.dimensions) {
          return;
        }

        var _selection2 = this.selection;
        var coords = _selection2.coords;
        var dimensions = _selection2.dimensions;
        var extensionOf = _selection2.extensionOf;
        var _layoutStore = this.layoutStore;
        var measurements = _layoutStore.measurements;
        var layout = _layoutStore.layout;

        var edgesToKeep = extensionOf ? extensionOf.edges : (0, _immutable.Set)();
        var verticesToKeep = extensionOf ? extensionOf.vertices : (0, _immutable.Set)();

        this.selection = Selection({
          coords: this.selection.coords,
          dimensions: this.selection.dimensions,
          extensionOf: this.selection.extensionOf,
          vertices: nodeSet(measurements.vertices.toJS(), layout.vertices.toJS(), verticesToKeep),
          edges: nodeSet(measurements.edges.toJS(), layout.edges.toJS(), edgesToKeep)
        });

        function nodeSet(nodeMeasurements, nodeCoords, toKeep) {
          var matches = (0, _immutable.Set)();
          for (var id in nodeMeasurements) {
            if (!nodeMeasurements.hasOwnProperty(id)) {
              continue;
            }
            if (toKeep.has(id)) {
              matches = matches.add(id);
              continue;
            }
            var _nodeCoords$id = nodeCoords[id];
            var left = _nodeCoords$id.left;
            var _top = _nodeCoords$id.top;
            var _nodeMeasurements$id$dimensions = nodeMeasurements[id].dimensions;
            var width = _nodeMeasurements$id$dimensions.width;
            var height = _nodeMeasurements$id$dimensions.height;

            if (left + width < coords.left || left > coords.left + dimensions.width) {
              continue;
            }
            if (_top + height < coords.top || _top > coords.top + dimensions.height) {
              continue;
            }
            matches = matches.add(id);
          }
          return matches;
        }
      }
    }]);

    return SelectionStore;
  })();

  module.exports = SelectionStore;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdG9yZXMvc2VsZWN0aW9uLXN0b3JlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBdUJBLE1BQU0sU0FBUyxHQUFHLGVBdkJULE1BQU0sRUF1QlU7QUFDdkIsWUFBUSxFQUFFLGVBeEJLLEdBQUcsR0F3Qkg7QUFDZixTQUFLLEVBQUUsZUF6QlEsR0FBRyxHQXlCTjtBQUNaLGVBQVcsRUFBRSxJQUFJO0FBQ2pCLFVBQU0sRUFBRSxJQUFJO0FBQ1osY0FBVSxFQUFFLElBQUk7R0FDakIsQ0FBQyxDQUFDOztNQUVHLGNBQWM7QUFFUCxhQUZQLGNBQWMsQ0FFTCxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRzs7OzRCQUYvQyxjQUFjOztBQUdoQixVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUM3QixVQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ2xDLFVBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBQy9CLFVBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztBQUU3QixVQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQ3JDLFVBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxFQUFFLENBQUM7QUFDN0IsVUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOztBQUdaLGdCQUFVLENBQUMsUUFBUSxtQkFuQ3JCLGNBQWMsRUFtQ3lCLFVBQUEsR0FBRyxFQUFJO0FBQUUsY0FBSyxLQUFLLEVBQUUsQ0FBQztPQUFFLENBQUUsQ0FBQzs7QUFFaEUsZ0JBQVUsQ0FBQyxRQUFRLGVBM0NyQixZQUFZLEVBMkN5QixVQUFBLEdBQUcsRUFBSTtBQUN4QyxjQUFLLFNBQVMsR0FBRyxNQUFLLFNBQVMsQ0FDNUIsTUFBTSxDQUFFLFVBQVUsRUFBRSxVQUFBLENBQUM7aUJBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBRSxHQUFHLENBQUMs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QUFHLE9BQU8sQ0FBQyxHQUFHLENBQUUsRUFBRSxDQUFFLENBQUM7V0FDN0I7QUFDRCxpQkFBTyxPQUFPLENBQUM7U0FDaEI7T0FDRjs7O1dBOUpHLGNBQWM7OzttQkFrS0wsY0FBYyIsImZpbGUiOiJzZWxlY3Rpb24tc3RvcmUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjb3JkLCBTZXQgfSBmcm9tICdpbW11dGFibGUnO1xuXG5pbXBvcnQge1xuICBSZW1vdmVWZXJ0ZXgsXG4gIFJlbW92ZUVkZ2Vcbn0gZnJvbSAnLi4vYWN0aW9ucy9ncmFwaCc7XG5cbmltcG9ydCB7XG4gIFJlc2l6ZVNlbGVjdGlvbixcbiAgQ2xlYXJTZWxlY3Rpb24sXG4gIE1vdmVTZWxlY3Rpb24sXG4gIERlc2VsZWN0VmVydGV4LFxuICBTZWxlY3RWZXJ0ZXgsXG4gIERlc2VsZWN0RWRnZSxcbiAgU2VsZWN0RWRnZSxcbiAgRGVsZXRlU2VsZWN0aW9uXG59IGZyb20gJy4uL2FjdGlvbnMvc2VsZWN0aW9uJztcblxuaW1wb3J0IHtcbiAgU2F2ZVN0YXRlXG59IGZyb20gJy4uL2FjdGlvbnMvaGlzdG9yeSc7XG5cblxuY29uc3QgU2VsZWN0aW9uID0gUmVjb3JkKHtcbiAgdmVydGljZXM6IFNldCgpLFxuICBlZGdlczogU2V0KCksXG4gIGV4dGVuc2lvbk9mOiBudWxsLFxuICBjb29yZHM6IG51bGwsXG4gIGRpbWVuc2lvbnM6IG51bGxcbn0pO1xuXG5jbGFzcyBTZWxlY3Rpb25TdG9yZSB7XG5cbiAgY29uc3RydWN0b3IoIGRpc3BhdGNoZXIsIGxheW91dFN0b3JlLCBncmFwaFN0b3JlICkge1xuICAgIHRoaXMuZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XG4gICAgdGhpcy5tb3ZlUmVmZXJlbmNlID0geyBpZDogbnVsbCB9O1xuICAgIHRoaXMubGF5b3V0U3RvcmUgPSBsYXlvdXRTdG9yZTtcbiAgICB0aGlzLmdyYXBoU3RvcmUgPSBncmFwaFN0b3JlO1xuXG4gICAgdGhpcy5zdG9yZUlkID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHRoaXMuc2VsZWN0aW9uID0gU2VsZWN0aW9uKCk7XG4gICAgdGhpcy5zYXZlKCk7XG5cblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIENsZWFyU2VsZWN0aW9uLCBhY3QgPT4geyB0aGlzLmNsZWFyKCk7IH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFJlbW92ZVZlcnRleCwgYWN0ID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb25cbiAgICAgICAgLnVwZGF0ZSggJ3ZlcnRpY2VzJywgXyA9PiBfLnJlbW92ZSggYWN0LnZlcnRleElkICkgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFJlbW92ZUVkZ2UsIGFjdCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgIC51cGRhdGUoICdlZGdlcycsIF8gPT4gXy5yZW1vdmUoIGFjdC5lZGdlSWQgKSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggUmVzaXplU2VsZWN0aW9uLCBhY3QgPT4ge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblxuICAgICAgICAuc2V0KCAnZXh0ZW5zaW9uT2YnLCBhY3QuaXNFeHRlbnNpb24gPyAodGhpcy5zZWxlY3Rpb24uZXh0ZW5zaW9uT2YgfHwgdGhpcy5zZWxlY3Rpb24pIDogbnVsbCApO1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblxuICAgICAgICAuc2V0KCAnY29vcmRzJywgYWN0LmNvb3JkcyApXG4gICAgICAgIC5zZXQoICdkaW1lbnNpb25zJywgYWN0LmRpbWVuc2lvbnMgKTtcbiAgICAgIHRoaXMudXBkYXRlUmVjdGFuZ2xlQ29udGVudHMoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBTZWxlY3RFZGdlLCBhY3QgPT4ge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblxuICAgICAgICAudXBkYXRlKCAnZWRnZXMnLCBfID0+IF8uYWRkKCBhY3QuZWRnZS5pZCApICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBEZXNlbGVjdEVkZ2UsIGFjdCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgIC51cGRhdGUoICdlZGdlcycsIF8gPT4gXy5yZW1vdmUoIGFjdC5lZGdlLmlkICkgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFNlbGVjdFZlcnRleCwgYWN0ID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb25cbiAgICAgICAgLnVwZGF0ZSggJ3ZlcnRpY2VzJywgXyA9PiBfLmFkZCggYWN0LnZlcnRleC5pZCApICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBEZXNlbGVjdFZlcnRleCwgYWN0ID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb25cbiAgICAgICAgLnVwZGF0ZSggJ3ZlcnRpY2VzJywgXyA9PiBfLnJlbW92ZSggYWN0LnZlcnRleC5pZCApICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBNb3ZlU2VsZWN0aW9uLCBhY3QgPT4ge1xuICAgICAgdGhpcy5tb3ZlQ29udGVudHMoIGFjdC5yZWZlcmVuY2UsIGFjdC5vZmZzZXQgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIERlbGV0ZVNlbGVjdGlvbiwgYWN0ID0+IHtcbiAgICAgIGNvbnN0IHsgdmVydGljZXMsIGVkZ2VzIH0gPSB0aGlzLnNlbGVjdGlvbjtcbiAgICAgIHZlcnRpY2VzLmZvckVhY2goIChfLCBpZCkgPT4ge1xuICAgICAgICBkaXNwYXRjaGVyLmRpc3BhdGNoKCBSZW1vdmVWZXJ0ZXgoIHsgdmVydGV4SWQ6IGlkIH0gKSApO1xuICAgICAgIH0gKTtcbiAgICAgIGVkZ2VzLmZvckVhY2goIChfLCBpZCkgPT4ge1xuICAgICAgICBkaXNwYXRjaGVyLmRpc3BhdGNoKCBSZW1vdmVFZGdlKCB7IGVkZ2VJZDogaWQgfSApICk7XG4gICAgICB9ICk7XG4gICAgfSApO1xuICB9XG5cblxuICBzYXZlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaCggU2F2ZVN0YXRlKHtcbiAgICAgIHN0b3JlSWQ6IHRoaXMuc3RvcmVJZCxcbiAgICAgIHN0YXRlOiB0aGlzLnNlbGVjdGlvblxuICAgIH0pICk7XG4gIH1cblxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuc2VsZWN0aW9uID1cbiAgICAgIHRoaXMuc2VsZWN0aW9uLnNldCggJ2VkZ2VzJywgU2V0KCkgKS5zZXQoICd2ZXJ0aWNlcycsIFNldCgpICk7XG4gIH1cblxuXG4gIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLnZlcnRpY2VzLmlzRW1wdHkoKVxuICAgICAgJiYgdGhpcy5zZWxlY3Rpb24uZWRnZXMuaXNFbXB0eSgpO1xuICB9XG5cblxuICBtb3ZlQ29udGVudHMoIHJlZmVyZW5jZSwgb2Zmc2V0ICkge1xuICAgIGlmKCByZWZlcmVuY2UuaWQgIT09IHRoaXMubW92ZVJlZmVyZW5jZS5pZCApIHtcbiAgICAgIHRoaXMubW92ZVJlZmVyZW5jZSA9IHtcbiAgICAgICAgaWQ6IHJlZmVyZW5jZS5pZCxcbiAgICAgICAgY29vcmRzOiByZWZlcmVuY2UuY29vcmRzLFxuICAgICAgICBsYXlvdXQ6IHRoaXMubGF5b3V0U3RvcmUubGF5b3V0XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMubGF5b3V0U3RvcmUubW92ZVNlbGVjdGlvbihcbiAgICAgIHRoaXMuc2VsZWN0aW9uLFxuICAgICAgdGhpcy5tb3ZlUmVmZXJlbmNlLmxheW91dCxcbiAgICAgIG9mZnNldFxuICAgICk7XG4gIH1cblxuXG4gIHVwZGF0ZVJlY3RhbmdsZUNvbnRlbnRzKCkge1xuICAgIGlmKCAhdGhpcy5zZWxlY3Rpb24uZGltZW5zaW9ucyApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGNvb3JkcywgZGltZW5zaW9ucywgZXh0ZW5zaW9uT2YgfSA9IHRoaXMuc2VsZWN0aW9uO1xuICAgIGNvbnN0IHsgbWVhc3VyZW1lbnRzLCBsYXlvdXQgfSA9IHRoaXMubGF5b3V0U3RvcmU7XG4gICAgY29uc3QgZWRnZXNUb0tlZXAgPSBleHRlbnNpb25PZiA/IGV4dGVuc2lvbk9mLmVkZ2VzIDogU2V0KCk7XG4gICAgY29uc3QgdmVydGljZXNUb0tlZXAgPSBleHRlbnNpb25PZiA/IGV4dGVuc2lvbk9mLnZlcnRpY2VzIDogU2V0KCk7XG5cbiAgICB0aGlzLnNlbGVjdGlvbiA9IFNlbGVjdGlvbih7XG4gICAgICBjb29yZHM6IHRoaXMuc2VsZWN0aW9uLmNvb3JkcyxcbiAgICAgIGRpbWVuc2lvbnM6IHRoaXMuc2VsZWN0aW9uLmRpbWVuc2lvbnMsXG4gICAgICBleHRlbnNpb25PZjogdGhpcy5zZWxlY3Rpb24uZXh0ZW5zaW9uT2YsXG4gICAgICB2ZXJ0aWNlczogbm9kZVNldChcbiAgICAgICAgbWVhc3VyZW1lbnRzLnZlcnRpY2VzLnRvSlMoKSwgbGF5b3V0LnZlcnRpY2VzLnRvSlMoKSwgdmVydGljZXNUb0tlZXBcbiAgICAgICksXG4gICAgICBlZGdlczogbm9kZVNldChcbiAgICAgICAgbWVhc3VyZW1lbnRzLmVkZ2VzLnRvSlMoKSwgbGF5b3V0LmVkZ2VzLnRvSlMoKSwgZWRnZXNUb0tlZXBcbiAgICAgIClcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG5vZGVTZXQoIG5vZGVNZWFzdXJlbWVudHMsIG5vZGVDb29yZHMsIHRvS2VlcCApIHtcbiAgICAgIHZhciBtYXRjaGVzID0gU2V0KCk7XG4gICAgICBmb3IoIGNvbnN0IGlkIGluIG5vZGVNZWFzdXJlbWVudHMgKSB7XG4gICAgICAgIGlmKCAhbm9kZU1lYXN1cmVtZW50cy5oYXNPd25Qcm9wZXJ0eSggaWQgKSApIHsgY29udGludWU7IH1cbiAgICAgICAgaWYoIHRvS2VlcC5oYXMoIGlkICkgKSB7XG4gICAgICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMuYWRkKCBpZCApO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBub2RlQ29vcmRzWyBpZCBdO1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IG5vZGVNZWFzdXJlbWVudHNbIGlkIF0uZGltZW5zaW9ucztcbiAgICAgICAgaWYoIGxlZnQgKyB3aWR0aCA8IGNvb3Jkcy5sZWZ0XG4gICAgICAgICAgICB8fCBsZWZ0ID4gY29vcmRzLmxlZnQgKyBkaW1lbnNpb25zLndpZHRoICkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKCB0b3AgKyBoZWlnaHQgPCBjb29yZHMudG9wXG4gICAgICAgICAgICB8fCB0b3AgPiBjb29yZHMudG9wICsgZGltZW5zaW9ucy5oZWlnaHQgKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMuYWRkKCBpZCApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0aW9uU3RvcmU7XG4iXX0=