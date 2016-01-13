define(['exports', 'module', 'react', '../util/shallow-equal', '../util/metrics'], function (exports, module, _react, _utilShallowEqual, _utilMetrics) {'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _count = _interopRequireDefault(_utilMetrics);





  var History = _React['default'].createClass({ displayName: 'History', 

    render: function render() {var 
      checkpoints = this.props.checkpoints;
      (0, _count['default'])({ what: History.displayName });
      return _React['default'].createElement('ol', { className: 'nbe-history' }, this.renderCheckpoints(checkpoints));}, 


    renderCheckpoints: function renderCheckpoints(checkpoints) {
      return checkpoints.map(function (checkpoint) {return (
          _React['default'].createElement('li', { key: checkpoint.at }, checkpoint.before));});}, 



    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);} });module.exports = 




  History;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2hpc3RvcnkuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1BLE1BQU0sT0FBTyxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7QUFFaEMsVUFBTSxFQUFBLGtCQUFHO0FBQ0MsaUJBQVcsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUExQixXQUFXO0FBQ25CLDZCQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLGFBQU8sd0NBQUksU0FBUyxFQUFFLGFBQWEsQUFBQyxJQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxXQUFXLENBQUUsQ0FBTyxDQUFDLENBQ3JGOzs7QUFFRCxxQkFBaUIsRUFBQSwyQkFBRSxXQUFXLEVBQUc7QUFDL0IsYUFBTyxXQUFXLENBQUMsR0FBRyxDQUFFLFVBQUEsVUFBVTtBQUNoQyxrREFBSSxHQUFHLEVBQUcsVUFBVSxDQUFDLEVBQUUsQUFBRSxJQUFHLFVBQVUsQ0FBQyxNQUFNLENBQU8sR0FBQSxDQUNyRCxDQUFDLENBQ0g7Ozs7QUFFRCx5QkFBcUIsRUFBQSwrQkFBRSxTQUFTLEVBQUc7QUFDakMsYUFBTyxDQUFDLDhCQUFjLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FDL0MsRUFFRixDQUFDLENBQUM7Ozs7O0FBRVksU0FBTyIsImZpbGUiOiJoaXN0b3J5LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCBzaGFsbG93RXF1YWwgZnJvbSAnLi4vdXRpbC9zaGFsbG93LWVxdWFsJztcbmltcG9ydCBjb3VudCBmcm9tICcuLi91dGlsL21ldHJpY3MnO1xuXG5cbmNvbnN0IEhpc3RvcnkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY2hlY2twb2ludHMgfSA9IHRoaXMucHJvcHM7XG4gICAgY291bnQoeyB3aGF0OiBIaXN0b3J5LmRpc3BsYXlOYW1lIH0pO1xuICAgIHJldHVybiA8b2wgY2xhc3NOYW1lPXsnbmJlLWhpc3RvcnknfT57IHRoaXMucmVuZGVyQ2hlY2twb2ludHMoIGNoZWNrcG9pbnRzICkgfTwvb2w+O1xuICB9LFxuXG4gIHJlbmRlckNoZWNrcG9pbnRzKCBjaGVja3BvaW50cyApIHtcbiAgICByZXR1cm4gY2hlY2twb2ludHMubWFwKCBjaGVja3BvaW50ID0+XG4gICAgICA8bGkga2V5PXsgY2hlY2twb2ludC5hdCB9PnsgY2hlY2twb2ludC5iZWZvcmUgfTwvbGk+XG4gICAgKTtcbiAgfSxcblxuICBzaG91bGRDb21wb25lbnRVcGRhdGUoIG5leHRQcm9wcyApIHtcbiAgICByZXR1cm4gIXNoYWxsb3dFcXVhbCggbmV4dFByb3BzLCB0aGlzLnByb3BzICk7XG4gIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEhpc3Rvcnk7XG4iXX0=