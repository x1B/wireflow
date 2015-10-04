import { Record, Set } from 'immutable';

import { SaveState } from '../history/history-actions';
import { RemoveVertex, RemoveEdge } from '../graph/graph-actions';

import { Clipboard } from './selection-model';
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


const Selection = Record({
  vertices: Set(),
  edges: Set(),
  extensionOf: null,
  coords: null,
  dimensions: null
});

class SelectionStore {

  constructor( dispatcher, selectionStore, layoutStore, graphStore ) {
    this.dispatcher = dispatcher;
    this.fakeClipboard = Clipboard();
    this.moveReference = { id: null };
    this.layoutStore = layoutStore;
    this.graphStore = graphStore;

    this.storeId = this.constructor.name;
    this.selection = Selection();
    this.save();


    dispatcher.register( ClearSelection, act => { this.clear(); } );

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
      this.selection = this.selection
        .set( 'extensionOf', act.isExtension ? (this.selection.extensionOf || this.selection) : null );
      this.selection = this.selection
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

    dispatcher.register( DeleteSelection, _ => this.delete() );

    dispatcher.register( CutSelection, act => {
      this.copyToClipboard();
      this.delete();
    } );
  }

  copyToClipboard() {
    // :TODO:
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

  isEmpty() {
    return this.selection.vertices.isEmpty()
      && this.selection.edges.isEmpty();
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

    const { coords, dimensions, extensionOf } = this.selection;
    const { measurements, layout } = this.layoutStore;
    const edgesToKeep = extensionOf ? extensionOf.edges : Set();
    const verticesToKeep = extensionOf ? extensionOf.vertices : Set();

    this.selection = Selection({
      coords: this.selection.coords,
      dimensions: this.selection.dimensions,
      extensionOf: this.selection.extensionOf,
      vertices: nodeSet(
        measurements.vertices.toJS(), layout.vertices.toJS(), verticesToKeep
      ),
      edges: nodeSet(
        measurements.edges.toJS(), layout.edges.toJS(), edgesToKeep
      )
    });

    function nodeSet( nodeMeasurements, nodeCoords, toKeep ) {
      var matches = Set();
      for( const id in nodeMeasurements ) {
        if( !nodeMeasurements.hasOwnProperty( id ) ) { continue; }
        if( toKeep.has( id ) ) {
          matches = matches.add( id );
          continue;
        }
        const { left, top } = nodeCoords[ id ];
        const { width, height } = nodeMeasurements[ id ].dimensions;
        if( left + width < coords.left
            || left > coords.left + dimensions.width ) {
          continue;
        }
        if( top + height < coords.top
            || top > coords.top + dimensions.height ) {
          continue;
        }
        matches = matches.add( id );
      }
      return matches;
    }
  }

}

export default SelectionStore;
