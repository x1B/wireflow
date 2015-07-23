import * as React from 'react';

import { IN, OUT } from '../model';
import { Rendered } from '../events/metrics';
import count from '../util/metrics';
import * as pathing from '../util/pathing';
import * as shallowEqual from '../util/shallow-equal';


const Link = React.createClass({

  render() {

    const {
      fromPort,
      toPort,
      fromMeasurements,
      toMeasurements
    } = this.props;

    const type = ( fromPort || toPort ).type;

    const classes = [ 'nbe-link', 'nbe-type-' + type ].join( ' ' );
    count( Rendered( { what: Link.displayName } ) );

    if( !fromMeasurements || !toMeasurements ) {
      // not measured (yet), e.g. just created
      return <path />;
    }

    const fromCoords = xy( fromMeasurements, fromPort, OUT );
    const toCoords = xy( toMeasurements, toPort, IN );

    const boxes = [ rect( fromMeasurements ), rect( toMeasurements ) ];
    const data = pathing.cubic( fromCoords, toCoords, 1, boxes );

    return (
      <path className={classes} d={data} />
    );
  },


  shouldComponentUpdate( nextProps ) {
    return !shallowEqual( nextProps, this.props );
  }

});

export default Link;


function xy( measurements, port, direction ) {
  if( port ) {
    const { box: { coords: { left, top } } } = measurements;
    const portOffset = measurements[ direction ].get( port.id );
    return [ left + portOffset.left, top + portOffset.top ];
  }

  // edge:
  const { center: { left, top} } = measurements;
  return [ left, top ];
}


function rect( measurements ) {
  const { box: { coords, dimensions } } = measurements;
  return {
    left: coords.left,
    top: coords.top,
    right: coords.left + dimensions.width,
    bottom: coords.top + dimensions.height
  };
}
