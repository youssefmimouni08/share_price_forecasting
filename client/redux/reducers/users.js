import { DELETE_USER, GET_ALL_USERS, GET_USER } from "../types";

const initialState = {
  all_users: [],

  loading: true,
  userDetail: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_USERS:
      return {
        ...state,
        all_users: payload,
        userDetail: null,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        userDetail: payload,
        loading: false,
      };

    case DELETE_USER:
      console.log(payload.deletedUser._id);
      const updatedUsers = state.all_users.filter(
        (user) => user._id !== payload.deletedUser._id
      );
      return {
        ...state,
        all_users: updatedUsers,
      };

    default:
      return state;
  }
}
