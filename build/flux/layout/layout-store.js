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

        console.log("CORRECTION!");

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2xheW91dC9sYXlvdXQtc3RvcmUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQmtCLFlBQVUsd0JBQXBCLE1BQU0sQ0FBSSxVQUFVOztBQUU1QixNQUFNLElBQUksR0FBRyxpQkFiSixNQUFNLEVBYUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLEtBQUcsR0FBSyxJQUFJLENBQVosR0FBRzs7Ozs7QUFLTCxhQUFXOztBQUVKLGFBRlAsV0FBVyxDQUVGLFVBQVUsRUFBRSxVQUFVLEVBQWlCLHNCQUFmLE9BQU8seURBQUcsRUFBRSxzQ0FGN0MsV0FBVztBQUdiLFVBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzdCLFVBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOztBQUU3QixVQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQ3JDLFVBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksSUFBSSxhQTFCVCxPQUFPLENBMEJVLFlBQVk7QUFDOUQsZ0NBL0JHLHFCQUFxQixFQStCRCxVQUFVLENBQUMsS0FBSyxDQUFFLENBQzFDLENBQUM7O0FBQ0YsVUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLGFBN0JHLE9BQU8sQ0E2QkYsTUFBTTtBQUM1QywwQkFuQ0csZUFBZSxFQW1DRCxVQUFVLENBQUMsS0FBSyxFQUFFLGVBdEMxQixHQUFHLEVBc0MyQixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUUsQ0FDNUQsQ0FBQzs7QUFDRixVQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVosZ0JBQVUsQ0FBQyxRQUFRLGdCQTdCckIsYUFBYSxFQTZCeUIsVUFBQSxFQUFFLEVBQUk7QUFDeEMsY0FBSyxZQUFZLEdBQUcsTUFBSyxZQUFZLENB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IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHNldHRpbmdzIGZyb20gJy4uLy4uL3V0aWwvc2V0dGluZ3MnO1xuaW1wb3J0IHsgY2FsY3VsYXRlTGF5b3V0IH0gZnJvbSAnLi4vLi4vdXRpbC9hdXRvLWxheW91dCc7XG5pbXBvcnQgeyBjYWxjdWxhdGVNZWFzdXJlbWVudHMgfSBmcm9tICcuLi8uLi91dGlsL2F1dG8tbWVhc3VyZW1lbnRzJztcblxuaW1wb3J0IHsgUmVtb3ZlVmVydGV4LCBSZW1vdmVFZGdlIH0gZnJvbSAnLi4vZ3JhcGgvZ3JhcGgtYWN0aW9ucyc7XG5pbXBvcnQgeyBTYXZlU3RhdGUsIFJlc3RvcmVTdGF0ZSB9IGZyb20gJy4uL2hpc3RvcnkvaGlzdG9yeS1hY3Rpb25zJztcbmltcG9ydCB7IENvb3JkcywgTWVhc3VyZW1lbnRzLCBMYXlvdXQsIGNvbnZlcnQgfSBmcm9tICcuL2xheW91dC1tb2RlbCc7XG5pbXBvcnQge1xuICBBdXRvTGF5b3V0LFxuICBIYW5kbGVFZGdlSW5zZXJ0ZWQsXG4gIE1lYXN1cmVFZGdlLFxuICBNZWFzdXJlVmVydGV4LFxuICBNb3ZlRWRnZSxcbiAgTW92ZVZlcnRleFxufSBmcm9tICcuL2xheW91dC1hY3Rpb25zJztcblxuXG5jb25zdCB7IGxheW91dDogeyBlZGdlT2Zmc2V0IH0gfSA9IHNldHRpbmdzO1xuXG5jb25zdCBaRVJPID0gQ29vcmRzKHsgbGVmdDogMCwgdG9wOiAwIH0pO1xuY29uc3QgeyBtaW4gfSA9IE1hdGg7XG5cbi8qKlxuICogTWFuYWdlcyB0aGUgZ3JhcGggbGF5b3V0IHByb3AuXG4gKi9cbmNsYXNzIExheW91dFN0b3JlIHtcblxuICBjb25zdHJ1Y3RvciggZGlzcGF0Y2hlciwgZ3JhcGhTdG9yZSwgb3B0aW9ucyA9IHt9ICkge1xuICAgIHRoaXMuZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XG4gICAgdGhpcy5ncmFwaFN0b3JlID0gZ3JhcGhTdG9yZTtcblxuICAgIHRoaXMuc3RvcmVJZCA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLm1lYXN1cmVtZW50cyA9IG9wdGlvbnMubWVhc3VyZW1lbnRzIHx8IGNvbnZlcnQubWVhc3VyZW1lbnRzKFxuICAgICAgY2FsY3VsYXRlTWVhc3VyZW1lbnRzKCBncmFwaFN0b3JlLmdyYXBoIClcbiAgICApO1xuICAgIHRoaXMubGF5b3V0ID0gb3B0aW9ucy5sYXlvdXQgfHwgY29udmVydC5sYXlvdXQoXG4gICAgICBjYWxjdWxhdGVMYXlvdXQoIGdyYXBoU3RvcmUuZ3JhcGgsIE1hcCh0aGlzLm1lYXN1cmVtZW50cykgKVxuICAgICk7XG4gICAgdGhpcy5zYXZlKCk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBNZWFzdXJlVmVydGV4LCBldiA9PiB7XG4gICAgICB0aGlzLm1lYXN1cmVtZW50cyA9IHRoaXMubWVhc3VyZW1lbnRzLnNldEluKFxuICAgICAgICBbICd2ZXJ0aWNlcycsIGV2LnZlcnRleC5pZCBdLFxuICAgICAgICBldi5tZWFzdXJlbWVudHNcbiAgICAgICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBNZWFzdXJlRWRnZSwgZXYgPT4ge1xuICAgICAgdGhpcy5tZWFzdXJlbWVudHMgPSB0aGlzLm1lYXN1cmVtZW50cy5zZXRJbihcbiAgICAgICAgWyAnZWRnZXMnLCBldi5lZGdlLmlkIF0sXG4gICAgICAgIGV2Lm1lYXN1cmVtZW50c1xuICAgICAgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIEF1dG9MYXlvdXQsIGV2ID0+IHtcbiAgICAgIHRoaXMubGF5b3V0ID0gY29udmVydC5sYXlvdXQoXG4gICAgICAgIGNhbGN1bGF0ZUxheW91dCggZ3JhcGhTdG9yZS5ncmFwaCwgTWFwKHRoaXMubWVhc3VyZW1lbnRzKSApXG4gICAgICApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggUmVtb3ZlVmVydGV4LCBldiA9PiB7XG4gICAgICB0aGlzLmxheW91dCA9IHRoaXMubGF5b3V0LnJlbW92ZUluKCBbICd2ZXJ0aWNlcycsIGV2LnZlcnRleElkIF0gKTtcbiAgICAgIHRoaXMubWVhc3VyZW1lbnRzID0gdGhpcy5tZWFzdXJlbWVudHMucmVtb3ZlSW4oIFsgJ3ZlcnRpY2VzJywgZXYudmVydGV4SWQgXSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggUmVtb3ZlRWRnZSwgZXYgPT4ge1xuICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLmxheW91dC5yZW1vdmVJbiggWyAnZWRnZXMnLCBldi5lZGdlSWQgXSApO1xuICAgICAgdGhpcy5tZWFzdXJlbWVudHMgPSB0aGlzLm1lYXN1cmVtZW50cy5yZW1vdmVJbiggWyAnZWRnZXMnLCBldi5lZGdlSWQgXSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggTW92ZVZlcnRleCwgZXYgPT4ge1xuICAgICAgY29uc3QgY29ycmVjdGlvbk9mZnNldCA9IHRoaXMuY29ycmVjdGlvbk9mZnNldCggZXYudG8gKTtcbiAgICAgIHRoaXMubGF5b3V0ID0gdGhpcy5sYXlvdXQuc2V0SW4oIFsgJ3ZlcnRpY2VzJywgZXYudmVydGV4LmlkIF0sIGV2LnRvICk7XG4gICAgICB0aGlzLmxheW91dCA9IHRoaXMud2l0aENvcnJlY3Rpb24oIHRoaXMubGF5b3V0LCBjb3JyZWN0aW9uT2Zmc2V0ICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBNb3ZlRWRnZSwgZXYgPT4ge1xuICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLmxheW91dC5zZXRJbiggWyAnZWRnZXMnLCBldi5lZGdlLmlkIF0sIGV2LnRvICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBIYW5kbGVFZGdlSW5zZXJ0ZWQsIGV2ID0+IHtcbiAgICAgIHRoaXMubGF5b3V0ID0gdGhpcy5wbGFjZUVkZ2UoIGV2LmVkZ2UsIGV2LmZyb20sIGV2LnRvICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZXN0b3JlU3RhdGUsIGFjdCA9PiB7XG4gICAgICBpZiggYWN0LnN0b3JlSWQgPT09IHRoaXMuc3RvcmVJZCApIHtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBhY3Quc3RhdGUuZ2V0KDApO1xuICAgICAgICB0aGlzLm1lYXN1cmVtZW50cyA9IGFjdC5zdGF0ZS5nZXQoMSk7XG4gICAgICB9XG4gICAgfSApO1xuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIuZGlzcGF0Y2goIFNhdmVTdGF0ZSh7XG4gICAgICBzdG9yZUlkOiB0aGlzLnN0b3JlSWQsXG4gICAgICBzdGF0ZTogTGlzdC5vZiggdGhpcy5sYXlvdXQsIHRoaXMubWVhc3VyZW1lbnRzIClcbiAgICB9KSApO1xuICB9XG5cbiAgaW5zZXJ0KCBuZXdMYXlvdXQsIHJlbmFtZVJ1bGVzICkge1xuICAgIGNvbnN0IGRpc2pvaW50TGF5b3V0ID0gcmVuYW1lUnVsZXMgP1xuICAgICAgdGhpcy5hcHBseVJlbmFtZVJ1bGVzKCBuZXdMYXlvdXQsIHJlbmFtZVJ1bGVzICkgOlxuICAgICAgbmV3TGF5b3V0O1xuICAgIHRoaXMubGF5b3V0ID0gdGhpcy5sYXlvdXRcbiAgICAgIC5zZXQoICdlZGdlcycsIHRoaXMubGF5b3V0LmVkZ2VzLm1lcmdlKCBkaXNqb2ludExheW91dC5lZGdlcyApIClcbiAgICAgIC5zZXQoICd2ZXJ0aWNlcycsIHRoaXMubGF5b3V0LnZlcnRpY2VzLm1lcmdlKCBkaXNqb2ludExheW91dC52ZXJ0aWNlcyApICk7XG4gIH1cblxuICBhcHBseVJlbmFtZVJ1bGVzKCBuZXdMYXlvdXQsIHJlbmFtZVJ1bGVzICkge1xuICAgIHJldHVybiBMYXlvdXQoe1xuICAgICAgZWRnZXM6IHJlbmFtZWQoIG5ld0xheW91dC5lZGdlcywgcmVuYW1lUnVsZXMuZ2V0KCAnZWRnZXMnICkgKSxcbiAgICAgIHZlcnRpY2VzOiByZW5hbWVkKCBuZXdMYXlvdXQudmVydGljZXMsIHJlbmFtZVJ1bGVzLmdldCggJ3ZlcnRpY2VzJyApIClcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHJlbmFtZWQoIG1hcCwgcnVsZXMgKSB7XG4gICAgICBjb25zdCB3b3JraW5nQ29weSA9IHt9O1xuICAgICAgbWFwLmZvckVhY2goICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IHJ1bGVzLmdldCgga2V5ICkgfHwga2V5O1xuICAgICAgICB3b3JraW5nQ29weVsgbmV3S2V5IF0gPSB2YWx1ZTtcbiAgICAgIH0gKTtcbiAgICAgIHJldHVybiBNYXAod29ya2luZ0NvcHkpO1xuICAgIH1cbiAgfVxuXG4gIGNvcnJlY3Rpb25PZmZzZXQoIG5vZGVDb29yZHMsIGtub3duQ29ycmVjdGlvbk9mZnNldCA9IFpFUk8gKSB7XG4gICAgaWYoIG5vZGVDb29yZHMubGVmdCA+PSAwICYmIG5vZGVDb29yZHMudG9wID49IDAgKSB7XG4gICAgICByZXR1cm4ga25vd25Db3JyZWN0aW9uT2Zmc2V0O1xuICAgIH1cbiAgICBjb25zdCBjWCA9IG1pbiggbm9kZUNvb3Jkcy5sZWZ0LCBrbm93bkNvcnJlY3Rpb25PZmZzZXQubGVmdCApO1xuICAgIGNvbnN0IGNZID0gbWluKCBub2RlQ29vcmRzLnRvcCwga25vd25Db3JyZWN0aW9uT2Zmc2V0LnRvcCApO1xuICAgIHJldHVybiBDb29yZHMoe1xuICAgICAgbGVmdDogY1ggPCAwID8gbWluKCBjWCwgLTMwICkgOiBjWCxcbiAgICAgIHRvcDogY1kgPCAwID8gbWluKCBjWSwgLTMwICkgOiBjWSxcbiAgICB9KTtcbiAgfVxuXG4gIHdpdGhDb3JyZWN0aW9uKCBsYXlvdXQsIG9mZnNldCApIHtcbiAgICBpZiggb2Zmc2V0ID09PSBaRVJPICkge1xuICAgICAgcmV0dXJuIGxheW91dDtcbiAgICB9XG4gICAgY29uc29sZS5sb2coIFwiQ09SUkVDVElPTiFcIiApO1xuXG4gICAgdmFyIHRhcmdldExheW91dCA9IGxheW91dDtcbiAgICBbICd2ZXJ0aWNlcycsICdlZGdlcycgXS5mb3JFYWNoKCBraW5kID0+IHtcbiAgICAgIHRhcmdldExheW91dCA9IHRhcmdldExheW91dC51cGRhdGUoIGtpbmQsIGl0ZW1zID0+XG4gICAgICAgIGl0ZW1zLm1hcCggY29vcmRzID0+IGNvb3JkcyAmJiBDb29yZHMoe1xuICAgICAgICAgIGxlZnQ6IGNvb3Jkcy5sZWZ0IC0gb2Zmc2V0LmxlZnQsXG4gICAgICAgICAgdG9wOiBjb29yZHMudG9wIC0gb2Zmc2V0LnRvcFxuICAgICAgICB9KSApICk7XG4gICAgfSApO1xuICAgIHJldHVybiB0YXJnZXRMYXlvdXQ7XG4gIH1cblxuXG4gIG1vdmVTZWxlY3Rpb24oIHNlbGVjdGlvbiwgcmVmZXJlbmNlTGF5b3V0LCBvZmZzZXQgKSB7XG4gICAgY29uc3QgeyBsZWZ0LCB0b3AgfSA9IG9mZnNldDtcblxuICAgIHZhciB0YXJnZXRMYXlvdXQgPSByZWZlcmVuY2VMYXlvdXQ7XG4gICAgdmFyIHRhcmdldENvcnJlY3Rpb24gPSBaRVJPO1xuXG4gICAgWyAndmVydGljZXMnLCAnZWRnZXMnIF0uZm9yRWFjaCgga2luZCA9PlxuICAgICAgc2VsZWN0aW9uWyBraW5kIF0uZm9yRWFjaCggaWQgPT4ge1xuICAgICAgICB0YXJnZXRMYXlvdXQgPSB0YXJnZXRMYXlvdXQudXBkYXRlSW4oIFsga2luZCwgaWQgXSwgY29vcmRzID0+IHtcbiAgICAgICAgICBpZiggIWNvb3JkcyApIHsgcmV0dXJuIGNvb3JkczsgfVxuICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkcyA9IENvb3Jkcyh7XG4gICAgICAgICAgICBsZWZ0OiBjb29yZHMubGVmdCArIGxlZnQsXG4gICAgICAgICAgICB0b3A6IGNvb3Jkcy50b3AgKyB0b3BcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0YXJnZXRDb3JyZWN0aW9uID0gdGhpcy5jb3JyZWN0aW9uT2Zmc2V0KCBuZXdDb29yZHMsIHRhcmdldENvcnJlY3Rpb24gKTtcbiAgICAgICAgICByZXR1cm4gbmV3Q29vcmRzO1xuICAgICAgICB9ICk7XG4gICAgICB9IClcbiAgICApO1xuXG4gICAgdGhpcy5sYXlvdXQgPSB0aGlzLndpdGhDb3JyZWN0aW9uKCB0YXJnZXRMYXlvdXQsIHRhcmdldENvcnJlY3Rpb24gKTtcbiAgICB0aGlzLnNhdmUoKTtcbiAgfVxuXG4gIHBsYWNlRWRnZSggZWRnZSwgZnJvbSwgdG8gKSB7XG4gICAgY29uc3QgeyBtZWFzdXJlbWVudHMsIGxheW91dCB9ID0gdGhpcztcbiAgICBjb25zdCBmcm9tTWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmdldCggZnJvbS52ZXJ0ZXhJZCApO1xuICAgIGNvbnN0IHRvTWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRzLnZlcnRpY2VzLmdldCggdG8udmVydGV4SWQgKTtcbiAgICBjb25zdCBmcm9tQ29vcmRzID0gbGF5b3V0LnZlcnRpY2VzLmdldCggZnJvbS52ZXJ0ZXhJZCApO1xuICAgIGNvbnN0IHRvQ29vcmRzID0gbGF5b3V0LnZlcnRpY2VzLmdldCggdG8udmVydGV4SWQgKTtcblxuICAgIGNvbnN0IGxlZnQgPSAoXG4gICAgICBmcm9tQ29vcmRzLmxlZnQgKyBmcm9tTWVhc3VyZW1lbnRzLmRpbWVuc2lvbnMud2lkdGggKyB0b0Nvb3Jkcy5sZWZ0XG4gICAgKSAvIDIgLSBlZGdlT2Zmc2V0O1xuXG4gICAgY29uc3QgZnJvbVBvcnRCb3ggPSBmcm9tTWVhc3VyZW1lbnRzLmdldEluKFsgZnJvbS5kaXJlY3Rpb24sIGZyb20ucG9ydElkIF0pO1xuICAgIGNvbnN0IHRvUG9ydEJveCA9IHRvTWVhc3VyZW1lbnRzLmdldEluKFsgdG8uZGlyZWN0aW9uLCB0by5wb3J0SWQgXSk7XG4gICAgY29uc3QgdG9wID0gKFxuICAgICAgZnJvbUNvb3Jkcy50b3AgKyBmcm9tUG9ydEJveC50b3AgKyB0b0Nvb3Jkcy50b3AgKyB0b1BvcnRCb3gudG9wXG4gICAgKSAvIDIgLSBlZGdlT2Zmc2V0O1xuXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0LnNldEluKCBbICdlZGdlcycsIGVkZ2UuaWQgXSwgQ29vcmRzKHtcbiAgICAgIGxlZnQ6IGxlZnQsXG4gICAgICB0b3A6IHRvcFxuICAgIH0pICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0U3RvcmU7XG4iXX0=