import * as React from 'react';
import { Record, Map } from 'immutable';

import * as Link from './link';
import { Directions, IN, OUT, Coords }  from '../model';
import { Rendered }  from '../events';
import * as shallowEqual from '../util/shallow-equal';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Links = React.createClass( {

   render() {

      const { measurements, vertices, edges, layout, types, eventHandler } = this.props;
      eventHandler( Rendered( { what: Links.displayName } ) );

      return <svg>{renderLinks()}</svg>;

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function renderLinks() {
         if( measurements.vertices.isEmpty() ) {
            return [];
         }

         const vertexIds = vertices.keySeq();

         // temporary lookup table for representing 1:n/n:1 edges as port-to-port links
         const neighborTable = createNeighborLookupByEdgeId( vertexIds.toJS() );

         return Directions.flatMap( direction =>
            vertexIds.flatMap( vertexId =>
               links( vertexId, direction, neighborTable )
            )
         );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function links( vertexId, direction, neighborTable ) {
         const vertex = vertices.get( vertexId );
         const edgeMeasurements = measurements.edges;
         const vertexMeasurements = measurements.vertices.get( vertexId );
         const vertexCoords = layout.vertices.get( vertexId );

         // Is the link outbound wrt the current vertex?
         const isOutbound = direction === OUT;
         const otherDirection = isOutbound ? IN : OUT;

         return vertex.ports[ direction ]
            .filter( hasExactlyOneNeighbor( isOutbound ) )
            .map( port => {
               const edgeId = port.edgeId;

               const hereMeasurements = vertexMeasurements;
               const herePort = port;

               const owningPort = types.get( port.type ).owningPort;
               const [ thereMeasurements, therePort ] = owningPort ?
                  neighborTable[ otherDirection ][ edgeId ] :
                  [ edgeMeasurements.get( edgeId ), '' ];

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
                            fromMeasurements={fromMeasurements}
                            toMeasurements={toMeasurements} />
            } );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

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
         }
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function createNeighborLookupByEdgeId( vertexIds ) {
         const lut = {};
         Directions.forEach( direction => {
            const matchingMeasurements = lut[ direction ] = {};
            vertexIds.forEach( id => {
               const vertexMeasurements = measurements.vertices.get( id );
               vertices.get( id ).ports[ direction ].forEach( port => {
                  const edgeId = port.edgeId;
                  if( edgeId ) {
                     matchingMeasurements[ edgeId ] = [ vertexMeasurements, port ];
                  }
               } );
            } );
         } );
         return lut;
      }

   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   shouldComponentUpdate( nextProps, nextState ) {
      return !shallowEqual( nextProps, this.props );
   }

} );

export default Links;
