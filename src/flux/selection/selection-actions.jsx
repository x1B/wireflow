import { Record } from 'immutable';


const DeleteSelection = Record({
  type: () => DeleteSelection
}, 'DeleteSelection');

const SelectEdge = Record({
  edge: null,
  type: () => SelectEdge
}, 'SelectEdge');

const SelectVertex = Record({
  vertex: null,
  type: () => SelectVertex
}, 'SelectVertex');

const DeselectEdge = Record({
  edge: null,
  type: () => DeselectEdge
}, 'DeselectEdge');

const DeselectVertex = Record({
  vertex: null,
  type: () => DeselectVertex
}, 'DeselectVertex');

const ResizeSelection = Record({
  isExtension: false,
  coords: null,
  dimensions: null,
  type: () => ResizeSelection
}, 'ResizeSelection');

const MoveSelection = Record({
  reference: null,
  offset: null,
  type: () => MoveSelection
}, 'MoveEdge');

const ClearSelection = Record({
  type: () => ClearSelection
}, 'ClearSelection');

const CopySelection = Record({
  copyEvent: null,
  type: () => CopySelection
}, 'CopySelection' );

const CutSelection = Record({
  cutEvent: null,
  type: () => CutSelection
}, 'CutSelection' );

const PasteClipboard = Record({
  pasteEvent: null,
  type: () => PasteClipboard
}, 'PasteClipboard' );

export default {
  CopySelection,
  CutSelection,
  PasteClipboard,
  DeleteSelection,
  ResizeSelection,
  MoveSelection,
  ClearSelection,
  DeselectVertex,
  SelectVertex,
  DeselectEdge,
  SelectEdge
};
