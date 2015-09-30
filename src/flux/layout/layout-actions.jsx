import { Record } from 'immutable';

import { Coords, VertexMeasurements, EdgeMeasurements } from './layout-model';
import { payload } from '../graph/graph-actions';


// event payload used during port drag/drop
const PortDragInfo = Record({
  vertex: null,
  port: null,
  portCoords: null,
  mouseCoords: null
}, 'PortDragInfo');


const MeasurePort = Record({
  port: null,
  center: Coords(),
  type: () => MeasurePort
}, 'MeasurePort');

const MeasureVertex = Record({
  vertex: null,
  measurements: VertexMeasurements(),
  type: () => MeasureVertex
}, 'MeasureVertex');

const MeasureEdge = Record({
  edge: null,
  measurements: EdgeMeasurements(),
  type: () => MeasureEdge
}, 'MeasureEdge');


const DragPort = Record({
  info: PortDragInfo(),
  type: () => DragPort
}, 'DragPort');

const MoveEdge = Record({
  edge: null,
  to: Coords(),
  type: () => MoveEdge
}, 'MoveEdge');

const MoveVertex = Record({
  vertex: null,
  to: Coords(),
  type: () => MoveVertex
}, 'MoveVertex');


const HandleEdgeInserted = Record({
  edge: null,
  from: payload.Connectable(),
  to: payload.Connectable(),
  type: () => HandleEdgeInserted
}, 'HandleEdgeInserted');

const AutoLayout = Record({ type: () => AutoLayout }, 'AutoLayout');


export default {
  MeasurePort,
  MeasureVertex,
  MeasureEdge,
  MoveEdge,
  MoveVertex,
  DragPort,
  HandleEdgeInserted,
  AutoLayout,

  payload: {
    PortDragInfo,
    EdgeMeasurements,
    VertexMeasurements
  }
};
