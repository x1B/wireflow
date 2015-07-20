import { Map, Record } from 'immutable';
import { Coords } from '../model';


const PortDragInfo = Record({
  vertex: null,
  port: null,
  portCoords: null,
  mouseCoords: null
});

const PortDragged = Record({
  info: PortDragInfo(),
  type: () => PortDragged
});

const PortMeasured = Record({
  port: null,
  center: Coords(),
  type: () => PortMeasured
});

const VertexMeasurements = Record({
  box: null,
  inbound: Map(),
  outbound: Map()
});

const VertexMeasured = Record({
  vertex: null,
  measurements: VertexMeasurements(),
  type: () => VertexMeasured
});

const EdgeMeasurements = Record({
  box: null,
  center: null
});

const EdgeMeasured = Record({
  edge: null,
  measurements: EdgeMeasurements(),
  type: () => EdgeMeasured
});

const EdgeMoved = Record({
  edge: null,
  to: Coords(),
  type: () => EdgeMoved
});

const VertexMoved = Record({
  vertex: null,
  to: Coords(),
  type: () => VertexMoved
});

const LayoutModified = Record({
  layout: null,
  type: () => LayoutModified
});


export default {
  PortMeasured,
  VertexMeasured,
  EdgeMeasured,

  EdgeMoved,
  VertexMoved,
  PortDragged,

  LayoutModified,

  PortDragInfo,
  EdgeMeasurements,
  VertexMeasurements
};
