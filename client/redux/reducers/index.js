import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import forecast from "./forecast";
import users from "./users";
import events from "./events";
import submenu from "./submenu";
import worlddata from "./worlddata";
import triggers from "./triggers";
import objects from "./arguments";
export default combineReducers({
  alert,
  worlddata,
  auth,
  forecast,
  users,
  events,
  submenu,
  triggers,
  objects,
});
