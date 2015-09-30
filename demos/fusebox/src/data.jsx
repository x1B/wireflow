export default {

  graph: {
    vertices: {
      command: {
        label: 'Command Button',
        ports: {
          inbound: [
            {
              id: 'anchor',
              label: 'anchor',
              type: 'CONTAINER',
              edgeId: 'c1'
            },
            {
              id: 'i0',
              label: 'delete.enableOn',
              type: 'FLAG'
            },
            {
              id: 'i1',
              label: 'buttons[ 0 ].enableOn',
              type: 'ACTION'
            }
          ],
          outbound: [
            {
              id: 'o0',
              label: 'Resource (M)',
              type: 'RESOURCE'
            },
            {
              id: 'o1',
              label: 'Confirm',
              type: 'ACTION',
              edgeId: 'a0'
            }
          ]
        }
      },
      weird: {
        label: 'Weird Stuff',
        ports: {
          inbound: [
            {
              id: 'anchor',
              label: 'anchor',
              type: 'CONTAINER',
              edgeId: 'c1'
            },
            {
              id: 'i0',
              label: 'Some Resource (S)',
              type: 'RESOURCE'
            },
            {
              id: 'i1',
              label: 'Another Resource (S)',
              type: 'RESOURCE'
            },
            {
              id: 'i2',
              label: 'Play Music On',
              type: 'FLAG'
            }
          ],
          outbound: [
            {
              id: 'o0',
              label: 'Other Resource (M)',
              type: 'RESOURCE',
              edgeId: 'r0'
            },
            {
              id: 'o1',
              label: 'Confirmed',
              type: 'ACTION',
              edgeId: 'a0'
            },
            {
              id: 'o2',
              label: 'Invalid',
              type: 'FLAG',
              edgeId: 'f0'
            }
          ]
        }
      },
      container: {
        label: 'Container',
        ports: {
          inbound: [],
          outbound: [
            {
              id: 'o1',
              label: 'Header',
              type: 'CONTAINER',
              edgeId: 'c0'
            },
            {
              id: 'o2',
              label: 'Content',
              type: 'CONTAINER',
              edgeId: 'c1'
            },
            {
              id: 'o3',
              label: 'Footer',
              type: 'CONTAINER'
            }
          ]
        }
      },
      aBigOne: {
        label: 'A Big One',
        ports: {
          inbound: [
            {
              id: 'anchor',
              label: 'anchor',
              type: 'CONTAINER',
              edgeId: 'c0'
            },
            {
              id: 'i0',
              label: 'First Resource (S)',
              type: 'RESOURCE',
              edgeId: 'r0'
            },
            {
              id: 'i1',
              label: 'Second Resource (S)',
              type: 'RESOURCE'
            },
            {
              id: 'i2',
              label: 'Take a Second',
              type: 'FLAG',
              edgeId: 'f0'
            },
            {
              id: 'i3',
              label: 'Save Action',
              type: 'ACTION',
              edgeId: 'a0'
            }
          ],
          outbound: [
            {
              id: 'o0',
              label: 'Third Resource (M)',
              type: 'RESOURCE'
            },
            {
              id: 'o1',
              label: 'Fourth Resource (M)',
              type: 'RESOURCE'
            },
            {
              id: 'o2',
              label: 'Use the Fourth',
              type: 'FLAG'
            }
          ]
        }
      },
      more: {
        label: 'More Stuff',
        ports: {
          inbound: [
            {
              id: 'anchor',
              label: 'anchor',
              type: 'CONTAINER',
              edgeId: 'c1'
            },
            {
              id: 'i0',
              label: 'The Resource (S)',
              type: 'RESOURCE',
              edgeId: 'r0'
            },
            {
              id: 'i1',
              label: 'Shuffle Action',
              type: 'ACTION'
            }
          ],
          outbound: [
            {
              id: 'o0',
              label: 'Another Resource (M)',
              type: 'RESOURCE'
            },
            {
              id: 'o1',
              label: 'Refresh Action',
              type: 'ACTION'
            }
          ]
        }
      }
    },
    edges: {
      r0: {
        label: 'myRessource',
        type: 'RESOURCE'
      },
      a0: {
        label: 'myAction',
        type: 'ACTION'
      },
      f0: {
        label: 'myFlag',
        type: 'FLAG'
      },
      c0: {
        label: '',
        type: 'CONTAINER'
      },
      c1: {
        label: '',
        type: 'CONTAINER'
      }
    }
  },


  layout: {
    vertices: {
      command: {
        left: 292,
        top: 74
      },
      weird: {
        left: 265,
        top: 209
      },
      container: {
        left: 14,
        top: 58
      },
      aBigOne: {
        left: 805,
        top: 41
      },
      more: {
        left: 818,
        top: 244
      }
    },
    edges: {
      r0: {
        left: 597,
        top: 180
      },
      a0: {
        left: 600,
        top: 143
      },
      f0: {
        left: 600,
        top: 220
      },
      c0: {
        left: 184,
        top: 40
      },
      c1: {
        left: 154,
        top: 106
      }
    }
  },

  types: {
    RESOURCE: {
      hidden: false,
      label: 'Resources'
    },
    CONTAINER: {
      owningPort: 'outbound',
      hidden: false,
      label: 'Nesting'
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
  }

};
