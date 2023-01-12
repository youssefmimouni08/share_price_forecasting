import { SET_SUB_MENU } from "../types";

const initialState = {
  selectedMenuItem: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SUB_MENU:
      console.log(payload);
      return {
        ...state,
        selectedMenuItem: payload,
      };

    default:
      return state;
  }
}
