import * as React from 'react';

import * as dragdrop from '../util/dragdrop';
import * as shallowEqual from '../util/shallow-equal';

import { Coords, IN, OUT } from '../model';
import { PortMeasured, PortDragged, PortDragInfo } from '../events/layout';
import { PortConnected, PortDisconnected, Connectable } from '../events/graph';

import { Rendered } from '../events/metrics';
import count from '../util/metrics';


const Port = React.createClass({

  render() {
    const { port, vertex, eventHandler } = this.props;
    count( Rendered({ what: Port.displayName }) );
    const classes = `nbe-port nbe-type-${port.type}`;

    const dd = () => dragdrop({
      onMove: ({ dragPayload: { left, top }, dragX, dragY, dragNode }) => {
        eventHandler( Rendered({ what: 'events.PortDragged' }) );
        eventHandler( PortDragged({
          info: PortDragInfo({
            port: port,
            vertex: vertex,
            portCoords: Coords({ left, top }),
            mouseCoords: Coords({ left: left + dragX, top: top + dragY })
          })
        }) );
      },
      getDropResult: ( hoverNode ) => {
        const data = hoverNode.dataset;
        const matches =
            data.nbeConnectable &&
            data.nbeType === port.type &&
            data.nbeDirection !== port.direction;
        return matches ? Connectable({
          edgeId: data.nbeEdge,
          portId: data.nbePort,
          vertexId: data.nbeVertex
         }) : null;
      },
      onDrop: ({ dropResult }) => {
        eventHandler( PortConnected({
          port: port,
          vertex: vertex,
          to: dropResult
        }) );
      },
      onEnd: () => {
        eventHandler( PortDragged({ info: null }) );
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
      eventHandler( PortDisconnected({ vertex: vertex, port: port }) );
    }
  },


  componentDidMount() {
    const { port, eventHandler } = this.props;
    const node = React.findDOMNode( this.refs.handle );
    const coords = Coords({
      left: node.offsetLeft + (node.offsetWidth / 2),
      top: node.offsetTop + (node.offsetHeight / 2)
    });
    eventHandler( PortMeasured({ port: port, center: coords }) );
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
