import axios from "axios";
import { setAlert } from "./alert";
import {
  ADJUST_ACTEUR_WEIGHT,
  ADJUST_OBJECT_WEIGHT,
  ADJUST_TRIGGER_WEIGHT,
  FORECAST_ERROR,
  GET_FORECAST,
  GET_NEW_PREDICTION,
  SAVE_PREDICTION,
  SET_LOADING,
} from "../types";

export const getMyPredictions = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/myPredictions");
    dispatch({
      type: GET_FORECAST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FORECAST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const setLoading = (loading) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: loading,
  });
};
export const savePrediction = (predictionObject) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(predictionObject);

    const body = {
      prediction: predictionObject,
    };

    const res = await axios.post(
      "http://localhost:5000/savePrediction",
      body,
      config
    );

    dispatch({
      type: SAVE_PREDICTION,
      //payload: loading,
    });
  } catch (err) {
    dispatch({
      type: FORECAST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const createPrediction = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(formData);

    const body = {
      context: formData,
    };

    const res = await axios.post(
      "http://localhost:5000/model/paragraph",
      body,
      config
    );

    dispatch({
      type: GET_NEW_PREDICTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FORECAST_ERROR,
      //payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const adjustObject = (obj_name, obj_weight) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ obj_name, obj_weight });

    const res = await axios.put(
      "http://localhost:5000/api/Objects/",
      body,
      config
    );
    console.log(res.data);
    dispatch({
      type: ADJUST_OBJECT_WEIGHT,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FORECAST_ERROR,
      payload: { msg: err },
    });
  }
};
export const adjustActeur =
  (acteur_name, acteur_weight) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ acteur_name, acteur_weight });

      const res = await axios.put(
        "http://localhost:5000/api/Objects/",
        body,
        config
      );
      console.log(res.data);
      dispatch({
        type: ADJUST_ACTEUR_WEIGHT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: FORECAST_ERROR,
        payload: { msg: err },
      });
    }
  };
export const adjustTrigger =
  (trigger_name, trigger_weight) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ trigger_name, trigger_weight });

      const res = await axios.put(
        "http://localhost:5000/api/triggers/",
        body,
        config
      );
      console.log(res.data);
      dispatch({
        type: ADJUST_TRIGGER_WEIGHT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: FORECAST_ERROR,
        payload: { msg: err },
      });
    }
  };
