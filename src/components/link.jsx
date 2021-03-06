import React from 'react';

import count from '../util/metrics';
import pathing from '../util/pathing';
import shallowEqual from '../util/shallow-equal';
import settings from '../util/settings';

import { IN, OUT } from '../flux/graph/graph-model';


const { layout: { edgeOffset } } = settings;

const Link = React.createClass({

  render() {
    const {
      fromPort,
      toPort,
      fromLayout,
      toLayout,
      fromMeasurements,
      toMeasurements,
      isSelected
    } = this.props;

    const type = ( fromPort || toPort ).type;

    const classes = [ 'nbe-link', 'nbe-type-' + type, isSelected ? 'nbe-selected' : '' ].join( ' ' );
    count({ what: Link.displayName });

    if( !fromMeasurements || !toMeasurements ) {
      // not measured (yet), e.g. just created
      return <path />;
    }

    const fromCoords = xy( fromLayout, fromMeasurements, fromPort, OUT );
    const toCoords = xy( toLayout, toMeasurements, toPort, IN );

    const boxes = [
      rect( fromLayout, fromMeasurements ),
      rect( toLayout, toMeasurements )
    ];

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


function xy( coords, measurements, port, direction ) {
  if( port ) {
    const { left, top } = coords;
    const portOffset = measurements[ direction ].get( port.id );
    if( !portOffset ) {
      // :TODO: implement smarter measurements.
      return [ left, top ];
    }
    return [ left + portOffset.left, top + portOffset.top ];
  }

  // edge:
  const { left, top } = coords;
  return [ left + edgeOffset, top + edgeOffset ];
}


function rect( coords, measurements ) {
  const { left, top } = coords;
  const { dimensions: { width, height} } = measurements;
  return {
    left: left,
    top: top,
    right: left + width,
    bottom: top + height
  };
}
