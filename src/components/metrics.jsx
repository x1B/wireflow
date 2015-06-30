define( [
   'react',
   'immutable',
   '../events'
], function( React, Immutable, events ) {
   'use strict';

   const { Map } = Immutable;
   const { Rendered } = events;

   var counters = Map();
   var timeout;

   const Metrics = React.createClass( {

      render() {
         var props = { eventHandler: this.handleEvent };
         var children = React.Children.map( this.props.children, ( child =>
            React.cloneElement( child, props )
         ) );
         return <div>{ children }</div>;
      },

      handleEvent( event ) {
         var type = event.type();
         if( type === Rendered ) {
            counters = counters.set( event.what, (counters.get( event.what ) || 0) + 1 );
            if( !timeout ) {
               timeout = setTimeout( this.report, 1000 );
            }
            return;
         }

         if( this.props.eventHandler ) {
            this.props.eventHandler( event );
         }
      },

      report() {
         /*
         console.log( 'Metrics: ' ); // :TODO: DELETE ME
         counters.forEach( (value, key) => console.log( key + ' × ' + value  ) );
         */
         console.table( counters.entrySeq().map(
            ([key, value]) => ({ component: key, counter: value } )
         ).toJS() );
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
