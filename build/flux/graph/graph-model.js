define(['exports', 'module', 'immutable', '../../util/options'], function (exports, module, _immutable, _utilOptions) {'use strict';var _slicedToArray = (function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i['return']) _i['return']();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError('Invalid attempt to destructure non-iterable instance');}};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _options = _interopRequireDefault(_utilOptions);


  var Graph = (0, _immutable.Record)({ 
    edges: (0, _immutable.Map)(), 
    vertices: (0, _immutable.Map)() });


  var Port = (0, _immutable.Record)({ 
    id: null, 
    label: '', 
    direction: null, 
    type: null, 
    edgeId: null });


  var Ports = (0, _immutable.Record)({ 
    inbound: (0, _immutable.List)(), 
    outbound: (0, _immutable.List)() });


  var Vertex = (0, _immutable.Record)({ 
    id: null, 
    label: '', 
    kind: 'DEFAULT', 
    ports: Ports() });


  var Edge = (0, _immutable.Record)({ 
    id: null, 
    label: '', 
    type: null });


  var Type = (0, _immutable.Record)({ 
    label: '', 
    owningPort: null, 
    hidden: false });


  var Connectable = (0, _immutable.Record)({ 
    edgeId: null, 
    type: null, 
    vertexId: null, 
    portId: null, 
    direction: null }, 
  'Connectable');

  var IN = 'inbound';
  var OUT = 'outbound';
  var Directions = _immutable.List.of(IN, OUT);


  // convert from plain JS structures:

  function graph(jsGraph) {
    var jsEdges = (0, _immutable.Map)(jsGraph.edges);
    var jsVertices = (0, _immutable.Map)(jsGraph.vertices);
    return Graph({ 
      edges: jsEdges.mapEntries(function (_ref) {var _ref2 = _slicedToArray(_ref, 2);var k = _ref2[0];var v = _ref2[1];return [k, edge(v, k)];}), 
      vertices: jsVertices.mapEntries(function (_ref3) {var _ref32 = _slicedToArray(_ref3, 2);var k = _ref32[0];var v = _ref32[1];return [k, vertex(v, k)];}) });}



  function vertex(jsVertex, id) {
    return new Vertex(
    Object.assign(
    Object.assign({ id: id }, jsVertex), 
    { ports: ports(jsVertex.ports) }));}




  function edge(jsEdge, id) {
    return Edge(id ? Object.assign({ id: id }, jsEdge) : jsEdge);}


  function ports(jsPorts) {
    return Ports({ 
      inbound: (0, _immutable.List)(jsPorts.inbound.map(port(IN))), 
      outbound: (0, _immutable.List)(jsPorts.outbound.map(port(OUT))) });}



  function port(direction) {
    return function (jsPort) {return Port((0, _options['default'])(jsPort, { direction: direction }));};}


  function types(jsTypes) {
    return (0, _immutable.Map)(jsTypes).map(type);}


  function type(jsType) {
    return Type(jsType);}module.exports = 



  { 
    Type: Type, 

    Graph: Graph, 
    Vertex: Vertex, 
    Edge: Edge, 
    Ports: Ports, 
    Port: Port, 
    Directions: Directions, 
    IN: IN, 
    OUT: OUT, 

    Connectable: Connectable, 

    convert: { 
      types: types, 
      type: type, 

      graph: graph, 
      edge: edge, 
      vertex: vertex, 
      ports: ports, 
      port: port } };});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2dyYXBoL2dyYXBoLW1vZGVsLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFNLEtBQUssR0FBRyxlQUhNLE1BQU0sRUFHTDtBQUNuQixTQUFLLEVBQUUsZUFKQSxHQUFHLEdBSUU7QUFDWixZQUFRLEVBQUUsZUFMSCxHQUFHLEdBS0ssRUFDaEIsQ0FBQyxDQUFDOzs7QUFFSCxNQUFNLElBQUksR0FBRyxlQVJPLE1BQU0sRUFRTjtBQUNsQixNQUFFLEVBQUUsSUFBSTtBQUNSLFNBQUssRUFBRSxFQUFFO0FBQ1QsYUFBUyxFQUFFLElBQUk7QUFDZixRQUFJLEVBQUUsSUFBSTtBQUNWLFVBQU0sRUFBRSxJQUFJLEVBQ2IsQ0FBQyxDQUFDOzs7QUFFSCxNQUFNLEtBQUssR0FBRyxlQWhCTSxNQUFNLEVBZ0JMO0FBQ25CLFdBQU8sRUFBRSxlQWpCRyxJQUFJLEdBaUJEO0FBQ2YsWUFBUSxFQUFFLGVBbEJFLElBQUksR0FrQkEsRUFDakIsQ0FBQyxDQUFDOzs7QUFFSCxNQUFNLE1BQU0sR0FBRyxlQXJCSyxNQUFNLEVBcUJKO0FBQ3BCLE1BQUUsRUFBRSxJQUFJO0FBQ1IsU0FBSyxFQUFFLEVBQUU7QUFDVCxRQUFJLEVBQUUsU0FBUztBQUNmLFNBQUssRUFBRSxLQUFLLEVBQUUsRUFDZixDQUFDLENBQUM7OztBQUVILE1BQU0sSUFBSSxHQUFHLGVBNUJPLE1BQU0sRUE0Qk47QUFDbEIsTUFBRSxFQUFFLElBQUk7QUFDUixTQUFLLEVBQUUsRUFBRTtBQUNULFFBQUksRUFBRSxJQUFJLEVBQ1gsQ0FBQyxDQUFDOzs7QUFFSCxNQUFNLElBQUksR0FBRyxlQWxDTyxNQUFNLEVBa0NOO0FBQ2xCLFNBQUssRUFBRSxFQUFFO0FBQ1QsY0FBVSxFQUFFLElBQUk7QUFDaEIsVUFBTSxFQUFFLEtBQUssRUFDZCxDQUFDLENBQUM7OztBQUVILE1BQU0sV0FBVyxHQUFHLGVBeENBLE1BQU0sRUF3Q0M7QUFDekIsVUFBTSxF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SyxFQUFMLEtBQUs7QUFDTCxRQUFJLEVBQUosSUFBSTtBQUNKLGNBQVUsRUFBVixVQUFVO0FBQ1YsTUFBRSxFQUFGLEVBQUU7QUFDRixPQUFHLEVBQUgsR0FBRzs7QUFFSCxlQUFXLEVBQVgsV0FBVzs7QUFFWCxXQUFPLEVBQUU7QUFDUCxXQUFLLEVBQUwsS0FBSztBQUNMLFVBQUksRUFBSixJQUFJOztBQUVKLFdBQUssRUFBTCxLQUFLO0FBQ0wsVUFBSSxFQUFKLElBQUk7QUFDSixZQUFNLEVBQU4sTUFBTTtBQUNOLFdBQUssRUFBTCxLQUFLO0FBQ0wsVUFBSSxFQUFKLElBQUksRUFDTCxFQUNGIiwiZmlsZSI6ImdyYXBoLW1vZGVsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcCwgTGlzdCwgUmVjb3JkIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4uLy4uL3V0aWwvb3B0aW9ucyc7XG5cbmNvbnN0IEdyYXBoID0gUmVjb3JkKHtcbiAgZWRnZXM6IE1hcCgpLFxuICB2ZXJ0aWNlczogTWFwKClcbn0pO1xuXG5jb25zdCBQb3J0ID0gUmVjb3JkKHtcbiAgaWQ6IG51bGwsXG4gIGxhYmVsOiAnJyxcbiAgZGlyZWN0aW9uOiBudWxsLFxuICB0eXBlOiBudWxsLFxuICBlZGdlSWQ6IG51bGxcbn0pO1xuXG5jb25zdCBQb3J0cyA9IFJlY29yZCh7XG4gIGluYm91bmQ6IExpc3QoKSxcbiAgb3V0Ym91bmQ6IExpc3QoKVxufSk7XG5cbmNvbnN0IFZlcnRleCA9IFJlY29yZCh7XG4gIGlkOiBudWxsLFxuICBsYWJlbDogJycsXG4gIGtpbmQ6ICdERUZBVUxUJyxcbiAgcG9ydHM6IFBvcnRzKClcbn0pO1xuXG5jb25zdCBFZGdlID0gUmVjb3JkKHtcbiAgaWQ6IG51bGwsXG4gIGxhYmVsOiAnJyxcbiAgdHlwZTogbnVsbFxufSk7XG5cbmNvbnN0IFR5cGUgPSBSZWNvcmQoe1xuICBsYWJlbDogJycsXG4gIG93bmluZ1BvcnQ6IG51bGwsXG4gIGhpZGRlbjogZmFsc2Vcbn0pO1xuXG5jb25zdCBDb25uZWN0YWJsZSA9IFJlY29yZCh7XG4gIGVkZ2VJZDogbnVsbCxcbiAgdHlwZTogbnVsbCxcbiAgdmVydGV4SWQ6IG51bGwsXG4gIHBvcnRJZDogbnVsbCxcbiAgZGlyZWN0aW9uOiBudWxsXG59LCAnQ29ubmVjdGFibGUnKTtcblxuY29uc3QgSU4gPSAnaW5ib3VuZCc7XG5jb25zdCBPVVQgPSAnb3V0Ym91bmQnO1xuY29uc3QgRGlyZWN0aW9ucyA9IExpc3Qub2YoIElOLCBPVVQgKTtcblxuXG4vLyBjb252ZXJ0IGZyb20gcGxhaW4gSlMgc3RydWN0dXJlczpcblxuZnVuY3Rpb24gZ3JhcGgoIGpzR3JhcGggKSB7XG4gIGNvbnN0IGpzRWRnZXMgPSBNYXAoIGpzR3JhcGguZWRnZXMgKTtcbiAgY29uc3QganNWZXJ0aWNlcyA9IE1hcCgganNHcmFwaC52ZXJ0aWNlcyApO1xuICByZXR1cm4gR3JhcGgoe1xuICAgIGVkZ2VzOiBqc0VkZ2VzLm1hcEVudHJpZXMoIChbIGssIHYgXSkgPT4gWyBrLCBlZGdlKHYsIGspIF0gKSxcbiAgICB2ZXJ0aWNlczoganNWZXJ0aWNlcy5tYXBFbnRyaWVzKCAoWyBrLCB2IF0pID0+IFsgaywgdmVydGV4KHYsIGspIF0gKVxuICB9KTtcbn1cblxuZnVuY3Rpb24gdmVydGV4KCBqc1ZlcnRleCwgaWQgKSB7XG4gIHJldHVybiBuZXcgVmVydGV4KFxuICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICBPYmplY3QuYXNzaWduKCB7IGlkOiBpZCB9LCBqc1ZlcnRleCApLFxuICAgICAgeyBwb3J0czogcG9ydHMoIGpzVmVydGV4LnBvcnRzICkgfVxuICAgIClcbiAgKTtcbn1cblxuZnVuY3Rpb24gZWRnZSgganNFZGdlLCBpZCApIHtcbiAgcmV0dXJuIEVkZ2UoIGlkID8gT2JqZWN0LmFzc2lnbiggeyBpZDogaWQgfSwganNFZGdlICkgOiBqc0VkZ2UgKTtcbn1cblxuZnVuY3Rpb24gcG9ydHMoIGpzUG9ydHMgKSB7XG4gIHJldHVybiBQb3J0cyh7XG4gICAgaW5ib3VuZDogTGlzdCgganNQb3J0cy5pbmJvdW5kLm1hcCggcG9ydCggSU4gKSApICksXG4gICAgb3V0Ym91bmQ6IExpc3QoIGpzUG9ydHMub3V0Ym91bmQubWFwKCBwb3J0KCBPVVQgKSApIClcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvcnQoIGRpcmVjdGlvbiApIHtcbiAgcmV0dXJuIGpzUG9ydCA9PiBQb3J0KCBvcHRpb25zKCBqc1BvcnQsIHsgZGlyZWN0aW9uOiBkaXJlY3Rpb24gfSApICk7XG59XG5cbmZ1bmN0aW9uIHR5cGVzKCBqc1R5cGVzICkge1xuICByZXR1cm4gTWFwKCBqc1R5cGVzICkubWFwKCB0eXBlICk7XG59XG5cbmZ1bmN0aW9uIHR5cGUoIGpzVHlwZSApIHtcbiAgcmV0dXJuIFR5cGUoIGpzVHlwZSApO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgVHlwZSxcblxuICBHcmFwaCxcbiAgVmVydGV4LFxuICBFZGdlLFxuICBQb3J0cyxcbiAgUG9ydCxcbiAgRGlyZWN0aW9ucyxcbiAgSU4sXG4gIE9VVCxcblxuICBDb25uZWN0YWJsZSxcblxuICBjb252ZXJ0OiB7XG4gICAgdHlwZXMsXG4gICAgdHlwZSxcblxuICAgIGdyYXBoLFxuICAgIGVkZ2UsXG4gICAgdmVydGV4LFxuICAgIHBvcnRzLFxuICAgIHBvcnRcbiAgfVxufTtcbiJdfQ==