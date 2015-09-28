define(['exports', 'module', 'immutable'], function (exports, module, _immutable) {
  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

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
    return Math.round(number * 1000) / 1000;
  }

  function report() {
    var pad = function pad(n) {
      return n > 999 ? '' : ' ' + pad(10 * n);
    };
    var message = counters.entrySeq().map(function (_ref, _) {
      var _ref2 = _slicedToArray(_ref, 2);

      var component = _ref2[0];
      var c = _ref2[1];

      var d = durations.get(component);
      var formatD = d ? '×' + round(d / c) + 'ms' : '';
      return pad(c) + ' ' + c + ' | ' + formatD + '  ' + component;
    }).toJS().join('\n ');
    window.console.info('Metrics over ' + durationMs + 'ms \n', message);

    window.clearTimeout(timeout);
    timeout = null;
    counters = (0, _immutable.Map)();
    durations = (0, _immutable.Map)();
  }

  module.exports = count;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL21ldHJpY3MuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDOztBQUV4QixNQUFJLFFBQVEsR0FBRyxlQUpOLEdBQUcsR0FJUSxDQUFDO0FBQ3JCLE1BQUksU0FBUyxHQUFHLGVBTFAsR0FBRyxHQUtTLENBQUM7QUFDdEIsTUFBSSxPQUFPLENBQUM7O0FBRVosV0FBUyxLQUFLLENBQUUsS0FBSyxFQUFHO0FBQ3RCLFlBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLENBQUEsR0FBSSxDQUFDLENBQUUsQ0FBQztBQUM3RSxhQUFTLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBRSxLQUFLLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxDQUFBLEdBQUksS0FBSyxDQUFDLFFBQVEsQ0FBRSxDQUFDOzs7R0FHOUY7O0FBRUQsV0FBUyxLQUFLLENBQUUsTUFBTSxFQUFHO0FBQ3ZCLFdBQU8sSUFBSSxDQUFDLEtBQUssQ0FBRSxNQUFNLEdBQUcsSUFBSSxDQUFFLEdBQUcsSUFBSSxDQUFDO0dBQzNDOztBQUVELFdBQVMsTUFBTSxHQUFHO0FBQ2hCLFFBQU0sR0FBRyxHQUFHLFNBQU4sR0FBRyxDQUFHLENBQUM7YUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFFLEVBQUUsR0FBRyxDQUFDLENBQUU7S0FBQSxDQUFDO0FBQ3BELFFBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQ3JDLFVBQUMsSUFBZ0IsRUFBRSxDQUFDLEVBQUs7aUNBQXhCLElBQWdCOztVQUFkLFNBQVM7VUFBRSxDQUFDOztBQUNiLFVBQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUUsU0FBUyxDQUFFLENBQUM7QUFDckMsVUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDbkQsYUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQUksQ0FBQyxXQUFNLE9BQU8sVUFBSyxTQUFTLENBQUc7S0FDcEQsQ0FDRixDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBRSxLQUFLLENBQUUsQ0FBQztBQUN2QixVQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxlQUFlLEdBQUcsVUFBVSxHQUFHLE9BQU8sRUFBRSxPQUFPLENBQUUsQ0FBQzs7QUFFdkUsVUFBTSxDQUFDLFlBQVksQ0FBRSxPQUFPLENBQUUsQ0FBQztBQUMvQixXQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ2YsWUFBUSxHQUFHLGVBaENKLEdBQUcsR0FnQ00sQ0FBQztBQUNqQixhQUFTLEdBQUcsZUFqQ0wsR0FBRyxHQWlDTyxDQUFDO0dBQ25COzttQkFFYyxLQUFLIiwiZmlsZSI6Im1ldHJpY3MuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuY29uc3QgZHVyYXRpb25NcyA9IDEwMDA7XG5cbnZhciBjb3VudGVycyA9IE1hcCgpO1xudmFyIGR1cmF0aW9ucyA9IE1hcCgpO1xudmFyIHRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGNvdW50KCBldmVudCApIHtcbiAgY291bnRlcnMgPSBjb3VudGVycy5zZXQoIGV2ZW50LndoYXQsIChjb3VudGVycy5nZXQoIGV2ZW50LndoYXQgKSB8fCAwKSArIDEgKTtcbiAgZHVyYXRpb25zID0gZHVyYXRpb25zLnNldCggZXZlbnQud2hhdCwgKGR1cmF0aW9ucy5nZXQoIGV2ZW50LndoYXQgKSB8fCAwKSArIGV2ZW50LmR1cmF0aW9uICk7XG4gIC8vIDpUT0RPOlxuICAvLyB0aW1lb3V0ID0gdGltZW91dCB8fCB3aW5kb3cuc2V0VGltZW91dCggcmVwb3J0LCBkdXJhdGlvbk1zICk7XG59XG5cbmZ1bmN0aW9uIHJvdW5kKCBudW1iZXIgKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKCBudW1iZXIgKiAxMDAwICkgLyAxMDAwO1xufVxuXG5mdW5jdGlvbiByZXBvcnQoKSB7XG4gIGNvbnN0IHBhZCA9IG4gPT4gbiA+IDk5OSA/ICcnIDogJyAnICsgcGFkKCAxMCAqIG4gKTtcbiAgY29uc3QgbWVzc2FnZSA9IGNvdW50ZXJzLmVudHJ5U2VxKCkubWFwKFxuICAgIChbIGNvbXBvbmVudCwgYyBdLCBfKSA9PiB7XG4gICAgICBjb25zdCBkID0gZHVyYXRpb25zLmdldCggY29tcG9uZW50ICk7XG4gICAgICBjb25zdCBmb3JtYXREID0gZCA/ICfDlycgKyByb3VuZChkIC8gYykgKyAnbXMnIDogJyc7XG4gICAgICByZXR1cm4gYCR7cGFkKGMpfSAke2N9IHwgJHtmb3JtYXREfSAgJHtjb21wb25lbnR9YDtcbiAgICB9XG4gICkudG9KUygpLmpvaW4oICdcXG4gJyApO1xuICB3aW5kb3cuY29uc29sZS5pbmZvKCAnTWV0cmljcyBvdmVyICcgKyBkdXJhdGlvbk1zICsgJ21zIFxcbicsIG1lc3NhZ2UgKTtcblxuICB3aW5kb3cuY2xlYXJUaW1lb3V0KCB0aW1lb3V0ICk7XG4gIHRpbWVvdXQgPSBudWxsO1xuICBjb3VudGVycyA9IE1hcCgpO1xuICBkdXJhdGlvbnMgPSBNYXAoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY291bnQ7XG4iXX0=