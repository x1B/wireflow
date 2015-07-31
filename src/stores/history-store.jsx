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
        const front = log.pop();
        const end = log.last();
        const replace = end && ( end.at <= this.now );
        return ( replace ? front : log ).push( LogEntry({
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
      this.now = this.now - 2;
      this.storeLogs.forEach( (log, storeId) => {
        log.reverse().forEach( ({at, state}) => {
          if( at <= this.now ) {
            console.log( 'CLOG', 'RESTORE' ); // :TODO: DELETE ME
            dispatcher.dispatch( RestoreState({ storeId, state }) );
            return false;
          }
        } );
      } );
    } );


    dispatcher.register( UiRedo, () => {
      // :TODO:
    } );

  }

}

export default HistoryStore;
