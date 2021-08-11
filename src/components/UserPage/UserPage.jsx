import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Avatar, Box, Button, Paper, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useHistory } from "react-router";
import "./UserPage.css";
import CreateIcon from '@material-ui/icons/Create';
import FavoriteIcon from '@material-ui/icons/Favorite';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "FETCH_USER_REVIEWS", payload: user.id })
    dispatch({ type: "FETCH_FAVORITES", payload: user.id })
  }, []);
  const userReviews = useSelector((store) => store.reviews.userReviews);
  const userFavorites = useSelector((store) => store.favorites.userFavorites);
  console.log(userReviews, "THIS IS THE LOG FOR USER REVIEWS");
  console.log(userFavorites, "THESE ARE THE FAVORITES####")
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete your review?")) {
      console.log("This is the id from the delete click:", id);
      dispatch({
        type: "DELETE_REVIEW",
        payload: id,
      });
      dispatch({ 
        type: "FETCH_USER_REVIEWS",
        payload: user.id
      })
    }
  };

  const updateProfile = () => {
    history.push('/user/edit')
  }

  return (
    <div className="container">
      <h1>Your Profile</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <Avatar
        src={user.avatar_link}
        style={{ height: "300px", width: "300px" }}
      />
      <Button onClick={updateProfile}>edit profile<CreateIcon/></Button>
      <p>{user.full_name}</p>
      <p>{user.pronouns}</p>

      <p id="favTitle"> Favorite Barbers <FavoriteIcon style={{ display: "inline-flex" }}/></p>
      {userFavorites && userFavorites.length > 0 ? (
        userFavorites.map((favorite) => (
        <>
        <Paper className="favoriteCards">
        <Avatar src={favorite.avatar_link}/> 
       <div> {favorite.full_name} </div>
       <p>{favorite.pronouns}</p>
       <p>{favorite.phone}</p>
       <a href={favorite.website}>{favorite.website}</a>
       </Paper>
       </>
      ))) : (<span></span>)}
      <p> My Reviews <b>({userReviews.length})</b></p>
      <div>
        {userReviews && userReviews.length > 0 ? (
          userReviews.map((review) => {
            return (
              <>
                <Paper className="userPaper">
                  <Avatar className="userReview" src={review.avatar_link} />
                  <Rating name="user-reviews" value={review.rating} />
                  <h3>{review.full_name}</h3>

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
