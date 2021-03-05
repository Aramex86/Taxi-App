import React, { useState } from "react";
import "./Sass/main.scss";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CarlistComp from "./Components/CarsListComp/CarlistComp";
// import BestCar from "./Components/BestCarComp/BestCar";
import MapComp from "./Components/MapComp/Map";
import SrearchComp from "./Components/SearchComp/SrearchComp";
import OrderBtn from "./Components/Common/OrderBtn";
import {
  coordsSelector,
  GeoObjectsSelector,
  toggleSelector,
} from "./Store/Selectors/OrderSelector";
import { useSelector } from "react-redux";
import { AppStateType } from "./Store/Store";
import CarInfo from "./Components/Common/CarInfo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      height: "100vh",
    },
    header: {
      background: "#000",
      "& .menulist": {
        display: "flex",
        listStyle: "none",
        width: "50%",
        height: "100px",
        alignItems: "center",
        padding: "0 3rem",
        background: "linear-gradient(to right, #ffe70c 65%, #020024 45%)",
        [theme.breakpoints.down("xs")]: {
          background: "linear-gradient(to right, #ffe70c 65%, #020024 42%)",
        },
      },
      "& .menuitem": {
        padding: "1rem",
        textTransform: "Capitalize",
        fontWeight: "bold",
        [theme.breakpoints.down("xs")]: {
          "&:last-child": {
            color: "#fff",
          },
        },
      },
    },
    orederBody: {
      width: "44%",
      position: "absolute",
      background: "#fff",
      top: "110px",
      left: "5px",
      border: "1px solid gray",
      borderRadius: 5,
      height: "auto",
      paddingBottom: "9rem",
      [theme.breakpoints.down("sm")]: {
        bottom: 0,
        top: "66%",
        width: "100%",
        left: 0,
      },
    },
  })
);

function App() {
  const classes = useStyles();
  const geoObject = useSelector((state: AppStateType) =>
    GeoObjectsSelector(state)
  );
  const toogle = useSelector((state: AppStateType) => toggleSelector(state));
  const coords = useSelector((state: AppStateType) => coordsSelector(state));

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <ul className="menulist">
          <li className="menuitem">home</li>
          <li className="menuitem">about</li>
          <li className="menuitem">order</li>
        </ul>
      </header>
      <MapComp />
      <div className={classes.orederBody}>
        <SrearchComp />
        {
          /* geoObject.length === 0 && coords.length === 0 ? "" : */ <CarlistComp />
        }
        <OrderBtn />
      </div>
      {toogle ? <CarInfo /> : ""}
    </div>
  );
}

export default App;
