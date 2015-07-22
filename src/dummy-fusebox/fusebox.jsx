import * as React from 'react';
import * as data from './data';
import * as Graph from '../components/graph';
import * as Dispatcher from '../dispatcher';
import * as LayoutStore from '../stores/layout-store';
import * as GraphStore from '../stores/graph-store';
import * as MetricsStore from '../stores/metrics-store';

import { convert } from '../model';

// application state:
const graph = convert.graph( data.graph );
const layout = convert.layout( data.layout );
const types = convert.types( data.types );

const dispatcher = new Dispatcher( render );
new MetricsStore( dispatcher );
const graphStore = new GraphStore( dispatcher, graph, types );
const layoutStore = new LayoutStore( dispatcher, layout, types );

render();


function render() {
  React.render(
    <Graph model={graphStore.graph}
           types={types}
           layout={layoutStore.layout}
           eventHandler={dispatcher.dispatch} />,
    document.getElementById( 'root' )
  );
}
