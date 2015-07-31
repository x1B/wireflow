import * as React from 'react';
import * as data from './data';
import * as Graph from '../components/graph';
import * as History from '../components/history';
import * as Dispatcher from '../dispatcher';

import * as LayoutStore from '../stores/layout-store';
import * as GraphStore from '../stores/graph-store';
import * as SelectionStore from '../stores/selection-store';
import * as HistoryStore from '../stores/history-store';

import { convert } from '../model';

// application starting state:
const graph = convert.graph( data.graph );
const layout = convert.layout( data.layout );
const types = convert.types( data.types );

const dispatcher = new Dispatcher( render );
const graphStore = new GraphStore( dispatcher, graph, types );
const layoutStore = new LayoutStore( dispatcher, layout, types );
const selectionStore = new SelectionStore( dispatcher, layoutStore, graphStore );
const historyStore = new HistoryStore( dispatcher );

render();


function render() {
  React.render(
    <div>
      <History log={historyStore.log} />
      <Graph model={graphStore.graph}
             types={types}
             className={'nbe-theme-fusebox-app'}
             layout={layoutStore.layout}
             measurements={layoutStore.measurements}
             selection={selectionStore.selection}
             eventHandler={dispatcher.dispatch} />
    </div>,
    document.getElementById( 'root' )
  );
}
