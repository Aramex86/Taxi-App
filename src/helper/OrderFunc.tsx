import { CrewsType } from "../Types/types";


export const selectedItem=(item:CrewsType,dispatch:any,func:any)=>{
    dispatch(func(item))
}



// Функция создания заказа должна отдавать подобную структуру
// {
//   "source_time":"20130101010101", // формат времени ГГГГММДДччммсс
//   "addresses":[
//     {
//       "address":"Пушкинская, 144",
//       "lat":56.839439,
//       "lon":53.218803
//     }
//   ],
//   "crew_id":123
// }