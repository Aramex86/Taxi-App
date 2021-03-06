import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { toogleInfo } from "../../Store/Reducers/OrderReducer";
import { crewSelector } from "../../Store/Selectors/OrderSelector";
import { AppStateType } from "../../Store/Store";
import CarPic from "../../assets/car.png";
import { AiOutlineCloseCircle } from "react-icons/ai";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      height: "100vh",
      right: 0,
      background: "#ffff",
      top: "100px",
      width: "30%",
      [theme.breakpoints.down('sm')]: {
        width:'36%',
        height:'40vh',
      },
      [theme.breakpoints.down('xs')]: {
        width:'55%',
        height:'32vh',
        left:'0',
        bottom:'174px',
        top:'300px',
      },
    },
    list: {
      listStyle: "none",
      width: "80%",
      margin: "0 auto",
      marginTop: "50px",
      [theme.breakpoints.down('sm')]: {
        marginTop:0,
      },
      [theme.breakpoints.down('xs')]: {
        marginTop:0,
      },
    },
    button: {
      width: 25,
      height: 25,
      background: "transparent",
      border: "none",
      marginTop: 5,
      marginLeft: 5,
      "& svg": {
        width: 25,
        height: 25,
      },
    },
  })
);

const CarInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const crew = useSelector((state: AppStateType) => crewSelector(state));

  const handleClose = () => {
    dispatch(toogleInfo(false));
  };

  return (
    <div className={classes.root}>
      <button onClick={handleClose} className={classes.button}>
        <AiOutlineCloseCircle />
      </button>
      <img src={CarPic} alt="car" />
      <ul className={classes.list}>
        <li>
          Model: {crew?.car_mark} {crew?.car_model}
        </li>
        <li>Color: {crew?.car_color}</li>
        <li>Number: {crew?.car_number}</li>
        <li>Distance: {crew?.distance} M</li>
        <li>Driver phone: {crew?.driver_phone}</li>
      </ul>
    </div>
  );
};

export default CarInfo;
