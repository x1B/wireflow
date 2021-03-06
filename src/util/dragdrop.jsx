import '../polyfill/object-assign';


const { abs } = Math;
const defaultDragThreshold = 3;

export default function dragdrop( options ) {

  const noOp = () => true;
  const doc = window.document;

  const {
    onBeforeStart,
    dragThreshold,
    onStart,
    onMove,
    onCancel,
    onDrop,
    onEnd,
    onClick,
    containerNode,
    getDropResult
  } = Object.assign( {
    onBeforeStart: noOp,
    dragThreshold: defaultDragThreshold,
    onStart: noOp,
    onMove: noOp,
    onCancel: noOp,
    onDrop: noOp,
    onEnd: noOp,
    onClick: noOp,
    containerNode: doc.documentElement,
    getDropResult: null
  }, options );

  // drag state:
  let dragStarted = false;
  let startClientX = 0;
  let startClientY = 0;
  let dragX = 0;
  let dragY = 0;

  let base;
  let dragPayload;
  let dragNode;
  let dropResult;
  let dropNode;

  return { start };


  function start( ev, payload, options ) {
    // we still need a minimum distance for actual drag
    dragStarted = false;
    const isLeftButton = ev.button === 0;
    const isTouch = ( ev.targetTouches || [] ).length;

    const pointerEvent = isTouch ? ev.targetTouches[ 0 ] : ev;
    const { clientX, clientY } = pointerEvent;
    const target = ( options && options.target ) || pointerEvent.target;

    const { left, top } = target.getBoundingClientRect();
    const offsetX = clientX - left;
    const offsetY = clientY - top;
    if( (isLeftButton || isTouch) && onBeforeStart( ev, offsetX, offsetY ) ) {
      base = { baseX: offsetX, baseY: offsetY };
      dragNode = ( options && options.dragNode ) || ev.currentTarget;
      dragPayload = payload;
      [ startClientX, startClientY ] = [ clientX, clientY ];

      doc.addEventListener( 'click', maybeClick );
      doc.addEventListener( 'mousemove', move );
      doc.addEventListener( 'touchmove', move );
      doc.addEventListener( 'mouseup', tryDrop );
      doc.addEventListener( 'touchend', tryDrop );
      doc.addEventListener( 'touchcancel', cancel );
      ev.preventDefault();
    }
  }


  function move( ev ) {
    const isTouch = ( ev.targetTouches || [] ).length;
    const { clientX, clientY } = isTouch ? ev.targetTouches[ 0 ] : ev;
    dragX = clientX - startClientX;
    dragY = clientY - startClientY;

    if( !dragStarted &&
        abs( dragX ) < dragThreshold && abs( dragY ) < dragThreshold ) {
      return;
    }

    if( !dragStarted ) {
      onStart( ev );
      dragStarted = true;
    }

    const { node, result } = anyDropResult( clientX, clientY );
    dropNode = node;
    dropResult = result;
    onMove( state(), ev );
  }


  function cancel( ev ) {
    onCancel( state(), ev );
    end( ev );
  }


  function tryDrop( ev ) {
    ( dropResult ? onDrop : onCancel )( state(), ev );
    end( ev );
  }


  function end( ev ) {
    doc.removeEventListener( 'mousemove', move );
    doc.removeEventListener( 'touchmove', move );
    doc.removeEventListener( 'mouseup', tryDrop );
    doc.removeEventListener( 'touchend', tryDrop );
    doc.removeEventListener( 'touchcancel', cancel );
    dragPayload = dropNode = dropResult = null;
    onEnd( state(), ev );
  }


  function maybeClick( ev ) {
    doc.removeEventListener( 'click', maybeClick );
    if( !dragStarted ) {
      onClick( ev );
    }
  }


  function anyDropResult( clientX, clientY ) {
    let node = null;
    let result = null;
    if( !getDropResult ) {
      return { node, result };
    }

    node = doc.elementFromPoint( clientX, clientY );
    while( node && node !== containerNode ) {
      result = getDropResult( node, dragPayload );
      // truthy: use as result
      if( result ) {
        break;
      }
      // false: cancel looking immediately
      if( result === false ) {
        node = null;
        break;
      }
      // falsy but not false: keep looking
      node = node.parentNode;
    }
    return { node, result };
  }


  function state() {
    return {
      base,
      dragPayload,
      dragNode,
      dragX,
      dragY,
      dropResult,
      dropNode
    };
  }
}
