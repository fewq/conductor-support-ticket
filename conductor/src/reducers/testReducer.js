import { FETCH_POST } from "../actions/actionTypes";

const initState = { items: [], item: {} };

export default function(state = initState, action) {
  return { ...state, items: action.payload };
}
