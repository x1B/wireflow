var Graph = React.createClass( {

   getInitialState() {
      return {
         measurements: null
      };
   },

   getDefaultProps() {
      return {
         types: {},
         edges: {},
         vertices: {},
         layout: {},
         zoom: 100,
         hasFocus: false
      }
   },

   render() {

      var self = this;
      console.log( 'TOP RENDER' );

      var {
         measurements
      } = self.state;

      var {
         types,
         edges,
         vertices,
         layout,
         zoom,
         hasFocus
      } = self.props;

      return (
         <div tabIndex="0" className={classes()}>
            <div className="nbe-graph-viewport">
               <div className="nbe-graph-canvas">
                  <div className="nbe-graph-nodes">
                     {renderVertices()}
                     {renderEdges()}
                  </div>
                  <svg>
                     {renderLinks(measurements)}
                  </svg>
               </div>
            </div>
         </div>
      );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function classes() {
         return [
            'nbe-theme-fusebox-app', // :TODO: read from props...
            'nbe-graph',
            hasFocus ? 'nbe-has-focus' : '',
            'nbe-zoom-' + zoom
         ].join( ' ' );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function renderVertices() {
         return keys( vertices ).map( key => {
            var v = vertices[ key ];
            var vertexLayout = layout.vertices[ key ];
            return <Vertex key={key}
                           layout={vertexLayout}
                           ports={v.ports}
                           label={v.label}
                           measurePort={createMeasurePort(key)} />;
         } );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function renderEdges() {
         return keys( edges ).filter( key =>
            !types[ edges[ key ].type ].simple
         ).map( key => {
            var e = edges[ key ];
            var edgeLayout = layout.edges[ key ];
            return <Edge key={key}
                         type={e.type}
                         ports={e.ports}
                         label={e.label || key}
                         layout={edgeLayout} />;
         } );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function renderLinks() {
         if( !measurements ) {
            return [];
         }

         return linksFromVertices().map( link =>
            <Link key={link.key} type={link.type} from={link.measurements.from} to={link.measurements.to} />
         );

         function linksFromVertices() {
            return flatten( keys( vertices ).map( key =>
               flatten( [ 'inbound', 'outbound' ].map( direction => links( key, direction ) ) )
            ) );


            // :TODO: complete with matching edge...
            // :TODO: adjust for inbound ports
            function links( vertexId, direction ) {
               var vertex = vertices[ vertexId ];
               return vertex.ports[ direction ].map( port => {
                  return {
                     type: port.type,
                     key: key + '/' + port.id,
                     measurements: {
                        from: measurements.vertices[ vertexId ].ports.outbound[ port.id ],
                        to: {}
                     }
                  };
               } );
            }

         }
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function flatten( arrays ) {
         return [].concat.apply( [], arrays );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function createMeasurePort( vertexId ) {
         return function( direction, port, coords ) {
            self.setState( function updateState( state ) {

               var measurements = state.measurements || {};

               var update = React.addons.update;

               if ( !measurements.vertices ) {
                  measurements = update( measurements, {vertices: {$set: {}}} );
               }

               if ( !measurements.vertices[vertexId] ) {
                  var prepareCommand = {vertices: {}};
                  prepareCommand.vertices[vertexId] = {$set: {ports: {inbound: {}, outbound: {}}}};
                  measurements = update( measurements, prepareCommand );
               }

               var command = {vertices: {}};
               command.vertices[vertexId] = {ports: {inbound: {}, outbound: {}}};
               command.vertices[vertexId].ports[direction][port.id] = { $set: coords };
               measurements = update( measurements, command );

               return { measurements: measurements };
            } );
         }
      }

   }

} );
