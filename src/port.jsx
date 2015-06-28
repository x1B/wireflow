define( [ 'react', './model', './events' ], function( React, model, events ) {
   'use strict';

   const { Coords } = model;

   const { PortMeasured } = events;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   var Port = React.createClass( {

      render() {

         var { port, direction } = this.props;

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
         var { port, direction } = this.props;
         var node = React.findDOMNode( this.refs.handle );
         var coords = new Coords( {
            left: node.offsetLeft + (node.offsetWidth / 2),
            top: node.offsetTop + (node.offsetHeight / 2)
         } );
         this.props.eventHandler( PortMeasured( { port: port, direction: direction, at: coords } ) );
      }

   } );

   return Port;

} );
