import * as React from 'react';
import { Map } from 'immutable';

import { Rendered } from '../events/metrics';
import * as shallowEqual from '../util/shallow-equal';


const durationMs = 1000;

var counters = Map();
var timeout;

const Metrics = React.createClass({

  render() {
    const props = { eventHandler: this.handleEvent };
    const children = React.Children.map( this.props.children, ( child =>
      React.cloneElement( child, props )
    ) );
    return <div className="nbe-metrics">{ children }</div>;
  },


  handleEvent( event ) {
    switch( event.type() ) {
      case Rendered:
        counters = counters.set( event.what, (counters.get( event.what ) || 0) + 1 );
        timeout = timeout || window.setTimeout( this.report, durationMs );
        return;
      default:
        this.bubble( event );
    }
  },


  bubble( event ) {
    const { eventHandler } = this.props;
    return eventHandler && eventHandler( event );
  },


  report() {
    const pad = n => n > 999 ? '' : ' ' + pad( 10 * n );
    const message = counters.entrySeq().map(
      ([ component, count ], _) => pad( count ) + count + ' × ' + component
    ).toJS().join( '\n ' );
    window.console.info( 'Metrics: (' + durationMs + 'ms) \n', message );

    window.clearTimeout( timeout );
    timeout = null;
    counters = Map();
  },


  shouldComponentUpdate( nextProps, nextState ) {
    return !shallowEqual( nextProps, this.props );
  }

});

export default Metrics;
