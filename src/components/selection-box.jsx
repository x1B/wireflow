import * as React from 'react';


const SelectionBox = React.createClass({

  render() {
    const { box } = this.props;
    if( !box ) {
      const style = { display: 'none' };
      return <div style={style} />;
    }

    const { coords, dimensions } = box;
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
