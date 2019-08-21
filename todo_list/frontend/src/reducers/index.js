import { combineReducers } from "redux";
import todo from "./todo";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import profile from "./profile";
import todoHistory from "./todoHIstory";

export default combineReducers({
  todoReducer: todo,
  errorsReducer: errors,
  messagesReducer: messages,
  authReducer: auth,
  profileReducer: profile,
  todoHistoryReducer: todoHistory
});
