import React from 'react';
import { Map } from 'immutable';

import shallowEqual from '../util/shallow-equal';
import count from '../util/metrics';
import dragdrop from '../util/dragdrop';
import keyboard from '../util/keyboard';

import Edge from './edge';
import Vertex from './vertex';
import Links from './links';
import GhostPort from './ghost-port';
import SelectionBox from './selection-box';
import Minimap from './minimap';

import { DragPort } from '../flux/layout/layout-actions';
import { Layout, Coords, Dimensions } from '../flux/layout/layout-model';
import { Settings, READ_ONLY } from '../flux/settings/settings-model';
import { Graph as GraphModel } from '../flux/graph/graph-model';
import {
  ViewportMoved, ViewportMeasured
} from '../flux/settings/settings-actions';
import {
  ResizeSelection, ClearSelection
} from '../flux/selection/selection-actions';


const { abs, min, max } = Math;

const Graph = React.createClass({

  getInitialState() {
    return {
      portDragInfo: null
    };
  },

  getDefaultProps() {
    return {
      settings: Settings(),
      types: Map(),
      model: GraphModel(),
      layout: Layout(),
      zoom: 100,
      hasFocus: false
    };
  },

  render() {
    count({ what: Graph.displayName });

    const self = this;
    const {
      model: { vertices, edges },
      types,
      layout,
      measurements,
      selection,
      zoom,
      hasFocus,
      settings,
      className
    } = this.props;

    const { portDragInfo } = this.state;

    const focusClass =
      hasFocus ? 'nbe-has-focus' : '';
    const highlightClass =
      portDragInfo ? `nbe-highlight-type-${portDragInfo.port.type}` : '';
    const classes =
      `nbe-graph nbe-zoom-${zoom} ${focusClass} ${highlightClass} ${className}`;

    const dd = () => dragdrop({
      onMove: ({ dragPayload: { left, top, isExtension }, dragX, dragY, dragNode }) => {
        count({ what: '!DragSelection' });
        const x = left + min( 0, dragX );
        const y = top + min( 0, dragY );
        const w = abs( dragX );
        const h = abs( dragY );
        this.bubble( ResizeSelection({
          isExtension,
          coords: Coords({ left: x, top: y }),
          dimensions: Dimensions({ width: w, height: h })
        }) );
      },
      onEnd: () => this.bubble( ResizeSelection({ coords: null, dimensions: null }) ),
      onClick: () => this.bubble( ClearSelection() )
    });

    const startSelect = ( ev ) => {
      const rect = ev.currentTarget.getBoundingClientRect();
      const left = ev.clientX - rect.left;
      const top = ev.clientY - rect.top;
      const isExtension = ev.shiftKey;
      dd().start( ev, { left, top, isExtension } );
    };

    const canvasSize = self.canvasSize( measurements, layout );
    // TODO: 'font-size: 0' is a weird hack.
    // find a better way to make sure that no scrollbar is shown
    const canvasStyle = {
      'fontSize': 0,
      'minWidth': canvasSize.width + 'px',
      'minHeight': canvasSize.height + 'px'
    };

    return (
      <div tabIndex="0" className={classes} ref="graph">
        <Minimap measurements={measurements}
                 canvasSize={canvasSize}
                 types={types}
                 edges={edges}
                 vertices={vertices}
                 layout={layout}
                 settings={settings}
                 eventHandler={self.handleEvent} />
        <div className="nbe-graph-viewport"
             onScroll={this.handleScroll}>
          <div className="nbe-graph-canvas" style={canvasStyle}>
            <SelectionBox coords={selection.coords}
                          dimensions={selection.dimensions} />
            <div className="nbe-graph-nodes">
              {renderEdges()}
              {renderVertices()}
            </div>
            <svg className="nbe-links" onMouseDown={startSelect}>
              <Links measurements={measurements}
                     types={types}
                     vertices={vertices}
                     layout={layout} />
              <GhostPort dragInfo={portDragInfo} />
            </svg>
          </div>
        </div>
      </div>
    );

    function renderVertices() {
      return vertices.valueSeq().map( vertex =>
        <Vertex settings={settings}
                key={vertex.id}
                vertex={vertex}
                selected={selection.vertices.has(vertex.id)}
                layout={layout.vertices.get( vertex.id )}
                eventHandler={self.handleEvent} />
      ).toJS();
    }

    function renderEdges() {
      return edges.valueSeq()
      .filter( edge => !types.get( edge.type ).owningPort )
      .map( edge =>
        <Edge key={edge.id}
              edge={edge}
              selected={selection.edges.has(edge.id)}
              layout={layout.edges.get( edge.id )}
              eventHandler={self.handleEvent} />
      )
      .toJS();
    }
  },

  handleEvent( event ) {
    switch( event.type() ) {
      case DragPort:
        return this.setState( ({portDragInfo}) => ({
          portDragInfo: event.info
        }) );

      default:
        this.bubble( event );
    }
  },

  bubble( event ) {
    const { eventHandler } = this.props;
    return eventHandler && eventHandler( event );
  },

  shouldComponentUpdate( nextProps, nextState ) {
    return !shallowEqual( nextState, this.state )
      || !shallowEqual( nextProps, this.props );
  },

  canvasSize( measurements, layout ) {
    var w = 0;
    var h = 0;
    const padding = 50;
    const measure = ( nodeCoords ) => (nodeMeasurements, id) => {
      if( nodeCoords.hasOwnProperty( id ) ) {
        const { dimensions: { width, height } } = nodeMeasurements.toJS();
        const { left, top } = nodeCoords[ id ];
        w = max( w, left + width );
        h = max( h, top + height );
      }
    };
    measurements.vertices.forEach( measure( layout.vertices.toJS() ) );
    measurements.edges.forEach( measure( layout.edges.toJS() ) );
    return {
      width: w + padding,
      height: h + padding
    };
  },

  measure() {
    const domGraph = React.findDOMNode( this.refs.graph );
    this.bubble( ViewportMeasured({
      width: domGraph.offsetWidth,
      height: domGraph.offsetHeight
    }) );
  },

  handleScroll( ev ) {
    this.bubble( ViewportMoved({
      left: ev.target.scrollLeft,
      top: ev.target.scrollTop,
      by: ':GRAPH:'
    }) );
  },

  componentDidMount() {
    this.measure();
    const domGraph = React.findDOMNode( this.refs.graph );
    window.addEventListener( 'resize', () => this.measure() );
    keyboard( domGraph, this.bubble, () => this.props.settings.mode === READ_ONLY );
  },

  componentDidUpdate() {
    const { settings: { viewport } } = this.props;
    if( viewport.movedBy === ':GRAPH:' ) {
      return;
    }
    const domGraph = React
      .findDOMNode( this.refs.graph )
      .querySelector( '.nbe-graph-viewport' );
    domGraph.scrollTop = viewport.top;
    domGraph.scrollLeft = viewport.left;
  }

});

export default Graph;
