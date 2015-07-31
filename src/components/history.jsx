import * as React from 'react';

import shallowEqual from '../util/shallow-equal';
import count from '../util/metrics';

const History = React.createClass({

  render() {
    const { log } = this.props;
    count({ what: History.displayName });
    return <ol>{this.renderLog(log)}</ol>;
  },

  renderLog( log ) {
    console.log( 'CLOG', log.toJS() ); // :TODO: DELETE ME
    return log.map( checkpoint =>
      <li key={ checkpoint.index }>{ checkpoint.before }</li>
    );
  },

  shouldComponentUpdate( nextProps ) {
    return !shallowEqual( nextProps, this.props );
  }


});

export default History;
