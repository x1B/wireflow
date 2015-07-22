import * as React from 'react';

import { Directions, Ports } from '../model';
import { GraphModified, PortDisconnected, PortConnected } from '../events/graph';
import * as options from '../util/options';


/**
 * Manages the graph model prop.
 */
const ModelEditor = React.createClass({

  render() {
    const props = { eventHandler: this.handleEvent };
    const children = React.Children.map( this.props.children, child =>
      React.cloneElement( child, options( child.props, props ) )
    );
    return <div className="nbe-model-editor">{ children }</div>;
  },


  handleEvent( event ) {
    const type = event.type();
    switch( type ) {
      case PortDisconnected:
        return this.disconnect( event.vertex, event.port );
      case PortConnected:
        return this.connect( event.vertex, event.port, event.to );
      default:
        return this.bubble( event );
    }
  },


  bubble( event ) {
    const { eventHandler } = this.props;
    return eventHandler && eventHandler( event );
  },


  connect( vertex, port, connectable ) {
    const { model } = this.props;
    if( connectable.edgeId ) {
      const portsPath = [ 'vertices', vertex.id, 'ports', port.direction ];
      const newGraph = model.updateIn( portsPath, ports =>
        ports.map( p =>
          p.id === port.id ? p.set( 'edgeId', connectable.edgeId ) : p
        )
      );
      const ev = GraphModified({
        graph: newGraph
      });
      return this.bubble( ev );
    }
  },


  disconnect( vertex, port ) {
    const { model, types } = this.props;
    const portsPath = [ 'vertices', vertex.id, 'ports', port.direction ];

    const type = types.get( port.type );
    if( type.owningPort === port.direction ) {
      return this.bubble( GraphModified({
        graph: this.withoutEdge( model, port.edgeId )
      }) );
    }

    const next = model.setIn( portsPath, model.getIn( portsPath ).map( p =>
      p.id !== port.id ? p : port.set( 'edgeId', null )
    ) );
    return this.bubble(
      GraphModified({ graph: this.withoutEmptyEdges( next ) })
    );
  },


  withoutEdge( graph, edgeId ) {
    const mapVertices = f =>
      graph.set( 'vertices', graph.vertices.map( f ) );

    const mapVertexPorts = ( v, f ) => v.set( 'ports', Ports({
      inbound: v.ports.inbound.map( f ),
      outbound: v.ports.outbound.map( f )
    }) );

    const mapGraphPorts = f => mapVertices( v => mapVertexPorts( v, f ) );

    const graphWithoutEdge = mapGraphPorts( graph )( p => p.set( 'edgeId',
      p.edgeId === edgeId ? null : p.edgeId
    ) );
    return this.withoutEmptyEdges( graphWithoutEdge );
  },


  withoutEmptyEdges( graph ) {
    const ports = graph.vertices.valueSeq()
      .flatMap( v => Directions.flatMap( d => v.ports[ d ] ) )
      .map( p => p.edgeId )
      .filter( id => !!id )
      .groupBy( id => id );

    return graph.set( 'edges',
      graph.edges.filter( edge => ports.has( edge.id ) )
    );
  }

});

export default ModelEditor;
