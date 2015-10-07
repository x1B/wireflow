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
        const a = store.graph.toJS();
        const b = data.withoutVertexA.graph;
        expect( diff( a, b ) ).toEqual( {} );
        expect( diff( b, a ) ).toEqual( {} );
      } );
    } );


    describe( 'asked to remove a vertex owning simple edges', () => {
      beforeEach( () => {
        dispatcher.handleAction( RemoveVertex({ vertexId: 'vC' }) );
      } );

      it( 'removes it from the graph state', () => {
        const a = store.graph.toJS();
        const b = data.withoutVertexC.graph;
        expect( diff( a, b ) ).toEqual( {} );
        expect( diff( b, a ) ).toEqual( {} );
      } );

    } );
} );
