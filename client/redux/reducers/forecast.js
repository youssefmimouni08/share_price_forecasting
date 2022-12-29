import {
  GET_FORECAST,
  FORECAST_ERROR,
  GET_NEW_PREDICTION,
  ADJUST_OBJECT_WEIGHT,
  ADJUST_TRIGGER_WEIGHT,
  ADJUST_ACTEUR_WEIGHT,
  SET_LOADING,
} from "../types";

const initialState = {
  forecast_result: null,
  myPredictions: [],
  loading: false,
  adjustedObject: null,
  adjustedTrigger: null,
  adjustedActeur: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NEW_PREDICTION:
      return {
        ...state,
        forecast_result: payload,
        loading: false,
      };
    case GET_FORECAST:
      return {
        ...state,
        myPredictions: payload,
        loading: false,
      };
    case FORECAST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADJUST_OBJECT_WEIGHT:
      return {
        ...state,
        loading: false,
        adjustedObject: payload,
      };
    case ADJUST_TRIGGER_WEIGHT:
      return {
        ...state,
        loading: false,
        adjustedTrigger: payload,
      };
    case ADJUST_ACTEUR_WEIGHT:
      return {
        ...state,
        loading: false,
        adjustedActeur: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
}
