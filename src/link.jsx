define( [
   'react',
   './util/pathing',
   './events',
   './util/shallow-equal'
], function( React, pathing, events, shallowEqual ) {
   'use strict';

   const { Rendered } = events;

   const Link = React.createClass( {

      render() {

         const { type, from, to, eventHandler } = this.props;
         eventHandler( Rendered( { what: Link.displayName } ) );

         const classes = [ 'nbe-link', 'nbe-type-' + type ].join( ' ' );

         const fromCoords = [ from.center.left, from.center.top ];
         const toCoords = [ to.center.left, to.center.top ];
         const fromBox = toRect( from.box );
         const toBox = toRect( to.box );

         const data = pathing.cubic( fromCoords, toCoords, [ 1, -1 ], 1, [ fromBox, toBox ] );

         return (
            <path className={classes} d={data} />
         );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      // :TODO: figure out how to ensure immutability here
      shouldComponentUpdate( nextProps, nextState ) {
         return !shallowEqual( nextState, this.state ) || !shallowEqual( nextProps, this.props );
      }

   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function toRect( box ) {
      return {
         left: box.coords.left,
         top: box.coords.top,
         right: box.coords.left + box.dimensions.width,
         bottom: box.coords.top + box.dimensions.height
      };
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return Link;

} );
