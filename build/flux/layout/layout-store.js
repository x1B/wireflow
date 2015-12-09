define(['exports', 'module', 'immutable', '../../util/settings', '../../util/auto-layout', '../../util/auto-measurements', '../graph/graph-actions', '../history/history-actions', './layout-model', './layout-actions'], function (exports, module, _immutable, _utilSettings, _utilAutoLayout, _utilAutoMeasurements, _graphGraphActions, _historyHistoryActions, _layoutModel, _layoutActions) {'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}var _settings = _interopRequireDefault(_utilSettings);var 


















  edgeOffset = _settings['default'].layout.edgeOffset;

  /**
   * Manages the graph layout prop.
   */var 
  LayoutStore = (function () {

    function LayoutStore(dispatcher, graphStore) {var _this = this;var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];_classCallCheck(this, LayoutStore);
      this.dispatcher = dispatcher;
      this.graphStore = graphStore;

      this.storeId = this.constructor.name;
      this.measurements = options.measurements || _layoutModel.convert.measurements(
      (0, _utilAutoMeasurements.calculateMeasurements)(graphStore.graph));

      this.layout = options.layout || _layoutModel.convert.layout(
      (0, _utilAutoLayout.calculateLayout)(graphStore.graph, (0, _immutable.Map)(this.measurements)));

      this.save();

      dispatcher.register(_layoutActions.MeasureVertex, function (ev) {
        _this.measurements = _this.measurements.setIn(
        ['vertices', ev.vertex.id], 
        ev.measurements);

        _this.save();});


      dispatcher.register(_layoutActions.MeasureEdge, function (ev) {
        _this.measurements = _this.measurements.setIn(
        ['edges', ev.edge.id], 
        ev.measurements);

        _this.save();});


      dispatcher.register(_layoutActions.AutoLayout, function (ev) {
        _this.layout = _layoutModel.convert.layout(
        (0, _utilAutoLayout.calculateLayout)(graphStore.graph, (0, _immutable.Map)(_this.measurements)));

        _this.save();});


      dispatcher.register(_graphGraphActions.RemoveVertex, function (ev) {
        _this.layout = _this.layout.removeIn(['vertices', ev.vertexId]);
        _this.measurements = _this.measurements.removeIn(['vertices', ev.vertexId]);
        _this.save();});


      dispatcher.register(_graphGraphActions.RemoveEdge, function (ev) {
        _this.layout = _this.layout.removeIn(['edges', ev.edgeId]);
        _this.measurements = _this.measurements.removeIn(['edges', ev.edgeId]);
        _this.save();});


      dispatcher.register(_layoutActions.MoveVertex, function (ev) {
        _this.layout = _this.layout.setIn(['vertices', ev.vertex.id], ev.to);
        _this.save();});


      dispatcher.register(_layoutActions.MoveEdge, function (ev) {
        _this.layout = _this.layout.setIn(['edges', ev.edge.id], ev.to);
        _this.save();});


      dispatcher.register(_layoutActions.HandleEdgeInserted, function (ev) {
        _this.layout = _this.placeEdge(ev.edge, ev.from, ev.to);
        _this.save();});


      dispatcher.register(_historyHistoryActions.RestoreState, function (act) {
        if (act.storeId === _this.storeId) {
          _this.layout = act.state.get(0);
          _this.measurements = act.state.get(1);}});}_createClass(LayoutStore, [{ key: 'save', value: 




      function save() {
        this.dispatcher.dispatch((0, _historyHistoryActions.SaveState)({ 
          storeId: this.storeId, 
          state: _immutable.List.of(this.layout, this.measurements) }));} }, { key: 'insert', value: 



      function insert(newLayout, renameRules) {
        var disjointLayout = renameRules ? 
        this.applyRenameRules(newLayout, renameRules) : 
        newLayout;
        this.layout = this.layout.
        set('edges', this.layout.edges.merge(disjointLayout.edges)).
        set('vertices', this.layout.vertices.merge(disjointLayout.vertices));} }, { key: 'applyRenameRules', value: 


      function applyRenameRules(newLayout, renameRules) {
        return (0, _layoutModel.Layout)({ 
          edges: renamed(newLayout.edges, renameRules.get('edges')), 
          vertices: renamed(newLayout.vertices, renameRules.get('vertices')) });


        function renamed(map, rules) {
          var workingCopy = {};
          map.forEach(function (value, key) {
            var newKey = rules.get(key) || key;
            workingCopy[newKey] = value;});

          return (0, _immutable.Map)(workingCopy);}} }, { key: 'moveSelection', value: 



      function moveSelection(selection, referenceLayout, offset) {var 
        left = offset.left;var top = offset.top;
        var targetLayout = referenceLayout;
        ['vertices', 'edges'].forEach(function (kind) {return (
            selection[kind].forEach(function (id) {
              targetLayout = targetLayout.updateIn([kind, id], function (coords) {return (
                  coords && (0, _layoutModel.Coords)({ 
                    left: coords.left + left, 
                    top: coords.top + top }));});}));});




        this.layout = targetLayout;
        this.save();} }, { key: 'placeEdge', value: 


      function placeEdge(edge, from, to) {var 
        measurements = this.measurements;var layout = this.layout;
        var fromMeasurements = measurements.vertices.get(from.vertexId);
        var toMeasurements = measurements.vertices.get(to.vertexId);
        var fromCoords = layout.vertices.get(from.vertexId);
        var toCoords = layout.vertices.get(to.vertexId);

        var left = (
        fromCoords.left + fromMeasurements.dimensions.width + toCoords.left) / 
        2 - edgeOffset;

        var fromPortBox = fromMeasurements.getIn([from.direction, from.portId]);
        var toPortBox = toMeasurements.getIn([to.direction, to.portId]);
        var top = (
        fromCoords.top + fromPortBox.top + toCoords.top + toPortBox.top) / 
        2 - edgeOffset;

        return this.layout.setIn(['edges', edge.id], (0, _layoutModel.Coords)({ 
          left: left, 
          top: top }));} }]);return LayoutStore;})();module.exports = 




  LayoutStore;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2xheW91dC9sYXlvdXQtc3RvcmUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQmtCLFlBQVUsd0JBQXBCLE1BQU0sQ0FBSSxVQUFVOzs7OztBQUt0QixhQUFXOztBQUVKLGFBRlAsV0FBVyxDQUVGLFVBQVUsRUFBRSxVQUFVLEVBQWlCLHNCQUFmLE9BQU8seURBQUcsRUFBRSxzQ0FGN0MsV0FBVztBQUdiLFVBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzdCLFVBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztBQUU3QixVQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQ3JDLFVBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksSUFBSSxhQXZCVCxPQUFPLENBdUJVLFlBQVk7QUFDOUQsZ0NBNUJHLHFCQUFxQixFQTRCRCxVQUFVLENBQUMsS0FBSyxDQUFFLENBQzFDLENBQUM7O0FBQ0YsVUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLGFBMUJHLE9BQU8sQ0EwQkYsTUFBTTtBQUM1QywwQkFoQ0csZUFBZSxFQWdDRCxVQUFVLENBQUMsS0FBSyxFQUFFLGVBbkMxQixHQUFHLEVBbUMyQixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUUsQ0FDNUQsQ0FBQzs7QUFDRixVQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVosZ0JBQVUsQ0FBQyxRQUFRLGdCQTFCckIsYUFBYSxFQTBCeUIsVUFBQSxFQUFFLEVBQUk7QUFDeEMsY0FBSyxZQUFZLEdBQUcsTUFBSyxZQUFZLENBQUMsS0FBSztBQUN6QyxTQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBRTtBQUM1QixVQUFFLENBQUMsWUFBWSxDQUNoQixDQUFDOztBQUNGLGNBQUssSUFBSSxFQUFFLENBQUMsQ0FDYixD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QUVuQixlQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLENBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUUsRUFBRSxpQkEzSjNDLE1BQU0sRUEySjRDO0FBQ3JELGNBQUksRUFBRSxJQUFJO0FBQ1YsYUFBRyxFQUFFLEdBQUcsRUFDVCxDQUFDLENBQUUsQ0FBQyxDQUNOLFlBL0lHLFdBQVc7Ozs7O0FBa0pGLGFBQVciLCJmaWxlIjoibGF5b3V0LXN0b3JlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3QsIE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuLi8uLi91dGlsL3NldHRpbmdzJztcbmltcG9ydCB7IGNhbGN1bGF0ZUxheW91dCB9IGZyb20gJy4uLy4uL3V0aWwvYXV0by1sYXlvdXQnO1xuaW1wb3J0IHsgY2FsY3VsYXRlTWVhc3VyZW1lbnRzIH0gZnJvbSAnLi4vLi4vdXRpbC9hdXRvLW1lYXN1cmVtZW50cyc7XG5cbmltcG9ydCB7IFJlbW92ZVZlcnRleCwgUmVtb3ZlRWRnZSB9IGZyb20gJy4uL2dyYXBoL2dyYXBoLWFjdGlvbnMnO1xuaW1wb3J0IHsgU2F2ZVN0YXRlLCBSZXN0b3JlU3RhdGUgfSBmcm9tICcuLi9oaXN0b3J5L2hpc3RvcnktYWN0aW9ucyc7XG5pbXBvcnQgeyBDb29yZHMsIE1lYXN1cmVtZW50cywgTGF5b3V0LCBjb252ZXJ0IH0gZnJvbSAnLi9sYXlvdXQtbW9kZWwnO1xuaW1wb3J0IHtcbiAgQXV0b0xheW91dCxcbiAgSGFuZGxlRWRnZUluc2VydGVkLFxuICBNZWFzdXJlRWRnZSxcbiAgTWVhc3VyZVZlcnRleCxcbiAgTW92ZUVkZ2UsXG4gIE1vdmVWZXJ0ZXhcbn0gZnJvbSAnLi9sYXlvdXQtYWN0aW9ucyc7XG5cblxuY29uc3QgeyBsYXlvdXQ6IHsgZWRnZU9mZnNldCB9IH0gPSBzZXR0aW5ncztcblxuLyoqXG4gKiBNYW5hZ2VzIHRoZSBncmFwaCBsYXlvdXQgcHJvcC5cbiAqL1xuY2xhc3MgTGF5b3V0U3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKCBkaXNwYXRjaGVyLCBncmFwaFN0b3JlLCBvcHRpb25zID0ge30gKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcbiAgICB0aGlzLmdyYXBoU3RvcmUgPSBncmFwaFN0b3JlO1xuXG4gICAgdGhpcy5zdG9yZUlkID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHRoaXMubWVhc3VyZW1lbnRzID0gb3B0aW9ucy5tZWFzdXJlbWVudHMgfHwgY29udmVydC5tZWFzdXJlbWVudHMoXG4gICAgICBjYWxjdWxhdGVNZWFzdXJlbWVudHMoIGdyYXBoU3RvcmUuZ3JhcGggKVxuICAgICk7XG4gICAgdGhpcy5sYXlvdXQgPSBvcHRpb25zLmxheW91dCB8fCBjb252ZXJ0LmxheW91dChcbiAgICAgIGNhbGN1bGF0ZUxheW91dCggZ3JhcGhTdG9yZS5ncmFwaCwgTWFwKHRoaXMubWVhc3VyZW1lbnRzKSApXG4gICAgKTtcbiAgICB0aGlzLnNhdmUoKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIE1lYXN1cmVWZXJ0ZXgsIGV2ID0+IHtcbiAgICAgIHRoaXMubWVhc3VyZW1lbnRzID0gdGhpcy5tZWFzdXJlbWVudHMuc2V0SW4oXG4gICAgICAgIFsgJ3ZlcnRpY2VzJywgZXYudmVydGV4LmlkIF0sXG4gICAgICAgIGV2Lm1lYXN1cmVtZW50c1xuICAgICAgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIE1lYXN1cmVFZGdlLCBldiA9PiB7XG4gICAgICB0aGlzLm1lYXN1cmVtZW50cyA9IHRoaXMubWVhc3VyZW1lbnRzLnNldEluKFxuICAgICAgICBbICdlZGdlcycsIGV2LmVkZ2UuaWQgXSxcbiAgICAgICAgZXYubWVhc3VyZW1lbnRzXG4gICAgICApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggQXV0b0xheW91dCwgZXYgPT4ge1xuICAgICAgdGhpcy5sYXlvdXQgPSBjb252ZXJ0LmxheW91dChcbiAgICAgICAgY2FsY3VsYXRlTGF5b3V0KCBncmFwaFN0b3JlLmdyYXBoLCBNYXAodGhpcy5tZWFzdXJlbWVudHMpIClcbiAgICAgICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZW1vdmVWZXJ0ZXgsIGV2ID0+IHtcbiAgICAgIHRoaXMubGF5b3V0ID0gdGhpcy5sYXlvdXQucmVtb3ZlSW4oIFsgJ3ZlcnRpY2VzJywgZXYudmVydGV4SWQgXSApO1xuICAgICAgdGhpcy5tZWFzdXJlbWVudHMgPSB0aGlzLm1lYXN1cmVtZW50cy5yZW1vdmVJbiggWyAndmVydGljZXMnLCBldi52ZXJ0ZXhJZCBdICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZW1vdmVFZGdlLCBldiA9PiB7XG4gICAgICB0aGlzLmxheW91dCA9IHRoaXMubGF5b3V0LnJlbW92ZUluKCBbICdlZGdlcycsIGV2LmVkZ2VJZCBdICk7XG4gICAgICB0aGlzLm1lYXN1cmVtZW50cyA9IHRoaXMubWVhc3VyZW1lbnRzLnJlbW92ZUluKCBbICdlZGdlcycsIGV2LmVkZ2VJZCBdICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBNb3ZlVmVydGV4LCBldiA9PiB7XG4gICAgICB0aGlzLmxheW91dCA9IHRoaXMubGF5b3V0LnNldEluKCBbICd2ZXJ0aWNlcycsIGV2LnZlcnRleC5pZCBdLCBldi50byApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggTW92ZUVkZ2UsIGV2ID0+IHtcbiAgICAgIHRoaXMubGF5b3V0ID0gdGhpcy5sYXlvdXQuc2V0SW4oIFsgJ2VkZ2VzJywgZXYuZWRnZS5pZCBdLCBldi50byApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggSGFuZGxlRWRnZUluc2VydGVkLCBldiA9PiB7XG4gICAgICB0aGlzLmxheW91dCA9IHRoaXMucGxhY2VFZGdlKCBldi5lZGdlLCBldi5mcm9tLCBldi50byApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggUmVzdG9yZVN0YXRlLCBhY3QgPT4ge1xuICAgICAgaWYoIGFjdC5zdG9yZUlkID09PSB0aGlzLnN0b3JlSWQgKSB7XG4gICAgICAgIHRoaXMubGF5b3V0ID0gYWN0LnN0YXRlLmdldCgwKTtcbiAgICAgICAgdGhpcy5tZWFzdXJlbWVudHMgPSBhY3Quc3RhdGUuZ2V0KDEpO1xuICAgICAgfVxuICAgIH0gKTtcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoKCBTYXZlU3RhdGUoe1xuICAgICAgc3RvcmVJZDogdGhpcy5zdG9yZUlkLFxuICAgICAgc3RhdGU6IExpc3Qub2YoIHRoaXMubGF5b3V0LCB0aGlzLm1lYXN1cmVtZW50cyApXG4gICAgfSkgKTtcbiAgfVxuXG4gIGluc2VydCggbmV3TGF5b3V0LCByZW5hbWVSdWxlcyApIHtcbiAgICBjb25zdCBkaXNqb2ludExheW91dCA9IHJlbmFtZVJ1bGVzID9cbiAgICAgIHRoaXMuYXBwbHlSZW5hbWVSdWxlcyggbmV3TGF5b3V0LCByZW5hbWVSdWxlcyApIDpcbiAgICAgIG5ld0xheW91dDtcbiAgICB0aGlzLmxheW91dCA9IHRoaXMubGF5b3V0XG4gICAgICAuc2V0KCAnZWRnZXMnLCB0aGlzLmxheW91dC5lZGdlcy5tZXJnZSggZGlzam9pbnRMYXlvdXQuZWRnZXMgKSApXG4gICAgICAuc2V0KCAndmVydGljZXMnLCB0aGlzLmxheW91dC52ZXJ0aWNlcy5tZXJnZSggZGlzam9pbnRMYXlvdXQudmVydGljZXMgKSApO1xuICB9XG5cbiAgYXBwbHlSZW5hbWVSdWxlcyggbmV3TGF5b3V0LCByZW5hbWVSdWxlcyApIHtcbiAgICByZXR1cm4gTGF5b3V0KHtcbiAgICAgIGVkZ2VzOiByZW5hbWVkKCBuZXdMYXlvdXQuZWRnZXMsIHJlbmFtZVJ1bGVzLmdldCggJ2VkZ2VzJyApICksXG4gICAgICB2ZXJ0aWNlczogcmVuYW1lZCggbmV3TGF5b3V0LnZlcnRpY2VzLCByZW5hbWVSdWxlcy5nZXQoICd2ZXJ0aWNlcycgKSApXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiByZW5hbWVkKCBtYXAsIHJ1bGVzICkge1xuICAgICAgY29uc3Qgd29ya2luZ0NvcHkgPSB7fTtcbiAgICAgIG1hcC5mb3JFYWNoKCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdLZXkgPSBydWxlcy5nZXQoIGtleSApIHx8IGtleTtcbiAgICAgICAgd29ya2luZ0NvcHlbIG5ld0tleSBdID0gdmFsdWU7XG4gICAgICB9ICk7XG4gICAgICByZXR1cm4gTWFwKHdvcmtpbmdDb3B5KTtcbiAgICB9XG4gIH1cblxuICBtb3ZlU2VsZWN0aW9uKCBzZWxlY3Rpb24sIHJlZmVyZW5jZUxheW91dCwgb2Zmc2V0ICkge1xuICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBvZmZzZXQ7XG4gICAgdmFyIHRhcmdldExheW91dCA9IHJlZmVyZW5jZUxheW91dDtcbiAgICBbICd2ZXJ0aWNlcycsICdlZGdlcycgXS5mb3JFYWNoKCBraW5kID0+XG4gICAgICBzZWxlY3Rpb25bIGtpbmQgXS5mb3JFYWNoKCBpZCA9PiB7XG4gICAgICAgIHRhcmdldExheW91dCA9IHRhcmdldExheW91dC51cGRhdGVJbiggWyBraW5kLCBpZCBdLCBjb29yZHMgPT5cbiAgICAgICAgICBjb29yZHMgJiYgQ29vcmRzKHtcbiAgICAgICAgICAgIGxlZnQ6IGNvb3Jkcy5sZWZ0ICsgbGVmdCxcbiAgICAgICAgICAgIHRvcDogY29vcmRzLnRvcCArIHRvcFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9IClcbiAgICApO1xuICAgIHRoaXMubGF5b3V0ID0gdGFyZ2V0TGF5b3V0O1xuICAgIHRoaXMuc2F2ZSgpO1xuICB9XG5cbiAgcGxhY2VFZGdlKCBlZGdlLCBmcm9tLCB0byApIHtcbiAgICBjb25zdCB7IG1lYXN1cmVtZW50cywgbGF5b3V0IH0gPSB0aGlzO1xuICAgIGNvbnN0IGZyb21NZWFzdXJlbWVudHMgPSBtZWFzdXJlbWVudHMudmVydGljZXMuZ2V0KCBmcm9tLnZlcnRleElkICk7XG4gICAgY29uc3QgdG9NZWFzdXJlbWVudHMgPSBtZWFzdXJlbWVudHMudmVydGljZXMuZ2V0KCB0by52ZXJ0ZXhJZCApO1xuICAgIGNvbnN0IGZyb21Db29yZHMgPSBsYXlvdXQudmVydGljZXMuZ2V0KCBmcm9tLnZlcnRleElkICk7XG4gICAgY29uc3QgdG9Db29yZHMgPSBsYXlvdXQudmVydGljZXMuZ2V0KCB0by52ZXJ0ZXhJZCApO1xuXG4gICAgY29uc3QgbGVmdCA9IChcbiAgICAgIGZyb21Db29yZHMubGVmdCArIGZyb21NZWFzdXJlbWVudHMuZGltZW5zaW9ucy53aWR0aCArIHRvQ29vcmRzLmxlZnRcbiAgICApIC8gMiAtIGVkZ2VPZmZzZXQ7XG5cbiAgICBjb25zdCBmcm9tUG9ydEJveCA9IGZyb21NZWFzdXJlbWVudHMuZ2V0SW4oWyBmcm9tLmRpcmVjdGlvbiwgZnJvbS5wb3J0SWQgXSk7XG4gICAgY29uc3QgdG9Qb3J0Qm94ID0gdG9NZWFzdXJlbWVudHMuZ2V0SW4oWyB0by5kaXJlY3Rpb24sIHRvLnBvcnRJZCBdKTtcbiAgICBjb25zdCB0b3AgPSAoXG4gICAgICBmcm9tQ29vcmRzLnRvcCArIGZyb21Qb3J0Qm94LnRvcCArIHRvQ29vcmRzLnRvcCArIHRvUG9ydEJveC50b3BcbiAgICApIC8gMiAtIGVkZ2VPZmZzZXQ7XG5cbiAgICByZXR1cm4gdGhpcy5sYXlvdXQuc2V0SW4oIFsgJ2VkZ2VzJywgZWRnZS5pZCBdLCBDb29yZHMoe1xuICAgICAgbGVmdDogbGVmdCxcbiAgICAgIHRvcDogdG9wXG4gICAgfSkgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMYXlvdXRTdG9yZTtcbiJdfQ==