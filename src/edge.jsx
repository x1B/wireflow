define( [
   'react',
   'interact',
   './model',
   './events',
   './util/shallow-equal'
], function( React, interact, model, events, shallowEqual ) {
   'use strict';

   const { Coords, convert } = model;
   const { boxFromNode } = convert;
   const { EdgeMeasured, EdgeMoved, Rendered } = events;
   const { EdgeMeasurements } = events.model;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const Edge = React.createClass( {

      render() {
         const { edge, id, selected, layout, eventHandler } = this.props;
         eventHandler( Rendered( { what: Edge.displayName } ) );
         const { type, label } = edge;

         const style = {
            position: 'absolute', // :TODO: move to stylesheet
            visibility: layout ? 'visible' : 'hidden',
            left: layout.left,
            top: layout.top
         };

         const classes = [
            'nbe-node',
            'nbe-edge',
            'nbe-type-' + type,
            selected ? 'nbe-selected' : ''
         ].join( ' ' );

         return (
            <div style={style} className={classes}>
               <div className="nbe-edge-icon"  ref="icon" />
               <div className="nbe-edge-label">{label || id}</div>
            </div>
         );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      componentDidMount() {
         const icon = React.findDOMNode( this.refs.icon );
         const container = icon.parentNode;
         this.measure( container, icon );
         this.enableDragDrop( container, icon );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      measure( container, icon ) {
         const { eventHandler, edge } = this.props;
         eventHandler( EdgeMeasured( {
            edge: edge,
            measurements: EdgeMeasurements( {
               box: boxFromNode( container ),
               center: Coords( {
                  left: container.offsetLeft + (icon.offsetWidth / 2),
                  top: container.offsetTop + (icon.offsetHeight / 2)
               } )
            } )
         } ) );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      enableDragDrop( container, icon ) {
         const { eventHandler, edge } = this.props;
         var left, top;
         interact( container ).draggable( {
            onstart: ( e ) => {
               left = this.props.layout.left;
               top = this.props.layout.top;
            },
            onmove: ( e ) => {
               eventHandler( Rendered( { what: 'edge-moved' } ) );
               const dX = e.pageX - e.x0;
               const dY = e.pageY - e.y0;
               eventHandler( EdgeMoved( {
                  edge: edge,
                  to: Coords( { left: left + dX, top: top + dY } )
               } ) );
               this.measure( container, icon );
            }
         } );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      shouldComponentUpdate( nextProps, nextState ) {
         return !shallowEqual( nextState, this.state ) || !shallowEqual( nextProps, this.props );
      }

   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return Edge;

} );
