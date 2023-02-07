import { GET_ALL_TRIGGERS, GET_TRIGGER, TRIGGER_ERROR } from "../types";

const initialState = {
  all_triggers: [],
  loading: true,
  triggerDetail: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_TRIGGERS:
      return {
        ...state,
        all_triggers: payload,
        triggerDetail: null,
        loading: false,
      };
    case GET_TRIGGER:
      return {
        ...state,
        triggerDetail: payload,
        loading: false,
      };
    case TRIGGER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
