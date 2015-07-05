define( [ '../polyfill/object-assign' ], function() {

   var assign = Object.assign;

   return function( ...maps ) {
      maps.unshift( {} );
      return assign.apply( Object, maps );
   }

} );
