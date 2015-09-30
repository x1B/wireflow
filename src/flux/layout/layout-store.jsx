import { List, Map } from 'immutable';

import settings from '../../util/settings';
import { calculateLayout } from '../../util/layout';

import { RemoveVertex, RemoveEdge } from '../graph/graph-actions';
import { SaveState, RestoreState } from '../history/history-actions';
import { Coords, Measurements, convert } from './layout-model';
import {
  AutoLayout,
  HandleEdgeInserted,
  MeasureEdge,
  MeasureVertex,
  MoveEdge,
  MoveVertex
} from './layout-actions';


const { layout: { edgeOffset } } = settings;

/**
 * Manages the graph layout prop.
 */
class LayoutStore {

  constructor( dispatcher, layout, graphStore ) {
    this.dispatcher = dispatcher;

    this.graphStore = graphStore;
    this.storeId = this.constructor.name;
    this.layout = layout;
    this.measurements = Measurements();
    this.save();


    dispatcher.register( MeasureVertex, ev => {
      this.measurements = this.measurements.setIn(
        [ 'vertices', ev.vertex.id ],
        ev.measurements
      );
      this.save();
    } );

    dispatcher.register( MeasureEdge, ev => {
      this.measurements = this.measurements.setIn(
        [ 'edges', ev.edge.id ],
        ev.measurements
      );
      this.save();
    } );

    dispatcher.register( AutoLayout, ev => {
      this.layout = convert.layout(
        calculateLayout( graphStore.graph, Map(this.measurements) )
      );
      this.save();
    } );

    dispatcher.register( RemoveVertex, ev => {
      this.layout = this.layout.removeIn( [ 'vertices', ev.vertexId ] );
      this.save();
    } );

    dispatcher.register( RemoveEdge, ev => {
      this.layout = this.layout.removeIn( [ 'vertices', ev.edgeId ] );
      this.save();
    } );

    dispatcher.register( MoveVertex, ev => {
      this.layout = this.layout.setIn( [ 'vertices', ev.vertex.id ], ev.to );
      this.save();
    } );

    dispatcher.register( MoveEdge, ev => {
      this.layout = this.layout.setIn( [ 'edges', ev.edge.id ], ev.to );
      this.save();
    } );

    dispatcher.register( HandleEdgeInserted, ev => {
      this.layout = this.placeEdge( ev.edge, ev.from, ev.to );
      this.save();
    } );

    dispatcher.register( RestoreState, act => {
      if( act.storeId === this.storeId ) {
        this.layout = act.state.get(0);
        this.measurements = act.state.get(1);
      }
    } );
  }


  save() {
    this.dispatcher.dispatch( SaveState({
      storeId: this.storeId,
      state: List.of( this.layout, this.measurements )
    }) );
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
    this.save();
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
