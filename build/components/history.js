define(['exports', 'module', 'react', '../util/shallow-equal', '../util/metrics'], function (exports, module, _react, _utilShallowEqual, _utilMetrics) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _shallowEqual = _interopRequireDefault(_utilShallowEqual);

  var _count = _interopRequireDefault(_utilMetrics);

  var History = _react.createClass({
    displayName: 'History',

    render: function render() {
      var checkpoints = this.props.checkpoints;

      (0, _count['default'])({ what: History.displayName });
      return _react.createElement(
        'ol',
        { className: 'nbe-history' },
        this.renderCheckpoints(checkpoints)
      );
    },

    renderCheckpoints: function renderCheckpoints(checkpoints) {
      return checkpoints.map(function (checkpoint) {
        return _react.createElement(
          'li',
          { key: checkpoint.at },
          checkpoint.before
        );
      });
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);
    }

  });

  module.exports = History;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2hpc3RvcnkuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE1BQU0sT0FBTyxHQUFHLE9BQU0sV0FBVyxDQUFDOzs7QUFFaEMsVUFBTSxFQUFBLGtCQUFHO1VBQ0MsV0FBVyxHQUFLLElBQUksQ0FBQyxLQUFLLENBQTFCLFdBQVc7O0FBQ25CLDZCQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLGFBQU87O1VBQUksU0FBUyxFQUFFLGFBQWE7UUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUUsV0FBVyxDQUFFO09BQU8sQ0FBQztLQUNyRjs7QUFFRCxxQkFBaUIsRUFBQSwyQkFBRSxXQUFXLEVBQUc7QUFDL0IsYUFBTyxXQUFXLENBQUMsR0FBRyxDQUFFLFVBQUEsVUFBVTtlQUNoQzs7WUFBSSxHQUFHLEVBQUcsVUFBVSxDQUFDLEVBQUU7VUFBSyxVQUFVLENBQUMsTUFBTTtTQUFPO09BQUEsQ0FDckQsQ0FBQztLQUNIOztBQUVELHlCQUFxQixFQUFBLCtCQUFFLFNBQVMsRUFBRztBQUNqQyxhQUFPLENBQUMsOEJBQWMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQztLQUMvQzs7R0FFRixDQUFDLENBQUM7O21CQUVZLE9BQU8iLCJmaWxlIjoiaGlzdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbC9zaGFsbG93LWVxdWFsJztcbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuXG5jb25zdCBIaXN0b3J5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNoZWNrcG9pbnRzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvdW50KHsgd2hhdDogSGlzdG9yeS5kaXNwbGF5TmFtZSB9KTtcbiAgICByZXR1cm4gPG9sIGNsYXNzTmFtZT17J25iZS1oaXN0b3J5J30+eyB0aGlzLnJlbmRlckNoZWNrcG9pbnRzKCBjaGVja3BvaW50cyApIH08L29sPjtcbiAgfSxcblxuICByZW5kZXJDaGVja3BvaW50cyggY2hlY2twb2ludHMgKSB7XG4gICAgcmV0dXJuIGNoZWNrcG9pbnRzLm1hcCggY2hlY2twb2ludCA9PlxuICAgICAgPGxpIGtleT17IGNoZWNrcG9pbnQuYXQgfT57IGNoZWNrcG9pbnQuYmVmb3JlIH08L2xpPlxuICAgICk7XG4gIH0sXG5cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKCBuZXh0UHJvcHMgKSB7XG4gICAgcmV0dXJuICFzaGFsbG93RXF1YWwoIG5leHRQcm9wcywgdGhpcy5wcm9wcyApO1xuICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5O1xuIl19