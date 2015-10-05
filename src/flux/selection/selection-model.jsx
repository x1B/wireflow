import { Map, Set, Record } from 'immutable';

const Clipboard = Record({
  graph: Map(),
  layout: Map()
});

const Selection = Record({
  vertices: Set(),
  edges: Set(),
  extensionOf: null,
  coords: null,
  dimensions: null
});

export default {
  Clipboard,
  Selection
};
