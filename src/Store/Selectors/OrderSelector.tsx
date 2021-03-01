import { AppStateType } from "../Store";


export const addressSelector=(state:AppStateType)=>{
    return state.address;
}
export const errorSelector=(state:AppStateType)=>{
    return state.error;
}