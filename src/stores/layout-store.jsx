import { Coords } from '../model';
import {
  VertexMoved, EdgeMoved, EdgeInserted, EdgeMeasured, VertexMeasured
} from '../events/layout';
import { Record, Map } from 'immutable';

const Measurements = Record({ vertices: Map(), edges: Map() });


/**
 * Manages the graph layout prop.
 */
class LayoutStore {

  constructor( dispatcher, layout ) {
    this.dispatcher = dispatcher;
    this.layout = layout;
    this.measurements = Measurements();

    dispatcher.register( VertexMeasured, ev => {
      this.measurements = this.measurements.setIn(
        [ 'vertices', ev.vertex.id ],
        ev.measurements
      );
    } );

    dispatcher.register( EdgeMeasured, ev => {
      this.measurements = this.measurements.setIn(
        [ 'edges', ev.edge.id ],
        ev.measurements
      );
    } );

    dispatcher.register( VertexMoved, ev => {
      this.layout = this.layout.setIn( [ 'vertices', ev.vertex.id ], ev.to );
    } );

    dispatcher.register( EdgeMoved, ev => {
      this.layout = this.layout.setIn( [ 'edges', ev.edge.id ], ev.to );
    } );

    dispatcher.register( EdgeInserted, ev => {
      this.layout = this.placeEdge( ev.edge, ev.from, ev.to );
    } );

  }

  placeEdge( edge, from, to ) {
    const { vertices } = this.layout;
    const fromCoords = vertices.get( from.vertexId );
    const toCoords = vertices.get( to.vertexId );

    return this.layout.setIn( [ 'edges', edge.id ], Coords({
      left: (fromCoords.left + toCoords.left) / 2,
      top: (fromCoords.top + toCoords.top) / 2
    }) );
  }

}

export default LayoutStore;
