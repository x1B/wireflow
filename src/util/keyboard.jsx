// :TODO: move actual action wiring to graph component (similar to dragdrop)

import {
  HandleFocusReceived,
  HandleFocusLost
} from '../flux/settings/settings-actions';

import {
  DeleteSelection
} from '../flux/selection/selection-actions';

import {
  UiUndo,
  UiRedo,
  CreateCheckpoint
} from '../flux/history/history-actions';


/** Maintain fake clipboard across instances if no system clipboard is available. */
var fakeClipboard;

const KEY_CODE_DELETE = 46;
const KEY_CODE_C = 67;
const KEY_CODE_V = 86;
const KEY_CODE_X = 88;
const KEY_CODE_Y = 89;
const KEY_CODE_Z = 90;
const KEY_CODE_ESCAPE = 0x1B;

export default function( domNode, eventHandler, isReadOnly ) {

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
    eventHandler( HandleFocusReceived({ domNode: domNode }) );
    document.addEventListener( 'keydown', handleKeys );
    document.body.addEventListener( 'copy', handleCopy );
    document.body.addEventListener( 'cut', handleCut );
    focusHandlersInstalled = true;
  }


  function onFocusout() {
    if( !focusHandlersInstalled ) {
      return;
    }
    document.removeEventListener( 'keydown', handleKeys );
    document.body.removeEventListener( 'copy', handleCopy );
    document.body.removeEventListener( 'cut', handleCut );
    focusHandlersInstalled = false;
    eventHandler( HandleFocusLost() );
  }


  function handleCopy( event ) {
    if( !clipboardPrepared ) {
      copySelectionToClipboard();
    }
    event.clipboardData.setData( 'application/json', fakeClipboard );
    event.clipboardData.setData( 'text/plain', fakeClipboard );
    event.preventDefault();
    clipboardPrepared = false;
  }


  function handleCut( event ) {
    if( !clipboardPrepared ) {
      copySelectionToClipboard();
      eventHandler( DeleteSelection() );
    }
    event.clipboardData.setData( 'application/json', fakeClipboard );
    event.clipboardData.setData( 'text/plain', fakeClipboard );
    event.preventDefault();
    clipboardPrepared = false;
  }


  function copySelectionToClipboard() {
    // :TODO:
    // fakeClipboard = JSON.stringify( selectionController.copy() );
    // ...
  }


  function handleKeys( event ) {
    if( event.keyCode === KEY_CODE_DELETE ) {
      if( isReadOnly() ) { return; }
      eventHandler( CreateCheckpoint({ before: 'Delete Selection' }) );
      eventHandler( DeleteSelection() );
    }
    else if( event.keyCode === KEY_CODE_ESCAPE ) {
      // :TODO:
    }
    else if( event.metaKey || event.ctrlKey ) {
      switch( event.keyCode ) {
        case KEY_CODE_Z:
          eventHandler( event.shiftKey ? UiRedo() : UiUndo() );
          return;
        case KEY_CODE_Y:
          eventHandler( UiRedo() );
          return;
        case KEY_CODE_C:
          copySelectionToClipboard();
          clipboardPrepared = true;
          return;
        case KEY_CODE_X:
          if( isReadOnly() ) { return; }
          copySelectionToClipboard();
          // :TODO:
          clipboardPrepared = true;
          return;
        case KEY_CODE_V:
          if( fakeClipboard ) {
            // :TODO:
          }
          return;
        default:
          // ok, just an unhandled key
          return;
      }
    }
  }

}
