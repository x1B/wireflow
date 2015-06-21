var Link = React.createClass( {

   render() {

      var r = Math.round;

      var { type, from, to } = this.props;

      var classes = [ 'nbe-link', 'nbe-type-' + type ].join( ' ' );

      var data = [ 'M', r( from.left ), ',', r( from.top ), ' L', r( to.left ), ',', r( to.top ) ].join( '' );

      return (
         <path className={classes} d={data} />
      );
   }
} );
