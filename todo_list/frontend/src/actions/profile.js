import { GET_PROFILE, UPDATE_PROFILE } from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

// get profile
export const getProfile = () => (dispatch, getState) => {
  axios
    .get(`/api/profile`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data[0]
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// UPDATE PROFILE
export const updateProfile = (id, profileItem) => (dispatch, getState) => {
  console.log(profileItem);
  axios
    .put(`/api/profile/${id}/`, profileItem, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateProfile: "Profile Saved" }));
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
