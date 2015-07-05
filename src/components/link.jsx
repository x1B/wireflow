import * as React from 'react';

import { IN, OUT }  from '../model';
import { Rendered }  from '../events';
import * as pathing from '../util/pathing';
import * as shallowEqual from '../util/shallow-equal';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Link = React.createClass( {

   render() {

      const {
         fromPort,
         toPort,
         fromMeasurements,
         toMeasurements,
         eventHandler
      } = this.props;

      const type = ( fromPort || toPort ).type;

      const classes = [ 'nbe-link', 'nbe-type-' + type ].join( ' ' );
      eventHandler( Rendered( { what: Link.displayName } ) );

      const fromCoords = coords( fromMeasurements, fromPort, OUT );
      const toCoords = coords( toMeasurements, toPort, IN );

      const boxes = [ rect( fromMeasurements ), rect( toMeasurements ) ];
      const data = pathing.cubic( fromCoords, toCoords, 1, boxes );

      return (
         <path className={classes} d={data} />
      );
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   shouldComponentUpdate( nextProps, nextState ) {
      return !shallowEqual( nextProps, this.props );
   }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function coords( measurements, port, direction ) {
   if( port ) {
      const { box: { coords: { left, top }, coords: { width, height } } } = measurements;
      const portOffset = measurements[ direction ].get( port.id );
      return [ left + portOffset.left, top + portOffset.top ];
   }

   // edge:
   const { center: { left, top} } = measurements;
   return [ left, top ];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function rect( measurements ) {
   const { box: { coords, dimensions } } = measurements;
   return {
      left: coords.left,
      top: coords.top,
      right: coords.left + dimensions.width,
      bottom: coords.top + dimensions.height
   };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default Link;
