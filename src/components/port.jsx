define( [
   'react',
   '../model',
   '../events',
   '../util/shallow-equal'
], function( React, model, events, shallowEqual ) {
   'use strict';

   const { Coords, IN, OUT } = model;
   const { PortMeasured, PortDisconnected, Rendered } = events;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   var Port = React.createClass( {

      render() {

         var { port, eventHandler } = this.props;
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
            eventHandler( PortDisconnected( { port: port } ) );
         }
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      componentDidMount() {
         var { port, eventHandler } = this.props;
         var node = React.findDOMNode( this.refs.handle );
         var coords = new Coords( {
            left: node.offsetLeft + (node.offsetWidth / 2),
            top: node.offsetTop + (node.offsetHeight / 2)
         } );
         eventHandler( PortMeasured( { port: port, center: coords } ) );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      shouldComponentUpdate( nextProps, nextState ) {
         return !shallowEqual( nextProps, this.props );
      }

   } );

   return Port;

} );
