var Vertex = React.createClass( {

   render() {
      var { label, selected, layout, ports } = this.props;

      var style = {
         position: 'absolute', // :TODO: move to stylesheet
         visibility: layout ? 'visible' : 'hidden',
         left: layout.left,
         top: layout.top
      };

      var classes = [
         'nbe-vertex',
         'nbe-node',
         selected ? 'nbe-selected' : ''
      ].join( ' ' );

      return (
         <div style={style} className={classes}>
            <div className="nbe-vertex-header">{label}</div>
            <div className="nbe-port-group">
               <div className="nbe-ports nbe-inbound">
                  {renderPorts('inbound')}
               </div>
               <div className="nbe-ports nbe-outbound">
                  {renderPorts('outbound')}
               </div>
            </div>
         </div>
      );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function renderPorts( direction ) {
         return ports[ direction ].map( port => <Port type={port.type}
                                                      key={port.id}
                                                      direction={direction}
                                                      label={port.label} /> );
      }

   }

} );
