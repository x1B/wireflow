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

      getInitialState() {
         return {
            layout: this.props.layout
         };
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      getDefaultProps() {
         return {
            layout: Layout()
         };
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

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
         if( type === VertexMoved ) {
            this.setState( ({ layout }) => {
               const next = layout.setIn( [ 'vertices', event.vertex.id ], event.to );
               this.bubble( LayoutModified( { layout: next } ) );
               return { layout: next };
            } );
            return;
         }
         if( type === EdgeMoved ) {
            this.setState( ({ layout }) => {
               const next = layout.setIn( [ 'edges', event.edge.id ], event.to );
               this.bubble( LayoutModified( { layout: next } ) );
               return { layout: next };
            } );
            return;
         }
         return this.bubble( event );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      bubble( event ) {
         if( this.props.eventHandler ) {
             return this.props.eventHandler( event );
         }
      }

   } );

   return LayoutEditor;

} );
