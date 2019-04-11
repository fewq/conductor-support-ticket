import React, { Component } from "react";
import PropTypes from "prop-types";
import CardContainer from "../../containers/CardContainer";
import Editor from "./Editor";
import { DropTarget } from "react-dnd";
import Types from "./staticTypes";
import axios from "axios";

const DropTargetSpec = {
  drop(props, monitor) {
    const tickets = props.cardsByIds;
    const listId = monitor.getItem().parentListId;
    const ticketIds = props.listCards[listId];
    // update priorities of current list
    for (let i = 0; i < ticketIds.length; i++) {
      const ticket = tickets[ticketIds[i]];
      axios
        .patch("http://localhost:4000/ticket/update/" + ticket.ID, {
          priority: i
        })
        .catch(res => console.log(res));
    }
    console.log("Priorities updated");
  },

  hover(props, monitor, component) {
    const item = monitor.getItem(),
      mouseYPosition = monitor.getClientOffset().y;

    if (item.parentListId === props.id) {
      return;
    }

    const index =
      mouseYPosition < component.rectPosition.top + 32 ? 0 : props.numOfCards; // 32 is the minium height of list-title-div
    props.handleOnMoveCard(item.parentListId, item.index, index);

    monitor.getItem().index = index;
    monitor.getItem().parentListId = props.id;
  }
};

const DropTargetCollect = connect => ({
  connectDropTarget: connect.dropTarget()
});

const ListPropTypes = {
  list: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  cards: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  itemToEdit: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onClickAddACard: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  attributeToEdit: PropTypes.string.isRequired,
  onClickDeleteList: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  numOfCards: PropTypes.number.isRequired,
  handleOnMoveCard: PropTypes.func.isRequired
};

class List extends Component {
  render() {
    const {
        list,
        connectDropTarget,
        onClickSave,
        onClickAddACard,
        attributeToEdit,
        itemToEdit
      } = this.props,
      showEditor = itemToEdit === list.id && attributeToEdit === "new card";
    return connectDropTarget(
      <div
        className="list-container"
        ref={list =>
          (this.rectPosition = list ? list.getBoundingClientRect() : null)
        }
      >
        <div className="list">
          <div className="action delete-list-icon">
            <i
              className="fa fa-trash"
              aria-hidden="true"
              onClick={this.props.onClickDeleteList}
            />
          </div>
          <h2 className="list-title">{list.name}</h2>
          <div className="cards-container">
            {this.props.cards.map((id, i) => (
              <CardContainer
                key={id}
                id={id}
                index={i}
                parentListId={list.id}
              />
            ))}
            {showEditor && (
              <Editor
                textareaClass={"add-card"}
                placeholder="Add a card..."
                onClickSave={onClickSave}
              />
            )}
          </div>
          {/*!showEditor && (
            <a
              href="#"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault(); // prevent action/render from scrolling to the top of the page everytime
                onClickAddACard();
              }}
              className="add-card-btn"
            >
              Add a card...
            </a>
            )*/}
        </div>
      </div>
    );
  }
}

List.propTypes = ListPropTypes;

const dropEnabledList = DropTarget(
  Types.CARD,
  DropTargetSpec,
  DropTargetCollect
)(List);

export default dropEnabledList;
