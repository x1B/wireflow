import { Record } from 'immutable';

import { Connectable } from '../graph/graph-model';
import {
  Coords, VertexMeasurements, EdgeMeasurements, PortDragInfo
} from './layout-model';

const HandleEdgeInserted = Record({
  edge: null,
  from: Connectable(),
  to: Connectable(),
  type: () => HandleEdgeInserted
}, 'HandleEdgeInserted');

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

const AutoLayout = Record({
  type: () => AutoLayout
}, 'AutoLayout');


export default {
  MeasurePort,
  MeasureVertex,
  MeasureEdge,
  MoveEdge,
  MoveVertex,
  DragPort,
  HandleEdgeInserted,
  AutoLayout
};
