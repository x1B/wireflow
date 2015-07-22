import * as React from 'react';
import * as dragdrop from '../util/dragdrop';

import { Coords, convert } from '../model';
import { EdgeMeasured, EdgeMeasurements, EdgeMoved } from '../events/layout';
import { Rendered } from '../events/metrics';
import count from '../util/metrics';
import * as shallowEqual from '../util/shallow-equal';

const { boxFromNode } = convert;


const Edge = React.createClass({

  render() {
    const { edge, selected, layout, eventHandler } = this.props;
    const { id, type, label } = edge;
    count( Rendered({ what: Edge.displayName }) );

    const style = {
      position: 'absolute', // :TODO: move to stylesheet
      visibility: layout ? 'visible' : 'hidden',
      left: layout ? layout.left : 50,
      top: layout ? layout.top : 50
    };

    const selectedClass = selected ? 'nbe-selected' : '';
    const className = `nbe-node nbe-edge nbe-type-${type} ${selectedClass}`;

    const dd = () => dragdrop({
      onMove: ({ dragPayload: { left, top }, dragX, dragY, dragNode }) => {
        eventHandler( Rendered({ what: 'events.EdgeMoved' }) );
        eventHandler( EdgeMoved({
          edge: edge,
          to: Coords({ left: left + dragX, top: top + dragY })
        }) );
        this.measure();
      }
    });

    const startDrag = ( ev ) => dd().start( ev, layout );

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


  componentDidMount() {
    this.measure();
  },


  measure() {
    const icon = React.findDOMNode( this.refs.icon );
    const container = icon.parentNode;
    const { eventHandler, edge } = this.props;
    eventHandler( EdgeMeasured({
      edge: edge,
      measurements: EdgeMeasurements({
        box: boxFromNode( container ),
        center: Coords({
          left: container.offsetLeft + (icon.offsetWidth / 2),
          top: container.offsetTop + (icon.offsetHeight / 2)
        })
      })
    }) );
  },

  shouldComponentUpdate( nextProps, nextState ) {
    return !shallowEqual( nextProps, this.props );
  }

});

export default Edge;
