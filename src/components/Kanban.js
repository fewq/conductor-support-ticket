import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Board from "./kanbanComponents/Board";
import AddList from "./kanbanComponents/AddList";
import ListContainer from "../containers/ListContainer";
import { closeAllPopups, showEditor, createList } from "../actions/kanban";
import "../css/kanban.scss";

const mapStateToProps = ({ domainData, kanbanState }) => ({
  allLists: domainData.lists.allLists,
  itemToEdit: kanbanState.itemToEdit,
  attributeToEdit: kanbanState.attributeToEdit
});

const mapDispatchToProps = dispatch => ({
  onClickAddAList: e => {
    e.stopPropagation();
    dispatch(showEditor("board", "new list"));
  },
  onBodyClick: () => dispatch(closeAllPopups()),
  onClickSaveList: listName => dispatch(createList(listName))
});

const KanbanPropTypes = {
  allLists: PropTypes.array.isRequired,
  onBodyClick: PropTypes.func.isRequired,
  onClickAddAList: PropTypes.func.isRequired,
  onClickSaveList: PropTypes.func.isRequired,
  itemToEdit: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  attributeToEdit: PropTypes.string.isRequired
};

const Kanban = props => (
  <div className="kanban" onClick={props.onBodyClick}>
    {/* <h1>Kanban here</h1> */}
    <Board>
      {props.allLists.map((id, i) => (
        <ListContainer id={id} key={id} index={i} />
      ))}
      {/* Adding more lists/status 
      <AddList
        onClickAddAList={props.onClickAddAList}
        onClickSaveList={props.onClickSaveList}
        itemToEdit={props.itemToEdit}
        attributeToEdit={props.attributeToEdit}
      />
      */}
    </Board>
  </div>
);

Kanban.propTypes = KanbanPropTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Kanban);
