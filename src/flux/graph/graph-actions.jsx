import { Record } from 'immutable';


const DisconnectPort = Record({
  vertex: null,
  port: null,
  type: () => DisconnectPort
}, 'DisconnectPort');

const ConnectPort = Record({
  from: null,
  to: null,
  type: () => ConnectPort
}, 'ConnectPort');

const RemoveVertex = Record({
  vertexId: null,
  type: () => RemoveVertex
}, 'RemoveVertex');

const RemoveEdge = Record({
  edgeId: null,
  type: () => RemoveEdge
}, 'RemoveEdge');


const Connectable = Record({
  edgeId: null,
  type: null,
  vertexId: null,
  portId: null,
  direction: null
}, 'Connectable');


export default {
  DisconnectPort,
  ConnectPort,
  RemoveVertex,
  RemoveEdge,

  payload: {
    Connectable
  }
};