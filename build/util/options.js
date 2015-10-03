define(['exports', 'module', '../polyfill/object-assign'], function (exports, module, _polyfillObjectAssign) {
  'use strict';

  module.exports = options;

  var assign = Object.assign;

  function options() {
    for (var _len = arguments.length, maps = Array(_len), _key = 0; _key < _len; _key++) {
      maps[_key] = arguments[_key];
    }

    maps.unshift({});
    return assign.apply(Object, maps);
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL29wdGlvbnMuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzttQkFJd0IsT0FBTzs7QUFGL0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7QUFFZCxXQUFTLE9BQU8sR0FBWTtzQ0FBUCxJQUFJO0FBQUosVUFBSTs7O0FBQ3RDLFFBQUksQ0FBQyxPQUFPLENBQUUsRUFBRSxDQUFFLENBQUM7QUFDbkIsV0FBTyxNQUFNLENBQUMsS0FBSyxDQUFFLE1BQU0sRUFBRSxJQUFJLENBQUUsQ0FBQztHQUNyQyIsImZpbGUiOiJvcHRpb25zLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vcG9seWZpbGwvb2JqZWN0LWFzc2lnbic7XG5cbmNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9wdGlvbnMoIC4uLm1hcHMgKSB7XG4gIG1hcHMudW5zaGlmdCgge30gKTtcbiAgcmV0dXJuIGFzc2lnbi5hcHBseSggT2JqZWN0LCBtYXBzICk7XG59XG4iXX0=