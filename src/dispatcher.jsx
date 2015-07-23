import { Map, List } from 'immutable';


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
    const anyDispatched = this.processQueue();
    if( anyDispatched && !this.frameRequested ) {
      window.requestAnimationFrame( () => {
        this.frameRequested = false;
        this.onAfterDispatch();
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
        window.console.log( 'Unhandled event: (type: %o)', event.toJS() ); // :TODO: DELETE ME
      }
    }
    return anyDispatched;
  }

}

export default Dispatcher;
