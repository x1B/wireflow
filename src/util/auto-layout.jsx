import dagre from 'dagre';

export default { calculateLayout };

function calculateLayout( graph, measurements ) {

  const owners = {
    inbound: {},
    outbound: {}
  };

  const dg = new dagre.graphlib.Graph();

  dg.setGraph( {
    rankdir: 'LR',
    nodesep: 50,
    ranksep: 60,
    edgesep: 0,
    marginx: 15,
    marginy: 15
  } );
  dg.setDefaultEdgeLabel( () => { return {}; } );
  measurements.get( 'edges' ).forEach( add( 'E.' ) );
  measurements.get( 'vertices' ).forEach( add( 'V.' ) );
  graph.get( 'vertices' ).forEach( collectOwningVertices() );
  graph.get( 'vertices' ).forEach( connect );


  dagre.layout( dg );
  return {
    vertices: decode( 'V.', dg.nodes() ),
    edges: decode( 'E.', dg.nodes(), { offsetY: 23, offsetX: -15 } )
  };


  function connect( vertex, vertexId ) {
    const dgVertexId = 'V.' + vertexId;
    [ vertex.ports.inbound, vertex.ports.outbound ].forEach( (group, groupNo) => {
      const isInbound = groupNo === 0;
      group.forEach( ({ edgeId }) => {
        if( !edgeId ) { return; }
        let dgNeighborId = 'E.' + edgeId;
        if( !measurements.get( 'edges' ).get( edgeId ) ) {
          // invisible edge, "owned" by a vertex
          dgNeighborId = 'V.' + owners[ isInbound ? 'outbound' : 'inbound' ][ edgeId ];
        }

        dg.setEdge(
          isInbound ? dgNeighborId : dgVertexId,
          isInbound ? dgVertexId : dgNeighborId
        );
      } );
    } );
  }


  function add( prefix ) {
    return ({ dimensions: { width, height } }, nodeId) => {
      const dgNodeId = prefix + nodeId;
      dg.setNode( dgNodeId, { label: dgNodeId, width, height } );
    };
  }


  function collectOwningVertices() {
    return ( vertex, vertexId ) => {
      [ vertex.ports.inbound, vertex.ports.outbound ].forEach( (group, groupNo) => {
        const isInbound = groupNo === 0;
        group.forEach( ({ edgeId }) => {
          if( !edgeId ) { return; }
          owners[ isInbound ? 'inbound' : 'outbound' ][ edgeId ] = vertexId;
        } );
      } );
    };
  }


  function decode( prefix, dgNodes, options = {} ) {
    const { offsetY = 0, offsetX = 0 } = options;
    let result = {};
    dgNodes.forEach( dgNodeId => {
      const { label, width, height, x, y } = dg.node( dgNodeId ) || {};
      if( label && label.indexOf( prefix ) === 0 ) {
        const id = label.substring( prefix.length, label.length );
        result[ id ] = {
          left: x - width / 2 + offsetX,
          top: y - height / 2 + offsetY
        };
      }
    } );
    return result;
  }
}
