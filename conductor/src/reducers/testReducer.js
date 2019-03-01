import { FETCH_POSTS } from "../actions/actionTypes";

const initState = { items: [], item: {} };

export default function(state = initState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };

    default:
      return state;
  }
}
