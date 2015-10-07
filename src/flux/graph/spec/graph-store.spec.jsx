import GraphStore from '../graph-store';
import DispatcherMock from '../../../testing/dispatcher-mock';

import diff from './diff';

import data from './data';
import { List } from 'immutable';
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
        const expected = data.withoutVertexA.graph;
        expect( diff( actual, expected ) ).toEqual( {} );
        expect( diff( expected, actual ) ).toEqual( {} );
      } );
    } );


    describe( 'asked to remove a vertex owning simple edges', () => {
      beforeEach( () => {
        dispatcher.handleAction( RemoveVertex({ vertexId: 'vC' }) );
      } );

      it( 'removes it from the graph state along with edges owned by the vertex', () => {
        const actual = store.graph.toJS();
        const expected = data.withoutVertexC.graph;
        expect( diff( actual, expected ) ).toEqual( {} );
        expect( diff( expected, actual ) ).toEqual( {} );
      } );
    } );

    describe( 'asked to disconnect a slave port from a complex edge with three members', () => {
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
        delete expected.vertices.vC.ports.inbound[ 0 ].edgeId;
        expect( diff( actual, expected ) ).toEqual( {} );
        expect( diff( expected, actual ) ).toEqual( {} );
      } );
    } );


    describe( 'asked to disconnect a master port from a complex edge with three members', () => {
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
        delete expected.vertices.vB.ports.outbound[ 0 ].edgeId;
        expect( diff( actual, expected ) ).toEqual( {} );
        expect( diff( expected, actual ) ).toEqual( {} );
      } );
    } );


    describe( 'asked to disconnect the owning port from a simple edge', () => {
      beforeEach( () => {
        const vertex = store.graph.vertices.get( 'vC' );
        const port = vertex.ports.inbound.get( 3 );
        dispatcher.handleAction( DisconnectPort({
          vertex: vertex,
          port: port
        }) );
      } );

      it( 'removes the entire edge from the graph state', () => {
        const actual = store.graph.toJS();
        const expected = convert.graph( data.initial.graph ).toJS();
        delete expected.edges.a0;
        delete expected.vertices.vC.ports.inbound[ 3 ].edgeId;
        delete expected.vertices.vA.ports.outbound[ 1 ].edgeId;
        delete expected.vertices.vB.ports.outbound[ 1 ].edgeId;
        expect( diff( actual, expected ) ).toEqual( {} );
        expect( diff( expected, actual ) ).toEqual( {} );
      } );
    } );

} );
