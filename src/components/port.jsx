define( [
   'react',
   '../model',
   '../events',
   '../util/shallow-equal'
], function( React, model, events, shallowEqual ) {
   'use strict';

   const { Coords } = model;
   const { PortMeasured, Rendered } = events;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   var Port = React.createClass( {

      render() {

         var { port, direction, eventHandler } = this.props;
         eventHandler( Rendered( { what: Port.displayName } ) );

         var classes = [ 'nbe-port', 'nbe-type-' + port.type ].join( ' ' );

         return (
            <div className={classes}>
               { direction !== 'inbound' ? port.label : '' }
               <i className="nbe-port-handle" ref="handle" />
               { direction === 'inbound' ? port.label : '' }
            </div>
         );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      componentDidMount() {
         var { port, direction, eventHandler } = this.props;
         var node = React.findDOMNode( this.refs.handle );
         var coords = new Coords( {
            left: node.offsetLeft + (node.offsetWidth / 2),
            top: node.offsetTop + (node.offsetHeight / 2)
         } );
         eventHandler( PortMeasured( { port: port, direction: direction, center: coords } ) );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      shouldComponentUpdate( nextProps, nextState ) {
         return !shallowEqual( nextProps, this.props );
      }

   } );

   return Port;

} );
