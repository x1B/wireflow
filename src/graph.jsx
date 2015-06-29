define( [
   'react',
   'immutable',
   './model',
   './events',
   './vertex',
   './edge',
   './links'
], function( React, Immutable, model, events, Vertex, Edge, Links ) {
   'use strict';

   const { Record, Map } = Immutable;
   const { Dimensions, Layout } = model;

   const { VertexMeasured, EdgeMeasured } = events;

   const Measurements = Record( { vertices: Map(), edges: Map() } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const Graph = React.createClass( {

      getInitialState() {
         return {
            measurements: new Measurements()
         };
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

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

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      render() {
         const self = this;
         const { types, edges, vertices, layout, zoom, hasFocus, eventHandler } = self.props;

         return (
            <div tabIndex="0" className={classes()}>
               <div className="nbe-graph-viewport">
                  <div className="nbe-graph-canvas">
                     <div className="nbe-graph-nodes">
                        {renderVertices()}
                        {renderEdges()}
                     </div>
                     <Links measurements={self.state.measurements}
                            types={types}
                            vertices={vertices}
                            edges={edges}
                            layout={layout} />
                  </div>
               </div>
            </div>
         );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function classes() {
            return [
               'nbe-theme-fusebox-app', // :TODO: read from props...
               'nbe-graph',
               hasFocus ? 'nbe-has-focus' : '',
               'nbe-zoom-' + zoom
            ].join( ' ' );
         }

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function renderVertices() {
            return vertices.valueSeq().map( vertex =>
               <Vertex key={vertex.id}
                       vertex={vertex}
                       layout={layout.vertices.get( vertex.id )}
                       eventHandler={self.handleEvent} />
            ).toJS();
         }

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function renderEdges() {
            return edges.valueSeq()
               .filter( edge => !types.get( edge.type ).simple )
               .map( edge =>
                  <Edge key={edge.id}
                        edge={edge}
                        layout={layout.edges.get( edge.id )}
                        eventHandler={self.handleEvent} />
               )
               .toJS();
         }

      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      handleEvent( event ) {
         var type = event.type();
         if( type === VertexMeasured ) {
            this.setState( ({measurements}) => ({
               measurements: measurements.setIn( [ 'vertices', event.vertex.id ], event.measurements )
            }) );
            return;
         }
         if( type === EdgeMeasured ) {
            this.setState( ({measurements}) => ({
               measurements: measurements.setIn( [ 'edges', event.edge.id ], event.measurements )
            }) );
            return;
         }
         this.props.eventHandler( event );
      }

   } );

   return Graph;

} );
