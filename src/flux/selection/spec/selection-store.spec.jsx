import { Set } from 'immutable';

import SelectionStore from '../selection-store';
import DispatcherMock from '../../../testing/dispatcher-mock';
import diff from '../../../testing/diff';

import {
  CopySelection,
  CutSelection,
  PasteClipboard,
  DeleteSelection,
  ResizeSelection,
  MoveSelection,
  ClearSelection,
  DeselectVertex,
  SelectVertex,
  DeselectEdge,
  SelectEdge
} from '../selection-actions';

import {
  Coords,
  Dimensions,
  convert as layoutConvert
} from '../../layout/layout-model';

import {
  Selection
} from '../selection-model';

import {
  Edge,
  Vertex,
  convert as graphConvert
} from '../../graph/graph-model';

import {
  RemoveVertex,
  RemoveEdge
} from '../../graph/graph-actions';

import layoutData from '../../layout/spec/data';
import graphData from '../../graph/spec/data';

function dummyGraph() {
  return graphConvert.graph( graphData.initial.graph );
}

function dummyLayout() {
  return layoutConvert.layout( layoutData.initial.layout );
}

function dummyMeasurements() {
  return layoutConvert.measurements( layoutData.initial.measurements );
}




// Jasmine:
const { jasmine, describe, beforeEach, expect, it } = window;
const { any } = jasmine;

describe( 'A selection store', () => {

  var dispatcher;
  var layoutStoreMock;
  var graphStoreMock;
  var store;

  beforeEach( () => {
    dispatcher = new DispatcherMock();
    layoutStoreMock = {
      layout: dummyLayout(),
      measurements: dummyMeasurements()
    };
    graphStoreMock = {
      graph: dummyGraph()
    };
    store = new SelectionStore( dispatcher, layoutStoreMock, graphStoreMock );
  } );

  it( 'handles selection state actions', () => {
    expect( dispatcher.register )
      .toHaveBeenCalledWith( CopySelection, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( CutSelection, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( ClearSelection, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( PasteClipboard, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( DeleteSelection, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( ResizeSelection, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( MoveSelection, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( DeselectVertex, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( SelectVertex, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( DeselectEdge, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( SelectEdge, any( Function ) );
  } );

  it( 'sets up an empty selection upon creation', () => {
    const actual = store.selection.toJS();
    expect( diff( Selection().toJS(), actual ) ).toEqual({});
  } );

  describe( 'asked to select a vertex', () => {
    beforeEach( () => {
      dispatcher.handleAction( SelectVertex({ vertex: Vertex({ id: 'vA' }) }) );
    } );

    it( 'adds the vertex id to the selection', () => {
      const actual = store.selection.vertices.toJS();
      expect( diff( Set.of( 'vA' ).toJS(), actual ) ).toEqual({});
    } );

    describe( 'and to de-select it again', () => {
      beforeEach( () => {
        dispatcher.handleAction(
          DeselectVertex({ vertex: Vertex({ id: 'vA' }) })
        );
      } );

      it( 'removes the vertex id from the selection', () => {
        const actual = store.selection.toJS();
        expect( diff( Selection().toJS(), actual ) ).toEqual({});
      } );
    } );

    describe( 'and then to clear the selection', () => {
      beforeEach( () => {
        dispatcher.handleAction( ClearSelection() );
      } );

      it( 'removes the vertex id from the selection', () => {
        const actual = store.selection.vertices.toJS();
        expect( diff( Set().toJS(), actual ) ).toEqual({});
      } );
    } );
  } );

  describe( 'asked to select an edge', () => {
    beforeEach( () => {
      dispatcher.handleAction( SelectEdge({ edge: Edge({ id: 'r0' }) }) );
    } );

    it( 'adds the edge id to the selection', () => {
      const expected = Set.of( 'r0' ).toJS();
      const actual = store.selection.edges.toJS();
      expect( diff( expected, actual ) ).toEqual({});
    } );

    describe( 'and to de-select it again', () => {
      beforeEach( () => {
        dispatcher.handleAction( DeselectEdge({ edge: Edge({ id: 'r0' }) }) );
      } );

      it( 'removes the edge id from the selection', () => {
        const actual = store.selection.edges.toJS();
        expect( diff( Selection().edges.toJS(), actual ) ).toEqual({});
      } );
    } );

    describe( 'and then to clear the selection', () => {
      beforeEach( () => {
        dispatcher.handleAction( ClearSelection() );
      } );

      it( 'removes the edge id from the selection', () => {
        const actual = store.selection.edges.toJS();
        expect( diff( Set().toJS(), actual ) ).toEqual({});
      } );
    } );
  } );

  describe( 'asked to size the (not yet existing) selection rectangle', () => {
    beforeEach( () => {
      dispatcher.handleAction( ResizeSelection({
        coords: Coords({ left: 55, top: 40 }),
        dimensions: Dimensions({ width: 750, height: 140 })
      }) );
    } );

    it( 'sets up an initial rectangle', () => {
      const expected = {
        coords: Coords({ left: 55, top: 40 }).toJS(),
        dimensions: Dimensions({ width: 750, height: 140 }).toJS()
      };
      const actual = store.selection.toJS();
      expect( diff( expected.coords, actual.coords ) ).toEqual({});
      expect( diff( expected.dimensions, actual.dimensions ) ).toEqual({});
    } );

    it( 'adds intersecting vertices to the selection', () => {
      const actual = store.selection.vertices.toJS();
      expect( diff( Set.of( 'vA', 'vC' ).toJS(), actual ) ).toEqual({});
    } );

    it( 'adds intersecting edges to the selection', () => {
      const actual = store.selection.edges.toJS();
      expect( diff( Set.of( 'r0' ).toJS(), actual ) ).toEqual({});
    } );

    describe( 'then asked to grow it', () => {
      beforeEach( () => {
        dispatcher.handleAction( ResizeSelection({
          coords: Coords({ left: 50, top: 40 }),
          dimensions: Dimensions({ width: 800, height: 600 })
        }) );
      } );

      it( 'adds intersecting vertices to the selection', () => {
        const actual = store.selection.vertices.toJS();
        const expected = Set.of( 'vA', 'vB', 'vC', 'vD' ).toJS();
        expect( diff( expected, actual ) ).toEqual({});
      } );

      it( 'adds intersecting edges to the selection', () => {
        const actual = store.selection.edges.toJS();
        expect( diff( Set.of( 'r0', 'f0' ).toJS(), actual ) ).toEqual({});
      } );
    } );

    describe( 'then asked to shrink it', () => {
      beforeEach( () => {
        dispatcher.handleAction( ResizeSelection({
          coords: Coords({ left: 50, top: 40 }),
          dimensions: Dimensions({ width: 400, height: 120 })
        }) );
      } );

      it( 'removes non-intersecting vertices to the selection', () => {
        const actual = store.selection.vertices.toJS();
        expect( diff( Set.of( 'vA' ).toJS(), actual ) ).toEqual({});
      } );

      it( 'removes non-intersecting edges to the selection', () => {
        const actual = store.selection.edges.toJS();
        expect( diff( Set.of().toJS(), actual ) ).toEqual({});
      } );
    } );


    describe( 'then asked to delete it', () => {
      beforeEach( () => {
        dispatcher.handleAction( DeleteSelection() );
      } );

      it( 'dispatches actions to remove the selected vertices', () => {
        expect( dispatcher.dispatch ).toHaveBeenCalledWith( RemoveVertex({
          vertexId: 'vA'
        }) );
        expect( dispatcher.dispatch ).toHaveBeenCalledWith( RemoveVertex({
          vertexId: 'vC'
        }) );
      } );

      it( 'dispatches actions to remove the selected edges', () => {
        expect( dispatcher.dispatch ).toHaveBeenCalledWith( RemoveEdge({
          edgeId: 'r0'
        }) );
      } );
    } );

    describe( 'when selected nodes are deleted', () => {
      beforeEach( () => {
        dispatcher.handleAction( RemoveVertex({
          vertexId: 'vA'
        }) );
        dispatcher.handleAction( RemoveEdge({
          edgeId: 'r0'
        }) );

      } );

      it( 'modifies the selection vertices accordingly', () => {
        const actual = store.selection.vertices.toJS();
        expect( diff( Set.of( 'vC' ).toJS(), actual ) ).toEqual({});
      } );

      it( 'modifies the selection edges accordingly', () => {
        const actual = store.selection.edges.toJS();
        expect( diff( Set.of().toJS(), actual ) ).toEqual({});
      } );
    } );
  } );

} );
