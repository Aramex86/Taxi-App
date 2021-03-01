import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { AppStateType } from "../../Store/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  addressSelector,
  errorSelector,
} from "../../Store/Selectors/OrderSelector";
import { getAddress, getError, getOrder } from "../../Store/Reducers/OrderReducer";
import { OrderType, ValuesType } from "../../Types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 200,
    },
    form: {
      width: "80%",
      margin: "auto",
    },
    input: {
      background: "#fff",
      width: "100%",
      marginTop: "25px",
      "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e2e868",
      },
      "& .MuiFormLabel-root.Mui-focused": {
        color: "black ",
        fontWeight: "bold",
      },
    },
  })
);

type ErrorsType = {
  adress: string;
};

// const validate = (values: ValuesType) => {
//   const errors = {} as ErrorsType;
//   if (!values.adress) {
//     console.log("error!");
//     errors.adress = "Please enter street and house nr.";
//   } else if (!/\d/.test(values.adress)) {
//     console.log("error number!");
//     errors.adress = "Enter House Nr.";
//   }
//   return errors;
// };

const SrearchComp = () => {
  const classes = useStyles();
  // const check = /^(\w| )*[0-9A-Za-z](\w| )*$/;
  const address = useSelector((state: AppStateType) => addressSelector(state));
  const error = useSelector((state: AppStateType) => errorSelector(state));
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  console.log("Selector", address);
  console.log("Value", value);
  console.log("Error", error);

  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    const form: OrderType = {
      source_time: "20130101010101",
      addresses: [
        {
          address: address,
          lat: 56.839439,
          lon: 53.218803,
        },
      ],
      crew_id:123
    };

    console.log(form);
    dispatch(getOrder(form));
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const value = e.currentTarget.value;
    if (!value.match(/\d+/) || value === "") {
      console.log("yes");
      dispatch(getError("Please Enter the address and Nr. of house"));
    } else {
      dispatch(getError(""));
    }
    setValue(value);
    dispatch(getAddress(value));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className={classes.form} id="my-form">
        <TextField
          label="Street,house nr..."
          id="adress"
          variant="outlined"
          size="small"
          className={classes.input}
          placeholder="Street,house nr...."
          name="adress"
          onChange={handleChange}
          value={value}
          required
        />
        {error ? <div className="errors">{error}</div> : ""}
      </form>
    </div>
  );
};
export default SrearchComp;
