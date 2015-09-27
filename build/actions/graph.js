define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {
  'use strict';

  var Connectable = (0, _immutable.Record)({
    edgeId: null,
    type: null,
    vertexId: null,
    portId: null,
    direction: null
  }, 'Connectable');

  var DisconnectPort = (0, _immutable.Record)({
    vertex: null,
    port: null,
    type: function type() {
      return DisconnectPort;
    }
  }, 'DisconnectPort');

  var ConnectPort = (0, _immutable.Record)({
    from: null,
    to: null,
    type: function type() {
      return ConnectPort;
    }
  }, 'ConnectPort');

  var RemoveVertex = (0, _immutable.Record)({
    vertexId: null,
    type: function type() {
      return RemoveVertex;
    }
  }, 'RemoveVertex');

  var RemoveEdge = (0, _immutable.Record)({
    edgeId: null,
    type: function type() {
      return RemoveEdge;
    }
  }, 'RemoveEdge');

  module.exports = {
    Connectable: Connectable,
    DisconnectPort: DisconnectPort,
    ConnectPort: ConnectPort,
    RemoveVertex: RemoveVertex,
    RemoveEdge: RemoveEdge
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2dyYXBoLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFNLFdBQVcsR0FBRyxlQUhYLE1BQU0sRUFHWTtBQUN6QixVQUFNLEVBQUUsSUFBSTtBQUNaLFFBQUksRUFBRSxJQUFJO0FBQ1YsWUFBUSxFQUFFLElBQUk7QUFDZCxVQUFNLEVBQUUsSUFBSTtBQUNaLGFBQVMsRUFBRSxJQUFJO0dBQ2hCLEVBQUUsYUFBYSxDQUFDLENBQUM7O0FBR2xCLE1BQU0sY0FBYyxHQUFHLGVBWmQsTUFBTSxFQVllO0FBQzVCLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFLElBQUk7QUFDVixRQUFJLEVBQUU7YUFBTSxjQUFjO0tBQUE7R0FDM0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOztBQUVyQixNQUFNLFdBQVcsR0FBRyxlQWxCWCxNQUFNLEVBa0JZO0FBQ3pCLFFBQUksRUFBRSxJQUFJO0FBQ1YsTUFBRSxFQUFFLElBQUk7QUFDUixRQUFJLEVBQUU7YUFBTSxXQUFXO0tBQUE7R0FDeEIsRUFBRSxhQUFhLENBQUMsQ0FBQzs7QUFFbEIsTUFBTSxZQUFZLEdBQUcsZUF4QlosTUFBTSxFQXdCYTtBQUMxQixZQUFRLEVBQUUsSUFBSTtBQUNkLFFBQUksRUFBRTthQUFNLFlBQVk7S0FBQTtHQUN6QixFQUFFLGNBQWMsQ0FBQyxDQUFDOztBQUVuQixNQUFNLFVBQVUsR0FBRyxlQTdCVixNQUFNLEVBNkJXO0FBQ3hCLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFO2FBQU0sVUFBVTtLQUFBO0dBQ3ZCLEVBQUUsWUFBWSxDQUFDLENBQUM7O21CQUdGO0FBQ2IsZUFBVyxFQUFYLFdBQVc7QUFDWCxrQkFBYyxFQUFkLGNBQWM7QUFDZCxlQUFXLEVBQVgsV0FBVztBQUNYLGdCQUFZLEVBQVosWUFBWTtBQUNaLGNBQVUsRUFBVixVQUFVO0dBQ1giLCJmaWxlIjoiZ3JhcGguanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuXG5jb25zdCBDb25uZWN0YWJsZSA9IFJlY29yZCh7XG4gIGVkZ2VJZDogbnVsbCxcbiAgdHlwZTogbnVsbCxcbiAgdmVydGV4SWQ6IG51bGwsXG4gIHBvcnRJZDogbnVsbCxcbiAgZGlyZWN0aW9uOiBudWxsXG59LCAnQ29ubmVjdGFibGUnKTtcblxuXG5jb25zdCBEaXNjb25uZWN0UG9ydCA9IFJlY29yZCh7XG4gIHZlcnRleDogbnVsbCxcbiAgcG9ydDogbnVsbCxcbiAgdHlwZTogKCkgPT4gRGlzY29ubmVjdFBvcnRcbn0sICdEaXNjb25uZWN0UG9ydCcpO1xuXG5jb25zdCBDb25uZWN0UG9ydCA9IFJlY29yZCh7XG4gIGZyb206IG51bGwsXG4gIHRvOiBudWxsLFxuICB0eXBlOiAoKSA9PiBDb25uZWN0UG9ydFxufSwgJ0Nvbm5lY3RQb3J0Jyk7XG5cbmNvbnN0IFJlbW92ZVZlcnRleCA9IFJlY29yZCh7XG4gIHZlcnRleElkOiBudWxsLFxuICB0eXBlOiAoKSA9PiBSZW1vdmVWZXJ0ZXhcbn0sICdSZW1vdmVWZXJ0ZXgnKTtcblxuY29uc3QgUmVtb3ZlRWRnZSA9IFJlY29yZCh7XG4gIGVkZ2VJZDogbnVsbCxcbiAgdHlwZTogKCkgPT4gUmVtb3ZlRWRnZVxufSwgJ1JlbW92ZUVkZ2UnKTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIENvbm5lY3RhYmxlLFxuICBEaXNjb25uZWN0UG9ydCxcbiAgQ29ubmVjdFBvcnQsXG4gIFJlbW92ZVZlcnRleCxcbiAgUmVtb3ZlRWRnZVxufTtcbiJdfQ==