import { Map } from 'immutable';

const durationMs = 1000;

var counters = Map();
var durations = Map();
var timeout;

function count( event ) {
  counters = counters.set( event.what, (counters.get( event.what ) || 0) + 1 );
  durations = durations.set( event.what, (durations.get( event.what ) || 0) + event.duration );
  timeout = timeout || window.setTimeout( report, durationMs );
}

function round( number ) {
  return Math.round( number * 1000 ) / 1000;
}

function report() {
  const pad = n => n > 999 ? '' : ' ' + pad( 10 * n );
  const message = counters.entrySeq().map(
    ([ component, c ], _) => {
      const d = durations.get( component );
      const formatD = d ? '×' + round(d / c) + 'ms' : '';
      return `${pad(c)} ${c} | ${formatD}  ${component}`;
    }
  ).toJS().join( '\n ' );
  window.console.info( 'Metrics over ' + durationMs + 'ms \n', message );

  window.clearTimeout( timeout );
  timeout = null;
  counters = Map();
  durations = Map();
}

export default count;
