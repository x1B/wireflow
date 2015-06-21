var Link = React.createClass( {

   render() {

      var { type } = this.props;

      var classes = [ 'nbe-link', 'nbe-type-' + type ].join( ' ' );

      var data = '';

      return (
         <path className={classes} data={data} />
      );
   }
} );
