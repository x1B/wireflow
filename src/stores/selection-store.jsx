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

    dispatcher.register( SelectionCleared, ev => {
      this.selection =
        this.selection.set( 'edges', Set() ).set( 'vertices', Set() );
    } );

    dispatcher.register( SelectionDragged, ev => {
      this.selection =
        this.selection.set( 'box', ev.box );
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

}

export default SelectionStore;
