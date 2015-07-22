import { Directions, Ports, Edge } from '../model';
import { PortDisconnected, PortConnected } from '../events/graph';


/**
 * Manages the graph model prop.
 */
class ModelStore {


  constructor( dispatcher, graph, types ) {
    this.dispatcher = dispatcher;
    this.graph = graph;
    this.types = types;

    dispatcher.register( PortDisconnected, ev =>
      this.disconnect( ev.vertex, ev.port ) );
    dispatcher.register( PortConnected, ev =>
      this.connect( ev.vertex, ev.port, ev.to ) );
  }


  connect( vertex, port, connectable ) {
    if( connectable.edgeId ) {
      this.graph = setPortEdge( this.graph, vertex.id, port.direction, port.id, connectable.edgeId );
      return;
    }

    const model = this.graph;
    const newEdgeId = nextId( model.edges );
    const newEdge = Edge({ id: newEdgeId, label: 'aaaa', type: port.type });
    const graphWithEdge = model.setIn( [ 'edges', newEdgeId ], newEdge );
    // TODO:
    // - connect the ports
    // - dispatch adding the new edge
    this.graph = graphWithEdge;

    function nextId( someMap ) {
      const prefix = '#' + someMap.size;
      const qualified = c => c ? prefix : (prefix + '/' + c);
      var counter = 0;
      while( someMap.has( qualified( counter ) ) ) { ++counter; }
      return qualified( counter );
    }

    function setPortEdge( graph, vertexId, direction, portId, edgeId ) {
      const portsPath = [ 'vertices', vertexId, 'ports', direction ];
      return graph.updateIn( portsPath, ports => ports.map( p =>
        p.id === portId ? p.set( 'edgeId', connectable.edgeId ) : p
      ) );
    }
  }


  disconnect( vertex, port ) {
    const model = this.graph;
    const types = this.types;

    const portsPath = [ 'vertices', vertex.id, 'ports', port.direction ];

    const type = types.get( port.type );
    if( type.owningPort === port.direction ) {
      this.graph = this.withoutEdge( model, port.edgeId );
      return;
    }

    const next = model.setIn( portsPath, model.getIn( portsPath ).map( p =>
      p.id !== port.id ? p : port.set( 'edgeId', null )
    ) );

    this.graph = this.withoutEmptyEdges( next );
  }


  withoutEdge( graph, edgeId ) {
    const mapVertices = f =>
      graph.set( 'vertices', graph.vertices.map( f ) );

    const mapVertexPorts = ( v, f ) => v.set( 'ports', Ports({
      inbound: v.ports.inbound.map( f ),
      outbound: v.ports.outbound.map( f )
    }) );

    const mapGraphPorts = f => mapVertices( v => mapVertexPorts( v, f ) );

    const graphWithoutEdge = mapGraphPorts( p => p.set( 'edgeId',
      p.edgeId === edgeId ? null : p.edgeId
    ) );
    return this.withoutEmptyEdges( graphWithoutEdge );
  }


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

}

export default ModelStore;
