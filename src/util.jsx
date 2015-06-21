function keys( object ) {
   var result = [];
   for( var k in object ) {
      if( object.hasOwnProperty( k ) ) {
         result.push( k );
      }
   }
   return result;
}
