define( [ 'react', 'interact', './model', './events' ], function( React, interact, model, events ) {
   'use strict';

   const { Coords } = model;

   const { EdgeMoved } = events;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const Edge = React.createClass( {

      render() {
         // console.log( 'CLOG', 'RENDER' ); // :TODO: DELETE ME

         const { edge, id, selected, layout, eventHandler } = this.props;
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
         const { measureHandler, eventHandler, edge, id, layout } = this.props;

         const icon = React.findDOMNode( this.refs.icon );
         const container = icon.parentNode;
         this.props.measureHandler( new Coords( {
            left: container.offsetLeft + (icon.offsetWidth / 2),
            top: container.offsetTop + (icon.offsetHeight / 2)
         } ) );

         var left, top;
         var sX, sY;

         interact( container ).draggable( {
            onstart: ( e ) => {
               left = this.props.layout.left;
               top = this.props.layout.top;
               sX = e.x0;
               sY = e.y0;
            },
            onmove: ( e ) => {
               const dX = e.pageX - e.x0;
               const dY = e.pageY - e.y0;
               eventHandler( EdgeMoved( {
                  id: id,
                  to: Coords( { left: left + dX, top: top + dY } )
               } ) );

               // :TODO: is this the best place for re-measuring?
               this.props.measureHandler( new Coords( {
                  left: container.offsetLeft + (icon.offsetWidth / 2),
                  top: container.offsetTop + (icon.offsetHeight / 2)
               } ) );

            }
         } );
      }

   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return Edge;

} );
