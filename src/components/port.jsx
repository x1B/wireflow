import React from 'react';

import dragdrop from '../util/dragdrop';
import shallowEqual from '../util/shallow-equal';
import count from '../util/metrics';

import layoutActions from '../flux/layout/layout-actions';
import { Coords, PortDragInfo } from '../flux/layout/layout-model';
import graphActions from '../flux/graph/graph-actions';
import { CreateCheckpoint } from '../flux/history/history-actions';
import { Connectable, IN, OUT } from '../flux/graph/graph-model';
import { READ_WRITE } from '../flux/settings/settings-model';

const { MeasurePort, DragPort } = layoutActions;
const { ConnectPort, DisconnectPort } = graphActions;

const Port = React.createClass({

  render() {
    const { port, vertex, eventHandler, settings } = this.props;
    count({ what: Port.displayName });
    const classes = `nbe-port nbe-type-${port.type}`;

    const dd = () => dragdrop({
      onBeforeStart: () => settings.mode === READ_WRITE,
      onMove: ({ dragPayload: { left, top }, dragX, dragY, dragNode }) => {
        count({ what: '!DragPort' });
        eventHandler( DragPort({
          info: PortDragInfo({
            port: port,
            vertex: vertex,
            portCoords: Coords({ left, top }),
            mouseCoords: Coords({ left: left + dragX, top: top + dragY })
          })
        }) );
      },
      getDropResult: ( hoverNode ) => {
        if( hoverNode.nodeName === 'svg' ) {
          // Background or outside of drop-zone
          return false;
        }
        const data = hoverNode.dataset;
        const matches = data &&
            data.nbeConnectable &&
            data.nbeType === port.type &&
            data.nbeDirection !== port.direction;
        return matches ? Connectable({
          edgeId: data.nbeEdge,
          type: data.nbeType,
          vertexId: data.nbeVertex,
          portId: data.nbePort,
          direction: data.nbeDirection
        }) : null;
      },
      onDrop: ({ dropResult }) => {
        eventHandler( CreateCheckpoint() );
        eventHandler( ConnectPort({
          from: Connectable({
            type: port.type,
            vertexId: vertex.id,
            portId: port.id,
            direction: port.direction
          }),
          port: port,
          vertex: vertex,
          to: dropResult
        }) );
      },
      onEnd: () => {
        eventHandler( DragPort({ info: null }) );
      }
    });

    const startDrag = ( ev ) => {
      const p = ev.currentTarget;
      const v = vertexNode( p );
      const left = v.offsetLeft + p.offsetLeft + (p.offsetWidth / 2);
      const top = v.offsetTop + p.offsetTop + (p.offsetHeight / 2);
      dd().start( ev, { left, top } );
      ev.stopPropagation();
    };

    return (
      <div className={classes}
           data-nbe-connectable={true}
           data-nbe-type={port.type}
           data-nbe-direction={port.direction}
           data-nbe-port={port.id}
           data-nbe-vertex={vertex.id}>
        { port.direction === OUT ? port.label : '' }
        <i className="nbe-port-handle"
           ref="handle"
           onMouseDown={startDrag}
           onDoubleClick={disconnect} />
        { port.direction === IN ? port.label : '' }
      </div>
    );

    function disconnect() {
      if( settings.mode === READ_WRITE ) {
        eventHandler( CreateCheckpoint() );
        eventHandler( DisconnectPort({ vertex: vertex, port: port }) );
      }
    }
  },


  componentDidMount() {
    const { port, eventHandler } = this.props;
    const node = React.findDOMNode( this.refs.handle );
    const coords = Coords({
      left: node.offsetLeft + (node.offsetWidth / 2),
      top: node.offsetTop + (node.offsetHeight / 2)
    });
    eventHandler( MeasurePort({ port: port, center: coords }) );
  },


  shouldComponentUpdate( nextProps, nextState ) {
    return !shallowEqual( nextProps, this.props );
  }

});

function vertexNode( port ) {
  let result = port.parentNode;
  while ( result ) {
    if( /\bnbe-vertex\b/.test( result.className ) ) {
      return result;
    }
    result = result.parentNode;
  }
  return result;
}


export default Port;
