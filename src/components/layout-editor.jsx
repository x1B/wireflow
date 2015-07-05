define( [
   'react',
   'immutable',
   '../model',
   '../events',
   '../util/options'
], function( React, Immutable, model, events, options ) {
   'use strict';

   const { Record } = Immutable;
   const { Dimensions, Layout, Coords } = model;
   const { VertexMoved, EdgeMoved, LayoutModified } = events;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   /**
    * Manages the graph layout prop as mutable state.
    * If a new layout is received through props, that layout always overrides the inner state.
    */
   const LayoutEditor = React.createClass( {

      render() {
         const props = { eventHandler: this.handleEvent };
         const children = React.Children.map( this.props.children, child => {
            return React.cloneElement( child, options( child.props, props ) );
         } );
         return <div className="nbe-layout-editor">{ children }</div>;
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      handleEvent( event ) {
         const type = event.type();
         const { layout } = this.props;

         if( type === VertexMoved ) {
            const next = layout.setIn( [ 'vertices', event.vertex.id ], event.to );
            return this.bubble( LayoutModified( { layout: next } ) );
         }
         if( type === EdgeMoved ) {
            const next = layout.setIn( [ 'edges', event.edge.id ], event.to );
            return this.bubble( LayoutModified( { layout: next } ) );
         }

         return this.bubble( event );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      bubble( event ) {
         const { eventHandler } = this.props;
         return eventHandler && eventHandler( event );
      }

   } );

   return LayoutEditor;

} );
