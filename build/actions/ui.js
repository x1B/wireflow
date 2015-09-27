define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {
  'use strict';

  var HandleFocusReceived = (0, _immutable.Record)({
    domNode: null,
    type: function type() {
      return HandleFocusReceived;
    }
  }, 'HandleFocusReceived');

  var HandleFocusLost = (0, _immutable.Record)({
    type: function type() {
      return HandleFocusLost;
    }
  }, 'HandleFocusLost');

  module.exports = {
    HandleFocusReceived: HandleFocusReceived,
    HandleFocusLost: HandleFocusLost
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3VpLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFNLG1CQUFtQixHQUFHLGVBRm5CLE1BQU0sRUFFb0I7QUFDakMsV0FBTyxFQUFFLElBQUk7QUFDYixRQUFJLEVBQUU7YUFBTSxtQkFBbUI7S0FBQTtHQUNoQyxFQUFFLHFCQUFxQixDQUFDLENBQUM7O0FBRTFCLE1BQU0sZUFBZSxHQUFHLGVBUGYsTUFBTSxFQU9nQjtBQUM3QixRQUFJLEVBQUU7YUFBTSxlQUFlO0tBQUE7R0FDNUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDOzttQkFFUDtBQUNiLHVCQUFtQixFQUFuQixtQkFBbUI7QUFDbkIsbUJBQWUsRUFBZixlQUFlO0dBQ2hCIiwiZmlsZSI6InVpLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY29yZCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IEhhbmRsZUZvY3VzUmVjZWl2ZWQgPSBSZWNvcmQoe1xuICBkb21Ob2RlOiBudWxsLFxuICB0eXBlOiAoKSA9PiBIYW5kbGVGb2N1c1JlY2VpdmVkXG59LCAnSGFuZGxlRm9jdXNSZWNlaXZlZCcpO1xuXG5jb25zdCBIYW5kbGVGb2N1c0xvc3QgPSBSZWNvcmQoe1xuICB0eXBlOiAoKSA9PiBIYW5kbGVGb2N1c0xvc3Rcbn0sICdIYW5kbGVGb2N1c0xvc3QnKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBIYW5kbGVGb2N1c1JlY2VpdmVkLFxuICBIYW5kbGVGb2N1c0xvc3Rcbn07XG4iXX0=