import axios from "axios";
import { setAlert } from "./alert";
import { GET_ALL_USERS, GET_USER, USER_ERROR, DELETE_USER } from "../types";

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/users/all");
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getUserDetails = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/users/" + user_id);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteUser = (user_id) => async (dispatch) => {
  try {
    const res = await axios.delete("http://localhost:5000/users/" + user_id);
    console.log(res);
    dispatch({
      type: DELETE_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addUser = (name, email, role, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password, role });
    const res = await axios.post(
      "http://localhost:5000/users/add",
      body,
      config
    );
    console.log(res);
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
