import { Map, Record } from 'immutable';
import { Coords, VertexMeasurements, EdgeMeasurements } from '../model';
import { Connectable } from './graph';


const PortDragInfo = Record({
  vertex: null,
  port: null,
  portCoords: null,
  mouseCoords: null
}, 'PortDragInfo');

const PortDragged = Record({
  info: PortDragInfo(),
  type: () => PortDragged
}, 'PortDragged');

const PortMeasured = Record({
  port: null,
  center: Coords(),
  type: () => PortMeasured
}, 'PortMeasured');

const VertexMeasured = Record({
  vertex: null,
  measurements: VertexMeasurements(),
  type: () => VertexMeasured
}, 'VertexMeasured');

const EdgeMeasured = Record({
  edge: null,
  measurements: EdgeMeasurements(),
  type: () => EdgeMeasured
}, 'EdgeMeasured');

const EdgeMoved = Record({
  edge: null,
  to: Coords(),
  type: () => EdgeMoved
}, 'EdgeMoved');

const VertexMoved = Record({
  vertex: null,
  to: Coords(),
  type: () => VertexMoved
}, 'VertexMoved');

const LayoutModified = Record({
  layout: null,
  type: () => LayoutModified
}, 'LayoutModified');

const EdgeInserted = Record({
  edge: null,
  from: Connectable(),
  to: Connectable(),
  type: () => EdgeInserted
}, 'EdgeInserted');



export default {
  PortMeasured,
  VertexMeasured,
  EdgeMeasured,

  EdgeMoved,
  VertexMoved,
  PortDragged,

  EdgeInserted,

  PortDragInfo,
  EdgeMeasurements,
  VertexMeasurements
};
