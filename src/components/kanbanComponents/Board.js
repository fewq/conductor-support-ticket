import React, { Component } from "react";
import PropTypes from "prop-types";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

const BoardPropTypes = {
  children: PropTypes.node.isRequired
};

export class Board extends Component {
  render() {
    return (
      <div className="kanban-board-container">
        <div className="kanban-board">{this.props.children}</div>
      </div>
    );
  }
}

Board.propTypes = BoardPropTypes;

const dragDropEnabledBoard = DragDropContext(HTML5Backend)(Board);

export default dragDropEnabledBoard;
