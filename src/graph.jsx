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
                           id={key}
                           layout={layout.vertices.get( key )}
                           ports={v.ports}
                           label={v.label}
                           eventHandler={self.handleEvent} />
               )
               .toJS();
         }

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         function renderEdges() {
            return edges.entrySeq()
               .filter( ([ edgeId, edge ]) => !types.get( edge.type ).simple )
               .map( ([ edgeId, edge ]) =>
                  <Edge key={edgeId}
                        id={edgeId}
                        edge={edge}
                        layout={layout.edges.get( edgeId )}
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
               measurements: measurements.setIn( [ 'vertices', event.id ], event.measurements )
            }) );
            return;
         }
         if( type === EdgeMeasured ) {
            this.setState( ({measurements}) => ({
               measurements: measurements.setIn( [ 'edges', event.id ], event.at )
            }) );
            return;
         }
         this.props.eventHandler( event );
      }

   } );

   return Graph;

} );
