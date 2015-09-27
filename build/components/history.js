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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9jb21wb25lbnRzL2hpc3RvcnkuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLE1BQU0sT0FBTyxHQUFHLE9BQU0sV0FBVyxDQUFDOzs7QUFFaEMsVUFBTSxFQUFBLGtCQUFHO1VBQ0MsV0FBVyxHQUFLLElBQUksQ0FBQyxLQUFLLENBQTFCLFdBQVc7O0FBQ25CLDZCQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLGFBQU87O1VBQUksU0FBUyxFQUFFLGFBQWEsQUFBQztRQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxXQUFXLENBQUU7T0FBTyxDQUFDO0tBQ3JGOztBQUVELHFCQUFpQixFQUFBLDJCQUFFLFdBQVcsRUFBRztBQUMvQixhQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUUsVUFBQSxVQUFVO2VBQ2hDOztZQUFJLEdBQUcsRUFBRyxVQUFVLENBQUMsRUFBRSxBQUFFO1VBQUcsVUFBVSxDQUFDLE1BQU07U0FBTztPQUFBLENBQ3JELENBQUM7S0FDSDs7QUFFRCx5QkFBcUIsRUFBQSwrQkFBRSxTQUFTLEVBQUc7QUFDakMsYUFBTyxDQUFDLDhCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7S0FDL0M7O0dBRUYsQ0FBQyxDQUFDOzttQkFFWSxPQUFPIiwiZmlsZSI6Ii9Vc2Vycy9taWNoYWVsL3dvcmsvZ2l0aHViLmNvbS94MUIvbmJlLXJlYWN0L3NyYy9jb21wb25lbnRzL2hpc3RvcnkuanN4Iiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlsL3NoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IGNvdW50IGZyb20gJy4uL3V0aWwvbWV0cmljcyc7XG5cbmNvbnN0IEhpc3RvcnkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hlY2twb2ludHMgfSA9IHRoaXMucHJvcHM7XG4gICAgY291bnQoeyB3aGF0OiBIaXN0b3J5LmRpc3BsYXlOYW1lIH0pO1xuICAgIHJldHVybiA8b2wgY2xhc3NOYW1lPXsnbmJlLWhpc3RvcnknfT57IHRoaXMucmVuZGVyQ2hlY2twb2ludHMoIGNoZWNrcG9pbnRzICkgfTwvb2w+O1xuICB9LFxuXG4gIHJlbmRlckNoZWNrcG9pbnRzKCBjaGVja3BvaW50cyApIHtcbiAgICByZXR1cm4gY2hlY2twb2ludHMubWFwKCBjaGVja3BvaW50ID0+XG4gICAgICA8bGkga2V5PXsgY2hlY2twb2ludC5hdCB9PnsgY2hlY2twb2ludC5iZWZvcmUgfTwvbGk+XG4gICAgKTtcbiAgfSxcblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApIHtcbiAgICByZXR1cm4gIXNoYWxsb3dFcXVhbCggbmV4dFByb3BzLCB0aGlzLnByb3BzICk7XG4gIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEhpc3Rvcnk7XG4iXX0=