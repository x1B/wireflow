define(["exports", "module"], function (exports, module) {/*
                                                           * Source is based on React v0.13.3 shallowEqual
                                                           *
                                                           * Copyright 2013-2015, Facebook, Inc.
                                                           * Licensed under the BSD-license (contained in this directory).
                                                           */
   /*eslint complexity:0, computed-property-spacing: 0 */"use strict";module.exports = 
   shallowEqual;function shallowEqual(objA, objB) {
      if (objA === objB) {
         return true;}


      var key;

      // Test for A's keys different from B.
      for (key in objA) {
         if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] != objB[key])) {
            return false;}}



      // Test for B's keys missing from A.
      for (key in objB) {
         if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
            return false;}}



      return true;}});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3NoYWxsb3ctZXF1YWwuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFPd0IsZUFBWSxDQUFyQixTQUFTLFlBQVksQ0FBRSxJQUFJLEVBQUUsSUFBSSxFQUFHO0FBQ2hELFVBQUksSUFBSSxLQUFLLElBQUksRUFBRTtBQUNoQixnQkFBTyxJQUFJLENBQUMsQ0FDZDs7O0FBRUQsVUFBSSxHQUFHLENBQUM7OztBQUdSLFdBQUssR0FBRyxJQUFJLElBQUksRUFBRTtBQUNmLGFBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLEVBQUU7QUFDcEYsbUJBQU8sS0FBSyxDQUFDLENBQ2YsQ0FDSDs7Ozs7QUFHRCxXQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFDZixhQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3hELG1CQUFPLEtBQUssQ0FBQyxDQUNmLENBQ0g7Ozs7QUFFRCxhQUFPLElBQUksQ0FBQyxDQUNkIiwiZmlsZSI6InNoYWxsb3ctZXF1YWwuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNvdXJjZSBpcyBiYXNlZCBvbiBSZWFjdCB2MC4xMy4zIHNoYWxsb3dFcXVhbFxuICpcbiAqIENvcHlyaWdodCAyMDEzLTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELWxpY2Vuc2UgKGNvbnRhaW5lZCBpbiB0aGlzIGRpcmVjdG9yeSkuXG4gKi9cbi8qZXNsaW50IGNvbXBsZXhpdHk6MCwgY29tcHV0ZWQtcHJvcGVydHktc3BhY2luZzogMCAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hhbGxvd0VxdWFsKCBvYmpBLCBvYmpCICkge1xuICAgaWYgKG9iakEgPT09IG9iakIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgfVxuXG4gICB2YXIga2V5O1xuXG4gICAvLyBUZXN0IGZvciBBJ3Mga2V5cyBkaWZmZXJlbnQgZnJvbSBCLlxuICAgZm9yIChrZXkgaW4gb2JqQSkge1xuICAgICAgaWYgKG9iakEuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoIW9iakIuaGFzT3duUHJvcGVydHkoa2V5KSB8fCBvYmpBW2tleV0gIT0gb2JqQltrZXldKSkge1xuICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgfVxuXG4gICAvLyBUZXN0IGZvciBCJ3Mga2V5cyBtaXNzaW5nIGZyb20gQS5cbiAgIGZvciAoa2V5IGluIG9iakIpIHtcbiAgICAgIGlmIChvYmpCLmhhc093blByb3BlcnR5KGtleSkgJiYgIW9iakEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgfVxuXG4gICByZXR1cm4gdHJ1ZTtcbn1cbiJdfQ==