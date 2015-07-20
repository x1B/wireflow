import * as React from 'react';
import * as data from './data';
import * as Metrics from '../components/metrics';
import * as Graph from '../components/graph';
import * as LayoutEditor from '../components/layout-editor';
import * as ModelEditor from '../components/model-editor';

import { convert } from '../model';
import { LayoutModified } from '../events/layout';
import { GraphModified } from '../events/graph';

// application state:
var graph = convert.graph( data.graph );
var layout = convert.layout( data.layout );
var types = convert.types( data.types );

render();


function render() {

  React.render(
    <Metrics eventHandler={handleEvent}>
      <ModelEditor model={graph} types={types}>
        <LayoutEditor layout={layout}>
          <Graph model={graph} types={types} layout={layout} />
        </LayoutEditor>
      </ModelEditor>
    </Metrics>,
    document.getElementById( 'root' )
  );

}


function handleEvent( event ) {
  const type = event.type();
  if( type === LayoutModified ) {
    layout = event.layout;
    return render();
  }
  if( type === GraphModified ) {
    graph = event.graph;
    return render();
  }
  window.console.log( 'Unhandled event: (type: %o): %o', event.type(), event.toJS() ); // :TODO: DELETE ME
}
