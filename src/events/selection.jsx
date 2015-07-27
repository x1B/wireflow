import { Record } from 'immutable';


const EdgeSelected = Record({
  edge: null,
  type: () => EdgeSelected
}, 'EdgeSelected');

const EdgeDeselected = Record({
  edge: null,
  type: () => EdgeDeselected
}, 'EdgeDeselected');

const VertexSelected = Record({
  vertex: null,
  type: () => VertexSelected
}, 'VertexSelected');

const VertexDeselected = Record({
  vertex: null,
  type: () => VertexDeselected
}, 'VertexDeselected');

const SelectionDragged = Record({
  coords: null,
  dimensions: null,
  type: () => SelectionDragged
}, 'SelectionDragged');

const SelectionMoved = Record({
  reference: null,
  offset: null,
  type: () => SelectionMoved
}, 'EdgeMoved');

const SelectionCleared = Record({
  type: () => SelectionCleared
}, 'SelectionCleared');

export default {
  SelectionDragged,
  SelectionMoved,
  SelectionCleared,
  VertexDeselected,
  VertexSelected,
  EdgeDeselected,
  EdgeSelected
};
