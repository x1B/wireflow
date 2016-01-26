import React from 'react';
import ReactDom from 'react-dom';

import data from './data';
import api from '../wireflow';


const {
  selection: {
    SelectionStore
  },
  history: {
    actions: { CreateCheckpoint },
    HistoryStore
  },
  layout: {
    actions: { AutoLayout },
    model: { convert: { layout } },
    LayoutStore
  },
  graph: {
    model: { convert: { graph, types } },
    GraphStore
  },
  settings: {
    actions: { ChangeMode },
    model: { Settings, READ_ONLY, READ_WRITE },
    SettingsStore
  },
  Dispatcher,
  components: { Graph }
} = api;


const dispatcher = new Dispatcher( render );
new HistoryStore( dispatcher );
const graphStore = new GraphStore( dispatcher, graph( data.test.graph ), types( data.test.types ) );
const layoutStore = new LayoutStore( dispatcher, graphStore, { layout: layout( data.test.layout ) } );
const settingsStore = new SettingsStore( dispatcher, Settings({ mode: READ_WRITE }) );
const selectionStore = new SelectionStore( dispatcher, layoutStore, graphStore );

function toggleMode() {
  dispatcher.dispatch( ChangeMode({
    mode: settingsStore.settings.mode === READ_ONLY ? READ_WRITE : READ_ONLY
  }) );
  render();
}

function autoLayout() {
  dispatcher.dispatch( CreateCheckpoint() );
  dispatcher.dispatch( AutoLayout() );
  render();
}


function render() {

  ReactDom.render(
    <div className='demo-wrapper'>
      <div className='demo-menu'>
        <button onClick={autoLayout}>Auto-Layout</button>
        <label>
          <input type="checkbox"
                 checked={settingsStore.settings.mode === READ_ONLY}
                 onChange={toggleMode} /> Read-Only
        </label>
      </div>
      <div className='demo-editor'>
        <Graph className={'nbe-theme-fusebox-app'}
               types={graphStore.types}
               model={graphStore.graph}
               layout={layoutStore.layout}
               measurements={layoutStore.measurements}
               settings={settingsStore.settings}
               selection={selectionStore.selection}
               eventHandler={dispatcher.dispatch} />
      </div>
    </div>,
    document.getElementById( 'demo-root' )
  );
}
