import { List, Map } from 'immutable';
import { Directions, Ports, Edge, Graph } from '../model';
import { HandleEdgeInserted } from '../actions/layout';

import {
  DisconnectPort,
  ConnectPort,
  RemoveVertex,
  RemoveEdge
} from '../actions/graph';

import {
  SaveState,
  RestoreState
} from '../actions/history';


/**
 * Manages the graph model prop.
 */
class GraphStore {

  constructor( dispatcher, graph, types ) {
    this.dispatcher = dispatcher;

    this.storeId = this.constructor.name;
    this.graph = graph;
    this.types = types;
    this.save();

    dispatcher.register( DisconnectPort, act => {
      this.disconnect( act.vertex, act.port );
      this.save();
    } );

    dispatcher.register( ConnectPort, act => {
      this.connect( act.from, act.to );
      this.save();
    } );

    dispatcher.register( RemoveVertex, act => {
      this.removeVertex( act.vertexId );
      this.save();
    } );

    dispatcher.register( RemoveEdge, act => {
      this.removeEdge( act.edgeId );
      this.save();
    } );

    dispatcher.register( RestoreState, act => {
      if( act.storeId === this.storeId ) {
        this.graph = act.state.get(0);
        this.types = act.state.get(1);
      }
    } );

  }

  save() {
    this.dispatcher.dispatch( SaveState({
      storeId: this.storeId,
      state: List.of( this.graph, this.types )
    }) );
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

    this.dispatcher.dispatch( HandleEdgeInserted({
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
    const portsPath = [ 'vertices', vertex.id, 'ports', port.direction ];

    const type = this.types.get( port.type );
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
    const mapVertexPorts = ( v, f ) => v.set( 'ports', Ports({
      inbound: v.ports.inbound.map( f ),
      outbound: v.ports.outbound.map( f )
    }) );

    const mapVertices = f =>
      this.graph.setIn( [ 'vertices' ], this.graph.vertices.map( f ) );

    const mapGraphPorts = f =>
      mapVertices( v => mapVertexPorts( v, f ) );

    this.graph = mapGraphPorts( p => p.set( 'edgeId',
      p.edgeId === edgeId ? null : p.edgeId
    ) );
    this.pruneEmptyEdges();
  }


  removeVertex( vertexId ) {
    const vertex = this.graph.vertices.get( vertexId );
    Directions.flatMap( d => vertex.ports[ d ] ).forEach( port => {
      this.disconnect( vertex, port );
    } );

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
