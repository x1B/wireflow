define( [
   'immutable',
   './model'
], function( Immutable, model ) {

   const { Map, List, Record } = Immutable;

   const { Coords, Dimensions, Box } = model;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const Rendered = Record( {
      what: null,
      type: () => Rendered
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Layout Measurements

   const PortMeasured = Record( {
      port: null,
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
   // Layout Manipulation

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

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Model Manipulation

   const PortDisconnected = Record( {
      vertex: null,
      port: null,
      type: () => PortDisconnected
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   // Communication of internal state changes

   const GraphModified = Record( {
      graph: null,
      type: () => GraphModified
   } );

   const LayoutModified = Record( {
      layout: null,
      type: () => LayoutModified
   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return {
      Rendered,

      PortMeasured,
      VertexMeasured,
      EdgeMeasured,

      EdgeMoved,
      VertexMoved,

      PortDisconnected,
      LayoutModified,
      GraphModified,
      model: {
         EdgeMeasurements,
         VertexMeasurements
      }
   };

} );
