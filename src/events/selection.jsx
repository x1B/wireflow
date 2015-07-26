import { Record } from 'immutable';
import { Coords } from '../model';

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
  box: null,
  type: () => SelectionDragged
}, 'SelectionDragged');

const SelectionMoved = Record({
  by: Coords(),
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
