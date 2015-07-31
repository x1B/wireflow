import { Record, Set } from 'immutable';

import {
  RemoveVertex,
  RemoveEdge
} from '../actions/graph';

import {
  ResizeSelection,
  ClearSelection,
  MoveSelection,
  DeselectVertex,
  SelectVertex,
  DeselectEdge,
  SelectEdge,
  DeleteSelection
} from '../actions/selection';

import {
  CreateCheckpoint
} from '../actions/history';


const Selection = Record({
  vertices: Set(), edges: Set(), coords: null, dimensions: null
});

class SelectionStore {

  constructor( dispatcher, layoutStore, graphStore ) {
    this.selection = Selection();
    this.moveReference = { id: null };
    this.layoutStore = layoutStore;
    this.graphStore = graphStore;

    dispatcher.register( ClearSelection, ev => { this.clear(); } );

    dispatcher.register( ResizeSelection, ev => {
      this.selection =
        this.selection.set( 'coords', ev.coords ).set( 'dimensions', ev.dimensions );
      this.updateRectangleContents();
    } );

    dispatcher.register( SelectEdge, ev => {
      this.selection =
        this.selection.update( 'edges', _ => _.add( ev.edge.id ) );
    } );

    dispatcher.register( DeselectEdge, ev => {
      this.selection =
        this.selection.update( 'edges', _ => _.remove( ev.edge.id ) );
    } );

    dispatcher.register( SelectVertex, ev => {
      this.selection =
        this.selection.update( 'vertices', _ => _.add( ev.vertex.id ) );
    } );

    dispatcher.register( DeselectVertex, ev => {
      this.selection =
        this.selection.update( 'vertices', _ => _.remove( ev.vertex.id ) );
    } );

    dispatcher.register( MoveSelection, ev =>
      this.moveContents( ev.reference, ev.offset )
    );

    dispatcher.register( DeleteSelection, ev => {
      dispatcher.dispatch( CreateCheckpoint({ before: 'Delete' }) );

      const { vertices, edges } = this.selection;
      vertices.forEach( (_, id) => {
        dispatcher.dispatch( RemoveVertex( { vertexId: id } ) );
       } );
      edges.forEach( (_, id) => {
        dispatcher.dispatch( RemoveEdge( { edgeId: id } ) );
      } );
    } );
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

    const { coords, dimensions } = this.selection;
    const { measurements, layout } = this.layoutStore;
    this.selection = Selection({
      coords: this.selection.coords,
      dimensions: this.selection.dimensions,
      edges: nodeSet( measurements.edges.toJS(), layout.edges.toJS() ),
      vertices: nodeSet( measurements.vertices.toJS(), layout.vertices.toJS() )
    });

    function nodeSet( nodeMeasurements, nodeCoords ) {
      var matches = Set();
      for( const id in nodeMeasurements ) {
        if( !nodeMeasurements.hasOwnProperty( id ) ) { continue; }
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
