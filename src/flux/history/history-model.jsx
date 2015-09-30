import { Record } from 'immutable';

const Checkpoint = Record({
  before: null,
  at: null
}, 'Checkpoint');

export {
  Checkpoint
};
