import { Coords } from '../model';
import {
  VertexMoved, EdgeMoved, EdgeInserted, EdgeMeasured, VertexMeasured
} from '../events/layout';
import { Record, Map } from 'immutable';

const Measurements = Record({ vertices: Map(), edges: Map() });

// TODO determine dynamically?
const edgeSize = 20;

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
    const fromMeasurements = this.measurements.vertices.get( from.vertexId );
    const toMeasurements = this.measurements.vertices.get( to.vertexId );

    const { coords, dimensions } = fromMeasurements.box;
    const toBox = toMeasurements.box;
    const left = (coords.left + dimensions.width + toBox.coords.left) / 2;

    const fromPortBox = fromMeasurements.getIn([ from.direction, from.portId ]);
    const toPortBox = toMeasurements.getIn([ to.direction, to.portId ]);
    const top = (
      coords.top + fromPortBox.top + toBox.coords.top + toPortBox.top
      - edgeSize
    ) / 2;

    return this.layout.setIn( [ 'edges', edge.id ], Coords({
      left: left,
      top: top
    }) );
  }

}

export default LayoutStore;
