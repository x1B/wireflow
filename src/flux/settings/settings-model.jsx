import { List, Record } from 'immutable';


const READ_WRITE = 'read/write';
const READ_ONLY = 'read-only';
const InteractionModes = List.of( READ_ONLY, READ_WRITE );

const Viewport = Record({
  left: null,
  top: null,
  width: null,
  height: null,
  movedBy: null
}, 'Viewport');

const MinimapSettings = Record({
  width: 200
}, 'MinimapSettings');

const Settings = Record({
  mode: READ_WRITE,
  viewport: Viewport(),
  minimap: MinimapSettings(),
  hasFocus: false
}, 'Settings');

export default {
  InteractionModes,
  READ_ONLY,
  READ_WRITE,

  Viewport,
  Settings
};
