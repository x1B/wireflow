import React from 'react';

import shallowEqual from '../util/shallow-equal';

import Links from './links';


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

    const mapWidth = 200;
    const mapHeight = mapWidth * ( canvasSize.height / canvasSize.width );

    const boxStyle = {
      width: ( viewport.width / canvasSize.width ) * mapWidth,
      height: ( viewport.height / canvasSize.height ) * mapHeight,
      left: ( viewport.left / canvasSize.width ) * mapWidth,
      top: ( viewport.top / canvasSize.height ) * mapHeight
    };

    const mapDisplay = ( canvasSize.width > viewport.width ||
                         canvasSize.height > viewport.height ) ? 'block' : 'none';

    return <div className='nbe-minimap'
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
