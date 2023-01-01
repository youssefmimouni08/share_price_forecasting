import { EVENT_ERROR, GET_ALL_EVENTS, GET_EVENT } from "../types";

const initialState = {
  all_events: [],
  loading: true,
  eventDetail: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        all_events: payload,
        eventDetail: null,
        loading: false,
      };
    case GET_EVENT:
      return {
        ...state,
        eventDetail: payload,
        loading: false,
      };
    case EVENT_ERROR:
      return {
        ...state,

        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
