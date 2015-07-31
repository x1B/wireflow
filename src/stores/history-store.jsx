import { Record, List, Map } from 'immutable';

import {
  CreateCheckpoint,
  StateSaved,
  StateRestored,
  UiUndo,
  UiRedo
} from '../actions/history';


const LogEntry = Record({ checkpoint: null, state: null }, 'LogEntry');

/**
 */
class HistoryStore {

  constructor( dispatcher ) {
    this.dispatcher = dispatcher;
    this.checkpoint = 0;
    this.maxCheckpoint = 0;
    this.storeLogs = Map();

    dispatcher.register( CreateCheckpoint, ev => {
      if( this.checkpoint < this.maxCheckpoint ) {
        // remove undo-ed states
        // :TODO:
        this.maxCheckpoint = this.checkpoint;
      }
      ++this.checkpoint;
      ++this.maxCheckpoint;
    } );

    dispatcher.register( StateSaved, ev => {
      if( !this.storeLogs.has( ev.storeId ) ) {
        this.storeLogs = this.storeLogs.set( ev.storeId, List() );
      }
      this.storeLogs.update( ev.storeId, log => {
        console.log( 'CLOG saved: ', ev.storeId ); // :TODO: DELETE ME
        log.push( LogEntry({ checkpoint: this.checkpoint, state: ev.state }) );
      } );
    } );

    dispatcher.register( UiUndo, ev => {
      --this.checkpoint;
      this.storeLogs.forEach( (storeId, log) => {
        console.log( 'CLOG restore: ', ev.storeId ); // :TODO: DELETE ME
        log.reverse().forEach( ({checkpoint, state}) => {
          if( checkpoint <= this.checkpoint ) {
            dispatcher.dispatch( StateRestored({ storeId, state}) );
            return false;
          }
        } );
      } );
    } );

    dispatcher.register( UiRedo, ev => {
      if( this.checkpoint === this.maxCheckpoint ) {
        return;
      }
      // :TODO:
    } );

  }

}

export default HistoryStore;
