import { Record, List, Map } from 'immutable';

import { Checkpoint } from '../model';

import {
  CreateCheckpoint,
  SaveState,
  RestoreState,
  UiUndo,
  UiRedo
} from '../actions/history';


const LogEntry = Record({ checkpoint: null, state: null }, 'LogEntry');


class HistoryStore {

  constructor( dispatcher ) {
    this.dispatcher = dispatcher;

    this.now = 0;
    this.log = List();
    this.storeLogs = Map();

    dispatcher.register( CreateCheckpoint, act => {
      const now = this.now;

      // cut off undo'ed checkpoints and their states
      while( this.log.count() && now < this.log.last().index ) {
        this.log = this.log.pop();
      }
      this.storeLogs.forEach( (storeId, log) => {
        this.storeLogs.update( storeId, storeLog => {
          storeLog.filter( _ => _.checkpoint <= now );
        } );
      } );

      this.log = this.log.push( Checkpoint({
        index: now,
        before: act.before
      }) );
      this.checkpoint = now + 1;
    } );

    dispatcher.register( SaveState, act => {
      if( !this.storeLogs.has( act.storeId ) ) {
        this.storeLogs = this.storeLogs.set( act.storeId, List() );
      }
      this.storeLogs.update( act.storeId, log => {
        return log.push( LogEntry({
          checkpoint: this.checkpoint,
          state: act.state
        }) );
      } );
    } );

    dispatcher.register( UiUndo, ev => {
      --this.checkpoint;
      this.storeLogs.forEach( (storeId, log) => {
        log.reverse().forEach( ({checkpoint, state}) => {
          if( checkpoint <= this.checkpoint ) {
            dispatcher.dispatch( RestoreState({ storeId, state}) );
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
