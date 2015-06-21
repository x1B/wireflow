var Edge = React.createClass( {

   render() {
      var { label, type, selected, layout } = this.props;

      var style = {
         position: 'absolute', // :TODO: move to stylesheet
         visibility: layout ? 'visible' : 'hidden',
         left: layout.left,
         top: layout.top
      };

      var classes = [
         'nbe-node',
         'nbe-edge',
         selected ? 'nbe-selected' : '',
         'nbe-type-' + type
      ].join( ' ' );

      return (
         <div style={style} className={classes}>
            <div className="nbe-edge-icon" />
            <div className="nbe-edge-label">{label}</div>
         </div>
      );
   }

} );
