define( [
   'react',
   'immutable',
   '../model',
   '../events',
   './link',
   '../util/shallow-equal'
], function( React, Immutable, model, events, Link, shallowEqual ) {
   'use strict';

   const { List } = Immutable;
   const { Directions, IN, OUT, Coords } = model;
   const { Rendered } = events;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const Links = React.createClass( {

      render() {

         const { measurements, vertices, edges, layout, types, eventHandler } = this.props;
         eventHandler( Rendered( { what: Links.displayName } ) );

         return <svg>{renderLinks()}</svg>;

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function renderLinks() {
            if( measurements.vertices.isEmpty() ) {
               return [];
            }

            const vertexIds = vertices.keySeq();

            // temporary lookup table for representing simple edges as port-to-port links
            const neighborTable = createNeighborLookupByEdgeId( vertexIds.toJS() );

            return Directions.flatMap( direction =>
               vertexIds.flatMap( vertexId =>
                  links( vertexId, direction, neighborTable )
               )
            );
         }

         /////////////////////////////////////////////////////////////////////////////////////////////////////

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

                  const isSimple = types.get( port.type ).simple;
                  const [ thereMeasurements, therePort ] = isSimple ?
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

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         // Make sure each link is drawn from one side only.
         function hasExactlyOneNeighbor( isOutbound ) {
            return port => {
               if( !port.edgeId ) {
                  return false;
               }
               const type = types.get( port.type );
               if( !type.simple ) {
                  return true;
               }
               return isOutbound ? (type.maxDestinations === 1) : (type.maxSources === 1)
            }
         }

         /////////////////////////////////////////////////////////////////////////////////////////////////////

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

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      shouldComponentUpdate( nextProps, nextState ) {
         return !shallowEqual( nextProps, this.props );
      }

   } );

   return Links;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function add( a, b ) {
      return Coords( {
         left: a.left + b.left,
         top: a.top + b.top
      } );
   }

} );
