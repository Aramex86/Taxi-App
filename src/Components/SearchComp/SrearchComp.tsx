import React, { useEffect, useRef, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { AppStateType } from "../../Store/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  addressSelector,
  coordsSelector,
  crewSelector,
  errorSelector,
  GeoObjectsSelector,
} from "../../Store/Selectors/OrderSelector";
import {
  getAddress,
  getError,
  getOrder,
  getSearchCord,
} from "../../Store/Reducers/OrderReducer";
import { OrderType } from "../../Types/types";

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
        color: "#000",
        fontWeight: "bold",
      },
    },
  })
);

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
  const geoObject = useSelector((state: AppStateType) =>
    GeoObjectsSelector(state)
  );
  const error = useSelector((state: AppStateType) => errorSelector(state));
  const coords = useSelector((state: AppStateType) => coordsSelector(state));
  const selectedCrew = useSelector((state: AppStateType) =>
    crewSelector(state)
  );
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  // console.log(coords);

  useEffect(() => {
    const nameArr = coords.map((item) => item.GeoObject.name);
    const [name] = nameArr;
    dispatch(getAddress(name));
  }, [dispatch, coords]);

  let time = "";
  const d = new Date();
  const selectedCrewTime = (
    year: number,
    month: number,
    day: number,
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    return (time = `${year}${month}${day}${hours}${minutes}${seconds}`);
  };
  selectedCrewTime(
    d.getFullYear(),
    d.getMonth(),
    d.getDay(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds()
  );

  useEffect(() => {
    if (value.length > 5) {
      dispatch(getSearchCord(address));
    }
  }, [address, dispatch]);

  const palceCoords = geoObject.map((coords) => coords.GeoObject.Point.pos);
  const extractCoords = palceCoords[0]
    ? palceCoords[0].split(" ").map((item) => Number(item))
    : [];

  const [lat, long] = extractCoords;

  // console.log(lat,long);

  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    const orderForm: OrderType = {
      source_time: time,
      addresses: [
        {
          address: address,
          lat: lat,
          lon: long,
        },
      ],
      crew_id: selectedCrew.crew_id,
    };
    if (orderForm.crew_id === undefined) {
      dispatch(getError("Please Select car"));
    } else if (orderForm.crew_id === selectedCrew.crew_id) {
      dispatch(getOrder(orderForm));
    }
    console.log(orderForm);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const value = e.currentTarget.value;
    if (!value.match(/\d+/) || !value) {
      dispatch(getError("Please Enter the address and Nr. of house"));
    } else {
      dispatch(getError(""));
    }
    setValue(value);
    dispatch(getAddress(value));
  };

  // console.log(geoObject);
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
          value={address}
          required
        />
        {error ? <div className="errors">{error}</div> : ""}
        {/* {value !=='' && geoObject? "":<div className="errors">Enter Valid Address</div>} */}
      </form>
    </div>
  );
};
export default SrearchComp;
