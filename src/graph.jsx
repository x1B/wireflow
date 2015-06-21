var Graph = React.createClass( {

   render() {
      var {
         types,
         edges,
         vertices,
         layout,
         zoom,
         hasFocus
      } = this.props;

      return (
         <div tabIndex="0" className={classes()}>
            <div className="nbe-graph-viewport">
               <div className="nbe-graph-canvas">
                  <div className="nbe-graph-nodes">
                     {renderVertices()}
                     {renderEdges()}
                  </div>
                  <svg>
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
            'nbe-zoom-' + (zoom || 100)
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
                           label={v.label} />;
         } );
      }

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function renderEdges() {
         return keys( edges ).filter( key =>
            !types[ edges[ key ].type ].isSimple
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
         return
      }

   }
} );
