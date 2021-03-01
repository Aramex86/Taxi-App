import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React, { FC, Provider } from "react";
import { HiChevronRight } from "react-icons/hi";
import { useDispatch } from "react-redux";
import Car from "../../assets/car.png";
import { getCrew } from "../../Store/Reducers/OrderReducer";
import { CrewsType } from "../../Types/types";

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
    distanceColor: {
      display:'flex',
      justifyContent:'space-between',
      marginTop:'30px'
    },
  })
);

type PropsType={
  distance:number,
  color:string,
  mark:string,
  model:string,
  item:CrewsType
}

const CarCard:FC<PropsType> = ({distance,mark,model,color,item}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCrewSelected = (item: CrewsType) => {
    dispatch(getCrew(item));
  };


  return (
    <div className={classes.carCard} onClick={()=>handleCrewSelected(item)}>
      <div className={classes.carname}>
        <img src={Car} alt="car" />
        <span>{mark} {model}</span>
      </div>
     
      <p className={classes.distanceColor}><span>{color}</span> <span>{distance} M</span></p>
      <HiChevronRight />
    </div>
  );
};

export default CarCard;
