import { List, Map } from 'immutable';

import settings from '../../util/settings';
import { calculateLayout } from '../../util/auto-layout';
import { calculateMeasurements } from '../../util/auto-measurements';

import { RemoveVertex, RemoveEdge } from '../graph/graph-actions';
import { SaveState, RestoreState } from '../history/history-actions';
import { Coords, Measurements, Layout, convert } from './layout-model';
import {
  AutoLayout,
  HandleEdgeInserted,
  MeasureEdge,
  MeasureVertex,
  MoveEdge,
  MoveVertex
} from './layout-actions';


const { layout: { edgeOffset } } = settings;

const ZERO = Coords({ left: 0, top: 0 });
const { min } = Math;

/**
 * Manages the graph layout prop.
 */
class LayoutStore {

  constructor( dispatcher, graphStore, options = {} ) {
    this.dispatcher = dispatcher;
    this.graphStore = graphStore;

    this.storeId = this.constructor.name;
    this.measurements = options.measurements || convert.measurements(
      calculateMeasurements( graphStore.graph )
    );
    this.layout = options.layout || convert.layout(
      calculateLayout( graphStore.graph, Map(this.measurements) )
    );
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
      this.measurements = this.measurements.removeIn( [ 'vertices', ev.vertexId ] );
      this.save();
    } );

    dispatcher.register( RemoveEdge, ev => {
      this.layout = this.layout.removeIn( [ 'edges', ev.edgeId ] );
      this.measurements = this.measurements.removeIn( [ 'edges', ev.edgeId ] );
      this.save();
    } );

    dispatcher.register( MoveVertex, ev => {
      const correctionOffset = this.correctionOffset( ev.to );
      this.layout = this.layout.setIn( [ 'vertices', ev.vertex.id ], ev.to );
      this.layout = this.withCorrection( this.layout, correctionOffset );
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

  insert( newLayout, renameRules ) {
    const disjointLayout = renameRules ?
      this.applyRenameRules( newLayout, renameRules ) :
      newLayout;
    this.layout = this.layout
      .set( 'edges', this.layout.edges.merge( disjointLayout.edges ) )
      .set( 'vertices', this.layout.vertices.merge( disjointLayout.vertices ) );
  }

  applyRenameRules( newLayout, renameRules ) {
    return Layout({
      edges: renamed( newLayout.edges, renameRules.get( 'edges' ) ),
      vertices: renamed( newLayout.vertices, renameRules.get( 'vertices' ) )
    });

    function renamed( map, rules ) {
      const workingCopy = {};
      map.forEach( (value, key) => {
        const newKey = rules.get( key ) || key;
        workingCopy[ newKey ] = value;
      } );
      return Map(workingCopy);
    }
  }

  correctionOffset( nodeCoords, knownCorrectionOffset = ZERO ) {
    if( nodeCoords.left >= 0 && nodeCoords.right >= 0 ) {
      return knownCorrectionOffset;
    }
    const cX = min( nodeCoords.left, knownCorrectionOffset.left );
    const cY = min( nodeCoords.top, knownCorrectionOffset.top );
    return Coords({
      left: cX < 0 ? min( cX, -30 ) : cX,
      top: cY < 0 ? min( cY, -30 ) : cY,
    });
  }

  withCorrection( layout, offset ) {
    if( offset === ZERO ) {
      return layout;
    }

    var targetLayout = layout;
    [ 'vertices', 'edges' ].forEach( kind => {
      targetLayout = targetLayout.update( kind, items =>
        items.map( coords => coords && Coords({
          left: coords.left - offset.left,
          top: coords.top - offset.top
        }) ) );
    } );
    return targetLayout;
  }


  moveSelection( selection, referenceLayout, offset ) {
    const { left, top } = offset;

    var targetLayout = referenceLayout;
    var targetCorrection = ZERO;

    [ 'vertices', 'edges' ].forEach( kind =>
      selection[ kind ].forEach( id => {
        targetLayout = targetLayout.updateIn( [ kind, id ], coords => {
          if( !coords ) { return coords; }
          const newCoords = Coords({
            left: coords.left + left,
            top: coords.top + top
          });
          targetCorrection = this.correctionOffset( newCoords, targetCorrection );
          return newCoords;
        } );
      } )
    );

    this.layout = this.withCorrection( targetLayout, targetCorrection );
    this.save();
  }

  placeEdge( edge, from, to ) {
    const { measurements, layout } = this;
    const fromMeasurements = measurements.vertices.get( from.vertexId );
    const toMeasurements = measurements.vertices.get( to.vertexId );
    const fromCoords = layout.vertices.get( from.vertexId );
    const toCoords = layout.vertices.get( to.vertexId );

    const left = (
      fromCoords.left + fromMeasurements.dimensions.width + toCoords.left
    ) / 2 - edgeOffset;

    const fromPortBox = fromMeasurements.getIn([ from.direction, from.portId ]);
    const toPortBox = toMeasurements.getIn([ to.direction, to.portId ]);
    const top = (
      fromCoords.top + fromPortBox.top + toCoords.top + toPortBox.top
    ) / 2 - edgeOffset;

    return this.layout.setIn( [ 'edges', edge.id ], Coords({
      left: left,
      top: top
    }) );
  }
}

export default LayoutStore;
