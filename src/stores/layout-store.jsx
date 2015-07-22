import { VertexMoved, EdgeMoved } from '../events/layout';


/**
 * Manages the graph layout prop.
 */
class LayoutStore {

  constructor( dispatcher, layout ) {
    this.dispatcher = dispatcher;
    this.layout = layout;

    dispatcher.register( VertexMoved, ev => {
      this.layout = this.layout.setIn( [ 'vertices', ev.vertex.id ], ev.to );
    } );

    dispatcher.register( EdgeMoved, ev => {
      this.layout = this.layout.setIn( [ 'edges', ev.edge.id ], ev.to );
    } );

  }

}

export default LayoutStore;
