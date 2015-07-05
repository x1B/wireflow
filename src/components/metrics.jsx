import * as React from 'react';
import { Map } from 'immutable';

import { Rendered }  from '../events';
import * as options from '../util/options';
import * as shallowEqual from '../util/shallow-equal';


const durationMs = 1000;

var counters = Map();
var timeout;

const Metrics = React.createClass( {

   render() {
      const props = { eventHandler: this.handleEvent };
      const children = React.Children.map( this.props.children, ( child =>
         React.cloneElement( child, props )
      ) );
      return <div className="nbe-metrics">{ children }</div>;
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   handleEvent( event ) {
      const type = event.type();

      if( type === Rendered ) {
         counters = counters.set( event.what, (counters.get( event.what ) || 0) + 1 );
         if( !timeout ) {
            timeout = setTimeout( this.report, durationMs );
         }
         return;
      }

      this.bubble( event );
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   bubble( event ) {
      const { eventHandler } = this.props;
      return eventHandler && eventHandler( event );
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   report() {
      const pad = n => n > 999 ? '' : ' ' + pad( 10 * n );

      const message = counters.entrySeq().map(
         ([component, count], _) => pad( count ) + count + ' × ' + component
      ).toJS().join( '\n ' );

      console.info( 'Metrics: (' + durationMs + 'ms) \n', message );
      counters = Map();
      clearTimeout( timeout );
      timeout = null;
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   shouldComponentUpdate( nextProps, nextState ) {
      return !shallowEqual( nextProps, this.props );
   }

} );

export default Metrics;
