define( [
   'react',
   'immutable',
   './nbe-model',
   './vertex',
   './edge',
   './links'
], function( React, Immutable, nbeModel, Vertex, Edge, Links ) {
   'use strict';

   const { Record, Map } = Immutable;
   const { Dimensions, Layout } = nbeModel;

   const PortsMeasurements = Record( { inbound: Map(), outbound: Map() } );
   const VertexMeasurements = Record( { box: Dimensions(), ports: new PortsMeasurements() } );
   const Measurements = Record( { vertices: Map(), edges: Map() } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const Graph = React.createClass( {

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
         const self = this;
         const { types, edges, vertices, layout, zoom, hasFocus } = self.props;

         return (
            <div tabIndex="0" className={classes()}>
               <div className="nbe-graph-viewport">
                  <div className="nbe-graph-canvas">
                     <div className="nbe-graph-nodes">
                        {renderVertices()}
                        {renderEdges()}
                     </div>
                     <Links measurements={self.state.measurements}
                            vertices={vertices}
                            edges={edges}
                            layout={layout} />
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

         function transformMeasurements( f ) {
            return self.setState( ({ measurements }) => {
               const next = f( measurements );
               return { measurements: next };
            } );
         }

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         function portMeasureHandler( id ) {
            return ( direction, port, coords ) =>
               transformMeasurements( measurements => {
                  const vertexMeasurements = ( measurements.vertices.get( id ) || VertexMeasurements() );
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
