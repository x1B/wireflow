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
      this.storeLogs.forEach( (_, storeId) => {
        this.storeLogs.update( storeId, log =>
          log.filter( entry => entry.checkpoint <= now )
        );
      } );

      this.log = this.log.push( Checkpoint({
        index: now,
        before: act.before
      }) );
      this.now = now + 1;
    } );

    dispatcher.register( SaveState, act => {
      if( !this.storeLogs.has( act.storeId ) ) {
        this.storeLogs = this.storeLogs.set( act.storeId, List() );
      }
      this.storeLogs.update( act.storeId, log => {
        return log.push( LogEntry({
          checkpoint: this.now,
          state: act.state
        }) );
      } );
    } );

    dispatcher.register( UiUndo, () => {
      this.now = this.now - 1;
      this.storeLogs = this.storeLogs.forEach( (log, storeId) => {
        log.reverse().forEach( ({checkpoint, state}) => {
          if( checkpoint <= this.now ) {
            dispatcher.dispatch( RestoreState({ storeId, state}) );
            return false;
          }
        } );
      } );
    } );

    dispatcher.register( UiRedo, () => {
      if( this.now === this.maxCheckpoint ) {
        return;
      }
      // :TODO:
    } );

  }

}

export default HistoryStore;
