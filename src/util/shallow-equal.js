/**
* Source is based on React v0.13.3 shallowEqual
*
* Copyright 2013-2015, Facebook, Inc.
* Licensed under the BSD-license (contained in this directory).
*/
define( [], function() {

   return function shallowEqual( objA, objB ) {
      if (objA === objB) {
         return true;
      }

      var key;

      // Test for A's keys different from B.
      for (key in objA) {
         if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
            return false;
         }
      }

      // Test for B's keys missing from A.
      for (key in objB) {
         if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
            return false;
         }
      }

      return true;
   };

} );
