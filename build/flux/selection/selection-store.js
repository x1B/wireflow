define(['exports', 'module', 'immutable', '../history/history-actions', '../graph/graph-actions', '../graph/graph-model', '../layout/layout-model', './selection-model', './selection-actions'], function (exports, module, _immutable, _historyHistoryActions, _graphGraphActions, _graphGraphModel, _layoutLayoutModel, _selectionModel, _selectionActions) {'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}var 























  SelectionStore = (function () {

    function SelectionStore(dispatcher, layoutStore, graphStore) {var _this = this;_classCallCheck(this, SelectionStore);
      this.dispatcher = dispatcher;
      this.layoutStore = layoutStore;
      this.graphStore = graphStore;

      this.selection = (0, _selectionModel.Selection)();
      this.fakeClipboard = (0, _selectionModel.Clipboard)();

      this.moveReference = { id: null };
      this.storeId = this.constructor.name;
      this.save();

      dispatcher.register(_selectionActions.ClearSelection, function (act) {
        _this.clear();});


      dispatcher.register(_graphGraphActions.RemoveVertex, function (act) {
        _this.selection = _this.selection.
        update('vertices', function (_) {return _.remove(act.vertexId);});
        _this.save();});


      dispatcher.register(_graphGraphActions.RemoveEdge, function (act) {
        _this.selection = _this.selection.
        update('edges', function (_) {return _.remove(act.edgeId);});
        _this.save();});


      dispatcher.register(_selectionActions.ResizeSelection, function (act) {
        var extensionOf = 
        act.isExtension ? _this.selection.extensionOf || _this.selection : null;
        _this.selection = _this.selection.
        set('extensionOf', extensionOf).
        set('coords', act.coords).
        set('dimensions', act.dimensions);
        _this.updateRectangleContents();});


      dispatcher.register(_selectionActions.SelectEdge, function (act) {
        _this.selection = _this.selection.
        update('edges', function (_) {return _.add(act.edge.id);});
        _this.save();});


      dispatcher.register(_selectionActions.DeselectEdge, function (act) {
        _this.selection = _this.selection.
        update('edges', function (_) {return _.remove(act.edge.id);});
        _this.save();});


      dispatcher.register(_selectionActions.SelectVertex, function (act) {
        _this.selection = _this.selection.
        update('vertices', function (_) {return _.add(act.vertex.id);});
        _this.save();});


      dispatcher.register(_selectionActions.DeselectVertex, function (act) {
        _this.selection = _this.selection.
        update('vertices', function (_) {return _.remove(act.vertex.id);});
        _this.save();});


      dispatcher.register(_selectionActions.MoveSelection, function (act) {
        _this.moveContents(act.reference, act.offset);
        _this.save();});


      dispatcher.register(_selectionActions.DeleteSelection, function (act) {
        _this['delete']();});


      dispatcher.register(_selectionActions.CutSelection, function (act) {
        _this.copyToClipboard(act.cutEvent);
        _this['delete']();});


      dispatcher.register(_selectionActions.CopySelection, function (act) {
        _this.copyToClipboard(act.copyEvent);});


      dispatcher.register(_selectionActions.PasteClipboard, function (act) {
        _this.pasteClipboard(act.pasteEvent);});}_createClass(SelectionStore, [{ key: 'copyToClipboard', value: 



      function copyToClipboard(clipboardEvent) {
        if (this.isEmpty()) {
          return;}


        this.fakeClipboard = (0, _selectionModel.Clipboard)({ 
          graph: this.selectionGraph(), 
          layout: this.selectionLayout() });


        if (clipboardEvent) {
          var jsonClipboard = JSON.stringify(this.fakeClipboard.toJS());
          clipboardEvent.clipboardData.setData('application/json', jsonClipboard);
          clipboardEvent.clipboardData.setData('text/plain', jsonClipboard);}} }, { key: 'pasteClipboard', value: 



      function pasteClipboard(pasteEvent) {
        // :TODO: use event clipboard!
        var _fakeClipboard = 
        this.fakeClipboard;var graph = _fakeClipboard.graph;var layout = _fakeClipboard.layout;
        var renameRules = this.graphStore.renameRules(graph);
        this.graphStore.insert(graph, renameRules);
        this.layoutStore.insert(layout, renameRules);
        this.graphStore.pruneEmptyEdges();} }, { key: 'delete', value: 


      function _delete() {var 
        dispatcher = this.dispatcher;var _selection = 
        this.selection;var vertices = _selection.vertices;var edges = _selection.edges;
        vertices.forEach(function (_, id) {
          dispatcher.dispatch((0, _graphGraphActions.RemoveVertex)({ vertexId: id }));});

        edges.forEach(function (_, id) {
          dispatcher.dispatch((0, _graphGraphActions.RemoveEdge)({ edgeId: id }));});} }, { key: 'save', value: 



      function save() {
        this.dispatcher.dispatch((0, _historyHistoryActions.SaveState)({ 
          storeId: this.storeId, 
          state: this.selection }));} }, { key: 'clear', value: 



      function clear() {
        this.selection = 
        this.selection.set('edges', (0, _immutable.Set)()).set('vertices', (0, _immutable.Set)());} }, { key: 'moveContents', value: 


      function moveContents(reference, offset) {
        if (reference.id !== this.moveReference.id) {
          this.moveReference = { 
            id: reference.id, 
            coords: reference.coords, 
            layout: this.layoutStore.layout };}



        this.layoutStore.moveSelection(
        this.selection, 
        this.moveReference.layout, 
        offset);} }, { key: 'updateRectangleContents', value: 



      function updateRectangleContents() {
        if (!this.selection.dimensions) {
          return;}var 


        extensionOf = this.selection.extensionOf;var _layoutStore = 
        this.layoutStore;var measurements = _layoutStore.measurements;var layout = _layoutStore.layout;
        var edgesToKeep = extensionOf ? extensionOf.edges : (0, _immutable.Set)();
        var verticesToKeep = extensionOf ? extensionOf.vertices : (0, _immutable.Set)();

        var vertexSet = this.nodeSet(
        measurements.vertices.toJS(), 
        layout.vertices.toJS(), 
        verticesToKeep);


        var edgeSet = this.nodeSet(
        measurements.edges.toJS(), 
        layout.edges.toJS(), 
        edgesToKeep);


        this.selection = (0, _selectionModel.Selection)({ 
          coords: this.selection.coords, 
          dimensions: this.selection.dimensions, 
          extensionOf: this.selection.extensionOf, 
          vertices: vertexSet, 
          edges: edgeSet });}




      // pure helpers
    }, { key: 'isEmpty', value: 
      function isEmpty() {
        return this.selection.vertices.isEmpty() && 
        this.selection.edges.isEmpty();} }, { key: 'implicitEdges', value: 


      function implicitEdges(vertexSet) {
        var vertices = this.graphStore.graph.vertices;
        var edgeIds = {};
        vertexSet.valueSeq().
        map(function (vId) {return vertices.get(vId);}).
        flatMap(function (v) {return _graphGraphModel.Directions.flatMap(function (d) {return v.ports[d];});}).
        filter(function (p) {return p.edgeId;}).
        forEach(function (p) {return edgeIds[p.edgeId] = true;});
        return _immutable.Set.fromKeys(edgeIds);} }, { key: 'selectionGraph', value: 


      function selectionGraph() {
        var s = this.selection;
        var graph = this.graphStore.graph;
        var implicitEdges = this.implicitEdges(s.vertices);
        return (0, _graphGraphModel.Graph)({ 
          vertices: graph.vertices.filter(function (_, vId) {return s.vertices.has(vId);}), 
          edges: graph.edges.filter(function (_, eId) {return (
              s.edges.has(eId) || implicitEdges.has(eId));}) });} }, { key: 'selectionLayout', value: 




      function selectionLayout() {
        var s = this.selection;
        var layout = this.layoutStore.layout;
        return (0, _layoutLayoutModel.Layout)({ 
          vertices: layout.vertices.filter(function (_, vId) {return s.vertices.has(vId);}), 
          edges: layout.edges.filter(function (_, eId) {return s.edges.has(eId);}) });} }, { key: 'nodeSet', value: 



      function nodeSet(jsNodeMeasurements, jsNodeCoords, toKeep) {var _selection2 = 
        this.selection;var coords = _selection2.coords;var dimensions = _selection2.dimensions;
        var matches = {};
        for (var id in jsNodeMeasurements) {
          if (!jsNodeMeasurements.hasOwnProperty(id) || !jsNodeCoords[id]) {
            continue;}

          if (toKeep.has(id)) {
            matches[id] = true;
            continue;}var _jsNodeCoords$id = 

          jsNodeCoords[id];var left = _jsNodeCoords$id.left;var _top = _jsNodeCoords$id.top;var _jsNodeMeasurements$id$dimensions = 
          jsNodeMeasurements[id].dimensions;var width = _jsNodeMeasurements$id$dimensions.width;var height = _jsNodeMeasurements$id$dimensions.height;
          if (left + width < coords.left || 
          left > coords.left + dimensions.width) {
            continue;}

          if (_top + height < coords.top || 
          _top > coords.top + dimensions.height) {
            continue;}

          matches[id] = true;}

        return _immutable.Set.fromKeys(matches);} }]);return SelectionStore;})();module.exports = 



  SelectionStore;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L3NlbGVjdGlvbi9zZWxlY3Rpb24tc3RvcmUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCTSxnQkFBYzs7QUFFUCxhQUZQLGNBQWMsQ0FFTCxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRyx3Q0FGL0MsY0FBYztBQUdoQixVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztBQUM3QixVQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUMvQixVQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLFNBQVMsR0FBRyxvQkF4QkQsU0FBUyxHQXdCRyxDQUFDO0FBQzdCLFVBQUksQ0FBQyxhQUFhLEdBQUcsb0JBekJoQixTQUFTLEdBeUJrQixDQUFDOztBQUVqQyxVQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ2xDLFVBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7QUFDckMsVUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVaLGdCQUFVLENBQUMsUUFBUSxtQkF4QnJCLGNBQWMsRUF3QnlCLFVBQUEsR0FBRyxFQUFJO0FBQzFDLGNBQUssS0FBSyxFQUFFLENBQUMsQ0FDZCxDQUFFLENBQUM7OztBQUVKLGdCQUFVLENBQUMsUUFBUSxvQkF2Q2QsWUFBWSxFQXVDa0IsVUFBQSxHQUFHLEVBQUk7QUFDeEMsY0FBSyxTQUFTLEdBQUcsTUFBSyxTQUFTO0FBQzVCLGNBQU0sQ0FBRSxVQUFVLEVBQUUsVUFBQSxDQUFDLFVBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBRSxHQUFHLENBQUMsUUFBUSxDQUFFLEVBQUEsQ0FBRSxDQUFDO0FBQ3ZELGNBQUssSUFBSSxFQUFFLENBQUMsQ0FDYixDQUFFLENBQUM7OztBQUVKLGdCQUFVLENBQUMsUUFBUSxvQkE3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QUUsRUFBRSxDQUFFLEdBQUcsSUFBSSxDQUFDLENBQ3RCOztBQUNELGVBQU8sV0EvUUYsR0FBRyxDQStRRyxRQUFRLENBQUUsT0FBTyxDQUFFLENBQUMsQ0FDaEMsWUF4UEcsY0FBYzs7OztBQTJQTCxnQkFBYyIsImZpbGUiOiJzZWxlY3Rpb24tc3RvcmUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2V0IH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHsgU2F2ZVN0YXRlIH0gZnJvbSAnLi4vaGlzdG9yeS9oaXN0b3J5LWFjdGlvbnMnO1xuaW1wb3J0IHsgUmVtb3ZlVmVydGV4LCBSZW1vdmVFZGdlIH0gZnJvbSAnLi4vZ3JhcGgvZ3JhcGgtYWN0aW9ucyc7XG5pbXBvcnQgeyBHcmFwaCwgRGlyZWN0aW9ucyB9IGZyb20gJy4uL2dyYXBoL2dyYXBoLW1vZGVsJztcbmltcG9ydCB7IExheW91dCB9IGZyb20gJy4uL2xheW91dC9sYXlvdXQtbW9kZWwnO1xuXG5pbXBvcnQgeyBDbGlwYm9hcmQsIFNlbGVjdGlvbiB9IGZyb20gJy4vc2VsZWN0aW9uLW1vZGVsJztcblxuaW1wb3J0IHtcbiAgQ29weVNlbGVjdGlvbixcbiAgQ3V0U2VsZWN0aW9uLFxuICBQYXN0ZUNsaXBib2FyZCxcbiAgUmVzaXplU2VsZWN0aW9uLFxuICBDbGVhclNlbGVjdGlvbixcbiAgTW92ZVNlbGVjdGlvbixcbiAgRGVzZWxlY3RWZXJ0ZXgsXG4gIFNlbGVjdFZlcnRleCxcbiAgRGVzZWxlY3RFZGdlLFxuICBTZWxlY3RFZGdlLFxuICBEZWxldGVTZWxlY3Rpb25cbn0gZnJvbSAnLi9zZWxlY3Rpb24tYWN0aW9ucyc7XG5cblxuY2xhc3MgU2VsZWN0aW9uU3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKCBkaXNwYXRjaGVyLCBsYXlvdXRTdG9yZSwgZ3JhcGhTdG9yZSApIHtcbiAgICB0aGlzLmRpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuICAgIHRoaXMubGF5b3V0U3RvcmUgPSBsYXlvdXRTdG9yZTtcbiAgICB0aGlzLmdyYXBoU3RvcmUgPSBncmFwaFN0b3JlO1xuXG4gICAgdGhpcy5zZWxlY3Rpb24gPSBTZWxlY3Rpb24oKTtcbiAgICB0aGlzLmZha2VDbGlwYm9hcmQgPSBDbGlwYm9hcmQoKTtcblxuICAgIHRoaXMubW92ZVJlZmVyZW5jZSA9IHsgaWQ6IG51bGwgfTtcbiAgICB0aGlzLnN0b3JlSWQgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgdGhpcy5zYXZlKCk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBDbGVhclNlbGVjdGlvbiwgYWN0ID0+IHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZW1vdmVWZXJ0ZXgsIGFjdCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgIC51cGRhdGUoICd2ZXJ0aWNlcycsIF8gPT4gXy5yZW1vdmUoIGFjdC52ZXJ0ZXhJZCApICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZW1vdmVFZGdlLCBhY3QgPT4ge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblxuICAgICAgICAudXBkYXRlKCAnZWRnZXMnLCBfID0+IF8ucmVtb3ZlKCBhY3QuZWRnZUlkICkgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFJlc2l6ZVNlbGVjdGlvbiwgYWN0ID0+IHtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbk9mID1cbiAgICAgICAgYWN0LmlzRXh0ZW5zaW9uID8gKHRoaXMuc2VsZWN0aW9uLmV4dGVuc2lvbk9mIHx8IHRoaXMuc2VsZWN0aW9uKSA6IG51bGw7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgIC5zZXQoICdleHRlbnNpb25PZicsIGV4dGVuc2lvbk9mIClcbiAgICAgICAgLnNldCggJ2Nvb3JkcycsIGFjdC5jb29yZHMgKVxuICAgICAgICAuc2V0KCAnZGltZW5zaW9ucycsIGFjdC5kaW1lbnNpb25zICk7XG4gICAgICB0aGlzLnVwZGF0ZVJlY3RhbmdsZUNvbnRlbnRzKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggU2VsZWN0RWRnZSwgYWN0ID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb25cbiAgICAgICAgLnVwZGF0ZSggJ2VkZ2VzJywgXyA9PiBfLmFkZCggYWN0LmVkZ2UuaWQgKSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggRGVzZWxlY3RFZGdlLCBhY3QgPT4ge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblxuICAgICAgICAudXBkYXRlKCAnZWRnZXMnLCBfID0+IF8ucmVtb3ZlKCBhY3QuZWRnZS5pZCApICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBTZWxlY3RWZXJ0ZXgsIGFjdCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgIC51cGRhdGUoICd2ZXJ0aWNlcycsIF8gPT4gXy5hZGQoIGFjdC52ZXJ0ZXguaWQgKSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggRGVzZWxlY3RWZXJ0ZXgsIGFjdCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgIC51cGRhdGUoICd2ZXJ0aWNlcycsIF8gPT4gXy5yZW1vdmUoIGFjdC52ZXJ0ZXguaWQgKSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggTW92ZVNlbGVjdGlvbiwgYWN0ID0+IHtcbiAgICAgIHRoaXMubW92ZUNvbnRlbnRzKCBhY3QucmVmZXJlbmNlLCBhY3Qub2Zmc2V0ICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBEZWxldGVTZWxlY3Rpb24sIGFjdCA9PiB7XG4gICAgICB0aGlzLmRlbGV0ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIEN1dFNlbGVjdGlvbiwgYWN0ID0+IHtcbiAgICAgIHRoaXMuY29weVRvQ2xpcGJvYXJkKCBhY3QuY3V0RXZlbnQgKTtcbiAgICAgIHRoaXMuZGVsZXRlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggQ29weVNlbGVjdGlvbiwgYWN0ID0+IHtcbiAgICAgIHRoaXMuY29weVRvQ2xpcGJvYXJkKCBhY3QuY29weUV2ZW50ICk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggUGFzdGVDbGlwYm9hcmQsIGFjdCA9PiB7XG4gICAgICB0aGlzLnBhc3RlQ2xpcGJvYXJkKCBhY3QucGFzdGVFdmVudCApO1xuICAgIH0gKTtcbiAgfVxuXG4gIGNvcHlUb0NsaXBib2FyZCggY2xpcGJvYXJkRXZlbnQgKSB7XG4gICAgaWYoIHRoaXMuaXNFbXB0eSgpICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZmFrZUNsaXBib2FyZCA9IENsaXBib2FyZCgge1xuICAgICAgZ3JhcGg6IHRoaXMuc2VsZWN0aW9uR3JhcGgoKSxcbiAgICAgIGxheW91dDogdGhpcy5zZWxlY3Rpb25MYXlvdXQoKVxuICAgIH0gKTtcblxuICAgIGlmKCBjbGlwYm9hcmRFdmVudCApIHtcbiAgICAgIGNvbnN0IGpzb25DbGlwYm9hcmQgPSBKU09OLnN0cmluZ2lmeSggdGhpcy5mYWtlQ2xpcGJvYXJkLnRvSlMoKSApO1xuICAgICAgY2xpcGJvYXJkRXZlbnQuY2xpcGJvYXJkRGF0YS5zZXREYXRhKCAnYXBwbGljYXRpb24vanNvbicsIGpzb25DbGlwYm9hcmQgKTtcbiAgICAgIGNsaXBib2FyZEV2ZW50LmNsaXBib2FyZERhdGEuc2V0RGF0YSggJ3RleHQvcGxhaW4nLCBqc29uQ2xpcGJvYXJkICk7XG4gICAgfVxuICB9XG5cbiAgcGFzdGVDbGlwYm9hcmQoIHBhc3RlRXZlbnQgKSB7XG4gICAgLy8gOlRPRE86IHVzZSBldmVudCBjbGlwYm9hcmQhXG5cbiAgICBjb25zdCB7IGdyYXBoLCBsYXlvdXQgfSA9IHRoaXMuZmFrZUNsaXBib2FyZDtcbiAgICBjb25zdCByZW5hbWVSdWxlcyA9IHRoaXMuZ3JhcGhTdG9yZS5yZW5hbWVSdWxlcyggZ3JhcGggKTtcbiAgICB0aGlzLmdyYXBoU3RvcmUuaW5zZXJ0KCBncmFwaCwgcmVuYW1lUnVsZXMgKTtcbiAgICB0aGlzLmxheW91dFN0b3JlLmluc2VydCggbGF5b3V0LCByZW5hbWVSdWxlcyApO1xuICAgIHRoaXMuZ3JhcGhTdG9yZS5wcnVuZUVtcHR5RWRnZXMoKTtcbiAgfVxuXG4gIGRlbGV0ZSgpIHtcbiAgICBjb25zdCB7IGRpc3BhdGNoZXIgfSA9IHRoaXM7XG4gICAgY29uc3QgeyB2ZXJ0aWNlcywgZWRnZXMgfSA9IHRoaXMuc2VsZWN0aW9uO1xuICAgIHZlcnRpY2VzLmZvckVhY2goIChfLCBpZCkgPT4ge1xuICAgICAgZGlzcGF0Y2hlci5kaXNwYXRjaCggUmVtb3ZlVmVydGV4KCB7IHZlcnRleElkOiBpZCB9ICkgKTtcbiAgICAgfSApO1xuICAgIGVkZ2VzLmZvckVhY2goIChfLCBpZCkgPT4ge1xuICAgICAgZGlzcGF0Y2hlci5kaXNwYXRjaCggUmVtb3ZlRWRnZSggeyBlZGdlSWQ6IGlkIH0gKSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoKCBTYXZlU3RhdGUoe1xuICAgICAgc3RvcmVJZDogdGhpcy5zdG9yZUlkLFxuICAgICAgc3RhdGU6IHRoaXMuc2VsZWN0aW9uXG4gICAgfSkgKTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuc2VsZWN0aW9uID1cbiAgICAgIHRoaXMuc2VsZWN0aW9uLnNldCggJ2VkZ2VzJywgU2V0KCkgKS5zZXQoICd2ZXJ0aWNlcycsIFNldCgpICk7XG4gIH1cblxuICBtb3ZlQ29udGVudHMoIHJlZmVyZW5jZSwgb2Zmc2V0ICkge1xuICAgIGlmKCByZWZlcmVuY2UuaWQgIT09IHRoaXMubW92ZVJlZmVyZW5jZS5pZCApIHtcbiAgICAgIHRoaXMubW92ZVJlZmVyZW5jZSA9IHtcbiAgICAgICAgaWQ6IHJlZmVyZW5jZS5pZCxcbiAgICAgICAgY29vcmRzOiByZWZlcmVuY2UuY29vcmRzLFxuICAgICAgICBsYXlvdXQ6IHRoaXMubGF5b3V0U3RvcmUubGF5b3V0XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMubGF5b3V0U3RvcmUubW92ZVNlbGVjdGlvbihcbiAgICAgIHRoaXMuc2VsZWN0aW9uLFxuICAgICAgdGhpcy5tb3ZlUmVmZXJlbmNlLmxheW91dCxcbiAgICAgIG9mZnNldFxuICAgICk7XG4gIH1cblxuICB1cGRhdGVSZWN0YW5nbGVDb250ZW50cygpIHtcbiAgICBpZiggIXRoaXMuc2VsZWN0aW9uLmRpbWVuc2lvbnMgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBleHRlbnNpb25PZiB9ID0gdGhpcy5zZWxlY3Rpb247XG4gICAgY29uc3QgeyBtZWFzdXJlbWVudHMsIGxheW91dCB9ID0gdGhpcy5sYXlvdXRTdG9yZTtcbiAgICBjb25zdCBlZGdlc1RvS2VlcCA9IGV4dGVuc2lvbk9mID8gZXh0ZW5zaW9uT2YuZWRnZXMgOiBTZXQoKTtcbiAgICBjb25zdCB2ZXJ0aWNlc1RvS2VlcCA9IGV4dGVuc2lvbk9mID8gZXh0ZW5zaW9uT2YudmVydGljZXMgOiBTZXQoKTtcblxuICAgIGNvbnN0IHZlcnRleFNldCA9IHRoaXMubm9kZVNldChcbiAgICAgIG1lYXN1cmVtZW50cy52ZXJ0aWNlcy50b0pTKCksXG4gICAgICBsYXlvdXQudmVydGljZXMudG9KUygpLFxuICAgICAgdmVydGljZXNUb0tlZXBcbiAgICApO1xuXG4gICAgY29uc3QgZWRnZVNldCA9IHRoaXMubm9kZVNldChcbiAgICAgIG1lYXN1cmVtZW50cy5lZGdlcy50b0pTKCksXG4gICAgICBsYXlvdXQuZWRnZXMudG9KUygpLFxuICAgICAgZWRnZXNUb0tlZXBcbiAgICApO1xuXG4gICAgdGhpcy5zZWxlY3Rpb24gPSBTZWxlY3Rpb24oe1xuICAgICAgY29vcmRzOiB0aGlzLnNlbGVjdGlvbi5jb29yZHMsXG4gICAgICBkaW1lbnNpb25zOiB0aGlzLnNlbGVjdGlvbi5kaW1lbnNpb25zLFxuICAgICAgZXh0ZW5zaW9uT2Y6IHRoaXMuc2VsZWN0aW9uLmV4dGVuc2lvbk9mLFxuICAgICAgdmVydGljZXM6IHZlcnRleFNldCxcbiAgICAgIGVkZ2VzOiBlZGdlU2V0XG4gICAgfSk7XG4gIH1cblxuXG4gIC8vIHB1cmUgaGVscGVyc1xuXG4gIGlzRW1wdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLnZlcnRpY2VzLmlzRW1wdHkoKVxuICAgICAgJiYgdGhpcy5zZWxlY3Rpb24uZWRnZXMuaXNFbXB0eSgpO1xuICB9XG5cbiAgaW1wbGljaXRFZGdlcyggdmVydGV4U2V0ICkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gdGhpcy5ncmFwaFN0b3JlLmdyYXBoLnZlcnRpY2VzO1xuICAgIGNvbnN0IGVkZ2VJZHMgPSB7fTtcbiAgICB2ZXJ0ZXhTZXQudmFsdWVTZXEoKVxuICAgICAgLm1hcCggdklkID0+IHZlcnRpY2VzLmdldCggdklkICkgKVxuICAgICAgLmZsYXRNYXAoIHYgPT4gRGlyZWN0aW9ucy5mbGF0TWFwKCBkID0+IHYucG9ydHNbIGQgXSApIClcbiAgICAgIC5maWx0ZXIoIHAgPT4gcC5lZGdlSWQgKVxuICAgICAgLmZvckVhY2goIHAgPT4gZWRnZUlkc1sgcC5lZGdlSWQgXSA9IHRydWUgKTtcbiAgICByZXR1cm4gU2V0LmZyb21LZXlzKCBlZGdlSWRzICk7XG4gIH1cblxuICBzZWxlY3Rpb25HcmFwaCgpIHtcbiAgICBjb25zdCBzID0gdGhpcy5zZWxlY3Rpb247XG4gICAgY29uc3QgZ3JhcGggPSB0aGlzLmdyYXBoU3RvcmUuZ3JhcGg7XG4gICAgY29uc3QgaW1wbGljaXRFZGdlcyA9IHRoaXMuaW1wbGljaXRFZGdlcyggcy52ZXJ0aWNlcyApO1xuICAgIHJldHVybiBHcmFwaCh7XG4gICAgICB2ZXJ0aWNlczogZ3JhcGgudmVydGljZXMuZmlsdGVyKCAoXywgdklkKSA9PiBzLnZlcnRpY2VzLmhhcyggdklkICkgKSxcbiAgICAgIGVkZ2VzOiBncmFwaC5lZGdlcy5maWx0ZXIoIChfLCBlSWQpID0+XG4gICAgICAgIHMuZWRnZXMuaGFzKCBlSWQgKSB8fCBpbXBsaWNpdEVkZ2VzLmhhcyggZUlkIClcbiAgICAgIClcbiAgICB9KTtcbiAgfVxuXG4gIHNlbGVjdGlvbkxheW91dCgpIHtcbiAgICBjb25zdCBzID0gdGhpcy5zZWxlY3Rpb247XG4gICAgY29uc3QgbGF5b3V0ID0gdGhpcy5sYXlvdXRTdG9yZS5sYXlvdXQ7XG4gICAgcmV0dXJuIExheW91dCh7XG4gICAgICB2ZXJ0aWNlczogbGF5b3V0LnZlcnRpY2VzLmZpbHRlciggKF8sIHZJZCkgPT4gcy52ZXJ0aWNlcy5oYXMoIHZJZCApICksXG4gICAgICBlZGdlczogbGF5b3V0LmVkZ2VzLmZpbHRlciggKF8sIGVJZCkgPT4gcy5lZGdlcy5oYXMoIGVJZCApIClcbiAgICB9KTtcbiAgfVxuXG4gIG5vZGVTZXQoIGpzTm9kZU1lYXN1cmVtZW50cywganNOb2RlQ29vcmRzLCB0b0tlZXAgKSB7XG4gICAgY29uc3QgeyBjb29yZHMsIGRpbWVuc2lvbnMgfSA9IHRoaXMuc2VsZWN0aW9uO1xuICAgIGNvbnN0IG1hdGNoZXMgPSB7fTtcbiAgICBmb3IoIGNvbnN0IGlkIGluIGpzTm9kZU1lYXN1cmVtZW50cyApIHtcbiAgICAgIGlmKCAhanNOb2RlTWVhc3VyZW1lbnRzLmhhc093blByb3BlcnR5KCBpZCApIHx8ICFqc05vZGVDb29yZHNbIGlkIF0gKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYoIHRvS2VlcC5oYXMoIGlkICkgKSB7XG4gICAgICAgIG1hdGNoZXNbIGlkIF0gPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBqc05vZGVDb29yZHNbIGlkIF07XG4gICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGpzTm9kZU1lYXN1cmVtZW50c1sgaWQgXS5kaW1lbnNpb25zO1xuICAgICAgaWYoIGxlZnQgKyB3aWR0aCA8IGNvb3Jkcy5sZWZ0XG4gICAgICAgICAgfHwgbGVmdCA+IGNvb3Jkcy5sZWZ0ICsgZGltZW5zaW9ucy53aWR0aCApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiggdG9wICsgaGVpZ2h0IDwgY29vcmRzLnRvcFxuICAgICAgICAgIHx8IHRvcCA+IGNvb3Jkcy50b3AgKyBkaW1lbnNpb25zLmhlaWdodCApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBtYXRjaGVzWyBpZCBdID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIFNldC5mcm9tS2V5cyggbWF0Y2hlcyApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGlvblN0b3JlO1xuIl19