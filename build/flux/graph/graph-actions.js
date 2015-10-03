define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {
  'use strict';

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

  var Connectable = (0, _immutable.Record)({
    edgeId: null,
    type: null,
    vertexId: null,
    portId: null,
    direction: null
  }, 'Connectable');

  module.exports = {
    DisconnectPort: DisconnectPort,
    ConnectPort: ConnectPort,
    RemoveVertex: RemoveVertex,
    RemoveEdge: RemoveEdge,

    payload: {
      Connectable: Connectable
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2dyYXBoL2dyYXBoLWFjdGlvbnMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQU0sY0FBYyxHQUFHLGVBSGQsTUFBTSxFQUdlO0FBQzVCLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFLElBQUk7QUFDVixRQUFJLEVBQUU7YUFBTSxjQUFjO0tBQUE7R0FDM0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDOztBQUVyQixNQUFNLFdBQVcsR0FBRyxlQVRYLE1BQU0sRUFTWTtBQUN6QixRQUFJLEVBQUUsSUFBSTtBQUNWLE1BQUUsRUFBRSxJQUFJO0FBQ1IsUUFBSSxFQUFFO2FBQU0sV0FBVztLQUFBO0dBQ3hCLEVBQUUsYUFBYSxDQUFDLENBQUM7O0FBRWxCLE1BQU0sWUFBWSxHQUFHLGVBZlosTUFBTSxFQWVhO0FBQzFCLFlBQVEsRUFBRSxJQUFJO0FBQ2QsUUFBSSxFQUFFO2FBQU0sWUFBWTtLQUFBO0dBQ3pCLEVBQUUsY0FBYyxDQUFDLENBQUM7O0FBRW5CLE1BQU0sVUFBVSxHQUFHLGVBcEJWLE1BQU0sRUFvQlc7QUFDeEIsVUFBTSxFQUFFLElBQUk7QUFDWixRQUFJLEVBQUU7YUFBTSxVQUFVO0tBQUE7R0FDdkIsRUFBRSxZQUFZLENBQUMsQ0FBQzs7QUFHakIsTUFBTSxXQUFXLEdBQUcsZUExQlgsTUFBTSxFQTBCWTtBQUN6QixVQUFNLEVBQUUsSUFBSTtBQUNaLFFBQUksRUFBRSxJQUFJO0FBQ1YsWUFBUSxFQUFFLElBQUk7QUFDZCxVQUFNLEVBQUUsSUFBSTtBQUNaLGFBQVMsRUFBRSxJQUFJO0dBQ2hCLEVBQUUsYUFBYSxDQUFDLENBQUM7O21CQUdIO0FBQ2Isa0JBQWMsRUFBZCxjQUFjO0FBQ2QsZUFBVyxFQUFYLFdBQVc7QUFDWCxnQkFBWSxFQUFaLFlBQVk7QUFDWixjQUFVLEVBQVYsVUFBVTs7QUFFVixXQUFPLEVBQUU7QUFDUCxpQkFBVyxFQUFYLFdBQVc7S0FDWjtHQUNGIiwiZmlsZSI6ImdyYXBoLWFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuXG5jb25zdCBEaXNjb25uZWN0UG9ydCA9IFJlY29yZCh7XG4gIHZlcnRleDogbnVsbCxcbiAgcG9ydDogbnVsbCxcbiAgdHlwZTogKCkgPT4gRGlzY29ubmVjdFBvcnRcbn0sICdEaXNjb25uZWN0UG9ydCcpO1xuXG5jb25zdCBDb25uZWN0UG9ydCA9IFJlY29yZCh7XG4gIGZyb206IG51bGwsXG4gIHRvOiBudWxsLFxuICB0eXBlOiAoKSA9PiBDb25uZWN0UG9ydFxufSwgJ0Nvbm5lY3RQb3J0Jyk7XG5cbmNvbnN0IFJlbW92ZVZlcnRleCA9IFJlY29yZCh7XG4gIHZlcnRleElkOiBudWxsLFxuICB0eXBlOiAoKSA9PiBSZW1vdmVWZXJ0ZXhcbn0sICdSZW1vdmVWZXJ0ZXgnKTtcblxuY29uc3QgUmVtb3ZlRWRnZSA9IFJlY29yZCh7XG4gIGVkZ2VJZDogbnVsbCxcbiAgdHlwZTogKCkgPT4gUmVtb3ZlRWRnZVxufSwgJ1JlbW92ZUVkZ2UnKTtcblxuXG5jb25zdCBDb25uZWN0YWJsZSA9IFJlY29yZCh7XG4gIGVkZ2VJZDogbnVsbCxcbiAgdHlwZTogbnVsbCxcbiAgdmVydGV4SWQ6IG51bGwsXG4gIHBvcnRJZDogbnVsbCxcbiAgZGlyZWN0aW9uOiBudWxsXG59LCAnQ29ubmVjdGFibGUnKTtcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIERpc2Nvbm5lY3RQb3J0LFxuICBDb25uZWN0UG9ydCxcbiAgUmVtb3ZlVmVydGV4LFxuICBSZW1vdmVFZGdlLFxuXG4gIHBheWxvYWQ6IHtcbiAgICBDb25uZWN0YWJsZVxuICB9XG59O1xuIl19