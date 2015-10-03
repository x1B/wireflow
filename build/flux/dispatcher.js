define(['exports', 'module', 'immutable', '../util/metrics'], function (exports, module, _immutable, _utilMetrics) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var _count = _interopRequireDefault(_utilMetrics);

  var now = function now() {
    return window.performance.now();
  };

  var Dispatcher = (function () {
    function Dispatcher(onAfterDispatch, monitorEvents) {
      _classCallCheck(this, Dispatcher);

      this.queue = [];
      this.registry = (0, _immutable.Map)();
      this.dispatch = this.dispatch.bind(this);
      this.frameRequested = false;
      this.onAfterDispatch = onAfterDispatch;
      this.monitorEvents = (0, _immutable.List)();
    }

    _createClass(Dispatcher, [{
      key: 'monitor',
      value: function monitor(events) {
        this.monitorEvents = events;
      }
    }, {
      key: 'register',
      value: function register(type, callback) {
        this.registry = this.registry.update(type, function (list) {
          return list ? list.push(callback) : _immutable.List.of(callback);
        });
      }
    }, {
      key: 'dispatch',
      value: function dispatch(event) {
        var _this = this;

        if (this.monitorEvents.indexOf(event.type()) !== -1) {
          window.console.log('ACT:' + event['_name'], '  data: ', event.toJS());
        }
        this.queue.push(event);

        var markA = now();
        var anyDispatched = this.processQueue();
        (0, _count['default'])({ what: 'dispatch', duration: now() - markA });

        if (anyDispatched && !this.frameRequested) {
          window.requestAnimationFrame(function () {
            _this.frameRequested = false;
            var markB = window.performance.now();
            _this.onAfterDispatch();
            (0, _count['default'])({ what: 'render', duration: now() - markB });
          });
          this.frameRequested = true;
        }
      }
    }, {
      key: 'processQueue',
      value: function processQueue() {
        var run = function run(event) {
          return function (cb) {
            return cb(event);
          };
        };
        var anyDispatched = false;
        while (this.queue.length) {
          var _event = this.queue.shift();
          var callbacks = this.registry.get(_event.type());
          if (callbacks) {
            callbacks.forEach(run(_event));
            anyDispatched = true;
          } else {
            window.console.log('Unhandled event: (type: %s): %o', _event['_name'], _event.toJS());
          }
        }
        return anyDispatched;
      }
    }]);

    return Dispatcher;
  })();

  module.exports = Dispatcher;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mbHV4L2Rpc3BhdGNoZXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUEsTUFBTSxHQUFHLEdBQUcsU0FBTixHQUFHO1dBQVMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7R0FBQSxDQUFDOztNQUVyQyxVQUFVO0FBRUgsYUFGUCxVQUFVLENBRUQsZUFBZSxFQUFFLGFBQWEsRUFBRzs0QkFGMUMsVUFBVTs7QUFHWixVQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNoQixVQUFJLENBQUMsUUFBUSxHQUFHLGVBVlgsR0FBRyxHQVVhLENBQUM7QUFDdEIsVUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUUsQ0FBQztBQUMzQyxVQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztBQUM1QixVQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUN2QyxVQUFJLENBQUMsYUFBYSxHQUFHLGVBZFgsSUFBSSxHQWNhLENBQUM7S0FDN0I7O2lCQVRHLFVBQVU7O2FBV1AsaUJBQUUsTUFBTSxFQUFHO0FBQ2hCLFlBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO09BQzdCOzs7YUFFTyxrQkFBRSxJQUFJLEVBQUUsUUFBUSxFQUFHO0FBQ3pCLFlBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUUsSUFBSSxFQUFFLFVBQUEsSUFBSTtpQkFDOUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUUsUUFBUSxDQUFFLEdBQUcsV0F2QnZCLElBQUksQ0F1QndCLEVBQUUsQ0FBRSxRQUFRLENBQUU7U0FBQSxDQUFFLENBQUM7T0FDeEQ7OzthQUVPLGtCQUFFLEtBQUssRUFBRzs7O0FBQ2hCLFlBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUc7QUFDdEQsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFFLE1BQU0sR0FBRyxLQUFLLENBQUUsT0FBTyxDQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFDO1NBQzNFO0FBQ0QsWUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUUsS0FBSyxDQUFFLENBQUM7O0FBRXpCLFlBQU0sS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFlBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUMxQywrQkFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7O0FBRXJELFlBQUksYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRztBQUMxQyxnQkFBTSxDQUFDLHFCQUFxQixDQUFFLFlBQU07QUFDbEMsa0JBQUssY0FBYyxHQUFHLEtBQUssQ0FBQztBQUM1QixnQkFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN2QyxrQkFBSyxlQUFlLEVBQUUsQ0FBQztBQUN2QixtQ0FBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7V0FDcEQsQ0FBRSxDQUFDO0FBQ0osY0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDNUI7T0FDRjs7O2FBRVcsd0JBQUc7QUFDYixZQUFNLEdBQUcsR0FBRyxTQUFOLEdBQUcsQ0FBRyxLQUFLO2lCQUFJLFVBQUEsRUFBRTttQkFBSSxFQUFFLENBQUUsS0FBSyxDQUFFO1dBQUE7U0FBQSxDQUFDO0FBQ3ZDLFlBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztBQUMxQixlQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFHO0FBQ3pCLGNBQU0sTUFBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDakMsY0FBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUUsTUFBSyxDQUFDLElBQUksRUFBRSxDQUFFLENBQUM7QUFDcEQsY0FBSSxTQUFTLEVBQUc7QUFDZCxxQkFBUyxDQUFDLE9BQU8sQ0FBRSxHQUFHLENBQUUsTUFBSyxDQUFFLENBQUUsQ0FBQztBQUNsQyx5QkFBYSxHQUFHLElBQUksQ0FBQztXQUN0QixNQUNJO0FBQ0gsa0JBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNoQixpQ0FBaUMsRUFDakMsTUFBSyxDQUFFLE9BQU8sQ0FBRSxFQUNoQixNQUFLLENBQUMsSUFBSSxFQUFFLENBQ2IsQ0FBQztXQUNIO1NBQ0Y7QUFDRCxlQUFPLGFBQWEsQ0FBQztPQUN0Qjs7O1dBNURHLFVBQVU7OzttQkFnRUQsVUFBVSIsImZpbGUiOiJkaXNwYXRjaGVyLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1hcCwgTGlzdCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgY291bnQgZnJvbSAnLi4vdXRpbC9tZXRyaWNzJztcblxuXG5jb25zdCBub3cgPSAoKSA9PiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG5cbmNsYXNzIERpc3BhdGNoZXIge1xuXG4gIGNvbnN0cnVjdG9yKCBvbkFmdGVyRGlzcGF0Y2gsIG1vbml0b3JFdmVudHMgKSB7XG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIHRoaXMucmVnaXN0cnkgPSBNYXAoKTtcbiAgICB0aGlzLmRpc3BhdGNoID0gdGhpcy5kaXNwYXRjaC5iaW5kKCB0aGlzICk7XG4gICAgdGhpcy5mcmFtZVJlcXVlc3RlZCA9IGZhbHNlO1xuICAgIHRoaXMub25BZnRlckRpc3BhdGNoID0gb25BZnRlckRpc3BhdGNoO1xuICAgIHRoaXMubW9uaXRvckV2ZW50cyA9IExpc3QoKTtcbiAgfVxuXG4gIG1vbml0b3IoIGV2ZW50cyApIHtcbiAgICB0aGlzLm1vbml0b3JFdmVudHMgPSBldmVudHM7XG4gIH1cblxuICByZWdpc3RlciggdHlwZSwgY2FsbGJhY2sgKSB7XG4gICAgdGhpcy5yZWdpc3RyeSA9IHRoaXMucmVnaXN0cnkudXBkYXRlKCB0eXBlLCBsaXN0ID0+XG4gICAgICBsaXN0ID8gbGlzdC5wdXNoKCBjYWxsYmFjayApIDogTGlzdC5vZiggY2FsbGJhY2sgKSApO1xuICB9XG5cbiAgZGlzcGF0Y2goIGV2ZW50ICkge1xuICAgIGlmKCB0aGlzLm1vbml0b3JFdmVudHMuaW5kZXhPZiggZXZlbnQudHlwZSgpICkgIT09IC0xICkge1xuICAgICAgd2luZG93LmNvbnNvbGUubG9nKCAnQUNUOicgKyBldmVudFsgJ19uYW1lJyBdLCAnICBkYXRhOiAnLCBldmVudC50b0pTKCkgKTtcbiAgICB9XG4gICAgdGhpcy5xdWV1ZS5wdXNoKCBldmVudCApO1xuXG4gICAgY29uc3QgbWFya0EgPSBub3coKTtcbiAgICBjb25zdCBhbnlEaXNwYXRjaGVkID0gdGhpcy5wcm9jZXNzUXVldWUoKTtcbiAgICBjb3VudCh7IHdoYXQ6ICdkaXNwYXRjaCcsIGR1cmF0aW9uOiBub3coKSAtIG1hcmtBIH0pO1xuXG4gICAgaWYoIGFueURpc3BhdGNoZWQgJiYgIXRoaXMuZnJhbWVSZXF1ZXN0ZWQgKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZnJhbWVSZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbWFya0IgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIHRoaXMub25BZnRlckRpc3BhdGNoKCk7XG4gICAgICAgIGNvdW50KHsgd2hhdDogJ3JlbmRlcicsIGR1cmF0aW9uOiBub3coKSAtIG1hcmtCIH0pO1xuICAgICAgfSApO1xuICAgICAgdGhpcy5mcmFtZVJlcXVlc3RlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcHJvY2Vzc1F1ZXVlKCkge1xuICAgIGNvbnN0IHJ1biA9IGV2ZW50ID0+IGNiID0+IGNiKCBldmVudCApO1xuICAgIHZhciBhbnlEaXNwYXRjaGVkID0gZmFsc2U7XG4gICAgd2hpbGUoIHRoaXMucXVldWUubGVuZ3RoICkge1xuICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG4gICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLnJlZ2lzdHJ5LmdldCggZXZlbnQudHlwZSgpICk7XG4gICAgICBpZiggY2FsbGJhY2tzICkge1xuICAgICAgICBjYWxsYmFja3MuZm9yRWFjaCggcnVuKCBldmVudCApICk7XG4gICAgICAgIGFueURpc3BhdGNoZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhcbiAgICAgICAgICAnVW5oYW5kbGVkIGV2ZW50OiAodHlwZTogJXMpOiAlbycsXG4gICAgICAgICAgZXZlbnRbICdfbmFtZScgXSxcbiAgICAgICAgICBldmVudC50b0pTKClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFueURpc3BhdGNoZWQ7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXNwYXRjaGVyO1xuIl19