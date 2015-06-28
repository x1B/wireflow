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

         const { measurements, vertices, edges, layout } = this.props;

         return <svg className="nbe-links">
            {renderLinks()}
         </svg>;

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function renderLinks() {
            if ( measurements.vertices.isEmpty() ) {
               return [];
            }

            // console.log( 'MEASUREMENTS', JSON.stringify( measurements.toJS(), null, 3 ) );
            const vertexIds = vertices.keySeq();

            // temporary lookup table mapping simple edges to the coords of their representative ports
            const fallbackCoords = portCoordsByEdgeId( vertexIds.toJS() );

            return vertexIds.flatMap( vertexId =>
               Directions.flatMap( direction =>
                  links( vertexId, direction, fallbackCoords )
               )
            );
         }

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function links( vertexId, direction, fallbackCoords ) {
            const vertex = vertices.get( vertexId );
            const edgeMeasurements = measurements.edges;
            const vertexMeasurements = measurements.vertices.get( vertexId );
            const vertexCoords = layout.vertices.get( vertexId );

            // Is the link outbound wrt the current vertex?
            const isOutbound = direction === OUT;
            const otherDirection = isOutbound ? IN : OUT;

            return vertex.ports[ direction ]
               .filter( port => !!port.edgeId )
               .map( port => {
                  const here = add( vertexMeasurements[ direction ].get( port.id ), vertexCoords );
                  const there = edgeMeasurements.get( port.edgeId )
                            || fallbackCoords[ otherDirection ][ port.edgeId ];

                  const from = isOutbound ? here : there;
                  const to = isOutbound ? there : here;

                  return <Link key={vertexId + '/' + port.id}
                               type={port.type}
                               from={from}
                               to={to} />
               } );
         }

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function portCoordsByEdgeId( vertexIds ) {
            const coords = {};
            Directions.forEach( direction => {
               const table = coords[ direction ] = {};
               vertexIds.forEach( id => {
                  const portsMeasurements = measurements.vertices.get( id )[ direction ];
                  const vertexCoords = layout.vertices.get( id );
                  vertices.get( id ).ports[ direction ].forEach( port => {
                     if ( port.edgeId ) {
                        table[ port.edgeId ] = add( portsMeasurements.get( port.id ), vertexCoords );
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
      return new Coords( {
         left: a.left + b.left,
         top: a.top + b.top
      } );
   }

} );
