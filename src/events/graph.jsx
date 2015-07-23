import { Record } from 'immutable';


const Connectable = Record({
  edgeId: null,
  type: null,
  vertexId: null,
  portId: null,
  direction: null
}, 'Connectable');

const PortDisconnected = Record({
  vertex: null,
  port: null,
  type: () => PortDisconnected
}, 'PortDisconnected');


const PortConnected = Record({
  from: Connectable(),
  to: Connectable(),
  type: () => PortConnected
}, 'PortConnected');


export default {
  PortDisconnected,
  PortConnected,

  Connectable
};
