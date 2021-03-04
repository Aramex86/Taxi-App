// import { Dispatch } from "react";
// import { ThunkAction } from "redux-thunk";
import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { getSearch } from "../../Components/Api/api";
import {
  CrewsType,
  // GeoObjectType,
  ObjectType,
  OrderType,
} from "../../Types/types";
import { AppStateType } from "../Store";
// import { AppStateType } from "../Store";

const GET__CREW = "GET__CREW";
const GET__ADDRESS = "GET__ADDRESS";
const GET__ERROR = "GET__ERROR";
const ORDER = "ORDER";
const GET__GEOOBJECTTYPE = "GET__GEOOBJECTTYPE";
const GET__CORDS = "GET__CORDS";

const initialState = {
  crew: {} as CrewsType,
  address: "",
  error: "",
  order: {} as OrderType | null,
  geoObject: [] as Array<ObjectType>,
  coords: [] as Array<ObjectType>,
};

type InitialStateType = typeof initialState;

type ActionsTypes =
  | GetCrewType
  | GetAddressType
  | GetErrorType
  | GetOrderType
  | GetGeoObjectTypeType
  | GetCoordsType;

type DispatchType = Dispatch<ActionsTypes>;

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

const orderReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case GET__CREW: {
      return {
        ...state,
        crew: action.crew,
      };
    }
    case GET__ADDRESS: {
      return {
        ...state,
        address: action.address,
      };
    }
    case ORDER: {
      return {
        ...state,
        order: action.order,
      };
    }
    case GET__ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    case GET__GEOOBJECTTYPE: {
      return {
        ...state,
        geoObject: [...action.geoObject].slice(0, 1),
      };
    }
    case GET__CORDS: {
      return {
        ...state,
        coords: [...action.coords].slice(0, 1),
      };
    }

    default:
      return state;
  }
};

type GetCrewType = {
  type: typeof GET__CREW;
  crew: CrewsType;
};

export const getCrew = (crew: CrewsType): GetCrewType => {
  return { type: GET__CREW, crew };
};

type GetAddressType = {
  type: typeof GET__ADDRESS;
  address: string;
};

export const getAddress = (address: string): GetAddressType => {
  return { type: GET__ADDRESS, address };
};

type GetErrorType = {
  type: typeof GET__ERROR;
  error: string;
};
export const getError = (error: string): GetErrorType => {
  return { type: GET__ERROR, error };
};

type GetOrderType = {
  type: typeof ORDER;
  order: OrderType;
};

export const getOrder = (order: OrderType): GetOrderType => {
  return { type: ORDER, order };
};

type GetGeoObjectTypeType = {
  type: typeof GET__GEOOBJECTTYPE;
  geoObject: Array<ObjectType>;
};

export const getGeoObject = (
  geoObject: Array<ObjectType>
): GetGeoObjectTypeType => {
  return { type: GET__GEOOBJECTTYPE, geoObject };
};

type GetCoordsType = {
  type: typeof GET__CORDS;
  coords: Array<ObjectType>;
};

export const getCoords = (coords: Array<ObjectType>): GetCoordsType => {
  return { type: GET__CORDS, coords };
};

export const getSearchCord = (value: string): ThunkType => async (
  dispatch: DispatchType
) => {
  const res = await getSearch.getAddress(value);
  dispatch(getGeoObject(res));
};
export const requestCoords = (coords: string): ThunkType => async (
  dispatch: DispatchType
) => {
  const res = await getSearch.getCoords(coords);
  dispatch(getCoords(res));
};

export default orderReducer;

