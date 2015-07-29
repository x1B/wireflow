import { Directions, Ports, Edge } from '../model';
import { PortDisconnected, PortConnected } from '../events/graph';
import { EdgeInserted } from '../events/layout';


/**
 * Manages the graph model prop.
 */
class GraphStore {


  constructor( dispatcher, graph, types ) {
    this.dispatcher = dispatcher;
    this.graph = graph;
    this.types = types;

    dispatcher.register( PortDisconnected, ev =>
      this.disconnect( ev.vertex, ev.port ) );

    dispatcher.register( PortConnected, ev =>
      this.connect( ev.from, ev.to ) );
  }


  connect( from, to ) {
    if( to.edgeId ) {
      this.setPortEdge( from, to.edgeId );
      return;
    }

    const newEdgeId = nextId( this.graph.edges );
    const newEdge = Edge({ id: newEdgeId, label: 'aaaa', type: from.type });
    this.graph = this.graph.setIn( [ 'edges', newEdgeId ], newEdge );
    this.setPortEdge( from, newEdgeId );
    this.setPortEdge( to, newEdgeId );
    this.pruneEmptyEdges();

    this.dispatcher.dispatch( EdgeInserted({
      edge: newEdge,
      from: from,
      to: to
    }) );

    function nextId( someMap ) {
      const prefix = '#' + someMap.size;
      const qualified = c => c ? prefix : (prefix + '/' + c);
      var counter = 0;
      while( someMap.has( qualified( counter ) ) ) { ++counter; }
      return qualified( counter );
    }
  }


  setPortEdge( from, edgeId ) {
    const portsPath = [ 'vertices', from.vertexId, 'ports', from.direction ];
    this.graph = this.graph.updateIn( portsPath, ports => ports.map( p =>
      p.id === from.portId ? p.set( 'edgeId', edgeId ) : p
    ) );
  }


  disconnect( vertex, port ) {
    const types = this.types;

    const portsPath = [ 'vertices', vertex.id, 'ports', port.direction ];

    const type = types.get( port.type );
    if( type.owningPort === port.direction ) {
      this.removeEdge( port.edgeId );
      return;
    }

    const current = this.graph;
    const next = current.setIn( portsPath, current.getIn( portsPath ).map( p =>
      p.id !== port.id ? p : port.set( 'edgeId', null )
    ) );

    this.graph = next;
    this.pruneEmptyEdges();
  }


  removeEdge( edgeId ) {
    const mapVertices = f =>
      this.graph.set( 'vertices', this.graph.vertices.map( f ) );

    const mapVertexPorts = ( v, f ) => v.set( 'ports', Ports({
      inbound: v.ports.inbound.map( f ),
      outbound: v.ports.outbound.map( f )
    }) );

    const mapGraphPorts = f => mapVertices( v => mapVertexPorts( v, f ) );

    this.graph = mapGraphPorts( p => p.set( 'edgeId',
      p.edgeId === edgeId ? null : p.edgeId
    ) );
    this.pruneEmptyEdges();
  }


  removeVertex( vertexId ) {
    this.graph = this.graph.update( 'vertices', vs =>
      vs.filter( v => v.id !== vertexId ) );
    this.pruneEmptyEdges();
  }


  pruneEmptyEdges() {
    const ports = this.graph.vertices.valueSeq()
      .flatMap( v => Directions.flatMap( d => v.ports[ d ] ) )
      .map( p => p.edgeId )
      .filter( id => !!id )
      .groupBy( id => id );

    this.graph = this.graph.set( 'edges',
      this.graph.edges.filter( edge => ports.has( edge.id ) )
    );
  }

}

export default GraphStore;
