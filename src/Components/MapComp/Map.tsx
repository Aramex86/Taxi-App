import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CrewsType } from "../../Types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "60%",
      //   outline: "1px solid #51d654",
    },
  })
);

type CordsType = {
  lat: number;
  lon: number;
};

const MapContainer = () => {
  const classes = useStyles();

  const mapData = {
    center: [55.75, 37.57],
    zoom: 12,
  };

  const coordinates = [[56.839439, 56.839439]];

  return (
    <div className={classes.root}>
      <YMaps >
        <Map defaultState={mapData} width="100%" height="400px">
        <Placemark geometry={[56.839439, 53.218803]}/>  

        </Map>
      </YMaps>
    </div>
  );
};

export default MapContainer;
