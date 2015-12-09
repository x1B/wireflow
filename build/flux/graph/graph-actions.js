define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {'use strict';


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
    DisconnectPort: DisconnectPort, 
    ConnectPort: ConnectPort, 
    RemoveVertex: RemoveVertex, 
    RemoveEdge: RemoveEdge };});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2dyYXBoL2dyYXBoLWFjdGlvbnMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQU0sY0FBYyxHQUFHLGVBSGQsTUFBTSxFQUdlO0FBQzVCLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFLElBQUk7QUFDVixRQUFJLEVBQUUsd0JBQU0sY0FBYyxFQUFBLEVBQzNCO0FBQUUsa0JBQWdCLENBQUMsQ0FBQzs7QUFFckIsTUFBTSxXQUFXLEdBQUcsZUFUWCxNQUFNLEVBU1k7QUFDekIsUUFBSSxFQUFFLElBQUk7QUFDVixNQUFFLEVBQUUsSUFBSTtBQUNSLFFBQUksRUFBRSx3QkFBTSxXQUFXLEVBQUEsRUFDeEI7QUFBRSxlQUFhLENBQUMsQ0FBQzs7QUFFbEIsTUFBTSxZQUFZLEdBQUcsZUFmWixNQUFNLEVBZWE7QUFDMUIsWUFBUSxFQUFFLElBQUk7QUFDZCxRQUFJLEVBQUUsd0JBQU0sWUFBWSxFQUFBLEVBQ3pCO0FBQUUsZ0JBQWMsQ0FBQyxDQUFDOztBQUVuQixNQUFNLFVBQVUsR0FBRyxlQXBCVixNQUFNLEVBb0JXO0FBQ3hCLFVBQU0sRUFBRSxJQUFJO0FBQ1osUUFBSSxFQUFFLHdCQUFNLFVBQVUsRUFBQSxFQUN2QjtBQUFFLGNBQVksQ0FBQyxDQUFDOztBQUVGO0FBQ2Isa0JBQWMsRUFBZCxjQUFjO0FBQ2QsZUFBVyxFQUFYLFdBQVc7QUFDWCxnQkFBWSxFQUFaLFlBQVk7QUFDWixjQUFVLEVBQVYsVUFBVSxFQUNYIiwiZmlsZSI6ImdyYXBoLWFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuXG5jb25zdCBEaXNjb25uZWN0UG9ydCA9IFJlY29yZCh7XG4gIHZlcnRleDogbnVsbCxcbiAgcG9ydDogbnVsbCxcbiAgdHlwZTogKCkgPT4gRGlzY29ubmVjdFBvcnRcbn0sICdEaXNjb25uZWN0UG9ydCcpO1xuXG5jb25zdCBDb25uZWN0UG9ydCA9IFJlY29yZCh7XG4gIGZyb206IG51bGwsXG4gIHRvOiBudWxsLFxuICB0eXBlOiAoKSA9PiBDb25uZWN0UG9ydFxufSwgJ0Nvbm5lY3RQb3J0Jyk7XG5cbmNvbnN0IFJlbW92ZVZlcnRleCA9IFJlY29yZCh7XG4gIHZlcnRleElkOiBudWxsLFxuICB0eXBlOiAoKSA9PiBSZW1vdmVWZXJ0ZXhcbn0sICdSZW1vdmVWZXJ0ZXgnKTtcblxuY29uc3QgUmVtb3ZlRWRnZSA9IFJlY29yZCh7XG4gIGVkZ2VJZDogbnVsbCxcbiAgdHlwZTogKCkgPT4gUmVtb3ZlRWRnZVxufSwgJ1JlbW92ZUVkZ2UnKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBEaXNjb25uZWN0UG9ydCxcbiAgQ29ubmVjdFBvcnQsXG4gIFJlbW92ZVZlcnRleCxcbiAgUmVtb3ZlRWRnZVxufTtcbiJdfQ==