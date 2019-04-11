import reducer from "../index";
import * as types from "../../actions/actionTypes";
import initialState from "../../appModule/kanbanDefault";

describe("Kanban reducers", () => {
  it("should return the initial state", () => {
    expect(reducer({}, "")).toEqual({
      domainData: {},
      kanbanState: {},
      uiState: {}
    });
  });
});
