define(['exports', 'module', 'react', '../util/shallow-equal', '../util/metrics'], function (exports, module, _react, _utilShallowEqual, _utilMetrics) {'use strict';var _typeofReactElement = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 60103;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _React = _interopRequireDefault(_react);var _shallowEqual = _interopRequireDefault(_utilShallowEqual);var _count = _interopRequireDefault(_utilMetrics);





  var History = _React['default'].createClass({ displayName: 'History', 

    render: function render() {var 
      checkpoints = this.props.checkpoints;
      (0, _count['default'])({ what: History.displayName });
      return { $$typeof: _typeofReactElement, type: 'ol', key: null, ref: null, props: { children: this.renderCheckpoints(checkpoints), className: 'nbe-history' }, _owner: null };}, 


    renderCheckpoints: function renderCheckpoints(checkpoints) {
      return checkpoints.map(function (checkpoint) {return { $$typeof: _typeofReactElement, type: 'li', key: 
          checkpoint.at, ref: null, props: { children: checkpoint.before }, _owner: null };});}, 



    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual['default'])(nextProps, this.props);} });module.exports = 




  History;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2hpc3RvcnkuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1BLE1BQU0sT0FBTyxHQUFHLGtCQUFNLFdBQVcsQ0FBQzs7QUFFaEMsVUFBTSxFQUFBLGtCQUFHO0FBQ0MsaUJBQVcsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUExQixXQUFXO0FBQ25CLDZCQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ3JDLG1HQUF1QyxJQUFJLENBQUMsaUJBQWlCLENBQUUsV0FBVyxDQUFFLEVBQWpFLFNBQVMsRUFBRSxhQUFhLG1CQUFpRCxDQUNyRjs7O0FBRUQscUJBQWlCLEVBQUEsMkJBQUUsV0FBVyxFQUFHO0FBQy9CLGFBQU8sV0FBVyxDQUFDLEdBQUcsQ0FBRSxVQUFBLFVBQVU7QUFDdEIsb0JBQVUsQ0FBQyxFQUFFLGdDQUFLLFVBQVUsQ0FBQyxNQUFNLG9CQUFPLENBQ3JELENBQUMsQ0FDSDs7OztBQUVELHlCQUFxQixFQUFBLCtCQUFFLFNBQVMsRUFBRztBQUNqQyxhQUFPLENBQUMsOEJBQWMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUMvQyxFQUVGLENBQUMsQ0FBQzs7Ozs7QUFFWSxTQUFPIiwiZmlsZSI6Imhpc3RvcnkuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHNoYWxsb3dFcXVhbCBmcm9tICcuLi91dGlsL3NoYWxsb3ctZXF1YWwnO1xuaW1wb3J0IGNvdW50IGZyb20gJy4uL3V0aWwvbWV0cmljcyc7XG5cblxuY29uc3QgSGlzdG9yeSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaGVja3BvaW50cyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb3VudCh7IHdoYXQ6IEhpc3RvcnkuZGlzcGxheU5hbWUgfSk7XG4gICAgcmV0dXJuIDxvbCBjbGFzc05hbWU9eyduYmUtaGlzdG9yeSd9PnsgdGhpcy5yZW5kZXJDaGVja3BvaW50cyggY2hlY2twb2ludHMgKSB9PC9vbD47XG4gIH0sXG5cbiAgcmVuZGVyQ2hlY2twb2ludHMoIGNoZWNrcG9pbnRzICkge1xuICAgIHJldHVybiBjaGVja3BvaW50cy5tYXAoIGNoZWNrcG9pbnQgPT5cbiAgICAgIDxsaSBrZXk9eyBjaGVja3BvaW50LmF0IH0+eyBjaGVja3BvaW50LmJlZm9yZSB9PC9saT5cbiAgICApO1xuICB9LFxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSggbmV4dFByb3BzICkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKCBuZXh0UHJvcHMsIHRoaXMucHJvcHMgKTtcbiAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeTtcbiJdfQ==