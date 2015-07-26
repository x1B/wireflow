import * as React from 'react';
import * as dragdrop from '../util/dragdrop';

import { Coords, Dimensions } from '../model';
import { EdgeMeasured, EdgeMeasurements, EdgeMoved } from '../events/layout';
import { Rendered } from '../events/metrics';
import count from '../util/metrics';
import * as shallowEqual from '../util/shallow-equal';

import {
  EdgeSelected,
  EdgeDeselected
} from '../events/selection';


const Edge = React.createClass({

  render() {
    const { edge, selected, layout } = this.props;
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
        count( Rendered({ what: 'events.EdgeMoved' }) );
        this.bubble( EdgeMoved({
          edge: edge,
          to: Coords({ left: left + dragX, top: top + dragY })
        }) );
        this.measure();
      },
      onClick: () => this.bubble(
        (selected ? EdgeDeselected : EdgeSelected)({ edge })
      )
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


  bubble( event ) {
    const { eventHandler } = this.props;
    return eventHandler && eventHandler( event );
  },


  measure() {
    const domIcon = React.findDOMNode( this.refs.icon );
    const domContainer = domIcon.parentNode;
    const { edge } = this.props;
    this.bubble( EdgeMeasured({
      edge: edge,
      measurements: EdgeMeasurements({
        dimensions: Dimensions({
          width: domContainer.offsetWidth,
          height: domContainer.offsetHEight
        }),
        center: Coords({
          left: domContainer.offsetLeft + (domIcon.offsetWidth / 2),
          top: domContainer.offsetTop + (domIcon.offsetHeight / 2)
        })
      })
    }) );
  },

  shouldComponentUpdate( nextProps, nextState ) {
    return !shallowEqual( nextProps, this.props );
  }

});

export default Edge;
