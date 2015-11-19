import React from 'react';

import shallowEqual from '../util/shallow-equal';
import dragdrop from '../util/dragdrop';
import { ViewportMoved, MinimapResized } from '../flux/settings/settings-actions';

import Links from './links';


const { min, max } = Math;

const Minimap = React.createClass({

  render() {

    const {
      edges,
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
    const mapBoxHeight = mapWidth * Math.max( 0.3, canvasSize.height / canvasSize.width );

    const boxStyle = {
      width: ( viewport.width / canvasSize.width ) * mapWidth,
      height: ( viewport.height / canvasSize.height ) * mapBoxHeight,
      left: ( viewport.left / canvasSize.width ) * mapWidth,
      top: ( viewport.top / canvasSize.height ) * mapBoxHeight
    };

    const showMap = viewport.width !== null && (
      canvasSize.width > viewport.width ||
      canvasSize.height > viewport.height );

    const classes = 'nbe-minimap' + ( showMap ? '' : ' nbe-hidden' );

    return <div className={classes}
                onMouseDown={this.startDragReposition}
                style={{ width: mapWidth, height: mapBoxHeight }}>
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
          {this.edges( layout, measurements, edges )}
        </g>
      </svg>
      <div className='nbe-minimap-handle'
           onMouseDown={this.startDragResize}/>
    </div>;
  },


  startDragReposition( ev ) {
    dragdrop({
      dragThreshold: 0,
      onBeforeStart: ( _, baseX, baseY ) => {
        this.reposition( baseX, baseY );
        return true;
      },
      onMove: ({ base: { baseX, baseY }, dragX, dragY, dragNode }) => {
        this.reposition( baseX + dragX, baseY + dragY );
      }
    }).start( ev );
    ev.stopPropagation();
  },

  reposition( mapX, mapY ) {
    const { settings: { minimap, viewport }, canvasSize } = this.props;
    const toLeft = (mapX / minimap.width) * canvasSize.width;
    const toTop = (mapY / this.mapHeight()) * canvasSize.height;
    // center viewport at target coordinate:
    const left = max( 0,
      min( toLeft - viewport.width / 2, canvasSize.width - viewport.width ) );
    const top = max( 0,
      min( toTop - viewport.height / 2, canvasSize.height - viewport.height ) );
    this.bubble( ViewportMoved({ left, top, by: ':MINIMAP:' }) );
  },

  startDragResize( ev ) {
    const { settings: { minimap } } = this.props;
    dragdrop({
      onMove: ({ dragPayload: { baseWidth, baseHeight }, dragX, dragY, dragNode }) => {
        this.resize( baseWidth + dragX, baseHeight + dragY );
      }
    }).start( ev, { baseWidth: minimap.width, baseHeight: minimap.height } );
    ev.stopPropagation();
  },

  resize( width, height ) {
    this.bubble( MinimapResized({ width, height }) );
  },

  mapHeight() {
    const { canvasSize, settings: { minimap: { width } } } = this.props;
    return width * ( canvasSize.height / canvasSize.width );
  },

  bubble( event ) {
    const { eventHandler } = this.props;
    return eventHandler && eventHandler( event );
  },

  edges( layout, measurements, edges ) {
    return layout.edges.entrySeq().map( ([ id, { left, top } ]) => {
      const edge = edges.get( id );
      if( !edge ) {
        return null;
      }
      const { dimensions } = measurements.edges.get( id ) || {};
      if( !dimensions ) {
        return null;
      }
      const { width } = dimensions;
      const r = width / 2;
      const cls = 'nbe-type-' + edge.type;
      return <circle className={cls} key={id}
                     cx={left + r} cy={top + r} r={r} />;
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
