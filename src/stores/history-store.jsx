import { Record, List, Map } from 'immutable';

import { Checkpoint } from '../model';

import {
  CreateCheckpoint,
  SaveState,
  RestoreState,
  UiUndo,
  UiRedo
} from '../actions/history';


const LogEntry = Record({ at: null, state: null }, 'LogEntry');


class HistoryStore {

  constructor( dispatcher ) {
    this.dispatcher = dispatcher;

    // points to the current state, always even
    this.now = 0;
    // pointers "between" states, always odd
    this.checkpoints = List();
    this.storeLogs = Map();


    dispatcher.register( SaveState, act => {
      if( !this.storeLogs.has( act.storeId ) ) {
        this.storeLogs = this.storeLogs.set( act.storeId, List() );
      }
      this.storeLogs = this.storeLogs.update( act.storeId, log => {
        const last = log.last();
        if( last && act.state === last.state ) {
          return log;
        }
        const front = log.pop();
        const doReplace = last && ( last.at === this.now );
        return ( doReplace ? front : log ).push( LogEntry({
          at: this.now,
          state: act.state
        }) );
      } );
    } );


    dispatcher.register( CreateCheckpoint, act => {
      const now = this.now;

      // cut off undo'ed checkpoints and their states
      while( this.checkpoints.count() && now < this.checkpoints.last().at ) {
        this.checkpoints = this.checkpoints.pop();
      }
      this.storeLogs.forEach( (_, storeId) => {
        this.storeLogs = this.storeLogs.update( storeId, log =>
          log.filter( entry => entry.at <= now )
        );
      } );

      this.checkpoints = this.checkpoints.push( Checkpoint({
        at: now + 1,
        before: act.before
      }) );
      this.now = now + 2;
    } );


    dispatcher.register( UiUndo, () => {
      if( this.now > 0 ) {
        this.move( this.now, this.now - 2 );
      }
    } );


    dispatcher.register( UiRedo, () => {
      if( this.checkpoints.count() && this.now < this.checkpoints.last().at ) {
        this.move( this.now, this.now + 2 );
      }
    } );

  }

  move( from, to ) {
    this.storeLogs.forEach( (log, storeId) => {
      const latestStates = log.reverse();
      const fromEntry = latestStates.skipWhile( _ => _.at > from ).first();
      const toEntry = latestStates.skipWhile( _ => _.at > to ).first();
      if( fromEntry && toEntry && fromEntry.state !== toEntry.state ) {
        this.dispatcher.dispatch(
          RestoreState({ storeId, state: toEntry.state })
        );
      }
    } );
    this.now = to;
  }

}

export default HistoryStore;
