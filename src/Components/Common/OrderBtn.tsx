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
      width: "100%",
      margin: "auto",
      background: "#ffe70c",
      color: "#000",
      position:'absolute',
      bottom:0,
      height:61,
      "&:hover": {
        backgroundColor: "#000",
        color: "#ffe70c",
      },
    },
  })
);

const OrderBtn = () => {
  const classes = useStyles();
  const error = useSelector((state: AppStateType) => errorSelector(state));

  return (
    <Button
      // variant="contained"
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
