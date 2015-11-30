import React from 'react';

import shallowEqual from '../util/shallow-equal';
import { layout as layoutSettings } from '../util/settings';
import dragdrop from '../util/dragdrop';
import { ViewportMoved, MinimapResized } from '../flux/settings/settings-actions';

import Links from './links';


const { min, max } = Math;

const Minimap = React.createClass({

  mapDimensions( canvasSize, settings ) {
    const { viewport } = settings;
    const maxWidth = viewport.width * 0.8;
    const minBoxWidth = viewport.width * 0.02;
    const maxHeight = viewport.height * 0.95;
    const minBoxHeight = viewport.height * 0.02;

    const boxWidth = min( max( minBoxWidth, settings.minimap.width ), maxHeight );
    const boxHeight = min( max( minBoxHeight, boxWidth * ( canvasSize.height / canvasSize.width ) ), maxHeight );
    const width = min( boxWidth, boxHeight * ( canvasSize.width / canvasSize.height ) );
    const height = width * ( canvasSize.height / canvasSize.width );

    return {
      width,
      height,
      boxWidth,
      boxHeight
    };
  },

  render() {

    const {
      edges,
      vertices,
      types,
      settings,
      layout,
      selection,
      measurements,
      canvasSize
    } = this.props;

    const { viewport } = settings;

    const {
      width,
      height,
      boxWidth,
      boxHeight
    } = this.mapDimensions( canvasSize, settings );

    const viewportStyle = {
      width: ( viewport.width / canvasSize.width ) * width,
      height: ( viewport.height / canvasSize.height ) * height,
      left: ( viewport.left / canvasSize.width ) * width,
      top: ( viewport.top / canvasSize.height ) * height
    };
    const viewbox = [ 0, 0, canvasSize.width, canvasSize.height ].join( ' ' );

    const showMap = viewport.width !== null && (
      canvasSize.width > viewport.width ||
      canvasSize.height > viewport.height );

    const classes = 'nbe-minimap' + ( showMap ? '' : ' nbe-hidden' );

    return <div className={classes}
                onMouseDown={this.startDragReposition}
                style={{ width: boxWidth, height: boxHeight }}
                ref='mapContainer'>
      <div className='nbe-minimap-viewport'
           style={viewportStyle} />
      <svg className='nbe-minimap-links'
           style={{ width, height }}
           viewBox={viewbox}>
        <Links measurements={measurements}
               types={types}
               vertices={vertices}
               layout={layout}
               selection={selection} />
        <g className='nbe-minimap-vertices'>
          {this.vertices( layout, measurements, vertices, selection.vertices )}
        </g>
        <g className='nbe-minimap-edges'>
          {this.edges( layout, measurements, edges, types, selection.edges )}
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
    }).start( ev, null, { target: React.findDOMNode( this.refs.mapContainer ) } );
    ev.stopPropagation();
  },

  reposition( mapX, mapY ) {
    const { canvasSize, settings } = this.props;
    const { width, height } = this.mapDimensions( canvasSize, settings );
    const { viewport } = settings;
    const toLeft = (mapX / width) * canvasSize.width;
    const toTop = (mapY / height) * canvasSize.height;
    // center viewport at target coordinate:
    const left = max( 0,
      min( toLeft - viewport.width / 2, canvasSize.width - viewport.width ) );
    const top = max( 0,
      min( toTop - viewport.height / 2, canvasSize.height - viewport.height ) );
    this.bubble( ViewportMoved({ left, top, by: ':MINIMAP:' }) );
  },

  startDragResize( ev ) {
    const { canvasSize, settings } = this.props;
    const { minimap } = settings;
    const { boxWidth, boxHeight } = this.mapDimensions( canvasSize, settings );

    dragdrop({
      onMove: ({ dragPayload: { baseWidth, baseHeight }, dragX, dragY, dragNode }) => {
        this.resize( baseWidth + dragX, baseHeight + dragY );
      }
    }).start( ev, { baseWidth: boxWidth, baseHeight: boxHeight } );
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

  edges( layout, measurements, edges, types, edgeSelection ) {
    return layout.edges.entrySeq().map( ([ id, { left, top } ]) => {
      const edge = edges.get( id );
      if( !edge || types.get( edge.type ).owningPort ) {
        return null;
      }
      const { dimensions } = measurements.edges.get( id ) || {};
      if( !dimensions ) {
        return null;
      }

      const r = layoutSettings.edgeOffset;
      const selectionStateClass =
        edgeSelection.has( id ) ? 'nbe-selected' : '';
      const classes =
        `nbe-minimap-edge nbe-type-${edge.type} ${selectionStateClass}`;
      return <circle className={classes} key={id}
                     cx={left + r} cy={top + r} r={r} />;
    } ).filter( _ => _ !== null );
  },

  vertices( layout, measurements, vertices, vertexSelection ) {
    return layout.vertices.entrySeq().map( ([ id, { left, top } ]) => {
      const { dimensions } = measurements.vertices.get( id ) || {};
      if( !dimensions ) {
        return null;
      }
      const { kind } = vertices.get( id );
      const { width, height } = dimensions;
      const selectionStateClass = vertexSelection.has( id ) ? 'nbe-selected' : '';
      const classes =
        `nbe-minimap-vertex nbe-kind-${kind} ${selectionStateClass}`;
      return <rect className={classes} key={id}
                   x={left} y={top} height={height} width={width} />;
    } ).filter( _ => _ !== null );
  },

  shouldComponentUpdate( nextProps ) {
    return !shallowEqual( nextProps, this.props );
  }

});

export default Minimap;
