import { Avatar, Chip } from "@material-ui/core";
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
      flexGrow: 1,
    },
    avatar: {
      justifyContent: "center",
    },

    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
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
    <main>
      <h1>Barber List</h1>
      {/* <Search /> */}
      {barbers.map((barber) => {
        return (
          <div key={barber.id}>
            <h2 onClick={() => onBarberProfile(barber.id)}>
              {barber.full_name}
            </h2>
            <h4>{barber.pronouns}</h4>
            <Avatar
              alt={barber.full_name}
              className="avatar"
              style={{ height: "300px", width: "300px", alignItems: "center" }}
              src={barber.avatar_link}
              onClick={() => onBarberProfile(barber.id)}
            />
            <p>Phone: {barber.phone}</p>
            <a href={barber.website}>Check out {barber.full_name}'s website</a>
            {barber.specialties &&
            <p>Specialties: {barber.specialties}</p>}
            <p>Address: {barber.address} </p>
          </div>
        );
      })}
    </main>
  );
}

export default BarberList;
