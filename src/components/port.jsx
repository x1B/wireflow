import * as React from 'react';
import * as interact from 'interact';

import { Coords, IN, OUT }  from '../model';
import { PortMeasured, PortDragged, PortDisconnected, Rendered, model as eventsModel }  from '../events';
import * as shallowEqual from '../util/shallow-equal';

const { PortDragInfo } = eventsModel;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Port = React.createClass( {

   render() {

      const { port, vertex, eventHandler } = this.props;
      eventHandler( Rendered( { what: Port.displayName } ) );
      const classes = [ 'nbe-port', 'nbe-type-' + port.type ].join( ' ' );

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

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   componentDidMount() {
      const { port, eventHandler } = this.props;
      const node = React.findDOMNode( this.refs.handle );
      const coords = Coords( {
         left: node.offsetLeft + (node.offsetWidth / 2),
         top: node.offsetTop + (node.offsetHeight / 2)
      } );
      eventHandler( PortMeasured( { port: port, center: coords } ) );
      this.enableDragDrop( node );
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   enableDragDrop( node ) {
      const { eventHandler, port, vertex } = this.props;
      var left, top;
      var fromCoords;
      interact( node ).draggable( {
         restrict: {
            restriction: function( x, y, element ) {
               // Restrict by the canvas
               const v = vertexNode( element );
               return v.parentNode.parentNode;
            }
         },
         onstart: ( e ) => {
            const v = vertexNode( e.target );
            left = v.offsetLeft + node.offsetLeft + (node.offsetWidth / 2),
            top = v.offsetTop + node.offsetTop + (node.offsetHeight / 2);
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
                  portCoords: fromCoords,
                  mouseCoords: Coords( { left: left + dX, top: top + dY } )
               } )
            } ) );
         }
      } );

      function vertexNode( node ) {
         do {
            node = node.parentNode;
            if( /\bnbe-vertex\b/.test( node.className ) ) {
               return node;
            }
         } while ( node );
      }
   },

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   shouldComponentUpdate( nextProps, nextState ) {
      return !shallowEqual( nextProps, this.props );
   }

} );

export default Port;
