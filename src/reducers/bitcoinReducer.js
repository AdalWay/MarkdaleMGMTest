import { GET_ACCOUNT, MAKE_PAYMENT } from "../actions/types";

const initialState = {
  account: ["acount_test"]
  // todos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOUNT:
      return {
        ...state,
        post: [...state.account]
      };
    case MAKE_PAYMENT:
      return {
        ...state,
        post: [...state.account, action.payload]
      };

    default:
      // For now, don't handle any actions
      // and just return the state given to us.
      return state;
  }
};
