import { Avatar, Card, CardMedia, Chip, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./FindBarber.css";
import { makeStyles } from "@material-ui/core/styles";
import Search from "../Search/Search";

function BarberList() {
  useEffect(() => {
    dispatch({ type: "FETCH_BARBERS" });
    dispatch({ type: "FETCH_REVIEWS" });
  }, []);

  const dispatch = useDispatch();
  const barbers = useSelector((store) => store.barbers.barbers);
  const reviews = useSelector((store) => store.reviews.reviews);
  const history = useHistory();

  //material ui
  const useStyles = makeStyles((theme) => ({
    root: {
      
    },

    // paper: {
    //   padding: theme.spacing(2),
    //   textAlign: "center",
    //   color: theme.palette.text.secondary,
    // },
    barbers: {
      margin: 20,
      padding: 20,
      // display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      justify: 'center',
      flexGrow: 1,
      width: "400px",
      height: "500px",
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    }
  }));
  const classes = useStyles();

  const onBarberProfile = (barberId) => {
    console.log("Clicked barber with id:", barberId);
    dispatch({ type: "GET_BARBER_REVIEWS", payload: barberId });
    history.push(`/profile/${barberId}`); //req.params.id
  };
  console.log(
    "This is log barbers in barber list***************************",
    barbers
  );
  console.log("####################This is reviews", reviews);

  // const getRating = (barber.id) => {

  //         dispatch({type: 'FETCH_BARBER_RATING', payload: barber.id})
  // }
  return (
    <>
  
      <h1 id="barberList">Barber List</h1>
      <Grid 
      container 
      spacing={2}
      direction="row"
    justifyContent="center"
    alignItems="center">
      
      {/* <Search /> */}
      
      {barbers.map((barber) => {
        return (
          
            <Grid item key={barber.id} size={200} >
            <Card className={classes.barbers}>
            <h2 onClick={() => onBarberProfile(barber.id)}>
              {barber.full_name}
            </h2>
            <h4>{barber.pronouns}</h4>
            <Avatar
            // component="img"
              alt={barber.full_name}
              className="avatar"
              style={{ height: "200px", width: "200px", marginLeft: "100px"}}
              src={barber.avatar_link}
              onClick={() => onBarberProfile(barber.id)}
              
            />
            <div id="phoneNumber">
            {/* <a href="tel:">Phone: {barber.phone}</a> */}
            </div>
            <br></br>
            <a href={barber.website}>{barber.website}</a>
           
            {barber.specialties &&
            <p>Specialties: {barber.specialties}</p>}
            <p>Address: {barber.address} </p>
            </Card>
            </Grid>
          
        );
      })}
    </Grid>
    </>
  );
}

export default BarberList;
