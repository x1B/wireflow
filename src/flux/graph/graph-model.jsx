import { Map, List, Record } from 'immutable';
import options from '../../util/options';

const Graph = Record({
  edges: Map(),
  vertices: Map()
});

const Port = Record({
  id: null,
  label: '',
  direction: null,
  type: null,
  edgeId: null
});

const Ports = Record({
  inbound: List(),
  outbound: List()
});

const Vertex = Record({
  id: null,
  label: '',
  kind: 'DEFAULT',
  ports: Ports()
});

const Edge = Record({
  id: null,
  label: '',
  type: null
});

const Type = Record({
  label: '',
  owningPort: null,
  hidden: false
});

const Connectable = Record({
  edgeId: null,
  type: null,
  vertexId: null,
  portId: null,
  direction: null
}, 'Connectable');

const IN = 'inbound';
const OUT = 'outbound';
const Directions = List.of( IN, OUT );


// convert from plain JS structures:

function graph( jsGraph ) {
  const jsEdges = Map( jsGraph.edges );
  const jsVertices = Map( jsGraph.vertices );
  return Graph({
    edges: jsEdges.mapEntries( ([ k, v ]) => [ k, edge(v, k) ] ),
    vertices: jsVertices.mapEntries( ([ k, v ]) => [ k, vertex(v, k) ] )
  });
}

function vertex( jsVertex, id ) {
  return new Vertex(
    Object.assign(
      Object.assign( { id: id }, jsVertex ),
      { ports: ports( jsVertex.ports ) }
    )
  );
}

function edge( jsEdge, id ) {
  return Edge( id ? Object.assign( { id: id }, jsEdge ) : jsEdge );
}

function ports( jsPorts ) {
  return Ports({
    inbound: List( jsPorts.inbound.map( port( IN ) ) ),
    outbound: List( jsPorts.outbound.map( port( OUT ) ) )
  });
}

function port( direction ) {
  return jsPort => Port( options( jsPort, { direction: direction } ) );
}

function types( jsTypes ) {
  return Map( jsTypes ).map( type );
}

function type( jsType ) {
  return Type( jsType );
}


export default {
  Type,

  Graph,
  Vertex,
  Edge,
  Ports,
  Port,
  Directions,
  IN,
  OUT,

  Connectable,

  convert: {
    types,
    type,

    graph,
    edge,
    vertex,
    ports,
    port
  }
};
