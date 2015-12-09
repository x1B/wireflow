define(["exports", "module"], function (exports, module) {"use strict";module.exports = { 

    layout: { 
      /** When dragging a port, how much to set it off left and top. */
      portOffset: 8, 
      /** When dragging an edge, how much to set it off left and top. */
      edgeOffset: 10, 
      /** How much padding to use when applying an automatic graph layout. */
      graphPadding: 40 }, 


    pathing: { 
      /** Length of the horizontal connection stubs where links are attached to ports or edges. */
      stubLength: 20, 
      /** Size of the path arrow head. */
      arrowHeadLength: 3, 
      /** Smoothness at path turning points. */
      curvePadding: 8 }, 


    async: { 
      /** Fixup delay after a ui-triggered operation to ensure eventual consistency with ui state. */
      fixupDelay: 20, 
      /** Debounce delay to throttle (expensive) operations e.g. during drag/drop */
      uiThrottleDelay: 3 } };});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3NldHRpbmdzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoid0ZBQWU7O0FBRWIsVUFBTSxFQUFFOztBQUVOLGdCQUFVLEVBQUUsQ0FBQzs7QUFFYixnQkFBVSxFQUFFLEVBQUU7O0FBRWQsa0JBQVksRUFBRSxFQUFFLEVBQ2pCOzs7QUFFRCxXQUFPLEVBQUU7O0FBRVAsZ0JBQVUsRUFBRSxFQUFFOztBQUVkLHFCQUFlLEVBQUUsQ0FBQzs7QUFFbEIsa0JBQVksRUFBRSxDQUFDLEVBQ2hCOzs7QUFFRCxTQUFLLEVBQUU7O0FBRUwsZ0JBQVUsRUFBRSxFQUFFOztBQUVkLHFCQUFlLEVBQUUsQ0FBQyxFQUNuQixFQUVGIiwiZmlsZSI6InNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcblxuICBsYXlvdXQ6IHtcbiAgICAvKiogV2hlbiBkcmFnZ2luZyBhIHBvcnQsIGhvdyBtdWNoIHRvIHNldCBpdCBvZmYgbGVmdCBhbmQgdG9wLiAqL1xuICAgIHBvcnRPZmZzZXQ6IDgsXG4gICAgLyoqIFdoZW4gZHJhZ2dpbmcgYW4gZWRnZSwgaG93IG11Y2ggdG8gc2V0IGl0IG9mZiBsZWZ0IGFuZCB0b3AuICovXG4gICAgZWRnZU9mZnNldDogMTAsXG4gICAgLyoqIEhvdyBtdWNoIHBhZGRpbmcgdG8gdXNlIHdoZW4gYXBwbHlpbmcgYW4gYXV0b21hdGljIGdyYXBoIGxheW91dC4gKi9cbiAgICBncmFwaFBhZGRpbmc6IDQwXG4gIH0sXG5cbiAgcGF0aGluZzoge1xuICAgIC8qKiBMZW5ndGggb2YgdGhlIGhvcml6b250YWwgY29ubmVjdGlvbiBzdHVicyB3aGVyZSBsaW5rcyBhcmUgYXR0YWNoZWQgdG8gcG9ydHMgb3IgZWRnZXMuICovXG4gICAgc3R1Ykxlbmd0aDogMjAsXG4gICAgLyoqIFNpemUgb2YgdGhlIHBhdGggYXJyb3cgaGVhZC4gKi9cbiAgICBhcnJvd0hlYWRMZW5ndGg6IDMsXG4gICAgLyoqIFNtb290aG5lc3MgYXQgcGF0aCB0dXJuaW5nIHBvaW50cy4gKi9cbiAgICBjdXJ2ZVBhZGRpbmc6IDhcbiAgfSxcblxuICBhc3luYzoge1xuICAgIC8qKiBGaXh1cCBkZWxheSBhZnRlciBhIHVpLXRyaWdnZXJlZCBvcGVyYXRpb24gdG8gZW5zdXJlIGV2ZW50dWFsIGNvbnNpc3RlbmN5IHdpdGggdWkgc3RhdGUuICovXG4gICAgZml4dXBEZWxheTogMjAsXG4gICAgLyoqIERlYm91bmNlIGRlbGF5IHRvIHRocm90dGxlIChleHBlbnNpdmUpIG9wZXJhdGlvbnMgZS5nLiBkdXJpbmcgZHJhZy9kcm9wICovXG4gICAgdWlUaHJvdHRsZURlbGF5OiAzXG4gIH1cblxufTtcbiJdfQ==