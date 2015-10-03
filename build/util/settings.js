define(["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = {

    layout: {
      /** When dragging a port, how much to set it off left and top. */
      portOffset: 8,
      /** When dragging an edge, how much to set it off left and top. */
      edgeOffset: 10,
      /** How much padding to use when applying an automatic graph layout. */
      graphPadding: 40
    },

    pathing: {
      /** Length of the horizontal connection stubs where links are attached to ports or edges. */
      stubLength: 20,
      /** Size of the path arrow head. */
      arrowHeadLength: 3,
      /** Smoothness at path turning points. */
      curvePadding: 8
    },

    async: {
      /** Fixup delay after a ui-triggered operation to ensure eventual consistency with ui state. */
      fixupDelay: 20,
      /** Debounce delay to throttle (expensive) operations e.g. during drag/drop */
      uiThrottleDelay: 3
    }

  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3NldHRpbmdzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7bUJBQWU7O0FBRWIsVUFBTSxFQUFFOztBQUVOLGdCQUFVLEVBQUUsQ0FBQzs7QUFFYixnQkFBVSxFQUFFLEVBQUU7O0FBRWQsa0JBQVksRUFBRSxFQUFFO0tBQ2pCOztBQUVELFdBQU8sRUFBRTs7QUFFUCxnQkFBVSxFQUFFLEVBQUU7O0FBRWQscUJBQWUsRUFBRSxDQUFDOztBQUVsQixrQkFBWSxFQUFFLENBQUM7S0FDaEI7O0FBRUQsU0FBSyxFQUFFOztBQUVMLGdCQUFVLEVBQUUsRUFBRTs7QUFFZCxxQkFBZSxFQUFFLENBQUM7S0FDbkI7O0dBRUYiLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuXG4gIGxheW91dDoge1xuICAgIC8qKiBXaGVuIGRyYWdnaW5nIGEgcG9ydCwgaG93IG11Y2ggdG8gc2V0IGl0IG9mZiBsZWZ0IGFuZCB0b3AuICovXG4gICAgcG9ydE9mZnNldDogOCxcbiAgICAvKiogV2hlbiBkcmFnZ2luZyBhbiBlZGdlLCBob3cgbXVjaCB0byBzZXQgaXQgb2ZmIGxlZnQgYW5kIHRvcC4gKi9cbiAgICBlZGdlT2Zmc2V0OiAxMCxcbiAgICAvKiogSG93IG11Y2ggcGFkZGluZyB0byB1c2Ugd2hlbiBhcHBseWluZyBhbiBhdXRvbWF0aWMgZ3JhcGggbGF5b3V0LiAqL1xuICAgIGdyYXBoUGFkZGluZzogNDBcbiAgfSxcblxuICBwYXRoaW5nOiB7XG4gICAgLyoqIExlbmd0aCBvZiB0aGUgaG9yaXpvbnRhbCBjb25uZWN0aW9uIHN0dWJzIHdoZXJlIGxpbmtzIGFyZSBhdHRhY2hlZCB0byBwb3J0cyBvciBlZGdlcy4gKi9cbiAgICBzdHViTGVuZ3RoOiAyMCxcbiAgICAvKiogU2l6ZSBvZiB0aGUgcGF0aCBhcnJvdyBoZWFkLiAqL1xuICAgIGFycm93SGVhZExlbmd0aDogMyxcbiAgICAvKiogU21vb3RobmVzcyBhdCBwYXRoIHR1cm5pbmcgcG9pbnRzLiAqL1xuICAgIGN1cnZlUGFkZGluZzogOFxuICB9LFxuXG4gIGFzeW5jOiB7XG4gICAgLyoqIEZpeHVwIGRlbGF5IGFmdGVyIGEgdWktdHJpZ2dlcmVkIG9wZXJhdGlvbiB0byBlbnN1cmUgZXZlbnR1YWwgY29uc2lzdGVuY3kgd2l0aCB1aSBzdGF0ZS4gKi9cbiAgICBmaXh1cERlbGF5OiAyMCxcbiAgICAvKiogRGVib3VuY2UgZGVsYXkgdG8gdGhyb3R0bGUgKGV4cGVuc2l2ZSkgb3BlcmF0aW9ucyBlLmcuIGR1cmluZyBkcmFnL2Ryb3AgKi9cbiAgICB1aVRocm90dGxlRGVsYXk6IDNcbiAgfVxuXG59O1xuIl19