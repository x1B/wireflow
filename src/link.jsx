define( [ 'react', './util/pathing' ], function( React, pathing ) {
   'use strict';

   const Link = React.createClass( {

      render() {

         const { type, from, to } = this.props;

         const classes = [ 'nbe-link', 'nbe-type-' + type ].join( ' ' );

         const from_ = [ from.left, from.top ];
         const to_ = [ to.left, to.top ];

         // TODO: Boxes & Direction

         const fromBox = {
            left: from.left - 15,
            top: from.top - 15,
            right: from.left + 30,
            bottom: from.top + 30
         };
         const toBox = {
            left: to.left - 15,
            top: to.top - 15,
            right: to.left + 30,
            bottom: to.top + 30
         };

         const data = pathing.cubic( from_, to_, [ 1, -1 ], 1, [ fromBox, toBox ] );

         return (
            <path className={classes} d={data} />
         );
      }

   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return Link;

} );
