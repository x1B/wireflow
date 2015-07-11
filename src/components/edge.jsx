import * as React from 'react';
import * as interact from 'interact';

import { Coords, convert } from '../model';
import * as events from '../events';
import * as shallowEqual from '../util/shallow-equal';

const { EdgeMeasured, EdgeMoved, Rendered } = events;
const { EdgeMeasurements } = events.model;
const { boxFromNode } = convert;


const Edge = React.createClass( {

  render() {
    const { edge, id, selected, layout, eventHandler } = this.props;
    eventHandler( Rendered( { what: Edge.displayName } ) );
    const { type, label } = edge;

    const style = {
      position: 'absolute', // :TODO: move to stylesheet
      visibility: layout ? 'visible' : 'hidden',
      left: layout.left,
      top: layout.top
    };

    const selectedClass = selected ? 'nbe-selected' : '';
    const className = `nbe-node nbe-edge nbe-type-${type} ${selectedClass}`;

    return (
      <div style={style} className={className}>
        <div className="nbe-edge-icon" ref="icon" />
        <div className="nbe-edge-label">{label || id}</div>
      </div>
    );
  },


  componentDidMount() {
    const icon = React.findDOMNode( this.refs.icon );
    const container = icon.parentNode;
    this.measure( container, icon );
    this.enableDragDrop( container, icon );
  },


  measure( container, icon ) {
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


  enableDragDrop( container, icon ) {
    const { eventHandler, edge } = this.props;
    var left, top;
    interact( container ).draggable( {
      restrict: {
        restriction: function( x, y, domElement ) {
          const domCanvas = domElement.parentNode.parentNode;
          return domCanvas;
        }
      },
      onstart: ( e ) => {
        left = this.props.layout.left;
        top = this.props.layout.top;
      },
      onmove: ( e ) => {
        eventHandler( Rendered( { what: 'events.EdgeMoved' } ) );
        const dX = e.pageX - e.x0;
        const dY = e.pageY - e.y0;
        eventHandler( EdgeMoved( {
          edge: edge,
          to: Coords( { left: left + dX, top: top + dY } )
        } ) );
        this.measure( container, icon );
      }
    } );
  },


  shouldComponentUpdate( nextProps, nextState ) {
    return !shallowEqual( nextProps, this.props );
  }

} );

export default Edge;
