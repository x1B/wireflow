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

   componentDidMount() {
      var icon = React.findDOMNode( this.refs.icon );
      var container = icon.parentNode;
      this.props.measureHandler( nbe.Coords( {
         left: container.offsetLeft + (icon.offsetWidth / 2),
         top: container.offsetTop + (icon.offsetHeight / 2)
      } ) );
   }

} );
