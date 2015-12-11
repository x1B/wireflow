const { min, max } = Math;

const TITLE_OFFSET = 24;
const PORT_HEIGHT = 16;
const PORT_OFFSET = 8;

export function calculateMeasurements( graph ) {

  return {
    vertices: graph.get( 'vertices' ).map( vertex => {
      const { ports } = vertex;
      const numPortRows = max( ports.inbound.size, ports.outbound.size );

      const dimensions = {
        width: estimateWidth( vertex ),
        height: TITLE_OFFSET + numPortRows*PORT_HEIGHT
      };

      const inbound = {};
      ports.inbound.forEach( (port, i) => {
        inbound[ port.id ] = {
          left: PORT_OFFSET,
          top: TITLE_OFFSET + i * PORT_HEIGHT + PORT_OFFSET
        };
      } );
      const outbound = {};
      ports.outbound.forEach( ({ id }, i) => {
        outbound[ id ] = {
          left: dimensions.width - PORT_OFFSET,
          top: TITLE_OFFSET + i * PORT_HEIGHT + PORT_OFFSET
        };
      } );

      return { dimensions, inbound, outbound };
    } ),

    edges: graph.get( 'edges' ).map( _ => ({
      dimensions: {
        width: 40,
        height: 40
      }
    }) )
  };

}

function estimateWidth( vertex ) {
  const w = ({ label, id }) => 40 + 5.5 * ( label || id || '' ).length;
  const max = (a, b) => a > b ? a : b;
  const { ports } = vertex;

  const portsWidth =
    ports.inbound.map( w ).reduce( max, 40 ) +
    ports.outbound.map( w ).reduce( max, 40 )
  return max( w( vertex ),portsWidth );
}
