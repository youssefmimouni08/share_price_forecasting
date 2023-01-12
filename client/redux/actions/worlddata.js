import axios from "axios";
import {
  GET_ALL_CONTINENTS,
  GET_ALL_COUNTRIES,
  GET_ALL_PROVINCES,
  GET_ALL_REGIONS,
  GET_CONTINENT,
  GET_COUNTRY,
  GET_PROVINCE,
  GET_REGION,
  WORLD_ERROR,
} from "../types";

export const getAllContinents = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/Continents");
    dispatch({
      type: GET_ALL_CONTINENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORLD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getContinentDetails = (_id) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/Continents/" + _id);
    dispatch({
      type: GET_CONTINENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORLD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getAllRegions = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/Regions");
    dispatch({
      type: GET_ALL_REGIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORLD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getRegionDetails = (_id) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/Regions/" + _id);
    dispatch({
      type: GET_REGION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORLD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getAllCountries = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/Countries");
    dispatch({
      type: GET_ALL_COUNTRIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORLD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCountryDetails = (_id) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/Countries/" + _id);
    dispatch({
      type: GET_COUNTRY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORLD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getAllProvinces = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/Provinces");
    dispatch({
      type: GET_ALL_PROVINCES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORLD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProvinceDetails = (_id) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/Provinces/" + _id);
    dispatch({
      type: GET_PROVINCE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORLD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
