define(['exports', 'immutable', '../selection-store', '../../../testing/dispatcher-mock', '../../../testing/diff', '../selection-actions', '../../layout/layout-model', '../selection-model', '../../graph/graph-model', '../../graph/graph-actions', '../../layout/spec/data', '../../graph/spec/data'], function (exports, _immutable, _selectionStore, _testingDispatcherMock, _testingDiff, _selectionActions, _layoutLayoutModel, _selectionModel, _graphGraphModel, _graphGraphActions, _layoutSpecData, _graphSpecData) {'use strict';function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { 'default': obj };}var _SelectionStore = _interopRequireDefault(_selectionStore);var _DispatcherMock = _interopRequireDefault(_testingDispatcherMock);var _diff = _interopRequireDefault(_testingDiff);var _layoutData = _interopRequireDefault(_layoutSpecData);var _graphData = _interopRequireDefault(_graphSpecData);











































  function dummyGraph() {
    return _graphGraphModel.convert.graph(_graphData['default'].initial.graph);}


  function dummyLayout() {
    return _layoutLayoutModel.convert.layout(_layoutData['default'].initial.layout);}


  function dummyMeasurements() {
    return _layoutLayoutModel.convert.measurements(_layoutData['default'].initial.measurements);}





  // Jasmine:
  var jasmine = window.jasmine;var describe = window.describe;var beforeEach = window.beforeEach;var expect = window.expect;var it = window.it;var 
  any = jasmine.any;

  describe('A selection store', function () {

    var dispatcher;
    var layoutStoreMock;
    var graphStoreMock;
    var store;

    beforeEach(function () {
      dispatcher = new _DispatcherMock['default']();
      layoutStoreMock = { 
        layout: dummyLayout(), 
        measurements: dummyMeasurements() };

      graphStoreMock = { 
        graph: dummyGraph() };

      store = new _SelectionStore['default'](dispatcher, layoutStoreMock, graphStoreMock);});


    it('handles selection state actions', function () {
      expect(dispatcher.register).
      toHaveBeenCalledWith(_selectionActions.CopySelection, any(Function));
      expect(dispatcher.register).
      toHaveBeenCalledWith(_selectionActions.CutSelection, any(Function));
      expect(dispatcher.register).
      toHaveBeenCalledWith(_selectionActions.ClearSelection, any(Function));
      expect(dispatcher.register).
      toHaveBeenCalledWith(_selectionActions.PasteClipboard, any(Function));
      expect(dispatcher.register).
      toHaveBeenCalledWith(_selectionActions.DeleteSelection, any(Function));
      expect(dispatcher.register).
      toHaveBeenCalledWith(_selectionActions.ResizeSelection, any(Function));
      expect(dispatcher.register).
      toHaveBeenCalledWith(_selectionActions.MoveSelection, any(Function));
      expect(dispatcher.register).
      toHaveBeenCalledWith(_selectionActions.DeselectVertex, any(Function));
      expect(dispatcher.register).
      toHaveBeenCalledWith(_selectionActions.SelectVertex, any(Function));
      expect(dispatcher.register).
      toHaveBeenCalledWith(_selectionActions.DeselectEdge, any(Function));
      expect(dispatcher.register).
      toHaveBeenCalledWith(_selectionActions.SelectEdge, any(Function));});


    it('sets up an empty selection upon creation', function () {
      var actual = store.selection.toJS();
      expect((0, _diff['default'])((0, _selectionModel.Selection)().toJS(), actual)).toEqual({});});


    describe('asked to select a vertex', function () {
      beforeEach(function () {
        dispatcher.handleAction((0, _selectionActions.SelectVertex)({ vertex: (0, _graphGraphModel.Vertex)({ id: 'vA' }) }));});


      it('adds the vertex id to the selection', function () {
        var actual = store.selection.vertices.toJS();
        expect((0, _diff['default'])(_immutable.Set.of('vA').toJS(), actual)).toEqual({});});


      describe('and to de-select it again', function () {
        beforeEach(function () {
          dispatcher.handleAction(
          (0, _selectionActions.DeselectVertex)({ vertex: (0, _graphGraphModel.Vertex)({ id: 'vA' }) }));});



        it('removes the vertex id from the selection', function () {
          var actual = store.selection.toJS();
          expect((0, _diff['default'])((0, _selectionModel.Selection)().toJS(), actual)).toEqual({});});});



      describe('and then to clear the selection', function () {
        beforeEach(function () {
          dispatcher.handleAction((0, _selectionActions.ClearSelection)());});


        it('removes the vertex id from the selection', function () {
          var actual = store.selection.vertices.toJS();
          expect((0, _diff['default'])((0, _immutable.Set)().toJS(), actual)).toEqual({});});});});




    describe('asked to select an edge', function () {
      beforeEach(function () {
        dispatcher.handleAction((0, _selectionActions.SelectEdge)({ edge: (0, _graphGraphModel.Edge)({ id: 'r0' }) }));});


      it('adds the edge id to the selection', function () {
        var expected = _immutable.Set.of('r0').toJS();
        var actual = store.selection.edges.toJS();
        expect((0, _diff['default'])(expected, actual)).toEqual({});});


      describe('and to de-select it again', function () {
        beforeEach(function () {
          dispatcher.handleAction((0, _selectionActions.DeselectEdge)({ edge: (0, _graphGraphModel.Edge)({ id: 'r0' }) }));});


        it('removes the edge id from the selection', function () {
          var actual = store.selection.edges.toJS();
          expect((0, _diff['default'])((0, _selectionModel.Selection)().edges.toJS(), actual)).toEqual({});});});



      describe('and then to clear the selection', function () {
        beforeEach(function () {
          dispatcher.handleAction((0, _selectionActions.ClearSelection)());});


        it('removes the edge id from the selection', function () {
          var actual = store.selection.edges.toJS();
          expect((0, _diff['default'])((0, _immutable.Set)().toJS(), actual)).toEqual({});});});});




    describe('asked to size the (not yet existing) selection rectangle', function () {
      beforeEach(function () {
        dispatcher.handleAction((0, _selectionActions.ResizeSelection)({ 
          coords: (0, _layoutLayoutModel.Coords)({ left: 55, top: 40 }), 
          dimensions: (0, _layoutLayoutModel.Dimensions)({ width: 750, height: 140 }) }));});



      it('sets up an initial rectangle', function () {
        var expected = { 
          coords: (0, _layoutLayoutModel.Coords)({ left: 55, top: 40 }).toJS(), 
          dimensions: (0, _layoutLayoutModel.Dimensions)({ width: 750, height: 140 }).toJS() };

        var actual = store.selection.toJS();
        expect((0, _diff['default'])(expected.coords, actual.coords)).toEqual({});
        expect((0, _diff['default'])(expected.dimensions, actual.dimensions)).toEqual({});});


      it('adds intersecting vertices to the selection', function () {
        var actual = store.selection.vertices.toJS();
        expect((0, _diff['default'])(_immutable.Set.of('vA', 'vC').toJS(), actual)).toEqual({});});


      it('adds intersecting edges to the selection', function () {
        var actual = store.selection.edges.toJS();
        expect((0, _diff['default'])(_immutable.Set.of('r0').toJS(), actual)).toEqual({});});


      describe('then asked to grow it', function () {
        beforeEach(function () {
          dispatcher.handleAction((0, _selectionActions.ResizeSelection)({ 
            coords: (0, _layoutLayoutModel.Coords)({ left: 50, top: 40 }), 
            dimensions: (0, _layoutLayoutModel.Dimensions)({ width: 800, height: 600 }) }));});



        it('adds intersecting vertices to the selection', function () {
          var actual = store.selection.vertices.toJS();
          var expected = _immutable.Set.of('vA', 'vB', 'vC', 'vD').toJS();
          expect((0, _diff['default'])(expected, actual)).toEqual({});});


        it('adds intersecting edges to the selection', function () {
          var actual = store.selection.edges.toJS();
          expect((0, _diff['default'])(_immutable.Set.of('r0', 'f0').toJS(), actual)).toEqual({});});});



      describe('then asked to shrink it', function () {
        beforeEach(function () {
          dispatcher.handleAction((0, _selectionActions.ResizeSelection)({ 
            coords: (0, _layoutLayoutModel.Coords)({ left: 50, top: 40 }), 
            dimensions: (0, _layoutLayoutModel.Dimensions)({ width: 400, height: 120 }) }));});



        it('removes non-intersecting vertices to the selection', function () {
          var actual = store.selection.vertices.toJS();
          expect((0, _diff['default'])(_immutable.Set.of('vA').toJS(), actual)).toEqual({});});


        it('removes non-intersecting edges to the selection', function () {
          var actual = store.selection.edges.toJS();
          expect((0, _diff['default'])(_immutable.Set.of().toJS(), actual)).toEqual({});});});




      describe('then asked to delete it', function () {
        beforeEach(function () {
          dispatcher.handleAction((0, _selectionActions.DeleteSelection)());});


        it('dispatches actions to remove the selected vertices', function () {
          expect(dispatcher.dispatch).toHaveBeenCalledWith((0, _graphGraphActions.RemoveVertex)({ 
            vertexId: 'vA' }));

          expect(dispatcher.dispatch).toHaveBeenCalledWith((0, _graphGraphActions.RemoveVertex)({ 
            vertexId: 'vC' }));});



        it('dispatches actions to remove the selected edges', function () {
          expect(dispatcher.dispatch).toHaveBeenCalledWith((0, _graphGraphActions.RemoveEdge)({ 
            edgeId: 'r0' }));});});




      describe('when selected nodes are deleted', function () {
        beforeEach(function () {
          dispatcher.handleAction((0, _graphGraphActions.RemoveVertex)({ 
            vertexId: 'vA' }));

          dispatcher.handleAction((0, _graphGraphActions.RemoveEdge)({ 
            edgeId: 'r0' }));});




        it('modifies the selection vertices accordingly', function () {
          var actual = store.selection.vertices.toJS();
          expect((0, _diff['default'])(_immutable.Set.of('vC').toJS(), actual)).toEqual({});});


        it('modifies the selection edges accordingly', function () {
          var actual = store.selection.edges.toJS();
          expect((0, _diff['default'])(_immutable.Set.of().toJS(), actual)).toEqual({});});});});});});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mbHV4L3NlbGVjdGlvbi9zcGVjL3NlbGVjdGlvbi1zdG9yZS5zcGVjLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRDQSxXQUFTLFVBQVUsR0FBRztBQUNwQixXQUFPLGlCQVpQLE9BQU8sQ0FZYSxLQUFLLENBQUUsc0JBQVUsT0FBTyxDQUFDLEtBQUssQ0FBRSxDQUFDLENBQ3REOzs7QUFFRCxXQUFTLFdBQVcsR0FBRztBQUNyQixXQUFPLG1CQTFCUCxPQUFPLENBMEJjLE1BQU0sQ0FBRSx1QkFBVyxPQUFPLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FDMUQ7OztBQUVELFdBQVMsaUJBQWlCLEdBQUc7QUFDM0IsV0FBTyxtQkE5QlAsT0FBTyxDQThCYyxZQUFZLENBQUUsdUJBQVcsT0FBTyxDQUFDLFlBQVksQ0FBRSxDQUFDLENBQ3RFOzs7Ozs7O01BTU8sT0FBTyxHQUF1QyxNQUFNLENBQXBELE9BQU8sS0FBRSxRQUFRLEdBQTZCLE1BQU0sQ0FBM0MsUUFBUSxLQUFFLFVBQVUsR0FBaUIsTUFBTSxDQUFqQyxVQUFVLEtBQUUsTUFBTSxHQUFTLE1BQU0sQ0FBckIsTUFBTSxLQUFFLEVBQUUsR0FBSyxNQUFNLENBQWIsRUFBRTtBQUN6QyxLQUFHLEdBQUssT0FBTyxDQUFmLEdBQUc7O0FBRVgsVUFBUSxDQUFFLG1CQUFtQixFQUFFLFlBQU07O0FBRW5DLFFBQUksVUFBVSxDQUFDO0FBQ2YsUUFBSSxlQUFlLENBQUM7QUFDcEIsUUFBSSxjQUFjLENBQUM7QUFDbkIsUUFBSSxLQUFLLENBQUM7O0FBRVYsY0FBVSxDQUFFLFlBQU07QUFDaEIsZ0JBQVUsR0FBRyxnQ0FBb0IsQ0FBQztBQUNsQyxxQkFBZSxHQUFHO0FBQ2hCLGNBQU0sRUFBRSxXQUFXLEVBQUU7QUFDckIsb0JBQVksRUFBRSxpQkFBaUIsRUFBRSxFQUNsQyxDQUFDOztBQUNGLG9C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QUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQzdELENBQUUsQ0FBQzs7O0FBRUosVUFBRSxDQUFFLDBDQUEwQyxFQUFFLFlBQU07QUFDcEQsY0FBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUMsZ0JBQU0sQ0FBRSxzQkFBTSxXQWhTYixHQUFHLENBZ1NjLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLE1BQU0sQ0FBRSxDQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ3ZELENBQUUsQ0FBQyxDQUNMLENBQUUsQ0FBQyxDQUNMLENBQUUsQ0FBQyxDQUVMLENBQUUsQ0FBQyIsImZpbGUiOiJzZWxlY3Rpb24tc3RvcmUuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXQgfSBmcm9tICdpbW11dGFibGUnO1xuXG5pbXBvcnQgU2VsZWN0aW9uU3RvcmUgZnJvbSAnLi4vc2VsZWN0aW9uLXN0b3JlJztcbmltcG9ydCBEaXNwYXRjaGVyTW9jayBmcm9tICcuLi8uLi8uLi90ZXN0aW5nL2Rpc3BhdGNoZXItbW9jayc7XG5pbXBvcnQgZGlmZiBmcm9tICcuLi8uLi8uLi90ZXN0aW5nL2RpZmYnO1xuXG5pbXBvcnQge1xuICBDb3B5U2VsZWN0aW9uLFxuICBDdXRTZWxlY3Rpb24sXG4gIFBhc3RlQ2xpcGJvYXJkLFxuICBEZWxldGVTZWxlY3Rpb24sXG4gIFJlc2l6ZVNlbGVjdGlvbixcbiAgTW92ZVNlbGVjdGlvbixcbiAgQ2xlYXJTZWxlY3Rpb24sXG4gIERlc2VsZWN0VmVydGV4LFxuICBTZWxlY3RWZXJ0ZXgsXG4gIERlc2VsZWN0RWRnZSxcbiAgU2VsZWN0RWRnZVxufSBmcm9tICcuLi9zZWxlY3Rpb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7XG4gIENvb3JkcyxcbiAgRGltZW5zaW9ucyxcbiAgY29udmVydCBhcyBsYXlvdXRDb252ZXJ0XG59IGZyb20gJy4uLy4uL2xheW91dC9sYXlvdXQtbW9kZWwnO1xuXG5pbXBvcnQge1xuICBTZWxlY3Rpb25cbn0gZnJvbSAnLi4vc2VsZWN0aW9uLW1vZGVsJztcblxuaW1wb3J0IHtcbiAgRWRnZSxcbiAgVmVydGV4LFxuICBjb252ZXJ0IGFzIGdyYXBoQ29udmVydFxufSBmcm9tICcuLi8uLi9ncmFwaC9ncmFwaC1tb2RlbCc7XG5cbmltcG9ydCB7XG4gIFJlbW92ZVZlcnRleCxcbiAgUmVtb3ZlRWRnZVxufSBmcm9tICcuLi8uLi9ncmFwaC9ncmFwaC1hY3Rpb25zJztcblxuaW1wb3J0IGxheW91dERhdGEgZnJvbSAnLi4vLi4vbGF5b3V0L3NwZWMvZGF0YSc7XG5pbXBvcnQgZ3JhcGhEYXRhIGZyb20gJy4uLy4uL2dyYXBoL3NwZWMvZGF0YSc7XG5cbmZ1bmN0aW9uIGR1bW15R3JhcGgoKSB7XG4gIHJldHVybiBncmFwaENvbnZlcnQuZ3JhcGgoIGdyYXBoRGF0YS5pbml0aWFsLmdyYXBoICk7XG59XG5cbmZ1bmN0aW9uIGR1bW15TGF5b3V0KCkge1xuICByZXR1cm4gbGF5b3V0Q29udmVydC5sYXlvdXQoIGxheW91dERhdGEuaW5pdGlhbC5sYXlvdXQgKTtcbn1cblxuZnVuY3Rpb24gZHVtbXlNZWFzdXJlbWVudHMoKSB7XG4gIHJldHVybiBsYXlvdXRDb252ZXJ0Lm1lYXN1cmVtZW50cyggbGF5b3V0RGF0YS5pbml0aWFsLm1lYXN1cmVtZW50cyApO1xufVxuXG5cblxuXG4vLyBKYXNtaW5lOlxuY29uc3QgeyBqYXNtaW5lLCBkZXNjcmliZSwgYmVmb3JlRWFjaCwgZXhwZWN0LCBpdCB9ID0gd2luZG93O1xuY29uc3QgeyBhbnkgfSA9IGphc21pbmU7XG5cbmRlc2NyaWJlKCAnQSBzZWxlY3Rpb24gc3RvcmUnLCAoKSA9PiB7XG5cbiAgdmFyIGRpc3BhdGNoZXI7XG4gIHZhciBsYXlvdXRTdG9yZU1vY2s7XG4gIHZhciBncmFwaFN0b3JlTW9jaztcbiAgdmFyIHN0b3JlO1xuXG4gIGJlZm9yZUVhY2goICgpID0+IHtcbiAgICBkaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXJNb2NrKCk7XG4gICAgbGF5b3V0U3RvcmVNb2NrID0ge1xuICAgICAgbGF5b3V0OiBkdW1teUxheW91dCgpLFxuICAgICAgbWVhc3VyZW1lbnRzOiBkdW1teU1lYXN1cmVtZW50cygpXG4gICAgfTtcbiAgICBncmFwaFN0b3JlTW9jayA9IHtcbiAgICAgIGdyYXBoOiBkdW1teUdyYXBoKClcbiAgICB9O1xuICAgIHN0b3JlID0gbmV3IFNlbGVjdGlvblN0b3JlKCBkaXNwYXRjaGVyLCBsYXlvdXRTdG9yZU1vY2ssIGdyYXBoU3RvcmVNb2NrICk7XG4gIH0gKTtcblxuICBpdCggJ2hhbmRsZXMgc2VsZWN0aW9uIHN0YXRlIGFjdGlvbnMnLCAoKSA9PiB7XG4gICAgZXhwZWN0KCBkaXNwYXRjaGVyLnJlZ2lzdGVyIClcbiAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCggQ29weVNlbGVjdGlvbiwgYW55KCBGdW5jdGlvbiApICk7XG4gICAgZXhwZWN0KCBkaXNwYXRjaGVyLnJlZ2lzdGVyIClcbiAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCggQ3V0U2VsZWN0aW9uLCBhbnkoIEZ1bmN0aW9uICkgKTtcbiAgICBleHBlY3QoIGRpc3BhdGNoZXIucmVnaXN0ZXIgKVxuICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCBDbGVhclNlbGVjdGlvbiwgYW55KCBGdW5jdGlvbiApICk7XG4gICAgZXhwZWN0KCBkaXNwYXRjaGVyLnJlZ2lzdGVyIClcbiAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCggUGFzdGVDbGlwYm9hcmQsIGFueSggRnVuY3Rpb24gKSApO1xuICAgIGV4cGVjdCggZGlzcGF0Y2hlci5yZWdpc3RlciApXG4gICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoIERlbGV0ZVNlbGVjdGlvbiwgYW55KCBGdW5jdGlvbiApICk7XG4gICAgZXhwZWN0KCBkaXNwYXRjaGVyLnJlZ2lzdGVyIClcbiAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCggUmVzaXplU2VsZWN0aW9uLCBhbnkoIEZ1bmN0aW9uICkgKTtcbiAgICBleHBlY3QoIGRpc3BhdGNoZXIucmVnaXN0ZXIgKVxuICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCBNb3ZlU2VsZWN0aW9uLCBhbnkoIEZ1bmN0aW9uICkgKTtcbiAgICBleHBlY3QoIGRpc3BhdGNoZXIucmVnaXN0ZXIgKVxuICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCBEZXNlbGVjdFZlcnRleCwgYW55KCBGdW5jdGlvbiApICk7XG4gICAgZXhwZWN0KCBkaXNwYXRjaGVyLnJlZ2lzdGVyIClcbiAgICAgIC50b0hhdmVCZWVuQ2FsbGVkV2l0aCggU2VsZWN0VmVydGV4LCBhbnkoIEZ1bmN0aW9uICkgKTtcbiAgICBleHBlY3QoIGRpc3BhdGNoZXIucmVnaXN0ZXIgKVxuICAgICAgLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCBEZXNlbGVjdEVkZ2UsIGFueSggRnVuY3Rpb24gKSApO1xuICAgIGV4cGVjdCggZGlzcGF0Y2hlci5yZWdpc3RlciApXG4gICAgICAudG9IYXZlQmVlbkNhbGxlZFdpdGgoIFNlbGVjdEVkZ2UsIGFueSggRnVuY3Rpb24gKSApO1xuICB9ICk7XG5cbiAgaXQoICdzZXRzIHVwIGFuIGVtcHR5IHNlbGVjdGlvbiB1cG9uIGNyZWF0aW9uJywgKCkgPT4ge1xuICAgIGNvbnN0IGFjdHVhbCA9IHN0b3JlLnNlbGVjdGlvbi50b0pTKCk7XG4gICAgZXhwZWN0KCBkaWZmKCBTZWxlY3Rpb24oKS50b0pTKCksIGFjdHVhbCApICkudG9FcXVhbCh7fSk7XG4gIH0gKTtcblxuICBkZXNjcmliZSggJ2Fza2VkIHRvIHNlbGVjdCBhIHZlcnRleCcsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCAoKSA9PiB7XG4gICAgICBkaXNwYXRjaGVyLmhhbmRsZUFjdGlvbiggU2VsZWN0VmVydGV4KHsgdmVydGV4OiBWZXJ0ZXgoeyBpZDogJ3ZBJyB9KSB9KSApO1xuICAgIH0gKTtcblxuICAgIGl0KCAnYWRkcyB0aGUgdmVydGV4IGlkIHRvIHRoZSBzZWxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3R1YWwgPSBzdG9yZS5zZWxlY3Rpb24udmVydGljZXMudG9KUygpO1xuICAgICAgZXhwZWN0KCBkaWZmKCBTZXQub2YoICd2QScgKS50b0pTKCksIGFjdHVhbCApICkudG9FcXVhbCh7fSk7XG4gICAgfSApO1xuXG4gICAgZGVzY3JpYmUoICdhbmQgdG8gZGUtc2VsZWN0IGl0IGFnYWluJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCggKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaGVyLmhhbmRsZUFjdGlvbihcbiAgICAgICAgICBEZXNlbGVjdFZlcnRleCh7IHZlcnRleDogVmVydGV4KHsgaWQ6ICd2QScgfSkgfSlcbiAgICAgICAgKTtcbiAgICAgIH0gKTtcblxuICAgICAgaXQoICdyZW1vdmVzIHRoZSB2ZXJ0ZXggaWQgZnJvbSB0aGUgc2VsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3R1YWwgPSBzdG9yZS5zZWxlY3Rpb24udG9KUygpO1xuICAgICAgICBleHBlY3QoIGRpZmYoIFNlbGVjdGlvbigpLnRvSlMoKSwgYWN0dWFsICkgKS50b0VxdWFsKHt9KTtcbiAgICAgIH0gKTtcbiAgICB9ICk7XG5cbiAgICBkZXNjcmliZSggJ2FuZCB0aGVuIHRvIGNsZWFyIHRoZSBzZWxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlQWN0aW9uKCBDbGVhclNlbGVjdGlvbigpICk7XG4gICAgICB9ICk7XG5cbiAgICAgIGl0KCAncmVtb3ZlcyB0aGUgdmVydGV4IGlkIGZyb20gdGhlIHNlbGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gc3RvcmUuc2VsZWN0aW9uLnZlcnRpY2VzLnRvSlMoKTtcbiAgICAgICAgZXhwZWN0KCBkaWZmKCBTZXQoKS50b0pTKCksIGFjdHVhbCApICkudG9FcXVhbCh7fSk7XG4gICAgICB9ICk7XG4gICAgfSApO1xuICB9ICk7XG5cbiAgZGVzY3JpYmUoICdhc2tlZCB0byBzZWxlY3QgYW4gZWRnZScsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCAoKSA9PiB7XG4gICAgICBkaXNwYXRjaGVyLmhhbmRsZUFjdGlvbiggU2VsZWN0RWRnZSh7IGVkZ2U6IEVkZ2UoeyBpZDogJ3IwJyB9KSB9KSApO1xuICAgIH0gKTtcblxuICAgIGl0KCAnYWRkcyB0aGUgZWRnZSBpZCB0byB0aGUgc2VsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBTZXQub2YoICdyMCcgKS50b0pTKCk7XG4gICAgICBjb25zdCBhY3R1YWwgPSBzdG9yZS5zZWxlY3Rpb24uZWRnZXMudG9KUygpO1xuICAgICAgZXhwZWN0KCBkaWZmKCBleHBlY3RlZCwgYWN0dWFsICkgKS50b0VxdWFsKHt9KTtcbiAgICB9ICk7XG5cbiAgICBkZXNjcmliZSggJ2FuZCB0byBkZS1zZWxlY3QgaXQgYWdhaW4nLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlQWN0aW9uKCBEZXNlbGVjdEVkZ2UoeyBlZGdlOiBFZGdlKHsgaWQ6ICdyMCcgfSkgfSkgKTtcbiAgICAgIH0gKTtcblxuICAgICAgaXQoICdyZW1vdmVzIHRoZSBlZGdlIGlkIGZyb20gdGhlIHNlbGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gc3RvcmUuc2VsZWN0aW9uLmVkZ2VzLnRvSlMoKTtcbiAgICAgICAgZXhwZWN0KCBkaWZmKCBTZWxlY3Rpb24oKS5lZGdlcy50b0pTKCksIGFjdHVhbCApICkudG9FcXVhbCh7fSk7XG4gICAgICB9ICk7XG4gICAgfSApO1xuXG4gICAgZGVzY3JpYmUoICdhbmQgdGhlbiB0byBjbGVhciB0aGUgc2VsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCggKCkgPT4ge1xuICAgICAgICBkaXNwYXRjaGVyLmhhbmRsZUFjdGlvbiggQ2xlYXJTZWxlY3Rpb24oKSApO1xuICAgICAgfSApO1xuXG4gICAgICBpdCggJ3JlbW92ZXMgdGhlIGVkZ2UgaWQgZnJvbSB0aGUgc2VsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3R1YWwgPSBzdG9yZS5zZWxlY3Rpb24uZWRnZXMudG9KUygpO1xuICAgICAgICBleHBlY3QoIGRpZmYoIFNldCgpLnRvSlMoKSwgYWN0dWFsICkgKS50b0VxdWFsKHt9KTtcbiAgICAgIH0gKTtcbiAgICB9ICk7XG4gIH0gKTtcblxuICBkZXNjcmliZSggJ2Fza2VkIHRvIHNpemUgdGhlIChub3QgeWV0IGV4aXN0aW5nKSBzZWxlY3Rpb24gcmVjdGFuZ2xlJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goICgpID0+IHtcbiAgICAgIGRpc3BhdGNoZXIuaGFuZGxlQWN0aW9uKCBSZXNpemVTZWxlY3Rpb24oe1xuICAgICAgICBjb29yZHM6IENvb3Jkcyh7IGxlZnQ6IDU1LCB0b3A6IDQwIH0pLFxuICAgICAgICBkaW1lbnNpb25zOiBEaW1lbnNpb25zKHsgd2lkdGg6IDc1MCwgaGVpZ2h0OiAxNDAgfSlcbiAgICAgIH0pICk7XG4gICAgfSApO1xuXG4gICAgaXQoICdzZXRzIHVwIGFuIGluaXRpYWwgcmVjdGFuZ2xlJywgKCkgPT4ge1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSB7XG4gICAgICAgIGNvb3JkczogQ29vcmRzKHsgbGVmdDogNTUsIHRvcDogNDAgfSkudG9KUygpLFxuICAgICAgICBkaW1lbnNpb25zOiBEaW1lbnNpb25zKHsgd2lkdGg6IDc1MCwgaGVpZ2h0OiAxNDAgfSkudG9KUygpXG4gICAgICB9O1xuICAgICAgY29uc3QgYWN0dWFsID0gc3RvcmUuc2VsZWN0aW9uLnRvSlMoKTtcbiAgICAgIGV4cGVjdCggZGlmZiggZXhwZWN0ZWQuY29vcmRzLCBhY3R1YWwuY29vcmRzICkgKS50b0VxdWFsKHt9KTtcbiAgICAgIGV4cGVjdCggZGlmZiggZXhwZWN0ZWQuZGltZW5zaW9ucywgYWN0dWFsLmRpbWVuc2lvbnMgKSApLnRvRXF1YWwoe30pO1xuICAgIH0gKTtcblxuICAgIGl0KCAnYWRkcyBpbnRlcnNlY3RpbmcgdmVydGljZXMgdG8gdGhlIHNlbGVjdGlvbicsICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IHN0b3JlLnNlbGVjdGlvbi52ZXJ0aWNlcy50b0pTKCk7XG4gICAgICBleHBlY3QoIGRpZmYoIFNldC5vZiggJ3ZBJywgJ3ZDJyApLnRvSlMoKSwgYWN0dWFsICkgKS50b0VxdWFsKHt9KTtcbiAgICB9ICk7XG5cbiAgICBpdCggJ2FkZHMgaW50ZXJzZWN0aW5nIGVkZ2VzIHRvIHRoZSBzZWxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICBjb25zdCBhY3R1YWwgPSBzdG9yZS5zZWxlY3Rpb24uZWRnZXMudG9KUygpO1xuICAgICAgZXhwZWN0KCBkaWZmKCBTZXQub2YoICdyMCcgKS50b0pTKCksIGFjdHVhbCApICkudG9FcXVhbCh7fSk7XG4gICAgfSApO1xuXG4gICAgZGVzY3JpYmUoICd0aGVuIGFza2VkIHRvIGdyb3cgaXQnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlQWN0aW9uKCBSZXNpemVTZWxlY3Rpb24oe1xuICAgICAgICAgIGNvb3JkczogQ29vcmRzKHsgbGVmdDogNTAsIHRvcDogNDAgfSksXG4gICAgICAgICAgZGltZW5zaW9uczogRGltZW5zaW9ucyh7IHdpZHRoOiA4MDAsIGhlaWdodDogNjAwIH0pXG4gICAgICAgIH0pICk7XG4gICAgICB9ICk7XG5cbiAgICAgIGl0KCAnYWRkcyBpbnRlcnNlY3RpbmcgdmVydGljZXMgdG8gdGhlIHNlbGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gc3RvcmUuc2VsZWN0aW9uLnZlcnRpY2VzLnRvSlMoKTtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBTZXQub2YoICd2QScsICd2QicsICd2QycsICd2RCcgKS50b0pTKCk7XG4gICAgICAgIGV4cGVjdCggZGlmZiggZXhwZWN0ZWQsIGFjdHVhbCApICkudG9FcXVhbCh7fSk7XG4gICAgICB9ICk7XG5cbiAgICAgIGl0KCAnYWRkcyBpbnRlcnNlY3RpbmcgZWRnZXMgdG8gdGhlIHNlbGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gc3RvcmUuc2VsZWN0aW9uLmVkZ2VzLnRvSlMoKTtcbiAgICAgICAgZXhwZWN0KCBkaWZmKCBTZXQub2YoICdyMCcsICdmMCcgKS50b0pTKCksIGFjdHVhbCApICkudG9FcXVhbCh7fSk7XG4gICAgICB9ICk7XG4gICAgfSApO1xuXG4gICAgZGVzY3JpYmUoICd0aGVuIGFza2VkIHRvIHNocmluayBpdCcsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2hlci5oYW5kbGVBY3Rpb24oIFJlc2l6ZVNlbGVjdGlvbih7XG4gICAgICAgICAgY29vcmRzOiBDb29yZHMoeyBsZWZ0OiA1MCwgdG9wOiA0MCB9KSxcbiAgICAgICAgICBkaW1lbnNpb25zOiBEaW1lbnNpb25zKHsgd2lkdGg6IDQwMCwgaGVpZ2h0OiAxMjAgfSlcbiAgICAgICAgfSkgKTtcbiAgICAgIH0gKTtcblxuICAgICAgaXQoICdyZW1vdmVzIG5vbi1pbnRlcnNlY3RpbmcgdmVydGljZXMgdG8gdGhlIHNlbGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gc3RvcmUuc2VsZWN0aW9uLnZlcnRpY2VzLnRvSlMoKTtcbiAgICAgICAgZXhwZWN0KCBkaWZmKCBTZXQub2YoICd2QScgKS50b0pTKCksIGFjdHVhbCApICkudG9FcXVhbCh7fSk7XG4gICAgICB9ICk7XG5cbiAgICAgIGl0KCAncmVtb3ZlcyBub24taW50ZXJzZWN0aW5nIGVkZ2VzIHRvIHRoZSBzZWxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IHN0b3JlLnNlbGVjdGlvbi5lZGdlcy50b0pTKCk7XG4gICAgICAgIGV4cGVjdCggZGlmZiggU2V0Lm9mKCkudG9KUygpLCBhY3R1YWwgKSApLnRvRXF1YWwoe30pO1xuICAgICAgfSApO1xuICAgIH0gKTtcblxuXG4gICAgZGVzY3JpYmUoICd0aGVuIGFza2VkIHRvIGRlbGV0ZSBpdCcsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goICgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2hlci5oYW5kbGVBY3Rpb24oIERlbGV0ZVNlbGVjdGlvbigpICk7XG4gICAgICB9ICk7XG5cbiAgICAgIGl0KCAnZGlzcGF0Y2hlcyBhY3Rpb25zIHRvIHJlbW92ZSB0aGUgc2VsZWN0ZWQgdmVydGljZXMnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCggZGlzcGF0Y2hlci5kaXNwYXRjaCApLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCBSZW1vdmVWZXJ0ZXgoe1xuICAgICAgICAgIHZlcnRleElkOiAndkEnXG4gICAgICAgIH0pICk7XG4gICAgICAgIGV4cGVjdCggZGlzcGF0Y2hlci5kaXNwYXRjaCApLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCBSZW1vdmVWZXJ0ZXgoe1xuICAgICAgICAgIHZlcnRleElkOiAndkMnXG4gICAgICAgIH0pICk7XG4gICAgICB9ICk7XG5cbiAgICAgIGl0KCAnZGlzcGF0Y2hlcyBhY3Rpb25zIHRvIHJlbW92ZSB0aGUgc2VsZWN0ZWQgZWRnZXMnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCggZGlzcGF0Y2hlci5kaXNwYXRjaCApLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCBSZW1vdmVFZGdlKHtcbiAgICAgICAgICBlZGdlSWQ6ICdyMCdcbiAgICAgICAgfSkgKTtcbiAgICAgIH0gKTtcbiAgICB9ICk7XG5cbiAgICBkZXNjcmliZSggJ3doZW4gc2VsZWN0ZWQgbm9kZXMgYXJlIGRlbGV0ZWQnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlQWN0aW9uKCBSZW1vdmVWZXJ0ZXgoe1xuICAgICAgICAgIHZlcnRleElkOiAndkEnXG4gICAgICAgIH0pICk7XG4gICAgICAgIGRpc3BhdGNoZXIuaGFuZGxlQWN0aW9uKCBSZW1vdmVFZGdlKHtcbiAgICAgICAgICBlZGdlSWQ6ICdyMCdcbiAgICAgICAgfSkgKTtcblxuICAgICAgfSApO1xuXG4gICAgICBpdCggJ21vZGlmaWVzIHRoZSBzZWxlY3Rpb24gdmVydGljZXMgYWNjb3JkaW5nbHknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IHN0b3JlLnNlbGVjdGlvbi52ZXJ0aWNlcy50b0pTKCk7XG4gICAgICAgIGV4cGVjdCggZGlmZiggU2V0Lm9mKCAndkMnICkudG9KUygpLCBhY3R1YWwgKSApLnRvRXF1YWwoe30pO1xuICAgICAgfSApO1xuXG4gICAgICBpdCggJ21vZGlmaWVzIHRoZSBzZWxlY3Rpb24gZWRnZXMgYWNjb3JkaW5nbHknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IHN0b3JlLnNlbGVjdGlvbi5lZGdlcy50b0pTKCk7XG4gICAgICAgIGV4cGVjdCggZGlmZiggU2V0Lm9mKCkudG9KUygpLCBhY3R1YWwgKSApLnRvRXF1YWwoe30pO1xuICAgICAgfSApO1xuICAgIH0gKTtcbiAgfSApO1xuXG59ICk7XG4iXX0=