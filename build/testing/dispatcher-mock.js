define(['exports', 'module'], function (exports, module) {'use strict';var _slicedToArray = (function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i['return']) _i['return']();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError('Invalid attempt to destructure non-iterable instance');}};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}var jasmine = window.jasmine;var 

  DispatcherMock = 
  function DispatcherMock() {var _this = this;_classCallCheck(this, DispatcherMock);

    // for tests (inspection):
    this.registrations = [];
    this.actionHandler = function (type) {return _this.registrations.
      filter(function (_ref) {var _ref2 = _slicedToArray(_ref, 2);var t = _ref2[0];var _ = _ref2[1];return t === type;}).
      map(function (_ref3) {var _ref32 = _slicedToArray(_ref3, 2);var _ = _ref32[0];var cb = _ref32[1];return cb;})[0];};
    this.handleAction = function (action) {return (
        _this.actionHandler(action.type())(action));};

    // dispatcher API (mock):
    this.dispatch = jasmine.createSpy('dispatch');
    this.register = jasmine.createSpy('register').and.
    callFake(function (action, callback) {
      _this.registrations.push([action, callback]);});};module.exports = 





  DispatcherMock;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0aW5nL2Rpc3BhdGNoZXItbW9jay5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjAxQkFBUSxPQUFPLEdBQUssTUFBTSxDQUFsQixPQUFPOztBQUVULGdCQUFjO0FBQ1AsV0FEUCxjQUFjLEdBQ0osd0NBRFYsY0FBYzs7O0FBSWhCLFFBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLFFBQUksQ0FBQyxhQUFhLEdBQUcsVUFBRSxJQUFJLFVBQU0sTUFBSyxhQUFhO0FBQ2hELFlBQU0sQ0FBRSxVQUFDLElBQVEsOEJBQVIsSUFBUSxTQUFOLENBQUMsZ0JBQUUsQ0FBQyxtQkFBTyxDQUFDLEtBQUssSUFBSSxFQUFBLENBQUU7QUFDbEMsU0FBRyxDQUFFLFVBQUMsS0FBUywrQkFBVCxLQUFTLFNBQVAsQ0FBQyxpQkFBRSxFQUFFLG9CQUFPLEVBQUUsRUFBQSxDQUFFLENBQUUsQ0FBQyxDQUFFLEVBQUEsQ0FBQztBQUNqQyxRQUFJLENBQUMsWUFBWSxHQUFHLFVBQUUsTUFBTTtBQUMxQixjQUFLLGFBQWEsQ0FBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUUsQ0FBRSxNQUFNLENBQUUsR0FBQSxDQUFDOzs7QUFHaEQsUUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFFLFVBQVUsQ0FBRSxDQUFDO0FBQ2hELFFBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBRSxVQUFVLENBQUUsQ0FBQyxHQUFHO0FBQ2hELFlBQVEsQ0FBRSxVQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUs7QUFDL0IsWUFBSyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBRSxDQUFDLENBQUMsQ0FDL0MsQ0FBRSxDQUFDLENBRVA7Ozs7OztBQUdZLGdCQUFjIiwiZmlsZSI6ImRpc3BhdGNoZXItbW9jay5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGphc21pbmUgfSA9IHdpbmRvdztcblxuY2xhc3MgRGlzcGF0Y2hlck1vY2sge1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIC8vIGZvciB0ZXN0cyAoaW5zcGVjdGlvbik6XG4gICAgdGhpcy5yZWdpc3RyYXRpb25zID0gW107XG4gICAgdGhpcy5hY3Rpb25IYW5kbGVyID0gKCB0eXBlICkgPT4gdGhpcy5yZWdpc3RyYXRpb25zXG4gICAgICAuZmlsdGVyKCAoWyB0LCBfIF0pID0+IHQgPT09IHR5cGUgKVxuICAgICAgLm1hcCggKFsgXywgY2IgXSkgPT4gY2IgKVsgMCBdO1xuICAgIHRoaXMuaGFuZGxlQWN0aW9uID0gKCBhY3Rpb24gKSA9PlxuICAgICAgdGhpcy5hY3Rpb25IYW5kbGVyKCBhY3Rpb24udHlwZSgpICkoIGFjdGlvbiApO1xuXG4gICAgLy8gZGlzcGF0Y2hlciBBUEkgKG1vY2spOlxuICAgIHRoaXMuZGlzcGF0Y2ggPSBqYXNtaW5lLmNyZWF0ZVNweSggJ2Rpc3BhdGNoJyApO1xuICAgIHRoaXMucmVnaXN0ZXIgPSBqYXNtaW5lLmNyZWF0ZVNweSggJ3JlZ2lzdGVyJyApLmFuZFxuICAgICAgLmNhbGxGYWtlKCAoYWN0aW9uLCBjYWxsYmFjaykgPT4ge1xuICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbnMucHVzaChbIGFjdGlvbiwgY2FsbGJhY2sgXSk7XG4gICAgICB9ICk7XG5cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXNwYXRjaGVyTW9jaztcbiJdfQ==