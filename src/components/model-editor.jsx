define( [
   'react',
   'immutable',
   '../model',
   '../events',
   '../util/options'
], function( React, Immutable, model, events, options ) {
   'use strict';

   const { Record } = Immutable;
   const { Graph, Directions } = model;
   const { GraphModified, PortDisconnected } = events;


   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   /**
    * Manages the graph model prop.
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

         return this.bubble( event );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      bubble( event ) {
         const { eventHandler } = this.props;
         return eventHandler && eventHandler( event );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      disconnect( vertex, port ) {
         const { model } = this.props;
         const portsPath = [ 'vertices', vertex.id, 'ports', port.direction ];
         const next = model.setIn( portsPath, model.getIn( portsPath ).map( p =>
            p.id !== port.id ? p : port.set( 'edgeId', null )
         ) );
         return this.bubble( GraphModified( { graph: this.withoutEmptyEdges( next ) } ) );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      withoutEmptyEdges( graph ) {
         const ports = graph.vertices.valueSeq()
            .flatMap( v => Directions.flatMap( d => v.ports[ d ] ) )
            .map( p => p.edgeId )
            .filter( id => !!id )
            .groupBy( id => id );

         return graph.set( 'edges', graph.edges.filter( edge => ports.has( edge.id ) ) );
      }

   } );


   return ModelEditor;

} );
