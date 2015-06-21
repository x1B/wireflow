var Port = React.createClass( {

   componentDidMount() {
      var node = React.findDOMNode( this.refs.handle );
      var coords = {
         left: node.offsetLeft + (node.offsetWidth / 2),
         top: node.offsetTop + (node.offsetHeight / 2)
      };
      this.props.measure( coords );
   },

   render() {

      var { type, direction, label, measure } = this.props;

      var classes = [ 'nbe-port', 'nbe-type-' + type ].join( ' ' );

      return (
         <div className={classes}>
            {direction !== 'inbound' ? label : ''}
            <i className="nbe-port-handle" ref='handle' />
            {direction === 'inbound' ? label : ''}
            {/* :TODO: use float:left/right for ordering? */}
         </div>
      );
   }

} );
