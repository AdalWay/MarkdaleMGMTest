import { GET_POSTS, ADD_POSTS } from "../actions/types";

const initialState = {
  post: ["posts1"],
  todos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        post: [...state.post]
      };
      case ADD_POSTS:
      return {
        ...state,
        post:[...state.post, action.payload]
      }

    default:
      // For now, don't handle any actions
      // and just return the state given to us.
      return state;
  }
};
