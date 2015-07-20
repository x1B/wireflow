import * as React from 'react';

import { VertexMoved, EdgeMoved, LayoutModified } from '../events/layout';
import * as options from '../util/options';


/**
 * Manages the graph layout prop.
 */
const LayoutEditor = React.createClass( {

  render() {
    const props = { eventHandler: this.handleEvent };
    const children = React.Children.map( this.props.children, child => {
      return React.cloneElement( child, options( child.props, props ) );
    } );
    return <div className="nbe-layout-editor">{ children }</div>;
  },


  handleEvent( event ) {
    const type = event.type();
    const { layout } = this.props;

    if( type === VertexMoved ) {
      const next = layout.setIn( [ 'vertices', event.vertex.id ], event.to );
      return this.bubble( LayoutModified( { layout: next } ) );
    }
    if( type === EdgeMoved ) {
      const next = layout.setIn( [ 'edges', event.edge.id ], event.to );
      return this.bubble( LayoutModified( { layout: next } ) );
    }

    return this.bubble( event );
  },


  bubble( event ) {
    const { eventHandler } = this.props;
    return eventHandler && eventHandler( event );
  }

} );

export default LayoutEditor;
