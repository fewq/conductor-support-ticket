import React, { PropTypes } from "react";
import { connect } from "react-redux";
//import Board from "./kanbanComponents/Board";
//import AddList from "./kanbanComponents/AddList";
//import ListContainer from "../containers/ListContainer";
import { closeAllPopups, showEditor, createList } from "../actions/kanban";

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
  // allLists: PropTypes.array.isRequired,
  // onBodyClick: PropTypes.func.isRequired,
  // onClickAddAList: PropTypes.func.isRequired,
  // onClickSaveList: PropTypes.func.isRequired,
  // itemToEdit: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  //   .isRequired,
  // attributeToEdit: PropTypes.string.isRequired
};

const Kanban = props => (
  <h1>Kanban here</h1>
  // <div className="root-comp" onClick={props.onBodyClick}>
  // 	<Board>
  // 		{
  // 			props.allLists.map((id, i) =>
  // 				<ListContainer
  // 					id = {id}
  // 					key= {id}
  // 					index={i}
  // 					/>
  // 			)
  // 		}
  // 		<AddList
  // 			onClickAddAList = {props.onClickAddAList}
  // 			onClickSaveList = {props.onClickSaveList}
  // 			itemToEdit = {props.itemToEdit}
  // 			attributeToEdit={props.attributeToEdit}
  // 			/>
  // 	</Board>
  // </div>
);

Kanban.propTypes = KanbanPropTypes;

export default connect(mapStateToProps)(Kanban);
