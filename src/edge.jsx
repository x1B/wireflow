var Edge = React.createClass( {

   componentDidMount() {
      var icon = React.findDOMNode( this.refs.icon );
      var node = icon.parentNode;
      var coords = {
         left: node.offsetLeft + (icon.offsetWidth / 2),
         top: node.offsetTop + (icon.offsetHeight / 2)
      };
      this.props.measureHandler( coords );
   },

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
   }

} );
