import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { errorSelector } from "../../Store/Selectors/OrderSelector";
import { AppStateType } from "../../Store/Store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    button: {
      width: "40%",
      margin: "auto",
      background: "#000",
      color: "#fff",
      marginBottom:'50px',
      "&:hover": {
        backgroundColor: "yellow",
        color: "#000",
      },
    },
  })
);

const OrderBtn = () => {
  const classes = useStyles();
  const error = useSelector((state: AppStateType) => errorSelector(state));
  
  return (
    <Button variant="contained" color="primary" className={classes.button} type='submit' form='my-form' disabled={error?true:false}>
     Order
    </Button>
  );
};

export default OrderBtn;
