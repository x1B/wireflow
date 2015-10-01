import React from 'react';

import shallowEqual from '../util/shallow-equal';
import dragdrop from '../util/dragdrop';
import { ViewportMoved } from '../flux/settings/settings-actions';

import Links from './links';


const { max } = Math;

const Minimap = React.createClass({

  render() {

    const {
      vertices,
      types,
      settings,
      layout,
      measurements,
      canvasSize
    } = this.props;

    const { viewport } = settings;
    const viewbox = [ 0, 0, canvasSize.width, canvasSize.height ].join( ' ' );

    const mapWidth = settings.minimap.width;
    const mapHeight = mapWidth * ( canvasSize.height / canvasSize.width );

    const boxStyle = {
      width: ( viewport.width / canvasSize.width ) * mapWidth,
      height: ( viewport.height / canvasSize.height ) * mapHeight,
      left: ( viewport.left / canvasSize.width ) * mapWidth,
      top: ( viewport.top / canvasSize.height ) * mapHeight
    };

    const mapDisplay = ( canvasSize.width > viewport.width ||
                         canvasSize.height > viewport.height ) ? 'block' : 'none';

     const dd = () => dragdrop({
       dragThreshold: 0,
       onMove: ({ dragPayload: { baseX, baseY }, dragX, dragY, dragNode }) => {
         this.reposition( baseX + dragX, baseY + dragY );
       }
    });

    const startDrag = ( ev ) => {
      const { target, clientX, clientY } = ev;
      const { left, top } = target.getBoundingClientRect();
      const offsetX = clientX - left;
      const offsetY = clientY - top;
      this.reposition( offsetX, offsetY );
      dd().start( ev, { baseX: offsetX, baseY: offsetY } );
      ev.stopPropagation();
    };

    return <div className='nbe-minimap'
                onMouseDown={startDrag}
                style={{ display: mapDisplay, width: mapWidth, height: mapHeight }}>
      <div className='nbe-minimap-viewport'
           style={boxStyle} />
      <svg className='nbe-minimap-links'
           style={{ width: mapWidth, height: mapHeight }}
           viewBox={viewbox}>
        <Links measurements={measurements}
               types={types}
               vertices={vertices}
               layout={layout} />
        <g className='nbe-minimap-vertices'>
          {this.vertices( layout, measurements )}
        </g>
        <g className='nbe-minimap-edges'>
          {this.edges( layout, measurements )}
        </g>
      </svg>
    </div>;
  },

  reposition( mapX, mapY ) {
    const { settings: { minimap, viewport }, canvasSize } = this.props;
    const toLeft = (mapX / minimap.width) * canvasSize.width;
    const toTop = (mapY / this.mapHeight()) * canvasSize.height;
    // center viewport at target coordinate:
    const left = max( 0, toLeft - viewport.width / 2 );
    const top = max( 0, toTop - viewport.height / 2 );
    this.bubble( ViewportMoved({ left, top, by: ':MINIMAP:' }) );
  },

  mapHeight() {
    const { canvasSize, settings: { minimap: { width } } } = this.props;
    return width * ( canvasSize.height / canvasSize.width );
  },

  bubble( event ) {
    const { eventHandler } = this.props;
    return eventHandler && eventHandler( event );
  },

  edges( layout, measurements ) {
    return layout.edges.entrySeq().map( ([ id, { left, top } ]) => {
      const { dimensions } = measurements.edges.get( id ) || {};
      if( !dimensions ) {
        return null;
      }
      const { width } = dimensions;
      const r = width / 2;
      return <circle key={id} cx={left + r} cy={top + r} r={r} />;
    } ).filter( _ => _ !== null );
  },

  vertices( layout, measurements ) {
    return layout.vertices.entrySeq().map( ([ id, { left, top } ]) => {
      const { dimensions } = measurements.vertices.get( id ) || {};
      if( !dimensions ) {
        return null;
      }
      const { width, height } = dimensions;
      return <rect key={id} x={left} y={top} height={height} width={width} />;
    } ).filter( _ => _ !== null );
  },

  shouldComponentUpdate( nextProps ) {
    return !shallowEqual( nextProps, this.props );
  }

});

export default Minimap;
