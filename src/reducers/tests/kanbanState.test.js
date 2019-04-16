import reducer from "../kanbanState";

const initialState = {
  listCards: {
    "0": ["0", "1", "2", "3"],
    "1": [],
    "2": [],
    "3": [],
    "4": []
  },
  selectedCard: "ID_OF_CARD_IN_FOCUS",
  itemToEdit: "ID_OF_LIST_CARD_TASK_TO_EDIT",
  attributeToEdit: "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST",
  mostCommon: "Others"
};

describe("Reducer: kanbanState", () => {
  it("should return the initial state", () => {
    expect(reducer({}, "")).toEqual({});
  });

  it("should handle SHOW_CARD_MENUE", () => {
    const action = {
      cardId: "0",
      type: "SHOW_CARD_MENUE"
    };
    expect(reducer(initialState, action)).toEqual({
      listCards: {
        "0": ["0", "1", "2", "3"],
        "1": [],
        "2": [],
        "3": [],
        "4": []
      },
      selectedCard: "0",
      itemToEdit: "ID_OF_LIST_CARD_TASK_TO_EDIT",
      attributeToEdit: "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST",
      mostCommon: "Others"
    });
  });

  it("should handle SHOW_EDITOR", () => {
    const action = {
      itemToEdit: "0",
      attributeToEdit: "status",
      type: "SHOW_EDITOR"
    };
    expect(reducer(initialState, action)).toEqual({
      listCards: {
        "0": ["0", "1", "2", "3"],
        "1": [],
        "2": [],
        "3": [],
        "4": []
      },
      selectedCard: "ID_OF_CARD_IN_FOCUS",
      itemToEdit: "0",
      attributeToEdit: "status",
      mostCommon: "Others"
    });
  });

  it("should handle CLOSE_EDITOR", () => {
    const action = {
      type: "CLOSE_EDITOR"
    };
    expect(reducer(initialState, action)).toEqual({
      listCards: {
        "0": ["0", "1", "2", "3"],
        "1": [],
        "2": [],
        "3": [],
        "4": []
      },
      selectedCard: "ID_OF_CARD_IN_FOCUS",
      itemToEdit: "",
      attributeToEdit: "",
      mostCommon: "Others"
    });
  });

  it("should handle CLOSE_ALL_POPUPS", () => {
    const action = {
      type: "CLOSE_ALL_POPUPS"
    };
    expect(reducer(initialState, action)).toEqual({
      listCards: {
        "0": ["0", "1", "2", "3"],
        "1": [],
        "2": [],
        "3": [],
        "4": []
      },
      selectedCard: "ID_OF_CARD_IN_FOCUS",
      itemToEdit: "",
      attributeToEdit: "",
      mostCommon: "Others"
    });
  });

  it("should handle DELETE_CARD", () => {
    const action = {
      parentListId: "0",
      cardIndex: "0",
      type: "DELETE_CARD"
    };
    expect(reducer(initialState, action)).toEqual({
      listCards: {
        "0": ["0", "1", "2", "3"],
        "1": [],
        "2": [],
        "3": [],
        "4": []
      },
      selectedCard: "ID_OF_CARD_IN_FOCUS",
      itemToEdit: "ID_OF_LIST_CARD_TASK_TO_EDIT",
      attributeToEdit: "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST",
      mostCommon: "Others"
    });
  });

  it("should handle CREATE_CARD", () => {
    const action = {
      listId: "0",
      cardId: "4",
      type: "CREATE_CARD"
    };
    expect(reducer(initialState, action)).toEqual({
      listCards: {
        "0": ["0", "1", "2", "3", "4"],
        "1": [],
        "2": [],
        "3": [],
        "4": []
      },
      selectedCard: "ID_OF_CARD_IN_FOCUS",
      itemToEdit: "ID_OF_LIST_CARD_TASK_TO_EDIT",
      attributeToEdit: "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST",
      mostCommon: "Others"
    });
  });

  it("should handle CREATE_LIST", () => {
    const action = {
      listId: "5",
      type: "CREATE_LIST"
    };
    expect(reducer(initialState, action)).toEqual({
      listCards: {
        "0": ["0", "1", "2", "3"],
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": []
      },
      selectedCard: "ID_OF_CARD_IN_FOCUS",
      itemToEdit: "ID_OF_LIST_CARD_TASK_TO_EDIT",
      attributeToEdit: "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST",
      mostCommon: "Others"
    });
  });

  it("should handle DELETE_LIST", () => {
    const action = {
      listId: "4",
      type: "DELETE_LIST"
    };
    expect(reducer(initialState, action)).toEqual({
      listCards: {
        "0": ["0", "1", "2", "3"],
        "1": [],
        "2": [],
        "3": []
      },
      selectedCard: "ID_OF_CARD_IN_FOCUS",
      itemToEdit: "ID_OF_LIST_CARD_TASK_TO_EDIT",
      attributeToEdit: "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST",
      mostCommon: "Others"
    });
  });

  it("should handle SORT_CARD", () => {
    const action = {
      listId: "0",
      hoverID: "0",
      hoverIndex: 0,
      dragID: "3",
      dragIndex: 3,
      type: "SORT_CARD"
    };
    expect(reducer(initialState, action)).toEqual({
      listCards: {
        "0": ["3", "1", "2", "0"],
        "1": [],
        "2": [],
        "3": [],
        "4": []
      },
      selectedCard: "ID_OF_CARD_IN_FOCUS",
      itemToEdit: "ID_OF_LIST_CARD_TASK_TO_EDIT",
      attributeToEdit: "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST",
      mostCommon: "Others"
    });
  });

  it("should handle MOVE_CARD", () => {
    const action = {
      parentListId: "0",
      newParentListId: "1",
      cardIndex: "0",
      newCardIndex: "0",
      type: "MOVE_CARD"
    };
    expect(reducer(initialState, action)).toEqual({
      listCards: {
        "0": ["0", "1", "2", "3"],
        "1": ["0"],
        "2": [],
        "3": [],
        "4": []
      },
      selectedCard: "ID_OF_CARD_IN_FOCUS",
      itemToEdit: "ID_OF_LIST_CARD_TASK_TO_EDIT",
      attributeToEdit: "EXAMPLE:_TITLE_DESCRIPTION_NEWLIST",
      mostCommon: "Others"
    });
  });
});
