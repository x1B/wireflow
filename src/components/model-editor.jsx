define( [
   'react',
   'immutable',
   '../model',
   '../events',
   '../util/options'
], function( React, Immutable, model, events, options ) {
   'use strict';

   const { Record } = Immutable;
   const { Graph } = model;
   const { GraphModified, PortDisconnected } = events;


   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   /**
    * Manages the graph model prop as mutable state.
    * If a new Model is received through props, that model always overrides the inner state.
    */
   const ModelEditor = React.createClass( {

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      render() {
         const props = { eventHandler: this.handleEvent };
         const children = React.Children.map( this.props.children, child =>
            React.cloneElement( child, options( child.props, props ) )
         );
         return <div className="nbe-model-editor">{ children }</div>;
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      handleEvent( event ) {
         const type = event.type();

         if( type === PortDisconnected ) {
            return this.disconnect( event.vertex, event.port );
         }

         this.bubble( event );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      disconnect( vertex, port ) {
         const { model } = this.props;
         const portsPath = [ 'vertices', vertex.id, 'ports', port.direction ];
         const ports = model.getIn( portsPath );
         const next = model.setIn( portsPath, ports.map( p =>
            p.id !== port.id ? p : port.set( 'edgeId', null )
          ) );

         this.bubble( GraphModified( { graph: next } ) );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      bubble( event ) {
         if( this.props.eventHandler ) {
             return this.props.eventHandler( event );
         }
      }

   } );


   return ModelEditor;

} );
