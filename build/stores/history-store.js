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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9zdG9yZXMvaGlzdG9yeS1zdG9yZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWFBLE1BQU0sUUFBUSxHQUFHLGVBYlIsTUFBTSxFQWFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7O01BR3pELFlBQVk7QUFFTCxhQUZQLFlBQVksQ0FFSCxVQUFVLEVBQUc7Ozs0QkFGdEIsWUFBWTs7QUFHZCxVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7O0FBRzdCLFVBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztBQUViLFVBQUksQ0FBQyxXQUFXLEdBQUcsZUF4Qk4sSUFBSSxHQXdCUSxDQUFDO0FBQzFCLFVBQUksQ0FBQyxTQUFTLEdBQUcsZUF6QkUsR0FBRyxHQXlCQSxDQUFDOztBQUd2QixnQkFBVSxDQUFDLFFBQVEsaUJBdEJyQixTQUFTLEVBc0J5QixVQUFBLEdBQUcsRUFBSTtBQUNyQyxZQUFJLENBQUMsTUFBSyxTQUFTLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUUsRUFBRztBQUN2QyxnQkFBSyxTQUFTLEdBQUcsTUFBSyxTQUFTLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsZUE5QnpDLElBQUksR0E4QjJDLENBQUUsQ0FBQztTQUM1RDtBQUNELGNBQUssU0FBUyxHQUFHLE1BQUssU0FBUyxDQUFDLE1BQU0sQ0FBRSxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQUEsR0FBRyxFQUFJO0FBQzFELGNBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN4QixjQUFJLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUc7QUFDckMsbUJBQU8sR0FBRyxDQUFDO1dBQ1o7QUFD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QUFLLEtBQUssT0FBTyxDQUFDLEtBQUssRUFBRztBQUM5RCxtQkFBSyxVQUFVLENBQUMsUUFBUSxDQUN0QixvQkFuRlIsWUFBWSxFQW1GUyxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUNoRCxDQUFDO1dBQ0g7U0FDRixDQUFFLENBQUM7QUFDSixZQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztPQUNmOzs7V0EvRUcsWUFBWTs7O21CQW1GSCxZQUFZIiwiZmlsZSI6Ii9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9zdG9yZXMvaGlzdG9yeS1zdG9yZS5qc3giLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVjb3JkLCBMaXN0LCBNYXAgfSBmcm9tICdpbW11dGFibGUnO1xuXG5pbXBvcnQgeyBDaGVja3BvaW50IH0gZnJvbSAnLi4vbW9kZWwnO1xuXG5pbXBvcnQge1xuICBDcmVhdGVDaGVja3BvaW50LFxuICBTYXZlU3RhdGUsXG4gIFJlc3RvcmVTdGF0ZSxcbiAgVWlVbmRvLFxuICBVaVJlZG9cbn0gZnJvbSAnLi4vYWN0aW9ucy9oaXN0b3J5JztcblxuXG5jb25zdCBMb2dFbnRyeSA9IFJlY29yZCh7IGF0OiBudWxsLCBzdGF0ZTogbnVsbCB9LCAnTG9nRW50cnknKTtcblxuXG5jbGFzcyBIaXN0b3J5U3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKCBkaXNwYXRjaGVyICkge1xuICAgIHRoaXMuZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XG5cbiAgICAvLyBwb2ludHMgdG8gdGhlIGN1cnJlbnQgc3RhdGUsIGFsd2F5cyBldmVuXG4gICAgdGhpcy5ub3cgPSAwO1xuICAgIC8vIHBvaW50ZXJzIFwiYmV0d2VlblwiIHN0YXRlcywgYWx3YXlzIG9kZFxuICAgIHRoaXMuY2hlY2twb2ludHMgPSBMaXN0KCk7XG4gICAgdGhpcy5zdG9yZUxvZ3MgPSBNYXAoKTtcblxuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggU2F2ZVN0YXRlLCBhY3QgPT4ge1xuICAgICAgaWYoICF0aGlzLnN0b3JlTG9ncy5oYXMoIGFjdC5zdG9yZUlkICkgKSB7XG4gICAgICAgIHRoaXMuc3RvcmVMb2dzID0gdGhpcy5zdG9yZUxvZ3Muc2V0KCBhY3Quc3RvcmVJZCwgTGlzdCgpICk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0b3JlTG9ncyA9IHRoaXMuc3RvcmVMb2dzLnVwZGF0ZSggYWN0LnN0b3JlSWQsIGxvZyA9PiB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSBsb2cubGFzdCgpO1xuICAgICAgICBpZiggbGFzdCAmJiBhY3Quc3RhdGUgPT09IGxhc3Quc3RhdGUgKSB7XG4gICAgICAgICAgcmV0dXJuIGxvZztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmcm9udCA9IGxvZy5wb3AoKTtcbiAgICAgICAgY29uc3QgZG9SZXBsYWNlID0gbGFzdCAmJiAoIGxhc3QuYXQgPT09IHRoaXMubm93ICk7XG4gICAgICAgIHJldHVybiAoIGRvUmVwbGFjZSA/IGZyb250IDogbG9nICkucHVzaCggTG9nRW50cnkoe1xuICAgICAgICAgIGF0OiB0aGlzLm5vdyxcbiAgICAgICAgICBzdGF0ZTogYWN0LnN0YXRlXG4gICAgICAgIH0pICk7XG4gICAgICB9ICk7XG4gICAgfSApO1xuXG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBDcmVhdGVDaGVja3BvaW50LCBhY3QgPT4ge1xuICAgICAgY29uc3Qgbm93ID0gdGhpcy5ub3c7XG5cbiAgICAgIC8vIGN1dCBvZmYgdW5kbydlZCBjaGVja3BvaW50cyBhbmQgdGhlaXIgc3RhdGVzXG4gICAgICB3aGlsZSggdGhpcy5jaGVja3BvaW50cy5jb3VudCgpICYmIG5vdyA8IHRoaXMuY2hlY2twb2ludHMubGFzdCgpLmF0ICkge1xuICAgICAgICB0aGlzLmNoZWNrcG9pbnRzID0gdGhpcy5jaGVja3BvaW50cy5wb3AoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RvcmVMb2dzLmZvckVhY2goIChfLCBzdG9yZUlkKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmVMb2dzID0gdGhpcy5zdG9yZUxvZ3MudXBkYXRlKCBzdG9yZUlkLCBsb2cgPT5cbiAgICAgICAgICBsb2cuZmlsdGVyKCBlbnRyeSA9PiBlbnRyeS5hdCA8PSBub3cgKVxuICAgICAgICApO1xuICAgICAgfSApO1xuXG4gICAgICB0aGlzLmNoZWNrcG9pbnRzID0gdGhpcy5jaGVja3BvaW50cy5wdXNoKCBDaGVja3BvaW50KHtcbiAgICAgICAgYXQ6IG5vdyArIDEsXG4gICAgICAgIGJlZm9yZTogYWN0LmJlZm9yZVxuICAgICAgfSkgKTtcbiAgICAgIHRoaXMubm93ID0gbm93ICsgMjtcbiAgICB9ICk7XG5cblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFVpVW5kbywgKCkgPT4ge1xuICAgICAgaWYoIHRoaXMubm93ID4gMCApIHtcbiAgICAgICAgdGhpcy5tb3ZlKCB0aGlzLm5vdywgdGhpcy5ub3cgLSAyICk7XG4gICAgICB9XG4gICAgfSApO1xuXG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBVaVJlZG8sICgpID0+IHtcbiAgICAgIGlmKCB0aGlzLmNoZWNrcG9pbnRzLmNvdW50KCkgJiYgdGhpcy5ub3cgPCB0aGlzLmNoZWNrcG9pbnRzLmxhc3QoKS5hdCApIHtcbiAgICAgICAgdGhpcy5tb3ZlKCB0aGlzLm5vdywgdGhpcy5ub3cgKyAyICk7XG4gICAgICB9XG4gICAgfSApO1xuXG4gIH1cblxuICBtb3ZlKCBmcm9tLCB0byApIHtcbiAgICB0aGlzLnN0b3JlTG9ncy5mb3JFYWNoKCAobG9nLCBzdG9yZUlkKSA9PiB7XG4gICAgICBjb25zdCBsYXRlc3RTdGF0ZXMgPSBsb2cucmV2ZXJzZSgpO1xuICAgICAgY29uc3QgZnJvbUVudHJ5ID0gbGF0ZXN0U3RhdGVzLnNraXBXaGlsZSggXyA9PiBfLmF0ID4gZnJvbSApLmZpcnN0KCk7XG4gICAgICBjb25zdCB0b0VudHJ5ID0gbGF0ZXN0U3RhdGVzLnNraXBXaGlsZSggXyA9PiBfLmF0ID4gdG8gKS5maXJzdCgpO1xuICAgICAgaWYoIGZyb21FbnRyeSAmJiB0b0VudHJ5ICYmIGZyb21FbnRyeS5zdGF0ZSAhPT0gdG9FbnRyeS5zdGF0ZSApIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoKFxuICAgICAgICAgIFJlc3RvcmVTdGF0ZSh7IHN0b3JlSWQsIHN0YXRlOiB0b0VudHJ5LnN0YXRlIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSApO1xuICAgIHRoaXMubm93ID0gdG87XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5U3RvcmU7XG4iXX0=