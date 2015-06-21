var Port = React.createClass( {

   render() {

      var { type, direction, label } = this.props;

      var classes = [ 'nbe-port', 'nbe-type-' + type ].join( ' ' );

      return (
         <div className={classes}>
            {direction !== 'inbound' ? label : ''}
            <i className="nbe-port-handle" />
            {direction === 'inbound' ? label : ''}
            {/* :TODO: use float:left/right for ordering? */}
         </div>
      );
   }

} );
