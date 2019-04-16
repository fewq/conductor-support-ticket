import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { Board } from "../kanbanComponents/Board";

test("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Board />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("snapshot testing", () => {
  const tree = renderer.create(<Board />).toJSON();
  expect(tree).toMatchSnapshot();
});
