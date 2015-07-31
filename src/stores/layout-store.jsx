import { Coords, Measurements } from '../model';
import {
  MoveVertex, MoveEdge, HandleEdgeInserted, MeasureEdge, MeasureVertex
} from '../actions/layout';
import * as settings from '../util/settings';
const { layout: { edgeOffset } } = settings;


/**
 * Manages the graph layout prop.
 */
class LayoutStore {

  constructor( dispatcher, layout ) {
    this.dispatcher = dispatcher;
    this.layout = layout;
    this.measurements = Measurements();

    dispatcher.register( MeasureVertex, ev => {
      this.measurements = this.measurements.setIn(
        [ 'vertices', ev.vertex.id ],
        ev.measurements
      );
    } );

    dispatcher.register( MeasureEdge, ev => {
      this.measurements = this.measurements.setIn(
        [ 'edges', ev.edge.id ],
        ev.measurements
      );
    } );

    dispatcher.register( MoveVertex, ev => {
      this.layout = this.layout.setIn( [ 'vertices', ev.vertex.id ], ev.to );
    } );

    dispatcher.register( MoveEdge, ev => {
      this.layout = this.layout.setIn( [ 'edges', ev.edge.id ], ev.to );
    } );

    dispatcher.register( HandleEdgeInserted, ev => {
      this.layout = this.placeEdge( ev.edge, ev.from, ev.to );
    } );
  }


  moveSelection( selection, referenceLayout, offset ) {
    const { left, top } = offset;
    var targetLayout = referenceLayout;
    [ 'vertices', 'edges' ].forEach( kind =>
      selection[ kind ].forEach( id => {
        targetLayout = targetLayout.updateIn( [ kind, id ], coords =>
          Coords({
            left: coords.left + left,
            top: coords.top + top
          })
        );
      } )
    );
    this.layout = targetLayout;
  }


  placeEdge( edge, from, to ) {
    const { measurements, layout } = this;
    const fromMeasurements = measurements.vertices.get( from.vertexId );
    const toMeasurements = measurements.vertices.get( to.vertexId );
    const fromCoords = layout.vertices.get( from.vertexId );
    const toCoords = layout.vertices.get( to.vertexId );

    const left = (fromCoords.left + fromMeasurements.dimensions.width + toCoords.left) / 2;

    const fromPortBox = fromMeasurements.getIn([ from.direction, from.portId ]);
    const toPortBox = toMeasurements.getIn([ to.direction, to.portId ]);
    const top = (
      fromCoords.top + fromPortBox.top + toCoords.top + toPortBox.top
      - edgeOffset
    ) / 2;

    return this.layout.setIn( [ 'edges', edge.id ], Coords({
      left: left,
      top: top
    }) );
  }
}

export default LayoutStore;
