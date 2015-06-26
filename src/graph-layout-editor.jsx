define( [
   'react',
   'immutable',
   './model',
   './events',
   './graph',
   './polyfill/object-assign'
], function( React, Immutable, model, events, Graph ) {
   'use strict';

   const { Dimensions, Layout, Coords } = model;

   const { VertexMoved, EdgeMoved } = events;

   const { Record } = Immutable;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   /**
    * Manages the graph layout prop as mutable state.
    * If a new layout is received through props, that layout always overrides the inner state.
    */
   const GraphLayoutEditor = React.createClass( {

      getInitialState() {
         return {
            layout: this.props.baseLayout
         };
      },

      getDefaultProps() {
         return {
            baseLayout: new Layout()
         };
      },

      render() {
         return <Graph {...this.props}
                       layout={this.state.layout}
                       eventHandler={this.handleEvent} />
      },

      handleEvent( event ) {
         // console.log( 'Layout Event', event );
         const type = event.type();
         if( type === VertexMoved ) {
            this.setState( ({ layout }) => layout.setIn( [ 'vertices', event.id ], event.to ) );
         }
         if( type === EdgeMoved ) {
            this.setState( ({ layout }) => {
               return {
                  layout: Layout( {
                     edges: layout.edges.set( event.id, event.to ),
                     vertices: layout.vertices
                  } )
               };
            } );
         }
         if( this.props.handleEvent ) {
             this.props.handleEvent( event );
         }
      }

   } );

   return GraphLayoutEditor;

} );