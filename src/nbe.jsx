var IN = 'inbound', OUT = 'outbound';

var { Map, List, Record } = Immutable;


/**
 * Create NBE model values from their JSON representation.
 */
var nbe = (function() {

   var Coords = Record( { left: 0, top: 0 } );
   var Dimensions = Record( { width: 0, height: 0 } );

   var Graph = Record( { edges: Map(), vertices: Map() } );
   var Port = Record( { label: '', type: null, id: null, edgeId: null } );
   var Ports = Record( { inbound: List(), outbound: List() } );
   var Vertex = Record( { label: '', ports: Ports() } );
   var Edge = Record( { label: '', type: null } );
   var Type = Record( { hidden: false, label: '', simple: false, maxSources: null, maxDestinations: null } );
   var Layout = Record( { edges: Map(), vertices: Map() } );

   return {
      Graph,
      Layout,
      Coords,
      Dimensions,
      convert: {
         graph: graph,
         layout: layout,
         types: types
      }
   };


   // basic //////////////////////////////////////////////////////////////////////////////////////////////////

   function coords( jsCoords ) {
      return new Coords( jsCoords );
   }


   // edge types /////////////////////////////////////////////////////////////////////////////////////////////

   function types( jsTypes ) {
      return Map( jsTypes ).map( type );
   }

   function type( jsType ) {
      return new Type( jsType );
   }


   // model //////////////////////////////////////////////////////////////////////////////////////////////////


   function graph( jsGraph ) {
      return new Graph( {
         edges: Map( jsGraph.edges ).map( edge ),
         vertices: Map( jsGraph.vertices ).map( vertex )
      } );
   }

   function vertex( jsVertex ) {
      return new Vertex( {
         label: jsVertex.label,
         ports: ports( jsVertex.ports )
      } );
   }

   function edge( jsEdge ) {
      return new Edge( jsEdge );
   }

   function ports( jsPorts ) {
      return new Ports( {
         inbound: List( jsPorts.inbound.map( port ) ),
         outbound: List( jsPorts.outbound.map( port ) )
      } );
   }

   function port( jsPort ) {
      return new Port( jsPort );
   }


   // layout /////////////////////////////////////////////////////////////////////////////////////////////////

   function layout( jsLayout ) {
      return new Layout( {
         edges: Map( jsLayout.edges ).map( coords ),
         vertices: Map( jsLayout.vertices ).map( coords )
      } );
   }

}() );
