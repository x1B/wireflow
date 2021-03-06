import React from 'react';

import shallowEqual from '../util/shallow-equal';
import count from '../util/metrics';


const History = React.createClass({

  render() {
    const { checkpoints } = this.props;
    count({ what: History.displayName });
    return <ol className={'nbe-history'}>{ this.renderCheckpoints( checkpoints ) }</ol>;
  },

  renderCheckpoints( checkpoints ) {
    return checkpoints.map( checkpoint =>
      <li key={ checkpoint.at }>{ checkpoint.before }</li>
    );
  },

  shouldComponentUpdate( nextProps ) {
    return !shallowEqual( nextProps, this.props );
  }

});

export default History;
