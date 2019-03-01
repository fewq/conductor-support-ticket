import FETCH_POST from "./kanban";

export const fetchPosts = () => dispatch => {
  return function(dispatch) {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(posts => dispatch({ type: FETCH_POST, payload: posts }));
  };
};
