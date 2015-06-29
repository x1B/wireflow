define( [ 'react', './util/pathing' ], function( React, pathing ) {
   'use strict';

   const Link = React.createClass( {

      render() {

         const { type, from, to } = this.props;

         const classes = [ 'nbe-link', 'nbe-type-' + type ].join( ' ' );

         const fromCoords = [ from.center.left, from.center.top ];
         const toCoords = [ to.center.left, to.center.top ];

         const fromBox = toRect( from.box );
         const toBox = toRect( to.box );


         // :TODO: simplify call:
         const data = pathing.cubic( fromCoords, toCoords, [ 1, -1 ], 1, [ fromBox, toBox ] );

         return (
            <path className={classes} d={data} />
         );
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
