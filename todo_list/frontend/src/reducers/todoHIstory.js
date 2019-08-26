import { GET_HISTORYS, DELETE_HISTORY } from "../actions/types";

const initialState = {
  todoHistory: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HISTORYS:
      return {
        ...state,
        todoHistory: action.payload
      };
    case DELETE_HISTORY:
      return {
        ...state,
        todoHistory: state.todoHistory.filter(
          todoHistory => todoHistory.id !== action.payload
        )
      };
    default:
      return state;
  }
}

// todohistory reducers
