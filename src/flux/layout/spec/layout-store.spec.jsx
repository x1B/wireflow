import LayoutStore from '../layout-store';
import DispatcherMock from '../../../testing/dispatcher-mock';
import diff from '../../../testing/diff';

import data from './data';
import graphData from '../../graph/spec/data';

import { List, Map } from 'immutable';
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

import {
  convert as graphConvert,
  Edge,
  Connectable,
  IN,
  OUT
} from '../../graph/graph-model';
import { convert, Coords } from '../layout-model';

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
      dispatcher.handleAction( RemoveEdge({ edgeId: 'r0' }) );
    } );

    it( 'removes that edge from the layout', () => {
      const actual = store.layout.toJS();
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
      dispatcher.handleAction( RemoveVertex({ vertexId: 'vA' }) );
    } );

    it( 'removes that vertex from the layout', () => {
      expect( store.layout.vertices.has( 'vA' ) ).toBe( false );
    } );

    it( 'removes that vertex from the measurements', () => {
      expect( store.measurements.vertices.has( 'vA' ) ).toBe( false );
    } );
  } );

  describe( 'asked to move a vertex', () => {
    beforeEach( () => {
      dispatcher.handleAction( MoveVertex({
        vertex: dummyGraph().vertices.get( 'vA' ),
        to: Coords({ left: 17, top: 4 })
      }) );
    } );

    it( 'updates that vertices\' coordinates', () => {
      expect( store.layout.vertices.get( 'vA' ).toJS() ).toEqual({
        left: 17, top: 4
      });
    } );
  } );

  describe( 'asked to move an edge', () => {
    beforeEach( () => {
      dispatcher.handleAction( MoveEdge({
        edge: dummyGraph().edges.get( 'r0' ),
        to: Coords({ left: 170, top: 40 })
      }) );
    } );

    it( 'updates that edges\' coordinates', () => {
      expect( store.layout.edges.get( 'r0' ).toJS() ).toEqual({
        left: 170, top: 40
      });
    } );
  } );

  describe( 'with measurements for all nodes', () => {

    beforeEach( () => {
      dummyMeasurements().vertices.forEach( (measurements, vId) => {
        const vertex = dummyGraph().vertices.get( vId );
        dispatcher.handleAction( MeasureVertex({ vertex, measurements }) );
      });
      dummyMeasurements().edges.forEach( (measurements, eId) => {
        const edge = dummyGraph().edges.get( eId );
        dispatcher.handleAction( MeasureEdge({ edge, measurements }) );
      });
    } );

    describe( 'asked to remove a vertex', () => {
      beforeEach( () => {
        dispatcher.handleAction( RemoveVertex({ vertexId: 'vA' }) );
      } );
      it( 'removes that vertex from the measurements', () => {
        expect( store.measurements.vertices.has( 'vA' ) ).toBe( false );
      } );
    } );

    describe( 'asked to remove a complex edge', () => {
      beforeEach( () => {
        dispatcher.handleAction( RemoveEdge({ edgeId: 'r0' }) );
      } );

      it( 'removes that edge from the measurements', () => {
        const actual = store.measurements.toJS();
        expect( actual.edges.r0 ).not.toBeDefined();
      } );
    } );

    describe( 'notified of a newly inserted complex edge', () => {
      beforeEach( () => {
        dispatcher.handleAction( HandleEdgeInserted({
          edge: Edge({ id: 'r1', type: 'RESOURCE' }),
          from: Connectable({ vertexId: 'vA', portId: 'o0', direction: OUT }),
          to: Connectable({ vertexId: 'vC', portId: 'i1', direction: IN })
        }) );
      } );

      it( 'places it between the ports it connects', () => {
        const edgeOffset = 10;
        const actual = store.layout.toJS();
        expect( actual.edges.r1 ).toBeDefined();
        expect( actual.edges.r1 ).toEqual({
          left: -edgeOffset + 0.5 * (
            data.initial.layout.vertices.vA.left +
            data.initial.measurements.vertices.vA.outbound.o0.left +
            data.initial.layout.vertices.vC.left +
            data.initial.measurements.vertices.vC.inbound.i1.left ),
          top: -edgeOffset + 0.5 * (
            data.initial.layout.vertices.vA.top +
            data.initial.measurements.vertices.vA.outbound.o0.top +
            data.initial.layout.vertices.vC.top +
            data.initial.measurements.vertices.vC.inbound.i1.top )
        });
      } );
    } );
  } );

  describe( 'called to apply rename rules', () => {
    var result;
    beforeEach( () => {
      const pseudoSelection = convert.layout({
        vertices: {
          vA: data.initial.layout.vertices.vA,
          vB: data.initial.layout.vertices.vB
        },
        edges: { a0: data.initial.layout.edges.a0 }
      });
      const rules = Map({
        vertices: Map({ 'vA': 'vA 1' }),
        edges: Map({ 'a0': 'a0 1' })
      });
      result = store.applyRenameRules( pseudoSelection, rules );
    } );

    it( 'generates an isomorphic layout based on these rules', () => {
      const expected = convert.layout({
        vertices: {
          'vA 1': data.initial.layout.vertices.vA,
          vB: data.initial.layout.vertices.vB
        },
        edges: { 'a0 1': data.initial.layout.edges.a0 }
      }).toJS();
      expect( diff( expected, result.toJS() ) ).toEqual( {} );
    } );
  } );

  describe( 'called to insert a disjoint layout', () => {
    beforeEach( () => {
      const pseudoSelection = convert.layout({
        vertices: { vA: data.initial.layout.vertices.vA },
        edges: { a0: data.initial.layout.edges.a0 }
      });
      const rules = Map({
        vertices: Map({ 'vA': 'vA 1' }),
        edges: Map({ 'a0': 'a0 1' })
      });
      const subLayout = store.applyRenameRules( pseudoSelection, rules );
      store.insert( subLayout );
    } );

    it( 'extends its own layout with the supplied layout', () => {
      const vA1 = copy( data.initial.layout.vertices.vA );
      const a01 = copy( data.initial.layout.edges.a0 );
      const expected = copy( data.initial.layout );
      expected.edges[ 'a0 1' ] = a01;
      expected.vertices[ 'vA 1' ] = vA1;
      expect( diff( expected, store.layout.toJS() ) ).toEqual( {} );
    } );
  } );

} );

function copy( _ ) { return JSON.parse( JSON.stringify( _ ) ); }
