define( [ 'react', 'interact', './model', './events' ], function( React, interact, model, events ) {
   'use strict';

   const { Coords } = model;
   const { EdgeMeasured, EdgeMoved } = events;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const Edge = React.createClass( {

      render() {
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
         const icon = React.findDOMNode( this.refs.icon );
         const container = icon.parentNode;
         this.measure( container, icon );
         this.enableDragDrop( container, icon );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      measure( container, icon ) {
         const { eventHandler, id } = this.props;
         eventHandler( new EdgeMeasured( {
            id: id,
            at: new Coords( {
               left: container.offsetLeft + (icon.offsetWidth / 2),
               top: container.offsetTop + (icon.offsetHeight / 2)
            } )
         } ) );
      },

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      enableDragDrop( container, icon ) {
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
               eventHandler( EdgeMoved( {
                  id: id,
                  to: Coords( { left: left + dX, top: top + dY } )
               } ) );
               this.measure( container, icon );
            }
         } );
      }

   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return Edge;

} );
