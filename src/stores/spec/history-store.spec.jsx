import HistoryStore from '../history-store';

import {
  CreateCheckpoint, SaveState, UiUndo, UiRedo
} from '../../actions/history';

import DispatcherMock from '../../tests/dispatcher-mock';


// Jasmine:
const { jasmine, describe, beforeEach, expect, it } = window;
const { any } = jasmine;

describe( 'A history store', () => {

  var dispatcher;
  var store;

  beforeEach( () => {
    dispatcher = new DispatcherMock();
    store = new HistoryStore( dispatcher );
  } );

  it( 'handles history actions', () => {
    expect( dispatcher.register )
      .toHaveBeenCalledWith( SaveState, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( CreateCheckpoint, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( UiUndo, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( UiRedo, any( Function ) );
  } );

  it( 'begins with an empty log', () => {
    expect( store.checkpoints.toJS() ).toEqual( [] );
    expect( store.now ).toEqual( 0 );
    expect( store.storeLogs.toJS() ).toEqual( {} );
  } );


  describe( 'asked to create a checkpoint,', () => {
    beforeEach( () => {
      dispatcher.handleAction( CreateCheckpoint({ before: 'set.to.A.1' }) );
    } );

    it( 'inserts a checkpoint', () => {
      expect( store.checkpoints.toJS() ).toEqual([
        { at: 1, before: 'set.to.A.1' }
      ]);
      expect( store.now ).toEqual( 2 );
      expect( store.storeLogs.toJS() ).toEqual( {} );
    } );


    describe( 'then asked to save state,', () => {

      beforeEach( () => {
        dispatcher.handleAction( SaveState({ storeId: 'A', state: 'A.1' }) );
      } );

      it( 'saves state to the log', () => {
        expect( store.storeLogs.toJS() ).toEqual({
          A: [ { at: 2, state: 'A.1' } ]
        });
      } );

    } );

  } );

  describe( 'asked to save state,', () => {

    beforeEach( () => {
      dispatcher.handleAction( SaveState({ storeId: 'A', state: 'A.1' }) );
      dispatcher.handleAction( SaveState({ storeId: 'B', state: 'B.1' }) );
    } );

    it( 'saves state to the log', () => {
      expect( store.storeLogs.toJS() ).toEqual({
        A: [ { at: 0, state: 'A.1' } ],
        B: [ { at: 0, state: 'B.1' } ]
      });
    } );


    describe( 'then asked to undo without a checkpoint,', () => {
      beforeEach( () => {
        dispatcher.handleAction( UiUndo() );
      } );

      it( 'does nothing', () => {
        expect( store.checkpoints.toJS() ).toEqual( [] );
        expect( store.now ).toEqual( 0 );
        expect( store.storeLogs.toJS() ).toEqual({
          A: [ { at: 0, state: 'A.1' } ],
          B: [ { at: 0, state: 'B.1' } ]
        });
      } );
    } );


    describe( 'and to save more state before the next checkpoint,', () => {
      beforeEach( () => {
        dispatcher.handleAction( SaveState({ storeId: 'A', state: 'A.2' }) );
        dispatcher.handleAction( SaveState({ storeId: 'B', state: 'B.2' }) );
        dispatcher.handleAction( SaveState({ storeId: 'B', state: 'B.3' }) );
      } );

      it( 'replaces the previous state', () => {
        expect( store.storeLogs.toJS() ).toEqual({
          A: [ { at: 0, state: 'A.2' } ],
          B: [ { at: 0, state: 'B.3' } ]
        });
      } );
    } );

  } );

} );

export default {};
