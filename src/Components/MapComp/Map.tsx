import React, { useEffect, useRef, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CrewsType } from "../../Types/types";
import MarkerImg from "../../assets/pin.png";

import {MapContainer,TileLayer,Marker,Popup, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSelector } from "react-redux";
import { addressSelector } from "../../Store/Selectors/OrderSelector";
import { AppStateType } from "../../Store/Store";


  // delete L.Icon.Default.prototype._getIconUrl;

const pointerIcon = new L.Icon({
  iconUrl:MarkerImg ,
  // iconRetinaUrl:,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [30, 30],
  shadowUrl: "https://rawcdn.githack.com/colbyfayock/egghead-code-examples/master/add-marker-popup-to-map-react-leaflet/src/images/marker-shadow.png",
  // shadowSize: [68, 95],
  shadowAnchor: [4, 65]
});
  
  
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
  
  
  const MapComp = () => {
    const classes = useStyles();
    const address = useSelector((state: AppStateType) => addressSelector(state));
    const [coordinates, setCoordinates] = useState({
      lat: 56.839439,
      lng: 53.218803,
    });
    const zoom = 15;


    
    

  return (
    <div className={classes.root} >
      <MapContainer center={[coordinates.lat,coordinates.lng]} zoom={zoom}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
    <Marker position={[coordinates.lat,coordinates.lng]} icon={pointerIcon}>
    <Popup>{address}</Popup>
    </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComp;
