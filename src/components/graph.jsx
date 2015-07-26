import * as React from 'react';
import { Map } from 'immutable';

import * as Links from './links';
import * as Edge from './edge';
import * as SelectionBox from './selection-box';
import * as Vertex from './vertex';
import * as GhostPort from './ghost-port';
import * as shallowEqual from '../util/shallow-equal';

import { Layout, Coords, Dimensions, Graph as GraphModel } from '../model';
import { PortDragged } from '../events/layout';
import { SelectionDragged, SelectionCleared } from '../events/selection';
import { Rendered } from '../events/metrics';
import count from '../util/metrics';
import dragdrop from '../util/dragdrop';

const { abs, min, max } = Math;

const Graph = React.createClass({

  getInitialState() {
    return {
      portDragInfo: null
    };
  },

  getDefaultProps() {
    return {
      types: Map(),
      model: GraphModel(),
      layout: Layout(),
      zoom: 100,
      hasFocus: false
    };
  },

  render() {
    const self = this;
    const {
      model: { vertices, edges },
      types,
      layout,
      measurements,
      selection,
      zoom,
      hasFocus,
      className
    } = this.props;

    const { portDragInfo } = this.state;

    count( Rendered({ what: Graph.displayName }) );

    const canvasSize = self.canvasSize( measurements, layout );

    const focusClass =
      hasFocus ? 'nbe-has-focus' : '';
    const highlightClass =
      portDragInfo ? `nbe-highlight-type-${portDragInfo.port.type}` : '';
    const classes =
      `nbe-graph nbe-zoom-${zoom} ${focusClass} ${highlightClass} ${className}`;

    const dd = () => dragdrop({
      onMove: ({ dragPayload: { left, top }, dragX, dragY, dragNode }) => {
        count( Rendered({ what: 'events.SelectionDragged' }) );

        const x = left + min( 0, dragX );
        const y = top + min( 0, dragY );
        const w = abs( dragX );
        const h = abs( dragY );
        this.bubble( SelectionDragged({
          coords: Coords({ left: x, top: y }),
          dimensions: Dimensions({ width: w, height: h })
        }) );
      },
      onEnd: () => this.bubble( SelectionDragged({ coords: null, dimensions: null }) ),
      onClick: () => this.bubble( SelectionCleared() )
    });

    const startSelect = ( ev ) => {
      const rect = ev.currentTarget.getBoundingClientRect();
      const left = ev.clientX - rect.left;
      const top = ev.clientY - rect.top;
      dd().start( ev, { left, top } );
    };

    return (
      <div tabIndex="0" className={classes}>
        <div className="nbe-graph-viewport">
          <div className="nbe-graph-canvas" style={canvasSize}>
            <SelectionBox box={selection.box} />
            <div className="nbe-graph-nodes">
              {renderVertices()}
              {renderEdges()}
            </div>
            <svg className="nbe-links" onMouseDown={startSelect}>
              <Links measurements={measurements}
                     types={types}
                     vertices={vertices}
                     edges={edges}
                     layout={layout} />
              <GhostPort dragInfo={portDragInfo} />
            </svg>
          </div>
        </div>
      </div>
    );

    function renderVertices() {
      return vertices.valueSeq().map( vertex =>
        <Vertex key={vertex.id}
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
      case PortDragged:
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
      const { dimensions: { width, height } } = nodeMeasurements;
      const { left, top } = nodeCoords;
      w = max( w, left + width );
      h = max( h, top + height );
    };
    measurements.vertices.forEach( measure( layout.vertices ) );
    measurements.edges.forEach( measure( layout.edges ) );

    // TODO: 'font-size: 0' is a weird hack.
    // find a better way to make sure that no scrollbar is shown
    return {
      'fontSize': 0,
      'minWidth': (w + padding) + 'px',
      'minHeight': (h + padding) + 'px'
    };
  }

});

export default Graph;
