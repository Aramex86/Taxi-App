import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React, { FC } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import { useDispatch } from "react-redux";
import Car from "../../assets/car.png";
import { getCrew, getError } from "../../Store/Reducers/OrderReducer";
import { CrewsType } from "../../Types/types";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carCard: {
      position: "relative",
      padding: "0 .2rem",
      border: "1px solid #d6d6d6",
      borderRadius: 5,
      height: "88px",
      width: "30%",
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
        boxShadow: "0px 0px 6px 1px #5a5a5a45",
        background:'#d8d8d852',
      },
    },
    carname: {
      display: "flex",
      alignItems: "flex-start",
      flexDirection:'column',
      "& svg":{
        position:'absolute',
        top:2,
        fill:'#8c8c8c94',
        width:16,
        height:16,
      }
    },
    distanceColor: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "4px",
    },
    number: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

type PropsType = {
  distance?: number;
  color: string;
  mark: string;
  model: string;
  item: CrewsType;
  number?: string;
};

const CarCard: FC<PropsType> = ({
  distance,
  mark,
  model,
  color,
  item,
  number,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCrewSelected = (item: CrewsType) => {
    dispatch(getCrew(item));
    dispatch(getError(""));
  };

  return (
    <div className={classes.carCard} onClick={() => handleCrewSelected(item)}>
      <div className={classes.carname}>
        <FaInfoCircle/>
        <img src={Car} alt="car" />
        <span>
          {mark} {model}
        </span>
      </div>
      <p className={classes.distanceColor}>
        <span className={classes.number}>
          <span>{color}</span>
          <span>{number}</span>
        </span>
        <span>{distance ? `${distance} M` : ""}</span>
      </p>
      <HiChevronRight />
    </div>
  );
};

export default CarCard;
