import { Record } from 'immutable';

const UiFocusReceived = Record({
  domNode: null,
  type: () => UiFocusReceived
}, 'UiFocusReceived');

const UiFocusLost = Record({
  type: () => UiFocusLost
}, 'UiFocusLost');

const UiDelete = Record({
  type: () => UiDelete
}, 'UiDelete');

const UiCancel = Record({
  type: () => UiCancel
}, 'UiCancel');

const UiInsert = Record({
  graph: null,
  type: () => UiInsert
}, 'UiInsert');

export default {
  UiFocusReceived,
  UiFocusLost,
  UiDelete,
  UiCancel,
  UiInsert
};
