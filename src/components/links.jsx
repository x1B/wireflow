import * as React from 'react';

import * as Link from './link';
import { Directions, IN, OUT } from '../model';
import { Rendered } from '../actions/metrics';
import count from '../util/metrics';
import * as shallowEqual from '../util/shallow-equal';


const Links = React.createClass({

  render() {

    const {
      measurements, layout, vertices, types, eventHandler
    } = this.props;

    count( Rendered({ what: Links.displayName }) );

    return <svg>{renderLinks()}</svg>;

    function renderLinks() {
      if( measurements.vertices.isEmpty() ) {
        return [];
      }
      const vertexIds = vertices.keySeq();
      // lookup table for representing 1:n/n:1 edges as port-to-port links
      const neighborTable = createNeighborLookupByEdgeId( vertexIds.toJS() );
      return Directions.flatMap( direction =>
        vertexIds.flatMap( vertexId =>
          links( vertexId, direction, neighborTable )
        )
      );
    }

    function links( vertexId, direction, neighborTable ) {
      const vertex = vertices.get( vertexId );
      const vertexLayout = layout.vertices.get( vertexId );
      const vertexMeasurements = measurements.vertices.get( vertexId );
      const edgeLayouts = layout.edges;
      const edgeMeasurements = measurements.edges;

      // Is the link outbound wrt the current vertex?
      const isOutbound = direction === OUT;
      const otherDirection = isOutbound ? IN : OUT;

      return vertex.ports[ direction ]
        .filter( hasExactlyOneNeighbor( isOutbound ) )
        .map( port => {
          const edgeId = port.edgeId;

          const hereLayout = vertexLayout;
          const hereMeasurements = vertexMeasurements;
          const herePort = port;

          const owningPort = types.get( port.type ).owningPort;
          const [ thereLayout, thereMeasurements, therePort ] = owningPort ?
            neighborTable[ otherDirection ][ edgeId ] :
            [ edgeLayouts.get( edgeId ), edgeMeasurements.get( edgeId ), '' ];

          const [ fromLayout, toLayout ] = isOutbound ?
            [ hereLayout, thereLayout ] :
            [ thereLayout, hereLayout ];

          const [ fromMeasurements, toMeasurements ] = isOutbound ?
            [ hereMeasurements, thereMeasurements ] :
            [ thereMeasurements, hereMeasurements ];

          const [ fromPort, toPort ] = isOutbound ?
            [ herePort, therePort ] :
            [ therePort, herePort ];

          return <Link key={vertexId + '/' + port.id}
                       eventHandler={eventHandler}
                       fromPort={fromPort}
                       toPort={toPort}
                       fromLayout={fromLayout}
                       toLayout={toLayout}
                       fromMeasurements={fromMeasurements}
                       toMeasurements={toMeasurements} />;
      } );
    }

    // Make sure each link is drawn from one side only.
    function hasExactlyOneNeighbor( isOutbound ) {
      return port => {
        if( !port.edgeId ) {
          return false;
        }
        const type = types.get( port.type );
        if( !type.owningPort ) {
          return true;
        }
        return type.owningPort === ( isOutbound ? IN : OUT );
      };
    }

    function createNeighborLookupByEdgeId( vertexIds ) {
      const lut = {};
      Directions.forEach( direction => {
        const matchingMeasurements = lut[ direction ] = {};
        vertexIds.forEach( id => {
          const vertexMeasurements = measurements.vertices.get( id );
          const vertexLayout = layout.vertices.get( id );
          vertices.get( id ).ports[ direction ].forEach( port => {
            const edgeId = port.edgeId;
            if( edgeId ) {
              matchingMeasurements[ edgeId ] = [
                vertexLayout, vertexMeasurements, port
              ];
            }
          } );
        } );
      } );
      return lut;
    }

  },

  shouldComponentUpdate( nextProps ) {
    return !shallowEqual( nextProps, this.props );
  }

});

export default Links;
