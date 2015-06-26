define( [ 'immutable', './model' ], function( Immutable, model ) {

   const { Map, List, Record } = Immutable;

   const { Coords } = model;

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
      EdgeMoved,
      VertexMoved
   };

} );
