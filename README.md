# Wireflow

> a react component to display and manipulate directed hypergraphs

Wireflow is a node-based editing component for React to visualize or model data-flow applications, pub/sub communication or dependency graphs.

Here is a description of Wireflow's data structures and UI features, serving as both documentation and specification.


## Build Instructions

Before going into the details, here are quick build instructions:

```console
npm install
export PATH=./node_modules/.bin:$PATH
jsx --watch --harmony --extension jsx src/ build/
```

## The Data Model

The Wireflow UI is used to display and manipulate a directed graph, with two types of nodes:
So called _vertex nodes_ represented as rounded rectangles and _edge nodes_ represented as circles.
The nodes are connected by _links_, represented as curved lines.

Each vertex node has two lists of _ports_, _inbound_ and _outbound_.
Naturally, the outbound ports (or _outlets_) may serve as link sources, while the inbound ports (or _inlets_) may serve as link targets.
Either of the groups may be empty, making the vertex a _source_ (no inlets) or a _sink_ (no outlets).
Edge nodes simply have an inbound and an outbound side.

Both ports and edge nodes are _typed_.
Only ports and edges of matching type may be connected, making their connecting links implicitly typed.
The set of relevant types is determined by the application, and indicated by matching colors.

Individual types may restrict the edge cardinality by fixing the number of inbound or outbound vertices to 1.
In a relational model, such types describe relationships of type 1:n or n:1.
These edges are called _simple edges_ and their nodes do not require a visual representation.
However, they are still identified by a name and represented in the underlying data model.
In contrast, _complex edges_ can model _n:m_ connections and are visually represented by their own circular node.


### Aside: Mapping to Discrete Math

If you try to map this type of graph to a more fundamental directed graph *G = (V, E)* more commonly used in computer science and discrete math, the Wireflow links would correspond to the relation *E* of edges, and *V* would be the union of the sets of Wireflow edge and vertex nodes.
However, to the applications that Wireflow is geared towards, the concept of *hyperedges* is important:
These edges are named and may connect to and from multiple vertices (n:m relationship), meaning that in a traditional mathematical graph model, they would themselves be best modeled as vertices.


## The JSON model

Wireflow uses three models: The _graph_, the _layout_, and the _schema_.


### The Graph

The _graph_ represents the actual domain data for which Wireflow is used.
Its edges, vertices and links describe model entities of your problem domain and their relations.
The graph is represented as a _JSON object_, containing two maps: `edges` and `vertices` (each a _JSON object_).
The vertices and edges are each stored by ID, usually a generated string:

Each vertex is a _JSON object_ with an optional `label` entry (_JSON string_) and a `ports` entry (_JSON object_).
The `ports` contain both an `inbound` and an `outbound` entry (each a _JSON array_).
The inbound/outbound lists contain port definitions (each a _JSON object_).
A port definition has an `id` (_JSON string_), an optional `label` (_JSON string_), and a  `type` (a _JSON string_) referencing a type from the schema (see below).
The port IDs are scoped to their containing list, so the same ID may be reused across vertices.
A port _may_ have a a field `edgeId` (_JSON string_) which indicates that it is connected to the corresponding edge.

Each edge of the _edges_ map has an optional `label` (_JSON string_) and a `type` (_JSON string_) referencing the schema.

```javascript
var graph = {
  vertices: {
    v001: {
      label: 'My Vertex',
      ports: {
        inbound: [
          { id: 'i0', label: 'First Input', type: 'SOME_TYPE', edgeId: 'e0' }
        ],
        outbound: [
          { id: 'o0', label: 'First Output', type: 'OTHER' },
          { id: 'o1', label: 'Another Output', type: 'SOME_YPE', edgeId: 'e0' }
          { id: 'o2', label: 'Third Output', type: 'SOME_YPE', edgeId: 'e0' }
        ]
      }
    }
  },
  edges: {
    e0: { label: 'A loop', type: 'SOME_TYPE' }
  }
};
```

In the example graph above, there is a single vertex `v001` and a single edge `e0`.
The vertex connects to the edge using to of its outlets, and the edge connects back to the vertex through its only inlet.
Thus, this simple graph could be modeling a feedback loop of some sort.


### The Layout

The _layout_ determines how the graph is arranged on screen.
It may be generated automatically, or may be determined by the user dragging nodes across the canvas.

```javascript
var layout = {
  vertices: {
    v001: { left: 100, top: 50 }
  },
  edges: {
    e0: { left: 300, top: 80  }
  }
};
```

As the example shows, the layout structure should be pretty self-explanatory.
Coordinates are expressed as CSS pixels relative to the canvas origin (top left).

### The Schema

The _schema_ determines the set of available edge types and their cardinality.
Only edge types are affected by the schema.
The schema consist of a map of edge types, indexed by their ID.
Each edge type has a `label` (_JSON string_), and may have an `owningPort` (_JSON string_) and/or a `hidden` flag (_JSON boolean_).

The _owningPort_ determines if the edges of this type are _simple_ or _complex_:
Setting it to _'outbound'_ will make for simple _1:n_ edges, and disconnecting the single outlet to the left side of the relation removes the entire edge from the model (the outlet "owns" the relationship).
Use this to model master/slave relationships.
Setting it to _'inbound'_ will make for simple _n:1_ edges, so that disconnecting the single inlet to the right side of the relation removes the entire edge.
You may use this to model _allocations_ of incoming resources to exactly one target.
Not setting the property makes the edge into a complex _n:m_ edge, represented visually using a circle.
Use this to model named _topics/channels_, e.g. for feed syndication.

The _hidden_ flag expresses whether or not a specific type should be displayed to the user.
**Note**: The _hidden_ flag should be moved to the layout, as it is not actually related to the model/schema, but specific to a view/edit session.


```javascript
var types = {
  SOME_TPYE: {
    hidden: false,
    label: 'Some Important n:m Relation'
  },
  OTHER: {
    owningPort: 'outbound',
    hidden: false,
    label: 'A 1:m relation'
  }
}
```

The actual coloring is determined by suitably generated CSS styles.
For this to work, Wireflow generates CSS classes corresponding to the edge types.


## The UI

When writing non-trivial software, it is easy to forget, how it is supposed to behave.
A full suite of BDD tests is of course the most reliable way to achieve this, but for me has two drawbacks:

- writing good UI tests is often much more work than writing the software itself (and this is a spare-time project, I need to get things done, and change things around quickly)

- often you and up over-testing (and over-specifying) things that are easy to test, while forgetting more complex interaction sequences. Then you end up with over 90% coverage and still have not specified how _undo_ behaves after a modified user selection.

A written specification is much easier to create and just as useful in answering _bug vs. feature_ questions.
Also, it is a great starting point for _good_ BDD tests.

With this out of the way, let's describe the Wireflow UI.


### Interaction Modes

The Wireflow UI visualizes the graph model, supported by information from the _layout_ and the _schema_.
It is embedded as a React UI component into an application which gives meaning (semantics) to the graph model.

The UI should support two interaction modes: _read/write_ and _read-only_.
In _read-only_ mode, the UI should be usable with medium-sized touch devices as well as traditional PC-type devices that have mouse and keyboard.
In _read/write_ mode, the UI should still render properly on smaller devices, but it the actual graph manipulation features may not work properly with the touch input.

Which interaction mode is available to the user is determined by the embedding application.


### Feature 1: Represent a Graph Model

Now that the basics are clarified, we'll switch to spec-speak for the actual requirements.
This should also make it easy to add tests later on.

> However, informational (non-normative) sections such as this are included for better understanding.

1. This feature is enabled in both read-only and read/write interaction modes.

2. Conceptually, the Wireflow component must provide the user with a _canvas_ and a _viewport_.

> The _viewport_ determines the bounding box that the Wireflow component takes up in the embedding application.
> The _canvas_ is nested within the viewport and contains the node- and link-representations.

3. Wireflow MUST
