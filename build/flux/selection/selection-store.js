define(['exports', 'module', 'immutable', '../history/history-actions', '../graph/graph-actions', '../selection/selection-actions'], function (exports, module, _immutable, _historyHistoryActions, _graphGraphActions, _selectionSelectionActions) {
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

      dispatcher.register(_selectionSelectionActions.ClearSelection, function (act) {
        _this.clear();
      });

      dispatcher.register(_graphGraphActions.RemoveVertex, function (act) {
        _this.selection = _this.selection.update('vertices', function (_) {
          return _.remove(act.vertexId);
        });
        _this.save();
      });

      dispatcher.register(_graphGraphActions.RemoveEdge, function (act) {
        _this.selection = _this.selection.update('edges', function (_) {
          return _.remove(act.edgeId);
        });
        _this.save();
      });

      dispatcher.register(_selectionSelectionActions.ResizeSelection, function (act) {
        _this.selection = _this.selection.set('extensionOf', act.isExtension ? _this.selection.extensionOf || _this.selection : null);
        _this.selection = _this.selection.set('coords', act.coords).set('dimensions', act.dimensions);
        _this.updateRectangleContents();
      });

      dispatcher.register(_selectionSelectionActions.SelectEdge, function (act) {
        _this.selection = _this.selection.update('edges', function (_) {
          return _.add(act.edge.id);
        });
        _this.save();
      });

      dispatcher.register(_selectionSelectionActions.DeselectEdge, function (act) {
        _this.selection = _this.selection.update('edges', function (_) {
          return _.remove(act.edge.id);
        });
        _this.save();
      });

      dispatcher.register(_selectionSelectionActions.SelectVertex, function (act) {
        _this.selection = _this.selection.update('vertices', function (_) {
          return _.add(act.vertex.id);
        });
        _this.save();
      });

      dispatcher.register(_selectionSelectionActions.DeselectVertex, function (act) {
        _this.selection = _this.selection.update('vertices', function (_) {
          return _.remove(act.vertex.id);
        });
        _this.save();
      });

      dispatcher.register(_selectionSelectionActions.MoveSelection, function (act) {
        _this.moveContents(act.reference, act.offset);
        _this.save();
      });

      dispatcher.register(_selectionSelectionActions.DeleteSelection, function (act) {
        var _selection = _this.selection;
        var vertices = _selection.vertices;
        var edges = _selection.edges;

        vertices.forEach(function (_, id) {
          dispatcher.dispatch((0, _graphGraphActions.RemoveVertex)({ vertexId: id }));
        });
        edges.forEach(function (_, id) {
          dispatcher.dispatch((0, _graphGraphActions.RemoveEdge)({ edgeId: id }));
        });
      });
    }

    _createClass(SelectionStore, [{
      key: 'save',
      value: function save() {
        this.dispatcher.dispatch((0, _historyHistoryActions.SaveState)({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L3NlbGVjdGlvbi9zZWxlY3Rpb24tc3RvcmUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFpQkEsTUFBTSxTQUFTLEdBQUcsZUFqQlQsTUFBTSxFQWlCVTtBQUN2QixZQUFRLEVBQUUsZUFsQkssR0FBRyxHQWtCSDtBQUNmLFNBQUssRUFBRSxlQW5CUSxHQUFHLEdBbUJOO0FBQ1osZUFBVyxFQUFFLElBQUk7QUFDakIsVUFBTSxFQUFFLElBQUk7QUFDWixjQUFVLEVBQUUsSUFBSTtHQUNqQixDQUFDLENBQUM7O01BRUcsY0FBYztBQUVQLGFBRlAsY0FBYyxDQUVMLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFHOzs7NEJBRi9DLGNBQWM7O0FBR2hCLFVBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzdCLFVBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDbEMsVUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDL0IsVUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0FBRTdCLFVBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7QUFDckMsVUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLEVBQUUsQ0FBQztBQUM3QixVQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBR1osZ0JBQVUsQ0FBQyxRQUFRLDRCQS9CckIsY0FBYyxFQStCeUIsVUFBQSxHQUFHLEVBQUk7QUFBRSxjQUFLLEtBQUssRUFBRSxDQUFDO09BQUUsQ0FBRSxDQUFDOztBQUVoRSxnQkFBVSxDQUFDLFFBQVEsb0JBckNkLFlBQVksRUFxQ2tCLFVBQUEsR0FBRyxFQUFJO0FBQ3hDLGNBQUssU0FBUyxHQUFHLE1BQUssU0FBUyxDQUM1QixNQUFNLENBQUUsVUFBVSxFQUFFLFVBQUEsQ0FBQztpQkFBSSxDQUFDLENBQUMsTUFBTSxDQUFF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LG1CQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUUsQ0FBQztXQUM3QjtBQUNELGlCQUFPLE9BQU8sQ0FBQztTQUNoQjtPQUNGOzs7V0E5SkcsY0FBYzs7O21CQWtLTCxjQUFjIiwiZmlsZSI6InNlbGVjdGlvbi1zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWNvcmQsIFNldCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCB7IFNhdmVTdGF0ZSB9IGZyb20gJy4uL2hpc3RvcnkvaGlzdG9yeS1hY3Rpb25zJztcbmltcG9ydCB7IFJlbW92ZVZlcnRleCwgUmVtb3ZlRWRnZSB9IGZyb20gJy4uL2dyYXBoL2dyYXBoLWFjdGlvbnMnO1xuXG5pbXBvcnQge1xuICBSZXNpemVTZWxlY3Rpb24sXG4gIENsZWFyU2VsZWN0aW9uLFxuICBNb3ZlU2VsZWN0aW9uLFxuICBEZXNlbGVjdFZlcnRleCxcbiAgU2VsZWN0VmVydGV4LFxuICBEZXNlbGVjdEVkZ2UsXG4gIFNlbGVjdEVkZ2UsXG4gIERlbGV0ZVNlbGVjdGlvblxufSBmcm9tICcuLi9zZWxlY3Rpb24vc2VsZWN0aW9uLWFjdGlvbnMnO1xuXG5cbmNvbnN0IFNlbGVjdGlvbiA9IFJlY29yZCh7XG4gIHZlcnRpY2VzOiBTZXQoKSxcbiAgZWRnZXM6IFNldCgpLFxuICBleHRlbnNpb25PZjogbnVsbCxcbiAgY29vcmRzOiBudWxsLFxuICBkaW1lbnNpb25zOiBudWxsXG59KTtcblxuY2xhc3MgU2VsZWN0aW9uU3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKCBkaXNwYXRjaGVyLCBsYXlvdXRTdG9yZSwgZ3JhcGhTdG9yZSApIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuICAgIHRoaXMubW92ZVJlZmVyZW5jZSA9IHsgaWQ6IG51bGwgfTtcbiAgICB0aGlzLmxheW91dFN0b3JlID0gbGF5b3V0U3RvcmU7XG4gICAgdGhpcy5ncmFwaFN0b3JlID0gZ3JhcGhTdG9yZTtcblxuICAgIHRoaXMuc3RvcmVJZCA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLnNlbGVjdGlvbiA9IFNlbGVjdGlvbigpO1xuICAgIHRoaXMuc2F2ZSgpO1xuXG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBDbGVhclNlbGVjdGlvbiwgYWN0ID0+IHsgdGhpcy5jbGVhcigpOyB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZW1vdmVWZXJ0ZXgsIGFjdCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgIC51cGRhdGUoICd2ZXJ0aWNlcycsIF8gPT4gXy5yZW1vdmUoIGFjdC52ZXJ0ZXhJZCApICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZW1vdmVFZGdlLCBhY3QgPT4ge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblxuICAgICAgICAudXBkYXRlKCAnZWRnZXMnLCBfID0+IF8ucmVtb3ZlKCBhY3QuZWRnZUlkICkgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFJlc2l6ZVNlbGVjdGlvbiwgYWN0ID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb25cbiAgICAgICAgLnNldCggJ2V4dGVuc2lvbk9mJywgYWN0LmlzRXh0ZW5zaW9uID8gKHRoaXMuc2VsZWN0aW9uLmV4dGVuc2lvbk9mIHx8IHRoaXMuc2VsZWN0aW9uKSA6IG51bGwgKTtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb25cbiAgICAgICAgLnNldCggJ2Nvb3JkcycsIGFjdC5jb29yZHMgKVxuICAgICAgICAuc2V0KCAnZGltZW5zaW9ucycsIGFjdC5kaW1lbnNpb25zICk7XG4gICAgICB0aGlzLnVwZGF0ZVJlY3RhbmdsZUNvbnRlbnRzKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggU2VsZWN0RWRnZSwgYWN0ID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb25cbiAgICAgICAgLnVwZGF0ZSggJ2VkZ2VzJywgXyA9PiBfLmFkZCggYWN0LmVkZ2UuaWQgKSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggRGVzZWxlY3RFZGdlLCBhY3QgPT4ge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblxuICAgICAgICAudXBkYXRlKCAnZWRnZXMnLCBfID0+IF8ucmVtb3ZlKCBhY3QuZWRnZS5pZCApICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBTZWxlY3RWZXJ0ZXgsIGFjdCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgIC51cGRhdGUoICd2ZXJ0aWNlcycsIF8gPT4gXy5hZGQoIGFjdC52ZXJ0ZXguaWQgKSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggRGVzZWxlY3RWZXJ0ZXgsIGFjdCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgIC51cGRhdGUoICd2ZXJ0aWNlcycsIF8gPT4gXy5yZW1vdmUoIGFjdC52ZXJ0ZXguaWQgKSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggTW92ZVNlbGVjdGlvbiwgYWN0ID0+IHtcbiAgICAgIHRoaXMubW92ZUNvbnRlbnRzKCBhY3QucmVmZXJlbmNlLCBhY3Qub2Zmc2V0ICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBEZWxldGVTZWxlY3Rpb24sIGFjdCA9PiB7XG4gICAgICBjb25zdCB7IHZlcnRpY2VzLCBlZGdlcyB9ID0gdGhpcy5zZWxlY3Rpb247XG4gICAgICB2ZXJ0aWNlcy5mb3JFYWNoKCAoXywgaWQpID0+IHtcbiAgICAgICAgZGlzcGF0Y2hlci5kaXNwYXRjaCggUmVtb3ZlVmVydGV4KCB7IHZlcnRleElkOiBpZCB9ICkgKTtcbiAgICAgICB9ICk7XG4gICAgICBlZGdlcy5mb3JFYWNoKCAoXywgaWQpID0+IHtcbiAgICAgICAgZGlzcGF0Y2hlci5kaXNwYXRjaCggUmVtb3ZlRWRnZSggeyBlZGdlSWQ6IGlkIH0gKSApO1xuICAgICAgfSApO1xuICAgIH0gKTtcbiAgfVxuXG5cbiAgc2F2ZSgpIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIuZGlzcGF0Y2goIFNhdmVTdGF0ZSh7XG4gICAgICBzdG9yZUlkOiB0aGlzLnN0b3JlSWQsXG4gICAgICBzdGF0ZTogdGhpcy5zZWxlY3Rpb25cbiAgICB9KSApO1xuICB9XG5cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLnNlbGVjdGlvbiA9XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZXQoICdlZGdlcycsIFNldCgpICkuc2V0KCAndmVydGljZXMnLCBTZXQoKSApO1xuICB9XG5cblxuICBpc0VtcHR5KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbi52ZXJ0aWNlcy5pc0VtcHR5KClcbiAgICAgICYmIHRoaXMuc2VsZWN0aW9uLmVkZ2VzLmlzRW1wdHkoKTtcbiAgfVxuXG5cbiAgbW92ZUNvbnRlbnRzKCByZWZlcmVuY2UsIG9mZnNldCApIHtcbiAgICBpZiggcmVmZXJlbmNlLmlkICE9PSB0aGlzLm1vdmVSZWZlcmVuY2UuaWQgKSB7XG4gICAgICB0aGlzLm1vdmVSZWZlcmVuY2UgPSB7XG4gICAgICAgIGlkOiByZWZlcmVuY2UuaWQsXG4gICAgICAgIGNvb3JkczogcmVmZXJlbmNlLmNvb3JkcyxcbiAgICAgICAgbGF5b3V0OiB0aGlzLmxheW91dFN0b3JlLmxheW91dFxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmxheW91dFN0b3JlLm1vdmVTZWxlY3Rpb24oXG4gICAgICB0aGlzLnNlbGVjdGlvbixcbiAgICAgIHRoaXMubW92ZVJlZmVyZW5jZS5sYXlvdXQsXG4gICAgICBvZmZzZXRcbiAgICApO1xuICB9XG5cblxuICB1cGRhdGVSZWN0YW5nbGVDb250ZW50cygpIHtcbiAgICBpZiggIXRoaXMuc2VsZWN0aW9uLmRpbWVuc2lvbnMgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBjb29yZHMsIGRpbWVuc2lvbnMsIGV4dGVuc2lvbk9mIH0gPSB0aGlzLnNlbGVjdGlvbjtcbiAgICBjb25zdCB7IG1lYXN1cmVtZW50cywgbGF5b3V0IH0gPSB0aGlzLmxheW91dFN0b3JlO1xuICAgIGNvbnN0IGVkZ2VzVG9LZWVwID0gZXh0ZW5zaW9uT2YgPyBleHRlbnNpb25PZi5lZGdlcyA6IFNldCgpO1xuICAgIGNvbnN0IHZlcnRpY2VzVG9LZWVwID0gZXh0ZW5zaW9uT2YgPyBleHRlbnNpb25PZi52ZXJ0aWNlcyA6IFNldCgpO1xuXG4gICAgdGhpcy5zZWxlY3Rpb24gPSBTZWxlY3Rpb24oe1xuICAgICAgY29vcmRzOiB0aGlzLnNlbGVjdGlvbi5jb29yZHMsXG4gICAgICBkaW1lbnNpb25zOiB0aGlzLnNlbGVjdGlvbi5kaW1lbnNpb25zLFxuICAgICAgZXh0ZW5zaW9uT2Y6IHRoaXMuc2VsZWN0aW9uLmV4dGVuc2lvbk9mLFxuICAgICAgdmVydGljZXM6IG5vZGVTZXQoXG4gICAgICAgIG1lYXN1cmVtZW50cy52ZXJ0aWNlcy50b0pTKCksIGxheW91dC52ZXJ0aWNlcy50b0pTKCksIHZlcnRpY2VzVG9LZWVwXG4gICAgICApLFxuICAgICAgZWRnZXM6IG5vZGVTZXQoXG4gICAgICAgIG1lYXN1cmVtZW50cy5lZGdlcy50b0pTKCksIGxheW91dC5lZGdlcy50b0pTKCksIGVkZ2VzVG9LZWVwXG4gICAgICApXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBub2RlU2V0KCBub2RlTWVhc3VyZW1lbnRzLCBub2RlQ29vcmRzLCB0b0tlZXAgKSB7XG4gICAgICB2YXIgbWF0Y2hlcyA9IFNldCgpO1xuICAgICAgZm9yKCBjb25zdCBpZCBpbiBub2RlTWVhc3VyZW1lbnRzICkge1xuICAgICAgICBpZiggIW5vZGVNZWFzdXJlbWVudHMuaGFzT3duUHJvcGVydHkoIGlkICkgKSB7IGNvbnRpbnVlOyB9XG4gICAgICAgIGlmKCB0b0tlZXAuaGFzKCBpZCApICkge1xuICAgICAgICAgIG1hdGNoZXMgPSBtYXRjaGVzLmFkZCggaWQgKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gbm9kZUNvb3Jkc1sgaWQgXTtcbiAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBub2RlTWVhc3VyZW1lbnRzWyBpZCBdLmRpbWVuc2lvbnM7XG4gICAgICAgIGlmKCBsZWZ0ICsgd2lkdGggPCBjb29yZHMubGVmdFxuICAgICAgICAgICAgfHwgbGVmdCA+IGNvb3Jkcy5sZWZ0ICsgZGltZW5zaW9ucy53aWR0aCApIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiggdG9wICsgaGVpZ2h0IDwgY29vcmRzLnRvcFxuICAgICAgICAgICAgfHwgdG9wID4gY29vcmRzLnRvcCArIGRpbWVuc2lvbnMuaGVpZ2h0ICkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIG1hdGNoZXMgPSBtYXRjaGVzLmFkZCggaWQgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaGVzO1xuICAgIH1cbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGlvblN0b3JlO1xuIl19