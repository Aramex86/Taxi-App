import React, { useEffect, useState } from "react";
import "./Sass/main.scss";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CarlistComp from "./Components/CarsListComp/CarlistComp";
import MapComp from "./Components/MapComp/Map";
import SrearchComp from "./Components/SearchComp/SrearchComp";
import OrderBtn from "./Components/Common/OrderBtn";
import {
  coordsSelector,
  GeoObjectsSelector,
  serachSelector,
  toggleSelector,
} from "./Store/Selectors/OrderSelector";
import { useSelector } from "react-redux";
import { AppStateType } from "./Store/Store";
import CarInfo from "./Components/Common/CarInfo";
import { CircularProgress } from "@material-ui/core";

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
          height: 50,
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
      [theme.breakpoints.down("xs")]: {
        top: 56,
        left: 0,
        width: "100%",
        paddingBottom: "10rem",
        height: "auto",
      },
    },
    progress: {
      position: "absolute",
      left: "calc(100% - 50%)",
      top: "250%",
      zIndex: 3,
      color: "#000",
      width: "150px",
      textAlign: "center",
      fontWeight: 700,
      [theme.breakpoints.down("xl")]: {
        width: "155px",
      },
      [theme.breakpoints.down("md")]: {
        width: "150px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "150px",
        left: "88%",
      },
      [theme.breakpoints.down("xs")]: {
        width: "150px",
        left: "50%",
        // top:'50%',
        transform:'translate(-50%,-50%)',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
      },

      "& .MuiCircularProgress-colorPrimary": {
        color: "#000",
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
  const carSearch = useSelector((state: AppStateType) => serachSelector(state));

  const searchCarDelay = () => {
    return carSearch ? (
      <CarlistComp />
    ) : (
      <div className={classes.progress}>
        Searching Crars...
        <CircularProgress thickness={5} size={50} />
      </div>
    );
  };

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
        {geoObject.length === 0 && coords.length === 0 ? "" : searchCarDelay()}
        <OrderBtn />
      </div>
      {toogle ? <CarInfo /> : ""}
    </div>
  );
}

export default App;
