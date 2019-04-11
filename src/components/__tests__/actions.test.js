import React from "react";
import * as actions from "../../actions/kanban";
import * as types from "../../actions/actionTypes";

describe("Action: showCardMenu", () => {
  it("should show card menu", () => {
    const cardId = "0";
    const cardMenuIcon = <i>::before</i>;
    const expectedAction = {
      type: types.SHOW_CARD_MENUE,
      cardId,
      cardMenuIcon
    };
    expect(actions.showCardMenu(cardId, cardMenuIcon)).toEqual(expectedAction);
  });
});

describe("Action: updateEditorValue", () => {
  it("should update editor value", () => {
    const value = "new value";
    const expectedAction = {
      type: types.UPDATE_EDITOR_VALUE,
      value
    };
    expect(actions.updateEditorValue(value)).toEqual(expectedAction);
  });
});

describe("Action: updateCard", () => {
  it("should update card's cardField to newVal", () => {
    const cardId = "0";
    const cardField = "priority";
    const newVal = "1";
    const expectedAction = {
      type: types.UPDATE_CARD,
      cardId,
      cardField,
      newVal
    };
    expect(actions.updateCard(cardId, cardField, newVal)).toEqual(
      expectedAction
    );
  });
});

describe("Action: createTask", () => {
  it("should create new task", () => {
    const cardId = "0";
    const taskName = "New Task";
    const expectedAction = {
      type: types.CREATE_TASK,
      taskId: new Date().getTime(),
      cardId,
      taskName
    };
    expect(actions.createTask(cardId, taskName)).toEqual(expectedAction);
  });
});

describe("Action: deleteCard", () => {
  it("should delete card", () => {
    const cardId = "0";
    const cardIndex = 1;
    const parentListId = "0";
    const expectedAction = {
      type: types.DELETE_CARD,
      cardId,
      cardIndex,
      parentListId
    };
    expect(actions.deleteCard(cardId, cardIndex, parentListId)).toEqual(
      expectedAction
    );
  });
});

describe("Action: toggleTaskDone", () => {
  it("should toggle task done status", () => {
    const taskId = "0";
    const expectedAction = {
      type: types.TOGGLE_TASK_DONE,
      taskId
    };
    expect(actions.toggleTaskDone(taskId)).toEqual(expectedAction);
  });
});

describe("Action: updateTask", () => {
  it("should update task", () => {
    const taskId = "0";
    const newVal = "1";
    const expectedAction = {
      type: types.UPDATE_TASK,
      taskId,
      newVal
    };
    expect(actions.updateTask(taskId, newVal)).toEqual(expectedAction);
  });
});

describe("Action: deleteTask", () => {
  it("should delete task", () => {
    const taskId = "0";
    const index = 1;
    const cardId = "0";
    const expectedAction = {
      type: types.DELETE_TASK,
      taskId,
      index,
      cardId
    };
    expect(actions.deleteTask(taskId, index, cardId)).toEqual(expectedAction);
  });
});

describe("Action: showEditor", () => {
  it("should show editor", () => {
    const itemToEdit = "item";
    const attributeToEdit = "attribute";
    const expectedAction = {
      type: types.SHOW_EDITOR,
      itemToEdit,
      attributeToEdit
    };
    expect(actions.showEditor(itemToEdit, attributeToEdit)).toEqual(
      expectedAction
    );
  });
});

describe("Action: createCard", () => {
  it("should create new card", () => {
    const cardTitle = "Title";
    const listId = "0";
    const expectedAction = {
      type: types.CREATE_CARD,
      cardId: new Date().getTime(),
      cardTitle,
      listId
    };
    expect(actions.createCard(cardTitle, listId)).toEqual(expectedAction);
  });
});

describe("Action: createList", () => {
  it("should create new card", () => {
    const listName = "New List";
    const expectedAction = {
      type: types.CREATE_LIST,
      listId: new Date().getTime(),
      listName
    };
    expect(actions.createList(listName)).toEqual(expectedAction);
  });
});

describe("Action: deleteList", () => {
  it("should create new card", () => {
    const listId = "0";
    const expectedAction = {
      type: types.DELETE_LIST,
      listId
    };
    expect(actions.deleteList(listId)).toEqual(expectedAction);
  });
});

describe("Action: sortCard", () => {
  it("should sort cards", () => {
    const listId = "0";
    const hoverID = "1";
    const hoverIndex = 1;
    const dragID = "2";
    const dragIndex = 2;
    const expectedAction = {
      type: types.SORT_CARD,
      hoverID,
      hoverIndex,
      dragID,
      dragIndex,
      listId
    };
    expect(
      actions.sortCard(listId, hoverID, hoverIndex, dragID, dragIndex)
    ).toEqual(expectedAction);
  });
});

describe("Action: moveCard", () => {
  it("should move card", () => {
    const parentListId = "0";
    const cardIndex = 1;
    const newParentListId = "2";
    const newCardIndex = 2;
    const expectedAction = {
      type: types.MOVE_CARD,
      parentListId,
      cardIndex,
      newParentListId,
      newCardIndex
    };
    expect(
      actions.moveCard(parentListId, cardIndex, newParentListId, newCardIndex)
    ).toEqual(expectedAction);
  });
});
