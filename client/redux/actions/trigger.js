import axios from "axios";
import { GET_ALL_TRIGGERS, GET_TRIGGER, TRIGGER_ERROR } from "../types";

export const getAllTriggers = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/triggers");
    dispatch({
      type: GET_ALL_TRIGGERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRIGGER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getTriggerDetails = (trigger_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/triggers/" + trigger_id
    );
    dispatch({
      type: GET_TRIGGER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TRIGGER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
