import { Record } from 'immutable';


const ViewportMoved = Record({
  left: null,
  top: null,
  type: () => ViewportMoved
}, 'ViewportMoved');

const MinimapResized = Record({
  width: null,
  type: () => MinimapResized
}, 'MinimapResized');

const ViewportMeasured = Record({
  width: null,
  height: null,
  type: () => ViewportMeasured
}, 'ViewportMeasured');

const ChangeMode = Record({
  mode: null,
  type: () => ChangeMode
}, 'ChangeMode');

const HandleFocusReceived = Record({
  domNode: null,
  type: () => HandleFocusReceived
}, 'HandleFocusReceived');

const HandleFocusLost = Record({
  type: () => HandleFocusLost
}, 'HandleFocusLost');


export default {
  ViewportMoved,
  ViewportMeasured,
  MinimapResized,
  ChangeMode,
  HandleFocusReceived,
  HandleFocusLost
};
