import { Map, Record } from 'immutable';

const Coords = Record({
  left: 0,
  top: 0
});

const Layout = Record({
  edges: Map(),
  vertices: Map()
});

const Dimensions = Record({
  width: 0,
  height: 0
});

const Measurements = Record({
  vertices: Map(),
  edges: Map()
});

const VertexMeasurements = Record({
  dimensions: null,
  inbound: Map(),
  outbound: Map()
}, 'VertexMeasurements');

const EdgeMeasurements = Record({
  dimensions: null
}, 'EdgeMeasurements');

function measurements( jsMeasurements ) {
  return Measurements({
    edges: Map( jsMeasurements.edges ).map( edgeMeasurements ),
    vertices: Map( jsMeasurements.vertices ).map( vertexMeasurements )
  });
}

function vertexMeasurements( jsVertexMeasurements ) {
  return VertexMeasurements({
    dimensions: dimensions( jsVertexMeasurements.dimensions ),
    inbound: Map( jsVertexMeasurements.inbound ).map( coords ),
    outbound: Map( jsVertexMeasurements.outbound ).map( coords )
  });
}

function edgeMeasurements( jsEdgeMeasurements ) {
  return EdgeMeasurements({
    dimensions: Dimensions( jsEdgeMeasurements.dimensions )
  });
}

function dimensions( jsDimensions ) {
  return Dimensions( jsDimensions );
}

function coords( jsCoords ) {
  return Coords( jsCoords );
}

function layout( jsLayout ) {
  return Layout({
    edges: Map( jsLayout.edges ).map( coords ),
    vertices: Map( jsLayout.vertices ).map( coords )
  });
}

export default {
  Coords,
  Dimensions,
  Layout,
  Measurements,
  VertexMeasurements,
  EdgeMeasurements,
  convert: {
    measurements,
    vertexMeasurements,
    edgeMeasurements,
    dimensions,
    coords,
    layout
  }
};
