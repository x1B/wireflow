import HistoryStore from '../history-store';
import {
  CreateCheckpoint, SaveState, RestoreState, UiUndo, UiRedo
} from '../history-actions';

import DispatcherMock from '../../testing/dispatcher-mock';


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
      dispatcher.handleAction( CreateCheckpoint({ before: 'set.to.A1' }) );
    } );

    it( 'inserts a checkpoint', () => {
      expect( store.checkpoints.toJS() ).toEqual([
        { at: 1, before: 'set.to.A1' }
      ]);
      expect( store.now ).toEqual( 2 );
      expect( store.storeLogs.toJS() ).toEqual( {} );
    } );


    describe( 'then asked to save state,', () => {

      beforeEach( () => {
        dispatcher.handleAction( SaveState({ storeId: 'A', state: 'A1' }) );
      } );

      it( 'saves state to the log', () => {
        expect( store.storeLogs.toJS() ).toEqual({
          A: [ { at: 2, state: 'A1' } ]
        });
      } );

    } );

  } );


  describe( 'asked to save state,', () => {

    beforeEach( () => {
      dispatcher.handleAction( SaveState({ storeId: 'A', state: 'A1' }) );
      dispatcher.handleAction( SaveState({ storeId: 'B', state: 'B1' }) );
    } );

    it( 'saves state to the log', () => {
      expect( store.storeLogs.toJS() ).toEqual({
        A: [ { at: 0, state: 'A1' } ],
        B: [ { at: 0, state: 'B1' } ]
      });
    } );


    describe( 'then to create a checkpoint,', () => {
      beforeEach( () => {
        dispatcher.handleAction( CreateCheckpoint({ before: 'set.to.A2' }) );
      } );

      it( 'inserts a checkpoint', () => {
        expect( store.checkpoints.toJS() ).toEqual([
          { at: 1, before: 'set.to.A2' }
        ]);
        expect( store.now ).toEqual( 2 );
      });

      it( 'keeps store log contents', () => {
        expect( store.storeLogs.toJS() ).toEqual({
          A: [ { at: 0, state: 'A1' } ],
          B: [ { at: 0, state: 'B1' } ]
        });
      } );


      describe( 'and then to save more state,', () => {
        beforeEach( () => {
          dispatcher.handleAction( SaveState({ storeId: 'A', state: 'A2' }) );
          dispatcher.handleAction( SaveState({ storeId: 'B', state: 'B1' }) );
        } );

        it( 'appends new state to the store log', () => {
          expect( store.storeLogs.get( 'A' ).toJS() ).toEqual(
            [ { at: 0, state: 'A1' }, { at: 2, state: 'A2' } ]
          );
        } );

        it( 'does not touch the store log where contents remain the same', () => {
          expect( store.storeLogs.get( 'B' ).toJS() ).toEqual(
            [ { at: 0, state: 'B1' } ]
          );
        } );

        describe( 'then to undo,', () => {

          beforeEach( () => {
            dispatcher.dispatch.calls.reset();
            dispatcher.handleAction( UiUndo() );
          } );

          it( 'restores the previous state from the store log', () => {
            expect( dispatcher.dispatch ).toHaveBeenCalledWith(
              RestoreState({ storeId: 'A', state: 'A1' })
            );
          } );

          it( 'does not restore state if untouched since checkpoint', () => {
            expect( dispatcher.dispatch ).not.toHaveBeenCalledWith(
              RestoreState({ storeId: 'B', state: 'B1' })
            );
          } );

          it( 'does not remove store log entries', () => {
            expect( store.storeLogs.toJS() ).toEqual({
              A: [ { at: 0, state: 'A1' }, { at: 2, state: 'A2' } ],
              B: [ { at: 0, state: 'B1' } ]
            });
          } );

          describe( 'and then to redo,', () => {
            beforeEach( () => {
              dispatcher.dispatch.calls.reset();
              dispatcher.handleAction( UiRedo() );
            } );

            it( 'restores the more recent state from the store log', () => {
              const restore = dispatcher.dispatch.calls.mostRecent().args[ 0 ];
              expect( restore.toJS() ).toEqual(
                { storeId: 'A', state: 'A2', type: RestoreState().type }
              );
            } );

            it( 'does not remove store log entries', () => {
              expect( store.storeLogs.toJS() ).toEqual({
                A: [ { at: 0, state: 'A1' }, { at: 2, state: 'A2' } ],
                B: [ { at: 0, state: 'B1' } ]
              });
            } );
          } );

          describe( 'and then to create a new checkpoint,', () => {
            beforeEach( () => dispatcher.handleAction(
              CreateCheckpoint({ before: 'set.to.A2x' })
            ) );

            it( 'discards any rewound states from the store log', () => {
              expect( store.storeLogs.toJS() ).toEqual({
                A: [ { at: 0, state: 'A1' } ],
                B: [ { at: 0, state: 'B1' } ]
              });
            } );

            it( 'replaces any rewound checkpoints with the new one', () => {
              expect( store.checkpoints.toJS() ).toEqual([
                { at: 1, before: 'set.to.A2x' }
              ]);
            } );

          } );

        } );

      } );

    } );


    describe( 'then asked to undo without a checkpoint,', () => {
      beforeEach( () => {
        dispatcher.handleAction( UiUndo() );
      } );

      it( 'does nothing', () => {
        expect( store.checkpoints.toJS() ).toEqual( [] );
        expect( store.now ).toEqual( 0 );
        expect( store.storeLogs.toJS() ).toEqual({
          A: [ { at: 0, state: 'A1' } ],
          B: [ { at: 0, state: 'B1' } ]
        });
      } );
    } );


    describe( 'and to save more state before the next checkpoint,', () => {
      beforeEach( () => {
        dispatcher.handleAction( SaveState({ storeId: 'A', state: 'A2' }) );
        dispatcher.handleAction( SaveState({ storeId: 'B', state: 'B2' }) );
        dispatcher.handleAction( SaveState({ storeId: 'B', state: 'B3' }) );
      } );

      it( 'replaces the previous state', () => {
        expect( store.storeLogs.toJS() ).toEqual({
          A: [ { at: 0, state: 'A2' } ],
          B: [ { at: 0, state: 'B3' } ]
        });
      } );
    } );

  } );

} );

export default {};
