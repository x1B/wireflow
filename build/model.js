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
//# sourceMappingURL=data:application/json;base64,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QVMsRUFBRztBQUN6QixXQUFPLFVBQUEsTUFBTTthQUFJLElBQUksQ0FBRSxrQkFBUyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUUsQ0FBRTtLQUFBLENBQUM7R0FDdEU7Ozs7QUFLRCxXQUFTLE1BQU0sQ0FBRSxRQUFRLEVBQUc7QUFDMUIsV0FBTyxNQUFNLENBQUM7QUFDWixXQUFLLEVBQUUsR0FBRyxDQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUUsQ0FBQyxHQUFHLENBQUUsTUFBTSxDQUFFO0FBQzFDLGNBQVEsRUFBRSxHQUFHLENBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBRSxDQUFDLEdBQUcsQ0FBRSxNQUFNLENBQUU7S0FDakQsQ0FBQyxDQUFDO0dBQ0oiLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSW1tdXRhYmxlIGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4vdXRpbC9vcHRpb25zJztcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY29uc3QgeyBNYXAsIExpc3QsIFJlY29yZCB9ID0gSW1tdXRhYmxlO1xuXG4vLyBkaW1lbnNpb25zIGZvciBlYWNoIG5vZGUsIHBsdXMgbm9kZS1pbnRlcm5hbCBwb3NpdGlvbnMgb2YgdmVydGV4LXBvcnRzXG5jb25zdCBNZWFzdXJlbWVudHMgPSBSZWNvcmQoeyB2ZXJ0aWNlczogTWFwKCksIGVkZ2VzOiBNYXAoKSB9KTtcblxuLy8gU2V0dGluZ3MsIHRvIGJlIHVzZWQgYnkgdGhlIGVtYmVkZGluZyBhcHBsaWNhdGlvblxuY29uc3QgUkVBRF9XUklURSA9ICdyZWFkL3dyaXRlJztcbmNvbnN0IFJFQURfT05MWSA9ICdyZWFkLW9ubHknO1xuY29uc3QgU2V0dGluZ3MgPSBSZWNvcmQoeyBtb2RlOiBSRUFEX1dSSVRFIH0sICdTZXR0aW5ncycpO1xuY29uc3QgSW50ZXJhY3Rpb25Nb2RlcyA9IExpc3Qub2YoIFJFQURfT05MWSwgUkVBRF9XUklURSApO1xuXG4vLyBUeXBlcyByZWxhdGVkIHRvIGxheW91dC9tZWFzdXJlbWVudHNcbmNvbnN0IENvb3JkcyA9IFJlY29yZCh7IGxlZnQ6IDAsIHRvcDogMCB9KTtcbmNvbnN0IERpbWVuc2lvbnMgPSBSZWNvcmQoeyB3aWR0aDogMCwgaGVpZ2h0OiAwIH0pO1xuY29uc3QgTGF5b3V0ID0gUmVjb3JkKHsgZWRnZXM6IE1hcCgpLCB2ZXJ0aWNlczogTWFwKCkgfSk7XG5cbmNvbnN0IFZlcnRleE1lYXN1cmVtZW50cyA9IFJlY29yZCh7XG4gIGRpbWVuc2lvbnM6IG51bGwsXG4gIGluYm91bmQ6IE1hcCgpLFxuICBvdXRib3VuZDogTWFwKClcbn0sICdWZXJ0ZXhNZWFzdXJlbWVudHMnKTtcblxuY29uc3QgRWRnZU1lYXN1cmVtZW50cyA9IFJlY29yZCh7XG4gIGRpbWVuc2lvbnM6IG51bGxcbn0sICdFZGdlTWVhc3VyZW1lbnRzJyk7XG5cblxuLy8gQWN0dWFsIG1vZGVsXG5jb25zdCBHcmFwaCA9IFJlY29yZCh7IGVkZ2VzOiBNYXAoKSwgdmVydGljZXM6IE1hcCgpIH0pO1xuY29uc3QgUG9ydCA9IFJlY29yZCh7IGxhYmVsOiAnJywgZGlyZWN0aW9uOiBudWxsLCB0eXBlOiBudWxsLCBpZDogbnVsbCwgZWRnZUlkOiBudWxsIH0pO1xuY29uc3QgUG9ydHMgPSBSZWNvcmQoeyBpbmJvdW5kOiBMaXN0KCksIG91dGJvdW5kOiBMaXN0KCkgfSk7XG5jb25zdCBWZXJ0ZXggPSBSZWNvcmQoeyBpZDogbnVsbCwgbGFiZWw6ICcnLCBwb3J0czogUG9ydHMoKSB9KTtcbmNvbnN0IEVkZ2UgPSBSZWNvcmQoeyBpZDogbnVsbCwgbGFiZWw6ICcnLCB0eXBlOiBudWxsIH0pO1xuY29uc3QgVHlwZSA9IFJlY29yZCh7IGhpZGRlbjogZmFsc2UsIGxhYmVsOiAnJywgb3duaW5nUG9ydDogbnVsbCB9KTtcblxuY29uc3QgSU4gPSAnaW5ib3VuZCc7XG5jb25zdCBPVVQgPSAnb3V0Ym91bmQnO1xuY29uc3QgRGlyZWN0aW9ucyA9IExpc3Qub2YoIElOLCBPVVQgKTtcblxuXG4vLyBIaXN0b3J5IFN0dWZmOlxuY29uc3QgQ2hlY2twb2ludCA9IFJlY29yZCh7XG4gIGJlZm9yZTogbnVsbCxcbiAgYXQ6IG51bGxcbn0sICdDaGVja3BvaW50Jyk7XG5cblxuY29uc3QgY29udmVydCA9IHtcbiAgZ3JhcGg6IGdyYXBoLFxuICBsYXlvdXQ6IGxheW91dCxcbiAgdHlwZXM6IHR5cGVzXG59O1xuXG5leHBvcnQge1xuICBDb29yZHMsXG4gIERpbWVuc2lvbnMsXG4gIExheW91dCxcbiAgTWVhc3VyZW1lbnRzLFxuICBWZXJ0ZXhNZWFzdXJlbWVudHMsXG4gIEVkZ2VNZWFzdXJlbWVudHMsXG4gIElOLFxuICBPVVQsXG4gIERpcmVjdGlvbnMsXG4gIEdyYXBoLFxuICBFZGdlLFxuICBQb3J0cyxcbiAgQ2hlY2twb2ludCxcblxuICBTZXR0aW5ncyxcbiAgUkVBRF9PTkxZLFxuICBSRUFEX1dSSVRFLFxuICBJbnRlcmFjdGlvbk1vZGVzLFxuXG4gIGNvbnZlcnRcbn07XG5cbi8vIGJhc2ljIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmZ1bmN0aW9uIGNvb3JkcygganNDb29yZHMgKSB7XG4gIHJldHVybiBDb29yZHMoIGpzQ29vcmRzICk7XG59XG5cblxuLy8gZWRnZSB0eXBlcyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gdHlwZXMoIGpzVHlwZXMgKSB7XG4gIHJldHVybiBNYXAoIGpzVHlwZXMgKS5tYXAoIHR5cGUgKTtcbn1cblxuZnVuY3Rpb24gdHlwZSgganNUeXBlICkge1xuICByZXR1cm4gVHlwZSgganNUeXBlICk7XG59XG5cblxuLy8gbW9kZWwgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gZ3JhcGgoIGpzR3JhcGggKSB7XG4gIHJldHVybiBHcmFwaCh7XG4gICAgZWRnZXM6IE1hcCgganNHcmFwaC5lZGdlcyApLm1hcEVudHJpZXMoIChbIGssIHYgXSkgPT4gWyBrLCBlZGdlKHYsIGspIF0gKSxcbiAgICB2ZXJ0aWNlczogTWFwKCBqc0dyYXBoLnZlcnRpY2VzICkubWFwRW50cmllcyggKFsgaywgdiBdKSA9PiBbIGssIHZlcnRleCh2LCBrKSBdIClcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHZlcnRleCgganNWZXJ0ZXgsIGlkICkge1xuICByZXR1cm4gbmV3IFZlcnRleChcbiAgICBPYmplY3QuYXNzaWduKFxuICAgICAgT2JqZWN0LmFzc2lnbiggeyBpZDogaWQgfSwganNWZXJ0ZXggKSxcbiAgICAgIHsgcG9ydHM6IHBvcnRzKCBqc1ZlcnRleC5wb3J0cyApIH1cbiAgICApXG4gICk7XG59XG5cbmZ1bmN0aW9uIGVkZ2UoIGpzRWRnZSwgaWQgKSB7XG4gIHJldHVybiBFZGdlKCBpZCA/IE9iamVjdC5hc3NpZ24oIHsgaWQ6IGlkIH0sIGpzRWRnZSApIDoganNFZGdlICk7XG59XG5cbmZ1bmN0aW9uIHBvcnRzKCBqc1BvcnRzICkge1xuICByZXR1cm4gUG9ydHMoe1xuICAgIGluYm91bmQ6IExpc3QoIGpzUG9ydHMuaW5ib3VuZC5tYXAoIHBvcnQoIElOICkgKSApLFxuICAgIG91dGJvdW5kOiBMaXN0KCBqc1BvcnRzLm91dGJvdW5kLm1hcCggcG9ydCggT1VUICkgKSApXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwb3J0KCBkaXJlY3Rpb24gKSB7XG4gIHJldHVybiBqc1BvcnQgPT4gUG9ydCggb3B0aW9ucygganNQb3J0LCB7IGRpcmVjdGlvbjogZGlyZWN0aW9uIH0gKSApO1xufVxuXG5cbi8vIGxheW91dCAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmZ1bmN0aW9uIGxheW91dCgganNMYXlvdXQgKSB7XG4gIHJldHVybiBMYXlvdXQoe1xuICAgIGVkZ2VzOiBNYXAoIGpzTGF5b3V0LmVkZ2VzICkubWFwKCBjb29yZHMgKSxcbiAgICB2ZXJ0aWNlczogTWFwKCBqc0xheW91dC52ZXJ0aWNlcyApLm1hcCggY29vcmRzIClcbiAgfSk7XG59XG4iXX0=