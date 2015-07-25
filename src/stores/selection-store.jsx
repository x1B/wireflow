import { Record, Set } from 'immutable';

import {
  SelectionDragged,
  SelectionCleared,
  VertexDeselected,
  VertexSelected,
  EdgeDeselected,
  EdgeSelected
} from '../events/selection';


const Selection = Record({ vertices: Set(), edges: Set(), box: null });

class SelectionStore {

  constructor( dispatcher, layoutStore ) {
    this.selection = Selection();
    this.layoutStore = layoutStore;

    dispatcher.register( SelectionCleared, ev => { this.clear(); } );

    dispatcher.register( SelectionDragged, ev => {
      this.selection =
        this.selection.set( 'box', ev.box );
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

  }

  clear() {
    this.selection =
      this.selection.set( 'edges', Set() ).set( 'vertices', Set() );
  }

  updateRectangleContents() {
    if( !this.selection.box ) {
      return;
    }

    const { box: { coords, dimensions } } = this.selection;
    const { measurements: { edges, vertices } } = this.layoutStore;
    this.selection = Selection({
      box: this.selection.box,
      edges: nodeSet( edges ),
      vertices: nodeSet( vertices )
    });

    function nodeSet( measurements ) {
      var matches = Set();
      const boxes = measurements.toJS();
      for( const id in boxes ) {
        if( !boxes.hasOwnProperty( id ) ) { continue; }
        const nodeBox = boxes[ id ].box;
        const { left, top } = nodeBox.coords;
        const { width, height } = nodeBox.dimensions;
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
