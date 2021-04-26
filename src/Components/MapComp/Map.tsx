import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useDispatch, useSelector } from "react-redux";
import {
  coordsSelector,
  GeoObjectsSelector,
} from "../../Store/Selectors/OrderSelector";
import { AppStateType } from "../../Store/Store";
import {
  YMaps,
  Placemark,
  Map,
  ZoomControl,
  FullscreenControl,
} from "react-yandex-maps";
import { requestCoords, serachDelay } from "../../Store/Reducers/OrderReducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100vh",
    },
  })
);

const MapComp = () => {
  const classes = useStyles();
  const geoObject = useSelector((state: AppStateType) =>
    GeoObjectsSelector(state)
  );
  const coords = useSelector((state: AppStateType) => coordsSelector(state));
  const dispatch = useDispatch();
  const [coordinatess, setCoordinates] = useState<Array<number>>([]);
  const [clickCoords, setClickCoords] = useState<Array<number>>([]);
  const zoom = 12;
  const palceCoords = geoObject.map((coords) => coords.GeoObject.Point.pos);
  const extractCoords = palceCoords[0]
    ? palceCoords[0].split(" ").map((item) => Number(item))
    : [];
  const reverseCoords = extractCoords.reverse();

  const clickOnMap = (event: any) => {
    const getCords = [event.get("coords")].flat();
    setClickCoords(getCords);
    const tostirng = clickCoords.map((item) => String(item));
    const [lat, long] = tostirng;
    dispatch(requestCoords(`${long},${lat}`));
    dispatch(serachDelay());
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];
      setCoordinates(coords);
    });
  }, []);

  const best = 0.003;
  const more = 0.006;

  const [lat, long] = reverseCoords;
  const addDistanceBest = [lat + best, long];
  const addDistanceMore = [lat, long + more];

  const mobile = window.innerWidth;
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
            center: reverseCoords.length === 0 ? coordinatess : reverseCoords,
            zoom: zoom /* behaviors:["disable('scrollZoom')",""] */,
            controls: ["fullscreenControl"],
          }}
          width={"100%"}
          height={"100vh"}
          onClick={clickOnMap}
        >
          <ZoomControl
            options={{
              position:
                mobile === 360
                  ? { left: "3%", top: 345 }
                  : { right: "3%", top: 260 },
            }}
          />
          <FullscreenControl
            options={{
              position:
                mobile === 360
                  ? { right: "3%", bottom: 100 }
                  : { right: "3%", top: 260 },
            }}
          />

          {reverseCoords.length > 0 ? (
            <>
              <Placemark
                geometry={reverseCoords}
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
            </>
          ) : (
            <Placemark
              geometry={clickCoords}
              options={{
                visible: true,
                cursor: "pointer",
                iconColor: "#ffe70c",
                preset: "islands#yellowDotIcon",
              }}
            />
          )}
        </Map>
      </YMaps>
    </div>
  );
};

export default MapComp;
