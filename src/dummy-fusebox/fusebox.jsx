define( [
   'react',
   './data',
   '../model',
   '../events',
   '../components/metrics',
   '../components/graph',
   '../components/graph-layout-editor'
], function( React, data, model, events, Metrics, Graph, GraphLayoutEditor ) {
   'use strict';

   const { components, convert } = model;
   const { Rendered } = events;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const graph = convert.graph( data.graph );
   const layout = convert.layout( data.layout );
   const types = convert.types( data.types );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   React.render(
      <Metrics>
         <GraphLayoutEditor baseLayout={layout}>
            <Graph types={types} vertices={graph.vertices} edges={graph.edges} />
         </GraphLayoutEditor>
      </Metrics>,
      document.getElementById( 'root' )
   );

} );
