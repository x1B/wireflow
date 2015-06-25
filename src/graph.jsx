define( [
   'react',
   'immutable',
   './nbe-model',
   './vertex',
   './edge',
   './link'
], function( React, Immutable, nbeModel, Vertex, Edge, Link ) {
   'use strict';

   var { Record, Map, List } = Immutable;
   var { IN, OUT, Dimensions, Coords, Layout } = nbeModel;

   var PortsMeasurements = Record( { inbound: Map(), outbound: Map() } );
   var VertexMeasurements = Record( { box: Dimensions(), ports: new PortsMeasurements() } );
   var Measurements = Record( { vertices: Map(), edges: Map() } );

   let Graph = React.createClass( {

      getInitialState() {
         return {
            measurements: new Measurements()
         };
      },

      getDefaultProps() {
         return {
            types: Map(),
            edges: Map(),
            vertices: Map(),
            layout: Layout(),
            zoom: 100,
            hasFocus: false
         }
      },

      render() {
         var self = this;
         var measurements = self.state.measurements;
         var { types, edges, vertices, layout, zoom, hasFocus } = self.props;

         return (
            <div tabIndex="0" className={classes()}>
               <div className="nbe-graph-viewport">
                  <div className="nbe-graph-canvas">
                     <div className="nbe-graph-nodes">
                        {renderVertices()}
                        {renderEdges()}
                     </div>
                     <svg className="nbe-links">
                        {renderLinks()}
                     </svg>
                  </div>
               </div>
            </div>
         );

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         function classes() {
            return [
               'nbe-theme-fusebox-app', // :TODO: read from props...
               'nbe-graph',
               hasFocus ? 'nbe-has-focus' : '',
               'nbe-zoom-' + zoom
            ].join( ' ' );
         }

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         function renderVertices() {
            return vertices.entrySeq()
               .map( ([ key, v ]) =>
                   <Vertex key={key}
                           layout={layout.vertices.get( key )}
                           ports={v.ports}
                           label={v.label}
                           portMeasureHandler={portMeasureHandler( key )}/>
               )
               .toJS();
         }

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         function renderEdges() {
            return edges.entrySeq()
               .filter( ([ edgeId, edge ]) => !types.get( edge.type ).simple )
               .map( ([ edgeId, edge ]) =>
                  <Edge key={edgeId}
                        type={edge.type}
                        ports={edge.ports}
                        label={edge.label || edgeId}
                        layout={layout.edges.get( edgeId )}
                        measureHandler={edgeMeasureHandler( edgeId )}/>
               )
               .toJS();
         }

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         function renderLinks() {
            if ( measurements.vertices.isEmpty() ) {
               return [];
            }

            // console.log( 'MEASUREMENTS', JSON.stringify( measurements.toJS(), null, 3 ) );
            var vertexIds = vertices.keySeq();

            // temporary lookup table mapping simple edges to the coords of their representative ports
            var fallbackCoords = portCoordsByEdgeId( vertexIds.toJS() );

            return vertexIds.flatMap( vertexId =>
               List.of( IN, OUT ).flatMap( direction =>
                  links( vertexId, direction )
               )
            );

            function links( vertexId, direction ) {
               var vertex = vertices.get( vertexId );
               var edgeMeasurements = measurements.edges;
               var portsMeasurements = measurements.vertices.get( vertexId ).ports;
               var vertexCoords = layout.vertices.get( vertexId );

               return vertex.ports[ direction ]
                  .filter( port => !!port.edgeId )
                  .map( port => {
                     var a = add( portsMeasurements.getIn( [ direction, port.id ] ), vertexCoords );
                     var otherDirection = direction === IN ? OUT : IN;
                     var b = edgeMeasurements.get( port.edgeId )
                        || fallbackCoords[ otherDirection ][ port.edgeId ];
                     return <Link key={vertexId + '/' + port.id}
                                  type={port.type}
                                  from={a}
                                  to={b}/>
                  } );
            }

            function portCoordsByEdgeId( vertexIds ) {
               var coords = {};
               [ IN, OUT ].forEach( direction => {
                  var table = coords[ direction ] = {};
                  vertexIds.forEach( id => {
                     var portsMeasurements = measurements.vertices.get( id ).ports[ direction ];
                     var vertexCoords = layout.vertices.get( id );
                     vertices.get( id ).ports[ direction ].forEach( port => {
                        if ( port.edgeId ) {
                           table[ port.edgeId ] = add( portsMeasurements.get( port.id ), vertexCoords );
                        }
                     } );
                  } );
               } );
               return coords;
            }

            function add( a, b ) {
               return new Coords( {
                  left: a.left + b.left,
                  top: a.top + b.top
               } );
            }
         }

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         function transformMeasurements( f ) {
            return self.setState( ({ measurements }) => {
               var next = f( measurements );
               return { measurements: next };
            } );
         }

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         function portMeasureHandler( id ) {
            return ( direction, port, coords ) =>
               transformMeasurements( measurements => {
                  var vertexMeasurements = ( measurements.vertices.get( id ) || VertexMeasurements() );
                  return measurements.setIn(
                     [ 'vertices', id ],
                     vertexMeasurements.setIn( [ 'ports', direction, port.id ], coords )
                  )
               } );
         }

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         function edgeMeasureHandler( id ) {
            return ( coords ) =>
               transformMeasurements( measurements =>
                  measurements.setIn( [ 'edges', id ], coords )
               );
         }

      }

   } );

   return Graph;

} );
