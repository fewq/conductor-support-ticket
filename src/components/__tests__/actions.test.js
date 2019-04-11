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
