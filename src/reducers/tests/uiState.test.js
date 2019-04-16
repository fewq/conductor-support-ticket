import React from "react";
import reducer from "../uiState";

const initialState = {
  cardMenuPosition: {},
  shouldShowCardMenu: false
};

describe("Reducer: kanbanState", () => {
  it("should return the initial state", () => {
    expect(reducer({}, "")).toEqual({});
  });

  it("should handle CLOSE_CARD_MENUE", () => {
    const action = {
      type: "CLOSE_CARD_MENUE"
    };
    expect(reducer(initialState, action)).toEqual({
      cardMenuPosition: {},
      shouldShowCardMenu: false
    });
  });

  it("should handle CLOSE_ALL_POPUPS", () => {
    const action = {
      type: "CLOSE_ALL_POPUPS"
    };
    expect(reducer(initialState, action)).toEqual({
      cardMenuPosition: {},
      shouldShowCardMenu: false
    });
  });

  it("should handle UPDATE_EDITOR_VALUE", () => {
    const action = {
      type: "UPDATE_EDITOR_VALUE"
    };
    expect(reducer(initialState, action)).toEqual({
      cardMenuPosition: {},
      shouldShowCardMenu: false
    });
  });
});
