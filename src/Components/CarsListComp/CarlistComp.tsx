import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CarCard from "../Common/CarCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "30%",
      outline: "1px solid #242be3",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  })
);

const CarlistComp = () => {
  const classes = useStyles();

  return <div className={classes.root}>
    <CarCard/>
    <CarCard/>
    <CarCard/>
  </div>;
};

export default CarlistComp;
