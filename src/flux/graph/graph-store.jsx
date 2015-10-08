import { List, Map } from 'immutable';

import { SaveState, RestoreState } from '../history/history-actions';
import { HandleEdgeInserted } from '../layout/layout-actions';

import { Directions, Ports, Edge, Graph } from './graph-model';
import {
  DisconnectPort,
  ConnectPort,
  RemoveVertex,
  RemoveEdge
} from './graph-actions';


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
    const next = current.setIn( portsPath, current.getIn( portsPath ).map( p => {
      return p.id !== port.id ? p : port.set( 'edgeId', null );
    } ) );

    this.graph = next;
    this.pruneEmptyEdges();
  }

  removeEdge( edgeId ) {
    this.disconnectAll( edgeId );
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

  disconnectAll( edgeId ) {
    this.graph = this.mapGraphPorts( this.graph, p => p.set( 'edgeId',
      p.edgeId === edgeId ? null : p.edgeId
    ) );
  }

  pruneEmptyEdges() {
    const portsByEdge = this.graph.vertices.valueSeq()
      .flatMap( v => Directions.flatMap( d => v.ports[ d ] ) )
      .filter( p => p.edgeId != null )
      .groupBy( p => p.edgeId );

    const isSimple = ( e ) => this.types.get( e.type ).owningPort !== null;

    const toPrune = this.graph.edges.filter( e => {
      const edgePorts = portsByEdge.get( e.id );
      return !edgePorts || edgePorts.size <= ( isSimple( e ) ? 1 : 0 );
    } );

    toPrune.forEach( e => this.disconnectAll( e.id ) );

    this.graph = this.graph.set( 'edges',
      this.graph.edges.filter( e => !toPrune.has( e.id ) )
    );
  }


  // pure helpers

  mapVertexPorts( v, f ) {
    return v.set( 'ports', Ports({
      inbound: v.ports.inbound.map( f ),
      outbound: v.ports.outbound.map( f )
    }) );
  }

  mapVertices( graph, f ) {
    return graph.setIn( [ 'vertices' ], graph.vertices.map( f ) );
  }

  mapEdges( graph, f ) {
    return graph.setIn( [ 'edges' ], graph.edges.map( f ) );
  }

  mapGraphPorts( graph, f ) {
    return this.mapVertices( graph, v => this.mapVertexPorts( v, f ) );
  }

  insert( newGraph, renameRules ) {
    var disjointGraph;
    if( renameRules ) {
      const edgeRules = renameRules.get( 'edges' );
      const vertexRules = renameRules.get( 'vertices' );
      const edges = {};
      newGraph.edges.forEach( (edge, eId) => {
        const newId = edgeRules.get( eId );
        edges[ newId ] = edge.setIn( [ 'id' ], newId );
      } );
      const vertices = {};
      newGraph.vertices.forEach( (vertex, vId) => {
        const newId = vertexRules.get( vId );
        vertices[ newId ] = vertex.setIn( [ 'id' ], newId );
      } );
      disjointGraph = this.mapGraphPorts(
        Graph({ edges: Map( edges ), vertices: Map( vertices ) }),
        p => p.set( 'edgeId', (
          p.edgeId && edgeRules.get( p.edgeId ) ) || p.edgeId
        )
      );
    }
    else {
      disjointGraph = newGraph;
    }

    console.log( 'CURRENT G.E:', this.graph.edges.toJS() );
    console.log( 'NEW G.E:    ', disjointGraph.edges.toJS() );
    console.log( 'UNION G.E:', this.graph.edges.merge( disjointGraph.edges ).toJS() );

    console.log( 'CURRENT G.V:', this.graph.vertices.toJS() );
    console.log( 'NEW G.V:    ', disjointGraph.vertices.toJS() );
    console.log( 'UNION G.V:', this.graph.vertices.merge( disjointGraph.vertices ).toJS() );

    this.graph = this.graph
      .set( 'edges', this.graph.edges.merge( disjointGraph.edges ) )
      .set( 'vertices', this.graph.vertices.merge( disjointGraph.vertices ) );
  }

  renameRules( newGraph ) {
    return Map({
      edges: renameRules( this.graph.edges, newGraph.edges ),
      vertices: renameRules( this.graph.vertices, newGraph.vertices )
    });

    function renameRules( existingMap, newMap ) {
      const jsExistingKeys = existingMap.toJS();
      const takenKeys = {};
      const rules = {};
      newMap.forEach( (_, key) => {
        const newKey = disjointKey(
          takenKeys,
          disjointKey( jsExistingKeys, key )
        );
        rules[ key ] = newKey;
        takenKeys[ newKey ] = true;
      } );
      return Map( rules );
    }

    function disjointKey( jsMap, key ) {
      const matcher = /^(.*) ([0-9]+)$/;
      if( !jsMap.hasOwnProperty( key ) ) {
        return key;
      }
      if( !matcher.test( key ) ) {
        return disjointKey( jsMap, key + ' 1' );
      }
      const number = 1 + parseInt( key.replace( matcher, '$2' ), 10 );
      return disjointKey( jsMap, key.replace( matcher, '$1' ) + ' ' + number );
    }
  }

}

export default GraphStore;
