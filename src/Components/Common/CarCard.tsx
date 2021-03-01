import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React from "react";
import { HiChevronRight } from "react-icons/hi";
import Car from "../../assets/car.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carCard: {
      position: "relative",
      padding: "0 1rem",
      border: "1px solid #d6d6d6",
      borderRadius: 5,
      height: "105px",
      width: "85%",
      margin: "10px 0 10px 0",
      transition: "all .5s ease",
      cursor: "pointer",
      "& img": {
        width: "50%",
      },
      "& svg": {
        position: "absolute",
        right: "3%",
        top: "36%",
      },
      "&:hover": {
        boxShadow: "0px 0px 6px 1px #80808045",
      },
    },
    carname: {
      display: "flex",
      alignItems: "center",
      marginBottom: 10,
    },
    distance: {
      position: "absolute",
      right: "6%",
      bottom: "12%",
    },
  })
);

const CarCard = () => {
  const classes = useStyles();

  return (
    <div className={classes.carCard}>
      <div className={classes.carname}>
        <img src={Car} alt="car" />
        <span>car name</span>
      </div>
      color
      <p className={classes.distance}>100m</p>
      <HiChevronRight />
    </div>
  );
};

export default CarCard;
