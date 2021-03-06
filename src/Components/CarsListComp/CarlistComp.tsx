import React, { FC, useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CarCard from "../Common/CarCard";
import { CrewsType } from "../../Types/types";
const CrewData = require("../../Data/Crew.json");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      padding: "0 .5rem",
      gap: "5px",
      flexWrap: "wrap",
    },
  })
);

type PropsType = {};

const CarlistComp: FC<PropsType> = () => {
  const classes = useStyles();

  const { data } = CrewData;
  const { crews_info }: { crews_info: Array<CrewsType> } = data;

  const sortItems = crews_info.sort((a, b) => a.distance - b.distance);

  return (
    <div className={classes.root}>
      {sortItems.map((item: CrewsType) => (
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
