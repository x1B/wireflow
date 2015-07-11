import * as Immutable from 'immutable';
import * as model from './model';

const { Map, Record } = Immutable;
const { Coords } = model;

const Rendered = Record( {
   what: null,
   type: () => Rendered
} );


const PortMeasured = Record( {
   port: null,
   center: Coords(),
   type: () => PortMeasured
} );

const VertexMeasurements = Record( {
   box: null,
   inbound: Map(),
   outbound: Map()
} );

const VertexMeasured = Record( {
   vertex: null,
   measurements: VertexMeasurements(),
   type: () => VertexMeasured
} );

const EdgeMeasurements = Record( {
   box: null,
   center: null
} );

const EdgeMeasured = Record( {
   edge: null,
   measurements: EdgeMeasurements(),
   type: () => EdgeMeasured
} );

const PortDragInfo = Record( {
   vertex: null,
   port: null,
   portCoords: null,
   mouseCoords: null
} );

const PortDragged = Record( {
   info: PortDragInfo(),
   type: () => PortDragged
} );


const EdgeMoved = Record( {
   edge: null,
   to: Coords(),
   type: () => EdgeMoved
} );

const VertexMoved = Record( {
   vertex: null,
   to: Coords(),
   type: () => VertexMoved
} );


const PortDisconnected = Record( {
   vertex: null,
   port: null,
   type: () => PortDisconnected
} );


const GraphModified = Record( {
   graph: null,
   type: () => GraphModified
} );

const LayoutModified = Record( {
   layout: null,
   type: () => LayoutModified
} );


export default {
   Rendered,

   PortMeasured,
   VertexMeasured,
   EdgeMeasured,
   PortDragged,

   EdgeMoved,
   VertexMoved,

   PortDisconnected,
   LayoutModified,
   GraphModified,
   model: {
      PortDragInfo,
      EdgeMeasurements,
      VertexMeasurements
   }
};
