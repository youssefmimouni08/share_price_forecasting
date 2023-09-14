import {
  ARGUMENT_ERROR,
  GET_ALL_ARGUMENTS,
  GET_ARGUMENT,
  DELETE_ARGUMENT,
} from "../types";

const initialState = {
  all_arguments: [],
  loading: true,
  argumentDetail: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_ARGUMENTS:
      return {
        ...state,

        all_arguments: payload,
        argumentDetail: null,
        loading: false,
      };
    case GET_ARGUMENT:
      return {
        ...state,
        argumentDetail: payload,
        loading: false,
      };
    case ARGUMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case DELETE_ARGUMENT:
      const updated = state.all_arguments.filter(
        (arg) => arg._id !== payload.deleted._id
      );
      return {
        ...state,
        all_arguments: updated,
      };
    default:
      return state;
  }
}
