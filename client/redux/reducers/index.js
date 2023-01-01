import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import forecast from "./forecast";
import users from "./users";
import events from "./events";
export default combineReducers({ alert, auth, forecast, users, events });
