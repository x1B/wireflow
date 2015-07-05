import * as React from 'react';

import { IN, OUT }  from '../model';
import { Rendered }  from '../events';
import * as shallowEqual from '../util/shallow-equal';
import * as pathing from '../util/pathing';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const GhostPort = React.createClass( {

   render() {

      return <path />

   }

} );

export default GhostPort;
