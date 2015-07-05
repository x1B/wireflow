define( [
   'react',
   'interact',
   '../model',
   '../events',
   '../util/shallow-equal'
], function( React, interact, model, events, shallowEqual ) {
   'use strict';

   const { Coords, IN, OUT } = model;
   const { PortMeasured, PortDragged, PortDisconnected, Rendered } = events;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   var Port = React.createClass( {

      render() {

         var { port, vertex, eventHandler } = this.props;
         eventHandler( Rendered( { what: Port.displayName } ) );
         var classes = [ 'nbe-port', 'nbe-type-' + port.type ].join( ' ' );

         return (
            <div className={classes}>
               { port.direction === OUT ? port.label : '' }
               <i className="nbe-port-handle" ref="handle" onDoubleClick={disconnect} />
               { port.direction === IN ? port.label : '' }
            </div>
         );

         function disconnect() {
            eventHandler( PortDisconnected( { vertex: vertex, port: port } ) );
         }
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      componentDidMount() {
         var { port, eventHandler } = this.props;
         var node = React.findDOMNode( this.refs.handle );
         var coords = Coords( {
            left: node.offsetLeft + (node.offsetWidth / 2),
            top: node.offsetTop + (node.offsetHeight / 2)
         } );
         eventHandler( PortMeasured( { port: port, center: coords } ) );
         this.enableDragDrop( node );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      enableDragDrop( node ) {
         const { eventHandler, port, vertex } = this.props;
         var left, top;
         var fromCoords;
         interact( node ).draggable( {
            restrict: {
               restriction: function( x, y, element ) {
                  // Restrict by the canvas
                  return element.parentNode.parentNode.parentNode.parentNode;
               }
            },
            onstart: ( e ) => {
               left = node.offsetLeft;
               top = node.offsetTop;
               fromCoords = Coords( { left, top } );
            },
            onmove: ( e ) => {
               eventHandler( Rendered( { what: 'events.PortDragged' } ) );
               const dX = e.pageX - e.x0;
               const dY = e.pageY - e.y0;
               eventHandler( PortDragged( {
                  info: PortDragInfo( {
                     port: port,
                     vertex: vertex,
                     from: fromCoords,
                     to: Coords( { left: left + dX, top: top + dY } )
                  } )
               } ) );
            }
         } );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      shouldComponentUpdate( nextProps, nextState ) {
         return !shallowEqual( nextProps, this.props );
      }

   } );

   return Port;

} );
