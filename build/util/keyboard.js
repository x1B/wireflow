define(['exports', 'module', '../flux/settings/settings-actions', '../flux/selection/selection-actions', '../flux/history/history-actions'], function (exports, module, _fluxSettingsSettingsActions, _fluxSelectionSelectionActions, _fluxHistoryHistoryActions) {
  // :TODO: move actual action wiring to graph component (similar to dragdrop)

  'use strict';

  /** Maintain fake clipboard across instances if no system clipboard is available. */
  var fakeClipboard;

  var KEY_CODE_DELETE = 46;
  var KEY_CODE_C = 67;
  var KEY_CODE_V = 86;
  var KEY_CODE_X = 88;
  var KEY_CODE_Y = 89;
  var KEY_CODE_Z = 90;
  var KEY_CODE_ESCAPE = 0x1B;

  module.exports = function (domNode, eventHandler, isReadOnly) {

    /**
     * If the user agent supports clipboard events, the cut/copy/paste handlers will be called twice after
     * the user has pressed Ctrl-X/C/V and only once if the user has used the browser menu. This flag makes
     * sure that each operation is carried out exactly once.
     */
    var clipboardPrepared = false;

    /** Make sure that bindings fire only once. */
    var focusHandlersInstalled = false;

    domNode.addEventListener('click', function () {
      return domNode.focus();
    });

    domNode.addEventListener('focusin', onFocusin);
    domNode.addEventListener('focus', onFocusin);

    domNode.addEventListener('focusout', onFocusout);
    domNode.addEventListener('blur', onFocusout);

    return {};

    function onFocusin() {
      if (focusHandlersInstalled) {
        return;
      }
      eventHandler((0, _fluxSettingsSettingsActions.HandleFocusReceived)({ domNode: domNode }));
      document.addEventListener('keydown', handleKeys);
      document.body.addEventListener('copy', handleCopy);
      document.body.addEventListener('cut', handleCut);
      focusHandlersInstalled = true;
    }

    function onFocusout() {
      if (!focusHandlersInstalled) {
        return;
      }
      document.removeEventListener('keydown', handleKeys);
      document.body.removeEventListener('copy', handleCopy);
      document.body.removeEventListener('cut', handleCut);
      focusHandlersInstalled = false;
      eventHandler((0, _fluxSettingsSettingsActions.HandleFocusLost)());
    }

    function handleCopy(event) {
      if (!clipboardPrepared) {
        copySelectionToClipboard();
      }
      event.clipboardData.setData('application/json', fakeClipboard);
      event.clipboardData.setData('text/plain', fakeClipboard);
      event.preventDefault();
      clipboardPrepared = false;
    }

    function handleCut(event) {
      if (!clipboardPrepared) {
        copySelectionToClipboard();
        eventHandler((0, _fluxSelectionSelectionActions.DeleteSelection)());
      }
      event.clipboardData.setData('application/json', fakeClipboard);
      event.clipboardData.setData('text/plain', fakeClipboard);
      event.preventDefault();
      clipboardPrepared = false;
    }

    function copySelectionToClipboard() {}

    function handleKeys(event) {
      if (event.keyCode === KEY_CODE_DELETE) {
        if (isReadOnly()) {
          return;
        }
        eventHandler((0, _fluxHistoryHistoryActions.CreateCheckpoint)({ before: 'Delete Selection' }));
        eventHandler((0, _fluxSelectionSelectionActions.DeleteSelection)());
      } else if (event.keyCode === KEY_CODE_ESCAPE) {} else if (event.metaKey || event.ctrlKey) {
        switch (event.keyCode) {
          case KEY_CODE_Z:
            eventHandler(event.shiftKey ? (0, _fluxHistoryHistoryActions.UiRedo)() : (0, _fluxHistoryHistoryActions.UiUndo)());
            return;
          case KEY_CODE_Y:
            eventHandler((0, _fluxHistoryHistoryActions.UiRedo)());
            return;
          case KEY_CODE_C:
            copySelectionToClipboard();
            clipboardPrepared = true;
            return;
          case KEY_CODE_X:
            if (isReadOnly()) {
              return;
            }
            copySelectionToClipboard();
            // :TODO:
            clipboardPrepared = true;
            return;
          case KEY_CODE_V:
            if (fakeClipboard) {}
            return;
          default:
            // ok, just an unhandled key
            return;
        }
      }
    }
  };
});

// :TODO:
// fakeClipboard = JSON.stringify( selectionController.copy() );
// ...

// :TODO:
// :TODO:
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2tleWJvYXJkLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFtQkEsTUFBSSxhQUFhLENBQUM7O0FBRWxCLE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMzQixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQzs7bUJBRWQsVUFBVSxPQUFPLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRzs7Ozs7OztBQU8zRCxRQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQzs7O0FBRzlCLFFBQUksc0JBQXNCLEdBQUcsS0FBSyxDQUFDOztBQUVuQyxXQUFPLENBQUMsZ0JBQWdCLENBQUUsT0FBTyxFQUFFO2FBQU0sT0FBTyxDQUFDLEtBQUssRUFBRTtLQUFBLENBQUUsQ0FBQzs7QUFFM0QsV0FBTyxDQUFDLGdCQUFnQixDQUFFLFNBQVMsRUFBRSxTQUFTLENBQUUsQ0FBQztBQUNqRCxXQUFPLENBQUMsZ0JBQWdCLENBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBRSxDQUFDOztBQUUvQyxXQUFPLENBQUMsZ0JBQWdCLENBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBRSxDQUFDO0FBQ25ELFdBQU8sQ0FBQyxnQkFBZ0IsQ0FBRSxNQUFNLEVBQUUsVUFBVSxDQUFFLENBQUM7O0FBRS9DLFdBQU8sRUFBRSxDQUFDOztBQUdWLGFBQVMsU0FBUyxHQUFHO0FBQ25CLFVBQUksc0JBQXNCLEVBQUc7QUFDM0IsZUFBTztPQUNSO0FBQ0Qsa0JBQVksQ0FBRSxpQ0FyRGhCLG1CQUFtQixFQXFEaUIsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBRSxDQUFDO0FBQzFELGNB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QSxlQUNKLFVBQVU7QUFDYixnQkFBSSxVQUFVLEVBQUUsRUFBRztBQUFFLHFCQUFPO2FBQUU7QUFDOUIsb0NBQXdCLEVBQUUsQ0FBQzs7QUFFM0IsNkJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQ3pCLG1CQUFPO0FBQUEsZUFDSixVQUFVO0FBQ2IsZ0JBQUksYUFBYSxFQUFHLEVBRW5CO0FBQ0QsbUJBQU87QUFBQTs7QUFHUCxtQkFBTztBQUFBLFNBQ1Y7T0FDRjtLQUNGO0dBRUYiLCJmaWxlIjoia2V5Ym9hcmQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gOlRPRE86IG1vdmUgYWN0dWFsIGFjdGlvbiB3aXJpbmcgdG8gZ3JhcGggY29tcG9uZW50IChzaW1pbGFyIHRvIGRyYWdkcm9wKVxuXG5pbXBvcnQge1xuICBIYW5kbGVGb2N1c1JlY2VpdmVkLFxuICBIYW5kbGVGb2N1c0xvc3Rcbn0gZnJvbSAnLi4vZmx1eC9zZXR0aW5ncy9zZXR0aW5ncy1hY3Rpb25zJztcblxuaW1wb3J0IHtcbiAgRGVsZXRlU2VsZWN0aW9uXG59IGZyb20gJy4uL2ZsdXgvc2VsZWN0aW9uL3NlbGVjdGlvbi1hY3Rpb25zJztcblxuaW1wb3J0IHtcbiAgVWlVbmRvLFxuICBVaVJlZG8sXG4gIENyZWF0ZUNoZWNrcG9pbnRcbn0gZnJvbSAnLi4vZmx1eC9oaXN0b3J5L2hpc3RvcnktYWN0aW9ucyc7XG5cblxuLyoqIE1haW50YWluIGZha2UgY2xpcGJvYXJkIGFjcm9zcyBpbnN0YW5jZXMgaWYgbm8gc3lzdGVtIGNsaXBib2FyZCBpcyBhdmFpbGFibGUuICovXG52YXIgZmFrZUNsaXBib2FyZDtcblxuY29uc3QgS0VZX0NPREVfREVMRVRFID0gNDY7XG5jb25zdCBLRVlfQ09ERV9DID0gNjc7XG5jb25zdCBLRVlfQ09ERV9WID0gODY7XG5jb25zdCBLRVlfQ09ERV9YID0gODg7XG5jb25zdCBLRVlfQ09ERV9ZID0gODk7XG5jb25zdCBLRVlfQ09ERV9aID0gOTA7XG5jb25zdCBLRVlfQ09ERV9FU0NBUEUgPSAweDFCO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiggZG9tTm9kZSwgZXZlbnRIYW5kbGVyLCBpc1JlYWRPbmx5ICkge1xuXG4gIC8qKlxuICAgKiBJZiB0aGUgdXNlciBhZ2VudCBzdXBwb3J0cyBjbGlwYm9hcmQgZXZlbnRzLCB0aGUgY3V0L2NvcHkvcGFzdGUgaGFuZGxlcnMgd2lsbCBiZSBjYWxsZWQgdHdpY2UgYWZ0ZXJcbiAgICogdGhlIHVzZXIgaGFzIHByZXNzZWQgQ3RybC1YL0MvViBhbmQgb25seSBvbmNlIGlmIHRoZSB1c2VyIGhhcyB1c2VkIHRoZSBicm93c2VyIG1lbnUuIFRoaXMgZmxhZyBtYWtlc1xuICAgKiBzdXJlIHRoYXQgZWFjaCBvcGVyYXRpb24gaXMgY2FycmllZCBvdXQgZXhhY3RseSBvbmNlLlxuICAgKi9cbiAgdmFyIGNsaXBib2FyZFByZXBhcmVkID0gZmFsc2U7XG5cbiAgLyoqIE1ha2Ugc3VyZSB0aGF0IGJpbmRpbmdzIGZpcmUgb25seSBvbmNlLiAqL1xuICB2YXIgZm9jdXNIYW5kbGVyc0luc3RhbGxlZCA9IGZhbHNlO1xuXG4gIGRvbU5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgKCkgPT4gZG9tTm9kZS5mb2N1cygpICk7XG5cbiAgZG9tTm9kZS5hZGRFdmVudExpc3RlbmVyKCAnZm9jdXNpbicsIG9uRm9jdXNpbiApO1xuICBkb21Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1cycsIG9uRm9jdXNpbiApO1xuXG4gIGRvbU5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ2ZvY3Vzb3V0Jywgb25Gb2N1c291dCApO1xuICBkb21Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoICdibHVyJywgb25Gb2N1c291dCApO1xuXG4gIHJldHVybiB7fTtcblxuXG4gIGZ1bmN0aW9uIG9uRm9jdXNpbigpIHtcbiAgICBpZiggZm9jdXNIYW5kbGVyc0luc3RhbGxlZCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZXZlbnRIYW5kbGVyKCBIYW5kbGVGb2N1c1JlY2VpdmVkKHsgZG9tTm9kZTogZG9tTm9kZSB9KSApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgaGFuZGxlS2V5cyApO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciggJ2NvcHknLCBoYW5kbGVDb3B5ICk7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCAnY3V0JywgaGFuZGxlQ3V0ICk7XG4gICAgZm9jdXNIYW5kbGVyc0luc3RhbGxlZCA9IHRydWU7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIG9uRm9jdXNvdXQoKSB7XG4gICAgaWYoICFmb2N1c0hhbmRsZXJzSW5zdGFsbGVkICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIGhhbmRsZUtleXMgKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjb3B5JywgaGFuZGxlQ29weSApO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2N1dCcsIGhhbmRsZUN1dCApO1xuICAgIGZvY3VzSGFuZGxlcnNJbnN0YWxsZWQgPSBmYWxzZTtcbiAgICBldmVudEhhbmRsZXIoIEhhbmRsZUZvY3VzTG9zdCgpICk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGhhbmRsZUNvcHkoIGV2ZW50ICkge1xuICAgIGlmKCAhY2xpcGJvYXJkUHJlcGFyZWQgKSB7XG4gICAgICBjb3B5U2VsZWN0aW9uVG9DbGlwYm9hcmQoKTtcbiAgICB9XG4gICAgZXZlbnQuY2xpcGJvYXJkRGF0YS5zZXREYXRhKCAnYXBwbGljYXRpb24vanNvbicsIGZha2VDbGlwYm9hcmQgKTtcbiAgICBldmVudC5jbGlwYm9hcmREYXRhLnNldERhdGEoICd0ZXh0L3BsYWluJywgZmFrZUNsaXBib2FyZCApO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xpcGJvYXJkUHJlcGFyZWQgPSBmYWxzZTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gaGFuZGxlQ3V0KCBldmVudCApIHtcbiAgICBpZiggIWNsaXBib2FyZFByZXBhcmVkICkge1xuICAgICAgY29weVNlbGVjdGlvblRvQ2xpcGJvYXJkKCk7XG4gICAgICBldmVudEhhbmRsZXIoIERlbGV0ZVNlbGVjdGlvbigpICk7XG4gICAgfVxuICAgIGV2ZW50LmNsaXBib2FyZERhdGEuc2V0RGF0YSggJ2FwcGxpY2F0aW9uL2pzb24nLCBmYWtlQ2xpcGJvYXJkICk7XG4gICAgZXZlbnQuY2xpcGJvYXJkRGF0YS5zZXREYXRhKCAndGV4dC9wbGFpbicsIGZha2VDbGlwYm9hcmQgKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNsaXBib2FyZFByZXBhcmVkID0gZmFsc2U7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGNvcHlTZWxlY3Rpb25Ub0NsaXBib2FyZCgpIHtcbiAgICAvLyA6VE9ETzpcbiAgICAvLyBmYWtlQ2xpcGJvYXJkID0gSlNPTi5zdHJpbmdpZnkoIHNlbGVjdGlvbkNvbnRyb2xsZXIuY29weSgpICk7XG4gICAgLy8gLi4uXG4gIH1cblxuXG4gIGZ1bmN0aW9uIGhhbmRsZUtleXMoIGV2ZW50ICkge1xuICAgIGlmKCBldmVudC5rZXlDb2RlID09PSBLRVlfQ09ERV9ERUxFVEUgKSB7XG4gICAgICBpZiggaXNSZWFkT25seSgpICkgeyByZXR1cm47IH1cbiAgICAgIGV2ZW50SGFuZGxlciggQ3JlYXRlQ2hlY2twb2ludCh7IGJlZm9yZTogJ0RlbGV0ZSBTZWxlY3Rpb24nIH0pICk7XG4gICAgICBldmVudEhhbmRsZXIoIERlbGV0ZVNlbGVjdGlvbigpICk7XG4gICAgfVxuICAgIGVsc2UgaWYoIGV2ZW50LmtleUNvZGUgPT09IEtFWV9DT0RFX0VTQ0FQRSApIHtcbiAgICAgIC8vIDpUT0RPOlxuICAgIH1cbiAgICBlbHNlIGlmKCBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkgKSB7XG4gICAgICBzd2l0Y2goIGV2ZW50LmtleUNvZGUgKSB7XG4gICAgICAgIGNhc2UgS0VZX0NPREVfWjpcbiAgICAgICAgICBldmVudEhhbmRsZXIoIGV2ZW50LnNoaWZ0S2V5ID8gVWlSZWRvKCkgOiBVaVVuZG8oKSApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2FzZSBLRVlfQ09ERV9ZOlxuICAgICAgICAgIGV2ZW50SGFuZGxlciggVWlSZWRvKCkgKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgS0VZX0NPREVfQzpcbiAgICAgICAgICBjb3B5U2VsZWN0aW9uVG9DbGlwYm9hcmQoKTtcbiAgICAgICAgICBjbGlwYm9hcmRQcmVwYXJlZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYXNlIEtFWV9DT0RFX1g6XG4gICAgICAgICAgaWYoIGlzUmVhZE9ubHkoKSApIHsgcmV0dXJuOyB9XG4gICAgICAgICAgY29weVNlbGVjdGlvblRvQ2xpcGJvYXJkKCk7XG4gICAgICAgICAgLy8gOlRPRE86XG4gICAgICAgICAgY2xpcGJvYXJkUHJlcGFyZWQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2FzZSBLRVlfQ09ERV9WOlxuICAgICAgICAgIGlmKCBmYWtlQ2xpcGJvYXJkICkge1xuICAgICAgICAgICAgLy8gOlRPRE86XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBvaywganVzdCBhbiB1bmhhbmRsZWQga2V5XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG59XG4iXX0=