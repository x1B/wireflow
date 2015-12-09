define(['exports', 'module', 'immutable', '../util/metrics'], function (exports, module, _immutable, _utilMetrics) {'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}var _count = _interopRequireDefault(_utilMetrics);



  var now = function now() {return window.performance.now();};var 

  Dispatcher = (function () {

    function Dispatcher(onAfterDispatch, monitorEvents) {_classCallCheck(this, Dispatcher);
      this.queue = [];
      this.registry = (0, _immutable.Map)();
      this.dispatch = this.dispatch.bind(this);
      this.frameRequested = false;
      this.onAfterDispatch = onAfterDispatch;
      this.monitorEvents = (0, _immutable.List)();}_createClass(Dispatcher, [{ key: 'monitor', value: 


      function monitor(events) {
        this.monitorEvents = events;} }, { key: 'register', value: 


      function register(type, callback) {
        this.registry = this.registry.update(type, function (list) {return (
            list ? list.push(callback) : _immutable.List.of(callback));});} }, { key: 'dispatch', value: 


      function dispatch(event) {var _this = this;
        if (this.monitorEvents.indexOf(event.type()) !== -1) {
          window.console.log('ACT:' + event['_name'], '  data: ', event.toJS());}

        this.queue.push(event);

        var markA = now();
        var anyDispatched = this.processQueue();
        (0, _count['default'])({ what: 'dispatch', duration: now() - markA });

        if (anyDispatched && !this.frameRequested) {
          window.requestAnimationFrame(function () {
            _this.frameRequested = false;
            var markB = now();
            _this.onAfterDispatch();
            (0, _count['default'])({ what: 'render', duration: now() - markB });});

          this.frameRequested = true;}} }, { key: 'processQueue', value: 



      function processQueue() {
        var run = function run(event) {return function (cb) {return cb(event);};};
        var anyDispatched = false;
        while (this.queue.length) {
          var _event = this.queue.shift();
          var callbacks = this.registry.get(_event.type());
          if (callbacks) {
            callbacks.forEach(run(_event));
            anyDispatched = true;} else 

          {
            window.console.log(
            'Unhandled event: (type: %s): %o', 
            _event['_name'], 
            _event.toJS());}}



        return anyDispatched;} }]);return Dispatcher;})();module.exports = 




  Dispatcher;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mbHV4L2Rpc3BhdGNoZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxNQUFNLEdBQUcsR0FBRyxTQUFOLEdBQUcsV0FBUyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFBLENBQUM7O0FBRXJDLFlBQVU7O0FBRUgsYUFGUCxVQUFVLENBRUQsZUFBZSxFQUFFLGFBQWEsRUFBRyx1QkFGMUMsVUFBVTtBQUdaLFVBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFVBQUksQ0FBQyxRQUFRLEdBQUcsZUFWWCxHQUFHLEdBVWEsQ0FBQztBQUN0QixVQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFDO0FBQzNDLFVBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBQzVCLFVBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQ3ZDLFVBQUksQ0FBQyxhQUFhLEdBQUcsZUFkWCxJQUFJLEdBY2EsQ0FBQyxDQUM3QixhQVRHLFVBQVU7OztBQVdQLHVCQUFFLE1BQU0sRUFBRztBQUNoQixZQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUM3Qjs7O0FBRU8sd0JBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRztBQUN6QixZQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxVQUFBLElBQUk7QUFDOUMsZ0JBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFFLFFBQVEsQ0FBRSxHQUFHLFdBdkJ2QixJQUFJLENBdUJ3QixFQUFFLENBQUUsUUFBUSxDQUFFLEdBQUEsQ0FBRSxDQUFDLENBQ3hEOzs7QUFFTyx3QkFBRSxLQUFLLEVBQUc7QUFDaEIsWUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUUsS0FBSyxDQUFDLENBQUMsRUFBRztBQUN0RCxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUUsTUFBTSxHQUFHLEtBQUssQ0FBRSxPQUFPLENBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFFLENBQUMsQ0FDM0U7O0FBQ0QsWUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUUsS0FBSyxDQUFFLENBQUM7O0FBRXpCLFlBQU0sS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFlBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUMxQywrQkFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7O0FBRXJELFlBQUksYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRztBQUMxQyxnQkFBTSxDQUFDLHFCQUFxQixDQUFFLFlBQU07QUFDbEMsa0JBQUssY0FBYyxHQUFHLEtBQUssQ0FBQztBQUM1QixnQkFBTSxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDcEIsa0JBQUssZUFBZSxFQUFFLENBQUM7QUFDdkIsbUNBQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQ3BELENBQUUsQ0FBQzs7QUFDSixjQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxDQUM1QixDQUNGOzs7O0FBRVcsOEJBQUc7QUFDYixZQUFNLEdBQUcsR0FBRyxTQUFOLEdBQUcsQ0FBRyxLQUFLLFVBQUksVUFBQSxFQUFFLFVBQUksRUFBRSxDQUFFLEtBQUssQ0FBRSxFQUFBLEVBQUEsQ0FBQztBQUN2QyxZQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDMUIsZUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRztBQUN6QixjQUFNLE1BQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2pDLGNBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLE1BQUssQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFDO0FBQ3BELGNBQUksU0FBUyxFQUFHO0FBQ2QscUJBQVMsQ0FBQyxPQUFPLENBQUUsR0FBRyxDQUFFLE1BQUssQ0FBRSxDQUFFLENBQUM7QUFDbEMseUJBQWEsR0FBRyxJQUFJLENBQUMsQ0FDdEI7O0FBQ0k7QUFDSCxrQkFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHO0FBQ2hCLDZDQUFpQztBQUNqQyxrQkFBSyxDQUFFLE9BQU8sQ0FBRTtBQUNoQixrQkFBSyxDQUFDLElBQUksRUFBRSxDQUNiLENBQUMsQ0FDSCxDQUNGOzs7O0FBQ0QsZUFBTyxhQUFhLENBQUMsQ0FDdEIsWUE1REcsVUFBVTs7Ozs7QUFnRUQsWUFBVSIsImZpbGUiOiJkaXNwYXRjaGVyLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgY291bnQgZnJvbSAnLi4vdXRpbC9tZXRyaWNzJztcblxuXG5jb25zdCBub3cgPSAoKSA9PiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cbmNsYXNzIERpc3BhdGNoZXIge1xuXG4gIGNvbnN0cnVjdG9yKCBvbkFmdGVyRGlzcGF0Y2gsIG1vbml0b3JFdmVudHMgKSB7XG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIHRoaXMucmVnaXN0cnkgPSBNYXAoKTtcbiAgICB0aGlzLmRpc3BhdGNoID0gdGhpcy5kaXNwYXRjaC5iaW5kKCB0aGlzICk7XG4gICAgdGhpcy5mcmFtZVJlcXVlc3RlZCA9IGZhbHNlO1xuICAgIHRoaXMub25BZnRlckRpc3BhdGNoID0gb25BZnRlckRpc3BhdGNoO1xuICAgIHRoaXMubW9uaXRvckV2ZW50cyA9IExpc3QoKTtcbiAgfVxuXG4gIG1vbml0b3IoIGV2ZW50cyApIHtcbiAgICB0aGlzLm1vbml0b3JFdmVudHMgPSBldmVudHM7XG4gIH1cblxuICByZWdpc3RlciggdHlwZSwgY2FsbGJhY2sgKSB7XG4gICAgdGhpcy5yZWdpc3RyeSA9IHRoaXMucmVnaXN0cnkudXBkYXRlKCB0eXBlLCBsaXN0ID0+XG4gICAgICBsaXN0ID8gbGlzdC5wdXNoKCBjYWxsYmFjayApIDogTGlzdC5vZiggY2FsbGJhY2sgKSApO1xuICB9XG5cbiAgZGlzcGF0Y2goIGV2ZW50ICkge1xuICAgIGlmKCB0aGlzLm1vbml0b3JFdmVudHMuaW5kZXhPZiggZXZlbnQudHlwZSgpICkgIT09IC0xICkge1xuICAgICAgd2luZG93LmNvbnNvbGUubG9nKCAnQUNUOicgKyBldmVudFsgJ19uYW1lJyBdLCAnICBkYXRhOiAnLCBldmVudC50b0pTKCkgKTtcbiAgICB9XG4gICAgdGhpcy5xdWV1ZS5wdXNoKCBldmVudCApO1xuXG4gICAgY29uc3QgbWFya0EgPSBub3coKTtcbiAgICBjb25zdCBhbnlEaXNwYXRjaGVkID0gdGhpcy5wcm9jZXNzUXVldWUoKTtcbiAgICBjb3VudCh7IHdoYXQ6ICdkaXNwYXRjaCcsIGR1cmF0aW9uOiBub3coKSAtIG1hcmtBIH0pO1xuXG4gICAgaWYoIGFueURpc3BhdGNoZWQgJiYgIXRoaXMuZnJhbWVSZXF1ZXN0ZWQgKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZnJhbWVSZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbWFya0IgPSBub3coKTtcbiAgICAgICAgdGhpcy5vbkFmdGVyRGlzcGF0Y2goKTtcbiAgICAgICAgY291bnQoeyB3aGF0OiAncmVuZGVyJywgZHVyYXRpb246IG5vdygpIC0gbWFya0IgfSk7XG4gICAgICB9ICk7XG4gICAgICB0aGlzLmZyYW1lUmVxdWVzdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzUXVldWUoKSB7XG4gICAgY29uc3QgcnVuID0gZXZlbnQgPT4gY2IgPT4gY2IoIGV2ZW50ICk7XG4gICAgdmFyIGFueURpc3BhdGNoZWQgPSBmYWxzZTtcbiAgICB3aGlsZSggdGhpcy5xdWV1ZS5sZW5ndGggKSB7XG4gICAgICBjb25zdCBldmVudCA9IHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMucmVnaXN0cnkuZ2V0KCBldmVudC50eXBlKCkgKTtcbiAgICAgIGlmKCBjYWxsYmFja3MgKSB7XG4gICAgICAgIGNhbGxiYWNrcy5mb3JFYWNoKCBydW4oIGV2ZW50ICkgKTtcbiAgICAgICAgYW55RGlzcGF0Y2hlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKFxuICAgICAgICAgICdVbmhhbmRsZWQgZXZlbnQ6ICh0eXBlOiAlcyk6ICVvJyxcbiAgICAgICAgICBldmVudFsgJ19uYW1lJyBdLFxuICAgICAgICAgIGV2ZW50LnRvSlMoKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYW55RGlzcGF0Y2hlZDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERpc3BhdGNoZXI7XG4iXX0=