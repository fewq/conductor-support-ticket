import reducer from "../domainData";

const initialState = {
  lists: {
    byId: {
      "0": {
        id: "0",
        name: "Test List"
      }
    },
    allLists: ["0"]
  },
  cards: {
    byId: {
      "0": {
        id: "0",
        title: "Test Ticket",
        description: "Ticket 1",
        tasks: ["0"]
      }
    }
  },
  tasks: {
    byId: {
      "0": {
        id: "0",
        name: "Click to edit or delete",
        done: false
      }
    }
  }
};

describe("Reducer: domainData", () => {
  it("should return the initial state", () => {
    expect(reducer({}, "")).toEqual({});
  });

  it("should handle UPDATE_CARD", () => {
    const action = {
      cardId: "0",
      cardField: "title",
      newVal: "New Title",
      type: "UPDATE_CARD"
    };
    expect(reducer(initialState, action)).toEqual({
      lists: {
        byId: {
          "0": {
            id: "0",
            name: "Test List"
          }
        },
        allLists: ["0"]
      },
      cards: {
        byId: {
          "0": {
            id: "0",
            title: "New Title",
            description: "Ticket 1",
            tasks: ["0"]
          }
        }
      },
      tasks: {
        byId: {
          "0": {
            id: "0",
            name: "Click to edit or delete",
            done: false
          }
        }
      }
    });
  });

  it("should handle CREATE_TASK", () => {
    const action = {
      cardId: "0",
      taskId: "1",
      taskName: "New Task",
      type: "CREATE_TASK"
    };
    expect(reducer(initialState, action)).toEqual({
      lists: {
        byId: {
          "0": {
            id: "0",
            name: "Test List"
          }
        },
        allLists: ["0"]
      },
      cards: {
        byId: {
          "0": {
            id: "0",
            title: "Test Ticket",
            description: "Ticket 1",
            tasks: ["0", "1"]
          }
        }
      },
      tasks: {
        byId: {
          "0": {
            id: "0",
            name: "Click to edit or delete",
            done: false
          },
          "1": {
            id: "1",
            name: "New Task",
            done: false
          }
        }
      }
    });
  });

  it("should handle DELETE_CARD", () => {
    const action = {
      cardId: "0",
      type: "DELETE_CARD"
    };
    expect(reducer(initialState, action)).toEqual({
      lists: {
        byId: {
          "0": {
            id: "0",
            name: "Test List"
          }
        },
        allLists: ["0"]
      },
      cards: {
        byId: {}
      },
      tasks: {
        byId: {}
      }
    });
  });

  it("should handle UPDATE_TASK", () => {
    const action = {
      taskId: "0",
      newVal: "Updated",
      type: "UPDATE_TASK"
    };
    expect(reducer(initialState, action)).toEqual({
      lists: {
        byId: {
          "0": {
            id: "0",
            name: "Test List"
          }
        },
        allLists: ["0"]
      },
      cards: {
        byId: {
          "0": {
            id: "0",
            title: "Test Ticket",
            description: "Ticket 1",
            tasks: ["0"]
          }
        }
      },
      tasks: {
        byId: {
          "0": {
            id: "0",
            name: "Updated",
            done: false
          }
        }
      }
    });
  });

  it("should handle TOGGLE_TASK_DONE", () => {
    const action = {
      taskId: "0",
      type: "TOGGLE_TASK_DONE"
    };
    expect(reducer(initialState, action)).toEqual({
      lists: {
        byId: {
          "0": {
            id: "0",
            name: "Test List"
          }
        },
        allLists: ["0"]
      },
      cards: {
        byId: {
          "0": {
            id: "0",
            title: "Test Ticket",
            description: "Ticket 1",
            tasks: ["0"]
          }
        }
      },
      tasks: {
        byId: {
          "0": {
            id: "0",
            name: "Click to edit or delete",
            done: true
          }
        }
      }
    });
  });
  /*
  it("should handle DELETE_TASK", () => {
    const action = {
      cardId: "0",
      index: 0,
      taskId: "0",
      type: "DELETE_TASK"
    };
    expect(reducer(initialState, action)).toEqual({
      lists: {
        byId: {
          "0": {
            id: "0",
            name: "Test List"
          }
        },
        allLists: ["0"]
      },
      cards: {
        byId: {
          "0": {
            id: "0",
            title: "Test Ticket",
            description: "Ticket 1",
            tasks: []
          }
        }
      },
      task: {
        byId: {
          "0": {
            id: "0",
            name: "Click to edit or delete",
            done: false
          }
        }
      },
      tasks: {
        byId: {
          "0": {
            id: "0",
            name: "Click to edit or delete",
            done: false
          }
        }
      }
    });
  });*/

  it("should handle CREATE_CARD", () => {
    const action = { listId: "0", cardId: "1", type: "CREATE_CARD" };
    expect(reducer(initialState, action)).toEqual({
      lists: {
        byId: {
          "0": {
            id: "0",
            name: "Test List"
          }
        },
        allLists: ["0"]
      },
      cards: {
        byId: {
          "0": {
            id: "0",
            title: "Test Ticket",
            description: "Ticket 1",
            tasks: ["0"]
          },
          "1": {
            description: "",
            id: "1",
            tasks: [],
            title: undefined
          }
        }
      },
      tasks: {
        byId: {
          "0": {
            id: "0",
            name: "Click to edit or delete",
            done: false
          }
        }
      }
    });
  });

  it("should handle CREATE_LIST", () => {
    const action = {
      listId: "1",
      listName: "New List",
      type: "CREATE_LIST"
    };
    expect(reducer(initialState, action)).toEqual({
      lists: {
        byId: {
          "0": {
            id: "0",
            name: "Test List"
          },
          "1": {
            id: "1",
            name: "New List"
          }
        },
        allLists: ["0", "1"]
      },
      cards: {
        byId: {
          "0": {
            id: "0",
            title: "Test Ticket",
            description: "Ticket 1",
            tasks: ["0"]
          }
        }
      },
      tasks: {
        byId: {
          "0": {
            id: "0",
            name: "Click to edit or delete",
            done: false
          }
        }
      }
    });
  });

  it("should handle DELETE_LIST", () => {
    const action = {
      listId: "0",
      type: "DELETE_LIST"
    };
    expect(reducer(initialState, action)).toEqual({
      lists: {
        byId: {},
        allLists: []
      },
      cards: {
        byId: {
          "0": {
            id: "0",
            title: "Test Ticket",
            description: "Ticket 1",
            tasks: ["0"]
          }
        }
      },
      tasks: {
        byId: {
          "0": {
            id: "0",
            name: "Click to edit or delete",
            done: false
          }
        }
      }
    });
  });
});
