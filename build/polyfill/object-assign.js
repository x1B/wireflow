define(['exports'], function (exports) {
   /*eslint complexity:0 */
   /**
    * SOURCE:
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    */
   'use strict';

   if (!Object.assign) {
      Object.defineProperty(Object, 'assign', {
         enumerable: false,
         configurable: true,
         writable: true,
         value: function value(target, firstSource) {
            if (target === undefined || target === null) {
               throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
               var nextSource = arguments[i];
               if (nextSource === undefined || nextSource === null) {
                  continue;
               }
               nextSource = Object(nextSource);

               var keysArray = Object.keys(Object(nextSource));
               for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                  var nextKey = keysArray[nextIndex];
                  var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                  if (desc !== undefined && desc.enumerable) {
                     to[nextKey] = nextSource[nextKey];
                  }
               }
            }
            return to;
         }
      });
   }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wb2x5ZmlsbC9vYmplY3QtYXNzaWduLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUtBLE9BQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ2pCLFlBQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUNyQyxtQkFBVSxFQUFFLEtBQUs7QUFDakIscUJBQVksRUFBRSxJQUFJO0FBQ2xCLGlCQUFRLEVBQUUsSUFBSTtBQUNkLGNBQUssRUFBRSxlQUFTLE1BQU0sRUFBRSxXQUFXLEVBQUU7QUFDbEMsZ0JBQUksTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQzFDLHFCQUFNLElBQUksU0FBUyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7YUFDakU7O0FBRUQsZ0JBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4QixpQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDeEMsbUJBQUksVUFBVSxHQUFHLFNBQVMsQ0FBRSxDQUFDLENBQUUsQ0FBQztBQUNoQyxtQkFBSSxVQUFVLEtBQUssU0FBUyxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFDbEQsMkJBQVM7Z0JBQ1g7QUFDRCx5QkFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFaEMsbUJBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDaEQsb0JBQUssSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUU7QUFDM0Usc0JBQUksT0FBTyxHQUFHLFNBQVMsQ0FBRSxTQUFTLENBQUUsQ0FBQztBQUNyQyxzQkFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoRSxzQkFBSSxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDeEMsdUJBQUUsQ0FBRSxPQUFPLENBQUUsR0FBRyxVQUFVLENBQUUsT0FBTyxDQUFFLENBQUM7bUJBQ3hDO2dCQUNIO2FBQ0g7QUFDRCxtQkFBTyxFQUFFLENBQUM7VUFDWjtPQUNILENBQUMsQ0FBQztJQUNMIiwiZmlsZSI6Im9iamVjdC1hc3NpZ24uanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyplc2xpbnQgY29tcGxleGl0eTowICovXG4vKipcbiAqIFNPVVJDRTpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ25cbiAqL1xuaWYgKCFPYmplY3QuYXNzaWduKSB7XG4gICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LCAnYXNzaWduJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbih0YXJnZXQsIGZpcnN0U291cmNlKSB7XG4gICAgICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCBmaXJzdCBhcmd1bWVudCB0byBvYmplY3QnKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbIGkgXTtcbiAgICAgICAgICAgIGlmIChuZXh0U291cmNlID09PSB1bmRlZmluZWQgfHwgbmV4dFNvdXJjZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0U291cmNlID0gT2JqZWN0KG5leHRTb3VyY2UpO1xuXG4gICAgICAgICAgICB2YXIga2V5c0FycmF5ID0gT2JqZWN0LmtleXMoT2JqZWN0KG5leHRTb3VyY2UpKTtcbiAgICAgICAgICAgIGZvciAodmFyIG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4KyspIHtcbiAgICAgICAgICAgICAgIHZhciBuZXh0S2V5ID0ga2V5c0FycmF5WyBuZXh0SW5kZXggXTtcbiAgICAgICAgICAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuZXh0U291cmNlLCBuZXh0S2V5KTtcbiAgICAgICAgICAgICAgIGlmIChkZXNjICE9PSB1bmRlZmluZWQgJiYgZGVzYy5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgICB0b1sgbmV4dEtleSBdID0gbmV4dFNvdXJjZVsgbmV4dEtleSBdO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgICAgcmV0dXJuIHRvO1xuICAgICAgfVxuICAgfSk7XG59XG4iXX0=