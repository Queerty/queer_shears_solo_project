import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useHistory } from "react-router";
import "./UserPage.css";
import CreateIcon from "@material-ui/icons/Create";
import FavoriteIcon from "@material-ui/icons/Favorite";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    editbtn: {
      marginTop: 48,
    },
    title: {
      fontSize: 20,
      display: "inline-block",
    },
    pos: {
      marginBottom: 12,
      fontSize: 14,
    },
    icon: {
      marginLeft: 16,
    },
    phone: {},
    website: {},
  });
  const classes = useStyles();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_USER_REVIEWS", payload: user.id });
    dispatch({ type: "FETCH_FAVORITES", payload: user.id });
  }, []);
  const userReviews = useSelector((store) => store.reviews.userReviews);
  const userFavorites = useSelector((store) => store.favorites.userFavorites);
  console.log(userReviews, "THIS IS THE LOG FOR USER REVIEWS");
  console.log(userFavorites, "THESE ARE THE FAVORITES####");
  
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete your review?")) {
      console.log("This is the id from the delete click:", id);
      dispatch({
        type: "DELETE_REVIEW",
        payload: id,
      });
      dispatch({
        type: "FETCH_USER_REVIEWS",
        payload: user.id,
      });
    }
  };

  const updateProfile = () => {
    history.push("/user/edit");
  };

  return (
    <div className="container">
      <h2>Your Profile</h2>

      <Avatar
        src={user.avatar_link}
        style={{ height: "300px", width: "300px" }}
      />
      <Button
        className={classes.editbtn}
        variant="outlined"
        onClick={updateProfile}
      >
        edit profile
        <CreateIcon className={classes.icon} />
      </Button>
      <p>{user.full_name}</p>
      <p>{user.pronouns}</p>

      <p id="favTitle">
        {" "}
        Favorite Barbers <FavoriteIcon style={{ display: "inline-flex" }} />
      </p>
      {userFavorites && userFavorites.length > 0 ? (
        userFavorites.map((favorite) => (
          <>
            <Card className="favoriteCards">
              <CardContent>
                <Avatar
                  src={favorite.avatar_link}
                  style={{ height: "100px", width: "100px" }}
                />
                <Typography className={classes.title}>
                  {" "}
                  {favorite.full_name}{" "}
                </Typography>
                <Typography className={classes.pos}>
                  {favorite.pronouns}
                </Typography>
                <Typography className={classes.phone}>
                  {favorite.phone}
                </Typography>
                <a className={classes.website} href={favorite.website}>
                  {favorite.website}
                </a>
              </CardContent>
            </Card>
          </>
        ))
      ) : (
        <span></span>
      )}
      <h3>
        {" "}
        My Reviews <b>({userReviews.length})</b>
      </h3>
      <div>
        {userReviews && userReviews.length > 0 ? (
          userReviews.map((review) => {
            return (
              <>
                <Paper className="userPaper">
                  <Avatar className="userReview" src={review.avatar_link} style={{ height: "60px", width: "60px" }} />
                  <h4>{review.barber_name}</h4>
                  <Rating name="user-reviews" value={review.rating} />

                  <h4>{review.review}</h4>
                  {/* <Button onClick={() => handleEdit(review)}>
                    edit
                  </Button> */}
                  <Button onClick={() => handleDelete(review.review_id)}>
                    delete
                  </Button>
                </Paper>
              </>
            );
          })
        ) : (
          <span></span>
        )}
      </div>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
