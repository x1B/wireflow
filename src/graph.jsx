var IN = 'inbound', OUT = 'outbound';

var { Map, List, Record } = Immutable;

var Coords = Record( { left: 0, top: 0 } );
var Dimensions = Record( { width: 0, height: 0 } );

var Graph = React.createClass( {

   getInitialState() {
      return {
         measurements: Map()
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
         if( measurements.isEmpty() ) {
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
            var edgeMeasurements = measurements.get( 'edges' );
            var portsMeasurements = measurements.getIn( [ 'vertices', vertexId, 'ports' ] );
            var vertexCoords = layout.vertices[ vertexId ];

            return vertex.ports[ direction ]
               .filter( port => !!port.edgeId )
               .map( port => {
                  var a = add( portsMeasurements.getIn( [ direction, port.id ] ), vertexCoords );
                  var otherDirection = direction === IN ? OUT : IN;
                  var b = edgeMeasurements.get( port.edgeId ) || portCoordsLookup[ otherDirection ][ port.edgeId ];
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
                  var portsMeasurements = measurements.getIn( [ 'vertices', id, 'ports', direction ] );
                  var vertexCoords = layout.vertices[ id ];
                  vertices[ id ].ports[ direction ].forEach( port => {
                     if( port.edgeId ) {
                        table[ port.edgeId ] = add( portsMeasurements.get( port.id ), vertexCoords );
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

      function portMeasureHandler( id ) {
         return function( direction, port, coords ) {
            self.setState( ({ measurements }) => ( {
               measurements: measurements.setIn( [ 'vertices', id, 'ports', direction, port.id ], coords )
            } ) );
         }
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function edgeMeasureHandler( edgeId ) {
         return function( coords ) {
            self.setState( ({ measurements }) => ( {
               measurements: measurements.setIn( [ 'edges', edgeId ], coords )
            } ) );
         }
      }

   }

} );
