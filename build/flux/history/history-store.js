define(['exports', 'module', 'immutable', './history-model', './history-actions'], function (exports, module, _immutable, _historyModel, _historyActions) {
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

      dispatcher.register(_historyActions.SaveState, function (act) {
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

      dispatcher.register(_historyActions.CreateCheckpoint, function (act) {
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

        _this.checkpoints = _this.checkpoints.push((0, _historyModel.Checkpoint)({
          at: now + 1,
          before: act.before
        }));
        _this.now = now + 2;
      });

      dispatcher.register(_historyActions.UiUndo, function () {
        if (_this.now > 0) {
          _this.move(_this.now, _this.now - 2);
        }
      });

      dispatcher.register(_historyActions.UiRedo, function () {
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
            _this2.dispatcher.dispatch((0, _historyActions.RestoreState)({ storeId: storeId, state: toEntry.state }));
          }
        });
        this.now = to;
      }
    }]);

    return HistoryStore;
  })();

  module.exports = HistoryStore;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2hpc3RvcnkvaGlzdG9yeS1zdG9yZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVFBLE1BQU0sUUFBUSxHQUFHLGVBUlIsTUFBTSxFQVFTLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7O01BR3pELFlBQVk7QUFFTCxhQUZQLFlBQVksQ0FFSCxVQUFVLEVBQUc7Ozs0QkFGdEIsWUFBWTs7QUFHZCxVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7O0FBRzdCLFVBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztBQUViLFVBQUksQ0FBQyxXQUFXLEdBQUcsZUFuQk4sSUFBSSxHQW1CUSxDQUFDO0FBQzFCLFVBQUksQ0FBQyxTQUFTLEdBQUcsZUFwQkUsR0FBRyxHQW9CQSxDQUFDOztBQUd2QixnQkFBVSxDQUFDLFFBQVEsaUJBbkJILFNBQVMsRUFtQk8sVUFBQSxHQUFHLEVBQUk7QUFDckMsWUFBSSxDQUFDLE1BQUssU0FBUyxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUMsT0FBTyxDQUFFLEVBQUc7QUFDdkMsZ0JBQUssU0FBUyxHQUFHLE1BQUssU0FBUyxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUMsT0FBTyxFQUFFLGVBekJ6QyxJQUFJLEdBeUIyQyxDQUFFLENBQUM7U0FDNUQ7QUFDRCxjQUFLLFNBQVMsR0FBRyxNQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxVQUFBLEdBQUcsRUFBSTtBQUMxRCxjQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDeEIsY0FBSSxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFHO0FBQ3JDLG1CQUFPLEdBQUcsQ0FBQztXQUNaO0FBQ0QsY0FBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLGNBQU0sU0FBUyxHQUFHLElBQUksSUFBTSxJQUFJLENBQUMsRUFBRSxLQUFLLE1BQUssR0FBRyxDQUFHO0FBQ25ELGlCQUFPLENBQUUsU0FBUyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUEsQ0FBRyxJQUFJLENBQUUsUUFBUSxDQUFDO0FBQ2hELGNBQUUsRUFBRSxNQUFLLEdBQUc7QUFDWixpQkFBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1dBQ2pCLENBQUMsQ0FBRSxDQUFDO1NBQ04sQ0FBRSxDQUFDO09BQ0wsQ0FBRSxDQUFDOztBQUdKLGdCQUFVLENBQUMsUUFBUSxpQkF0Q3JCLGdCQUFnQixFQXNDeUIsVUFBQSxHQUFHLEVBQUk7QUFDNUMsWUFBTSxHQUFHLEdBQUcsTUFBSyxHQUFHLENBQUM7OztBQUdyQixlQUFPLE1BQUssV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLEdBQUcsR0FBRyxNQUFLLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUc7QUFDcEUsZ0JBQUssV0FBVyxHQUFHLE1BQUssV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzNDO0FBQ0QsY0FBSyxTQUFTLENBQUMsT0FBTyxDQUFFLFVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBSztBQUN0QyxnQkFBSyxTQUFTLEdBQUcsTUFBSyxTQUFTLENBQUMsTUFBTSxDQUFFLE9BQU8sRUFBRSxVQUFBLEdBQUc7bUJBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUUsVUFBQSxLQUFLO3FCQUFJLEtBQUssQ0FBQyxFQUFFLElBQUksR0FBRzthQUFBLENBQUU7V0FBQSxDQUN2QyxDQUFDO1NBQ0gsQ0FBRSxDQUFDOztBQUVKLGNBQUssV0FBVyxHQUFHLE1BQUssV0FBVyxDQUFDLElBQUksQ0FBRSxrQkFyRHZDLFVBQVUsRUFxRHdDO0FBQ25ELFlBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQztBQUNYLGdCQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07U0FDbkIsQ0FBQyxDQUFFLENBQUM7QUFDTCxjQUFLLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO09BQ3BCLENBQUUsQ0FBQzs7QUFHSixnQkFBVSxDQUFDLFFBQVEsaUJBM0RzQixNQUFNLEVBMkRsQixZQUFNO0FBQ2pDLFlBQUksTUFBSyxHQUFHLEdBQUcsQ0FBQyxFQUFHO0FBQ2pCLGdCQUFLLElBQUksQ0FBRSxNQUFLLEdBQUcsRUFBRSxNQUFLLEdBQUcsR0FBRyxDQUFDLENBQUUsQ0FBQztTQUNyQztPQUNGLENBQUUsQ0FBQzs7QUFFSixnQkFBVSxDQUFDLFFBQVEsaUJBakU4QixNQUFNLEVBaUUxQixZQUFNO0FBQ2pDLFlBQUksTUFBSyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksTUFBSyxHQUFHLEdBQUcsTUFBSyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFHO0FBQ3RFLGdCQUFLLElBQUksQ0FBRSxNQUFLLEdBQUcsRUFBRSxNQUFLLEdBQUcsR0FBRyxDQUFDLENBQUUsQ0FBQztTQUNyQztPQUNGLENBQUUsQ0FBQztLQUVMOztpQkFoRUcsWUFBWTs7YUFrRVosY0FBRSxJQUFJLEVBQUUsRUFBRSxFQUFHOzs7QUFDZixZQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUs7QUFDeEMsY0FBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ25DLGNBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUUsVUFBQSxDQUFDO21CQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSTtXQUFBLENBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyRSxjQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFFLFVBQUEsQ0FBQzttQkFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUU7V0FBQSxDQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDakUsY0FBSSxTQUFTLElBQUksT0FBTyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLEtBQUssRUFBRztBQUM5RCxtQkFBSyxVQUFVLENBQUMsUUFBUSxDQUN0QixvQkFoRnFCLFlBQVksRUFnRnBCLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQ2hELENBQUM7V0FDSDtTQUNGLENBQUUsQ0FBQztBQUNKLFlBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO09BQ2Y7OztXQTlFRyxZQUFZOzs7bUJBa0ZILFlBQVkiLCJmaWxlIjoiaGlzdG9yeS1zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWNvcmQsIExpc3QsIE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCB7IENoZWNrcG9pbnQgfSBmcm9tICcuL2hpc3RvcnktbW9kZWwnO1xuaW1wb3J0IHtcbiAgQ3JlYXRlQ2hlY2twb2ludCwgU2F2ZVN0YXRlLCBSZXN0b3JlU3RhdGUsIFVpVW5kbywgVWlSZWRvXG59IGZyb20gJy4vaGlzdG9yeS1hY3Rpb25zJztcblxuXG5jb25zdCBMb2dFbnRyeSA9IFJlY29yZCh7IGF0OiBudWxsLCBzdGF0ZTogbnVsbCB9LCAnTG9nRW50cnknKTtcblxuXG5jbGFzcyBIaXN0b3J5U3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKCBkaXNwYXRjaGVyICkge1xuICAgIHRoaXMuZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XG5cbiAgICAvLyBwb2ludHMgdG8gdGhlIGN1cnJlbnQgc3RhdGUsIGFsd2F5cyBldmVuXG4gICAgdGhpcy5ub3cgPSAwO1xuICAgIC8vIHBvaW50ZXJzIFwiYmV0d2VlblwiIHN0YXRlcywgYWx3YXlzIG9kZFxuICAgIHRoaXMuY2hlY2twb2ludHMgPSBMaXN0KCk7XG4gICAgdGhpcy5zdG9yZUxvZ3MgPSBNYXAoKTtcblxuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggU2F2ZVN0YXRlLCBhY3QgPT4ge1xuICAgICAgaWYoICF0aGlzLnN0b3JlTG9ncy5oYXMoIGFjdC5zdG9yZUlkICkgKSB7XG4gICAgICAgIHRoaXMuc3RvcmVMb2dzID0gdGhpcy5zdG9yZUxvZ3Muc2V0KCBhY3Quc3RvcmVJZCwgTGlzdCgpICk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0b3JlTG9ncyA9IHRoaXMuc3RvcmVMb2dzLnVwZGF0ZSggYWN0LnN0b3JlSWQsIGxvZyA9PiB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSBsb2cubGFzdCgpO1xuICAgICAgICBpZiggbGFzdCAmJiBhY3Quc3RhdGUgPT09IGxhc3Quc3RhdGUgKSB7XG4gICAgICAgICAgcmV0dXJuIGxvZztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmcm9udCA9IGxvZy5wb3AoKTtcbiAgICAgICAgY29uc3QgZG9SZXBsYWNlID0gbGFzdCAmJiAoIGxhc3QuYXQgPT09IHRoaXMubm93ICk7XG4gICAgICAgIHJldHVybiAoIGRvUmVwbGFjZSA/IGZyb250IDogbG9nICkucHVzaCggTG9nRW50cnkoe1xuICAgICAgICAgIGF0OiB0aGlzLm5vdyxcbiAgICAgICAgICBzdGF0ZTogYWN0LnN0YXRlXG4gICAgICAgIH0pICk7XG4gICAgICB9ICk7XG4gICAgfSApO1xuXG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBDcmVhdGVDaGVja3BvaW50LCBhY3QgPT4ge1xuICAgICAgY29uc3Qgbm93ID0gdGhpcy5ub3c7XG5cbiAgICAgIC8vIGN1dCBvZmYgdW5kbydlZCBjaGVja3BvaW50cyBhbmQgdGhlaXIgc3RhdGVzXG4gICAgICB3aGlsZSggdGhpcy5jaGVja3BvaW50cy5jb3VudCgpICYmIG5vdyA8IHRoaXMuY2hlY2twb2ludHMubGFzdCgpLmF0ICkge1xuICAgICAgICB0aGlzLmNoZWNrcG9pbnRzID0gdGhpcy5jaGVja3BvaW50cy5wb3AoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RvcmVMb2dzLmZvckVhY2goIChfLCBzdG9yZUlkKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmVMb2dzID0gdGhpcy5zdG9yZUxvZ3MudXBkYXRlKCBzdG9yZUlkLCBsb2cgPT5cbiAgICAgICAgICBsb2cuZmlsdGVyKCBlbnRyeSA9PiBlbnRyeS5hdCA8PSBub3cgKVxuICAgICAgICApO1xuICAgICAgfSApO1xuXG4gICAgICB0aGlzLmNoZWNrcG9pbnRzID0gdGhpcy5jaGVja3BvaW50cy5wdXNoKCBDaGVja3BvaW50KHtcbiAgICAgICAgYXQ6IG5vdyArIDEsXG4gICAgICAgIGJlZm9yZTogYWN0LmJlZm9yZVxuICAgICAgfSkgKTtcbiAgICAgIHRoaXMubm93ID0gbm93ICsgMjtcbiAgICB9ICk7XG5cblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFVpVW5kbywgKCkgPT4ge1xuICAgICAgaWYoIHRoaXMubm93ID4gMCApIHtcbiAgICAgICAgdGhpcy5tb3ZlKCB0aGlzLm5vdywgdGhpcy5ub3cgLSAyICk7XG4gICAgICB9XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggVWlSZWRvLCAoKSA9PiB7XG4gICAgICBpZiggdGhpcy5jaGVja3BvaW50cy5jb3VudCgpICYmIHRoaXMubm93IDwgdGhpcy5jaGVja3BvaW50cy5sYXN0KCkuYXQgKSB7XG4gICAgICAgIHRoaXMubW92ZSggdGhpcy5ub3csIHRoaXMubm93ICsgMiApO1xuICAgICAgfVxuICAgIH0gKTtcblxuICB9XG5cbiAgbW92ZSggZnJvbSwgdG8gKSB7XG4gICAgdGhpcy5zdG9yZUxvZ3MuZm9yRWFjaCggKGxvZywgc3RvcmVJZCkgPT4ge1xuICAgICAgY29uc3QgbGF0ZXN0U3RhdGVzID0gbG9nLnJldmVyc2UoKTtcbiAgICAgIGNvbnN0IGZyb21FbnRyeSA9IGxhdGVzdFN0YXRlcy5za2lwV2hpbGUoIF8gPT4gXy5hdCA+IGZyb20gKS5maXJzdCgpO1xuICAgICAgY29uc3QgdG9FbnRyeSA9IGxhdGVzdFN0YXRlcy5za2lwV2hpbGUoIF8gPT4gXy5hdCA+IHRvICkuZmlyc3QoKTtcbiAgICAgIGlmKCBmcm9tRW50cnkgJiYgdG9FbnRyeSAmJiBmcm9tRW50cnkuc3RhdGUgIT09IHRvRW50cnkuc3RhdGUgKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlci5kaXNwYXRjaChcbiAgICAgICAgICBSZXN0b3JlU3RhdGUoeyBzdG9yZUlkLCBzdGF0ZTogdG9FbnRyeS5zdGF0ZSB9KVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gKTtcbiAgICB0aGlzLm5vdyA9IHRvO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeVN0b3JlO1xuIl19