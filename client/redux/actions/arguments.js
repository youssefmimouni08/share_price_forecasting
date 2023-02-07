import axios from "axios";
import { ARGUMENT_ERROR, GET_ALL_ARGUMENTS, GET_ARGUMENT } from "../types";

export const getAllArguments = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/Objects");
    dispatch({
      type: GET_ALL_ARGUMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ARGUMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getArgumentDetails = (arg_id) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/Objects/" + arg_id);
    dispatch({
      type: GET_ARGUMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ARGUMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
