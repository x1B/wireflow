define(['exports', 'module', 'immutable', '../history/history-actions', '../layout/layout-actions', './graph-model', './graph-actions'], function (exports, module, _immutable, _historyHistoryActions, _layoutLayoutActions, _graphModel, _graphActions) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  /**
   * Manages the graph model prop.
   */

  var GraphStore = (function () {
    function GraphStore(dispatcher, graph, types) {
      var _this = this;

      _classCallCheck(this, GraphStore);

      this.dispatcher = dispatcher;

      this.storeId = this.constructor.name;
      this.graph = graph;
      this.types = types;
      this.save();

      dispatcher.register(_graphActions.DisconnectPort, function (act) {
        _this.disconnect(act.vertex, act.port);
        _this.save();
      });

      dispatcher.register(_graphActions.ConnectPort, function (act) {
        _this.connect(act.from, act.to);
        _this.save();
      });

      dispatcher.register(_graphActions.RemoveVertex, function (act) {
        _this.removeVertex(act.vertexId);
        _this.save();
      });

      dispatcher.register(_graphActions.RemoveEdge, function (act) {
        _this.removeEdge(act.edgeId);
        _this.save();
      });

      dispatcher.register(_historyHistoryActions.RestoreState, function (act) {
        if (act.storeId === _this.storeId) {
          _this.graph = act.state.get(0);
          _this.types = act.state.get(1);
        }
      });
    }

    _createClass(GraphStore, [{
      key: 'save',
      value: function save() {
        this.dispatcher.dispatch((0, _historyHistoryActions.SaveState)({
          storeId: this.storeId,
          state: _immutable.List.of(this.graph, this.types)
        }));
      }
    }, {
      key: 'connect',
      value: function connect(from, to) {
        if (to.edgeId) {
          this.setPortEdge(from, to.edgeId);
          return;
        }

        var newEdgeId = nextId(this.graph.edges);
        var newEdge = (0, _graphModel.Edge)({ id: newEdgeId, label: 'aaaa', type: from.type });
        this.graph = this.graph.setIn(['edges', newEdgeId], newEdge);
        this.setPortEdge(from, newEdgeId);
        this.setPortEdge(to, newEdgeId);
        this.pruneEmptyEdges();

        this.dispatcher.dispatch((0, _layoutLayoutActions.HandleEdgeInserted)({
          edge: newEdge,
          from: from,
          to: to
        }));

        function nextId(someMap) {
          var prefix = '#' + someMap.size;
          var qualified = function qualified(c) {
            return c ? prefix : prefix + '/' + c;
          };
          var counter = 0;
          while (someMap.has(qualified(counter))) {
            ++counter;
          }
          return qualified(counter);
        }
      }
    }, {
      key: 'setPortEdge',
      value: function setPortEdge(from, edgeId) {
        var portsPath = ['vertices', from.vertexId, 'ports', from.direction];
        this.graph = this.graph.updateIn(portsPath, function (ports) {
          return ports.map(function (p) {
            return p.id === from.portId ? p.set('edgeId', edgeId) : p;
          });
        });
      }
    }, {
      key: 'disconnect',
      value: function disconnect(vertex, port) {
        var portsPath = ['vertices', vertex.id, 'ports', port.direction];

        var type = this.types.get(port.type);
        if (type.owningPort === port.direction) {
          this.removeEdge(port.edgeId);
          return;
        }

        var current = this.graph;
        var next = current.setIn(portsPath, current.getIn(portsPath).map(function (p) {
          return p.id !== port.id ? p : port.set('edgeId', null);
        }));

        this.graph = next;
        this.pruneEmptyEdges();
      }
    }, {
      key: 'removeEdge',
      value: function removeEdge(edgeId) {
        var _this2 = this;

        var mapVertexPorts = function mapVertexPorts(v, f) {
          return v.set('ports', (0, _graphModel.Ports)({
            inbound: v.ports.inbound.map(f),
            outbound: v.ports.outbound.map(f)
          }));
        };

        var mapVertices = function mapVertices(f) {
          return _this2.graph.setIn(['vertices'], _this2.graph.vertices.map(f));
        };

        var mapGraphPorts = function mapGraphPorts(f) {
          return mapVertices(function (v) {
            return mapVertexPorts(v, f);
          });
        };

        this.graph = mapGraphPorts(function (p) {
          return p.set('edgeId', p.edgeId === edgeId ? null : p.edgeId);
        });
        this.pruneEmptyEdges();
      }
    }, {
      key: 'removeVertex',
      value: function removeVertex(vertexId) {
        var _this3 = this;

        var vertex = this.graph.vertices.get(vertexId);
        _graphModel.Directions.flatMap(function (d) {
          return vertex.ports[d];
        }).forEach(function (port) {
          _this3.disconnect(vertex, port);
        });

        this.graph = this.graph.update('vertices', function (vs) {
          return vs.filter(function (v) {
            return v.id !== vertexId;
          });
        });
        this.pruneEmptyEdges();
      }
    }, {
      key: 'pruneEmptyEdges',
      value: function pruneEmptyEdges() {
        var ports = this.graph.vertices.valueSeq().flatMap(function (v) {
          return _graphModel.Directions.flatMap(function (d) {
            return v.ports[d];
          });
        }).map(function (p) {
          return p.edgeId;
        }).filter(function (id) {
          return !!id;
        }).groupBy(function (id) {
          return id;
        });

        this.graph = this.graph.set('edges', this.graph.edges.filter(function (edge) {
          return ports.has(edge.id);
        }));
      }
    }]);

    return GraphStore;
  })();

  module.exports = GraphStore;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2dyYXBoL2dyYXBoLXN0b3JlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztNQWlCTSxVQUFVO0FBRUgsYUFGUCxVQUFVLENBRUQsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUc7Ozs0QkFGcEMsVUFBVTs7QUFHWixVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztBQUNyQyxVQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixVQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixVQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVosZ0JBQVUsQ0FBQyxRQUFRLGVBcEJyQixjQUFjLEVBb0J5QixVQUFBLEdBQUcsRUFBSTtBQUMxQyxjQUFLLFVBQVUsQ0FBRSxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQztBQUN4QyxjQUFLLElBQUksRUFBRSxDQUFDO09BQ2IsQ0FBRSxDQUFDOztBQUVKLGdCQUFVLENBQUMsUUFBUSxlQXhCckIsV0FBVyxFQXdCeUIsVUFBQSxHQUFHLEVBQUk7QUFDdkMsY0FBSyxPQUFPLENBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFFLENBQUM7QUFDakMsY0FBSyxJQUFJLEVBQUUsQ0FBQztPQUNiLENBQUUsQ0FBQzs7QUFFSixnQkFBVSxDQUFDLFFBQVEsZUE1QnJCLFlBQVksRUE0QnlCLFVBQUEsR0FBRyxFQUFJO0FBQ3hDLGNBQUssWUFBWSxDQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUUsQ0FBQztBQUNsQyxjQUFLLElBQUksRUFBRSxDQUFDO09BQ2IsQ0FBRSxDQUFDOztBQUVKLGdCQUFVLENBQUMsUUFBUSxlQWhDckIsVUFBVSxFQWdDeUIsVUFBQSxHQUFHLEVBQUk7QUFD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c3RvcmUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCB7IFNhdmVTdGF0ZSwgUmVzdG9yZVN0YXRlIH0gZnJvbSAnLi4vaGlzdG9yeS9oaXN0b3J5LWFjdGlvbnMnO1xuaW1wb3J0IHsgSGFuZGxlRWRnZUluc2VydGVkIH0gZnJvbSAnLi4vbGF5b3V0L2xheW91dC1hY3Rpb25zJztcblxuaW1wb3J0IHsgRGlyZWN0aW9ucywgUG9ydHMsIEVkZ2UgfSBmcm9tICcuL2dyYXBoLW1vZGVsJztcbmltcG9ydCB7XG4gIERpc2Nvbm5lY3RQb3J0LFxuICBDb25uZWN0UG9ydCxcbiAgUmVtb3ZlVmVydGV4LFxuICBSZW1vdmVFZGdlXG59IGZyb20gJy4vZ3JhcGgtYWN0aW9ucyc7XG5cblxuLyoqXG4gKiBNYW5hZ2VzIHRoZSBncmFwaCBtb2RlbCBwcm9wLlxuICovXG5jbGFzcyBHcmFwaFN0b3JlIHtcblxuICBjb25zdHJ1Y3RvciggZGlzcGF0Y2hlciwgZ3JhcGgsIHR5cGVzICkge1xuICAgIHRoaXMuZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XG5cbiAgICB0aGlzLnN0b3JlSWQgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgdGhpcy5ncmFwaCA9IGdyYXBoO1xuICAgIHRoaXMudHlwZXMgPSB0eXBlcztcbiAgICB0aGlzLnNhdmUoKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIERpc2Nvbm5lY3RQb3J0LCBhY3QgPT4ge1xuICAgICAgdGhpcy5kaXNjb25uZWN0KCBhY3QudmVydGV4LCBhY3QucG9ydCApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggQ29ubmVjdFBvcnQsIGFjdCA9PiB7XG4gICAgICB0aGlzLmNvbm5lY3QoIGFjdC5mcm9tLCBhY3QudG8gKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFJlbW92ZVZlcnRleCwgYWN0ID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlVmVydGV4KCBhY3QudmVydGV4SWQgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFJlbW92ZUVkZ2UsIGFjdCA9PiB7XG4gICAgICB0aGlzLnJlbW92ZUVkZ2UoIGFjdC5lZGdlSWQgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFJlc3RvcmVTdGF0ZSwgYWN0ID0+IHtcbiAgICAgIGlmKCBhY3Quc3RvcmVJZCA9PT0gdGhpcy5zdG9yZUlkICkge1xuICAgICAgICB0aGlzLmdyYXBoID0gYWN0LnN0YXRlLmdldCgwKTtcbiAgICAgICAgdGhpcy50eXBlcyA9IGFjdC5zdGF0ZS5nZXQoMSk7XG4gICAgICB9XG4gICAgfSApO1xuXG4gIH1cblxuICBzYXZlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaCggU2F2ZVN0YXRlKHtcbiAgICAgIHN0b3JlSWQ6IHRoaXMuc3RvcmVJZCxcbiAgICAgIHN0YXRlOiBMaXN0Lm9mKCB0aGlzLmdyYXBoLCB0aGlzLnR5cGVzIClcbiAgICB9KSApO1xuICB9XG5cbiAgY29ubmVjdCggZnJvbSwgdG8gKSB7XG4gICAgaWYoIHRvLmVkZ2VJZCApIHtcbiAgICAgIHRoaXMuc2V0UG9ydEVkZ2UoIGZyb20sIHRvLmVkZ2VJZCApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0VkZ2VJZCA9IG5leHRJZCggdGhpcy5ncmFwaC5lZGdlcyApO1xuICAgIGNvbnN0IG5ld0VkZ2UgPSBFZGdlKHsgaWQ6IG5ld0VkZ2VJZCwgbGFiZWw6ICdhYWFhJywgdHlwZTogZnJvbS50eXBlIH0pO1xuICAgIHRoaXMuZ3JhcGggPSB0aGlzLmdyYXBoLnNldEluKCBbICdlZGdlcycsIG5ld0VkZ2VJZCBdLCBuZXdFZGdlICk7XG4gICAgdGhpcy5zZXRQb3J0RWRnZSggZnJvbSwgbmV3RWRnZUlkICk7XG4gICAgdGhpcy5zZXRQb3J0RWRnZSggdG8sIG5ld0VkZ2VJZCApO1xuICAgIHRoaXMucHJ1bmVFbXB0eUVkZ2VzKCk7XG5cbiAgICB0aGlzLmRpc3BhdGNoZXIuZGlzcGF0Y2goIEhhbmRsZUVkZ2VJbnNlcnRlZCh7XG4gICAgICBlZGdlOiBuZXdFZGdlLFxuICAgICAgZnJvbTogZnJvbSxcbiAgICAgIHRvOiB0b1xuICAgIH0pICk7XG5cbiAgICBmdW5jdGlvbiBuZXh0SWQoIHNvbWVNYXAgKSB7XG4gICAgICBjb25zdCBwcmVmaXggPSAnIycgKyBzb21lTWFwLnNpemU7XG4gICAgICBjb25zdCBxdWFsaWZpZWQgPSBjID0+IGMgPyBwcmVmaXggOiAocHJlZml4ICsgJy8nICsgYyk7XG4gICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICB3aGlsZSggc29tZU1hcC5oYXMoIHF1YWxpZmllZCggY291bnRlciApICkgKSB7ICsrY291bnRlcjsgfVxuICAgICAgcmV0dXJuIHF1YWxpZmllZCggY291bnRlciApO1xuICAgIH1cbiAgfVxuXG4gIHNldFBvcnRFZGdlKCBmcm9tLCBlZGdlSWQgKSB7XG4gICAgY29uc3QgcG9ydHNQYXRoID0gWyAndmVydGljZXMnLCBmcm9tLnZlcnRleElkLCAncG9ydHMnLCBmcm9tLmRpcmVjdGlvbiBdO1xuICAgIHRoaXMuZ3JhcGggPSB0aGlzLmdyYXBoLnVwZGF0ZUluKCBwb3J0c1BhdGgsIHBvcnRzID0+IHBvcnRzLm1hcCggcCA9PlxuICAgICAgcC5pZCA9PT0gZnJvbS5wb3J0SWQgPyBwLnNldCggJ2VkZ2VJZCcsIGVkZ2VJZCApIDogcFxuICAgICkgKTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3QoIHZlcnRleCwgcG9ydCApIHtcbiAgICBjb25zdCBwb3J0c1BhdGggPSBbICd2ZXJ0aWNlcycsIHZlcnRleC5pZCwgJ3BvcnRzJywgcG9ydC5kaXJlY3Rpb24gXTtcblxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnR5cGVzLmdldCggcG9ydC50eXBlICk7XG4gICAgaWYoIHR5cGUub3duaW5nUG9ydCA9PT0gcG9ydC5kaXJlY3Rpb24gKSB7XG4gICAgICB0aGlzLnJlbW92ZUVkZ2UoIHBvcnQuZWRnZUlkICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuZ3JhcGg7XG4gICAgY29uc3QgbmV4dCA9IGN1cnJlbnQuc2V0SW4oIHBvcnRzUGF0aCwgY3VycmVudC5nZXRJbiggcG9ydHNQYXRoICkubWFwKCBwID0+XG4gICAgICBwLmlkICE9PSBwb3J0LmlkID8gcCA6IHBvcnQuc2V0KCAnZWRnZUlkJywgbnVsbCApXG4gICAgKSApO1xuXG4gICAgdGhpcy5ncmFwaCA9IG5leHQ7XG4gICAgdGhpcy5wcnVuZUVtcHR5RWRnZXMoKTtcbiAgfVxuXG4gIHJlbW92ZUVkZ2UoIGVkZ2VJZCApIHtcbiAgICBjb25zdCBtYXBWZXJ0ZXhQb3J0cyA9ICggdiwgZiApID0+IHYuc2V0KCAncG9ydHMnLCBQb3J0cyh7XG4gICAgICBpbmJvdW5kOiB2LnBvcnRzLmluYm91bmQubWFwKCBmICksXG4gICAgICBvdXRib3VuZDogdi5wb3J0cy5vdXRib3VuZC5tYXAoIGYgKVxuICAgIH0pICk7XG5cbiAgICBjb25zdCBtYXBWZXJ0aWNlcyA9IGYgPT5cbiAgICAgIHRoaXMuZ3JhcGguc2V0SW4oIFsgJ3ZlcnRpY2VzJyBdLCB0aGlzLmdyYXBoLnZlcnRpY2VzLm1hcCggZiApICk7XG5cbiAgICBjb25zdCBtYXBHcmFwaFBvcnRzID0gZiA9PlxuICAgICAgbWFwVmVydGljZXMoIHYgPT4gbWFwVmVydGV4UG9ydHMoIHYsIGYgKSApO1xuXG4gICAgdGhpcy5ncmFwaCA9IG1hcEdyYXBoUG9ydHMoIHAgPT4gcC5zZXQoICdlZGdlSWQnLFxuICAgICAgcC5lZGdlSWQgPT09IGVkZ2VJZCA/IG51bGwgOiBwLmVkZ2VJZFxuICAgICkgKTtcbiAgICB0aGlzLnBydW5lRW1wdHlFZGdlcygpO1xuICB9XG5cbiAgcmVtb3ZlVmVydGV4KCB2ZXJ0ZXhJZCApIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdyYXBoLnZlcnRpY2VzLmdldCggdmVydGV4SWQgKTtcbiAgICBEaXJlY3Rpb25zLmZsYXRNYXAoIGQgPT4gdmVydGV4LnBvcnRzWyBkIF0gKS5mb3JFYWNoKCBwb3J0ID0+IHtcbiAgICAgIHRoaXMuZGlzY29ubmVjdCggdmVydGV4LCBwb3J0ICk7XG4gICAgfSApO1xuXG4gICAgdGhpcy5ncmFwaCA9IHRoaXMuZ3JhcGgudXBkYXRlKCAndmVydGljZXMnLCB2cyA9PlxuICAgICAgdnMuZmlsdGVyKCB2ID0+IHYuaWQgIT09IHZlcnRleElkICkgKTtcbiAgICB0aGlzLnBydW5lRW1wdHlFZGdlcygpO1xuICB9XG5cbiAgcHJ1bmVFbXB0eUVkZ2VzKCkge1xuICAgIGNvbnN0IHBvcnRzID0gdGhpcy5ncmFwaC52ZXJ0aWNlcy52YWx1ZVNlcSgpXG4gICAgICAuZmxhdE1hcCggdiA9PiBEaXJlY3Rpb25zLmZsYXRNYXAoIGQgPT4gdi5wb3J0c1sgZCBdICkgKVxuICAgICAgLm1hcCggcCA9PiBwLmVkZ2VJZCApXG4gICAgICAuZmlsdGVyKCBpZCA9PiAhIWlkIClcbiAgICAgIC5ncm91cEJ5KCBpZCA9PiBpZCApO1xuXG4gICAgdGhpcy5ncmFwaCA9IHRoaXMuZ3JhcGguc2V0KCAnZWRnZXMnLFxuICAgICAgdGhpcy5ncmFwaC5lZGdlcy5maWx0ZXIoIGVkZ2UgPT4gcG9ydHMuaGFzKCBlZGdlLmlkICkgKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR3JhcGhTdG9yZTtcbiJdfQ==