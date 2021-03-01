import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react'
import CarCard from '../Common/CarCard'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "40%",
      outline: "1px solid red",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      marginBottom:'50px',
      margin:'auto',
      '& div':{
          width:'70%'
      }
    },
  })
);

const BestCar = () => {
    const classes= useStyles()
    return (
        <div className={classes.root}>
           <CarCard/>
        </div>
    )
}

export default BestCar
