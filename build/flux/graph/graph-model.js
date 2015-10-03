define(['exports', 'module', 'immutable', '../../util/options'], function (exports, module, _immutable, _utilOptions) {
  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _options = _interopRequireDefault(_utilOptions);

  var Graph = (0, _immutable.Record)({ edges: (0, _immutable.Map)(), vertices: (0, _immutable.Map)() });
  var Port = (0, _immutable.Record)({
    id: null,
    label: '',
    direction: null,
    type: null,
    edgeId: null
  });
  var Ports = (0, _immutable.Record)({ inbound: (0, _immutable.List)(), outbound: (0, _immutable.List)() });
  var Vertex = (0, _immutable.Record)({ id: null, label: '', ports: Ports() });
  var Edge = (0, _immutable.Record)({ id: null, label: '', type: null });
  var Type = (0, _immutable.Record)({ label: '', owningPort: null, hidden: false });

  var IN = 'inbound';
  var OUT = 'outbound';
  var Directions = _immutable.List.of(IN, OUT);

  function graph(jsGraph) {
    return Graph({
      edges: (0, _immutable.Map)(jsGraph.edges).mapEntries(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var k = _ref2[0];
        var v = _ref2[1];
        return [k, edge(v, k)];
      }),
      vertices: (0, _immutable.Map)(jsGraph.vertices).mapEntries(function (_ref3) {
        var _ref32 = _slicedToArray(_ref3, 2);

        var k = _ref32[0];
        var v = _ref32[1];
        return [k, vertex(v, k)];
      })
    });
  }

  function vertex(jsVertex, id) {
    return new Vertex(Object.assign(Object.assign({ id: id }, jsVertex), { ports: ports(jsVertex.ports) }));
  }

  function edge(jsEdge, id) {
    return Edge(id ? Object.assign({ id: id }, jsEdge) : jsEdge);
  }

  function ports(jsPorts) {
    return Ports({
      inbound: (0, _immutable.List)(jsPorts.inbound.map(port(IN))),
      outbound: (0, _immutable.List)(jsPorts.outbound.map(port(OUT)))
    });
  }

  function port(direction) {
    return function (jsPort) {
      return Port((0, _options['default'])(jsPort, { direction: direction }));
    };
  }

  function types(jsTypes) {
    return (0, _immutable.Map)(jsTypes).map(type);
  }

  function type(jsType) {
    return Type(jsType);
  }

  module.exports = {
    Type: Type,

    Graph: Graph,
    Vertex: Vertex,
    Edge: Edge,
    Ports: Ports,
    Port: Port,
    Directions: Directions,
    IN: IN,
    OUT: OUT,

    convert: {
      types: types,
      type: type,

      graph: graph,
      edge: edge,
      vertex: vertex,
      ports: ports,
      port: port
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2dyYXBoL2dyYXBoLW1vZGVsLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQSxNQUFNLEtBQUssR0FBRyxlQUhNLE1BQU0sRUFHTCxFQUFFLEtBQUssRUFBRSxlQUhyQixHQUFHLEdBR3VCLEVBQUUsUUFBUSxFQUFFLGVBSHRDLEdBQUcsR0FHd0MsRUFBRSxDQUFDLENBQUM7QUFDeEQsTUFBTSxJQUFJLEdBQUcsZUFKTyxNQUFNLEVBSU47QUFDbEIsTUFBRSxFQUFFLElBQUk7QUFDUixTQUFLLEVBQUUsRUFBRTtBQUNULGFBQVMsRUFBRSxJQUFJO0FBQ2YsUUFBSSxFQUFFLElBQUk7QUFDVixVQUFNLEVBQUUsSUFBSTtHQUNiLENBQUMsQ0FBQztBQUNILE1BQU0sS0FBSyxHQUFHLGVBWE0sTUFBTSxFQVdMLEVBQUUsT0FBTyxFQUFFLGVBWGxCLElBQUksR0FXb0IsRUFBRSxRQUFRLEVBQUUsZUFYcEMsSUFBSSxHQVdzQyxFQUFFLENBQUMsQ0FBQztBQUM1RCxNQUFNLE1BQU0sR0FBRyxlQVpLLE1BQU0sRUFZSixFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9ELE1BQU0sSUFBSSxHQUFHLGVBYk8sTUFBTSxFQWFOLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3pELE1BQU0sSUFBSSxHQUFHLGVBZE8sTUFBTSxFQWNOLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDOztBQUVwRSxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUM7QUFDckIsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDO0FBQ3ZCLE1BQU0sVUFBVSxHQUFH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ZGVsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcCwgTGlzdCwgUmVjb3JkIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBvcHRpb25zIGZyb20gJy4uLy4uL3V0aWwvb3B0aW9ucyc7XG5cbmNvbnN0IEdyYXBoID0gUmVjb3JkKHsgZWRnZXM6IE1hcCgpLCB2ZXJ0aWNlczogTWFwKCkgfSk7XG5jb25zdCBQb3J0ID0gUmVjb3JkKHtcbiAgaWQ6IG51bGwsXG4gIGxhYmVsOiAnJyxcbiAgZGlyZWN0aW9uOiBudWxsLFxuICB0eXBlOiBudWxsLFxuICBlZGdlSWQ6IG51bGxcbn0pO1xuY29uc3QgUG9ydHMgPSBSZWNvcmQoeyBpbmJvdW5kOiBMaXN0KCksIG91dGJvdW5kOiBMaXN0KCkgfSk7XG5jb25zdCBWZXJ0ZXggPSBSZWNvcmQoeyBpZDogbnVsbCwgbGFiZWw6ICcnLCBwb3J0czogUG9ydHMoKSB9KTtcbmNvbnN0IEVkZ2UgPSBSZWNvcmQoeyBpZDogbnVsbCwgbGFiZWw6ICcnLCB0eXBlOiBudWxsIH0pO1xuY29uc3QgVHlwZSA9IFJlY29yZCh7IGxhYmVsOiAnJywgb3duaW5nUG9ydDogbnVsbCwgaGlkZGVuOiBmYWxzZSB9KTtcblxuY29uc3QgSU4gPSAnaW5ib3VuZCc7XG5jb25zdCBPVVQgPSAnb3V0Ym91bmQnO1xuY29uc3QgRGlyZWN0aW9ucyA9IExpc3Qub2YoIElOLCBPVVQgKTtcblxuXG5mdW5jdGlvbiBncmFwaCgganNHcmFwaCApIHtcbiAgcmV0dXJuIEdyYXBoKHtcbiAgICBlZGdlczogTWFwKCBqc0dyYXBoLmVkZ2VzICkubWFwRW50cmllcyggKFsgaywgdiBdKSA9PiBbIGssIGVkZ2UodiwgaykgXSApLFxuICAgIHZlcnRpY2VzOiBNYXAoIGpzR3JhcGgudmVydGljZXMgKS5tYXBFbnRyaWVzKCAoWyBrLCB2IF0pID0+IFsgaywgdmVydGV4KHYsIGspIF0gKVxuICB9KTtcbn1cblxuZnVuY3Rpb24gdmVydGV4KCBqc1ZlcnRleCwgaWQgKSB7XG4gIHJldHVybiBuZXcgVmVydGV4KFxuICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICBPYmplY3QuYXNzaWduKCB7IGlkOiBpZCB9LCBqc1ZlcnRleCApLFxuICAgICAgeyBwb3J0czogcG9ydHMoIGpzVmVydGV4LnBvcnRzICkgfVxuICAgIClcbiAgKTtcbn1cblxuZnVuY3Rpb24gZWRnZSgganNFZGdlLCBpZCApIHtcbiAgcmV0dXJuIEVkZ2UoIGlkID8gT2JqZWN0LmFzc2lnbiggeyBpZDogaWQgfSwganNFZGdlICkgOiBqc0VkZ2UgKTtcbn1cblxuZnVuY3Rpb24gcG9ydHMoIGpzUG9ydHMgKSB7XG4gIHJldHVybiBQb3J0cyh7XG4gICAgaW5ib3VuZDogTGlzdCgganNQb3J0cy5pbmJvdW5kLm1hcCggcG9ydCggSU4gKSApICksXG4gICAgb3V0Ym91bmQ6IExpc3QoIGpzUG9ydHMub3V0Ym91bmQubWFwKCBwb3J0KCBPVVQgKSApIClcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvcnQoIGRpcmVjdGlvbiApIHtcbiAgcmV0dXJuIGpzUG9ydCA9PiBQb3J0KCBvcHRpb25zKCBqc1BvcnQsIHsgZGlyZWN0aW9uOiBkaXJlY3Rpb24gfSApICk7XG59XG5cblxuZnVuY3Rpb24gdHlwZXMoIGpzVHlwZXMgKSB7XG4gIHJldHVybiBNYXAoIGpzVHlwZXMgKS5tYXAoIHR5cGUgKTtcbn1cblxuZnVuY3Rpb24gdHlwZSgganNUeXBlICkge1xuICByZXR1cm4gVHlwZSgganNUeXBlICk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBUeXBlLFxuXG4gIEdyYXBoLFxuICBWZXJ0ZXgsXG4gIEVkZ2UsXG4gIFBvcnRzLFxuICBQb3J0LFxuICBEaXJlY3Rpb25zLFxuICBJTixcbiAgT1VULFxuXG4gIGNvbnZlcnQ6IHtcbiAgICB0eXBlcyxcbiAgICB0eXBlLFxuXG4gICAgZ3JhcGgsXG4gICAgZWRnZSxcbiAgICB2ZXJ0ZXgsXG4gICAgcG9ydHMsXG4gICAgcG9ydFxuICB9XG59O1xuIl19