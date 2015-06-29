define( [ 'immutable', './model' ], function( Immutable, model ) {

   const { Map, List, Record } = Immutable;

   const { Coords, Dimensions, Box } = model;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const Rendered = Record( {
      what: null,
      type: () => Rendered
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const PortMeasured = Record( {
      port: null,
      direction: null,
      center: Coords(),
      type: () => PortMeasured
   } );

   const VertexMeasurements = Record( {
      box: null,
      inbound: Map(),
      outbound: Map()
   } );

   const VertexMeasured = Record( {
      vertex: null,
      measurements: VertexMeasurements(),
      type: () => VertexMeasured
   } );

   const EdgeMeasurements = Record( {
      box: null,
      center: null
   } );

   const EdgeMeasured = Record( {
      edge: null,
      measurements: EdgeMeasurements,
      type: () => EdgeMeasured
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const EdgeMoved = Record( {
      edge: null,
      to: Coords(),
      type: () => EdgeMoved
   } );

   const VertexMoved = Record( {
      vertex: null,
      to: Coords(),
      type: () => VertexMoved
   } );

   return {
      Rendered,
      PortMeasured,
      VertexMeasured,
      EdgeMeasured,
      EdgeMoved,
      VertexMoved,
      model: {
         EdgeMeasurements,
         VertexMeasurements
      }
   };

} );
