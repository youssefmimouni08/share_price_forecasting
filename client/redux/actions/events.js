import axios from "axios";
import { EVENT_ERROR, GET_ALL_EVENTS, GET_EVENT } from "../types";

export const getAllEvents = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/event_types");
    dispatch({
      type: GET_ALL_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getEventDetails = (event_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/event_types/" + event_id
    );
    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
