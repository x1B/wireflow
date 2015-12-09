define(['exports', 'module', 'immutable', '../history/history-actions', '../graph/graph-actions', './selection-model', './selection-actions'], function (exports, module, _immutable, _historyHistoryActions, _graphGraphActions, _selectionModel, _selectionActions) {'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}




















  var Selection = (0, _immutable.Record)({ 
    vertices: (0, _immutable.Set)(), 
    edges: (0, _immutable.Set)(), 
    extensionOf: null, 
    coords: null, 
    dimensions: null });var 


  SelectionStore = (function () {

    function SelectionStore(dispatcher, selectionStore, layoutStore, graphStore) {var _this = this;_classCallCheck(this, SelectionStore);
      this.dispatcher = dispatcher;
      this.fakeClipboard = (0, _selectionModel.Clipboard)();
      this.moveReference = { id: null };
      this.layoutStore = layoutStore;
      this.graphStore = graphStore;

      this.storeId = this.constructor.name;
      this.selection = Selection();
      this.save();


      dispatcher.register(_selectionActions.ClearSelection, function (act) {_this.clear();});

      dispatcher.register(_graphGraphActions.RemoveVertex, function (act) {
        _this.selection = _this.selection.
        update('vertices', function (_) {return _.remove(act.vertexId);});
        _this.save();});


      dispatcher.register(_graphGraphActions.RemoveEdge, function (act) {
        _this.selection = _this.selection.
        update('edges', function (_) {return _.remove(act.edgeId);});
        _this.save();});


      dispatcher.register(_selectionActions.ResizeSelection, function (act) {
        _this.selection = _this.selection.
        set('extensionOf', act.isExtension ? _this.selection.extensionOf || _this.selection : null);
        _this.selection = _this.selection.
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


      dispatcher.register(_selectionActions.DeleteSelection, function (_) {return _this['delete']();});

      dispatcher.register(_selectionActions.CutSelection, function (act) {
        _this.copyToClipboard();
        _this['delete']();});}_createClass(SelectionStore, [{ key: 'copyToClipboard', value: 



      function copyToClipboard() {
        // :TODO:
      } }, { key: 'delete', value: 

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
        this.selection.set('edges', (0, _immutable.Set)()).set('vertices', (0, _immutable.Set)());} }, { key: 'isEmpty', value: 


      function isEmpty() {
        return this.selection.vertices.isEmpty() && 
        this.selection.edges.isEmpty();} }, { key: 'moveContents', value: 


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
          return;}var _selection2 = 


        this.selection;var coords = _selection2.coords;var dimensions = _selection2.dimensions;var extensionOf = _selection2.extensionOf;var _layoutStore = 
        this.layoutStore;var measurements = _layoutStore.measurements;var layout = _layoutStore.layout;
        var edgesToKeep = extensionOf ? extensionOf.edges : (0, _immutable.Set)();
        var verticesToKeep = extensionOf ? extensionOf.vertices : (0, _immutable.Set)();

        this.selection = Selection({ 
          coords: this.selection.coords, 
          dimensions: this.selection.dimensions, 
          extensionOf: this.selection.extensionOf, 
          vertices: nodeSet(
          measurements.vertices.toJS(), layout.vertices.toJS(), verticesToKeep), 

          edges: nodeSet(
          measurements.edges.toJS(), layout.edges.toJS(), edgesToKeep) });



        function nodeSet(nodeMeasurements, nodeCoords, toKeep) {
          var matches = (0, _immutable.Set)();
          for (var id in nodeMeasurements) {
            if (!nodeMeasurements.hasOwnProperty(id)) {continue;}
            if (toKeep.has(id)) {
              matches = matches.add(id);
              continue;}var _nodeCoords$id = 

            nodeCoords[id];var left = _nodeCoords$id.left;var _top = _nodeCoords$id.top;var _nodeMeasurements$id$dimensions = 
            nodeMeasurements[id].dimensions;var width = _nodeMeasurements$id$dimensions.width;var height = _nodeMeasurements$id$dimensions.height;
            if (left + width < coords.left || 
            left > coords.left + dimensions.width) {
              continue;}

            if (_top + height < coords.top || 
            _top > coords.top + dimensions.height) {
              continue;}

            matches = matches.add(id);}

          return matches;}} }]);return SelectionStore;})();module.exports = 





  SelectionStore;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mbHV4L2NsaXBib2FyZC9jbGlwYm9hcmQtc3RvcmUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxNQUFNLFNBQVMsR0FBRyxlQXJCVCxNQUFNLEVBcUJVO0FBQ3ZCLFlBQVEsRUFBRSxlQXRCSyxHQUFHLEdBc0JIO0FBQ2YsU0FBSyxFQUFFLGVBdkJRLEdBQUcsR0F1Qk47QUFDWixlQUFXLEVBQUUsSUFBSTtBQUNqQixVQUFNLEVBQUUsSUFBSTtBQUNaLGNBQVUsRUFBRSxJQUFJLEVBQ2pCLENBQUMsQ0FBQzs7O0FBRUcsZ0JBQWM7O0FBRVAsYUFGUCxjQUFjLENBRUwsVUFBVSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFHLHdDQUYvRCxjQUFjO0FBR2hCLFVBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0FBQzdCLFVBQUksQ0FBQyxhQUFhLEdBQUcsb0JBNUJoQixTQUFTLEdBNEJrQixDQUFDO0FBQ2pDLFVBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDbEMsVUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDL0IsVUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7O0FBRTdCLFVBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7QUFDckMsVUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLEVBQUUsQ0FBQztBQUM3QixVQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7OztBQUdaLGdCQUFVLENBQUMsUUFBUSxtQkFoQ3JCLGNBQWMsRUFnQ3lCLFVBQUEsR0FBRyxFQUFJLENBQUUsTUFBSyxLQUFLLEVBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQzs7QUFFaEUsZ0JBQVUsQ0FBQyxRQUFRLG9CQTFDZCxZQUFZLEVBMENrQixVQUFBLEdBQUcsRUFBSTtBQUN4QyxjQUFLLFNBQVMsR0FBRyxNQUFLLFNBQVM7QUFDNUIsY0FBTSxDQUFFLFVBQVUsRUFBRSxVQUFBLENBQUMsVUFBSSxDQUFDLENBQUMsTUFBTSxDQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUUsRUFBQSxDQUFFLENBQUM7QUFDdkQsY0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUNiLENBQUUsQ0FBQzs7O0FBRUosZ0JBQVUsQ0FBQyxRQUFRLG9CQWhEQSxVQUFVLEVBZ0RJLFVBQUEsR0FBRyxFQUFJO0FBQ3RDLGNBQUssU0FBUyxHQUFHLE1BQUssU0FBUztBQUM1QixjQUFNLENBQUUsT0FBTyxFQUFFLFVBQUEsQ0FBQyxVQUFJLENBQUMsQ0FBQyxNQUFNLENBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBRSxFQUFBLENBQUUsQ0FBQztBQUNsRCxjQUFLLElBQUksRUFBRSxDQUFDLENBQ2IsQ0FBRSxDQUFDOzs7QUFFSixnQkFBVSxDQUFDLFFBQVEsbUJBL0NyQixlQUFlLEVBK0N5QixVQUFBLEdBQUcsRUFBSTtBQUMzQyxjQUFLLFNBQVMsR0FBRyxNQUFLLFNBQVM7QUFDNUIsV0FBRyxDQUFFLGFBQWEsRUFBRSxHQUFHLENBQUMsV0FBVyxHQUFJLE1BQUssU0FBUyxDQUFDLFdBQVcsSUFBSSxNQUFLLFNBQVMsR0FBSSxJQUFJLENBQUUsQ0FBQztBQUNqRyxjQUFLLFNBQVMsR0FBRyxNQUFLLFNBQVM7QUFDNUIsV0FBRyxDQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFFO0FBQzNCLFdBQUcsQ0FBRSxZQUFZLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBRSxDQUFDO0FBQ3ZDLGNBQUssdUJBQXVCLEVBQUUsQ0FBQyxDQUNoQyxDQUFFLENBQUM7OztBQUVKLGdCQUFVLENBQUMsUUFBUSxtQkFsRHJCLFVBQVUsRUFrRHlCLFVBQUEsR0FBRyxFQUFJO0FBQ3RDLGNBQUssU0FBUyxHQUFHLE1BQUssU0FBUztBQUM1QixjQUFNLENBQUUsT0FBTyxFQUFFLFVBQUEsQ0FBQyxVQUFJLENBQUMsQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUUsRUFBQSxDQUFFLENBQUM7QUFDaEQsY0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUNiLENBQUUsQ0FBQzs7O0FBRUosZ0JBQVUsQ0FBQyxRQUFRLG1CQXpEckIsWUFBWSxFQXlEeUIsVUFBQSxHQUFHLEVBQUk7QUFDeEMsY0FBSyxTQUFTLEdBQUcsTUFBSyxTQUFTO0FBQzVCLGNBQU0sQ0FBRSxPQUFPLEVBQUUsVUFBQSxDQUFDLFVBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBRSxFQUFBLENBQUUsQ0FBQztBQUNuRCxjQUFLLElBQUksRUFBRSxDQUFDLENBQ2IsQ0FBRSxDQUFDOzs7QUFFSixnQkFBVSxDQUFDLFFBQVEsbUJBaEVyQixZQUFZLEVBZ0V5QixVQUFBLEdBQUcsRUFBSTtBQUN4QyxjQUFLLFNBQVMsR0FBRyxNQUFLLFNBQVM7QUFDNUIsY0FBTSxDQUFFLFVBQVUsRUFBRSxVQUFBLENBQUMsVUFBSSxDQUFDLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFFLEVBQUEsQ0FBRSxDQUFDO0FBQ3JELGNBQUssSUFBSSxFQUFFLENBQUMsQ0FDYixDQUFFLENBQUM7OztBQUVKLGdCQUFVLENBQUMsUUFBUSxtQkF2RXJCLGNBQWMsRUF1RXlCLFVBQUEsR0FBRyxFQUFJO0FBQzFDLGNBQUssU0FBUyxHQUFHLE1BQUssU0FBUztBQUM1QixjQUFNLENBQUUsVUFBVSxFQUFFLFVBQUEsQ0FBQyxVQUFJLENBQUMsQ0FBQyxNQUFNLENBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUUsRUFBQSxDQUFFLENBQUM7QUFDeEQsY0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUNiLENBQUUsQ0FBQzs7O0FBRUosZ0JBQVUsQ0FBQyxRQUFRLG1CQTlFckIsYUFBYSxFQThFeUIsVUFBQSxHQUFHLEVBQUk7QUFDekMsY0FBSyxZQUFZLENBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFFLENBQUM7QUFDL0MsY0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUNiLENBQUUsQ0FBQzs7O0FBRUosZ0JBQVUsQ0FBQyxRQUFRLG1CQTlFckIsZUFBZSxFQThFeUIsVUFBQSxDQUFDLFVBQUksZUFBVyxFQUFFLEVBQUEsQ0FBRSxDQUFDOztBQUUzRCxnQkFBVSxDQUFDLFFBQVEsbUJBekZyQixZQUFZLEVBeUZ5QixVQUFBLEdBQUcsRUFBSTtBQUN4QyxjQUFLLGVBQWUsRUFBRSxDQUFDO0FBQ3ZCLHVCQUFXLEVBQUUsQ0FBQyxDQUNmLENBQUUsQ0FBQyxDQUNMLGFBeEVHLGNBQWM7Ozs7QUEwRUgsaUNBQUc7O09BRWpCOztBQUVLLHlCQUFHO0FBQ0Msa0JBQVUsR0FBSyxJQUFJLENBQW5CLFVBQVU7QUFDVSxZQUFJLENBQUMsU0FBUyxLQUFsQyxRQUFRLGNBQVIsUUFBUSxLQUFFLEtBQUssY0FBTCxLQUFLO0FBQ3ZCLGdCQUFRLENBQUMsT0FBTyxDQUFFLFVBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBSztBQUMzQixvQkFBVSxDQUFDLFFBQVEsQ0FBRSx1QkE1R2xCLFlBQVksRUE0R29CLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFFLENBQUUsQ0FBQyxDQUN4RCxDQUFFLENBQUM7O0FBQ0wsYUFBSyxDQUFDLE9BQU8sQ0FBRSxVQUFDLENBQUMsRUFBRSxFQUFFLEVBQUs7QUFDeEIsb0JBQVUsQ0FBQyxRQUFRLENBQUUsdUJBL0dKLFVBQVUsRUErR00sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUUsQ0FBRSxDQUFDLENBQ3JELENBQUUsQ0FBQyxDQUNMOzs7O0FBRUcsc0JBQUc7QUFDTCxZQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBRSwyQkFySHJCLFNBQVMsRUFxSHNCO0FBQ2xDLGlCQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87QUFDckIsZUFBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQ3RCLENBQUMsQ0FBRSxDQUFDLENBQ047Ozs7QUFFSSx1QkFBRztBQUNOLFlBQUksQ0FBQyxTQUFTO0FBQ1osWUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUUsT0FBTyxFQUFFLGVBL0hsQixHQUFHLEdBK0hvQixDQUFFLENBQUMsR0FBRyxDQUFFLFVBQVUsRUFBRSxlQS9IM0MsR0FBRyxHQStINkMsQ0FBRSxDQUFDLENBQ2pFOzs7QUFFTSx5QkFBRztBQUNSLGVBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO0FBQ25DLFlBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQ3JDOzs7QUFFVyw0QkFBRSxTQUFTLEVBQUUsTUFBTSxFQUFHO0FBQ2hDLFlBQUksU0FBUyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRztBQUMzQyxjQUFJLENBQUMsYUFBYSxHQUFHO0FBQ25CLGNBQUUsRUFBRSxTQUFTLENBQUMsRUFBRTtBQUNoQixrQkFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNO0FBQ3hCLGtCQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQ2hDLENBQUMsQ0FDSDs7OztBQUVELFlBQUksQ0FBQyxXQUFXLENBQUMsYUFBYTtBQUM1QixZQUFJLENBQUMsU0FBUztBQUNkLFlBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTtBQUN6QixjQUFNLENBQ1AsQ0FBQyxDQUNIOzs7O0FBRXNCLHlDQUFHO0FBQ3hCLFlBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRztBQUMvQixpQkFBTyxDQUNSOzs7QUFFMkMsWUFBSSxDQUFDLFNBQVMsS0FBbEQsTUFBTSxlQUFOLE1BQU0sS0FBRSxVQUFVLGVBQVYsVUFBVSxLQUFFLFdBQVcsZUFBWCxXQUFXO0FBQ04sWUFBSSxDQUFDLFdBQVcsS0FBekMsWUFBWSxnQkFBWixZQUFZLEtBQUUsTUFBTSxnQkFBTixNQUFNO0FBQzVCLFlBQU0sV0FBVyxHQUFHLFdBQVcsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFHLGVBOUp6QyxHQUFHLEdBOEoyQyxDQUFDO0FBQzVELFlBQU0sY0FBYyxHQUFHLFdBQVcsR0FBRyxXQUFXLENBQUMsUUFBUSxHQUFHLGVBL0ovQyxHQUFHLEdBK0ppRCxDQUFDOztBQUVsRSxZQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUN6QixnQkFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtBQUM3QixvQkFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVTtBQUNyQyxxQkFBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVztBQUN2QyxrQkFBUSxFQUFFLE9BQU87QUFDZixzQkFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLGNBQWMsQ0FDckU7O0FBQ0QsZUFBSyxFQUFFLE9BQU87QUFDWixzQkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLFdBQVcsQ0FDNUQsRUFDRixDQUFDLENBQUM7Ozs7QUFFSCxpQkFBUyxPQUFPLENBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRztBQUN2RCxjQUFJLE9BQU8sR0FBRyxlQTlLSCxHQUFHLEdBOEtLLENBQUM7QUFDcEIsZUFBSyxJQUFNLEVBQUUsSUFBSSxnQkFBZ0IsRUFBRztBQUNsQyxnQkFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBRSxFQUFFLENBQUUsRUFBRyxDQUFFLFNBQVMsQ0FBRTtBQUMxRCxnQkFBSSxNQUFNLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBRSxFQUFHO0FBQ3JCLHFCQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUUsQ0FBQztBQUM1Qix1QkFBUyxDQUNWOztBQUNxQixzQkFBVSxDQUFFLEVBQUUsQ0FBRSxLQUE5QixJQUFJLGtCQUFKLElBQUksS0FBRSxJQUFHLGtCQUFILEdBQUc7QUFDUyw0QkFBZ0IsQ0FBRSxFQUFFLENBQUUsQ0FBQyxVQUFVLEtBQW5ELEtBQUssbUNBQUwsS0FBSyxLQUFFLE1BQU0sbUNBQU4sTUFBTTtBQUNyQixnQkFBSSxJQUFJLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJO0FBQ3ZCLGdCQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFHO0FBQzdDLHVCQUFTLENBQ1Y7O0FBQ0QsZ0JBQUksSUFBRyxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRztBQUN0QixnQkFBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRztBQUM1Qyx1QkFBUyxDQUNWOztBQUNELG1CQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUUsQ0FBQyxDQUM3Qjs7QUFDRCxpQkFBTyxPQUFPLENBQUMsQ0FDaEIsQ0FDRixZQXRLRyxjQUFjOzs7Ozs7QUEwS0wsZ0JBQWMiLCJmaWxlIjoiY2xpcGJvYXJkLXN0b3JlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY29yZCwgU2V0IH0gZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHsgU2F2ZVN0YXRlIH0gZnJvbSAnLi4vaGlzdG9yeS9oaXN0b3J5LWFjdGlvbnMnO1xuaW1wb3J0IHsgUmVtb3ZlVmVydGV4LCBSZW1vdmVFZGdlIH0gZnJvbSAnLi4vZ3JhcGgvZ3JhcGgtYWN0aW9ucyc7XG5cbmltcG9ydCB7IENsaXBib2FyZCB9IGZyb20gJy4vc2VsZWN0aW9uLW1vZGVsJztcbmltcG9ydCB7XG4gIENvcHlTZWxlY3Rpb24sXG4gIEN1dFNlbGVjdGlvbixcbiAgUGFzdGVDbGlwYm9hcmQsXG4gIFJlc2l6ZVNlbGVjdGlvbixcbiAgQ2xlYXJTZWxlY3Rpb24sXG4gIE1vdmVTZWxlY3Rpb24sXG4gIERlc2VsZWN0VmVydGV4LFxuICBTZWxlY3RWZXJ0ZXgsXG4gIERlc2VsZWN0RWRnZSxcbiAgU2VsZWN0RWRnZSxcbiAgRGVsZXRlU2VsZWN0aW9uXG59IGZyb20gJy4vc2VsZWN0aW9uLWFjdGlvbnMnO1xuXG5cbmNvbnN0IFNlbGVjdGlvbiA9IFJlY29yZCh7XG4gIHZlcnRpY2VzOiBTZXQoKSxcbiAgZWRnZXM6IFNldCgpLFxuICBleHRlbnNpb25PZjogbnVsbCxcbiAgY29vcmRzOiBudWxsLFxuICBkaW1lbnNpb25zOiBudWxsXG59KTtcblxuY2xhc3MgU2VsZWN0aW9uU3RvcmUge1xuXG4gIGNvbnN0cnVjdG9yKCBkaXNwYXRjaGVyLCBzZWxlY3Rpb25TdG9yZSwgbGF5b3V0U3RvcmUsIGdyYXBoU3RvcmUgKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcbiAgICB0aGlzLmZha2VDbGlwYm9hcmQgPSBDbGlwYm9hcmQoKTtcbiAgICB0aGlzLm1vdmVSZWZlcmVuY2UgPSB7IGlkOiBudWxsIH07XG4gICAgdGhpcy5sYXlvdXRTdG9yZSA9IGxheW91dFN0b3JlO1xuICAgIHRoaXMuZ3JhcGhTdG9yZSA9IGdyYXBoU3RvcmU7XG5cbiAgICB0aGlzLnN0b3JlSWQgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSBTZWxlY3Rpb24oKTtcbiAgICB0aGlzLnNhdmUoKTtcblxuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggQ2xlYXJTZWxlY3Rpb24sIGFjdCA9PiB7IHRoaXMuY2xlYXIoKTsgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggUmVtb3ZlVmVydGV4LCBhY3QgPT4ge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblxuICAgICAgICAudXBkYXRlKCAndmVydGljZXMnLCBfID0+IF8ucmVtb3ZlKCBhY3QudmVydGV4SWQgKSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggUmVtb3ZlRWRnZSwgYWN0ID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb25cbiAgICAgICAgLnVwZGF0ZSggJ2VkZ2VzJywgXyA9PiBfLnJlbW92ZSggYWN0LmVkZ2VJZCApICk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9ICk7XG5cbiAgICBkaXNwYXRjaGVyLnJlZ2lzdGVyKCBSZXNpemVTZWxlY3Rpb24sIGFjdCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgIC5zZXQoICdleHRlbnNpb25PZicsIGFjdC5pc0V4dGVuc2lvbiA/ICh0aGlzLnNlbGVjdGlvbi5leHRlbnNpb25PZiB8fCB0aGlzLnNlbGVjdGlvbikgOiBudWxsICk7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgIC5zZXQoICdjb29yZHMnLCBhY3QuY29vcmRzIClcbiAgICAgICAgLnNldCggJ2RpbWVuc2lvbnMnLCBhY3QuZGltZW5zaW9ucyApO1xuICAgICAgdGhpcy51cGRhdGVSZWN0YW5nbGVDb250ZW50cygpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIFNlbGVjdEVkZ2UsIGFjdCA9PiB7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uXG4gICAgICAgIC51cGRhdGUoICdlZGdlcycsIF8gPT4gXy5hZGQoIGFjdC5lZGdlLmlkICkgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIERlc2VsZWN0RWRnZSwgYWN0ID0+IHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb25cbiAgICAgICAgLnVwZGF0ZSggJ2VkZ2VzJywgXyA9PiBfLnJlbW92ZSggYWN0LmVkZ2UuaWQgKSApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggU2VsZWN0VmVydGV4LCBhY3QgPT4ge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblxuICAgICAgICAudXBkYXRlKCAndmVydGljZXMnLCBfID0+IF8uYWRkKCBhY3QudmVydGV4LmlkICkgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIERlc2VsZWN0VmVydGV4LCBhY3QgPT4ge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvblxuICAgICAgICAudXBkYXRlKCAndmVydGljZXMnLCBfID0+IF8ucmVtb3ZlKCBhY3QudmVydGV4LmlkICkgKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0gKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIE1vdmVTZWxlY3Rpb24sIGFjdCA9PiB7XG4gICAgICB0aGlzLm1vdmVDb250ZW50cyggYWN0LnJlZmVyZW5jZSwgYWN0Lm9mZnNldCApO1xuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSApO1xuXG4gICAgZGlzcGF0Y2hlci5yZWdpc3RlciggRGVsZXRlU2VsZWN0aW9uLCBfID0+IHRoaXMuZGVsZXRlKCkgKTtcblxuICAgIGRpc3BhdGNoZXIucmVnaXN0ZXIoIEN1dFNlbGVjdGlvbiwgYWN0ID0+IHtcbiAgICAgIHRoaXMuY29weVRvQ2xpcGJvYXJkKCk7XG4gICAgICB0aGlzLmRlbGV0ZSgpO1xuICAgIH0gKTtcbiAgfVxuXG4gIGNvcHlUb0NsaXBib2FyZCgpIHtcbiAgICAvLyA6VE9ETzpcbiAgfVxuXG4gIGRlbGV0ZSgpIHtcbiAgICBjb25zdCB7IGRpc3BhdGNoZXIgfSA9IHRoaXM7XG4gICAgY29uc3QgeyB2ZXJ0aWNlcywgZWRnZXMgfSA9IHRoaXMuc2VsZWN0aW9uO1xuICAgIHZlcnRpY2VzLmZvckVhY2goIChfLCBpZCkgPT4ge1xuICAgICAgZGlzcGF0Y2hlci5kaXNwYXRjaCggUmVtb3ZlVmVydGV4KCB7IHZlcnRleElkOiBpZCB9ICkgKTtcbiAgICAgfSApO1xuICAgIGVkZ2VzLmZvckVhY2goIChfLCBpZCkgPT4ge1xuICAgICAgZGlzcGF0Y2hlci5kaXNwYXRjaCggUmVtb3ZlRWRnZSggeyBlZGdlSWQ6IGlkIH0gKSApO1xuICAgIH0gKTtcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgdGhpcy5kaXNwYXRjaGVyLmRpc3BhdGNoKCBTYXZlU3RhdGUoe1xuICAgICAgc3RvcmVJZDogdGhpcy5zdG9yZUlkLFxuICAgICAgc3RhdGU6IHRoaXMuc2VsZWN0aW9uXG4gICAgfSkgKTtcbiAgfVxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuc2VsZWN0aW9uID1cbiAgICAgIHRoaXMuc2VsZWN0aW9uLnNldCggJ2VkZ2VzJywgU2V0KCkgKS5zZXQoICd2ZXJ0aWNlcycsIFNldCgpICk7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbi52ZXJ0aWNlcy5pc0VtcHR5KClcbiAgICAgICYmIHRoaXMuc2VsZWN0aW9uLmVkZ2VzLmlzRW1wdHkoKTtcbiAgfVxuXG4gIG1vdmVDb250ZW50cyggcmVmZXJlbmNlLCBvZmZzZXQgKSB7XG4gICAgaWYoIHJlZmVyZW5jZS5pZCAhPT0gdGhpcy5tb3ZlUmVmZXJlbmNlLmlkICkge1xuICAgICAgdGhpcy5tb3ZlUmVmZXJlbmNlID0ge1xuICAgICAgICBpZDogcmVmZXJlbmNlLmlkLFxuICAgICAgICBjb29yZHM6IHJlZmVyZW5jZS5jb29yZHMsXG4gICAgICAgIGxheW91dDogdGhpcy5sYXlvdXRTdG9yZS5sYXlvdXRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5sYXlvdXRTdG9yZS5tb3ZlU2VsZWN0aW9uKFxuICAgICAgdGhpcy5zZWxlY3Rpb24sXG4gICAgICB0aGlzLm1vdmVSZWZlcmVuY2UubGF5b3V0LFxuICAgICAgb2Zmc2V0XG4gICAgKTtcbiAgfVxuXG4gIHVwZGF0ZVJlY3RhbmdsZUNvbnRlbnRzKCkge1xuICAgIGlmKCAhdGhpcy5zZWxlY3Rpb24uZGltZW5zaW9ucyApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGNvb3JkcywgZGltZW5zaW9ucywgZXh0ZW5zaW9uT2YgfSA9IHRoaXMuc2VsZWN0aW9uO1xuICAgIGNvbnN0IHsgbWVhc3VyZW1lbnRzLCBsYXlvdXQgfSA9IHRoaXMubGF5b3V0U3RvcmU7XG4gICAgY29uc3QgZWRnZXNUb0tlZXAgPSBleHRlbnNpb25PZiA/IGV4dGVuc2lvbk9mLmVkZ2VzIDogU2V0KCk7XG4gICAgY29uc3QgdmVydGljZXNUb0tlZXAgPSBleHRlbnNpb25PZiA/IGV4dGVuc2lvbk9mLnZlcnRpY2VzIDogU2V0KCk7XG5cbiAgICB0aGlzLnNlbGVjdGlvbiA9IFNlbGVjdGlvbih7XG4gICAgICBjb29yZHM6IHRoaXMuc2VsZWN0aW9uLmNvb3JkcyxcbiAgICAgIGRpbWVuc2lvbnM6IHRoaXMuc2VsZWN0aW9uLmRpbWVuc2lvbnMsXG4gICAgICBleHRlbnNpb25PZjogdGhpcy5zZWxlY3Rpb24uZXh0ZW5zaW9uT2YsXG4gICAgICB2ZXJ0aWNlczogbm9kZVNldChcbiAgICAgICAgbWVhc3VyZW1lbnRzLnZlcnRpY2VzLnRvSlMoKSwgbGF5b3V0LnZlcnRpY2VzLnRvSlMoKSwgdmVydGljZXNUb0tlZXBcbiAgICAgICksXG4gICAgICBlZGdlczogbm9kZVNldChcbiAgICAgICAgbWVhc3VyZW1lbnRzLmVkZ2VzLnRvSlMoKSwgbGF5b3V0LmVkZ2VzLnRvSlMoKSwgZWRnZXNUb0tlZXBcbiAgICAgIClcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG5vZGVTZXQoIG5vZGVNZWFzdXJlbWVudHMsIG5vZGVDb29yZHMsIHRvS2VlcCApIHtcbiAgICAgIHZhciBtYXRjaGVzID0gU2V0KCk7XG4gICAgICBmb3IoIGNvbnN0IGlkIGluIG5vZGVNZWFzdXJlbWVudHMgKSB7XG4gICAgICAgIGlmKCAhbm9kZU1lYXN1cmVtZW50cy5oYXNPd25Qcm9wZXJ0eSggaWQgKSApIHsgY29udGludWU7IH1cbiAgICAgICAgaWYoIHRvS2VlcC5oYXMoIGlkICkgKSB7XG4gICAgICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMuYWRkKCBpZCApO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBub2RlQ29vcmRzWyBpZCBdO1xuICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IG5vZGVNZWFzdXJlbWVudHNbIGlkIF0uZGltZW5zaW9ucztcbiAgICAgICAgaWYoIGxlZnQgKyB3aWR0aCA8IGNvb3Jkcy5sZWZ0XG4gICAgICAgICAgICB8fCBsZWZ0ID4gY29vcmRzLmxlZnQgKyBkaW1lbnNpb25zLndpZHRoICkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmKCB0b3AgKyBoZWlnaHQgPCBjb29yZHMudG9wXG4gICAgICAgICAgICB8fCB0b3AgPiBjb29yZHMudG9wICsgZGltZW5zaW9ucy5oZWlnaHQgKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMuYWRkKCBpZCApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoZXM7XG4gICAgfVxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0aW9uU3RvcmU7XG4iXX0=