import { Map } from 'immutable';

const durationMs = 1000;

var counters = Map();
var timeout;

function count( event ) {
  counters = counters.set( event.what, (counters.get( event.what ) || 0) + 1 );
  timeout = timeout || window.setTimeout( report, durationMs );
}

function report() {
  const pad = n => n > 999 ? '' : ' ' + pad( 10 * n );
  const message = counters.entrySeq().map(
    ([ component, c ], _) => pad( c ) + c + ' × ' + component
  ).toJS().join( '\n ' );
  window.console.info( 'Metrics: (' + durationMs + 'ms) \n', message );

  window.clearTimeout( timeout );
  timeout = null;
  counters = Map();
}

export default count;
