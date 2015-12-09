define(['exports', 'module', 'immutable', './history-model', './history-actions'], function (exports, module, _immutable, _historyModel, _historyActions) {'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}







  var LogEntry = (0, _immutable.Record)({ at: null, state: null }, 'LogEntry');var 


  HistoryStore = (function () {

    function HistoryStore(dispatcher) {var _this = this;_classCallCheck(this, HistoryStore);
      this.dispatcher = dispatcher;

      // points to the current state, always even
      this.now = 0;
      // pointers "between" states, always odd
      this.checkpoints = (0, _immutable.List)();
      this.storeLogs = (0, _immutable.Map)();


      dispatcher.register(_historyActions.SaveState, function (act) {
        if (!_this.storeLogs.has(act.storeId)) {
          _this.storeLogs = _this.storeLogs.set(act.storeId, (0, _immutable.List)());}

        _this.storeLogs = _this.storeLogs.update(act.storeId, function (log) {
          var last = log.last();
          if (last && act.state === last.state) {
            return log;}

          var front = log.pop();
          var doReplace = last && last.at === _this.now;
          return (doReplace ? front : log).push(LogEntry({ 
            at: _this.now, 
            state: act.state }));});});





      dispatcher.register(_historyActions.CreateCheckpoint, function (act) {
        var now = _this.now;

        // cut off undo'ed checkpoints and their states
        while (_this.checkpoints.count() && now < _this.checkpoints.last().at) {
          _this.checkpoints = _this.checkpoints.pop();}

        _this.storeLogs.forEach(function (_, storeId) {
          _this.storeLogs = _this.storeLogs.update(storeId, function (log) {return (
              log.filter(function (entry) {return entry.at <= now;}));});});



        _this.checkpoints = _this.checkpoints.push((0, _historyModel.Checkpoint)({ 
          at: now + 1, 
          before: act.before }));

        _this.now = now + 2;});



      dispatcher.register(_historyActions.UiUndo, function () {
        if (_this.now > 0) {
          _this.move(_this.now, _this.now - 2);}});



      dispatcher.register(_historyActions.UiRedo, function () {
        if (_this.checkpoints.count() && _this.now < _this.checkpoints.last().at) {
          _this.move(_this.now, _this.now + 2);}});}_createClass(HistoryStore, [{ key: 'move', value: 





      function move(from, to) {var _this2 = this;
        this.storeLogs.forEach(function (log, storeId) {
          var latestStates = log.reverse();
          var fromEntry = latestStates.skipWhile(function (_) {return _.at > from;}).first();
          var toEntry = latestStates.skipWhile(function (_) {return _.at > to;}).first();
          if (fromEntry && toEntry && fromEntry.state !== toEntry.state) {
            _this2.dispatcher.dispatch(
            (0, _historyActions.RestoreState)({ storeId: storeId, state: toEntry.state }));}});



        this.now = to;} }]);return HistoryStore;})();module.exports = 




  HistoryStore;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2hpc3RvcnkvaGlzdG9yeS1zdG9yZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFRQSxNQUFNLFFBQVEsR0FBRyxlQVJSLE1BQU0sRUFRUyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDOzs7QUFHekQsY0FBWTs7QUFFTCxhQUZQLFlBQVksQ0FFSCxVQUFVLEVBQUcsd0NBRnRCLFlBQVk7QUFHZCxVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7O0FBRzdCLFVBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztBQUViLFVBQUksQ0FBQyxXQUFXLEdBQUcsZUFuQk4sSUFBSSxHQW1CUSxDQUFDO0FBQzFCLFVBQUksQ0FBQyxTQUFTLEdBQUcsZUFwQkUsR0FBRyxHQW9CQSxDQUFDOzs7QUFHdkIsZ0JBQVUsQ0FBQyxRQUFRLGlCQW5CSCxTQUFTLEVBbUJPLFVBQUEsR0FBRyxFQUFJO0FBQ3JDLFlBQUksQ0FBQyxNQUFLLFNBQVMsQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBRSxFQUFHO0FBQ3ZDLGdCQUFLLFNBQVMsR0FBRyxNQUFLLFNBQVMsQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxlQXpCekMsSUFBSSxHQXlCMkMsQ0FBRSxDQUFDLENBQzVEOztBQUNELGNBQUssU0FBUyxHQUFHLE1BQUssU0FBUyxDQUFDLE1BQU0sQ0FBRSxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQUEsR0FBRyxFQUFJO0FBQzFELGNBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN4QixjQUFJLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUc7QUFDckMsbUJBQU8sR0FBRyxDQUFDLENBQ1o7O0FBQ0QsY0FBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdB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LEtBQUssRUFBRztBQUM5RCxtQkFBSyxVQUFVLENBQUMsUUFBUTtBQUN0QixnQ0FoRnFCLFlBQVksRUFnRnBCLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQ2hELENBQUMsQ0FDSCxDQUNGLENBQUUsQ0FBQzs7OztBQUNKLFlBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQ2YsWUE5RUcsWUFBWTs7Ozs7QUFrRkgsY0FBWSIsImZpbGUiOiJoaXN0b3J5LXN0b3JlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY29yZCwgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHsgQ2hlY2twb2ludCB9IGZyb20gJy4vaGlzdG9yeS1tb2RlbCc7XG5pbXBvcnQge1xuICBDcmVhdGVDaGVja3BvaW50LCBTYXZlU3RhdGUsIFJlc3RvcmVTdGF0ZSwgVWlVbmRvLCBVaVJlZG9cbn0gZnJvbSAnLi9oaXN0b3J5LWFjdGlvbnMnO1xuXG5cbmNvbnN0IExvZ0VudHJ5ID0gUmVjb3JkKHsgYXQ6IG51bGwsIHN0YXRlOiBudWxsIH0sICdMb2dFbnRyeScpO1xuXG5cbmNsYXNzIEhpc3RvcnlTdG9yZSB7XG5cbiAgY29uc3RydWN0b3IoIGRpc3BhdGNoZXIgKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcblxuICAgIC8vIHBvaW50cyB0byB0aGUgY3VycmVudCBzdGF0ZSwgYWx3YXlzIGV2ZW5cbiAgICB0aGlzLm5vdyA9IDA7XG4gICAgLy8gcG9pbnRlcnMgXCJiZXR3ZWVuXCIgc3RhdGVzLCBhbHdheXMgb2RkXG4gICAgdGhpcy5jaGVja3BvaW50cyA9IExpc3QoKTtcbiAgICB0aGlzLnN0b3JlTG9ncyA9IE1hcCgpO1xuXG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBTYXZlU3RhdGUsIGFjdCA9PiB7XG4gICAgICBpZiggIXRoaXMuc3RvcmVMb2dzLmhhcyggYWN0LnN0b3JlSWQgKSApIHtcbiAgICAgICAgdGhpcy5zdG9yZUxvZ3MgPSB0aGlzLnN0b3JlTG9ncy5zZXQoIGFjdC5zdG9yZUlkLCBMaXN0KCkgKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RvcmVMb2dzID0gdGhpcy5zdG9yZUxvZ3MudXBkYXRlKCBhY3Quc3RvcmVJZCwgbG9nID0+IHtcbiAgICAgICAgY29uc3QgbGFzdCA9IGxvZy5sYXN0KCk7XG4gICAgICAgIGlmKCBsYXN0ICYmIGFjdC5zdGF0ZSA9PT0gbGFzdC5zdGF0ZSApIHtcbiAgICAgICAgICByZXR1cm4gbG9nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZyb250ID0gbG9nLnBvcCgpO1xuICAgICAgICBjb25zdCBkb1JlcGxhY2UgPSBsYXN0ICYmICggbGFzdC5hdCA9PT0gdGhpcy5ub3cgKTtcbiAgICAgICAgcmV0dXJuICggZG9SZXBsYWNlID8gZnJvbnQgOiBsb2cgKS5wdXNoKCBMb2dFbnRyeSh7XG4gICAgICAgICAgYXQ6IHRoaXMubm93LFxuICAgICAgICAgIHN0YXRlOiBhY3Quc3RhdGVcbiAgICAgICAgfSkgKTtcbiAgICAgIH0gKTtcbiAgICB9ICk7XG5cblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIENyZWF0ZUNoZWNrcG9pbnQsIGFjdCA9PiB7XG4gICAgICBjb25zdCBub3cgPSB0aGlzLm5vdztcblxuICAgICAgLy8gY3V0IG9mZiB1bmRvJ2VkIGNoZWNrcG9pbnRzIGFuZCB0aGVpciBzdGF0ZXNcbiAgICAgIHdoaWxlKCB0aGlzLmNoZWNrcG9pbnRzLmNvdW50KCkgJiYgbm93IDwgdGhpcy5jaGVja3BvaW50cy5sYXN0KCkuYXQgKSB7XG4gICAgICAgIHRoaXMuY2hlY2twb2ludHMgPSB0aGlzLmNoZWNrcG9pbnRzLnBvcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdG9yZUxvZ3MuZm9yRWFjaCggKF8sIHN0b3JlSWQpID0+IHtcbiAgICAgICAgdGhpcy5zdG9yZUxvZ3MgPSB0aGlzLnN0b3JlTG9ncy51cGRhdGUoIHN0b3JlSWQsIGxvZyA9PlxuICAgICAgICAgIGxvZy5maWx0ZXIoIGVudHJ5ID0+IGVudHJ5LmF0IDw9IG5vdyApXG4gICAgICAgICk7XG4gICAgICB9ICk7XG5cbiAgICAgIHRoaXMuY2hlY2twb2ludHMgPSB0aGlzLmNoZWNrcG9pbnRzLnB1c2goIENoZWNrcG9pbnQoe1xuICAgICAgICBhdDogbm93ICsgMSxcbiAgICAgICAgYmVmb3JlOiBhY3QuYmVmb3JlXG4gICAgICB9KSApO1xuICAgICAgdGhpcy5ub3cgPSBub3cgKyAyO1xuICAgIH0gKTtcblxuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggVWlVbmRvLCAoKSA9PiB7XG4gICAgICBpZiggdGhpcy5ub3cgPiAwICkge1xuICAgICAgICB0aGlzLm1vdmUoIHRoaXMubm93LCB0aGlzLm5vdyAtIDIgKTtcbiAgICAgIH1cbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBVaVJlZG8sICgpID0+IHtcbiAgICAgIGlmKCB0aGlzLmNoZWNrcG9pbnRzLmNvdW50KCkgJiYgdGhpcy5ub3cgPCB0aGlzLmNoZWNrcG9pbnRzLmxhc3QoKS5hdCApIHtcbiAgICAgICAgdGhpcy5tb3ZlKCB0aGlzLm5vdywgdGhpcy5ub3cgKyAyICk7XG4gICAgICB9XG4gICAgfSApO1xuXG4gIH1cblxuICBtb3ZlKCBmcm9tLCB0byApIHtcbiAgICB0aGlzLnN0b3JlTG9ncy5mb3JFYWNoKCAobG9nLCBzdG9yZUlkKSA9PiB7XG4gICAgICBjb25zdCBsYXRlc3RTdGF0ZXMgPSBsb2cucmV2ZXJzZSgpO1xuICAgICAgY29uc3QgZnJvbUVudHJ5ID0gbGF0ZXN0U3RhdGVzLnNraXBXaGlsZSggXyA9PiBfLmF0ID4gZnJvbSApLmZpcnN0KCk7XG4gICAgICBjb25zdCB0b0VudHJ5ID0gbGF0ZXN0U3RhdGVzLnNraXBXaGlsZSggXyA9PiBfLmF0ID4gdG8gKS5maXJzdCgpO1xuICAgICAgaWYoIGZyb21FbnRyeSAmJiB0b0VudHJ5ICYmIGZyb21FbnRyeS5zdGF0ZSAhPT0gdG9FbnRyeS5zdGF0ZSApIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoKFxuICAgICAgICAgIFJlc3RvcmVTdGF0ZSh7IHN0b3JlSWQsIHN0YXRlOiB0b0VudHJ5LnN0YXRlIH0pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSApO1xuICAgIHRoaXMubm93ID0gdG87XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5U3RvcmU7XG4iXX0=