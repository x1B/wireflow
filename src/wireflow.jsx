// The wireflow API:

import Graph from './components/graph';

import graphModel from './flux/graph/graph-model';
import GraphStore from './flux/graph/graph-store';

import historyActions from './flux/history/history-actions';
import HistoryStore from './flux/history/history-store';

import layoutActions from './flux/layout/layout-actions';
import layoutModel from './flux/layout/layout-model';
import LayoutStore from './flux/layout/layout-store';

import settingsActions from './flux/settings/settings-actions';
import settingsModel from './flux/settings/settings-model';
import SettingsStore from './flux/settings/settings-store';

import SelectionStore from './flux/selection/selection-store';

import Dispatcher from './flux/dispatcher';

import History from './components/history';


export default {
  selection: {
    SelectionStore
  },
  history: {
    actions: historyActions,
    HistoryStore
  },
  layout: {
    actions: layoutActions,
    model: layoutModel,
    LayoutStore
  },
  graph: {
    model: graphModel,
    GraphStore
  },
  settings: {
    actions: settingsActions,
    model: settingsModel,
    SettingsStore
  },
  Dispatcher,
  components: {
    Graph,
    History
  }
};
