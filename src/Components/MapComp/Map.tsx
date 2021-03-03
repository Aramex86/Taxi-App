import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useSelector } from "react-redux";
import { addressSelector } from "../../Store/Selectors/OrderSelector";
import { AppStateType } from "../../Store/Store";
import {
  YMaps,
  Placemark,
  Map,
  SearchControl,
} from "react-yandex-maps";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "80vh",
      // outline: "1px solid #51d654",
    },
  })
);

const MapComp = () => {
  const classes = useStyles();
  const address = useSelector((state: AppStateType) => addressSelector(state));
  const [coordinatess, setCoordinates] = useState([56.839439, 53.218803]);
  const zoom = 15;

  const [clickCoords, setClickCoords] = useState<Array<number>>([]);
  // console.log(<YMaps/>)

  const clickOnMap = (event: any) => {
    return setClickCoords([event.get("coords")].flat());
  };


  console.log(clickCoords);
  return (
    <div className={classes.root}>
      <YMaps query={{ apikey: "88db4758-d1f8-44b2-9675-525f50e5775f" }}>
        <Map
          defaultState={{ center: coordinatess, zoom: zoom }}
          width={"100%"}
          height={"100vh"}
          onClick={clickOnMap}
          // instanceRef={ref=> console.log(ref)}
        >
          <SearchControl options={{ float: "right", kind: "street" }} />
          <Placemark
            geometry={clickCoords}
            options={{
              visible: true,
              cursor: "pointer",
              iconColor: "#ffe70c",
              preset: "islands#yellowDotIcon",
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
};

export default MapComp;
