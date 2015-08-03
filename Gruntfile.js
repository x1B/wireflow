
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
         options: {
           port: 3000,
           livereload: 33000
         }
       }
     },
     watch: {
       options: {
         livereload: 33000
       },
       build: {
         files: [ 'build/**/*.js' ],
         tasks: [],
         spawn: false
       }
     }
   } );



   grunt.loadNpmTasks( 'grunt-contrib-connect' );
   grunt.loadNpmTasks( 'grunt-contrib-watch' );

   grunt.registerTask( 'start', [ 'connect:develop', 'watch' ] );

};
