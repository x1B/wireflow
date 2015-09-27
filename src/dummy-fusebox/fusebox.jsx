import * as React from 'react';
import * as data from './data';

import * as api from '../wireflow';

const {
  Dispatcher,
  model: { convert, Settings, READ_ONLY, READ_WRITE },
  stores: { LayoutStore, GraphStore, SelectionStore, HistoryStore },
  components: { Graph }
} = api;


// application starting state:
const graph = convert.graph( data.graph );
const layout = convert.layout( data.layout );
const types = convert.types( data.types );

const dispatcher = new Dispatcher( render );

new HistoryStore( dispatcher );
const graphStore = new GraphStore( dispatcher, graph, types );
const layoutStore = new LayoutStore( dispatcher, layout, types );
const selectionStore = new SelectionStore( dispatcher, layoutStore, graphStore );


var settings = Settings({ mode: READ_ONLY });
const toggleMode = () => {
  settings = Settings({
    mode: settings.mode === READ_ONLY ? READ_WRITE : READ_ONLY
  });
  render();
};

function render() {
  // Later: <History checkpoints={historyStore.checkpoints } now={ historyStore.now } />

  React.render(
    <div className='demo-wrapper'>
      <div className='demo-menu'>
        <label>
          <input type="checkbox"
                 checked={settings.mode === READ_ONLY}
                 onChange={toggleMode} /> Read-Only
        </label>
      </div>
      <div className='demo-editor'>
        <Graph settings={settings}
               className={'nbe-theme-fusebox-app'}
               model={graphStore.graph}
               types={types}
               layout={layoutStore.layout}
               measurements={layoutStore.measurements}
               selection={selectionStore.selection}
               eventHandler={dispatcher.dispatch} />
      </div>
    </div>,
    document.getElementById( 'demo-root' )
  );
}
