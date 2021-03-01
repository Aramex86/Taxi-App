import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { getCrew } from "../../Store/Reducers/OrderReducer";
import { CrewsType } from "../../Types/types";
import CarCard from "../Common/CarCard";
const CrewData = require("../../Data/Crew.json");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "40%",
      outline: "1px solid red",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      marginBottom: "50px",
      margin: "auto",
      "& div": {
        width: "77%",
      },
    },
  })
);

const BestCar = () => {
  const classes = useStyles();
  const { data } = CrewData;
  const { crews_info } = data;

  const best: CrewsType = crews_info[0];

  const dispatch = useDispatch();
  const selectBest=(item:CrewsType)=>{
    dispatch(getCrew(item))
  }

  return (
    <div className={classes.root} onClick={()=>selectBest(best)}>
      <CarCard
        item={best}
        distance={best.distance}
        mark={best.car_mark}
        model={best.car_model}
        color={best.car_color}
      />
    </div>
  );
};

export default BestCar;
