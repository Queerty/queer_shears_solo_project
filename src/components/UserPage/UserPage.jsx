import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch= useDispatch();

  
  useEffect(() => {
    dispatch({ type: "FETCH_USER_REVIEWS", payload: user.id})
  }, []);
  const userReviews = useSelector((store) => store.reviews.userReviews);

  console.log(userReviews, "THIS IS THE LOG FOR USER REVIEWS")
  return (
    <div className="container">
      <h1>Your Profile</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <img src={user.avatar_link} width="200px"/>
      <p>{user.full_name}</p>
      
      
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
