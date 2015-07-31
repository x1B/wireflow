import { Map, List } from 'immutable';

import { Rendered } from './actions/metrics';
import count from './util/metrics';

const now = () => window.performance.now();

class Dispatcher {

  constructor( onAfterDispatch ) {
    this.queue = [];
    this.registry = Map();
    this.dispatch = this.dispatch.bind( this );
    this.frameRequested = false;
    this.onAfterDispatch = onAfterDispatch;
  }

  register( type, callback ) {
    this.registry = this.registry.update( type, list =>
      list ? list.push( callback ) : List.of( callback ) );
  }

  dispatch( event ) {
    this.queue.push( event );

    const markA = now();
    const anyDispatched = this.processQueue();
    count( Rendered({ what: 'dispatch', duration: now() - markA }) );

    if( anyDispatched && !this.frameRequested ) {
      window.requestAnimationFrame( () => {
        this.frameRequested = false;
        const markB = window.performance.now();
        this.onAfterDispatch();
        count( Rendered({ what: 'render', duration: now() - markB }) );
      } );
      this.frameRequested = true;
    }
  }

  processQueue() {
    const run = event => cb => cb( event );
    var anyDispatched = false;
    while( this.queue.length ) {
      const event = this.queue.shift();
      const callbacks = this.registry.get( event.type() );
      if( callbacks ) {
        callbacks.forEach( run( event ) );
        anyDispatched = true;
      }
      else {
        window.console.log(
          'Unhandled event: (type: %s): %o',
          event[ '_name' ],
          event.toJS()
        );
      }
    }
    return anyDispatched;
  }

}

export default Dispatcher;
