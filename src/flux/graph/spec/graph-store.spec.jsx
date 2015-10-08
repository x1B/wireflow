import GraphStore from '../graph-store';
import DispatcherMock from '../../../testing/dispatcher-mock';

import diff from './diff';

import data from './data';
import { List, Map } from 'immutable';
import { SaveState } from '../../history/history-actions';
import {
  ConnectPort, DisconnectPort, RemoveVertex, RemoveEdge
} from '../graph-actions';
import { convert } from '../graph-model';


function dummyGraph() {
  return convert.graph( data.initial.graph );
}

function dummyTypes() {
  return convert.types( data.initial.types );
}


// Jasmine:
const { jasmine, describe, beforeEach, expect, it } = window;
const { any } = jasmine;

describe( 'A graph store', () => {

  var dispatcher;
  var store;

  beforeEach( () => {
    dispatcher = new DispatcherMock();
    store = new GraphStore( dispatcher, dummyGraph(), dummyTypes() );
  } );

  it( 'handles graph state actions', () => {
    expect( dispatcher.register )
      .toHaveBeenCalledWith( ConnectPort, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( DisconnectPort, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( RemoveEdge, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( RemoveVertex, any( Function ) );
  } );

  it( 'stores its initial state to history', () => {
    expect( dispatcher.dispatch )
      .toHaveBeenCalledWith( SaveState({
        storeId: 'GraphStore',
        state: List.of( dummyGraph(), dummyTypes() )
      }) );
  } );

  describe( 'asked to remove a vertex', () => {
    beforeEach( () => {
      dispatcher.handleAction( RemoveVertex({ vertexId: 'vA' }) );
    } );

    it( 'removes it from the graph state', () => {
      const actual = store.graph.toJS();
      const expected = convert.graph( data.initial.graph ).toJS();
      delete expected.vertices.vA;
      expect( diff( expected, actual ) ).toEqual( {} );
    } );
  } );

  describe( 'asked to remove a vertex owning simple edges', () => {
    beforeEach( () => {
      dispatcher.handleAction( RemoveVertex({ vertexId: 'vC' }) );
    } );

    it( 'removes it from the graph state along with edges owned by the vertex', () => {
      const actual = store.graph.toJS();
      const expected = convert.graph( data.initial.graph ).toJS();
      delete expected.vertices.vC;
      expected.vertices.vA.ports.outbound[ 1 ].edgeId = null;
      expected.vertices.vB.ports.outbound[ 1 ].edgeId = null;
      delete expected.edges.a0;
      expect( diff( expected, actual ) ).toEqual( {} );
    } );
  } );

  describe( 'asked to disconnect a slave port from a complex edge with 3 members', () => {
    beforeEach( () => {
      const vertex = store.graph.vertices.get( 'vC' );
      const port = vertex.ports.inbound.get( 0 );
      dispatcher.handleAction( DisconnectPort({
        vertex: vertex,
        port: port
      }) );
    } );

    it( 'removes it from the graph state', () => {
      const actual = store.graph.toJS();
      const expected = convert.graph( data.initial.graph ).toJS();
      expected.vertices.vC.ports.inbound[ 0 ].edgeId = null;
      expect( diff( expected, actual ) ).toEqual( {} );
    } );
  } );

  describe( 'asked to disconnect a master port from a complex edge with 3 members', () => {
    beforeEach( () => {
      const vertex = store.graph.vertices.get( 'vB' );
      const port = vertex.ports.outbound.get( 0 );
      dispatcher.handleAction( DisconnectPort({
        vertex: vertex,
        port: port
      }) );
    } );

    it( 'removes it from the graph state', () => {
      const actual = store.graph.toJS();
      const expected = convert.graph( data.initial.graph ).toJS();
      expected.vertices.vB.ports.outbound[ 0 ].edgeId = null;
      expect( diff( expected, actual ) ).toEqual( {} );
    } );
  } );

  describe( 'asked to disconnect the owning port from a simple edge', () => {
    var expected;
    beforeEach( () => {
      const vertex = store.graph.vertices.get( 'vC' );
      const port = vertex.ports.inbound.get( 3 );
      dispatcher.handleAction( DisconnectPort({
        vertex: vertex,
        port: port
      }) );
      expected = convert.graph( data.initial.graph ).toJS();
    } );

    it( 'removes the entire edge from the graph state', () => {
      const actual = store.graph.toJS();
      delete expected.edges.a0;
      expected.vertices.vC.ports.inbound[ 3 ].edgeId = null;
      expected.vertices.vA.ports.outbound[ 1 ].edgeId = null;
      expected.vertices.vB.ports.outbound[ 1 ].edgeId = null;
      expect( diff( expected, actual ) ).toEqual( {} );
    } );
  } );

  describe( 'asked to disconnect a non-owning port from a simple edge with 3 members', () => {
    var expected;
    beforeEach( () => {
      const vertex = store.graph.vertices.get( 'vB' );
      const port = vertex.ports.outbound.get( 1 );
      dispatcher.handleAction( DisconnectPort({
        vertex: vertex,
        port: port
      }) );
      expected = convert.graph( data.initial.graph ).toJS();
      expected.vertices.vB.ports.outbound[ 1 ].edgeId = null;
    } );

    it( 'just disconnects the port', () => {
      const actual = store.graph.toJS();
      expect( diff( expected, actual ) ).toEqual( {} );
    } );

    describe( 'then asked to disconnect the remaining non-owning port', () => {
      beforeEach( () => {
        const vertex = store.graph.vertices.get( 'vA' );
        const port = vertex.ports.outbound.get( 1 );
        dispatcher.handleAction( DisconnectPort({
          vertex: vertex,
          port: port
        }) );
        expected.vertices.vA.ports.outbound[ 1 ].edgeId = null;
      } );

      it( 'removes the entire edge from the graph state', () => {
        const actual = store.graph.toJS();
        delete expected.edges.a0;
        expected.vertices.vC.ports.inbound[ 3 ].edgeId = null;
        expect( diff( expected, actual ) ).toEqual( {} );
      } );
    } );
  } );

  describe( 'asked to remove a simple edge', () => {
    beforeEach( () => {
      dispatcher.handleAction( RemoveEdge({ edgeId: 'a0' }) );
    } );

    it( 'removes that edge', () => {
      const actual = store.graph.toJS();
      expect( actual.edges.a0 ).not.toBeDefined();
    } );

    it( 'disconnects all ports connected to it', () => {
      const actual = store.graph.toJS();
      const expected = convert.graph( data.initial.graph ).toJS();
      delete expected.edges.a0;
      expected.vertices.vA.ports.outbound[ 1 ].edgeId = null;
      expected.vertices.vB.ports.outbound[ 1 ].edgeId = null;
      expected.vertices.vC.ports.inbound[ 3 ].edgeId = null;
      expect( diff( expected, actual ) ).toEqual( {} );
    } );
  } );

  describe( 'asked to remove a complex edge', () => {
    beforeEach( () => {
      dispatcher.handleAction( RemoveEdge({ edgeId: 'r0' }) );
    } );

    it( 'removes that edge', () => {
      const actual = store.graph.toJS();
      expect( actual.edges.r0 ).not.toBeDefined();
    } );

    it( 'disconnects all ports connected to it', () => {
      const actual = store.graph.toJS();
      const expected = convert.graph( data.initial.graph ).toJS();
      delete expected.edges.r0;
      expected.vertices.vB.ports.outbound[ 0 ].edgeId = null;
      expected.vertices.vC.ports.inbound[ 0 ].edgeId = null;
      expected.vertices.vD.ports.inbound[ 0 ].edgeId = null;
      expect( diff( expected, actual ) ).toEqual( {} );
    } );
  } );

  describe( 'called to generate rename rules', () => {
    var rules;
    beforeEach( () => {
      const pseudoSelection = convert.graph({
        vertices: { vA: store.graph.vertices.get( 'vA' ) },
        edges: { a0: store.graph.edges.get( 'a0' ) }
      });
      rules = store.renameRules( pseudoSelection );
    } );

    it( 'provides a mapping for an isomorphic but disjoint graph', () => {
      expect( rules.toJS() ).toEqual( {
        vertices: { 'vA': 'vA 1' },
        edges: { 'a0': 'a0 1' }
      } );
    } );
  } );


  describe( 'called to apply rename rules', () => {
    var result;
    beforeEach( () => {
      const pseudoSelection = convert.graph({
        vertices: { vA: store.graph.vertices.get( 'vA' ) },
        edges: { a0: store.graph.edges.get( 'a0' ) }
      });
      const rules = Map({
        vertices: Map({ 'vA': 'vA 1' }),
        edges: Map({ 'a0': 'a0 1' })
      });
      result = store.applyRenameRules( pseudoSelection, rules );
    } );

    it( 'provides a mapping for an isomorphic but disjoint graph', () => {
      const expected = convert.graph({
        vertices: { 'vA 1': store.graph.vertices.get( 'vA' ) },
        edges: { 'a0 1': store.graph.edges.get( 'a0' ) }
      }).toJS();
      expected.vertices[ 'vA 1' ].ports.outbound[ 1 ].edgeId = 'a0 1';
      expect( diff( expected, result.toJS() ) ).toEqual( {} );
    } );
  } );


} );
