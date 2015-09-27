define(['exports', 'immutable', './util/options'], function (exports, _immutable, _utilOptions) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var Map = _immutable.Map;
  var List = _immutable.List;
  var Record = _immutable.Record;

  // dimensions for each node, plus node-internal positions of vertex-ports
  var Measurements = Record({ vertices: Map(), edges: Map() });

  // Settings, to be used by the embedding application
  var READ_WRITE = 'read/write';
  var READ_ONLY = 'read-only';
  var Settings = Record({ mode: READ_WRITE }, 'Settings');
  var InteractionModes = List.of(READ_ONLY, READ_WRITE);

  // Types related to layout/measurements
  var Coords = Record({ left: 0, top: 0 });
  var Dimensions = Record({ width: 0, height: 0 });
  var Layout = Record({ edges: Map(), vertices: Map() });

  var VertexMeasurements = Record({
    dimensions: null,
    inbound: Map(),
    outbound: Map()
  }, 'VertexMeasurements');

  var EdgeMeasurements = Record({
    dimensions: null
  }, 'EdgeMeasurements');

  // Actual model
  var Graph = Record({ edges: Map(), vertices: Map() });
  var Port = Record({ label: '', direction: null, type: null, id: null, edgeId: null });
  var Ports = Record({ inbound: List(), outbound: List() });
  var Vertex = Record({ id: null, label: '', ports: Ports() });
  var Edge = Record({ id: null, label: '', type: null });
  var Type = Record({ hidden: false, label: '', owningPort: null });

  var IN = 'inbound';
  var OUT = 'outbound';
  var Directions = List.of(IN, OUT);

  // History Stuff:
  var Checkpoint = Record({
    before: null,
    at: null
  }, 'Checkpoint');

  var convert = {
    graph: graph,
    layout: layout,
    types: types
  };

  exports.Coords = Coords;
  exports.Dimensions = Dimensions;
  exports.Layout = Layout;
  exports.Measurements = Measurements;
  exports.VertexMeasurements = VertexMeasurements;
  exports.EdgeMeasurements = EdgeMeasurements;
  exports.IN = IN;
  exports.OUT = OUT;
  exports.Directions = Directions;
  exports.Graph = Graph;
  exports.Edge = Edge;
  exports.Ports = Ports;
  exports.Checkpoint = Checkpoint;
  exports.Settings = Settings;
  exports.READ_ONLY = READ_ONLY;
  exports.READ_WRITE = READ_WRITE;
  exports.InteractionModes = InteractionModes;
  exports.convert = convert;

  // basic //////////////////////////////////////////////////////////////////////////////////////////////////

  function coords(jsCoords) {
    return Coords(jsCoords);
  }

  // edge types /////////////////////////////////////////////////////////////////////////////////////////////

  function types(jsTypes) {
    return Map(jsTypes).map(type);
  }

  function type(jsType) {
    return Type(jsType);
  }

  // model ///////////////////////////////////////////////////////////////////////

  function graph(jsGraph) {
    return Graph({
      edges: Map(jsGraph.edges).mapEntries(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var k = _ref2[0];
        var v = _ref2[1];
        return [k, edge(v, k)];
      }),
      vertices: Map(jsGraph.vertices).mapEntries(function (_ref3) {
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
      inbound: List(jsPorts.inbound.map(port(IN))),
      outbound: List(jsPorts.outbound.map(port(OUT)))
    });
  }

  function port(direction) {
    return function (jsPort) {
      return Port((0, _utilOptions)(jsPort, { direction: direction }));
    };
  }

  // layout /////////////////////////////////////////////////////////////////////////////////////////////////

  function layout(jsLayout) {
    return Layout({
      edges: Map(jsLayout.edges).map(coords),
      vertices: Map(jsLayout.vertices).map(coords)
    });
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9tb2RlbC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7TUFLUSxHQUFHLGNBQUgsR0FBRztNQUFFLElBQUksY0FBSixJQUFJO01BQUUsTUFBTSxjQUFOLE1BQU07OztBQUd6QixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQzs7O0FBRy9ELE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQztBQUNoQyxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUM7QUFDOUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzFELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBRSxTQUFTLEVBQUUsVUFBVSxDQUFFLENBQUM7OztBQUcxRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7O0FBRXpELE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDO0FBQ2hDLGNBQVUsRUFBRSxJQUFJO0FBQ2hCLFdBQU8sRUFBRSxHQUFHLEVBQUU7QUFDZCxZQUFRLEVBQUUsR0FBRyxFQUFFO0dBQ2hCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQzs7QUFFekIsTUFB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Q3RELENBQUMsQ0FBQztHQUNKOztBQUVELFdBQVMsSUFBSSxDQUFFLFNBQVMsRUFBRztBQUN6QixXQUFPLFVBQUEsTUFBTTthQUFJLElBQUksQ0FBRSxrQkFBUyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUUsQ0FBRTtLQUFBLENBQUM7R0FDdEU7Ozs7QUFLRCxXQUFTLE1BQU0sQ0FBRSxRQUFRLEVBQUc7QUFDMUIsV0FBTyxNQUFNLENBQUM7QUFDWixXQUFLLEVBQUUsR0FBRyxDQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUUsQ0FBQyxHQUFHLENBQUUsTUFBTSxDQUFFO0FBQzFDLGNBQVEsRUFBRSxHQUFHLENBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBRSxDQUFDLEdBQUcsQ0FBRSxNQUFNLENBQUU7S0FDakQsQ0FBQyxDQUFDO0dBQ0oiLCJmaWxlIjoiL1VzZXJzL21pY2hhZWwvd29yay9naXRodWIuY29tL3gxQi9uYmUtcmVhY3Qvc3JjL21vZGVsLmpzeCIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCAqIGFzIG9wdGlvbnMgZnJvbSAnLi91dGlsL29wdGlvbnMnO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCB7IE1hcCwgTGlzdCwgUmVjb3JkIH0gPSBJbW11dGFibGU7XG5cbi8vIGRpbWVuc2lvbnMgZm9yIGVhY2ggbm9kZSwgcGx1cyBub2RlLWludGVybmFsIHBvc2l0aW9ucyBvZiB2ZXJ0ZXgtcG9ydHNcbmNvbnN0IE1lYXN1cmVtZW50cyA9IFJlY29yZCh7IHZlcnRpY2VzOiBNYXAoKSwgZWRnZXM6IE1hcCgpIH0pO1xuXG4vLyBTZXR0aW5ncywgdG8gYmUgdXNlZCBieSB0aGUgZW1iZWRkaW5nIGFwcGxpY2F0aW9uXG5jb25zdCBSRUFEX1dSSVRFID0gJ3JlYWQvd3JpdGUnO1xuY29uc3QgUkVBRF9PTkxZID0gJ3JlYWQtb25seSc7XG5jb25zdCBTZXR0aW5ncyA9IFJlY29yZCh7IG1vZGU6IFJFQURfV1JJVEUgfSwgJ1NldHRpbmdzJyk7XG5jb25zdCBJbnRlcmFjdGlvbk1vZGVzID0gTGlzdC5vZiggUkVBRF9PTkxZLCBSRUFEX1dSSVRFICk7XG5cbi8vIFR5cGVzIHJlbGF0ZWQgdG8gbGF5b3V0L21lYXN1cmVtZW50c1xuY29uc3QgQ29vcmRzID0gUmVjb3JkKHsgbGVmdDogMCwgdG9wOiAwIH0pO1xuY29uc3QgRGltZW5zaW9ucyA9IFJlY29yZCh7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfSk7XG5jb25zdCBMYXlvdXQgPSBSZWNvcmQoeyBlZGdlczogTWFwKCksIHZlcnRpY2VzOiBNYXAoKSB9KTtcblxuY29uc3QgVmVydGV4TWVhc3VyZW1lbnRzID0gUmVjb3JkKHtcbiAgZGltZW5zaW9uczogbnVsbCxcbiAgaW5ib3VuZDogTWFwKCksXG4gIG91dGJvdW5kOiBNYXAoKVxufSwgJ1ZlcnRleE1lYXN1cmVtZW50cycpO1xuXG5jb25zdCBFZGdlTWVhc3VyZW1lbnRzID0gUmVjb3JkKHtcbiAgZGltZW5zaW9uczogbnVsbFxufSwgJ0VkZ2VNZWFzdXJlbWVudHMnKTtcblxuXG4vLyBBY3R1YWwgbW9kZWxcbmNvbnN0IEdyYXBoID0gUmVjb3JkKHsgZWRnZXM6IE1hcCgpLCB2ZXJ0aWNlczogTWFwKCkgfSk7XG5jb25zdCBQb3J0ID0gUmVjb3JkKHsgbGFiZWw6ICcnLCBkaXJlY3Rpb246IG51bGwsIHR5cGU6IG51bGwsIGlkOiBudWxsLCBlZGdlSWQ6IG51bGwgfSk7XG5jb25zdCBQb3J0cyA9IFJlY29yZCh7IGluYm91bmQ6IExpc3QoKSwgb3V0Ym91bmQ6IExpc3QoKSB9KTtcbmNvbnN0IFZlcnRleCA9IFJlY29yZCh7IGlkOiBudWxsLCBsYWJlbDogJycsIHBvcnRzOiBQb3J0cygpIH0pO1xuY29uc3QgRWRnZSA9IFJlY29yZCh7IGlkOiBudWxsLCBsYWJlbDogJycsIHR5cGU6IG51bGwgfSk7XG5jb25zdCBUeXBlID0gUmVjb3JkKHsgaGlkZGVuOiBmYWxzZSwgbGFiZWw6ICcnLCBvd25pbmdQb3J0OiBudWxsIH0pO1xuXG5jb25zdCBJTiA9ICdpbmJvdW5kJztcbmNvbnN0IE9VVCA9ICdvdXRib3VuZCc7XG5jb25zdCBEaXJlY3Rpb25zID0gTGlzdC5vZiggSU4sIE9VVCApO1xuXG5cbi8vIEhpc3RvcnkgU3R1ZmY6XG5jb25zdCBDaGVja3BvaW50ID0gUmVjb3JkKHtcbiAgYmVmb3JlOiBudWxsLFxuICBhdDogbnVsbFxufSwgJ0NoZWNrcG9pbnQnKTtcblxuXG5jb25zdCBjb252ZXJ0ID0ge1xuICBncmFwaDogZ3JhcGgsXG4gIGxheW91dDogbGF5b3V0LFxuICB0eXBlczogdHlwZXNcbn07XG5cbmV4cG9ydCB7XG4gIENvb3JkcyxcbiAgRGltZW5zaW9ucyxcbiAgTGF5b3V0LFxuICBNZWFzdXJlbWVudHMsXG4gIFZlcnRleE1lYXN1cmVtZW50cyxcbiAgRWRnZU1lYXN1cmVtZW50cyxcbiAgSU4sXG4gIE9VVCxcbiAgRGlyZWN0aW9ucyxcbiAgR3JhcGgsXG4gIEVkZ2UsXG4gIFBvcnRzLFxuICBDaGVja3BvaW50LFxuXG4gIFNldHRpbmdzLFxuICBSRUFEX09OTFksXG4gIFJFQURfV1JJVEUsXG4gIEludGVyYWN0aW9uTW9kZXMsXG5cbiAgY29udmVydFxufTtcblxuLy8gYmFzaWMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gY29vcmRzKCBqc0Nvb3JkcyApIHtcbiAgcmV0dXJuIENvb3JkcygganNDb29yZHMgKTtcbn1cblxuXG4vLyBlZGdlIHR5cGVzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5mdW5jdGlvbiB0eXBlcygganNUeXBlcyApIHtcbiAgcmV0dXJuIE1hcCgganNUeXBlcyApLm1hcCggdHlwZSApO1xufVxuXG5mdW5jdGlvbiB0eXBlKCBqc1R5cGUgKSB7XG4gIHJldHVybiBUeXBlKCBqc1R5cGUgKTtcbn1cblxuXG4vLyBtb2RlbCAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5mdW5jdGlvbiBncmFwaCgganNHcmFwaCApIHtcbiAgcmV0dXJuIEdyYXBoKHtcbiAgICBlZGdlczogTWFwKCBqc0dyYXBoLmVkZ2VzICkubWFwRW50cmllcyggKFsgaywgdiBdKSA9PiBbIGssIGVkZ2UodiwgaykgXSApLFxuICAgIHZlcnRpY2VzOiBNYXAoIGpzR3JhcGgudmVydGljZXMgKS5tYXBFbnRyaWVzKCAoWyBrLCB2IF0pID0+IFsgaywgdmVydGV4KHYsIGspIF0gKVxuICB9KTtcbn1cblxuZnVuY3Rpb24gdmVydGV4KCBqc1ZlcnRleCwgaWQgKSB7XG4gIHJldHVybiBuZXcgVmVydGV4KFxuICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICBPYmplY3QuYXNzaWduKCB7IGlkOiBpZCB9LCBqc1ZlcnRleCApLFxuICAgICAgeyBwb3J0czogcG9ydHMoIGpzVmVydGV4LnBvcnRzICkgfVxuICAgIClcbiAgKTtcbn1cblxuZnVuY3Rpb24gZWRnZSgganNFZGdlLCBpZCApIHtcbiAgcmV0dXJuIEVkZ2UoIGlkID8gT2JqZWN0LmFzc2lnbiggeyBpZDogaWQgfSwganNFZGdlICkgOiBqc0VkZ2UgKTtcbn1cblxuZnVuY3Rpb24gcG9ydHMoIGpzUG9ydHMgKSB7XG4gIHJldHVybiBQb3J0cyh7XG4gICAgaW5ib3VuZDogTGlzdCgganNQb3J0cy5pbmJvdW5kLm1hcCggcG9ydCggSU4gKSApICksXG4gICAgb3V0Ym91bmQ6IExpc3QoIGpzUG9ydHMub3V0Ym91bmQubWFwKCBwb3J0KCBPVVQgKSApIClcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBvcnQoIGRpcmVjdGlvbiApIHtcbiAgcmV0dXJuIGpzUG9ydCA9PiBQb3J0KCBvcHRpb25zKCBqc1BvcnQsIHsgZGlyZWN0aW9uOiBkaXJlY3Rpb24gfSApICk7XG59XG5cblxuLy8gbGF5b3V0IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gbGF5b3V0KCBqc0xheW91dCApIHtcbiAgcmV0dXJuIExheW91dCh7XG4gICAgZWRnZXM6IE1hcCgganNMYXlvdXQuZWRnZXMgKS5tYXAoIGNvb3JkcyApLFxuICAgIHZlcnRpY2VzOiBNYXAoIGpzTGF5b3V0LnZlcnRpY2VzICkubWFwKCBjb29yZHMgKVxuICB9KTtcbn1cbiJdfQ==