import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h1>Your Profile</h1>
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <img src={user.avatar_link} width="200px"/>
      <p>{user.full_name}</p>
      <p>{user.pronouns}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
