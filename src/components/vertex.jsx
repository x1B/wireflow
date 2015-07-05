define( [
   'react',
   'immutable',
   'interact',
   './port',
   '../model',
   '../events',
   '../util/shallow-equal',
   '../util/options',
], function( React, Immutable, interact, Port, model, events, shallowEqual, options ) {
   'use strict';

   const { Record, Map } = Immutable;
   const { Dimensions, Coords, convert, IN, OUT } = model;
   const { boxFromNode} = convert;
   const { PortDisconnected, VertexMeasured, PortMeasured, VertexMoved, Rendered } = events;
   const { VertexMeasurements } = events.model;

   const Vertex = React.createClass( {

      getInitialState() {
         return {
            measurements: VertexMeasurements()
         };
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      render() {
         const self = this;

         const { vertex, selected, layout, eventHandler } = self.props;
         eventHandler( Rendered( { what: Vertex.displayName } ) );

         const { ports, label } = vertex;

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
                     {renderPorts( IN )}
                  </div>
                  <div className="nbe-ports nbe-outbound">
                     {renderPorts( OUT )}
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
                     port={port}
                     eventHandler={self.handleEvent} /> ).toJS();
         }

      },

      /////////////////////////////////////////////////////////////////////////////////////////////////////

      handleEvent( event ) {
         var type = event.type();
         if( type === PortMeasured ) {
            const { port, center } = event;
            this.setState( ({ measurements }) => {
               var newMeasurements = measurements.setIn( [ port.direction, port.id ], center );
               this.propagateMeasurements( newMeasurements );
               return { measurements: newMeasurements };
            } );
            return;
         }

         if( type === PortDisconnected ) {
            return this.bubble( PortDisconnected( { port: event.port, vertex: this.props.vertex } ) );
         }

         return this.bubble( event );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      bubble( event ) {
         const { eventHandler } = this.props;
         return eventHandler && eventHandler( event );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      propagateMeasurements( measurements ) {
         if( this.isComplete( measurements ) ) {
            var { vertex } = this.props;
            this.bubble( VertexMeasured( { vertex, measurements } ) );
         }
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      isComplete( measurements ) {
         const { ports } = this.props.vertex;
         return measurements.box &&
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
         this.setState( ({ measurements }) => {
            var box = boxFromNode( container );
            var newMeasurements = measurements.setIn( [ 'box' ], box );
            this.propagateMeasurements( newMeasurements );
            return { measurements: newMeasurements };
         } );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      enableDragDrop( container ) {
         const { eventHandler, vertex } = this.props;
         var left, top;
         interact( container ).draggable( {
            restrict: {
               restriction: function( x, y, element ) {
                  // Restrict by the canvas
                  return element.parentNode.parentNode;
               }
            },
            onstart: ( e ) => {
               left = this.props.layout.left;
               top = this.props.layout.top;
            },
            onmove: ( e ) => {
               eventHandler( Rendered( { what: 'events.VertexMoved' } ) );
               const dX = e.pageX - e.x0;
               const dY = e.pageY - e.y0;
               eventHandler( VertexMoved( {
                  vertex: vertex,
                  to: Coords( { left: left + dX, top: top + dY } )
               } ) );
               this.measure( container );
            }
         } );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      shouldComponentUpdate( nextProps, nextState ) {
         return !shallowEqual( nextState, this.state ) || !shallowEqual( nextProps, this.props );
      }

   } );

   return Vertex;

} );
