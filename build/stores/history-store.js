define(['exports', 'module', 'immutable', '../model', '../actions/history'], function (exports, module, _immutable, _model, _actionsHistory) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var LogEntry = (0, _immutable.Record)({ at: null, state: null }, 'LogEntry');

  var HistoryStore = (function () {
    function HistoryStore(dispatcher) {
      var _this = this;

      _classCallCheck(this, HistoryStore);

      this.dispatcher = dispatcher;

      // points to the current state, always even
      this.now = 0;
      // pointers "between" states, always odd
      this.checkpoints = (0, _immutable.List)();
      this.storeLogs = (0, _immutable.Map)();

      dispatcher.register(_actionsHistory.SaveState, function (act) {
        if (!_this.storeLogs.has(act.storeId)) {
          _this.storeLogs = _this.storeLogs.set(act.storeId, (0, _immutable.List)());
        }
        _this.storeLogs = _this.storeLogs.update(act.storeId, function (log) {
          var last = log.last();
          if (last && act.state === last.state) {
            return log;
          }
          var front = log.pop();
          var doReplace = last && last.at === _this.now;
          return (doReplace ? front : log).push(LogEntry({
            at: _this.now,
            state: act.state
          }));
        });
      });

      dispatcher.register(_actionsHistory.CreateCheckpoint, function (act) {
        var now = _this.now;

        // cut off undo'ed checkpoints and their states
        while (_this.checkpoints.count() && now < _this.checkpoints.last().at) {
          _this.checkpoints = _this.checkpoints.pop();
        }
        _this.storeLogs.forEach(function (_, storeId) {
          _this.storeLogs = _this.storeLogs.update(storeId, function (log) {
            return log.filter(function (entry) {
              return entry.at <= now;
            });
          });
        });

        _this.checkpoints = _this.checkpoints.push((0, _model.Checkpoint)({
          at: now + 1,
          before: act.before
        }));
        _this.now = now + 2;
      });

      dispatcher.register(_actionsHistory.UiUndo, function () {
        if (_this.now > 0) {
          _this.move(_this.now, _this.now - 2);
        }
      });

      dispatcher.register(_actionsHistory.UiRedo, function () {
        if (_this.checkpoints.count() && _this.now < _this.checkpoints.last().at) {
          _this.move(_this.now, _this.now + 2);
        }
      });
    }

    _createClass(HistoryStore, [{
      key: 'move',
      value: function move(from, to) {
        var _this2 = this;

        this.storeLogs.forEach(function (log, storeId) {
          var latestStates = log.reverse();
          var fromEntry = latestStates.skipWhile(function (_) {
            return _.at > from;
          }).first();
          var toEntry = latestStates.skipWhile(function (_) {
            return _.at > to;
          }).first();
          if (fromEntry && toEntry && fromEntry.state !== toEntry.state) {
            _this2.dispatcher.dispatch((0, _actionsHistory.RestoreState)({ storeId: storeId, state: toEntry.state }));
          }
        });
        this.now = to;
      }
    }]);

    return HistoryStore;
  })();

  module.exports = HistoryStore;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdG9yZXMvaGlzdG9yeS1zdG9yZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWFBLE1BQU0sUUFBUSxHQUFHLGVBYlIsTUFBTSxFQWFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7O01BR3pELFlBQVk7QUFFTCxhQUZQLFlBQVksQ0FFSCxVQUFVLEVBQUc7Ozs0QkFGdEIsWUFBWTs7QUFHZCxVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7O0FBRzdCLFVBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztBQUViLFVBQUksQ0FBQyxXQUFXLEdBQUcsZUF4Qk4sSUFBSSxHQXdCUSxDQUFDO0FBQzFCLFVBQUksQ0FBQyxTQUFTLEdBQUcsZUF6QkUsR0FBRyxHQXlCQSxDQUFDOztBQUd2QixnQkFBVSxDQUFDLFFBQVEsaUJBdEJyQixTQUFTLEVBc0J5QixVQUFBLEdBQUcsRUFBSTtBQUNyQyxZQUFJLENBQUMsTUFBSyxTQUFTLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUUsRUFBRztBQUN2QyxnQkFBSyxTQUFTLEdBQUcsTUFBSyxTQUFTLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsZUE5QnpDLElBQUksR0E4QjJDLENBQUUsQ0FBQztTQUM1RDtBQUNELGNBQUssU0FBUyxHQUFHLE1BQUssU0FBUyxDQUFDLE1BQU0sQ0FBRSxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQUEsR0FBRyxFQUFJO0FBQzFELGNBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN4QixjQUFJLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUc7QUFDckMsbUJBQU8sR0FBRyxDQUFDO1dBQ1o7QUFDRCxjQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDeEIsY0FBTSxTQUFTLEdBQUcsSUFBSSxJQUFNLElBQUksQ0FBQyxFQUFFLEtBQUssTUFBSyxHQUFHLENBQUc7QUFDbkQsaUJBQU8sQ0FBRSxTQUFTLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQSxDQUFHLElBQUksQ0FBRSxRQUFRLENBQUM7QUFDaEQsY0FBRSxFQUFFLE1BQUssR0FBRztBQUNaLGlCQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7V0FDakIsQ0FBQyxDQUFFLENBQUM7U0FDTixDQUFFLENBQUM7T0FDTCxDQUFFLENBQUM7O0FBR0osZ0JBQVUsQ0FBQyxRQUFRLGlCQTFDckIsZ0JBQWdCLEVBMEN5QixVQUFBLEdBQUcsRUFBSTtBQUM1QyxZQUFNLEdBQUcsR0FBRyxNQUFLLEdBQUcsQ0FBQzs7O0FBR3JCLGVBQU8sTUFBSyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxHQUFHLE1BQUssV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRztBQUNwRSxnQkFBSyxXQUFXLEdBQUcsTUFBSyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDM0M7QUFDRCxjQUFLLFNBQVMsQ0FBQyxPQUFPLENBQUUsVUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFLO0FBQ3RDLGdCQUFLLFNBQVMsR0FBRyxNQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUUsT0FBTyxFQUFFLFVBQUEsR0FBRzttQkFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBRSxVQUFBLEtBQUs7cUJBQUksS0FBSyxDQUFDLEVBQUUsSUFBSSxHQUFHO2FBQUEsQ0FBRTtXQUFBLENBQ3ZDLENBQUM7U0FDSCxDQUFFLENBQUM7O0FBRUosY0FBSyxXQUFXLEdBQUcsTUFBSyxXQUFXLENBQUMsSUFBSSxDQUFFLFdBMUR2QyxVQUFVLEVBMER3QztBQUNuRCxZQUFFLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDWCxnQkFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO1NBQ25CLENBQUMsQ0FBRSxDQUFDO0FBQ0wsY0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztPQUNwQixDQUFFLENBQUM7O0FBR0osZ0JBQVUsQ0FBQyxRQUFRLGlCQTVEckIsTUFBTSxFQTREeUIsWUFBTTtBQUNqQyxZQUFJLE1BQUssR0FBRyxHQUFHLENBQUMsRUFBRztBQUNqQixnQkFBSyxJQUFJLENBQUUsTUFBSyxHQUFHLEVBQUUsTUFBSyxHQUFHLEdBQUcsQ0FBQyxDQUFFLENBQUM7U0FDckM7T0FDRixDQUFFLENBQUM7O0FBR0osZ0JBQVUsQ0FBQyxRQUFRLGlCQWxFckIsTUFBTSxFQWtFeUIsWUFBTTtBQUNqQyxZQUFJLE1BQUssV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLE1BQUssR0FBRyxHQUFHLE1BQUssV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRztBQUN0RSxnQkFBSyxJQUFJLENBQUUsTUFBSyxHQUFHLEVBQUUsTUFBSyxHQUFHLEdBQUcsQ0FBQyxDQUFFLENBQUM7U0FDckM7T0FDRixDQUFFLENBQUM7S0FFTDs7aUJBakVHLFlBQVk7O2FBbUVaLGNBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRzs7O0FBQ2YsWUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFLO0FBQ3hDLGNBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNuQyxjQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFFLFVBQUEsQ0FBQzttQkFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUk7V0FBQSxDQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDckUsY0FBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBRSxVQUFBLENBQUM7bUJBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFO1dBQUEsQ0FBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2pFLGNBQUksU0FBUyxJQUFJLE9BQU8sSUFBSSxTQUFTLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUc7QUFDOUQsbUJBQUssVUFBVSxDQUFDLFFBQVEsQ0FDdEIsb0JBbkZSLFlBQVksRUFtRlMsRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FDaEQsQ0FBQztXQUNIO1NBQ0YsQ0FBRSxDQUFDO0FBQ0osWUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7T0FDZjs7O1dBL0VHLFlBQVk7OzttQkFtRkgsWUFBWSIsImZpbGUiOiJoaXN0b3J5LXN0b3JlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY29yZCwgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHsgQ2hlY2twb2ludCB9IGZyb20gJy4uL21vZGVsJztcblxuaW1wb3J0IHtcbiAgQ3JlYXRlQ2hlY2twb2ludCxcbiAgU2F2ZVN0YXRlLFxuICBSZXN0b3JlU3RhdGUsXG4gIFVpVW5kbyxcbiAgVWlSZWRvXG59IGZyb20gJy4uL2FjdGlvbnMvaGlzdG9yeSc7XG5cblxuY29uc3QgTG9nRW50cnkgPSBSZWNvcmQoeyBhdDogbnVsbCwgc3RhdGU6IG51bGwgfSwgJ0xvZ0VudHJ5Jyk7XG5cblxuY2xhc3MgSGlzdG9yeVN0b3JlIHtcblxuICBjb25zdHJ1Y3RvciggZGlzcGF0Y2hlciApIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuXG4gICAgLy8gcG9pbnRzIHRvIHRoZSBjdXJyZW50IHN0YXRlLCBhbHdheXMgZXZlblxuICAgIHRoaXMubm93ID0gMDtcbiAgICAvLyBwb2ludGVycyBcImJldHdlZW5cIiBzdGF0ZXMsIGFsd2F5cyBvZGRcbiAgICB0aGlzLmNoZWNrcG9pbnRzID0gTGlzdCgpO1xuICAgIHRoaXMuc3RvcmVMb2dzID0gTWFwKCk7XG5cblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFNhdmVTdGF0ZSwgYWN0ID0+IHtcbiAgICAgIGlmKCAhdGhpcy5zdG9yZUxvZ3MuaGFzKCBhY3Quc3RvcmVJZCApICkge1xuICAgICAgICB0aGlzLnN0b3JlTG9ncyA9IHRoaXMuc3RvcmVMb2dzLnNldCggYWN0LnN0b3JlSWQsIExpc3QoKSApO1xuICAgICAgfVxuICAgICAgdGhpcy5zdG9yZUxvZ3MgPSB0aGlzLnN0b3JlTG9ncy51cGRhdGUoIGFjdC5zdG9yZUlkLCBsb2cgPT4ge1xuICAgICAgICBjb25zdCBsYXN0ID0gbG9nLmxhc3QoKTtcbiAgICAgICAgaWYoIGxhc3QgJiYgYWN0LnN0YXRlID09PSBsYXN0LnN0YXRlICkge1xuICAgICAgICAgIHJldHVybiBsb2c7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZnJvbnQgPSBsb2cucG9wKCk7XG4gICAgICAgIGNvbnN0IGRvUmVwbGFjZSA9IGxhc3QgJiYgKCBsYXN0LmF0ID09PSB0aGlzLm5vdyApO1xuICAgICAgICByZXR1cm4gKCBkb1JlcGxhY2UgPyBmcm9udCA6IGxvZyApLnB1c2goIExvZ0VudHJ5KHtcbiAgICAgICAgICBhdDogdGhpcy5ub3csXG4gICAgICAgICAgc3RhdGU6IGFjdC5zdGF0ZVxuICAgICAgICB9KSApO1xuICAgICAgfSApO1xuICAgIH0gKTtcblxuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggQ3JlYXRlQ2hlY2twb2ludCwgYWN0ID0+IHtcbiAgICAgIGNvbnN0IG5vdyA9IHRoaXMubm93O1xuXG4gICAgICAvLyBjdXQgb2ZmIHVuZG8nZWQgY2hlY2twb2ludHMgYW5kIHRoZWlyIHN0YXRlc1xuICAgICAgd2hpbGUoIHRoaXMuY2hlY2twb2ludHMuY291bnQoKSAmJiBub3cgPCB0aGlzLmNoZWNrcG9pbnRzLmxhc3QoKS5hdCApIHtcbiAgICAgICAgdGhpcy5jaGVja3BvaW50cyA9IHRoaXMuY2hlY2twb2ludHMucG9wKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0b3JlTG9ncy5mb3JFYWNoKCAoXywgc3RvcmVJZCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3JlTG9ncyA9IHRoaXMuc3RvcmVMb2dzLnVwZGF0ZSggc3RvcmVJZCwgbG9nID0+XG4gICAgICAgICAgbG9nLmZpbHRlciggZW50cnkgPT4gZW50cnkuYXQgPD0gbm93IClcbiAgICAgICAgKTtcbiAgICAgIH0gKTtcblxuICAgICAgdGhpcy5jaGVja3BvaW50cyA9IHRoaXMuY2hlY2twb2ludHMucHVzaCggQ2hlY2twb2ludCh7XG4gICAgICAgIGF0OiBub3cgKyAxLFxuICAgICAgICBiZWZvcmU6IGFjdC5iZWZvcmVcbiAgICAgIH0pICk7XG4gICAgICB0aGlzLm5vdyA9IG5vdyArIDI7XG4gICAgfSApO1xuXG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBVaVVuZG8sICgpID0+IHtcbiAgICAgIGlmKCB0aGlzLm5vdyA+IDAgKSB7XG4gICAgICAgIHRoaXMubW92ZSggdGhpcy5ub3csIHRoaXMubm93IC0gMiApO1xuICAgICAgfVxuICAgIH0gKTtcblxuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggVWlSZWRvLCAoKSA9PiB7XG4gICAgICBpZiggdGhpcy5jaGVja3BvaW50cy5jb3VudCgpICYmIHRoaXMubm93IDwgdGhpcy5jaGVja3BvaW50cy5sYXN0KCkuYXQgKSB7XG4gICAgICAgIHRoaXMubW92ZSggdGhpcy5ub3csIHRoaXMubm93ICsgMiApO1xuICAgICAgfVxuICAgIH0gKTtcblxuICB9XG5cbiAgbW92ZSggZnJvbSwgdG8gKSB7XG4gICAgdGhpcy5zdG9yZUxvZ3MuZm9yRWFjaCggKGxvZywgc3RvcmVJZCkgPT4ge1xuICAgICAgY29uc3QgbGF0ZXN0U3RhdGVzID0gbG9nLnJldmVyc2UoKTtcbiAgICAgIGNvbnN0IGZyb21FbnRyeSA9IGxhdGVzdFN0YXRlcy5za2lwV2hpbGUoIF8gPT4gXy5hdCA+IGZyb20gKS5maXJzdCgpO1xuICAgICAgY29uc3QgdG9FbnRyeSA9IGxhdGVzdFN0YXRlcy5za2lwV2hpbGUoIF8gPT4gXy5hdCA+IHRvICkuZmlyc3QoKTtcbiAgICAgIGlmKCBmcm9tRW50cnkgJiYgdG9FbnRyeSAmJiBmcm9tRW50cnkuc3RhdGUgIT09IHRvRW50cnkuc3RhdGUgKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaChcbiAgICAgICAgICBSZXN0b3JlU3RhdGUoeyBzdG9yZUlkLCBzdGF0ZTogdG9FbnRyeS5zdGF0ZSB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gKTtcbiAgICB0aGlzLm5vdyA9IHRvO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeVN0b3JlO1xuIl19