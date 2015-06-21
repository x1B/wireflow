var IN = 'inbound', OUT = 'outbound';

var update = React.addons.update;


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

      var { measurements } = self.state;

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
                  <svg className="nbe-links">
                     {renderLinks()}
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
                           portMeasureHandler={portMeasureHandler( key )} />;
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
                         layout={edgeLayout}
                         measureHandler={edgeMeasureHandler( key )} />;
         } );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function renderLinks() {
         if( !measurements ) {
            return [];
         }

         var vertexIds = keys( vertices );

         // create lookup tables mapping simple edges to the coords of their representative ports
         var portCoordsLookup = portCoordsByEdgeId( vertexIds );

         return flatten( vertexIds.map( vertexId =>
            flatten( [ IN, OUT ].map( direction => links( vertexId, direction ) ) )
         ) );

         function links( vertexId, direction ) {
            var vertex = vertices[ vertexId ];
            var vertexMeasurements = measurements.vertices[ vertexId ];
            var vertexCoords = layout.vertices[ vertexId ];

            return vertex.ports[ direction ]
               .filter( port => !!port.edgeId )
               .map( port => {
                  var a = add( vertexMeasurements.ports[ direction ][ port.id ], vertexCoords );
                  var otherDirection = direction === IN ? OUT : IN;
                  var b = measurements.edges[ port.edgeId ] || portCoordsLookup[ otherDirection ][ port.edgeId ];
                  return <Link key={vertexId + '/' + port.id}
                               type={port.type}
                               from={a}
                               to={b} />
               } );
         }

         function portCoordsByEdgeId( vertexIds ) {
            var coords = {};
            [ IN, OUT ].forEach( direction => {
               var table = coords[ direction ] = {};
               vertexIds.forEach( id => {
                  var vertexMeasurements = measurements.vertices[ id ];
                  var vertexCoords = layout.vertices[ id ];
                  var portCoords = vertexMeasurements.ports[ direction ];
                  vertices[ id ].ports[ direction ].forEach( port => {
                     if( port.edgeId ) {
                        table[ port.edgeId ] = add( portCoords[ port.id ], vertexCoords );
                     }
                  } );
               } );
            } );
            return coords;
         }

         function add( aCoords, bCoords ) {
            return {
               left: aCoords.left + bCoords.left,
               top: aCoords.top + bCoords.top
            };
         }
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function flatten( arrays ) {
         return [].concat.apply( [], arrays );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function portMeasureHandler( vertexId ) {
         return function( direction, port, coords ) {
            self.setState( function updateState( state ) {
               var measurements = state.measurements || { edges: {}, vertices: {} };

               if ( !measurements.vertices[ vertexId ] ) {
                  var prepareCommand = { vertices: {} };
                  prepareCommand.vertices[ vertexId ] = { $set: { ports: { inbound: {}, outbound: {} } } };
                  measurements = update( measurements, prepareCommand );
               }

               var command = { vertices: {} };
               command.vertices[ vertexId ] = { ports: {} };
               command.vertices[ vertexId ].ports[ direction ] = {};
               command.vertices[ vertexId ].ports[ direction ][ port.id ] = { $set: coords };
               return { measurements: update( measurements, command ) };
            } );
         }
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      // :TODO: maybe determine from layout instead...
      function edgeMeasureHandler( edgeId ) {
         return function( coords ) {
            self.setState( function updateState( state ) {
               var measurements = state.measurements || { edges: {}, vertices: {} };
               var command = { edges: {} };
               command.edges[ edgeId ] = { $set: coords };
               return { measurements: update( measurements, command ) };
            } );
         }
      }

   }

} );
