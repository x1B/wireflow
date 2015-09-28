// The wireflow API:

import * as Graph from './components/graph';
import * as History from './components/history';

import * as Dispatcher from './dispatcher';
import * as model from './model';

import { CreateCheckpoint, UiUndo, UiRedo } from './actions/history';
import { AutoLayout } from './actions/layout';

import * as LayoutStore from './stores/layout-store';
import * as GraphStore from './stores/graph-store';
import * as SelectionStore from './stores/selection-store';
import * as HistoryStore from './stores/history-store';

export default {
  actions: {
    CreateCheckpoint,
    AutoLayout,
    UiUndo,
    UiRedo
  },
  stores: {
    LayoutStore,
    GraphStore,
    SelectionStore,
    HistoryStore
  },
  components: {
    Graph,
    History
  },
  model,
  Dispatcher
};
