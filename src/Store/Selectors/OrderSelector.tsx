import { AppStateType } from "../Store";


export const addressSelector=(state:AppStateType)=>{
    return state.address;
}
export const errorSelector=(state:AppStateType)=>{
    return state.error;
}
export const crewSelector=(state:AppStateType)=>{
    return state.crew;
}
export const GeoObjectsSelector=(state:AppStateType)=>{
    return state.geoObject;
}
export const coordsSelector=(state:AppStateType)=>{
    return state.coords;
}
