// The wireflow API:

import * as Graph from './components/graph';
import * as History from './components/history';

import * as Dispatcher from './dispatcher';
import * as model from './model';

import { CreateCheckpoint, UiUndo, UiRedo } from './actions/history';
import { AutoLayout } from './actions/layout';
import { ChangeMode } from './actions/settings';

import * as GraphStore from './stores/graph-store';
import * as HistoryStore from './stores/history-store';
import * as LayoutStore from './stores/layout-store';
import * as SelectionStore from './stores/selection-store';
import * as SettingsStore from './stores/settings-store';

export default {
  actions: {
    CreateCheckpoint,
    AutoLayout,
    ChangeMode,
    UiUndo,
    UiRedo
  },
  stores: {
    GraphStore,
    HistoryStore,
    LayoutStore,
    SelectionStore,
    SettingsStore
  },
  components: {
    Graph,
    History
  },
  model,
  Dispatcher
};
