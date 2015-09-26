import * as React from 'react';
import * as data from './data';

import * as api from '../wireflow';

const {
  Dispatcher,
  model: { convert },
  stores: { LayoutStore, GraphStore, SelectionStore, HistoryStore },
  components: { Graph, History }
} = api;


// application starting state:
const graph = convert.graph( data.graph );
const layout = convert.layout( data.layout );
const types = convert.types( data.types );

const dispatcher = new Dispatcher( render );

const historyStore = new HistoryStore( dispatcher );
const graphStore = new GraphStore( dispatcher, graph, types );
const layoutStore = new LayoutStore( dispatcher, layout, types );
const selectionStore = new SelectionStore( dispatcher, layoutStore, graphStore );

render();


function render() {
  React.render(
    <div>
      <History checkpoints={historyStore.checkpoints }
               now={ historyStore.now } />
      <Graph className={'nbe-theme-fusebox-app'}
             model={graphStore.graph}
             types={types}
             layout={layoutStore.layout}
             measurements={layoutStore.measurements}
             selection={selectionStore.selection}
             eventHandler={dispatcher.dispatch} />
    </div>,
    document.getElementById( 'root' )
  );
}
