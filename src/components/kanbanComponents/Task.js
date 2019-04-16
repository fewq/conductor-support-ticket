import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Editor from "./Editor";
import {
  showEditor,
  closeCardMenu,
  updateTask,
  toggleTaskDone,
  deleteTask
} from "../../actions/kanban";
import axios from "axios";

const mapStateToProps = ({ domainData, kanbanState }, { id }) => ({
  task: domainData.tasks.byId[id],
  itemToEdit: kanbanState.itemToEdit,
  attributeToEdit: kanbanState.attributeToEdit
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onClickTask: e => {
    e.stopPropagation();
    dispatch(showEditor(id, "task"));
    dispatch(closeCardMenu());
  },
  onClickSave: newVal => {
    dispatch(updateTask(id, newVal));
  },
  onToggleTaskDone: taskId => dispatch(toggleTaskDone(taskId)),
  onClickDeleteTask: (taskId, index, cardId) =>
    dispatch(deleteTask(taskId, index, cardId))
});

const TaskProptypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  cardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickTask: PropTypes.func.isRequired,
  onClickDeleteTask: PropTypes.func.isRequired,
  onToggleTaskDone: PropTypes.func.isRequired,
  itemToEdit: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  attributeToEdit: PropTypes.string.isRequired
};

const Task = props => {
  const { task, itemToEdit, attributeToEdit } = props,
    onClickSa = newVal => {
      const ID = task.ticketID;
      axios
        .get("http://localhost:4000/ticket/view/" + ID)
        .then(response => {
          const ticket = response.data;
          const newList = ticket.tasks;
          newList[task.index].name = newVal;

          axios
            .patch("http://localhost:4000/ticket/update/" + ID, {
              tasks: newList
            })
            .catch(res => console.log(res));
        })
        .catch(function(error) {
          console.log(error);
        });

      props.onClickSave(newVal);
    },
    onClickTo = () => {
      props.onToggleTaskDone(task.id);
      const ID = task.ticketID;
      axios
        .get("http://localhost:4000/ticket/view/" + ID)
        .then(response => {
          const ticket = response.data;
          const newList = ticket.tasks;
          const cur = task.done;
          newList[task.index].done = !cur;

          axios
            .patch("http://localhost:4000/ticket/update/" + ID, {
              tasks: newList
            })
            .catch(res => console.log(res));
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onClickDe = () => {
      props.onClickDeleteTask(task.id, props.index, props.cardId);
      const ID = task.ticketID;
      axios
        .get("http://localhost:4000/ticket/view/" + ID)
        .then(response => {
          const ticket = response.data;
          const newList = ticket.tasks;
          const ind = task.index;
          newList.splice(ind);

          axios
            .patch("http://localhost:4000/ticket/update/" + ID, {
              tasks: newList
            })
            .catch(res => console.log(res));
        })
        .catch(function(error) {
          console.log(error);
        });
    };
  const shouldShowEditor = itemToEdit === task.id && attributeToEdit === "task";

  return (
    <li className={`task detail ${shouldShowEditor ? "" : "action"}`}>
      <i
        className={`fa  fa-${
          task.done ? "check-" : ""
        }square-o aria-hidden="true"`}
        onClick={onClickTo}
      />
      {shouldShowEditor ? (
        <div className="editor-wrapper">
          <Editor
            textareaClass={"edit-checklist"}
            shouldShowDelete={true}
            initialValue={task.name}
            onClickSave={onClickSa}
            onClickDelete={onClickDe}
          />
        </div>
      ) : (
        <span
          onClick={props.onClickTask}
          className={`${task.done && "done"} task-name`}
        >
          {task.name}
        </span>
      )}
    </li>
  );
};

Task.propTypes = TaskProptypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
