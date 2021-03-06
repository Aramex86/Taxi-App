import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { AppStateType } from "../../Store/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  addressSelector,
  coordsSelector,
  crewSelector,
  GeoObjectsSelector,
} from "../../Store/Selectors/OrderSelector";
import {
  getAddress,
  getCoords,
  getGeoObject,
  getOrder,
  getSearchCord,
} from "../../Store/Reducers/OrderReducer";
import { OrderType } from "../../Types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 200,
      "& .MuiInputBase-root": {
        fontSize: "1.5rem",
      },
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
        fontSize: "1.5rem",
      },
      "& .MuiOutlinedInput-inputMarginDense":{
        paddingTop:'12.5px',
        paddingBottom:'12.5px',
      },
      "& .MuiFormLabel-root.Mui-focused": {
        color: "#000",
        fontWeight: "bold",
        fontSize: "1.5rem",
      },
      "& .MuiFormLabel-root": {
        fontSize: "1.5rem",
      },
      "& palceholder": {
        fontSize: "1.5rem",
      },
    },
  })
);

const SrearchComp = () => {
  const classes = useStyles();
  const address = useSelector((state: AppStateType) => addressSelector(state));
  const geoObject = useSelector((state: AppStateType) =>
    GeoObjectsSelector(state)
  );

  const coords = useSelector((state: AppStateType) => coordsSelector(state));
  const selectedCrew = useSelector((state: AppStateType) =>
    crewSelector(state)
  );
  const dispatch = useDispatch();

  const [value, setValue] = useState<string>("");
  const [carError, setCarError] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");

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
      crew_id: selectedCrew?.crew_id,
    };

    if (orderForm.crew_id === undefined) {
      setCarError("Please Select car");
    } else if (orderForm.crew_id === selectedCrew?.crew_id) {
      let geoCopy = [...geoObject];
      geoCopy = [];
      let coordsCopy = [...coords];
      coordsCopy = [];
      dispatch(getGeoObject(geoCopy));
      dispatch(getCoords(coordsCopy));
      dispatch(getOrder(orderForm));
      setCarError("");
      setValue("");
    } else {
    }
    console.log(orderForm);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const value = e.currentTarget.value;
    if (value.match(/\d+/g) || !value) {
      setAddressError("");
    } else {
      setAddressError("Please Enter the address and Nr. of house");
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
          value={coords.length > 0 || geoObject.length > 0 ? address : value}
          required
        />
        {addressError ? <div className="errors">{addressError}</div> : ""}
        {carError ? <div className="errors">{carError}</div> : ""}
      </form>
    </div>
  );
};
export default SrearchComp;
