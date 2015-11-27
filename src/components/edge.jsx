import * as React from 'react';

import * as dragdrop from '../util/dragdrop';
import * as shallowEqual from '../util/shallow-equal';
import count from '../util/metrics';

import { CreateCheckpoint } from '../flux/history/history-actions';
import {
  Coords, Dimensions, EdgeMeasurements
} from '../flux/layout/layout-model';
import { MeasureEdge, MoveEdge } from '../flux/layout/layout-actions';
import {
  MoveSelection, SelectEdge, DeselectEdge, ClearSelection
} from '../flux/selection/selection-actions';


const Edge = React.createClass({

  render() {
    const { edge, selected, layout } = this.props;
    const { id, type, label } = edge;
    count({ what: Edge.displayName });

    const style = {
      visibility: layout ? null : 'hidden',
      left: layout ? layout.left : 50,
      top: layout ? layout.top : 50
    };

    const selectedClass = selected ? 'nbe-selected' : '';
    const className = `nbe-node nbe-edge nbe-type-${type} ${selectedClass}`;

    const dd = () => dragdrop({
      onStart: () => {
        this.bubble( CreateCheckpoint({ before: 'Move Edge' }) );
        return true;
      },
      onMove: ({ dragPayload, dragX, dragY, dragNode }) => {
        if( selected ) {
          this.bubble( MoveSelection({
            reference: dragPayload,
            offset: Coords({ left: dragX, top: dragY })
          }) );
        }
        else {
          const { left, top } = dragPayload.coords;
          this.bubble( MoveEdge({
            edge: edge,
            to: Coords({ left: left + dragX, top: top + dragY })
          }) );
        }
      },
      onClick: ( ev ) => {
        if( ev.shiftKey ) {
          this.bubble( (selected ? DeselectEdge : SelectEdge)({ edge }) );
        }
        else {
          this.bubble( ClearSelection() );
          this.bubble( SelectEdge({ edge }) );
        }
      }
    });

    const startDrag = ( ev ) => dd().start( ev, { coords: layout, id: {} } );

    return (
      <div style={style} className={className}>
        <div className="nbe-edge-icon"
             ref="icon"
             onMouseDown={startDrag}
             data-nbe-connectable={true}
             data-nbe-edge={id}
             data-nbe-type={type} />
        <div className="nbe-edge-label">{label || id}</div>
      </div>
    );
  },

  bubble( event ) {
    const { eventHandler } = this.props;
    return eventHandler && eventHandler( event );
  },

  measure() {
    const domIcon = React.findDOMNode( this.refs.icon );
    const domContainer = domIcon.parentNode;
    const { edge } = this.props;
    this.bubble( MeasureEdge({
      edge: edge,
      measurements: EdgeMeasurements({
        dimensions: Dimensions({
          width: domContainer.offsetWidth,
          height: domContainer.offsetHeight
        })
      })
    }) );
  },

  shouldComponentUpdate( nextProps, nextState ) {
    return !shallowEqual( nextProps, this.props );
  }

});

export default Edge;
