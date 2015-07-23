import * as React from 'react';
import { Map } from 'immutable';

import * as Links from './links';
import * as Edge from './edge';
import * as Vertex from './vertex';
import * as GhostPort from './ghost-port';
import * as shallowEqual from '../util/shallow-equal';

import { Layout, Graph as GraphModel } from '../model';
import { PortDragged } from '../events/layout';
import { Rendered } from '../events/metrics';
import count from '../util/metrics';


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

    const canvasSize = self.canvasSize( measurements );

    const focusClass =
      hasFocus ? 'nbe-has-focus' : '';
    const highlightClass =
      portDragInfo ? `nbe-highlight-type-${portDragInfo.port.type}` : '';
    const classes =
      `nbe-graph nbe-zoom-${zoom} ${focusClass} ${highlightClass} ${className}`;

    return (
      <div tabIndex="0" className={classes}>
        <div className="nbe-graph-viewport">
          <div className="nbe-graph-canvas" style={canvasSize}>
            <div className="nbe-graph-nodes">
              {renderVertices()}
              {renderEdges()}
            </div>
            <svg className="nbe-links">
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


  canvasSize( measurements ) {
    var w = 0;
    var h = 0;
    const padding = 50;
    const { max } = Math;

    const measure = node => {
      const { box: {
        coords: { left, top },
        dimensions: { width, height }
      } } = node;
      w = max( w, left + width );
      h = max( h, top + height );
    };
    measurements.vertices.forEach( measure );
    measurements.edges.forEach( measure );

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
