import { Record } from 'immutable';


const UiUndo = Record({
  type: () => UiUndo
}, 'UiUndo');

const UiRedo = Record({
  type: () => UiRedo
}, 'UiRedo');

/**
 * Dispatched by various stores to insert a checkpoint
 * *before* performing a destructive operation.
 */
const CreateCheckpoint = Record({
  before: '',
  type: () => CreateCheckpoint
}, 'CreateCheckpoint');

/**
 * Dispatched by various stores to save state to the history store.
 * The next checkpoint will include all changes saved up to that point.
 */
const SaveState = Record({
  storeId: null,
  state: null,
  type: () => SaveState
}, 'SaveState');

/**
 * Dispatched by the history store to restore the state at a checkpoint.
 */
const RestoreState = Record({
  storeId: null,
  state: null,
  type: () => RestoreState
}, 'RestoreState');


export default {
  CreateCheckpoint,
  SaveState,
  RestoreState,
  UiUndo,
  UiRedo
};
