var Graph = React.createClass( {

   getInitialState() {
      return {
         buckets: Map( {
            measurements: Map()
         } )
      };
   },

   getDefaultProps() {
      return {
         types: Map(),
         edges: Map(),
         vertices: Map(),
         layout: Map(),
         zoom: 100,
         hasFocus: false
      }
   },

   render() {
      var self = this;
      var measurements = self.state.buckets.get( 'measurements' );
      var { types, edges, vertices, layout, zoom, hasFocus } = self.props;

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
         return vertices.entrySeq()
            .map( ( [ key, v ] ) => (
               <Vertex key={key}
                       layout={layout.getIn( [ 'vertices', key ] )}
                       ports={v.get( 'ports' )}
                       label={v.get( 'label' )}
                       portMeasureHandler={portMeasureHandler( key )}/>
            ) )
            .toJS();
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function renderEdges() {
         return edges.entrySeq()
            .filter( ( [ key, e ] ) => !types.get( e.get( 'type' ) ).get( 'simple' ) )
            .map( ([key, e]) =>
               <Edge key={key}
                     type={e.type}
                     ports={e.ports}
                     label={e.label || key}
                     layout={layout.getIn( [ 'edges', key ] )}
                     measureHandler={edgeMeasureHandler( key )}/>
            )
            .toJS();
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function renderLinks() {
         if ( measurements.isEmpty() ) {
            return [];
         }

         var vertexIds = vertices.keySeq();

         // lookup table mapping simple edges to the coords of their representative ports
         var fallbackCoords = portCoordsByEdgeId( vertexIds.toJS() );

         return vertexIds.flatMap( vertexId =>
               List.of( IN, OUT ).flatMap( direction => links( vertexId, direction ) )
         );

         function links( vertexId, direction ) {
            var vertex = vertices.get( vertexId );
            var edgeMeasurements = measurements.get( 'edges' );
            var portsMeasurements = measurements.getIn( [ 'vertices', vertexId, 'ports' ] );
            var vertexCoords = layout.getIn( [ 'vertices', vertexId ] );

            return vertex.getIn( [ 'ports', direction ] )
               .filter( port => !!port.edgeId )
               .map( port => {
                  var a = add( portsMeasurements.getIn( [ direction, port.id ] ), vertexCoords );
                  var otherDirection = direction === IN ? OUT : IN;
                  var b = edgeMeasurements.get( port.edgeId ) || fallbackCoords[ otherDirection ][ port.edgeId ];
                  return <Link key={vertexId + '/' + port.id}
                               type={port.type}
                               from={a}
                               to={b}/>
               } );
         }

         function portCoordsByEdgeId( vertexIds ) {
            var coords = {};
            [ IN, OUT ].forEach( direction => {
               var table = coords[ direction ] = {};
               vertexIds.forEach( id => {
                  var portsMeasurements = measurements.getIn( [ 'vertices', id, 'ports', direction ] );
                  var vertexCoords = layout.getIn( 'vertices', id );
                  vertices.getIn( [ id, 'ports', direction ] ).forEach( port => {
                     if ( port.edgeId ) {
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

      function transformState( transform ) {
         return self.setState( ({ buckets }) => ({
            buckets: transform( buckets )
         }) );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function portMeasureHandler( id ) {
         return function ( direction, port, coords ) {
            return transformState( buckets =>
               buckets.setIn([ 'measurements', 'vertices', id, 'ports', direction, port.id ], coords ) );
         }
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function edgeMeasureHandler( id ) {
         return function ( coords ) {
            return transformState( buckets =>
               buckets.setIn([ 'measurements', 'edges', id ], coords ) );
         }
      }

   }

} );
