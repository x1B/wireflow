define( [ 'react', './nbe-model' ], function( React, nbeModel ) {
   'use strict';

   const { Coords } = nbeModel;

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   const Edge = React.createClass( {

      render() {
         const { label, type, selected, layout } = this.props;

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
               <div className="nbe-edge-label">{label}</div>
            </div>
         );
      },


      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      componentDidMount() {
         const icon = React.findDOMNode( this.refs.icon );
         const container = icon.parentNode;
         this.props.measureHandler( new Coords( {
            left: container.offsetLeft + (icon.offsetWidth / 2),
            top: container.offsetTop + (icon.offsetHeight / 2)
         } ) );
      }

   } );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return Edge;

} );
