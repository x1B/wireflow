define( [ 'immutable' ], function( Immutable ) {

   const { Map, List, Record } = Immutable;

   const Coords = Record( { left: 0, top: 0 } );
   const Dimensions = Record( { width: 0, height: 0 } );
   const Box = Record( { coords: Coords(), dimensions: Dimensions() } );

   const Graph = Record( { edges: Map(), vertices: Map() } );
   const Port = Record( { label: '', type: null, id: null, edgeId: null } );
   const Ports = Record( { inbound: List(), outbound: List() } );
   const Vertex = Record( { id: null, label: '', ports: Ports() } );
   const Edge = Record( { id: null, label: '', type: null } );
   const Type = Record( { hidden: false, label: '', simple: false, maxSources: null, maxDestinations: null } );
   const Layout = Record( { edges: Map(), vertices: Map() } );

   const IN = 'inbound';
   const OUT = 'outbound';
   const Directions = List.of( IN, OUT );

   return {
      Coords,
      Dimensions,
      Box,
      IN,
      OUT,
      Directions,
      Graph,
      Layout,
      convert: {
         graph: graph,
         layout: layout,
         types: types,
         boxFromNode: boxFromNode
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

   function boxFromNode( domNode ) {
      return Box( {
         coords: Coords( { left: domNode.offsetLeft, top: domNode.offsetTop } ),
         dimensions: Dimensions( { width: domNode.offsetWidth, height: domNode.offsetHeight } ),
      } );
   }

   function graph( jsGraph ) {
      return new Graph( {
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
      return new Edge( id ? Object.assign( { id: id }, jsEdge ) : jsEdge );
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
