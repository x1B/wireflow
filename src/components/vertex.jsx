import React from 'react';

import dragdrop from '../util/dragdrop';
import shallowEqual from '../util/shallow-equal';
import count from '../util/metrics';

import { CreateCheckpoint } from '../flux/history/history-actions';
import { IN, OUT } from '../flux/graph/graph-model';
import { ActivateVertex } from '../flux/graph/graph-actions';
import {
  Coords, Dimensions, VertexMeasurements
} from '../flux/layout/layout-model';
import layoutActions from '../flux/layout/layout-actions';
import {
  ClearSelection, SelectVertex, DeselectVertex, MoveSelection
} from '../flux/selection/selection-actions';

import Port from './port';


const {
  MeasureVertex, MeasurePort, MoveVertex
} = layoutActions;

const Vertex = React.createClass({

  render() {
    const self = this;
    const { vertex, selected, layout, measurements, eventHandler, mode } = self.props;
    count({ what: Vertex.displayName });
    const { ports, label } = vertex;

    const style = {
      visibility: layout ? null : 'hidden',
      transform: layout && 'translate(' + layout.left + 'px, ' + layout.top + 'px)',
      width: measurements && measurements.dimensions.width,
      height: measurements && measurements.dimensions.height
    };

    const selectedClass = selected ? 'nbe-selected' : '';
    const classes =
      `nbe-vertex nbe-node nbe-kind-${vertex.kind} ${selectedClass}`;

    const dd = () => dragdrop({
      onStart: () => {
        this.bubble( CreateCheckpoint({ before: 'Move Vertex' }) );
      },
      onMove: ({ dragPayload, dragX, dragY, dragNode }) => {
        if( selected ) {
          eventHandler( MoveSelection({
            reference: dragPayload,
            offset: Coords({ left: dragX, top: dragY })
          }) );
        }
        else {
          const { left, top } = dragPayload.coords;
          eventHandler( MoveVertex({
            vertex: vertex,
            to: Coords({ left: left + dragX, top: top + dragY })
          }) );
        }
      },
      onClick: ( ev ) => {
        if( ev.shiftKey ) {
          this.bubble( (selected ? DeselectVertex : SelectVertex)({ vertex }) );
        }
        else {
          this.bubble( ClearSelection() );
          this.bubble( SelectVertex({ vertex }) );
        }
      }
    });

    const startDrag = ( ev ) => dd().start( ev, { coords: layout, id: {} } );

    const activate = ( ev ) => { this.bubble( ActivateVertex({ vertex }) ) };

    return (
      <div style={style} className={classes} ref="vertex"
           onDoubleClick={activate}
           onMouseDown={startDrag}>
        <div className="nbe-vertex-header">{label}</div>
        <div className="nbe-port-group">
          <div className="nbe-ports nbe-inbound">
            {renderPorts( IN )}
          </div>
          <div className="nbe-ports nbe-outbound">
            {renderPorts( OUT )}
          </div>
        </div>
      </div>
    );

    function renderPorts( direction ) {
      return ports[ direction ].map( port =>
        <Port key={port.id}
              port={port}
              vertex={vertex}
              eventHandler={self.handleEvent}
              mode={mode} /> ).toJS();
    }
  },

  handleEvent( event ) {
    this.bubble( event );
  },


  bubble( event ) {
    const { eventHandler } = this.props;
    return eventHandler && eventHandler( event );
  },


  shouldComponentUpdate( nextProps ) {
    return !shallowEqual( nextProps, this.props );
  }

});


export default Vertex;
