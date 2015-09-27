import { Record } from 'immutable';

const HandleFocusReceived = Record({
  domNode: null,
  type: () => HandleFocusReceived
}, 'HandleFocusReceived');

const HandleFocusLost = Record({
  type: () => HandleFocusLost
}, 'HandleFocusLost');

export default {
  HandleFocusReceived,
  HandleFocusLost
};
