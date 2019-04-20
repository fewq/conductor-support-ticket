import { connect } from "react-redux";
import List from "../components/kanbanComponents/List";
import {
  showEditor,
  createCard,
  deleteList,
  moveCard,
  updateCard
} from "../actions/kanban";

const mapStateToProps = (
  { domainData, kanbanState, uiState },
  { id, index }
) => ({
  index,
  list: domainData.lists.byId[id],
  cards: kanbanState.listCards[id],
  listByIds: domainData.lists.byId,
  listCards: kanbanState.listCards,
  cardsByIds: domainData.cards.byId,
  itemToEdit: kanbanState.itemToEdit,
  attributeToEdit: kanbanState.attributeToEdit,
  numOfCards: kanbanState.listCards[id].length
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onClickAddACard: () => dispatch(showEditor(id, "new card")),
  onClickSave: cardTitle => dispatch(createCard(cardTitle, id)),
  onClickDeleteList: () => dispatch(deleteList(id)),
  handleOnMoveCard: (parentListId, cardIndex, newCardIndex) => {
    dispatch(moveCard(parentListId, cardIndex, id, newCardIndex));
  },
  updateCard: (id, field, newVal) => dispatch(updateCard(id, field, newVal))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
