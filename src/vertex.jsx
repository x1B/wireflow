define( [
   'react',
   'immutable',
   'interact',
   './model',
   './events',
   './port'
], function( React, Immutable, interact, model, events, Port ) {
   'use strict';

   const { Record, Map } = Immutable;
   const { Dimensions, Coords } = model;
   const { VertexMeasured, PortMeasured, VertexMoved } = events;
   const { VertexMeasurements } = events.model;

   const Vertex = React.createClass( {

      getInitialState() {
         return {
            measurements: VertexMeasurements()
         };
      },

      render() {

         const self = this;

         const { label, selected, layout, ports } = self.props;

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

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         return (
            <div style={style} className={classes} ref="container">
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

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function renderPorts( direction ) {

            const measureHandler = ( port ) =>
               ( coords ) => portMeasureHandler( direction, port, coords );

            return ports[ direction ].map( port =>
               <Port key={port.id}
                     direction={direction}
                     port={port}
                     eventHandler={self.handleEvent} /> ).toJS();
         }

      },

      /////////////////////////////////////////////////////////////////////////////////////////////////////

      handleEvent( event ) {
         var type = event.type();
         if( type === PortMeasured ) {
            const { direction, port, at } = event;
            this.setState( ({ measurements }) => {
               var newMeasurements = measurements.setIn( [ direction, port.id ], at );
               this.propagate( newMeasurements );
               return { measurements: newMeasurements };
            } );
            return;
         }
         return this.props.eventHandler( event );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      propagate( measurements ) {
         if( this.isComplete( measurements ) ) {
            this.props.eventHandler( VertexMeasured( {
               id: this.props.id,
               measurements: measurements
            } ) );
         }
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      isComplete( measurements ) {
         const { ports } = this.props;
         return measurements.dimensions &&
            measurements.inbound.size === ports.inbound.size &&
            measurements.outbound.size === ports.outbound.size;
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      componentDidMount() {
         var { port, direction } = this.props;
         var container = React.findDOMNode( this.refs.container );
         this.measure( container );
         this.enableDragDrop( container );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      measure( container ) {
         var dimensions = new Dimensions( {
            width: container.offsetWidth,
            height: container.offsetHeight
         } );
         this.setState( ({ measurements }) => {
            var newMeasurements = measurements.setIn( [ 'dimensions' ], dimensions );
            this.propagate( newMeasurements );
            return { measurements: newMeasurements };
         } );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      enableDragDrop( container ) {
         const { eventHandler, id } = this.props;
         var left, top;
         interact( container ).draggable( {
            onstart: ( e ) => {
               left = this.props.layout.left;
               top = this.props.layout.top;
            },
            onmove: ( e ) => {
               const dX = e.pageX - e.x0;
               const dY = e.pageY - e.y0;
               eventHandler( VertexMoved( {
                  id: id,
                  to: Coords( { left: left + dX, top: top + dY } )
               } ) );
               this.measure( container );
            }
         } );
      }

   } );

   return Vertex;

} );
