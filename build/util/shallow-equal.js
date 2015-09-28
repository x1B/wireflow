define(["exports", "module"], function (exports, module) {
   /*
    * Source is based on React v0.13.3 shallowEqual
    *
    * Copyright 2013-2015, Facebook, Inc.
    * Licensed under the BSD-license (contained in this directory).
    */
   /*eslint complexity:0, computed-property-spacing: 0 */
   "use strict";

   module.exports = shallowEqual;

   function shallowEqual(objA, objB) {
      if (objA === objB) {
         return true;
      }

      var key;

      // Test for A's keys different from B.
      for (key in objA) {
         if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
            return false;
         }
      }

      // Test for B's keys missing from A.
      for (key in objB) {
         if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
            return false;
         }
      }

      return true;
   }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3NoYWxsb3ctZXF1YWwuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7b0JBT3dCLFlBQVk7O0FBQXJCLFlBQVMsWUFBWSxDQUFFLElBQUksRUFBRSxJQUFJLEVBQUc7QUFDaEQsVUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQ2hCLGdCQUFPLElBQUksQ0FBQztPQUNkOztBQUVELFVBQUksR0FBRyxDQUFDOzs7QUFHUixXQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFDZixhQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsRUFBRztBQUNyRixtQkFBTyxLQUFLLENBQUM7VUFDZjtPQUNIOzs7QUFHRCxXQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFDZixhQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3hELG1CQUFPLEtBQUssQ0FBQztVQUNmO09BQ0g7O0FBRUQsYUFBTyxJQUFJLENBQUM7SUFDZCIsImZpbGUiOiJzaGFsbG93LWVxdWFsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTb3VyY2UgaXMgYmFzZWQgb24gUmVhY3QgdjAuMTMuMyBzaGFsbG93RXF1YWxcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC1saWNlbnNlIChjb250YWluZWQgaW4gdGhpcyBkaXJlY3RvcnkpLlxuICovXG4vKmVzbGludCBjb21wbGV4aXR5OjAsIGNvbXB1dGVkLXByb3BlcnR5LXNwYWNpbmc6IDAgKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoYWxsb3dFcXVhbCggb2JqQSwgb2JqQiApIHtcbiAgIGlmIChvYmpBID09PSBvYmpCKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgIH1cblxuICAgdmFyIGtleTtcblxuICAgLy8gVGVzdCBmb3IgQSdzIGtleXMgZGlmZmVyZW50IGZyb20gQi5cbiAgIGZvciAoa2V5IGluIG9iakEpIHtcbiAgICAgIGlmIChvYmpBLmhhc093blByb3BlcnR5KGtleSkgJiYgKCFvYmpCLmhhc093blByb3BlcnR5KGtleSkgfHwgb2JqQVtrZXldICE9PSBvYmpCW2tleV0pKSB7XG4gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICB9XG5cbiAgIC8vIFRlc3QgZm9yIEIncyBrZXlzIG1pc3NpbmcgZnJvbSBBLlxuICAgZm9yIChrZXkgaW4gb2JqQikge1xuICAgICAgaWYgKG9iakIuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhb2JqQS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICB9XG5cbiAgIHJldHVybiB0cnVlO1xufVxuIl19