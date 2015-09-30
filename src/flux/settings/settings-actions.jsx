import { Record } from 'immutable';


const ViewportMoved = Record({
  left: null,
  top: null,
  type: () => ViewportMoved
}, 'ViewportMoved');

const ViewportMeasured = Record({
  width: null,
  height: null,
  type: () => ViewportMeasured
}, 'ViewportMeasured');

const ChangeMode = Record({
  mode: null,
  type: () => ChangeMode
}, 'ChangeMode');

export default {
  ViewportMoved,
  ViewportMeasured,
  ChangeMode
};
