import { Record } from 'immutable';


const UiUndo = Record({
  type: () => UiUndo
}, 'UiUndo');

const UiRedo = Record({
  type: () => UiRedo
}, 'UiRedo');

/**
 * Dispatched by various stores to request inserting a checkpoint *before*
 * performing a destructive operation.
 */
const CreateCheckpoint = Record({
  type: () => CreateCheckpoint
}, 'CreateCheckpoint');

/** Dispatched by various stores to follow up on new checkpoints. */
const StateSaved = Record({
  storeId: null,
  state: null,
  type: () => StateSaved
}, 'StateSaved');

/** Dispatched by the history store to restore the state at a checkpoint. */
const StateRestored = Record({
  storeId: null,
  state: null,
  type: () => StateRestored
}, 'StateRestored');


export default {
  CreateCheckpoint,
  StateSaved,
  StateRestored,
  UiUndo,
  UiRedo
};
