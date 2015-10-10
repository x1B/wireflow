const KEY_CODE_DELETE = 46;
const KEY_CODE_C = 67;
const KEY_CODE_V = 86;
const KEY_CODE_X = 88;
const KEY_CODE_Y = 89;
const KEY_CODE_Z = 90;
const KEY_CODE_ESCAPE = 0x1B;

const noOp = () => true;

export default function( domNode, options ) {

  const {
    isReadOnly,
    onCut,
    onCopy,
    onPaste,
    onDelete,
    onFocusReceived,
    onFocusLost,
    onUndo,
    onRedo
  } = Object.assign( {
    isReadOnly: noOp,
    onCut: noOp,
    onCopy: noOp,
    onPaste: noOp,
    onDelete: noOp,
    onFocusReceived: noOp,
    onFocusLost: noOp,
    onUndo: noOp,
    onRedo: noOp
  }, options );

  /**
   * If the user agent supports clipboard events, the cut/copy/paste handlers will be called twice after
   * the user has pressed Ctrl-X/C/V and only once if the user has used the browser menu. This flag makes
   * sure that each operation is carried out exactly once.
   */
  var clipboardPrepared = false;

  /** Make sure that bindings fire only once. */
  var focusHandlersInstalled = false;

  domNode.addEventListener( 'click', () => domNode.focus() );

  domNode.addEventListener( 'focusin', onFocusin );
  domNode.addEventListener( 'focus', onFocusin );

  domNode.addEventListener( 'focusout', onFocusout );
  domNode.addEventListener( 'blur', onFocusout );

  return {};


  function onFocusin() {
    if( focusHandlersInstalled ) {
      return;
    }
    document.addEventListener( 'keydown', handleKeys );
    document.body.addEventListener( 'copy', handleCopy );
    document.body.addEventListener( 'cut', handleCut );
    focusHandlersInstalled = true;
    onFocusReceived();
  }


  function onFocusout() {
    if( !focusHandlersInstalled ) {
      return;
    }
    document.removeEventListener( 'keydown', handleKeys );
    document.body.removeEventListener( 'copy', handleCopy );
    document.body.removeEventListener( 'cut', handleCut );
    focusHandlersInstalled = false;
    onFocusLost();
  }

  function handleCopy( event ) {
    if( !clipboardPrepared ) {
      onCopy( event );
    }
    event.preventDefault();
    clipboardPrepared = false;
  }

  function handleCut( event ) {
    if( !clipboardPrepared ) {
      onCut( event );
    }
    event.preventDefault();
    clipboardPrepared = false;
  }

  function handleKeys( event ) {
    if( event.keyCode === KEY_CODE_DELETE ) {
      if( isReadOnly() ) { return; }
      onDelete();
    }
    else if( event.keyCode === KEY_CODE_ESCAPE ) {
      // :TODO: cancel any ongoing drag operation
    }
    else if( event.metaKey || event.ctrlKey ) {
      switch( event.keyCode ) {
        case KEY_CODE_Z:
          if( event.shiftKey ) {
            onRedo();
          }
          else {
            onUndo();
          }
          return;
        case KEY_CODE_Y:
          onRedo();
          return;
        case KEY_CODE_C:
          onCopy();
          clipboardPrepared = true;
          return;
        case KEY_CODE_X:
          if( isReadOnly() ) { return; }
          onCut();
          clipboardPrepared = true;
          return;
        case KEY_CODE_V:
          if( isReadOnly() ) { return; }
          onPaste();
          clipboardPrepared = true;
          return;
        default:
          // ok, just an unhandled key
          return;
      }
    }
  }

}
