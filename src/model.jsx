import * as Immutable from 'immutable';
import * as options from './util/options';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { Map, List, Record } = Immutable;

// Types related to layout/measurements
const Coords = Record( { left: 0, top: 0 } );
const Dimensions = Record( { width: 0, height: 0 } );
const Box = Record( { coords: Coords(), dimensions: Dimensions() } );
const Layout = Record( { edges: Map(), vertices: Map() } );

// Actual model
const Graph = Record( { edges: Map(), vertices: Map() } );
const Port = Record( { label: '', direction: null, type: null, id: null, edgeId: null } );
const Ports = Record( { inbound: List(), outbound: List() } );
const Vertex = Record( { id: null, label: '', ports: Ports() } );
const Edge = Record( { id: null, label: '', type: null } );
const Type = Record( { hidden: false, label: '', owningPort: null } );

const IN = 'inbound';
const OUT = 'outbound';
const Directions = List.of( IN, OUT );

const convert = {
   graph: graph,
   layout: layout,
   types: types,
   boxFromNode: boxFromNode
};

export {
   Coords,
   Dimensions,
   Box,
   Layout,
   IN,
   OUT,
   Directions,
   Graph,
   Ports,

   convert
};

// basic //////////////////////////////////////////////////////////////////////////////////////////////////

function coords( jsCoords ) {
   return Coords( jsCoords );
}


// edge types /////////////////////////////////////////////////////////////////////////////////////////////

function types( jsTypes ) {
   return Map( jsTypes ).map( type );
}

function type( jsType ) {
   return Type( jsType );
}


// model //////////////////////////////////////////////////////////////////////////////////////////////////

function boxFromNode( domNode ) {
   return Box( {
      coords: Coords( { left: domNode.offsetLeft, top: domNode.offsetTop } ),
      dimensions: Dimensions( { width: domNode.offsetWidth, height: domNode.offsetHeight } ),
   } );
}

function graph( jsGraph ) {
   return Graph( {
      edges: Map( jsGraph.edges ).mapEntries( ([ k, v ]) => [k, edge(v, k)] ),
      vertices:  Map( jsGraph.vertices ).mapEntries( ([ k, v ]) => [k, vertex(v, k)] )
   } );
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
   return Ports( {
      inbound: List( jsPorts.inbound.map( port( IN ) ) ),
      outbound: List( jsPorts.outbound.map( port( OUT ) ) )
   } );
}

function port( direction ) {
   return jsPort => Port( options( jsPort, { direction: direction } ) );
}


// layout /////////////////////////////////////////////////////////////////////////////////////////////////

function layout( jsLayout ) {
   return Layout( {
      edges: Map( jsLayout.edges ).map( coords ),
      vertices: Map( jsLayout.vertices ).map( coords )
   } );
}
