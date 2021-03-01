import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CarCard from "../Common/CarCard";
import { CrewsType } from "../../Types/types";
const CrewData = require("../../Data/Crew.json");

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
 
  const { data } = CrewData;
  const { crews_info } = data;

console.log(crews_info);


  return (
    <div className={classes.root}>
      {crews_info.map((item: CrewsType) => (
        <CarCard
          item={item}
          distance={item.distance}
          mark={item.car_mark}
          model={item.car_model}
          color={item.car_color}
          key={item.crew_id}
        />
        
      ))}
    </div>
  );
};

export default CarlistComp;
