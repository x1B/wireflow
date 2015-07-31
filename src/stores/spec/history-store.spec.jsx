import HistoryStore from '../history-store';
import {
  CreateCheckpoint,
  SaveState,
  UiUndo,
  UiRedo
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
      .toHaveBeenCalledWith( CreateCheckpoint, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( SaveState, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( UiUndo, any( Function ) );
    expect( dispatcher.register )
      .toHaveBeenCalledWith( UiRedo, any( Function ) );
  } );

} );

export default {};
