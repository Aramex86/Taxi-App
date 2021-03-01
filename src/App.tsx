import React from "react";
import "./Sass/main.scss";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SrearchComp from "./Components/SearchComp/SrearchComp";
import CarlistComp from "./Components/CarsListComp/CarlistComp";
import BestCar from "./Components/BestCarComp/BestCar";
import OrderBtn from "./Components/Common/OrderBtn";
import MapComp from "./Components/MapComp/Map";
import Layout from "./Components/HOC/Layout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      display: "flex",
      flexDirection: "column",
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
      },
      "& .menuitem": {
        padding: "1rem",
        textTransform: "Capitalize",
        fontWeight: "bold",
      },
    },
    orederBody: {
      // outline:'1px solid red',
      marginTop: 50,
      width: "90%",
      margin: "auto",
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "150px",
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <ul className="menulist">
          <li className="menuitem">home</li>
          <li className="menuitem">about</li>
          <li className="menuitem">order</li>
        </ul>
      </header>
      <Layout>
        <div className={classes.orederBody}>
          <MapComp />
          <CarlistComp />
        </div>
        <BestCar />
      </Layout>
    </div>
  );
}

export default App;
