import React, {  useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import { GeoObjectsSelector } from "../../Store/Selectors/OrderSelector";
import { AppStateType } from "../../Store/Store";
import {
  YMaps,
  Placemark,
  Map,
  GeolocationControl,
  ZoomControl,
} from "react-yandex-maps";
import { requestCoords } from "../../Store/Reducers/OrderReducer";
import { reverse } from "dns";
const CrewData = require("../../Data/Crew.json");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "80vh",
    },
  })
);

const MapComp = () => {
  const classes = useStyles();
  const geoObject = useSelector((state: AppStateType) =>
    GeoObjectsSelector(state)
  );
  const dispatch = useDispatch();
  const [coordinatess, setCoordinates] = useState([56.839439, 53.218803]);
  const [clickCoords, setClickCoords] = useState<Array<number>>([]);
  const zoom = 12;
  const palceCoords = geoObject.map((coords) => coords.GeoObject.Point.pos);
  const extractCoords = palceCoords[0]
    ? palceCoords[0].split(" ").map((item) => Number(item))
    : [];
  const rverseCoords = extractCoords.reverse();

  const clickOnMap = (event: any) => {
    const getCords = [event.get("coords")].flat();
    setClickCoords(getCords);
    const tostirng = clickCoords.map((item) => String(item));
    const [lat, long] = tostirng;
    console.log(lat, long);
    dispatch(requestCoords(`${long},${lat}`));
  };

  const best= 0.003;
  const more=0.006;
  
  const [lat,long]=rverseCoords;
  const addDistanceBest = [lat+best,long+best]
  const addDistanceMore = [lat+more,long+more]
  
  console.log(addDistanceBest);
  console.log(addDistanceMore);
  

  return (
    <div className={classes.root}>
      <YMaps
        query={{
          load: "package.full",
          ns: "use-load-option",
        }}
      >
        <Map
          state={{
            center: rverseCoords,
            zoom: zoom /* behaviors:["disable('scrollZoom')",""] */,
            controls: ["fullscreenControl"],
          }}
          width={"100%"}
          height={"100vh"}
          onClick={clickOnMap}
        >
          <GeolocationControl />
          <ZoomControl options={{ position: { right: "3%", top: 260 } }} />
          <Placemark
            geometry={clickCoords}
            options={{
              visible: true,
              cursor: "pointer",
              iconColor: "#ffe70c",
              preset: "islands#yellowDotIcon",
            }}
          />
          <Placemark
            geometry={rverseCoords}
            options={{
              visible: true,
              cursor: "pointer",
              iconColor: "#ffe70c",
              preset: "islands#yellowDotIcon",
            }}
          />
          <Placemark
            geometry={addDistanceBest}
            options={{
              visible: true,
              cursor: "pointer",
              iconColor: "yellowgreen",
              preset: "islands#yellowDotIcon",
            }}
          />
          <Placemark
            geometry={addDistanceMore}
            options={{
              visible: true,
              cursor: "pointer",
              iconColor: "yellowgreen",
              preset: "islands#yellowDotIcon",
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
};

export default MapComp;
