define(['exports', 'module', 'immutable', '../../util/settings', '../../util/auto-layout', '../../util/auto-measurements', '../graph/graph-actions', '../history/history-actions', './layout-model', './layout-actions'], function (exports, module, _immutable, _utilSettings, _utilAutoLayout, _utilAutoMeasurements, _graphGraphActions, _historyHistoryActions, _layoutModel, _layoutActions) {'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}var _settings = _interopRequireDefault(_utilSettings);var 


















  edgeOffset = _settings['default'].layout.edgeOffset;

  var ZERO = (0, _layoutModel.Coords)({ left: 0, top: 0 });var 
  min = Math.min;

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
        var correctionOffset = _this.correctionOffset(ev.to);
        _this.layout = _this.layout.setIn(['vertices', ev.vertex.id], ev.to);
        _this.layout = _this.withCorrection(_this.layout, correctionOffset);
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

          return (0, _immutable.Map)(workingCopy);}} }, { key: 'correctionOffset', value: 



      function correctionOffset(nodeCoords) {var knownCorrectionOffset = arguments.length <= 1 || arguments[1] === undefined ? ZERO : arguments[1];
        if (nodeCoords.left >= 0 && nodeCoords.top >= 0) {
          return knownCorrectionOffset;}

        var cX = min(nodeCoords.left, knownCorrectionOffset.left);
        var cY = min(nodeCoords.top, knownCorrectionOffset.top);
        return (0, _layoutModel.Coords)({ 
          left: cX < 0 ? min(cX, -30) : cX, 
          top: cY < 0 ? min(cY, -30) : cY });} }, { key: 'withCorrection', value: 



      function withCorrection(layout, offset) {
        if (offset === ZERO) {
          return layout;}


        var targetLayout = layout;
        ['vertices', 'edges'].forEach(function (kind) {
          targetLayout = targetLayout.update(kind, function (items) {return (
              items.map(function (coords) {return coords && (0, _layoutModel.Coords)({ 
                  left: coords.left - offset.left, 
                  top: coords.top - offset.top });}));});});


        return targetLayout;} }, { key: 'moveSelection', value: 



      function moveSelection(selection, referenceLayout, offset) {var _this2 = this;var 
        left = offset.left;var top = offset.top;

        var targetLayout = referenceLayout;
        var targetCorrection = ZERO;

        ['vertices', 'edges'].forEach(function (kind) {return (
            selection[kind].forEach(function (id) {
              targetLayout = targetLayout.updateIn([kind, id], function (coords) {
                if (!coords) {return coords;}
                var newCoords = (0, _layoutModel.Coords)({ 
                  left: coords.left + left, 
                  top: coords.top + top });

                targetCorrection = _this2.correctionOffset(newCoords, targetCorrection);
                return newCoords;});}));});




        this.layout = this.withCorrection(targetLayout, targetCorrection);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2xheW91dC9sYXlvdXQtc3RvcmUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQmtCLFlBQVUsd0JBQXBCLE1BQU0sQ0FBSSxVQUFVOztBQUU1QixNQUFNLElBQUksR0FBRyxpQkFiSixNQUFNLEVBYUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLEtBQUcsR0FBSyxJQUFJLENBQVosR0FBRzs7Ozs7QUFLTCxhQUFXOztBQUVKLGFBRlAsV0FBVyxDQUVGLFVBQVUsRUFBRSxVQUFVLEVBQWlCLHNCQUFmLE9BQU8seURBQUcsRUFBRSxzQ0FGN0MsV0FBVztBQUdiLFVBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzdCLFVBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztBQUU3QixVQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQ3JDLFVBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksSUFBSSxhQTFCVCxPQUFPLENBMEJVLFlBQVk7QUFDOUQsZ0NBL0JHLHFCQUFxQixFQStCRCxVQUFVLENBQUMsS0FBSyxDQUFFLENBQzFDLENBQUM7O0FBQ0YsVUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLGFBN0JHLE9BQU8sQ0E2QkYsTUFBTTtBQUM1QywwQkFuQ0csZUFBZSxFQW1DRCxVQUFVLENBQUMsS0FBSyxFQUFFLGVBdEMxQixHQUFHLEVBc0MyQixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUUsQ0FDNUQsQ0FBQzs7QUFDRixVQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVosZ0JBQVUsQ0FBQyxRQUFRLGdCQTdCckIsYUFBYSxFQTZCeUIsVUFBQSxFQUFFLEVBQUk7QUFDeEMsY0FBSyxZQUFZLEdBQUcsTUFBSyxZQUFZLENB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VUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQztBQUN4RCxZQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUMsUUFBUSxDQUFFLENBQUM7O0FBRXBELFlBQU0sSUFBSSxHQUFHO0FBQ1gsa0JBQVUsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBO0FBQ2pFLFNBQUMsR0FBRyxVQUFVLENBQUM7O0FBRW5CLFlBQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUM7QUFDNUUsWUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUM7QUFDcEUsWUFBTSxHQUFHLEdBQUc7QUFDVixrQkFBVSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQTtBQUM3RCxTQUFDLEdBQUcsVUFBVSxDQUFDOztBQUVuQixlQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFFLENBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUUsRUFBRSxpQkFwTTNDLE1BQU0sRUFvTTRDO0FBQ3JELGNBQUksRUFBRSxJQUFJO0FBQ1YsYUFBRyxFQUFFLEdBQUcsRUFDVCxDQUFDLENBQUUsQ0FBQyxDQUNOLFlBckxHLFdBQVc7Ozs7O0FBd0xGLGFBQVciLCJmaWxlIjoibGF5b3V0LXN0b3JlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3QsIE1hcCB9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuLi8uLi91dGlsL3NldHRpbmdzJztcbmltcG9ydCB7IGNhbGN1bGF0ZUxheW91dCB9IGZyb20gJy4uLy4uL3V0aWwvYXV0by1sYXlvdXQnO1xuaW1wb3J0IHsgY2FsY3VsYXRlTWVhc3VyZW1lbnRzIH0gZnJvbSAnLi4vLi4vdXRpbC9hdXRvLW1lYXN1cmVtZW50cyc7XG5cbmltcG9ydCB7IFJlbW92ZVZlcnRleCwgUmVtb3ZlRWRnZSB9IGZyb20gJy4uL2dyYXBoL2dyYXBoLWFjdGlvbnMnO1xuaW1wb3J0IHsgU2F2ZVN0YXRlLCBSZXN0b3JlU3RhdGUgfSBmcm9tICcuLi9oaXN0b3J5L2hpc3RvcnktYWN0aW9ucyc7XG5pbXBvcnQgeyBDb29yZHMsIE1lYXN1cmVtZW50cywgTGF5b3V0LCBjb252ZXJ0IH0gZnJvbSAnLi9sYXlvdXQtbW9kZWwnO1xuaW1wb3J0IHtcbiAgQXV0b0xheW91dCxcbiAgSGFuZGxlRWRnZUluc2VydGVkLFxuICBNZWFzdXJlRWRnZSxcbiAgTWVhc3VyZVZlcnRleCxcbiAgTW92ZUVkZ2UsXG4gIE1vdmVWZXJ0ZXhcbn0gZnJvbSAnLi9sYXlvdXQtYWN0aW9ucyc7XG5cblxuY29uc3QgeyBsYXlvdXQ6IHsgZWRnZU9mZnNldCB9IH0gPSBzZXR0aW5ncztcblxuY29uc3QgWkVSTyA9IENvb3Jkcyh7IGxlZnQ6IDAsIHRvcDogMCB9KTtcbmNvbnN0IHsgbWluIH0gPSBNYXRoO1xuXG4vKipcbiAqIE1hbmFnZXMgdGhlIGdyYXBoIGxheW91dCBwcm9wLlxuICovXG5jbGFzcyBMYXlvdXRTdG9yZSB7XG5cbiAgY29uc3RydWN0b3IoIGRpc3BhdGNoZXIsIGdyYXBoU3RvcmUsIG9wdGlvbnMgPSB7fSApIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuICAgIHRoaXMuZ3JhcGhTdG9yZSA9IGdyYXBoU3RvcmU7XG5cbiAgICB0aGlzLnN0b3JlSWQgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgdGhpcy5tZWFzdXJlbWVudHMgPSBvcHRpb25zLm1lYXN1cmVtZW50cyB8fCBjb252ZXJ0Lm1lYXN1cmVtZW50cyhcbiAgICAgIGNhbGN1bGF0ZU1lYXN1cmVtZW50cyggZ3JhcGhTdG9yZS5ncmFwaCApXG4gICAgKTtcbiAgICB0aGlzLmxheW91dCA9IG9wdGlvbnMubGF5b3V0IHx8IGNvbnZlcnQubGF5b3V0KFxuICAgICAgY2FsY3VsYXRlTGF5b3V0KCBncmFwaFN0b3JlLmdyYXBoLCBNYXAodGhpcy5tZWFzdXJlbWVudHMpIClcbiAgICApO1xuICAgIHRoaXMuc2F2ZSgpO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggTWVhc3VyZVZlcnRleCwgZXYgPT4ge1xuICAgICAgdGhpcy5tZWFzdXJlbWVudHMgPSB0aGlzLm1lYXN1cmVtZW50cy5zZXRJbihcbiAgICAgICAgWyAndmVydGljZXMnLCBldi52ZXJ0ZXguaWQgXSxcbiAgICAgICAgZXYubWVhc3VyZW1lbnRzXG4gICAgICApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggTWVhc3VyZUVkZ2UsIGV2ID0+IHtcbiAgICAgIHRoaXMubWVhc3VyZW1lbnRzID0gdGhpcy5tZWFzdXJlbWVudHMuc2V0SW4oXG4gICAgICAgIFsgJ2VkZ2VzJywgZXYuZWRnZS5pZCBdLFxuICAgICAgICBldi5tZWFzdXJlbWVudHNcbiAgICAgICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBBdXRvTGF5b3V0LCBldiA9PiB7XG4gICAgICB0aGlzLmxheW91dCA9IGNvbnZlcnQubGF5b3V0KFxuICAgICAgICBjYWxjdWxhdGVMYXlvdXQoIGdyYXBoU3RvcmUuZ3JhcGgsIE1hcCh0aGlzLm1lYXN1cmVtZW50cykgKVxuICAgICAgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFJlbW92ZVZlcnRleCwgZXYgPT4ge1xuICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLmxheW91dC5yZW1vdmVJbiggWyAndmVydGljZXMnLCBldi52ZXJ0ZXhJZCBdICk7XG4gICAgICB0aGlzLm1lYXN1cmVtZW50cyA9IHRoaXMubWVhc3VyZW1lbnRzLnJlbW92ZUluKCBbICd2ZXJ0aWNlcycsIGV2LnZlcnRleElkIF0gKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFJlbW92ZUVkZ2UsIGV2ID0+IHtcbiAgICAgIHRoaXMubGF5b3V0ID0gdGhpcy5sYXlvdXQucmVtb3ZlSW4oIFsgJ2VkZ2VzJywgZXYuZWRnZUlkIF0gKTtcbiAgICAgIHRoaXMubWVhc3VyZW1lbnRzID0gdGhpcy5tZWFzdXJlbWVudHMucmVtb3ZlSW4oIFsgJ2VkZ2VzJywgZXYuZWRnZUlkIF0gKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIE1vdmVWZXJ0ZXgsIGV2ID0+IHtcbiAgICAgIGNvbnN0IGNvcnJlY3Rpb25PZmZzZXQgPSB0aGlzLmNvcnJlY3Rpb25PZmZzZXQoIGV2LnRvICk7XG4gICAgICB0aGlzLmxheW91dCA9IHRoaXMubGF5b3V0LnNldEluKCBbICd2ZXJ0aWNlcycsIGV2LnZlcnRleC5pZCBdLCBldi50byApO1xuICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLndpdGhDb3JyZWN0aW9uKCB0aGlzLmxheW91dCwgY29ycmVjdGlvbk9mZnNldCApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggTW92ZUVkZ2UsIGV2ID0+IHtcbiAgICAgIHRoaXMubGF5b3V0ID0gdGhpcy5sYXlvdXQuc2V0SW4oIFsgJ2VkZ2VzJywgZXYuZWRnZS5pZCBdLCBldi50byApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggSGFuZGxlRWRnZUluc2VydGVkLCBldiA9PiB7XG4gICAgICB0aGlzLmxheW91dCA9IHRoaXMucGxhY2VFZGdlKCBldi5lZGdlLCBldi5mcm9tLCBldi50byApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggUmVzdG9yZVN0YXRlLCBhY3QgPT4ge1xuICAgICAgaWYoIGFjdC5zdG9yZUlkID09PSB0aGlzLnN0b3JlSWQgKSB7XG4gICAgICAgIHRoaXMubGF5b3V0ID0gYWN0LnN0YXRlLmdldCgwKTtcbiAgICAgICAgdGhpcy5tZWFzdXJlbWVudHMgPSBhY3Quc3RhdGUuZ2V0KDEpO1xuICAgICAgfVxuICAgIH0gKTtcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoKCBTYXZlU3RhdGUoe1xuICAgICAgc3RvcmVJZDogdGhpcy5zdG9yZUlkLFxuICAgICAgc3RhdGU6IExpc3Qub2YoIHRoaXMubGF5b3V0LCB0aGlzLm1lYXN1cmVtZW50cyApXG4gICAgfSkgKTtcbiAgfVxuXG4gIGluc2VydCggbmV3TGF5b3V0LCByZW5hbWVSdWxlcyApIHtcbiAgICBjb25zdCBkaXNqb2ludExheW91dCA9IHJlbmFtZVJ1bGVzID9cbiAgICAgIHRoaXMuYXBwbHlSZW5hbWVSdWxlcyggbmV3TGF5b3V0LCByZW5hbWVSdWxlcyApIDpcbiAgICAgIG5ld0xheW91dDtcbiAgICB0aGlzLmxheW91dCA9IHRoaXMubGF5b3V0XG4gICAgICAuc2V0KCAnZWRnZXMnLCB0aGlzLmxheW91dC5lZGdlcy5tZXJnZSggZGlzam9pbnRMYXlvdXQuZWRnZXMgKSApXG4gICAgICAuc2V0KCAndmVydGljZXMnLCB0aGlzLmxheW91dC52ZXJ0aWNlcy5tZXJnZSggZGlzam9pbnRMYXlvdXQudmVydGljZXMgKSApO1xuICB9XG5cbiAgYXBwbHlSZW5hbWVSdWxlcyggbmV3TGF5b3V0LCByZW5hbWVSdWxlcyApIHtcbiAgICByZXR1cm4gTGF5b3V0KHtcbiAgICAgIGVkZ2VzOiByZW5hbWVkKCBuZXdMYXlvdXQuZWRnZXMsIHJlbmFtZVJ1bGVzLmdldCggJ2VkZ2VzJyApICksXG4gICAgICB2ZXJ0aWNlczogcmVuYW1lZCggbmV3TGF5b3V0LnZlcnRpY2VzLCByZW5hbWVSdWxlcy5nZXQoICd2ZXJ0aWNlcycgKSApXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiByZW5hbWVkKCBtYXAsIHJ1bGVzICkge1xuICAgICAgY29uc3Qgd29ya2luZ0NvcHkgPSB7fTtcbiAgICAgIG1hcC5mb3JFYWNoKCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBjb25zdCBuZXdLZXkgPSBydWxlcy5nZXQoIGtleSApIHx8IGtleTtcbiAgICAgICAgd29ya2luZ0NvcHlbIG5ld0tleSBdID0gdmFsdWU7XG4gICAgICB9ICk7XG4gICAgICByZXR1cm4gTWFwKHdvcmtpbmdDb3B5KTtcbiAgICB9XG4gIH1cblxuICBjb3JyZWN0aW9uT2Zmc2V0KCBub2RlQ29vcmRzLCBrbm93bkNvcnJlY3Rpb25PZmZzZXQgPSBaRVJPICkge1xuICAgIGlmKCBub2RlQ29vcmRzLmxlZnQgPj0gMCAmJiBub2RlQ29vcmRzLnRvcCA+PSAwICkge1xuICAgICAgcmV0dXJuIGtub3duQ29ycmVjdGlvbk9mZnNldDtcbiAgICB9XG4gICAgY29uc3QgY1ggPSBtaW4oIG5vZGVDb29yZHMubGVmdCwga25vd25Db3JyZWN0aW9uT2Zmc2V0LmxlZnQgKTtcbiAgICBjb25zdCBjWSA9IG1pbiggbm9kZUNvb3Jkcy50b3AsIGtub3duQ29ycmVjdGlvbk9mZnNldC50b3AgKTtcbiAgICByZXR1cm4gQ29vcmRzKHtcbiAgICAgIGxlZnQ6IGNYIDwgMCA/IG1pbiggY1gsIC0zMCApIDogY1gsXG4gICAgICB0b3A6IGNZIDwgMCA/IG1pbiggY1ksIC0zMCApIDogY1ksXG4gICAgfSk7XG4gIH1cblxuICB3aXRoQ29ycmVjdGlvbiggbGF5b3V0LCBvZmZzZXQgKSB7XG4gICAgaWYoIG9mZnNldCA9PT0gWkVSTyApIHtcbiAgICAgIHJldHVybiBsYXlvdXQ7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldExheW91dCA9IGxheW91dDtcbiAgICBbICd2ZXJ0aWNlcycsICdlZGdlcycgXS5mb3JFYWNoKCBraW5kID0+IHtcbiAgICAgIHRhcmdldExheW91dCA9IHRhcmdldExheW91dC51cGRhdGUoIGtpbmQsIGl0ZW1zID0+XG4gICAgICAgIGl0ZW1zLm1hcCggY29vcmRzID0+IGNvb3JkcyAmJiBDb29yZHMoe1xuICAgICAgICAgIGxlZnQ6IGNvb3Jkcy5sZWZ0IC0gb2Zmc2V0LmxlZnQsXG4gICAgICAgICAgdG9wOiBjb29yZHMudG9wIC0gb2Zmc2V0LnRvcFxuICAgICAgICB9KSApICk7XG4gICAgfSApO1xuICAgIHJldHVybiB0YXJnZXRMYXlvdXQ7XG4gIH1cblxuXG4gIG1vdmVTZWxlY3Rpb24oIHNlbGVjdGlvbiwgcmVmZXJlbmNlTGF5b3V0LCBvZmZzZXQgKSB7XG4gICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IG9mZnNldDtcblxuICAgIHZhciB0YXJnZXRMYXlvdXQgPSByZWZlcmVuY2VMYXlvdXQ7XG4gICAgdmFyIHRhcmdldENvcnJlY3Rpb24gPSBaRVJPO1xuXG4gICAgWyAndmVydGljZXMnLCAnZWRnZXMnIF0uZm9yRWFjaCgga2luZCA9PlxuICAgICAgc2VsZWN0aW9uWyBraW5kIF0uZm9yRWFjaCggaWQgPT4ge1xuICAgICAgICB0YXJnZXRMYXlvdXQgPSB0YXJnZXRMYXlvdXQudXBkYXRlSW4oIFsga2luZCwgaWQgXSwgY29vcmRzID0+IHtcbiAgICAgICAgICBpZiggIWNvb3JkcyApIHsgcmV0dXJuIGNvb3JkczsgfVxuICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IENvb3Jkcyh7XG4gICAgICAgICAgICBsZWZ0OiBjb29yZHMubGVmdCArIGxlZnQsXG4gICAgICAgICAgICB0b3A6IGNvb3Jkcy50b3AgKyB0b3BcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0YXJnZXRDb3JyZWN0aW9uID0gdGhpcy5jb3JyZWN0aW9uT2Zmc2V0KCBuZXdDb29yZHMsIHRhcmdldENvcnJlY3Rpb24gKTtcbiAgICAgICAgICByZXR1cm4gbmV3Q29vcmRzO1xuICAgICAgICB9ICk7XG4gICAgICB9IClcbiAgICApO1xuXG4gICAgdGhpcy5sYXlvdXQgPSB0aGlzLndpdGhDb3JyZWN0aW9uKCB0YXJnZXRMYXlvdXQsIHRhcmdldENvcnJlY3Rpb24gKTtcbiAgICB0aGlzLnNhdmUoKTtcbiAgfVxuXG4gIHBsYWNlRWRnZSggZWRnZSwgZnJvbSwgdG8gKSB7XG4gICAgY29uc3QgeyBtZWFzdXJlbWVudHMsIGxheW91dCB9ID0gdGhpcztcbiAgICBjb25zdCBmcm9tTWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmdldCggZnJvbS52ZXJ0ZXhJZCApO1xuICAgIGNvbnN0IHRvTWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmdldCggdG8udmVydGV4SWQgKTtcbiAgICBjb25zdCBmcm9tQ29vcmRzID0gbGF5b3V0LnZlcnRpY2VzLmdldCggZnJvbS52ZXJ0ZXhJZCApO1xuICAgIGNvbnN0IHRvQ29vcmRzID0gbGF5b3V0LnZlcnRpY2VzLmdldCggdG8udmVydGV4SWQgKTtcblxuICAgIGNvbnN0IGxlZnQgPSAoXG4gICAgICBmcm9tQ29vcmRzLmxlZnQgKyBmcm9tTWVhc3VyZW1lbnRzLmRpbWVuc2lvbnMud2lkdGggKyB0b0Nvb3Jkcy5sZWZ0XG4gICAgKSAvIDIgLSBlZGdlT2Zmc2V0O1xuXG4gICAgY29uc3QgZnJvbVBvcnRCb3ggPSBmcm9tTWVhc3VyZW1lbnRzLmdldEluKFsgZnJvbS5kaXJlY3Rpb24sIGZyb20ucG9ydElkIF0pO1xuICAgIGNvbnN0IHRvUG9ydEJveCA9IHRvTWVhc3VyZW1lbnRzLmdldEluKFsgdG8uZGlyZWN0aW9uLCB0by5wb3J0SWQgXSk7XG4gICAgY29uc3QgdG9wID0gKFxuICAgICAgZnJvbUNvb3Jkcy50b3AgKyBmcm9tUG9ydEJveC50b3AgKyB0b0Nvb3Jkcy50b3AgKyB0b1BvcnRCb3gudG9wXG4gICAgKSAvIDIgLSBlZGdlT2Zmc2V0O1xuXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0LnNldEluKCBbICdlZGdlcycsIGVkZ2UuaWQgXSwgQ29vcmRzKHtcbiAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICB0b3A6IHRvcFxuICAgIH0pICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0U3RvcmU7XG4iXX0=