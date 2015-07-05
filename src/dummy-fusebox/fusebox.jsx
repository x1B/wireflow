define( [
   'react',
   './data',
   '../model',
   '../events',
   '../components/metrics',
   '../components/graph',
   '../components/layout-editor',
   '../components/model-editor'
], function( React, data, model, events, Metrics, Graph, LayoutEditor, ModelEditor ) {
   'use strict';

   const { components, convert } = model;
   const { LayoutModified, GraphModified } = events;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   // application state:
   var graph = convert.graph( data.graph );
   var layout = convert.layout( data.layout );
   var types = convert.types( data.types );

   render();

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////


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
      console.log( 'Unhandled event: ', type ); // :TODO: DELETE ME
   }

} );
