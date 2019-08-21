import { GET_HISTORYS, DELETE_HISTORY } from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

// get todo list
export const gettodoHistory = () => (dispatch, getState) => {
  axios
    .get("/api/historys/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_HISTORYS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deletetodoHistory = id => (dispatch, getState) => {
  console.log(id);
  axios
    .delete(`/api/historys/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ todoDeleted: "Todo Item Deleted" }));
      dispatch({
        type: DELETE_HISTORY,
        payload: id
      });
    })
    .catch(err => console.log(err));
  // dispatch(returnErrors(err.response.data, err.response.status))
};
