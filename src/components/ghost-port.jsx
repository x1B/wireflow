import * as React from 'react';

import { OUT, Dimensions } from '../model';
import * as pathing from '../util/pathing';


const GhostPort = React.createClass({

  render() {
    const { dragInfo } = this.props;
    if( !dragInfo ) {
      return <g />;
    }

    const { port, portCoords, mouseCoords } = dragInfo;
    const portBox = rect( portCoords, Dimensions({ width: 10, height: 10 }) );
    const mouseBox = rect( mouseCoords, Dimensions({ width: 1, height: 1 }) );

    const [ fromCoords, toCoords ] = port.direction === OUT ?
      [ portCoords, mouseCoords ] :
      [ mouseCoords, portCoords ];

    const [ fromBox, toBox ] = port.direction === OUT ?
      [ portBox, mouseBox ] :
      [ mouseBox, portBox ];

    const data = pathing.cubic(
      xy(fromCoords), xy(toCoords), 1, [ fromBox, toBox ]
    );

    const classes = `nbe-link nbe-ghost nbe-type-${port.type}`;
    return <path className={classes} d={data} />;
  }

});


function xy( coord ) {
  return [ coord.left, coord.top ];
}


function rect( coords, dimensions ) {
  return {
    left: coords.left,
    top: coords.top,
    right: coords.left + dimensions.width,
    bottom: coords.top + dimensions.height
  };
}

export default GhostPort;
