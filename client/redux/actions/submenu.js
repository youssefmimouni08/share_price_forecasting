import { SET_SUB_MENU } from "../types";

export const setSelectedMenuItem = (menu) => (dispatch) => {
  console.log(menu);
  dispatch({
    type: SET_SUB_MENU,
    payload: menu,
  });
};
