define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {'use strict';

  var ActivateVertex = (0, _immutable.Record)({ 
    vertex: null, 
    type: function type() {return ActivateVertex;} }, 
  'ActivateVertex');

  var DisconnectPort = (0, _immutable.Record)({ 
    vertex: null, 
    port: null, 
    type: function type() {return DisconnectPort;} }, 
  'DisconnectPort');

  var ConnectPort = (0, _immutable.Record)({ 
    from: null, 
    to: null, 
    type: function type() {return ConnectPort;} }, 
  'ConnectPort');

  var RemoveVertex = (0, _immutable.Record)({ 
    vertexId: null, 
    type: function type() {return RemoveVertex;} }, 
  'RemoveVertex');

  var RemoveEdge = (0, _immutable.Record)({ 
    edgeId: null, 
    type: function type() {return RemoveEdge;} }, 
  'RemoveEdge');module.exports = 

  { 
    ActivateVertex: ActivateVertex, 
    DisconnectPort: DisconnectPort, 
    ConnectPort: ConnectPort, 
    RemoveVertex: RemoveVertex, 
    RemoveEdge: RemoveEdge };});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2dyYXBoL2dyYXBoLWFjdGlvbnMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxjQUFjLEdBQUcsZUFGZCxNQUFNLEVBRWU7QUFDNUIsVUFBTSxFQUFFLElBQUk7QUFDWixRQUFJLEVBQUUsd0JBQU0sY0FBYyxFQUFBLEVBQzNCO0FBQUUsa0JBQWdCLENBQUMsQ0FBQzs7QUFFckIsTUFBTSxjQUFjLEdBQUcsZUFQZCxNQUFNLEVBT2U7QUFDNUIsVUFBTSxFQUFFLElBQUk7QUFDWixRQUFJLEVBQUUsSUFBSTtBQUNWLFFBQUksRUFBRSx3QkFBTSxjQUFjLEVBQUEsRUFDM0I7QUFBRSxrQkFBZ0IsQ0FBQyxDQUFDOztBQUVyQixNQUFNLFdBQVcsR0FBRyxlQWJYLE1BQU0sRUFhWTtBQUN6QixRQUFJLEVBQUUsSUFBSTtBQUNWLE1BQUUsRUFBRSxJQUFJO0FBQ1IsUUFBSSxFQUFFLHdCQUFNLFdBQVcsRUFBQSxFQUN4QjtBQUFFLGVBQWEsQ0FBQyxDQUFDOztBQUVsQixNQUFNLFlBQVksR0FBRyxlQW5CWixNQUFNLEVBbUJhO0FBQzFCLFlBQVEsRUFBRSxJQUFJO0FBQ2QsUUFBSSxFQUFFLHdCQUFNLFlBQVksRUFBQSxFQUN6QjtBQUFFLGdCQUFjLENBQUMsQ0FBQzs7QUFFbkIsTUFBTSxVQUFVLEdBQUcsZUF4QlYsTUFBTSxFQXdCVztBQUN4QixVQUFNLEVBQUUsSUFBSTtBQUNaLFFBQUksRUFBRSx3QkFBTSxVQUFVLEVBQUEsRUFDdkI7QUFBRSxjQUFZLENBQUMsQ0FBQzs7QUFFRjtBQUNiLGtCQUFjLEVBQWQsY0FBYztBQUNkLGtCQUFjLEVBQWQsY0FBYztBQUNkLGVBQVcsRUFBWCxXQUFXO0FBQ1gsZ0JBQVksRUFBWixZQUFZO0FBQ1osY0FBVSxFQUFWLFVBQVUsRUFDWCIsImZpbGUiOiJncmFwaC1hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY29yZCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IEFjdGl2YXRlVmVydGV4ID0gUmVjb3JkKHtcbiAgdmVydGV4OiBudWxsLFxuICB0eXBlOiAoKSA9PiBBY3RpdmF0ZVZlcnRleFxufSwgJ0FjdGl2YXRlVmVydGV4Jyk7XG5cbmNvbnN0IERpc2Nvbm5lY3RQb3J0ID0gUmVjb3JkKHtcbiAgdmVydGV4OiBudWxsLFxuICBwb3J0OiBudWxsLFxuICB0eXBlOiAoKSA9PiBEaXNjb25uZWN0UG9ydFxufSwgJ0Rpc2Nvbm5lY3RQb3J0Jyk7XG5cbmNvbnN0IENvbm5lY3RQb3J0ID0gUmVjb3JkKHtcbiAgZnJvbTogbnVsbCxcbiAgdG86IG51bGwsXG4gIHR5cGU6ICgpID0+IENvbm5lY3RQb3J0XG59LCAnQ29ubmVjdFBvcnQnKTtcblxuY29uc3QgUmVtb3ZlVmVydGV4ID0gUmVjb3JkKHtcbiAgdmVydGV4SWQ6IG51bGwsXG4gIHR5cGU6ICgpID0+IFJlbW92ZVZlcnRleFxufSwgJ1JlbW92ZVZlcnRleCcpO1xuXG5jb25zdCBSZW1vdmVFZGdlID0gUmVjb3JkKHtcbiAgZWRnZUlkOiBudWxsLFxuICB0eXBlOiAoKSA9PiBSZW1vdmVFZGdlXG59LCAnUmVtb3ZlRWRnZScpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEFjdGl2YXRlVmVydGV4LFxuICBEaXNjb25uZWN0UG9ydCxcbiAgQ29ubmVjdFBvcnQsXG4gIFJlbW92ZVZlcnRleCxcbiAgUmVtb3ZlRWRnZVxufTtcbiJdfQ==