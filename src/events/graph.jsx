import { Record } from 'immutable';


const Connectable = Record({
  vertexId: null,
  portId: null,
  edgeId: null
});

const PortDisconnected = Record({
  vertex: null,
  port: null,
  type: () => PortDisconnected
});

const PortConnected = Record({
  vertex: null,
  port: null,
  to: Connectable(),
  type: () => PortConnected
});

const GraphModified = Record({
  graph: null,
  type: () => GraphModified
});


export default {
  PortDisconnected,
  PortConnected,

  Connectable
};
