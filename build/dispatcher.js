define(['exports', 'module', 'immutable', './util/metrics'], function (exports, module, _immutable, _utilMetrics) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaXNwYXRjaGVyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLE1BQU0sR0FBRyxHQUFHLFNBQU4sR0FBRztXQUFTLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO0dBQUEsQ0FBQzs7TUFFckMsVUFBVTtBQUVILGFBRlAsVUFBVSxDQUVELGVBQWUsRUFBRSxhQUFhLEVBQUc7NEJBRjFDLFVBQVU7O0FBR1osVUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDaEIsVUFBSSxDQUFDLFFBQVEsR0FBRyxlQVRYLEdBQUcsR0FTYSxDQUFDO0FBQ3RCLFVBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFLENBQUM7QUFDM0MsVUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7QUFDNUIsVUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDdkMsVUFBSSxDQUFDLGFBQWEsR0FBRyxlQWJYLElBQUksR0FhYSxDQUFDO0tBQzdCOztpQkFURyxVQUFVOzthQVdQLGlCQUFFLE1BQU0sRUFBRztBQUNoQixZQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztPQUM3Qjs7O2FBRU8sa0JBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRztBQUN6QixZQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxVQUFBLElBQUk7aUJBQzlDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFFLFFBQVEsQ0FBRSxHQUFHLFdBdEJ2QixJQUFJLENBc0J3QixFQUFFLENBQUUsUUFBUSxDQUFFO1NBQUEsQ0FBRSxDQUFDO09BQ3hEOzs7YUFFTyxrQkFBRSxLQUFLLEVBQUc7OztBQUNoQixZQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBRSxLQUFLLENBQUMsQ0FBQyxFQUFHO0FBQ3RELGdCQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxNQUFNLEdBQUcsS0FBSyxDQUFFLE9BQU8sQ0FBRSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBQztTQUMzRTtBQUNELFlBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFFLEtBQUssQ0FBRSxDQUFDOztBQUV6QixZQUFNLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNwQixZQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDMUMsK0JBQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDOztBQUVyRCxZQUFJLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUc7QUFDMUMsZ0JBQU0sQ0FBQyxxQkFBcUIsQ0FBRSxZQUFNO0FBQ2xDLGtCQUFLLGNBQWMsR0FBRyxLQUFLLENBQUM7QUFDNUIsZ0JBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdkMsa0JBQUssZUFBZSxFQUFFLENBQUM7QUFDdkIsbUNBQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1dBQ3BELENBQUUsQ0FBQztBQUNKLGNBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQzVCO09BQ0Y7OzthQUVXLHdCQUFHO0FBQ2IsWUFBTSxHQUFHLEdBQUcsU0FBTixHQUFHLENBQUcsS0FBSztpQkFBSSxVQUFBLEVBQUU7bUJBQUksRUFBRSxDQUFFLEtBQUssQ0FBRTtXQUFBO1NBQUEsQ0FBQztBQUN2QyxZQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDMUIsZUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRztBQUN6QixjQUFNLE1BQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2pDLGNBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLE1BQUssQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFDO0FBQ3BELGNBQUksU0FBUyxFQUFHO0FBQ2QscUJBQVMsQ0FBQyxPQUFPLENBQUUsR0FBRyxDQUFFLE1BQUssQ0FBRSxDQUFFLENBQUM7QUFDbEMseUJBQWEsR0FBRyxJQUFJLENBQUM7V0FDdEIsTUFDSTtBQUNILGtCQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDaEIsaUNBQWlDLEVBQ2pDLE1BQUssQ0FBRSxPQUFPLENBQUUsRUFDaEIsTUFBSyxDQUFDLElBQUksRUFBRSxDQUNiLENBQUM7V0FDSDtTQUNGO0FBQ0QsZUFBTyxhQUFhLENBQUM7T0FDdEI7OztXQTVERyxVQUFVOzs7bUJBZ0VELFVBQVUiLCJmaWxlIjoiZGlzcGF0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXAsIExpc3QgfSBmcm9tICdpbW11dGFibGUnO1xuaW1wb3J0IGNvdW50IGZyb20gJy4vdXRpbC9tZXRyaWNzJztcblxuY29uc3Qgbm93ID0gKCkgPT4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuXG5jbGFzcyBEaXNwYXRjaGVyIHtcblxuICBjb25zdHJ1Y3Rvciggb25BZnRlckRpc3BhdGNoLCBtb25pdG9yRXZlbnRzICkge1xuICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICB0aGlzLnJlZ2lzdHJ5ID0gTWFwKCk7XG4gICAgdGhpcy5kaXNwYXRjaCA9IHRoaXMuZGlzcGF0Y2guYmluZCggdGhpcyApO1xuICAgIHRoaXMuZnJhbWVSZXF1ZXN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLm9uQWZ0ZXJEaXNwYXRjaCA9IG9uQWZ0ZXJEaXNwYXRjaDtcbiAgICB0aGlzLm1vbml0b3JFdmVudHMgPSBMaXN0KCk7XG4gIH1cblxuICBtb25pdG9yKCBldmVudHMgKSB7XG4gICAgdGhpcy5tb25pdG9yRXZlbnRzID0gZXZlbnRzO1xuICB9XG5cbiAgcmVnaXN0ZXIoIHR5cGUsIGNhbGxiYWNrICkge1xuICAgIHRoaXMucmVnaXN0cnkgPSB0aGlzLnJlZ2lzdHJ5LnVwZGF0ZSggdHlwZSwgbGlzdCA9PlxuICAgICAgbGlzdCA/IGxpc3QucHVzaCggY2FsbGJhY2sgKSA6IExpc3Qub2YoIGNhbGxiYWNrICkgKTtcbiAgfVxuXG4gIGRpc3BhdGNoKCBldmVudCApIHtcbiAgICBpZiggdGhpcy5tb25pdG9yRXZlbnRzLmluZGV4T2YoIGV2ZW50LnR5cGUoKSApICE9PSAtMSApIHtcbiAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyggJ0FDVDonICsgZXZlbnRbICdfbmFtZScgXSwgJyAgZGF0YTogJywgZXZlbnQudG9KUygpICk7XG4gICAgfVxuICAgIHRoaXMucXVldWUucHVzaCggZXZlbnQgKTtcblxuICAgIGNvbnN0IG1hcmtBID0gbm93KCk7XG4gICAgY29uc3QgYW55RGlzcGF0Y2hlZCA9IHRoaXMucHJvY2Vzc1F1ZXVlKCk7XG4gICAgY291bnQoeyB3aGF0OiAnZGlzcGF0Y2gnLCBkdXJhdGlvbjogbm93KCkgLSBtYXJrQSB9KTtcblxuICAgIGlmKCBhbnlEaXNwYXRjaGVkICYmICF0aGlzLmZyYW1lUmVxdWVzdGVkICkge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSggKCkgPT4ge1xuICAgICAgICB0aGlzLmZyYW1lUmVxdWVzdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IG1hcmtCID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB0aGlzLm9uQWZ0ZXJEaXNwYXRjaCgpO1xuICAgICAgICBjb3VudCh7IHdoYXQ6ICdyZW5kZXInLCBkdXJhdGlvbjogbm93KCkgLSBtYXJrQiB9KTtcbiAgICAgIH0gKTtcbiAgICAgIHRoaXMuZnJhbWVSZXF1ZXN0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NRdWV1ZSgpIHtcbiAgICBjb25zdCBydW4gPSBldmVudCA9PiBjYiA9PiBjYiggZXZlbnQgKTtcbiAgICB2YXIgYW55RGlzcGF0Y2hlZCA9IGZhbHNlO1xuICAgIHdoaWxlKCB0aGlzLnF1ZXVlLmxlbmd0aCApIHtcbiAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy5xdWV1ZS5zaGlmdCgpO1xuICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5yZWdpc3RyeS5nZXQoIGV2ZW50LnR5cGUoKSApO1xuICAgICAgaWYoIGNhbGxiYWNrcyApIHtcbiAgICAgICAgY2FsbGJhY2tzLmZvckVhY2goIHJ1biggZXZlbnQgKSApO1xuICAgICAgICBhbnlEaXNwYXRjaGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coXG4gICAgICAgICAgJ1VuaGFuZGxlZCBldmVudDogKHR5cGU6ICVzKTogJW8nLFxuICAgICAgICAgIGV2ZW50WyAnX25hbWUnIF0sXG4gICAgICAgICAgZXZlbnQudG9KUygpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhbnlEaXNwYXRjaGVkO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGlzcGF0Y2hlcjtcbiJdfQ==