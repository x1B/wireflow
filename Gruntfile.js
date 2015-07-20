
/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * www.laxarjs.org
 */
/*global module */
module.exports = function( grunt ) {

   grunt.initConfig( {
     connect: {
       develop: {
         options: { keepalive: true }
       }
     }
   } );


   grunt.loadNpmTasks( 'grunt-contrib-connect' );

   grunt.registerTask( 'start', [ 'connect:develop' ] );

};
