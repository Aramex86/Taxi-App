import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { FaInfoCircle } from "react-icons/fa";
import { HiChevronRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Car from "../../assets/car.png";
import { getCrew, getError, toogleInfo } from "../../Store/Reducers/OrderReducer";
import { CrewsType } from "../../Types/types";
import { toggleSelector } from "../../Store/Selectors/OrderSelector";
import { AppStateType } from "../../Store/Store";

const CrewData = require("../../Data/Crew.json");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    carCard: {
      position: "relative",
      padding: "0 .2rem",
      border: "1px solid #d6d6d6",
      borderRadius: 5,
      height: "100px",
      width: "40%",
      margin: "10px 0 10px 0",
      transition: "all .5s ease",
      [theme.breakpoints.down('md')]: {
        width:'49%',
      },
      [theme.breakpoints.down('sm')]: {
        width:'100%',
        padding:'0 .5rem',
      },
      [theme.breakpoints.down('xs')]: {
        width:'48%',
        padding:'0 .5rem',
        height:'80px',
      },
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
        background: "#d8d8d852",
      },
    },
    carname: {
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column",
      "& svg": {
        position: "absolute",
        top: 2,
        fill: "#8c8c8c94",
        width: 16,
        height: 16,
      },
    },
    distanceColor: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "4px",
      [theme.breakpoints.down('xs')]: {
       flexDirection:'column',
      },
    },
    number: {
      display: "flex",
      flexDirection: "column",
    },
    best:{
      position:'absolute',
      bottom:'0',
      left:'50%',
      transform:'translate(-50%,0)'
    }
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
  const toogle = useSelector((state: AppStateType) =>
  toggleSelector(state)
);
  

  const [crewInfo1, crewInfo2] = CrewData.data.crews_info;

  const habndleToogle=()=>{
    dispatch(toogleInfo(true))
  }

  // console.log(crewInfo1);
  // console.log(crewInfo2);


  console.log(toogle)

  return (
    <>
      <div className={classes.carCard} onClick={() => handleCrewSelected(item)}>
        <div className={classes.carname}>
          <FaInfoCircle onClick={habndleToogle}/>
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
        {crewInfo1.crew_id === item.crew_id ? <div className={classes.best}>Best Chiose</div> : ""}
        <HiChevronRight />
      </div>
    </>
  );
};

export default CarCard;
