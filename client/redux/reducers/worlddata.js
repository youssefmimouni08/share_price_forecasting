import {
  WORLD_ERROR,
  GET_ALL_CONTINENTS,
  GET_ALL_COUNTRIES,
  GET_ALL_PROVINCES,
  GET_ALL_REGIONS,
  GET_CONTINENT,
  GET_COUNTRY,
  GET_PROVINCE,
  GET_REGION,
} from "../types";

const initialState = {
  all_continents: [],
  continentDetails: null,
  all_regions: [],
  regionDetails: null,
  all_countries: [],
  countryDetails: null,
  all_Provinces: [],
  provinceDetails: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_CONTINENTS:
      return {
        ...state,
        all_continents: payload,
        continentDetails: null,
        loading: false,
      };
    case GET_CONTINENT:
      return {
        ...state,
        continentDetails: payload,
        loading: false,
      };
    case GET_ALL_REGIONS:
      return {
        ...state,
        all_regions: payload,
        regionDetails: null,
        loading: false,
      };
    case GET_REGION:
      return {
        ...state,
        regionDetails: payload,
        loading: false,
      };
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        all_countries: payload,
        countryDetails: null,
        loading: false,
      };
    case GET_COUNTRY:
      return {
        ...state,
        countryDetails: payload,
        loading: false,
      };
    case GET_ALL_PROVINCES:
      return {
        ...state,
        all_Provinces: payload,
        provinceDetails: null,
        loading: false,
      };
    case GET_PROVINCE:
      return {
        ...state,
        provinceDetails: payload,
        loading: false,
      };
    case WORLD_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
}
