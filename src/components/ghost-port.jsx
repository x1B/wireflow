define( [
   'react',
   '../model',
   '../events',
   '../util/pathing',
   '../util/shallow-equal'
], function( React, model, events, pathing, shallowEqual ) {
   'use strict';

   const { IN, OUT } = model;
   const { Rendered } = events;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const GhostPort = React.createClass( {

      render() {

         return <path />

      }

   } );

   return GhostPort;

} );
