define( [
   'react',
   'immutable',
   '../model',
   '../events',
   '../util/shallow-equal',
   './vertex',
   './edge',
   './links',
   './ghost-port'
], function( React, Immutable, model, events, shallowEqual, Vertex, Edge, Links, GhostPort ) {
   'use strict';

   const { Record, Map } = Immutable;
   const { Dimensions, Layout } = model;
   const { VertexMeasured, EdgeMeasured, PortDragged, Rendered } = events;

   const Measurements = Record( { vertices: Map(), edges: Map() } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const Graph = React.createClass( {

      getInitialState() {
         return {
            portDragInfo: null,
            measurements: Measurements()
         };
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      getDefaultProps() {
         return {
            types: Map(),
            model: model.Graph(),
            layout: Layout(),
            zoom: 100,
            hasFocus: false
         }
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      render() {
         const self = this;
         const { model: { vertices, edges }, types, layout, zoom, hasFocus, eventHandler } = self.props;
         eventHandler( Rendered( { what: Graph.displayName } ) );

         return (
            <div tabIndex="0" className={classes()}>
               <div className="nbe-graph-viewport">
                  <div className="nbe-graph-canvas" style={self.canvasSize( self.state.measurements )}>
                     <div className="nbe-graph-nodes">
                        {renderVertices()}
                        {renderEdges()}
                     </div>
                     <svg className="nbe-links">
                        <Links measurements={self.state.measurements}
                               eventHandler={self.handleEvent}
                               types={types}
                               vertices={vertices}
                               edges={edges}
                               layout={layout} />
                        <GhostPort dragInfo={this.state.portDragInfo} />
                     </svg>
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
         switch( event.type() ) {

            case VertexMeasured:
               return this.setState( ({measurements}) => ({
                  measurements: measurements.setIn( [ 'vertices', event.vertex.id ], event.measurements )
               }) );

            case EdgeMeasured:
               return this.setState( ({measurements}) => ({
                  measurements: measurements.setIn( [ 'edges', event.edge.id ], event.measurements )
               }) );

            case PortDragged:
               return this.setState( ({portDragInfo}) => ({
                  portDragInfo: event.info
               }) );

            default:
               this.bubble( event );
         }
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      bubble( event ) {
         const { eventHandler } = this.props;
         return eventHandler && eventHandler( event );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      shouldComponentUpdate( nextProps, nextState ) {
         return !shallowEqual( nextState, this.state ) || !shallowEqual( nextProps, this.props );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      canvasSize( measurements ) {

         var w = 0;
         var h = 0;
         const padding = 50;
         const { max } = Math;

         const measure = node => {
            const { box: { coords: { left, top }, dimensions: { width, height } } } = node;
            w = max( w, left+width );
            h = max( h, top+height );
         };

         measurements.vertices.forEach( measure );
         measurements.edges.forEach( measure );

         // TODO: 'font-size: 0' is a weird hack, find a better way to make sure that no scrollbar is shown
         return {
            'fontSize': 0,
            'minWidth': (w+padding) + 'px',
            'minHeight': (h+padding) + 'px'
         };
      }

   } );

   return Graph;

} );
