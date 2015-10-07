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
              { id: 'o0', type: 'RESOURCE', label: 'Resource (M)', direction: 'outbound' },
              { id: 'o1', label: 'Confirm', type: 'ACTION', edgeId: 'a0', direction: 'outbound' }
            ]
          }
        },
        vB: {
          id: 'vB',
          label: 'Weird Stuff (B)',
          ports: {
            inbound: [
              { id: 'i0', label: 'Some Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i1', label: 'Another Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i2', label: 'Play Music On', type: 'FLAG', direction: 'inbound' }
            ],
            outbound: [
              { id: 'o0', label: 'Other Resource (M)', type: 'RESOURCE', direction: 'outbound', edgeId: 'r0' },
              { id: 'o1', label: 'Confirmed', type: 'ACTION', direction: 'outbound', edgeId: 'a0' },
              { id: 'o2', label: 'Invalid', type: 'FLAG', direction: 'outbound', edgeId: 'f0' }
            ]
          }
        },
        vC: {
          id: 'vC',
          label: 'A Big One (C)',
          ports: {
            inbound: [
              { id: 'i0', label: 'First Resource (S)', type: 'RESOURCE', direction: 'inbound', edgeId: 'r0' },
              { id: 'i1', label: 'Second Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i2', label: 'Take a Second', type: 'FLAG', direction: 'inbound', edgeId: 'f0' },
              { id: 'i3', label: 'Save Action', type: 'ACTION', direction: 'inbound', edgeId: 'a0' }
            ],
            outbound: [
              { id: 'o0', label: 'Third Resource (M)', type: 'RESOURCE', direction: 'outbound' },
              { id: 'o1', label: 'Fourth Resource (M)', type: 'RESOURCE', direction: 'outbound' },
              { id: 'o2', label: 'Use the Fourth', type: 'FLAG', direction: 'outbound' }
            ]
          }
        },
        vD: {
          id: 'vD',
          label: 'More Stuff (D)',
          ports: {
            inbound: [
              { id: 'i0', label: 'The Resource (S)', type: 'RESOURCE', direction: 'inbound', edgeId: 'r0' },
              { id: 'i1', label: 'Shuffle Action', type: 'ACTION', direction: 'inbound' }
            ],
            outbound: [
              { id: 'o0', label: 'Another Resource (M)', type: 'RESOURCE', direction: 'outbound' },
              { id: 'o1', label: 'Refresh Action', type: 'ACTION', direction: 'outbound' }
            ]
          }
        }
      }
    }
  },


  withoutVertexA: {
    graph: {
      edges: {
        r0: { id: 'r0', label: 'myRessource', type: 'RESOURCE' },
        a0: { id: 'a0', label: 'myAction', type: 'ACTION' },
        f0: { id: 'f0', label: 'myFlag', type: 'FLAG' }
      },
      vertices: {
        vB: {
          id: 'vB',
          label: 'Weird Stuff (B)',
          ports: {
            inbound: [
              { id: 'i0', label: 'Some Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i1', label: 'Another Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i2', label: 'Play Music On', type: 'FLAG', direction: 'inbound' }
            ],
            outbound: [
              { id: 'o0', label: 'Other Resource (M)', type: 'RESOURCE', direction: 'outbound', edgeId: 'r0' },
              { id: 'o1', label: 'Confirmed', type: 'ACTION', direction: 'outbound', edgeId: 'a0' },
              { id: 'o2', label: 'Invalid', type: 'FLAG', direction: 'outbound', edgeId: 'f0' }
            ]
          }
        },
        vC: {
          id: 'vC',
          label: 'A Big One (C)',
          ports: {
            inbound: [
              { id: 'i0', label: 'First Resource (S)', type: 'RESOURCE', direction: 'inbound', edgeId: 'r0' },
              { id: 'i1', label: 'Second Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i2', label: 'Take a Second', type: 'FLAG', direction: 'inbound', edgeId: 'f0' },
              { id: 'i3', label: 'Save Action', type: 'ACTION', direction: 'inbound', edgeId: 'a0' }
            ],
            outbound: [
              { id: 'o0', label: 'Third Resource (M)', type: 'RESOURCE', direction: 'outbound' },
              { id: 'o1', label: 'Fourth Resource (M)', type: 'RESOURCE', direction: 'outbound' },
              { id: 'o2', label: 'Use the Fourth', type: 'FLAG', direction: 'outbound' }
            ]
          }
        },
        vD: {
          id: 'vD',
          label: 'More Stuff (D)',
          ports: {
            inbound: [
              { id: 'i0', label: 'The Resource (S)', type: 'RESOURCE', direction: 'inbound', edgeId: 'r0' },
              { id: 'i1', label: 'Shuffle Action', type: 'ACTION', direction: 'inbound' }
            ],
            outbound: [
              { id: 'o0', label: 'Another Resource (M)', type: 'RESOURCE', direction: 'outbound' },
              { id: 'o1', label: 'Refresh Action', type: 'ACTION', direction: 'outbound' }
            ]
          }
        }
      }
    }
  },


  withoutVertexC: {
    graph: {
      edges: {
        r0: { id: 'r0', label: 'myRessource', type: 'RESOURCE' },
        f0: { id: 'f0', label: 'myFlag', type: 'FLAG' }
      },
      vertices: {
        vA: {
          id: 'vA',
          label: 'Command Button (A)',
          ports: {
            inbound: [],
            outbound: [
              { id: 'o0', type: 'RESOURCE', label: 'Resource (M)', direction: 'outbound' },
              { id: 'o1', label: 'Confirm', type: 'ACTION', direction: 'outbound' }
            ]
          }
        },
        vB: {
          id: 'vB',
          label: 'Weird Stuff (B)',
          ports: {
            inbound: [
              { id: 'i0', label: 'Some Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i1', label: 'Another Resource (S)', type: 'RESOURCE', direction: 'inbound' },
              { id: 'i2', label: 'Play Music On', type: 'FLAG', direction: 'inbound' }
            ],
            outbound: [
              { id: 'o0', label: 'Other Resource (M)', type: 'RESOURCE', direction: 'outbound', edgeId: 'r0' },
              { id: 'o1', label: 'Confirmed', type: 'ACTION', direction: 'outbound' },
              { id: 'o2', label: 'Invalid', type: 'FLAG', direction: 'outbound', edgeId: 'f0' }
            ]
          }
        },
        vD: {
          id: 'vD',
          label: 'More Stuff (D)',
          ports: {
            inbound: [
              { id: 'i0', label: 'The Resource (S)', type: 'RESOURCE', direction: 'inbound', edgeId: 'r0' },
              { id: 'i1', label: 'Shuffle Action', type: 'ACTION', direction: 'inbound' }
            ],
            outbound: [
              { id: 'o0', label: 'Another Resource (M)', type: 'RESOURCE', direction: 'outbound' },
              { id: 'o1', label: 'Refresh Action', type: 'ACTION', direction: 'outbound' }
            ]
          }
        }
      }
    }
  }

};
