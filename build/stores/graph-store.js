define(['exports', 'module', 'immutable', '../model', '../actions/layout', '../actions/graph', '../actions/history'], function (exports, module, _immutable, _model, _actionsLayout, _actionsGraph, _actionsHistory) {
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

      dispatcher.register(_actionsGraph.DisconnectPort, function (act) {
        _this.disconnect(act.vertex, act.port);
        _this.save();
      });

      dispatcher.register(_actionsGraph.ConnectPort, function (act) {
        _this.connect(act.from, act.to);
        _this.save();
      });

      dispatcher.register(_actionsGraph.RemoveVertex, function (act) {
        _this.removeVertex(act.vertexId);
        _this.save();
      });

      dispatcher.register(_actionsGraph.RemoveEdge, function (act) {
        _this.removeEdge(act.edgeId);
        _this.save();
      });

      dispatcher.register(_actionsHistory.RestoreState, function (act) {
        if (act.storeId === _this.storeId) {
          _this.graph = act.state.get(0);
          _this.types = act.state.get(1);
        }
      });
    }

    _createClass(GraphStore, [{
      key: 'save',
      value: function save() {
        this.dispatcher.dispatch((0, _actionsHistory.SaveState)({
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
        var newEdge = (0, _model.Edge)({ id: newEdgeId, label: 'aaaa', type: from.type });
        this.graph = this.graph.setIn(['edges', newEdgeId], newEdge);
        this.setPortEdge(from, newEdgeId);
        this.setPortEdge(to, newEdgeId);
        this.pruneEmptyEdges();

        this.dispatcher.dispatch((0, _actionsLayout.HandleEdgeInserted)({
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
          return v.set('ports', (0, _model.Ports)({
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
        _model.Directions.flatMap(function (d) {
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
          return _model.Directions.flatMap(function (d) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdG9yZXMvZ3JhcGgtc3RvcmUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O01Bb0JNLFVBQVU7QUFFSCxhQUZQLFVBQVUsQ0FFRCxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRzs7OzRCQUZwQyxVQUFVOztBQUdaLFVBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztBQUU3QixVQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQ3JDLFVBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFVBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFVBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFWixnQkFBVSxDQUFDLFFBQVEsZUF6QnJCLGNBQWMsRUF5QnlCLFVBQUEsR0FBRyxFQUFJO0FBQzFDLGNBQUssVUFBVSxDQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFDO0FBQ3hDLGNBQUssSUFBSSxFQUFFLENBQUM7T0FDYixDQUFFLENBQUM7O0FBRUosZ0JBQVUsQ0FBQyxRQUFRLGVBN0JyQixXQUFXLEVBNkJ5QixVQUFBLEdBQUcsRUFBSTtBQUN2QyxjQUFLLE9BQU8sQ0FBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUUsQ0FBQztBQUNqQyxjQUFLLElBQUksRUFBRSxDQUFDO09BQ2IsQ0FBRSxDQUFDOztBQUVKLGdCQUFVLENBQUMsUUFBUSxlQWpDckIsWUFBWSxFQWlDeUIsVUFBQSxHQUFHLEVBQUk7QUFDeEMsY0FBSyxZQUFZLENBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBRSxDQUFDO0FBQ2xDLGNBQUssSUFBSSxFQUFFLENBQUM7T0FDYixDQUFFLENBQUM7O0FBRUosZ0JBQVUsQ0FBQyxRQUFRLGVBckNyQixVQUFVLEVBcUN5QixVQUFBLEdBQUcsRUFBSTtBQUN0QyxjQUFL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Iiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3QsIE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25zLCBQb3J0cywgRWRnZSwgR3JhcGggfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQgeyBIYW5kbGVFZGdlSW5zZXJ0ZWQgfSBmcm9tICcuLi9hY3Rpb25zL2xheW91dCc7XG5cbmltcG9ydCB7XG4gIERpc2Nvbm5lY3RQb3J0LFxuICBDb25uZWN0UG9ydCxcbiAgUmVtb3ZlVmVydGV4LFxuICBSZW1vdmVFZGdlXG59IGZyb20gJy4uL2FjdGlvbnMvZ3JhcGgnO1xuXG5pbXBvcnQge1xuICBTYXZlU3RhdGUsXG4gIFJlc3RvcmVTdGF0ZVxufSBmcm9tICcuLi9hY3Rpb25zL2hpc3RvcnknO1xuXG5cbi8qKlxuICogTWFuYWdlcyB0aGUgZ3JhcGggbW9kZWwgcHJvcC5cbiAqL1xuY2xhc3MgR3JhcGhTdG9yZSB7XG5cbiAgY29uc3RydWN0b3IoIGRpc3BhdGNoZXIsIGdyYXBoLCB0eXBlcyApIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuXG4gICAgdGhpcy5zdG9yZUlkID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHRoaXMuZ3JhcGggPSBncmFwaDtcbiAgICB0aGlzLnR5cGVzID0gdHlwZXM7XG4gICAgdGhpcy5zYXZlKCk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBEaXNjb25uZWN0UG9ydCwgYWN0ID0+IHtcbiAgICAgIHRoaXMuZGlzY29ubmVjdCggYWN0LnZlcnRleCwgYWN0LnBvcnQgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIENvbm5lY3RQb3J0LCBhY3QgPT4ge1xuICAgICAgdGhpcy5jb25uZWN0KCBhY3QuZnJvbSwgYWN0LnRvICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZW1vdmVWZXJ0ZXgsIGFjdCA9PiB7XG4gICAgICB0aGlzLnJlbW92ZVZlcnRleCggYWN0LnZlcnRleElkICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZW1vdmVFZGdlLCBhY3QgPT4ge1xuICAgICAgdGhpcy5yZW1vdmVFZGdlKCBhY3QuZWRnZUlkICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZXN0b3JlU3RhdGUsIGFjdCA9PiB7XG4gICAgICBpZiggYWN0LnN0b3JlSWQgPT09IHRoaXMuc3RvcmVJZCApIHtcbiAgICAgICAgdGhpcy5ncmFwaCA9IGFjdC5zdGF0ZS5nZXQoMCk7XG4gICAgICAgIHRoaXMudHlwZXMgPSBhY3Quc3RhdGUuZ2V0KDEpO1xuICAgICAgfVxuICAgIH0gKTtcblxuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIuZGlzcGF0Y2goIFNhdmVTdGF0ZSh7XG4gICAgICBzdG9yZUlkOiB0aGlzLnN0b3JlSWQsXG4gICAgICBzdGF0ZTogTGlzdC5vZiggdGhpcy5ncmFwaCwgdGhpcy50eXBlcyApXG4gICAgfSkgKTtcbiAgfVxuXG4gIGNvbm5lY3QoIGZyb20sIHRvICkge1xuICAgIGlmKCB0by5lZGdlSWQgKSB7XG4gICAgICB0aGlzLnNldFBvcnRFZGdlKCBmcm9tLCB0by5lZGdlSWQgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdFZGdlSWQgPSBuZXh0SWQoIHRoaXMuZ3JhcGguZWRnZXMgKTtcbiAgICBjb25zdCBuZXdFZGdlID0gRWRnZSh7IGlkOiBuZXdFZGdlSWQsIGxhYmVsOiAnYWFhYScsIHR5cGU6IGZyb20udHlwZSB9KTtcbiAgICB0aGlzLmdyYXBoID0gdGhpcy5ncmFwaC5zZXRJbiggWyAnZWRnZXMnLCBuZXdFZGdlSWQgXSwgbmV3RWRnZSApO1xuICAgIHRoaXMuc2V0UG9ydEVkZ2UoIGZyb20sIG5ld0VkZ2VJZCApO1xuICAgIHRoaXMuc2V0UG9ydEVkZ2UoIHRvLCBuZXdFZGdlSWQgKTtcbiAgICB0aGlzLnBydW5lRW1wdHlFZGdlcygpO1xuXG4gICAgdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoKCBIYW5kbGVFZGdlSW5zZXJ0ZWQoe1xuICAgICAgZWRnZTogbmV3RWRnZSxcbiAgICAgIGZyb206IGZyb20sXG4gICAgICB0bzogdG9cbiAgICB9KSApO1xuXG4gICAgZnVuY3Rpb24gbmV4dElkKCBzb21lTWFwICkge1xuICAgICAgY29uc3QgcHJlZml4ID0gJyMnICsgc29tZU1hcC5zaXplO1xuICAgICAgY29uc3QgcXVhbGlmaWVkID0gYyA9PiBjID8gcHJlZml4IDogKHByZWZpeCArICcvJyArIGMpO1xuICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgd2hpbGUoIHNvbWVNYXAuaGFzKCBxdWFsaWZpZWQoIGNvdW50ZXIgKSApICkgeyArK2NvdW50ZXI7IH1cbiAgICAgIHJldHVybiBxdWFsaWZpZWQoIGNvdW50ZXIgKTtcbiAgICB9XG4gIH1cblxuXG4gIHNldFBvcnRFZGdlKCBmcm9tLCBlZGdlSWQgKSB7XG4gICAgY29uc3QgcG9ydHNQYXRoID0gWyAndmVydGljZXMnLCBmcm9tLnZlcnRleElkLCAncG9ydHMnLCBmcm9tLmRpcmVjdGlvbiBdO1xuICAgIHRoaXMuZ3JhcGggPSB0aGlzLmdyYXBoLnVwZGF0ZUluKCBwb3J0c1BhdGgsIHBvcnRzID0+IHBvcnRzLm1hcCggcCA9PlxuICAgICAgcC5pZCA9PT0gZnJvbS5wb3J0SWQgPyBwLnNldCggJ2VkZ2VJZCcsIGVkZ2VJZCApIDogcFxuICAgICkgKTtcbiAgfVxuXG5cbiAgZGlzY29ubmVjdCggdmVydGV4LCBwb3J0ICkge1xuICAgIGNvbnN0IHBvcnRzUGF0aCA9IFsgJ3ZlcnRpY2VzJywgdmVydGV4LmlkLCAncG9ydHMnLCBwb3J0LmRpcmVjdGlvbiBdO1xuXG4gICAgY29uc3QgdHlwZSA9IHRoaXMudHlwZXMuZ2V0KCBwb3J0LnR5cGUgKTtcbiAgICBpZiggdHlwZS5vd25pbmdQb3J0ID09PSBwb3J0LmRpcmVjdGlvbiApIHtcbiAgICAgIHRoaXMucmVtb3ZlRWRnZSggcG9ydC5lZGdlSWQgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50ID0gdGhpcy5ncmFwaDtcbiAgICBjb25zdCBuZXh0ID0gY3VycmVudC5zZXRJbiggcG9ydHNQYXRoLCBjdXJyZW50LmdldEluKCBwb3J0c1BhdGggKS5tYXAoIHAgPT5cbiAgICAgIHAuaWQgIT09IHBvcnQuaWQgPyBwIDogcG9ydC5zZXQoICdlZGdlSWQnLCBudWxsIClcbiAgICApICk7XG5cbiAgICB0aGlzLmdyYXBoID0gbmV4dDtcbiAgICB0aGlzLnBydW5lRW1wdHlFZGdlcygpO1xuICB9XG5cblxuICByZW1vdmVFZGdlKCBlZGdlSWQgKSB7XG4gICAgY29uc3QgbWFwVmVydGV4UG9ydHMgPSAoIHYsIGYgKSA9PiB2LnNldCggJ3BvcnRzJywgUG9ydHMoe1xuICAgICAgaW5ib3VuZDogdi5wb3J0cy5pbmJvdW5kLm1hcCggZiApLFxuICAgICAgb3V0Ym91bmQ6IHYucG9ydHMub3V0Ym91bmQubWFwKCBmIClcbiAgICB9KSApO1xuXG4gICAgY29uc3QgbWFwVmVydGljZXMgPSBmID0+XG4gICAgICB0aGlzLmdyYXBoLnNldEluKCBbICd2ZXJ0aWNlcycgXSwgdGhpcy5ncmFwaC52ZXJ0aWNlcy5tYXAoIGYgKSApO1xuXG4gICAgY29uc3QgbWFwR3JhcGhQb3J0cyA9IGYgPT5cbiAgICAgIG1hcFZlcnRpY2VzKCB2ID0+IG1hcFZlcnRleFBvcnRzKCB2LCBmICkgKTtcblxuICAgIHRoaXMuZ3JhcGggPSBtYXBHcmFwaFBvcnRzKCBwID0+IHAuc2V0KCAnZWRnZUlkJyxcbiAgICAgIHAuZWRnZUlkID09PSBlZGdlSWQgPyBudWxsIDogcC5lZGdlSWRcbiAgICApICk7XG4gICAgdGhpcy5wcnVuZUVtcHR5RWRnZXMoKTtcbiAgfVxuXG5cbiAgcmVtb3ZlVmVydGV4KCB2ZXJ0ZXhJZCApIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdyYXBoLnZlcnRpY2VzLmdldCggdmVydGV4SWQgKTtcbiAgICBEaXJlY3Rpb25zLmZsYXRNYXAoIGQgPT4gdmVydGV4LnBvcnRzWyBkIF0gKS5mb3JFYWNoKCBwb3J0ID0+IHtcbiAgICAgIHRoaXMuZGlzY29ubmVjdCggdmVydGV4LCBwb3J0ICk7XG4gICAgfSApO1xuXG4gICAgdGhpcy5ncmFwaCA9IHRoaXMuZ3JhcGgudXBkYXRlKCAndmVydGljZXMnLCB2cyA9PlxuICAgICAgdnMuZmlsdGVyKCB2ID0+IHYuaWQgIT09IHZlcnRleElkICkgKTtcbiAgICB0aGlzLnBydW5lRW1wdHlFZGdlcygpO1xuICB9XG5cblxuICBwcnVuZUVtcHR5RWRnZXMoKSB7XG4gICAgY29uc3QgcG9ydHMgPSB0aGlzLmdyYXBoLnZlcnRpY2VzLnZhbHVlU2VxKClcbiAgICAgIC5mbGF0TWFwKCB2ID0+IERpcmVjdGlvbnMuZmxhdE1hcCggZCA9PiB2LnBvcnRzWyBkIF0gKSApXG4gICAgICAubWFwKCBwID0+IHAuZWRnZUlkIClcbiAgICAgIC5maWx0ZXIoIGlkID0+ICEhaWQgKVxuICAgICAgLmdyb3VwQnkoIGlkID0+IGlkICk7XG5cbiAgICB0aGlzLmdyYXBoID0gdGhpcy5ncmFwaC5zZXQoICdlZGdlcycsXG4gICAgICB0aGlzLmdyYXBoLmVkZ2VzLmZpbHRlciggZWRnZSA9PiBwb3J0cy5oYXMoIGVkZ2UuaWQgKSApXG4gICAgKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdyYXBoU3RvcmU7XG4iXX0=