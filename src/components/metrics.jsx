define( [
   'react',
   'immutable',
   '../events'
], function( React, Immutable, events ) {
   'use strict';

   const { Map } = Immutable;
   const { Rendered } = events;

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

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      handleEvent( event ) {
         const type = event.type();
         if( type === Rendered ) {
            counters = counters.set( event.what, (counters.get( event.what ) || 0) + 1 );
            if( !timeout ) {
               timeout = setTimeout( this.report, durationMs );
            }
            return;
         }

         if( this.props.eventHandler ) {
            this.props.eventHandler( event );
         }
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      report() {
         const pad = n => n > 999 ? '' : ' ' + pad( 10 * n );

         const message = counters.entrySeq().map(
            ([component, count], _) => pad( count ) + count + ' × ' + component
         ).toJS().join( '\n ' );

         console.info( 'Metrics: (' + durationMs + 'ms) \n', message ); // :TODO: DELETE ME
         counters = Map();
         clearTimeout( timeout );
         timeout = null;
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      shouldComponentUpdate( nextProps, nextState ) {
         return !shallowEqual( nextState, this.state ) || !shallowEqual( nextProps, this.props );
      }

   } );

   return Metrics;

} );
