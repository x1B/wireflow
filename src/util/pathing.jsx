import * as settings from './settings';

export default {
  cubic: svgCubicBezierLinkPath,
  linear: svgLinearLinkPath
};

const [ X, Y ] = [ 0, 1 ];
const [ FROM, TO ] = [ 0, 1 ];
const DEFAULT_STUBS = [ 1, -1 ];

// Length of a horizontal link stub that helps visualizing where a link is attached
const baseStubLength = settings.pathing.stubLength;
const baseArrowHeadLength = settings.pathing.arrowHeadLength;
const baseCurvePadding = settings.pathing.curvePadding;

const { round, abs, min, max } = Math;


function svgLinearLinkPath( from, to, stubs, zoomFactor, boxes, showArrow ) {
  const fromX = round( from[ X ] ), fromY = round( from[ Y ] ),
  toX = round( to[ X ] ), toY = round( to[ Y ] ),
  stubLength = baseStubLength * ( zoomFactor || 1 );

  const path = [ 'M', fromX, ',', fromY ];
  path.push( 'H', fromX + stubs[ FROM ] * stubLength / 2 );
  path.push( 'L', toX + stubs[ TO ] * stubLength / 2, ',', toY );
  path.push( 'H', toX );
  return path.join( '' );
}

////////////////////////////////////////////////////////////////////////////////

/*
 * Generate a smooth path between:
 *  - outbound port of a vertex and inbound port of another vertex
 *  - a port and an edge node
 *
 * Try to circumvent start and end box so that connections are obvious.
 */
function svgCubicBezierLinkPath(
  from, to, zoomFactor, boxes, showArrow, stubs = DEFAULT_STUBS
) {

  const arrowHeadLength = baseArrowHeadLength * ( zoomFactor || 1 );
  const stubLength = baseStubLength * ( zoomFactor || 1 );
  const safeDistanceX = 2 * stubLength;
  const safeDistanceY = 2.5 * stubLength;

  const distanceX = abs( from[ X ] - to[ X ] );
  const distanceY = abs( from[ Y ] - to[ Y ] );
  if( distanceX < safeDistanceX && distanceY < safeDistanceY ) {
    return svgLinearLinkPath( from, to, stubs );
  }

  const params = initializeParameters(
    from, to, boxes, stubs, stubLength, baseCurvePadding
  );

  // Current path and position:
  var [ x, y ] = [ params.x0, params.y0 ];

  const path = [];
  path.push( 'M', x, ',', y );
  const yDominates = startSegment();
  endSegment( yDominates );
  return path.join( '' );

  //////////////////////////////////////////////////////////////////////////////

  function startSegment() {
    if( params.reverse ) {
      arrowHead();
    }
    horizontal( x + params.stub0 * stubLength );
    if( params.stub0 < 0 ) {
      return circumventBox0();
    }
    return false;
  }

  //////////////////////////////////////////////////////////////////////////////

  function endSegment( useBezierY ) {
    if( params.stubN > 0 && params.boxN ) {
      circumventBoxN( useBezierY );
    }
    else {
      cubic( params.xN + params.stubN * params.stubLength, params.yN );
    }

    horizontal( params.xN );
    if( !params.reverse ) {
      arrowHead();
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  function cubic( toX, toY ) {
    const middleX = x + (toX - x) / 2;
    path.push( 'C', middleX, ',', y, ' ', middleX, ',', toY, ' ', toX, ',', toY );
    x = toX;
    y = toY;
  }

  //////////////////////////////////////////////////////////////////////////////

  function cubicY( toX, toY ) {
    const middleY = y + (toY - y) / 2;
    path.push( 'C', x, ',', middleY, ' ', toX, ',', middleY, ' ', toX, ',', toY );
    x = toX;
    y = toY;
  }

  //////////////////////////////////////////////////////////////////////////////

  function horizontal( xAbs ) {
    x = xAbs;
    path.push( 'H', x );
  }

  //////////////////////////////////////////////////////////////////////////////

  function arc90( xSgn, ySgn, sweep ) {
    x += xSgn * params.curvePadding;
    y += ySgn * params.curvePadding;
    path.push( 'A', params.curvePadding, ',', params.curvePadding, ' 0 0,', sweep, ' ', x, ',', y );
  }

  //////////////////////////////////////////////////////////////////////////////

  function vertical( yAbs ) {
    y = yAbs;
    path.push( 'V', yAbs );
  }

  //////////////////////////////////////////////////////////////////////////////

  function arrowHead() {
    if( !showArrow ) {
      return;
    }

    const ax = x - stubLength - arrowHeadLength, ay = y;
    path.push(
      'M', ax, ',', ay - arrowHeadLength,
      'L', ax + stubLength / 2, ',', ay,
      'L', ax, ',', ay + arrowHeadLength,
      'L', ax + arrowHeadLength, ',', ay,
      'L', ax, ',', ay - arrowHeadLength,
      'M', x, ',', y
    );
  }

  //////////////////////////////////////////////////////////////////////////////

  function circumventBox0() {
    const { xN, yN, box0, boxN, curvePadding } = params;
    const yDir = calculateStartDirectionY();
    const sweep = yDir === 1 ? 0 : 1;

    circumventY();
    return circumventX();

    function circumventY() {
      // Arc and go to bottom/top:
      arc90( -1, yDir, sweep );
      if( yDir === 1 ) {
        vertical( max( box0.bottom, y + curvePadding ) );
      }
      else {
        vertical( min( box0.top, y - curvePadding ) );
      }
    }

    function circumventX() {
      // Cling to bottom/top edge as far as needed:
      if( yN * yDir < y * yDir || abs( y - yN ) * 4 < abs( x - xN ) ) {
        arc90( 1, yDir, sweep );
        if( yN * yDir < y * yDir ) {
          horizontal( max( x, min( box0.right, xN - 2 * curvePadding ) ) );
        }
        return false;
      }
      if( !boxN && xN > box0.left ) {
        arc90( 1, yDir, sweep );
        return false;
      }
      return true;
    }

    function calculateStartDirectionY() {
      // down: 1, up: -1
      if( (!boxN && yN > y) || (boxN && boxN.top > box0.bottom) ) {
        // The entire dest is below this box: always go downwards
        return 1;
      }
      if( (!boxN && yN < y) || (boxN && boxN.bottom < box0.top) ) {
        // The entire dest is above this box: always go upwards
        return -1;
      }
      // Shortest path to edge of this box
      return abs( box0.top - y ) < abs( y - box0.bottom ) ? -1 : 1;
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  function circumventBoxN( useBezierY ) {
    const { boxN, yN, curvePadding } = params;

    // Draw line to nearest corner of boxN:
    var yDir, yEdge, xEdge, sweep;
    if( abs( boxN.top - y ) + (y < yN ? -1 : 0) < abs( y - boxN.bottom ) ) {
      yDir = 1;
      yEdge = min( boxN.top - curvePadding, yN - 2 * curvePadding );
      sweep = 1;
      xEdge = yEdge > y ? boxN.right : boxN.left;
    }
    else {
      yDir = -1;
      yEdge = max( boxN.bottom + curvePadding, yN + 2 * curvePadding );
      sweep = 0;
      xEdge = yEdge < y ? boxN.right : boxN.left;
    }

    if( useBezierY ) {
      cubicY( boxN.right + curvePadding, yEdge );
    }
    else {
      cubic( max( xEdge, x + curvePadding ), yEdge );
      // Stick to bottom/top edge as far as needed:
      horizontal( boxN.right );
      arc90( 1, yDir, sweep );
    }
    // turn towards port
    vertical( yN - yDir * curvePadding );
    arc90( -1, yDir, sweep );
  }

}

////////////////////////////////////////////////////////////////////////////////

function initializeParameters( from, to, boxes, stubs, stubLength, curvePadding ) {
  const params = { stubLength: stubLength, curvePadding: curvePadding };

  const fromLeft = from[ X ], fromTop = from[ Y ];
  const toLeft = to[ X ], toTop = to[ Y ];
  const fromBox = boxes[ FROM ], toBox = boxes[ TO ];
  const fromStub = stubs[ FROM ], toStub = stubs[ TO ];

  const safeBoxDistance = 3 * stubLength;
  const minStubLength = 3;
  const minCurvePadding = 1;

  var yRatio = 1;
  if( toBox ) {
    var boxDeltaY = abs( toTop > fromTop ?
      fromBox.bottom - toBox.top :
      toBox.bottom - fromBox.top );
    if( boxDeltaY < safeBoxDistance ) {
      yRatio = boxDeltaY / safeBoxDistance;
      params.curvePadding = max( minStubLength, max( 1, round( yRatio * curvePadding ) ) );
    }
  }

  var deltaX = abs( fromLeft - toLeft );
  if( deltaX < safeBoxDistance && yRatio < 1 ) {
    var xRatio = deltaX / safeBoxDistance;
    params.stubLength = max( minStubLength, round( xRatio * stubLength ) );
    params.curvePadding = max( minCurvePadding, round( xRatio * curvePadding ) );
  }

  // Simplify by always drawing a path from left to right:
  params.reverse =
    fromLeft + fromStub * stubLength >
    toLeft + toStub * stubLength;
  if( params.reverse ) {
    params.x0 = round( toLeft );
    params.xN = round( fromLeft );
    params.y0 = round( toTop );
    params.yN = round( fromTop );
    params.stub0 = toStub;
    params.stubN = fromStub;
    params.box0 = toBox;
    params.boxN = fromBox;
  }
  else {
    params.x0 = round( fromLeft );
    params.xN = round( toLeft );
    params.y0 = round( fromTop );
    params.yN = round( toTop );
    params.stub0 = fromStub;
    params.stubN = toStub;
    params.box0 = fromBox;
    params.boxN = toBox;
  }

  return params;
}
