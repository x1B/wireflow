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

    this.now = 0;
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
      if( this.now === 0 ) {
        return;
      }

      const newNow = this.now - 2;
      this.storeLogs.forEach( (log, storeId) => {
        const latestStates = log.reverse().skipWhile( _ => _.at > this.now );
        const fromEntry = latestStates.first();
        const toEntry = latestStates.skipWhile( _ => _.at > newNow ).first();
        if( !fromEntry || !toEntry ) {
          return;
        }

        if( fromEntry.state !== toEntry.state ) {
          dispatcher.dispatch(
            RestoreState({ storeId, state: toEntry.state })
          );
        }
      } );

      this.now = newNow;
    } );


    dispatcher.register( UiRedo, () => {
      // :TODO:
    } );

  }

}

export default HistoryStore;
