import { GET_TODO, DELETE_TODO, ADD_TODO, ARCHIVE_TODO } from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

// get todo list
export const getTodo = () => (dispatch, getState) => {
  axios
    .get("/api/todo/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TODO,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// delete todo list
export const deleteTodo = id => (dispatch, getState) => {
  axios
    .delete(`/api/todo/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ todoDeleted: "Todo Item Deleted" }));
      dispatch({
        type: DELETE_TODO,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// edit todo
export const archiveTodo = (id, data) => (dispatch, getState) => {
  // const data = { event_status: false };
  axios
    .put(`/api/todo/${id}/`, data, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ todoArchived: "Todo Item Archive" }));
      dispatch({
        type: ARCHIVE_TODO,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// add todolist
export const addTodo = todo => (dispatch, getState) => {
  axios
    .post("/api/todo/", todo, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ todoAdded: "Todo Item Added" }));
      dispatch({
        type: ADD_TODO,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
