import { Record, Set } from 'immutable';
import { Coords } from '../model';

import {
  SelectionDragged,
  SelectionCleared,
  SelectionMoved,
  VertexDeselected,
  VertexSelected,
  EdgeDeselected,
  EdgeSelected
} from '../events/selection';


const Selection = Record({
  vertices: Set(), edges: Set(), coords: null, dimensions: null
});

class SelectionStore {

  constructor( dispatcher, layoutStore, graphStore ) {
    this.selection = Selection();
    this.moveReference = { id: null };
    this.layoutStore = layoutStore;
    this.graphStore = graphStore;

    dispatcher.register( SelectionCleared, ev => { this.clear(); } );

    dispatcher.register( SelectionDragged, ev => {
      this.selection =
        this.selection.set( 'coords', ev.coords ).set( 'dimensions', ev.dimensions );
      this.updateRectangleContents();
    } );

    dispatcher.register( EdgeSelected, ev => {
      this.selection =
        this.selection.update( 'edges', _ => _.add( ev.edge.id ) );
    } );

    dispatcher.register( EdgeDeselected, ev => {
      this.selection =
        this.selection.update( 'edges', _ => _.remove( ev.edge.id ) );
    } );

    dispatcher.register( VertexSelected, ev => {
      this.selection =
        this.selection.update( 'vertices', _ => _.add( ev.vertex.id ) );
    } );

    dispatcher.register( VertexDeselected, ev => {
      this.selection =
        this.selection.update( 'vertices', _ => _.remove( ev.vertex.id ) );
    } );

    dispatcher.register( SelectionMoved, ev =>
      this.moveContents( ev.reference, ev.offset )
    );
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
