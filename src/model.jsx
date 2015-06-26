define( [ 'immutable' ], function( Immutable ) {

   const { Map, List, Record } = Immutable;

   const Coords = Record( { left: 0, top: 0 } );
   const Dimensions = Record( { width: 0, height: 0 } );

   const Graph = Record( { edges: Map(), vertices: Map() } );
   const Port = Record( { label: '', type: null, id: null, edgeId: null } );
   const Ports = Record( { inbound: List(), outbound: List() } );
   const Vertex = Record( { label: '', ports: Ports() } );
   const Edge = Record( { label: '', type: null } );
   const Type = Record( { hidden: false, label: '', simple: false, maxSources: null, maxDestinations: null } );
   const Layout = Record( { edges: Map(), vertices: Map() } );

   const IN = 'inbound';
   const OUT = 'outbound';
   const Directions = List.of( IN, OUT );

   return {
      IN,
      OUT,
      Directions,
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

} );