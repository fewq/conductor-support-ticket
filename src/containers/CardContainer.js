import React, { Component } from "react";
import Card from "../components/kanbanComponents/Card";
import { connect } from "react-redux";
import axios from "axios";
import {
  deleteCard,
  showCardMenu,
  closeCardMenu,
  sortCard,
  createTask,
  showEditor,
  closeEditor,
  updateCard
} from "../actions/kanban";

const mapStateToProps = ({ domainData, kanbanState, uiState }, { id }) => ({
  card: domainData.cards.byId[id],
  menuPosition: uiState.cardMenuPosition,
  itemToEdit: kanbanState.itemToEdit,
  attributeToEdit: kanbanState.attributeToEdit,
  currentEditorValue: uiState.currentEditorValue,
  isSelectedCard: kanbanState.selectedCard === id,
  shouldShowCardMenu:
    uiState.shouldShowCardMenu && kanbanState.selectedCard === id
});

const mapDispatchToProps = (dispatch, { id, index, parentListId }) => ({
  onClickMenu: menuIcon => {
    dispatch(showCardMenu(id, menuIcon));
    dispatch(closeEditor());
  },
  showEditor: attributeToEdit => {
    dispatch(showEditor(id, attributeToEdit));
    dispatch(closeCardMenu());
  },
  updateCard: (field, newVal) => dispatch(updateCard(id, field, newVal)),
  onAddATask: (cardId, taskName) => dispatch(createTask(cardId, taskName)),
  onClickDeleteCard: e => {
    e.stopPropagation();
    dispatch(deleteCard(id, index, parentListId));
    dispatch(closeCardMenu());
  },
  onClickNotify: cardTitle => {
    const title = cardTitle;
    let status;
    switch (parentListId) {
      case "0":
        status = "TODO";
        break;
      case "1":
        status = "In Progress";
        break;
      case "2":
        status = "Resolved";
        break;
      default:
        status = "TODO";
    }

    if (status != "TODO") {
      axios.post("/api/notify", {
        title,
        status
      });
    } else {
      console.log("Email not sent");
    }
    dispatch(closeCardMenu());
  },
  handleOnSortCard: (hoverID, hoverIndex, dragID, dragIndex) =>
    dispatch(sortCard(parentListId, hoverID, hoverIndex, dragID, dragIndex))
});

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldShowDetails: false
    };
  }

  handleToggleShowDetails = () => {
    this.setState(prevState => ({
      shouldShowDetails: !prevState.shouldShowDetails
    }));
  };
  handleShowDetails = () =>
    this.setState({
      shouldShowDetails: true
    });

  render() {
    return (
      <Card
        {...this.props}
        onSetState={this.setState.bind(this)}
        curState={this.state}
        onShowDetails={this.handleShowDetails}
        shouldShowDetails={this.state.shouldShowDetails}
        onToggleShowDetails={this.handleToggleShowDetails}
      />
    );
  }
}

// CardContainer.propTypes = CardContainerPropTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardContainer);
