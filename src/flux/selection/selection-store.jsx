import { Set } from 'immutable';

import { SaveState } from '../history/history-actions';
import { RemoveVertex, RemoveEdge } from '../graph/graph-actions';
import { Graph, Directions } from '../graph/graph-model';
import { Layout } from '../layout/layout-model';

import { Clipboard, Selection } from './selection-model';

import {
  CopySelection,
  CutSelection,
  PasteClipboard,
  ResizeSelection,
  ClearSelection,
  MoveSelection,
  DeselectVertex,
  SelectVertex,
  DeselectEdge,
  SelectEdge,
  DeleteSelection
} from './selection-actions';


class SelectionStore {

  constructor( dispatcher, layoutStore, graphStore ) {
    this.dispatcher = dispatcher;
    this.layoutStore = layoutStore;
    this.graphStore = graphStore;

    this.selection = Selection();
    this.fakeClipboard = Clipboard();

    this.moveReference = { id: null };
    this.storeId = this.constructor.name;
    this.save();

    dispatcher.register( ClearSelection, act => {
      this.clear();
    } );

    dispatcher.register( RemoveVertex, act => {
      this.selection = this.selection
        .update( 'vertices', _ => _.remove( act.vertexId ) );
      this.save();
    } );

    dispatcher.register( RemoveEdge, act => {
      this.selection = this.selection
        .update( 'edges', _ => _.remove( act.edgeId ) );
      this.save();
    } );

    dispatcher.register( ResizeSelection, act => {
      const extensionOf =
        act.isExtension ? (this.selection.extensionOf || this.selection) : null;
      this.selection = this.selection
        .set( 'extensionOf', extensionOf )
        .set( 'coords', act.coords )
        .set( 'dimensions', act.dimensions );
      this.updateRectangleContents();
    } );

    dispatcher.register( SelectEdge, act => {
      this.selection = this.selection
        .update( 'edges', _ => _.add( act.edge.id ) );
      this.save();
    } );

    dispatcher.register( DeselectEdge, act => {
      this.selection = this.selection
        .update( 'edges', _ => _.remove( act.edge.id ) );
      this.save();
    } );

    dispatcher.register( SelectVertex, act => {
      this.selection = this.selection
        .update( 'vertices', _ => _.add( act.vertex.id ) );
      this.save();
    } );

    dispatcher.register( DeselectVertex, act => {
      this.selection = this.selection
        .update( 'vertices', _ => _.remove( act.vertex.id ) );
      this.save();
    } );

    dispatcher.register( MoveSelection, act => {
      this.moveContents( act.reference, act.offset );
      this.save();
    } );

    dispatcher.register( DeleteSelection, act => {
      this.delete();
    } );

    dispatcher.register( CutSelection, act => {
      this.copyToClipboard( act.cutEvent );
      this.delete();
    } );

    dispatcher.register( CopySelection, act => {
      this.copyToClipboard( act.copyEvent );
    } );

    dispatcher.register( PasteClipboard, act => {
      this.pasteClipboard( act.pasteEvent );
    } );
  }

  copyToClipboard( clipboardEvent ) {
    if( this.isEmpty() ) {
      return;
    }

    this.fakeClipboard = Clipboard( {
      graph: this.selectionGraph(),
      layout: this.selectionLayout()
    } );

    if( clipboardEvent ) {
      const jsonClipboard = JSON.stringify( this.fakeClipboard.toJS() );
      clipboardEvent.clipboardData.setData( 'application/json', jsonClipboard );
      clipboardEvent.clipboardData.setData( 'text/plain', jsonClipboard );
    }
  }

  pasteClipboard( pasteEvent ) {
    // :TODO: use event clipboard!

    const { graph, layout } = this.fakeClipboard;
    const renameRules = this.graphStore.renameRules( graph );
    this.graphStore.insert( graph, renameRules );
    this.layoutStore.insert( layout, renameRules );
    this.graphStore.pruneEmptyEdges();
  }

  delete() {
    const { dispatcher } = this;
    const { vertices, edges } = this.selection;
    vertices.forEach( (_, id) => {
      dispatcher.dispatch( RemoveVertex( { vertexId: id } ) );
     } );
    edges.forEach( (_, id) => {
      dispatcher.dispatch( RemoveEdge( { edgeId: id } ) );
    } );
  }

  save() {
    this.dispatcher.dispatch( SaveState({
      storeId: this.storeId,
      state: this.selection
    }) );
  }

  clear() {
    this.selection =
      this.selection.set( 'edges', Set() ).set( 'vertices', Set() );
  }

  moveContents( reference, offset ) {
    if( reference.id !== this.moveReference.id ) {
      this.moveReference = {
        id: reference.id,
        coords: reference.coords,
        layout: this.layoutStore.layout
      };
    }

    this.layoutStore.moveSelection(
      this.selection,
      this.moveReference.layout,
      offset
    );
  }

  updateRectangleContents() {
    if( !this.selection.dimensions ) {
      return;
    }

    const { extensionOf } = this.selection;
    const { measurements, layout } = this.layoutStore;
    const edgesToKeep = extensionOf ? extensionOf.edges : Set();
    const verticesToKeep = extensionOf ? extensionOf.vertices : Set();

    const vertexSet = this.nodeSet(
      measurements.vertices.toJS(),
      layout.vertices.toJS(),
      verticesToKeep
    );

    const edgeSet = this.nodeSet(
      measurements.edges.toJS(),
      layout.edges.toJS(),
      edgesToKeep
    );

    this.selection = Selection({
      coords: this.selection.coords,
      dimensions: this.selection.dimensions,
      extensionOf: this.selection.extensionOf,
      vertices: vertexSet,
      edges: edgeSet
    });
  }


  // pure helpers

  isEmpty() {
    return this.selection.vertices.isEmpty()
      && this.selection.edges.isEmpty();
  }

  implicitEdges( vertexSet ) {
    const vertices = this.graphStore.graph.vertices;
    const edgeIds = {};
    vertexSet.valueSeq()
      .map( vId => vertices.get( vId ) )
      .flatMap( v => Directions.flatMap( d => v.ports[ d ] ) )
      .filter( p => p.edgeId )
      .forEach( p => edgeIds[ p.edgeId ] = true );
    return Set.fromKeys( edgeIds );
  }

  selectionGraph() {
    const s = this.selection;
    const graph = this.graphStore.graph;
    const implicitEdges = this.implicitEdges( s.vertices );
    return Graph({
      vertices: graph.vertices.filter( (_, vId) => s.vertices.has( vId ) ),
      edges: graph.edges.filter( (_, eId) =>
        s.edges.has( eId ) || implicitEdges.has( eId )
      )
    });
  }

  selectionLayout() {
    const s = this.selection;
    const layout = this.layoutStore.layout;
    return Layout({
      vertices: layout.vertices.filter( (_, vId) => s.vertices.has( vId ) ),
      edges: layout.edges.filter( (_, eId) => s.edges.has( eId ) )
    });
  }

  nodeSet( jsNodeMeasurements, jsNodeCoords, toKeep ) {
    const { coords, dimensions } = this.selection;
    const matches = {};
    for( const id in jsNodeMeasurements ) {
      if( !jsNodeMeasurements.hasOwnProperty( id ) || !jsNodeCoords[ id ] ) {
        continue;
      }
      if( toKeep.has( id ) ) {
        matches[ id ] = true;
        continue;
      }
      const { left, top } = jsNodeCoords[ id ];
      const { width, height } = jsNodeMeasurements[ id ].dimensions;
      if( left + width < coords.left
          || left > coords.left + dimensions.width ) {
        continue;
      }
      if( top + height < coords.top
          || top > coords.top + dimensions.height ) {
        continue;
      }
      matches[ id ] = true;
    }
    return Set.fromKeys( matches );
  }
}

export default SelectionStore;
