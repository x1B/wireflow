# Wireflow

> a react component to display and manipulate directed hypergraphs

Wireflow is a node-based editing component for React to visualize or model data-flow applications, pub/sub communication or dependency graphs.

Here is a description of Wireflow's data structures and UI features, serving as both documentation and specification.


## Build Instructions

Before going into the details, here are quick build instructions:

```console
npm install
export PATH=./node_modules/.bin:$PATH
babel --extension jsx src/ --out-dir=build/
```

## The Data Model

The Wireflow UI is used to display and manipulate a directed graph, with two types of nodes:
So called _vertex nodes_ represented as rounded rectangles and _edge nodes_ represented as circles.
The nodes are connected by _links_, represented as curved lines.

Each vertex node has two lists of _ports_, separated by _orientation_: _inbound_ and _outbound_.
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
Simple edges can only exist if they connect at least two ports.
Complex edges may exist independently of any ports that they connect.

### Aside: Mapping to Discrete Math

If you try to map this type of graph to a more fundamental directed graph *G = (V, E)* more commonly used in computer science and discrete math, the Wireflow links would correspond to the relation *E* of edges, and *V* would be the union of the sets of Wireflow edge and vertex nodes.
However, to the applications that Wireflow is geared towards, the concept of *hyperedges* is important:
These edges are named and may connect to and from multiple vertices (n:m relationship), meaning that in a traditional mathematical graph model, they would themselves be best modeled as vertices.


### Aside: Modeling Pub/Sub Networks

Let's try to map twitter semantics to this model.
A single user's tweets may go directly to any number of followers (1:n), so _following_ can be modeled as a simple edge owned by the user being followed.
A hashtag on the other hand connects from any number of users mentioning the tag to any number of users that are subscribed to it (n:m), so it could be modeled as a complex edge.


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

The _owningPort_ determines if the edges of this type are _simple_ or _complex_, by specifying the orientation of the owning port:
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


## The API

Wireflow exposes an API for embedding applications to instantiate the UI components, and to create the hypergraph model.
It exposes a set of Flux-Style stores and a dispatcher to implement graph operations.
Also, there is a utility method for calculating a graph layout.
Currently, the application author needs to wire everything together as illustrated in the _src/dummy-fusebox.jsx_ example.


## The UI

When writing non-trivial software, it is easy to forget, how it is supposed to behave.
A full suite of BDD tests is of course the most reliable way to achieve this, but for me has two drawbacks:

- writing good UI tests is often much more work than writing the software itself (and this is a spare-time project, I need to get things done, and change things around quickly)

- often you and up over-testing (and over-specifying) things that are easy to test, while forgetting more complex interaction sequences. Then you end up with over 90% coverage and still have not specified how _undo_ behaves after a modified user selection.

A written specification is much easier to create and just as useful in answering _bug vs. feature_ questions.
Also, it is a great starting point for _good_ BDD tests.

With this out of the way, let's describe the Wireflow UI.
Note that individual requirements are described in spec-speak, which should also make it easy to add spec-tests later on.
This means that _must_, _should_ and so on are to be interpreted as described in [RFC-2119](http://tools.ietf.org/html/rfc2119), but are _italicized_ rather than CAPITALIZED for better readability.

> Informational (non-normative) sections such as this one are included for a better understanding.


### Interaction *Modes*

> The Wireflow UI visualizes the graph model, supported by information from the _layout_ and the _schema_.
> It is embedded as a React UI component into an application which gives meaning (semantics) to the graph model.

1. The UI should support two interaction modes: _read/write_ and _read-only_.
The embedding application _must_ be able to set and change the interaction mode.
In _read-only_ mode, the UI should be usable with medium-sized touch devices as well as traditional PC-type devices that have mouse and keyboard.
In _read/write_ mode, the UI should still render properly on smaller devices, but it the actual graph manipulation features may not work properly with the touch input.
**Note implemented yet: currently, read/write is always enabled.**


### *Display* a Graph Model

1. This feature is enabled in both read-only and read/write interaction modes.

2. Conceptually, the Wireflow component must provide the user with a _canvas_ and a _viewport_.
> The _viewport_ determines the bounding box that the Wireflow component takes up in the embedding application.
> The _canvas_ is nested within the viewport and contains the node- and link-representations.

3. Wireflow _must_ display the portion of the canvas that fits into the viewport.
The canvas _must_ always be large enough to show all nodes (vertices and edges) contained in the model.
If the viewport is smaller than the canvas, a repositioning aid (such as scrollbars or a minimap) _must_ be displayed.
If unrestricted by the application, the viewport _must_ resize itself to show the entire canvas.
> If the viewport size is unrestricted, it is up to the embedding application if and how to help navigating larger graph models.

4. Wireflow _must_ represent each _vertex_ as a box within the canvas.
The box _must_ be positioned according to the layout.
The size of the box _must_ fit its contents (label and ports).
For each vertex, _inlets_ must be rendered to the left, _outlets_ to the right.
Each port _must_ have an associated graphical icon, the _handle_.
For each port, Wireflow _must_ indicate the edge type by coloring the handle.

5. Wireflow _must_ represent each _complex edge_ as a shape on the canvas.
By default, edges _should_ be represented as circles.
Edges _must_ be able to receive styles based on their edge type.

6. Wireflow _should not_ represent simple edges directly.
> Simple edges are implicitly visualized through any links belonging to them and identified by their owning port.

7. Wireflow _must_ render a _link_ for each node that is connected to an edge.
Links _must_ be drawn as lines.
For complex edges, Wireflow _must_ draw links from any connected outlets to their edge's shape and from the shape to any connected inlets.
For simple edges, Wireflow _must_ draw links between the single owning port and all other ports that form the other side of the relation.


### Managing *Focus*

1. Wireflow _must_ allow for multiple _instances_ of the Wireflow UI to be present within the same HTML document.
> Each instance has its own settings, model, layout, schema, selection and history.
> The embedding application may back multiple instances by the same store, effectively coupling their model and/or layout.

2. Wireflow _must_ ensure that at most one instance has _focus_ at any given time, using the HTML `tabindex` attribute and DOM `focus` event.

3. Wireflow _must_ move focus to an instance if it is clicked into, or tabbed to.

4. Whenever features are triggered by the keyboard (described below), Wireflow _must_ ignore keyboard events for instances that do not have focus.


### Form and Manipulate a *Selection*

1. This feature may be enabled by the embedding application independently of the interaction mode.
If disabled, Wireflow _must not_ offer any of the following functionality.
> Forming a selection does not necessarily lead to modifications of the underlying graph model or even just the layout.

2. The user _must_ be able to _select_ a node (vertex or edge) by single-click.
Wireflow _must_ indicate the selection state of each node using a suitably modified visualization.
When selecting a node in this manner, Wireflow _must_ _deselect_ any other currently selected nodes.
> If a single node was selected before, and that node is clicked, nothing happens.

3. The user _must_ be able to _toggle_ selection of any node by holding _shift_ and performing a single click.
When selecting/deselecting a node in this manner, Wireflow _must not_ change the selection state of any other node.

4. The user _must_ be able to _drag a seletion rectangle_ to defined the set of selected nodes.
As soon as the user has released the mouse button, the set of nodes _intersecting with_ the selection rectangle on the canvas is to be selected.
Wireflow _must_ deselect any previously selected nodes not intersecting with the rectangle.
> I think readers are familiar with the concepts of rubber-band selection, so will not describe the tiresome details.

5. The user _must_ be able to _extend the selection by rectangle_ by holding _shift_ and then dragging a selection rectangle.
A selection rectangle is said to _extend_ the selection if shift was pressed during the mousedown-event that started the rectangle selection.
As soon as the user has released the mouse button, Wireframe _must_ add the set of nodes intersecting with the extending rectangle to the selection (if they were not part of the selection before).
> Note that the extend-mechanism works differently from the toggle-mechanism as it will never remove nodes from the selection.

6. The user _must_ be able to _clear_ the selection by clicking the graph canvas.


### Manipulating the Graph *Layout*

1. If using read-only mode, the embedding application _must_ be able to disable this feature through settings.
If disabled, Wireflow _must not_ offer any of the following functionality.
> Forming a selection does not necessarily lead to modifications of the underlying graph model or even just the layout.

2. Wireflow _must_ allow the user to _move_ any single node (vertex or edge) at a time by dragging it with the mouse.
This _must_ change the layout property of the node.
Any connected links must immediately be updated to reflect the repositioning, while other nodes are not affected.
Dragging a node _must not_ change its selection state.

3. If a node is dragged that is also part of a _selection_, Wireflow _must_ move all currently selected nodes by the same offset.


### Manipulating the Graph *Edges* and Connections

1. This feature is enabled if and only if the interaction mode is _read/write_.
If disabled, Wireflow _must not_ offer any of the following functionality.

2. The user _must_ be able to connect a port to a complex edge of matching type by dragging from the handle of an outgoing port to the representation of the edge node.

3. The user _must_ be able to directly connect two ports of matching types and opposing orientation by dragging from the handle of one port to the handle of the other port, creating a new edge.
If the edge type of the ports is _complex_, previous membership _must_ be cleared (any previous links connected to the participating ports are removed) and the newly formed edge _must_ be represented by a new shape, positioned between the two newly connected ports.
If the edge type of the ports is _simple_ and the port of the owning orientation is already associated with an edge, the non-owning port is added to that edge, removing any previous association.

4. The user must be able to _disconnect_ a port by double-clicking its handle.

5. Whenever a port has been removed from an edge by user interaction (see above), Wireflow _must prune_ any simple edges from the graph model that contain less than two ports, and any complex edges that contain no port.
> This ensures that no "invisible edges" pile up.


### Manipulating the Graph *Vertices*

> **Note:** The operations described here are tightly coupled with application semantics:
> Potentially they may produce a well-formed hypergraph that cannot be mapped to a valid domain entity, or whose creation circumvents some business rule.
> In the future, hooks should be provided to the embedding application so that it can always override any of these operations, to implement the semantics at a higher level of abstraction.
> For now, let's assume that a valid domain model can be calculated directly from any graph model that was produced using these operations.

1. This feature is enabled if and only if the interaction mode is _read/write_.
If disabled, Wireflow _must not_ offer any of the following functionality.

2. Wireflow _must_ allow the user to _delete_ the currently selected set of nodes by pressing the _delete_ key.
This operation severs any links to and from the deleted nodes.
After a delete-operation, edges must be _pruned_ as described under _Edges.5_.

3. **Not implemented yet!** Wireflow _must_ allow the user to _copy_ the currently selected set of nodes to the clipboard by pressing _Ctrl-C_ (or _Cmd-C_).
If allowed by the browser, a JSON representation of the graph, restricted to the selection, _should_ be copied to the global OS clipboard.

4. **Not implemented yet!** Wireflow _must_ allow the user to _paste_ the current contents of the clipboard by pressing _Ctrl-V_ (or _Cmd-V_).
When inserting the copied sub-graph, Wireflow _must_ modify all IDs and labels in the following manner:
- Strings that match `/ [0-9]+$/` (that end in a space followed by a sequence of numbers) _must_ be modified by incrementing the trailing number until there is no conflict with any existing ID/label.
- Other strings _must_ be modified by appending a space and the lowest integer (starting at 1) that does not conflict with an existing ID/label.

5. **Not implemented yet!** Wireflow _must_ allow the user to _cut_ the currently selected set of nodes by pressing _Ctrl-X_ (or _Cmd-X_).
Cutting ist equivalent to copying and then deleting the selected set of nodes.

6. Wireflow _must_ reflect addition and removal of vertices, edges and links by the embedding application.


### Undo and Redo of Graph *History*

1. Wireflow _must_ allow the user to _undo_ each of the following _destructive_ operations, by pressing _Ctrl-Z_ (or _Cmd-Z_):

   - moving nodes (_Layout.2_, _Layout.3_)
   - connecting ports (_Edges.2_, _Edges.3_) **Not implemented yet!**
   - disconnecting ports (_Edges.4_) **Not implemented yet!**
   - deleting nodes (_Vertices.2_)
   - pasting nodes (_Vertices.4_) **Not implemented yet!**
   - cutting nodes (_Vertices.5_) **Not implemented yet!**

Wireflow _must_ allow to undo at least the most recent 50 operations.

2. If no destructive operation has been performed since the most recent _undo_, Wireflow must allow the user to _redo_ the operation that was undone most recently, by pressing _Ctrl-Y_ (or _Cmd-Y_) or _Shift+Ctrl-Z_ (or _Shift+Cmd-Z_).
> Multiple operations may be undone and then redone as long no destructive operation is performed.
