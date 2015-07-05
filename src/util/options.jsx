import '../polyfill/object-assign';

var assign = Object.assign;

export default function options( ...maps ) {
   maps.unshift( {} );
   return assign.apply( Object, maps );
};
