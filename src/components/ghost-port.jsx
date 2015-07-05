import * as React from 'react';

import { IN, OUT, Dimensions }  from '../model';
import { Rendered }  from '../events';
import * as shallowEqual from '../util/shallow-equal';
import * as pathing from '../util/pathing';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const GhostPort = React.createClass( {

   render() {
      const { dragInfo } = this.props
      if( !dragInfo ) {
         return <g />
      }

      const { vertex, port, portCoords, mouseCoords } = dragInfo;

      const classes = [ 'nbe-link', 'nbe-ghost', 'nbe-type-' + port.type ].join( ' ' );

      const portBox = rect( portCoords, Dimensions({width: 10, height: 10}) );
      const mouseBox = rect( mouseCoords, Dimensions({width: 1, height: 1}) );

      const [ fromCoords, toCoords ] = port.direction === OUT ?
         [ portCoords, mouseCoords ] :
         [ mouseCoords, portCoords ];

      const [ fromBox, toBox ] = port.direction === OUT ?
         [ portBox, mouseBox ] :
         [ mouseBox, portBox ];

      const data = pathing.cubic( xy( fromCoords ), xy( toCoords ), 1, [ fromBox, toBox ] );

      return <path className={classes} d={data} />
   }

} );

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function xy( coord ) {
   return [ coord.left, coord.top ];
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function rect( coords, dimensions ) {
   return {
      left: coords.left,
      top: coords.top,
      right: coords.left + dimensions.width,
      bottom: coords.top + dimensions.height
   };
}

export default GhostPort;
