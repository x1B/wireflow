define(['exports', 'module'], function (exports, module) {/*
                                                           * Creates a map of patches that describe the difference between two objects or arrays.
                                                           *
                                                           * Based on:
                                                           * https://github.com/LaxarJS/laxar-patterns/blob/master/lib/patches.js
                                                           *
                                                           * Copyright 2015 aixigo AG
                                                           * Released under the MIT license.
                                                           * http://laxarjs.org/license
                                                           */'use strict';
   function diff(fromVal, toVal) {
      // console.log( 'From: ', fromVal, '\n  To: ', toVal ); // :TODO: DELETE ME

      var subjectType = type(fromVal);
      var targetType = type(toVal);
      if (targetType !== 'array' && targetType !== 'object') {
         return null;}


      if (targetType !== subjectType) {
         return deepClone(toVal);}


      var patches = {};
      fillPatchesRecursively(fromVal, toVal, []);
      return patches;

      function fillPatchesRecursively(fromValue, toValue, path) {
         var key;
         for (key in toValue) {
            if (toValue.hasOwnProperty(key)) {
               var val = toValue[key];
               var nextPath = path.concat(key);
               if (fromValue[key] == null && val != null) {
                  patches[nextPath.join('.')] = deepClone(val);} else 

               {
                  if (val && typeof val === 'object') {
                     fillPatchesRecursively(fromValue[key], val, nextPath);} else 

                  if (val !== fromValue[key]) {
                     patches[nextPath.join('.')] = val;}}}}





         for (key in fromValue) {
            if (fromValue.hasOwnProperty(key)) {
               if (!toValue.hasOwnProperty(key)) {
                  patches[path.concat(key).join('.')] = '<delete>';}}}}}






   function deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));}


   function type(object) {
      if (object === null) {
         return 'null';}

      if (typeof object === 'undefined') {
         return 'undefined';}

      if (Array.isArray(object)) {
         return 'array';}

      return typeof object;}module.exports = 


   diff;});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0aW5nL2RpZmYuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFVQSxZQUFTLElBQUksQ0FBRSxPQUFPLEVBQUUsS0FBSyxFQUFHOzs7QUFHN0IsVUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFFLE9BQU8sQ0FBRSxDQUFDO0FBQ2xDLFVBQUksVUFBVSxHQUFHLElBQUksQ0FBRSxLQUFLLENBQUUsQ0FBQztBQUMvQixVQUFJLFVBQVUsS0FBSyxPQUFPLElBQUksVUFBVSxLQUFLLFFBQVEsRUFBRztBQUNyRCxnQkFBTyxJQUFJLENBQUMsQ0FDZDs7O0FBRUQsVUFBSSxVQUFVLEtBQUssV0FBVyxFQUFHO0FBQzlCLGdCQUFPLFNBQVMsQ0FBRSxLQUFLLENBQUUsQ0FBQyxDQUM1Qjs7O0FBRUQsVUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLDRCQUFzQixDQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFFLENBQUM7QUFDN0MsYUFBTyxPQUFPLENBQUM7O0FBRWYsZUFBUyxzQkFBc0IsQ0FBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRztBQUN6RCxhQUFJLEdBQUcsQ0FBQztBQUNSLGNBQUssR0FBRyxJQUFJLE9BQU8sRUFBRztBQUNuQixnQkFBSSxPQUFPLENBQUMsY0FBYyxDQUFFLEdBQUcsQ0FBRSxFQUFHO0FBQ2pDLG1CQUFJLEdBQUcsR0FBRyxPQUFPLENBQUUsR0FBRyxDQUFFLENBQUM7QUFDekIsbUJBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUUsR0FBRyxDQUFFLENBQUM7QUFDbEMsbUJBQUksU0FBUyxDQUFFLEdBQUcsQ0FBRSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFHO0FBQzNDLHlCQUFPLENBQUUsUUFBUSxDQUFDLElBQUksQ0FBRSxHQUFHLENBQUUsQ0FBRSxHQUFHLFNBQVMsQ0FBRSxHQUFHLENBQUUsQ0FBQyxDQUNyRDs7QUFDSTtBQUNGLHNCQUFJLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUc7QUFDbEMsMkNBQXNCLENBQUUsU0FBUyxDQUFFLEdBQUcsQ0FBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUUsQ0FBQyxDQUM1RDs7QUFDSSxzQkFBSSxHQUFHLEtBQUssU0FBUyxDQUFFLEdBQUcsQ0FBRSxFQUFHO0FBQ2pDLDRCQUFPLENBQUUsUUFBUSxDQUFDLElBQUksQ0FBRSxHQUFHLENBQUUsQ0FBRSxHQUFHLEdBQUcsQ0FBQyxDQUN4QyxDQUNILENBQ0gsQ0FDSDs7Ozs7O0FBRUQsY0FBSyxHQUFHLElBQUksU0FBUyxFQUFHO0FBQ3JCLGdCQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUUsR0FBRyxDQUFFLEVBQUc7QUFDbkMsbUJBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFFLEdBQUcsQ0FBRSxFQUFHO0FBQ2xDLHlCQUFPLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBRSxHQUFHLENBQUUsQ0FBQyxJQUFJLENBQUUsR0FBRyxDQUFFLENBQUUsR0FBRyxVQUFVLENBQUMsQ0FDekQsQ0FDSCxDQUNILENBQ0gsQ0FDSDs7Ozs7OztBQUVELFlBQVMsU0FBUyxDQUFFLEdBQUcsRUFBRztBQUN4QixhQUFPLElBQUksQ0FBQyxLQUFLLENBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBRSxHQUFHLENBQUUsQ0FBRSxDQUFDLENBQzVDOzs7QUFFRCxZQUFTLElBQUksQ0FBRSxNQUFNLEVBQUc7QUFDckIsVUFBSSxNQUFNLEtBQUssSUFBSSxFQUFHO0FBQ25CLGdCQUFPLE1BQU0sQ0FBQyxDQUNoQjs7QUFDRCxVQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRztBQUNqQyxnQkFBTyxXQUFXLENBQUMsQ0FDckI7O0FBQ0QsVUFBSSxLQUFLLENBQUMsT0FBTyxDQUFFLE1BQU0sQ0FBRSxFQUFHO0FBQzVCLGdCQUFPLE9BQU8sQ0FBQyxDQUNoQjs7QUFDRCxhQUFPLE9BQU8sTUFBTSxDQUFDLENBQ3ZCOzs7QUFFYyxPQUFJIiwiZmlsZSI6ImRpZmYuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENyZWF0ZXMgYSBtYXAgb2YgcGF0Y2hlcyB0aGF0IGRlc2NyaWJlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdHdvIG9iamVjdHMgb3IgYXJyYXlzLlxuICpcbiAqIEJhc2VkIG9uOlxuICogaHR0cHM6Ly9naXRodWIuY29tL0xheGFySlMvbGF4YXItcGF0dGVybnMvYmxvYi9tYXN0ZXIvbGliL3BhdGNoZXMuanNcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNSBhaXhpZ28gQUdcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly9sYXhhcmpzLm9yZy9saWNlbnNlXG4gKi9cbmZ1bmN0aW9uIGRpZmYoIGZyb21WYWwsIHRvVmFsICkge1xuICAgLy8gY29uc29sZS5sb2coICdGcm9tOiAnLCBmcm9tVmFsLCAnXFxuICBUbzogJywgdG9WYWwgKTsgLy8gOlRPRE86IERFTEVURSBNRVxuXG4gICB2YXIgc3ViamVjdFR5cGUgPSB0eXBlKCBmcm9tVmFsICk7XG4gICB2YXIgdGFyZ2V0VHlwZSA9IHR5cGUoIHRvVmFsICk7XG4gICBpZiggdGFyZ2V0VHlwZSAhPT0gJ2FycmF5JyAmJiB0YXJnZXRUeXBlICE9PSAnb2JqZWN0JyApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgfVxuXG4gICBpZiggdGFyZ2V0VHlwZSAhPT0gc3ViamVjdFR5cGUgKSB7XG4gICAgICByZXR1cm4gZGVlcENsb25lKCB0b1ZhbCApO1xuICAgfVxuXG4gICB2YXIgcGF0Y2hlcyA9IHt9O1xuICAgZmlsbFBhdGNoZXNSZWN1cnNpdmVseSggZnJvbVZhbCwgdG9WYWwsIFtdICk7XG4gICByZXR1cm4gcGF0Y2hlcztcblxuICAgZnVuY3Rpb24gZmlsbFBhdGNoZXNSZWN1cnNpdmVseSggZnJvbVZhbHVlLCB0b1ZhbHVlLCBwYXRoICkge1xuICAgICAgdmFyIGtleTtcbiAgICAgIGZvcigga2V5IGluIHRvVmFsdWUgKSB7XG4gICAgICAgICBpZiggdG9WYWx1ZS5oYXNPd25Qcm9wZXJ0eSgga2V5ICkgKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gdG9WYWx1ZVsga2V5IF07XG4gICAgICAgICAgICB2YXIgbmV4dFBhdGggPSBwYXRoLmNvbmNhdCgga2V5ICk7XG4gICAgICAgICAgICBpZiggZnJvbVZhbHVlWyBrZXkgXSA9PSBudWxsICYmIHZhbCAhPSBudWxsICkge1xuICAgICAgICAgICAgICAgcGF0Y2hlc1sgbmV4dFBhdGguam9pbiggJy4nICkgXSA9IGRlZXBDbG9uZSggdmFsICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgIGlmKCB2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgKSB7XG4gICAgICAgICAgICAgICAgICBmaWxsUGF0Y2hlc1JlY3Vyc2l2ZWx5KCBmcm9tVmFsdWVbIGtleSBdLCB2YWwsIG5leHRQYXRoICk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBlbHNlIGlmKCB2YWwgIT09IGZyb21WYWx1ZVsga2V5IF0gKSB7XG4gICAgICAgICAgICAgICAgICBwYXRjaGVzWyBuZXh0UGF0aC5qb2luKCAnLicgKSBdID0gdmFsO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IoIGtleSBpbiBmcm9tVmFsdWUgKSB7XG4gICAgICAgICBpZiggZnJvbVZhbHVlLmhhc093blByb3BlcnR5KCBrZXkgKSApIHtcbiAgICAgICAgICAgIGlmKCAhdG9WYWx1ZS5oYXNPd25Qcm9wZXJ0eSgga2V5ICkgKSB7XG4gICAgICAgICAgICAgICBwYXRjaGVzWyBwYXRoLmNvbmNhdCgga2V5ICkuam9pbiggJy4nICkgXSA9ICc8ZGVsZXRlPic7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICB9XG4gICB9XG59XG5cbmZ1bmN0aW9uIGRlZXBDbG9uZSggb2JqICkge1xuICByZXR1cm4gSlNPTi5wYXJzZSggSlNPTi5zdHJpbmdpZnkoIG9iaiApICk7XG59XG5cbmZ1bmN0aW9uIHR5cGUoIG9iamVjdCApIHtcbiAgIGlmKCBvYmplY3QgPT09IG51bGwgKSB7XG4gICAgICByZXR1cm4gJ251bGwnO1xuICAgfVxuICAgaWYoIHR5cGVvZiBvYmplY3QgPT09ICd1bmRlZmluZWQnICkge1xuICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgfVxuICAgaWYoIEFycmF5LmlzQXJyYXkoIG9iamVjdCApICkge1xuICAgICByZXR1cm4gJ2FycmF5JztcbiAgIH1cbiAgIHJldHVybiB0eXBlb2Ygb2JqZWN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBkaWZmO1xuIl19