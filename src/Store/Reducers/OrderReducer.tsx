import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { CrewsType, OrderType, ValuesType } from "../../Types/types";
import { AppStateType } from "../Store";

const GET__CREW = "GET__CREW";
const GET__ADDRESS = "GET__ADDRESS";
const GET__ERROR ='GET__ERROR';
const ORDER = 'ORDER';


const initialState = {
  crew: {} as CrewsType,
  address: '',
  error:'',
  order: {} as OrderType | null,
};

type InitialStateType = typeof initialState;

type ActionsTypes = GETCREWTYPE | GetAddressType |GetErrorType|GetOrderType;

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
    case ORDER:{
      return{
        ...state,
        order:action.order,
      }
    }
    case GET__ERROR:{
      return{
        ...state,
        error:action.error,
      }
    }

    default:
      return state;
  }
};

type GETCREWTYPE = {
  type: typeof GET__CREW;
  crew: CrewsType;
};

export const getCrew = (crew: CrewsType): GETCREWTYPE => {
  return { type: GET__CREW, crew };
};

type GetAddressType = {
  type: typeof GET__ADDRESS;
  address: string;
};

export const getAddress = (address: string): GetAddressType => {
  return { type: GET__ADDRESS, address };
};


type GetErrorType={
  type: typeof GET__ERROR,
  error: string,
}
export const getError=(error:string):GetErrorType=>{
  return{type:GET__ERROR,error}
}

type GetOrderType={
  type: typeof ORDER,
  order: OrderType
}

export const getOrder=(order:OrderType):GetOrderType=>{
  return{type:ORDER,order}
}



// export const 

export default orderReducer;
