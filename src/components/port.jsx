import * as React from 'react';

import { Coords, IN, OUT } from '../model';
import * as dragdrop from '../util/dragdrop';
import * as events from '../events';
import * as shallowEqual from '../util/shallow-equal';

const { PortMeasured, PortDragged, PortDisconnected, Rendered } = events;
const { PortDragInfo } = events.model;


const Port = React.createClass( {

  render() {
    const { port, vertex, eventHandler } = this.props;
    eventHandler( Rendered( { what: Port.displayName } ) );
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
      <div className={classes}>
        { port.direction === OUT ? port.label : '' }
        <i className="nbe-port-handle"
           ref="handle"
           onMouseDown={startDrag}
           onDoubleClick={disconnect} />
        { port.direction === IN ? port.label : '' }
      </div>
    );

    function disconnect() {
      eventHandler( PortDisconnected( { vertex: vertex, port: port } ) );
    }
  },


  componentDidMount() {
    const { port, eventHandler } = this.props;
    const node = React.findDOMNode( this.refs.handle );
    const coords = Coords( {
      left: node.offsetLeft + (node.offsetWidth / 2),
      top: node.offsetTop + (node.offsetHeight / 2)
    } );
    eventHandler( PortMeasured( { port: port, center: coords } ) );
  },


  shouldComponentUpdate( nextProps, nextState ) {
    return !shallowEqual( nextProps, this.props );
  }

} );

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
