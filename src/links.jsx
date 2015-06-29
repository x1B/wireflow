define( [
   'react',
   'immutable',
   './model',
   './link'
], function( React, Immutable, model, Link ) {
   'use strict';

   const { List } = Immutable;
   const { Directions, IN, OUT, Coords } = model;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const Links = React.createClass( {

      render() {

         const { measurements, vertices, edges, layout, types } = this.props;

         return <svg className="nbe-links">
            {renderLinks()}
         </svg>;

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function renderLinks() {
            if( measurements.vertices.isEmpty() ) {
               return [];
            }

            const vertexIds = vertices.keySeq();

            // temporary lookup table for representing simple edges as port-to-port links
            const coords = coordsByEdgeId( vertexIds.toJS() );

            return Directions.flatMap( direction =>
               vertexIds.flatMap( vertexId =>
                  links( vertexId, direction, coords )
               )
            );
         }

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function links( vertexId, direction, coords ) {
            const vertex = vertices.get( vertexId );
            const edgeMeasurements = measurements.edges;
            const vertexMeasurements = measurements.vertices.get( vertexId );
            const vertexCoords = layout.vertices.get( vertexId );

            // Is the link outbound wrt the current vertex?
            const isOutbound = direction === OUT;
            const otherDirection = isOutbound ? IN : OUT;

            // Make sure each link is drawn from one side only.
            const hasExactlyOneNeighbor = ( port ) => {
               if( !port.edgeId ) {
                  return false;
               }
               var type = types.get( port.type );
               if( !type.simple ) {
                  return true;
               }
               return isOutbound ? (type.maxDestinations === 1) : (type.maxSources === 1)
            }

            return vertex.ports[ direction ]
               .filter( hasExactlyOneNeighbor )
               .map( port => {
                  const here = {
                     center: add( vertexMeasurements[ direction ].get( port.id ), vertexCoords ),
                     box:  vertexMeasurements.box
                  };
                  const thereEdge = edgeMeasurements.get( port.edgeId );
                  const there = ( thereEdge ? thereEdge : coords[ otherDirection ][ port.edgeId ] );

                  const [ a, b ] = isOutbound ? [ here, there ] : [ there, here ];

                  return <Link key={vertexId + '/' + port.id}
                               type={port.type}
                               from={a}
                               to={b}/>
               } );
         }

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function coordsByEdgeId( vertexIds ) {
            const coords = {};
            Directions.forEach( direction => {
               const portsTable = coords[ direction ] = {};
               vertexIds.forEach( id => {
                  const vertexMeasurements = measurements.vertices.get( id );
                  const portsMeasurements = vertexMeasurements[ direction ];
                  const vertexCoords = layout.vertices.get( id );
                  vertices.get( id ).ports[ direction ].forEach( port => {
                     if( port.edgeId ) {
                        portsTable[ port.edgeId ] = {
                           box: vertexMeasurements.box,
                           center: add( portsMeasurements.get( port.id ), vertexCoords )
                        };
                     }
                  } );
               } );
            } );
            return coords;
         }

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
