import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import { AppStateType } from "../../Store/Store";
import {  errorSelector } from "../../Store/Selectors/OrderSelector";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    button: {
      width: "100%",
      margin: "auto",
      background: "#ffe70c",
      color: "#000",
      position:'absolute',
      bottom:0,
      height:61,
      fontSize:'1.5rem',
      "&:hover": {
        backgroundColor: "#000",
        color: "#ffe70c",
      },
      [theme.breakpoints.down('xs')]: {
        height:50,
      },
    },
  })
);

const OrderBtn = () => {
  const classes = useStyles();
  const error = useSelector((state: AppStateType) => errorSelector(state));

  return (
    <Button
      color="primary"
      className={classes.button}
      type="submit"
      form="my-form"
      disabled={error ? true : false}
    >
      Order
    </Button>
  );
};

export default OrderBtn;
