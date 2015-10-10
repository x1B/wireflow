export default {

  initial: {

    types: {
      RESOURCE: {
        hidden: false,
        label: 'Resources'
      },
      FLAG: {
        label: 'Flags',
        hidden: false
      },
      ACTION: {
        owningPort: 'inbound',
        label: 'Actions',
        hidden: false
      }
    },

    graph: {
      edges: {
        r0: { id: 'r0', label: 'myRessource', type: 'RESOURCE' },
        a0: { id: 'a0', label: 'myAction', type: 'ACTION' },
        f0: { id: 'f0', label: 'myFlag', type: 'FLAG' }
      },
      vertices: {
        vA: {
          id: 'vA',
          label: 'Command Button (A)',
          ports: {
            inbound: [],
            outbound: [
              { id: 'o0', edgeId: null, type: 'RESOURCE', label: 'Resource (M)', direction: 'outbound' },
              { id: 'o1', edgeId: 'a0', type: 'ACTION', label: 'Confirm', direction: 'outbound' }
            ]
          }
        },
        vB: {
          id: 'vB',
          label: 'Weird Stuff (B)',
          ports: {
            inbound: [
              { id: 'i0', edgeId: null, label: 'Some Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i1', edgeId: null, label: 'Another Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i2', edgeId: null, label: 'Play Music On', type: 'FLAG', direction: 'inbound' }
            ],
            outbound: [
              { id: 'o0', edgeId: 'r0', label: 'Other Resource (M)', type: 'RESOURCE', direction: 'outbound' },
              { id: 'o1', edgeId: 'a0', label: 'Confirmed', type: 'ACTION', direction: 'outbound' },
              { id: 'o2', edgeId: 'f0', label: 'Invalid', type: 'FLAG', direction: 'outbound' }
            ]
          }
        },
        vC: {
          id: 'vC',
          label: 'A Big One (C)',
          ports: {
            inbound: [
              { id: 'i0', edgeId: 'r0', label: 'First Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i1', edgeId: null, label: 'Second Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i2', edgeId: 'f0', label: 'Take a Second', type: 'FLAG', direction: 'inbound' },
              { id: 'i3', edgeId: 'a0', label: 'Save Action', type: 'ACTION', direction: 'inbound' }
            ],
            outbound: [
              { id: 'o0', edgeId: null, label: 'Third Resource (M)', type: 'RESOURCE', direction: 'outbound' },
              { id: 'o1', edgeId: null, label: 'Fourth Resource (M)', type: 'RESOURCE', direction: 'outbound' },
              { id: 'o2', edgeId: null, label: 'Use the Fourth', type: 'FLAG', direction: 'outbound' }
            ]
          }
        },
        vD: {
          id: 'vD',
          label: 'More Stuff (D)',
          ports: {
            inbound: [
              { id: 'i0', edgeId: 'r0', label: 'The Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i1', edgeId: null, label: 'Shuffle Action', type: 'ACTION', direction: 'inbound' }
            ],
            outbound: [
              { id: 'o0', edgeId: null, label: 'Another Resource (M)', type: 'RESOURCE', direction: 'outbound' },
              { id: 'o1', edgeId: null, label: 'Refresh Action', type: 'ACTION', direction: 'outbound' }
            ]
          }
        }
      }
    }
  }

};
