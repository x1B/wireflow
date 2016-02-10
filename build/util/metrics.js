define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {'use strict';var _slicedToArray = (function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i['return']) _i['return']();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError('Invalid attempt to destructure non-iterable instance');}};})();

  var durationMs = 1000;

  var counters = (0, _immutable.Map)();
  var durations = (0, _immutable.Map)();
  var timeout;

  function count(event) {
    counters = counters.set(event.what, (counters.get(event.what) || 0) + 1);
    durations = durations.set(event.what, (durations.get(event.what) || 0) + event.duration);
    // :TODO:
    // timeout = timeout || window.setTimeout( report, durationMs );
  }

  function round(number) {
    return Math.round(number * 1000) / 1000;}


  function report() {
    var pad = function pad(n) {return n > 999 ? '' : ' ' + pad(10 * n);};
    var message = counters.entrySeq().map(
    function (_ref, _) {var _ref2 = _slicedToArray(_ref, 2);var component = _ref2[0];var c = _ref2[1];
      var d = durations.get(component);
      var formatD = d ? '×' + round(d / c) + 'ms' : '';
      return pad(c) + ' ' + c + ' | ' + formatD + '  ' + component;}).

    toJS().join('\n ');
    window.console.info('Metrics over ' + durationMs + 'ms \n', message);

    window.clearTimeout(timeout);
    timeout = null;
    counters = (0, _immutable.Map)();
    durations = (0, _immutable.Map)();}module.exports = 


  count;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL21ldHJpY3MuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDOztBQUV4QixNQUFJLFFBQVEsR0FBRyxlQUpOLEdBQUcsR0FJUSxDQUFDO0FBQ3JCLE1BQUksU0FBUyxHQUFHLGVBTFAsR0FBRyxHQUtTLENBQUM7QUFDdEIsTUFBSSxPQUFPLENBQUM7O0FBRVosV0FBUyxLQUFLLENBQUUsS0FBSyxFQUFHO0FBQ3RCLFlBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLENBQUEsR0FBSSxDQUFDLENBQUUsQ0FBQztBQUM3RSxhQUFTLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBRSxLQUFLLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxDQUFBLEdBQUksS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDOzs7R0FHOUY7O0FBRUQsV0FBUyxLQUFLLENBQUUsTUFBTSxFQUFHO0FBQ3ZCLFdBQU8sSUFBSSxDQUFDLEtBQUssQ0FBRSxNQUFNLEdBQUcsSUFBSSxDQUFFLEdBQUcsSUFBSSxDQUFDLENBQzNDOzs7QUFFRCxXQUFTLE1BQU0sR0FBRztBQUNoQixRQUFNLEdBQUcsR0FBRyxTQUFOLEdBQUcsQ0FBRyxDQUFDLFVBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBRSxFQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUEsQ0FBQztBQUNwRCxRQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRztBQUNyQyxjQUFDLElBQWdCLEVBQUUsQ0FBQyxFQUFLLDRCQUF4QixJQUFnQixTQUFkLFNBQVMsZ0JBQUUsQ0FBQztBQUNiLFVBQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUUsU0FBUyxDQUFFLENBQUM7QUFDckMsVUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDbkQsYUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQUksQ0FBQyxXQUFNLE9BQU8sVUFBSyxTQUFTLENBQUcsQ0FDcEQsQ0FDRjs7QUFBQyxRQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUUsS0FBSyxDQUFFLENBQUM7QUFDdkIsVUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUUsZUFBZSxHQUFHLFVBQVUsR0FBRyxPQUFPLEVBQUUsT0FBTyxDQUFFLENBQUM7O0FBRXZFLFVBQU0sQ0FBQyxZQUFZLENBQUUsT0FBTyxDQUFFLENBQUM7QUFDL0IsV0FBTyxHQUFHLElBQUksQ0FBQztBQUNmLFlBQVEsR0FBRyxlQWhDSixHQUFHLEdBZ0NNLENBQUM7QUFDakIsYUFBUyxHQUFHLGVBakNMLEdBQUcsR0FpQ08sQ0FBQyxDQUNuQjs7O0FBRWMsT0FBSyIsImZpbGUiOiJtZXRyaWNzLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IGR1cmF0aW9uTXMgPSAxMDAwO1xuXG52YXIgY291bnRlcnMgPSBNYXAoKTtcbnZhciBkdXJhdGlvbnMgPSBNYXAoKTtcbnZhciB0aW1lb3V0O1xuXG5mdW5jdGlvbiBjb3VudCggZXZlbnQgKSB7XG4gIGNvdW50ZXJzID0gY291bnRlcnMuc2V0KCBldmVudC53aGF0LCAoY291bnRlcnMuZ2V0KCBldmVudC53aGF0ICkgfHwgMCkgKyAxICk7XG4gIGR1cmF0aW9ucyA9IGR1cmF0aW9ucy5zZXQoIGV2ZW50LndoYXQsIChkdXJhdGlvbnMuZ2V0KCBldmVudC53aGF0ICkgfHwgMCkgKyBldmVudC5kdXJhdGlvbiApO1xuICAvLyA6VE9ETzpcbiAgLy8gdGltZW91dCA9IHRpbWVvdXQgfHwgd2luZG93LnNldFRpbWVvdXQoIHJlcG9ydCwgZHVyYXRpb25NcyApO1xufVxuXG5mdW5jdGlvbiByb3VuZCggbnVtYmVyICkge1xuICByZXR1cm4gTWF0aC5yb3VuZCggbnVtYmVyICogMTAwMCApIC8gMTAwMDtcbn1cblxuZnVuY3Rpb24gcmVwb3J0KCkge1xuICBjb25zdCBwYWQgPSBuID0+IG4gPiA5OTkgPyAnJyA6ICcgJyArIHBhZCggMTAgKiBuICk7XG4gIGNvbnN0IG1lc3NhZ2UgPSBjb3VudGVycy5lbnRyeVNlcSgpLm1hcChcbiAgICAoWyBjb21wb25lbnQsIGMgXSwgXykgPT4ge1xuICAgICAgY29uc3QgZCA9IGR1cmF0aW9ucy5nZXQoIGNvbXBvbmVudCApO1xuICAgICAgY29uc3QgZm9ybWF0RCA9IGQgPyAnw5cnICsgcm91bmQoZCAvIGMpICsgJ21zJyA6ICcnO1xuICAgICAgcmV0dXJuIGAke3BhZChjKX0gJHtjfSB8ICR7Zm9ybWF0RH0gICR7Y29tcG9uZW50fWA7XG4gICAgfVxuICApLnRvSlMoKS5qb2luKCAnXFxuICcgKTtcbiAgd2luZG93LmNvbnNvbGUuaW5mbyggJ01ldHJpY3Mgb3ZlciAnICsgZHVyYXRpb25NcyArICdtcyBcXG4nLCBtZXNzYWdlICk7XG5cbiAgd2luZG93LmNsZWFyVGltZW91dCggdGltZW91dCApO1xuICB0aW1lb3V0ID0gbnVsbDtcbiAgY291bnRlcnMgPSBNYXAoKTtcbiAgZHVyYXRpb25zID0gTWFwKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvdW50O1xuIl19