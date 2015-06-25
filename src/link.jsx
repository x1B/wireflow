define( [ 'react' ], function( React ) {
   'use strict';

   var Link = React.createClass( {

      render() {

         var { type, from, to } = this.props;

         var classes = [ 'nbe-link', 'nbe-type-' + type ].join( ' ' );

         var r = Math.round;
         var data = [
            'M', r( from.left ), ',', r( from.top ), ' ',
            'L', r( to.left ), ',', r( to.top ) ].join( '' );

         return (
            <path className={classes} d={data} />
         );
      }

   } );

   return Link;

} );
