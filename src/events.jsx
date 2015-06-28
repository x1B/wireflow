define( [ 'immutable', './model' ], function( Immutable, model ) {

   const { Map, List, Record } = Immutable;

   const { Coords, Dimensions } = model;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const PortMeasured = Record( {
      port: null,
      direction: null,
      at: new Coords(),
      type: () => PortMeasured
   } );

   const VertexMeasurements = Record( {
      dimensions: null, 
      inbound: Map(),
      outbound: Map()
   } );
   const VertexMeasured = Record( {
      id: null,
      measurements: VertexMeasurements(),
      type: () => VertexMeasured
   } );

   const EdgeMeasured = Record( {
      id: null,
      at: new Coords(),
      type: () => EdgeMeasured
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const EdgeMoved = Record( {
      id: null,
      to: new Coords(),
      type: () => EdgeMoved
   } );

   const VertexMoved = Record( {
      id: null,
      to: new Coords(),
      type: () => VertexMoved
   } );

   return {
      PortMeasured,
      VertexMeasured,
      EdgeMeasured,
      EdgeMoved,
      VertexMoved,
      model: {
         VertexMeasurements
      }
   };

} );
