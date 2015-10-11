import LayoutStore from '../layout-store';
import DispatcherMock from '../../../testing/dispatcher-mock';
import diff from '../../../testing/diff';

import data from './data';
import graphData from '../../graph/spec/data';

import { List } from 'immutable';
import { RemoveEdge, RemoveVertex } from '../../graph/graph-actions';
import {
  MeasureVertex,
  MeasureEdge,
  MoveEdge,
  MoveVertex,
  HandleEdgeInserted,
  AutoLayout
} from '../layout-actions';
import { SaveState } from '../../history/history-actions';

import { convert as graphConvert } from '../../graph/graph-model';
import { convert } from '../layout-model';

function dummyGraph() {
  return graphConvert.graph( graphData.initial.graph );
}

function dummyLayout() {
  return convert.layout( data.initial.layout );
}

function dummyMeasurements() {
  return convert.measurements( data.initial.measurements );
}


// Jasmine:
const { jasmine, describe, beforeEach, expect, it } = window;
const { any } = jasmine;

describe( 'A layout store', () => {

  var dispatcher;
  var store;
  var graphStoreMock;

  beforeEach( () => {
    dispatcher = new DispatcherMock();
    graphStoreMock = {};
    store = new LayoutStore( dispatcher, dummyLayout(), graphStoreMock );
  } );

  it( 'stores the layout passed at creation', () => {
    const expected = dummyLayout().vertices.get( 'vA' ).toJS();
    const actual = store.layout.vertices.get( 'vA' ).toJS();
    expect( diff( expected, actual ) ).toEqual({});
  } );

  it( 'handles layout state actions', () => {
    expect( dispatcher.register )
      .toHaveBeenCalledWith( MeasureVertex, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( MeasureEdge, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( MoveEdge, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( MoveVertex, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( HandleEdgeInserted, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( AutoLayout, any( Function ) );
  } );

  it( 'stores its initial state to history', () => {
    expect( dispatcher.dispatch )
      .toHaveBeenCalledWith( SaveState({
        storeId: 'LayoutStore',
        state: List.of( dummyLayout(), jasmine.any( Object ) )
      }) );
  } );

  describe( 'asked to store edge measurements', () => {
    beforeEach( () => {
      dispatcher.handleAction( MeasureEdge({
        edge: dummyGraph().edges.get( 'r0' ),
        measurements: dummyMeasurements().edges.get( 'r0' )
      }) );
    } );

    it( 'adds that edge to the measurements', () => {
      expect( store.measurements.edges.has( 'r0' ) ).toBe( true );
    } );
  } );

  describe( 'asked to remove a complex edge', () => {
    beforeEach( () => {
      dispatcher.handleAction( MeasureEdge({
        edge: dummyGraph().edges.get( 'r0' ),
        measurements: dummyMeasurements().edges.get( 'r0' )
      }) );
      dispatcher.handleAction( RemoveEdge({ edgeId: 'r0' }) );
    } );

    it( 'removes that edge from the layout', () => {
      const actual = store.layout.toJS();
      expect( actual.edges.r0 ).not.toBeDefined();
    } );

    it( 'removes that edge from the measurements', () => {
      const actual = store.measurements.toJS();
      expect( actual.edges.r0 ).not.toBeDefined();
    } );
  } );

  describe( 'asked to store vertex measurements', () => {
    beforeEach( () => {
      dispatcher.handleAction( MeasureVertex({
        vertex: dummyGraph().vertices.get( 'vA' ),
        measurements: dummyMeasurements().vertices.get( 'vA' )
      }) );
    } );

    it( 'adds that vertex to the measurements', () => {
      expect( store.measurements.vertices.has( 'vA' ) ).toBe( true );
    } );
  } );

  describe( 'asked to remove a vertex', () => {
    beforeEach( () => {
      dispatcher.handleAction( MeasureVertex({
        vertex: dummyGraph().vertices.get( 'vA' ),
        measurements: dummyMeasurements().vertices.get( 'vA' )
      }) );
      dispatcher.handleAction( RemoveVertex({ vertexId: 'vA' }) );
    } );

    it( 'removes that vertex from the layout', () => {
      expect( store.layout.vertices.has( 'vA' ) ).toBe( false );
    } );

    it( 'removes that vertex from the measurements', () => {
      expect( store.measurements.vertices.has( 'vA' ) ).toBe( false );
    } );
  } );

} );
