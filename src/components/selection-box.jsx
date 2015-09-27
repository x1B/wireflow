import * as React from 'react';


const SelectionBox = React.createClass({

  render() {
    const { coords, dimensions } = this.props;
    if( !dimensions ) {
      const style = { display: 'none' };
      return <div style={style} />;
    }

    const style = {
      left: coords.left,
      top: coords.top,
      width: dimensions.width,
      height: dimensions.height
    };

    return <div className="nbe-selection" style={style} />;
  }

});

export default SelectionBox;
