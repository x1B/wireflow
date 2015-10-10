/*
 * Creates a map of patches that describe the difference between two objects or arrays.
 *
 * Based on:
 * https://github.com/LaxarJS/laxar-patterns/blob/master/lib/patches.js
 *
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
function diff( fromVal, toVal ) {
   // console.log( 'From: ', fromVal, '\n  To: ', toVal ); // :TODO: DELETE ME

   var subjectType = type( fromVal );
   var targetType = type( toVal );
   if( targetType !== 'array' && targetType !== 'object' ) {
      return null;
   }

   if( targetType !== subjectType ) {
      return deepClone( toVal );
   }

   var patches = {};
   fillPatchesRecursively( fromVal, toVal, [] );
   return patches;

   function fillPatchesRecursively( fromValue, toValue, path ) {
      var key;
      for( key in toValue ) {
         if( toValue.hasOwnProperty( key ) ) {
            var val = toValue[ key ];
            var nextPath = path.concat( key );
            if( fromValue[ key ] == null && val != null ) {
               patches[ nextPath.join( '.' ) ] = deepClone( val );
            }
            else {
               if( val && typeof val === 'object' ) {
                  fillPatchesRecursively( fromValue[ key ], val, nextPath );
               }
               else if( val !== fromValue[ key ] ) {
                  patches[ nextPath.join( '.' ) ] = val;
               }
            }
         }
      }

      for( key in fromValue ) {
         if( fromValue.hasOwnProperty( key ) ) {
            if( !toValue.hasOwnProperty( key ) ) {
               patches[ path.concat( key ).join( '.' ) ] = '<delete>';
            }
         }
      }
   }
}

function deepClone( obj ) {
  return JSON.parse( JSON.stringify( obj ) );
}

function type( object ) {
   if( object === null ) {
      return 'null';
   }
   if( typeof object === 'undefined' ) {
      return 'undefined';
   }
   if( Array.isArray( object ) ) {
     return 'array';
   }
   return typeof object;
}

export default diff;
