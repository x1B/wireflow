define( [ 'react', './port' ], function( React, Port ) {
   'use strict';

   const Vertex = React.createClass( {

      render() {

         const self = this;

         const { label, selected, layout, ports, portMeasureHandler, measureHandler } = self.props;

         const style = {
            position: 'absolute', // :TODO: move to stylesheet
            visibility: layout ? 'visible' : 'hidden',
            left: layout.left,
            top: layout.top
         };

         const classes = [
            'nbe-vertex',
            'nbe-node',
            selected ? 'nbe-selected' : ''
         ].join( ' ' );

         ////////////////////////////////////////////////////////////////////////////////////////////////////////

         return (
            <div style={style} className={classes} ref="handle">
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

            const measureHandler = ( port ) =>
               ( coords ) => portMeasureHandler( direction, port, coords );

            return ports[ direction ].map( port =>
               <Port type={port.type}
                     key={port.id}
                     direction={direction}
                     label={port.label}
                     measureHandler={measureHandler( port )} /> ).toJS();
         }

      }
   } );

   return Vertex;

} );
