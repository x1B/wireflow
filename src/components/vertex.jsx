import React from 'react';

import dragdrop from '../util/dragdrop';
import shallowEqual from '../util/shallow-equal';
import count from '../util/metrics';

import { CreateCheckpoint } from '../flux/history/history-actions';
import { IN, OUT } from '../flux/graph/graph-model';
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
    const { vertex, selected, layout, measurements, eventHandler, settings } = self.props;
    count({ what: Vertex.displayName });
    const { ports, label } = vertex;

    const style = {
      visibility: layout ? null : 'hidden',
      left: layout && layout.left,
      top: layout && layout.top,
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

    return (
      <div style={style} className={classes} ref="vertex"
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
              settings={settings} /> ).toJS();
    }
  },


  handleEvent( event ) {
    this.bubble( event );
  },


  bubble( event ) {
    const { eventHandler } = this.props;
    return eventHandler && eventHandler( event );
  },


  shouldComponentUpdate( nextProps, nextState ) {
    return !shallowEqual( nextState, this.state )
        || !shallowEqual( nextProps, this.props );
  }

});


export default Vertex;
