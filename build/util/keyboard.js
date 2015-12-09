define(['exports', 'module'], function (exports, module) {'use strict';var KEY_CODE_DELETE = 46;
  var KEY_CODE_C = 67;
  var KEY_CODE_V = 86;
  var KEY_CODE_X = 88;
  var KEY_CODE_Y = 89;
  var KEY_CODE_Z = 90;
  var KEY_CODE_ESCAPE = 0x1B;

  var noOp = function noOp() {return true;};module.exports = 

  function (domNode, options) {var _Object$assign = 











    Object.assign({ 
      isReadOnly: noOp, 
      onCut: noOp, 
      onCopy: noOp, 
      onPaste: noOp, 
      onDelete: noOp, 
      onFocusReceived: noOp, 
      onFocusLost: noOp, 
      onUndo: noOp, 
      onRedo: noOp }, 
    options);var isReadOnly = _Object$assign.isReadOnly;var onCut = _Object$assign.onCut;var onCopy = _Object$assign.onCopy;var onPaste = _Object$assign.onPaste;var onDelete = _Object$assign.onDelete;var onFocusReceived = _Object$assign.onFocusReceived;var onFocusLost = _Object$assign.onFocusLost;var onUndo = _Object$assign.onUndo;var onRedo = _Object$assign.onRedo;

    /**
     * If the user agent supports clipboard events, the cut/copy/paste handlers will be called twice after
     * the user has pressed Ctrl-X/C/V and only once if the user has used the browser menu. This flag makes
     * sure that each operation is carried out exactly once.
     */
    var clipboardPrepared = false;

    /** Make sure that bindings fire only once. */
    var focusHandlersInstalled = false;

    domNode.addEventListener('click', function () {return domNode.focus();});

    domNode.addEventListener('focusin', onFocusin);
    domNode.addEventListener('focus', onFocusin);

    domNode.addEventListener('focusout', onFocusout);
    domNode.addEventListener('blur', onFocusout);

    return {};


    function onFocusin() {
      if (focusHandlersInstalled) {
        return;}

      document.addEventListener('keydown', handleKeys);
      document.body.addEventListener('copy', handleCopy);
      document.body.addEventListener('cut', handleCut);
      focusHandlersInstalled = true;
      onFocusReceived();}



    function onFocusout() {
      if (!focusHandlersInstalled) {
        return;}

      document.removeEventListener('keydown', handleKeys);
      document.body.removeEventListener('copy', handleCopy);
      document.body.removeEventListener('cut', handleCut);
      focusHandlersInstalled = false;
      onFocusLost();}


    function handleCopy(event) {
      if (!clipboardPrepared) {
        onCopy(event);}

      event.preventDefault();
      clipboardPrepared = false;}


    function handleCut(event) {
      if (!clipboardPrepared) {
        onCut(event);}

      event.preventDefault();
      clipboardPrepared = false;}


    function handleKeys(event) {
      if (event.keyCode === KEY_CODE_DELETE) {
        if (isReadOnly()) {return;}
        onDelete();} else 

      if (event.keyCode === KEY_CODE_ESCAPE) {
        // :TODO: cancel any ongoing drag operation
      } else 
        if (event.metaKey || event.ctrlKey) {
          switch (event.keyCode) {
            case KEY_CODE_Z:
              if (event.shiftKey) {
                onRedo();} else 

              {
                onUndo();}

              return;
            case KEY_CODE_Y:
              onRedo();
              return;
            case KEY_CODE_C:
              onCopy();
              clipboardPrepared = true;
              return;
            case KEY_CODE_X:
              if (isReadOnly()) {return;}
              onCut();
              clipboardPrepared = true;
              return;
            case KEY_CODE_V:
              if (isReadOnly()) {return;}
              onPaste();
              clipboardPrepared = true;
              return;
            default:
              // ok, just an unhandled key
              return;}}}};});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2tleWJvYXJkLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoidUVBQUEsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDOztBQUU3QixNQUFNLElBQUksR0FBRyxTQUFQLElBQUksV0FBUyxJQUFJLEVBQUEsQ0FBQzs7QUFFVCxZQUFVLE9BQU8sRUFBRSxPQUFPLEVBQUc7Ozs7Ozs7Ozs7OztBQVl0QyxVQUFNLENBQUMsTUFBTSxDQUFFO0FBQ2pCLGdCQUFVLEVBQUUsSUFBSTtBQUNoQixXQUFLLEVBQUUsSUFBSTtBQUNYLFlBQU0sRUFBRSxJQUFJO0FBQ1osYUFBTyxFQUFFLElBQUk7QUFDYixjQUFRLEVBQUUsSUFBSTtBQUNkLHFCQUFlLEVBQUUsSUFBSTtBQUNyQixpQkFBVyxFQUFFLElBQUk7QUFDakIsWUFBTSxFQUFFLElBQUk7QUFDWixZQUFNLEVBQUUsSUFBSSxFQUNiO0FBQUUsV0FBTyxDQUFFLEtBbkJWLFVBQVUsa0JBQVYsVUFBVSxLQUNWLEtBQUssa0JBQUwsS0FBSyxLQUNMLE1BQU0sa0JBQU4sTUFBTSxLQUNOLE9BQU8sa0JBQVAsT0FBTyxLQUNQLFFBQVEsa0JBQVIsUUFBUSxLQUNSLGVBQWUsa0JBQWYsZUFBZSxLQUNmLFdBQVcsa0JBQVgsV0FBVyxLQUNYLE1BQU0sa0JBQU4sTUFBTSxLQUNOLE1BQU0sa0JBQU4sTUFBTTs7Ozs7OztBQWtCUixRQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQzs7O0FBRzlCLFFBQUksc0JBQXNCLEdBQUcsS0FBSyxDQUFDOztBQUVuQyxXQUFPLENB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LEVBQUUsQ0FBQztBQUNSLCtCQUFpQixHQUFHLElBQUksQ0FBQztBQUN6QixxQkFBTztBQUNULGlCQUFLLFVBQVU7QUFDYixrQkFBSSxVQUFVLEVBQUUsRUFBRyxDQUFFLE9BQU8sQ0FBRTtBQUM5QixxQkFBTyxFQUFFLENBQUM7QUFDViwrQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDekIscUJBQU87QUFDVDs7QUFFRSxxQkFBTyxDQUNWLENBQ0YsQ0FDRixDQUVGIiwiZmlsZSI6ImtleWJvYXJkLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEtFWV9DT0RFX0RFTEVURSA9IDQ2O1xuY29uc3QgS0VZX0NPREVfQyA9IDY3O1xuY29uc3QgS0VZX0NPREVfViA9IDg2O1xuY29uc3QgS0VZX0NPREVfWCA9IDg4O1xuY29uc3QgS0VZX0NPREVfWSA9IDg5O1xuY29uc3QgS0VZX0NPREVfWiA9IDkwO1xuY29uc3QgS0VZX0NPREVfRVNDQVBFID0gMHgxQjtcblxuY29uc3Qgbm9PcCA9ICgpID0+IHRydWU7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCBkb21Ob2RlLCBvcHRpb25zICkge1xuXG4gIGNvbnN0IHtcbiAgICBpc1JlYWRPbmx5LFxuICAgIG9uQ3V0LFxuICAgIG9uQ29weSxcbiAgICBvblBhc3RlLFxuICAgIG9uRGVsZXRlLFxuICAgIG9uRm9jdXNSZWNlaXZlZCxcbiAgICBvbkZvY3VzTG9zdCxcbiAgICBvblVuZG8sXG4gICAgb25SZWRvXG4gIH0gPSBPYmplY3QuYXNzaWduKCB7XG4gICAgaXNSZWFkT25seTogbm9PcCxcbiAgICBvbkN1dDogbm9PcCxcbiAgICBvbkNvcHk6IG5vT3AsXG4gICAgb25QYXN0ZTogbm9PcCxcbiAgICBvbkRlbGV0ZTogbm9PcCxcbiAgICBvbkZvY3VzUmVjZWl2ZWQ6IG5vT3AsXG4gICAgb25Gb2N1c0xvc3Q6IG5vT3AsXG4gICAgb25VbmRvOiBub09wLFxuICAgIG9uUmVkbzogbm9PcFxuICB9LCBvcHRpb25zICk7XG5cbiAgLyoqXG4gICAqIElmIHRoZSB1c2VyIGFnZW50IHN1cHBvcnRzIGNsaXBib2FyZCBldmVudHMsIHRoZSBjdXQvY29weS9wYXN0ZSBoYW5kbGVycyB3aWxsIGJlIGNhbGxlZCB0d2ljZSBhZnRlclxuICAgKiB0aGUgdXNlciBoYXMgcHJlc3NlZCBDdHJsLVgvQy9WIGFuZCBvbmx5IG9uY2UgaWYgdGhlIHVzZXIgaGFzIHVzZWQgdGhlIGJyb3dzZXIgbWVudS4gVGhpcyBmbGFnIG1ha2VzXG4gICAqIHN1cmUgdGhhdCBlYWNoIG9wZXJhdGlvbiBpcyBjYXJyaWVkIG91dCBleGFjdGx5IG9uY2UuXG4gICAqL1xuICB2YXIgY2xpcGJvYXJkUHJlcGFyZWQgPSBmYWxzZTtcblxuICAvKiogTWFrZSBzdXJlIHRoYXQgYmluZGluZ3MgZmlyZSBvbmx5IG9uY2UuICovXG4gIHZhciBmb2N1c0hhbmRsZXJzSW5zdGFsbGVkID0gZmFsc2U7XG5cbiAgZG9tTm9kZS5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCAoKSA9PiBkb21Ob2RlLmZvY3VzKCkgKTtcblxuICBkb21Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1c2luJywgb25Gb2N1c2luICk7XG4gIGRvbU5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ2ZvY3VzJywgb25Gb2N1c2luICk7XG5cbiAgZG9tTm9kZS5hZGRFdmVudExpc3RlbmVyKCAnZm9jdXNvdXQnLCBvbkZvY3Vzb3V0ICk7XG4gIGRvbU5vZGUuYWRkRXZlbnRMaXN0ZW5lciggJ2JsdXInLCBvbkZvY3Vzb3V0ICk7XG5cbiAgcmV0dXJuIHt9O1xuXG5cbiAgZnVuY3Rpb24gb25Gb2N1c2luKCkge1xuICAgIGlmKCBmb2N1c0hhbmRsZXJzSW5zdGFsbGVkICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIGhhbmRsZUtleXMgKTtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoICdjb3B5JywgaGFuZGxlQ29weSApO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lciggJ2N1dCcsIGhhbmRsZUN1dCApO1xuICAgIGZvY3VzSGFuZGxlcnNJbnN0YWxsZWQgPSB0cnVlO1xuICAgIG9uRm9jdXNSZWNlaXZlZCgpO1xuICB9XG5cblxuICBmdW5jdGlvbiBvbkZvY3Vzb3V0KCkge1xuICAgIGlmKCAhZm9jdXNIYW5kbGVyc0luc3RhbGxlZCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCBoYW5kbGVLZXlzICk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCAnY29weScsIGhhbmRsZUNvcHkgKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjdXQnLCBoYW5kbGVDdXQgKTtcbiAgICBmb2N1c0hhbmRsZXJzSW5zdGFsbGVkID0gZmFsc2U7XG4gICAgb25Gb2N1c0xvc3QoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUNvcHkoIGV2ZW50ICkge1xuICAgIGlmKCAhY2xpcGJvYXJkUHJlcGFyZWQgKSB7XG4gICAgICBvbkNvcHkoIGV2ZW50ICk7XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xpcGJvYXJkUHJlcGFyZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUN1dCggZXZlbnQgKSB7XG4gICAgaWYoICFjbGlwYm9hcmRQcmVwYXJlZCApIHtcbiAgICAgIG9uQ3V0KCBldmVudCApO1xuICAgIH1cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNsaXBib2FyZFByZXBhcmVkID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVLZXlzKCBldmVudCApIHtcbiAgICBpZiggZXZlbnQua2V5Q29kZSA9PT0gS0VZX0NPREVfREVMRVRFICkge1xuICAgICAgaWYoIGlzUmVhZE9ubHkoKSApIHsgcmV0dXJuOyB9XG4gICAgICBvbkRlbGV0ZSgpO1xuICAgIH1cbiAgICBlbHNlIGlmKCBldmVudC5rZXlDb2RlID09PSBLRVlfQ09ERV9FU0NBUEUgKSB7XG4gICAgICAvLyA6VE9ETzogY2FuY2VsIGFueSBvbmdvaW5nIGRyYWcgb3BlcmF0aW9uXG4gICAgfVxuICAgIGVsc2UgaWYoIGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSApIHtcbiAgICAgIHN3aXRjaCggZXZlbnQua2V5Q29kZSApIHtcbiAgICAgICAgY2FzZSBLRVlfQ09ERV9aOlxuICAgICAgICAgIGlmKCBldmVudC5zaGlmdEtleSApIHtcbiAgICAgICAgICAgIG9uUmVkbygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9uVW5kbygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgS0VZX0NPREVfWTpcbiAgICAgICAgICBvblJlZG8oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgS0VZX0NPREVfQzpcbiAgICAgICAgICBvbkNvcHkoKTtcbiAgICAgICAgICBjbGlwYm9hcmRQcmVwYXJlZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYXNlIEtFWV9DT0RFX1g6XG4gICAgICAgICAgaWYoIGlzUmVhZE9ubHkoKSApIHsgcmV0dXJuOyB9XG4gICAgICAgICAgb25DdXQoKTtcbiAgICAgICAgICBjbGlwYm9hcmRQcmVwYXJlZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYXNlIEtFWV9DT0RFX1Y6XG4gICAgICAgICAgaWYoIGlzUmVhZE9ubHkoKSApIHsgcmV0dXJuOyB9XG4gICAgICAgICAgb25QYXN0ZSgpO1xuICAgICAgICAgIGNsaXBib2FyZFByZXBhcmVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gb2ssIGp1c3QgYW4gdW5oYW5kbGVkIGtleVxuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuIl19