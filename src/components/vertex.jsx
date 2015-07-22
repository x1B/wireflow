import * as React from 'react';
import * as dragdrop from '../util/dragdrop';

import * as Port from './port';
import * as shallowEqual from '../util/shallow-equal';
import { Coords, convert, IN, OUT } from '../model';
import {
  VertexMeasured,
  VertexMeasurements,
  PortMeasured,
  VertexMoved
} from '../events/layout';

import { Rendered } from '../events/metrics';
import count from '../util/metrics';


const { boxFromNode } = convert;


const Vertex = React.createClass({

  getInitialState() {
    return {
      measurements: VertexMeasurements()
    };
  },


  render() {
    const self = this;
    const { vertex, selected, layout, eventHandler } = self.props;
    count( Rendered({ what: Vertex.displayName }) );
    const { ports, label } = vertex;

    const style = {
      position: 'absolute', // :TODO: move to stylesheet
      visibility: layout ? 'visible' : 'hidden',
      left: layout.left,
      top: layout.top
    };

    const selectedClass = selected ? 'nbe-selected' : '';
    const classes = `nbe-vertex nbe-node ${selectedClass}`;

    const dd = () => dragdrop({
      onMove: ({ dragPayload: { left, top }, dragX, dragY, dragNode }) => {
        eventHandler( Rendered({ what: 'events.VertexMoved' }) );
        eventHandler( VertexMoved({
          vertex: vertex,
          to: Coords( { left: left + dragX, top: top + dragY } )
        }) );
        this.measure();
      }
    });

    const startDrag = ( ev ) => dd().start( ev, layout );

    return (
      <div style={style} className={classes}
           ref="vertex" onMouseDown={startDrag}>
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
              eventHandler={self.handleEvent} /> ).toJS();
    }
  },


  handleEvent( event ) {
    var type = event.type();
    if( type === PortMeasured ) {
      const { port, center } = event;
      this.setState( ({ measurements }) => {
        var newMeasurements = measurements.setIn( [ port.direction, port.id ], center );
        this.propagateMeasurements( newMeasurements );
        return { measurements: newMeasurements };
      } );
      return;
    }
    this.bubble( event );
  },


  bubble( event ) {
    const { eventHandler } = this.props;
    return eventHandler && eventHandler( event );
  },


  propagateMeasurements( measurements ) {
    if( this.isComplete( measurements ) ) {
      var { vertex } = this.props;
      this.bubble( VertexMeasured( { vertex, measurements } ) );
    }
  },


  isComplete( measurements ) {
    const { ports } = this.props.vertex;
    return measurements.box
      && measurements.inbound.size === ports.inbound.size
      && measurements.outbound.size === ports.outbound.size;
  },


  measure() {
    const domVertex = React.findDOMNode( this.refs.vertex );
    this.setState( ({ measurements }) => {
      const box = boxFromNode( domVertex );
      const newMeasurements = measurements.setIn( [ 'box' ], box );
      this.propagateMeasurements( newMeasurements );
      return { measurements: newMeasurements };
    } );
  },


  componentDidMount() {
    this.measure();
  },


  shouldComponentUpdate( nextProps, nextState ) {
    return !shallowEqual( nextState, this.state )
        || !shallowEqual( nextProps, this.props );
  }

});

export default Vertex;
