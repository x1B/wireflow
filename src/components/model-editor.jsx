import * as React from 'react';

import { Directions, Ports } from '../model';
import { GraphModified, PortDisconnected } from '../events';
import * as options from '../util/options';


/**
 * Manages the graph model prop.
 */
const ModelEditor = React.createClass( {

  render() {
    const props = { eventHandler: this.handleEvent };
    const children = React.Children.map( this.props.children, child =>
      React.cloneElement( child, options( child.props, props ) )
    );
    return <div className="nbe-model-editor">{ children }</div>;
  },


  handleEvent( event ) {
    const type = event.type();

    if( type === PortDisconnected ) {
      return this.disconnect( event.vertex, event.port );
    }

    return this.bubble( event );
  },


  bubble( event ) {
    const { eventHandler } = this.props;
    return eventHandler && eventHandler( event );
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
    const mapVertices = f => graph.set( 'vertices', graph.vertices.map( f ) );
    const mapVertexPorts = ( v, f ) => v.set( 'ports', Ports( {
      inbound: v.ports.inbound.map( f ),
      outbound: v.ports.outbound.map( f )
    } ) );
    const mapPorts = f => mapVertices( v => mapVertexPorts( v, f ) );

    const graphWithoutEdge = mapPorts( p => p.set( 'edgeId',
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

} );

export default ModelEditor;
