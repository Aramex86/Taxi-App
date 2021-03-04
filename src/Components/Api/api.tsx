import axios from "axios";

const api_key = "88db4758-d1f8-44b2-9675-525f50e5775f";

export const getSearch = {
  getAddress(value: string) {
        return axios
        .get(
            ` https://geocode-maps.yandex.ru/1.x/?apikey=${api_key}&format=json&geocode=${value}`
            )
            .then((res) => {
                // console.log(res);
                return res.data.response.GeoObjectCollection.featureMember;
              })
              .catch((error) => {
                  if (error) {
                      console.log(error.data.response.message);
                  }
              });
        },
    getCoords(value:string){
        return axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${api_key}&format=json&geocode=${value}`).then(res=> res.data.response.GeoObjectCollection.featureMember).catch(error=>{
            console.log(error);
        })
    }
};
