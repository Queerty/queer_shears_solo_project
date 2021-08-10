import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
      <img id="logo" src={'images/logo.png'} width="200px"/>

      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        <Link className="navLink" to="/about">
          About
        </Link>

        <Link className="navLink" to="/barber">
          Find Barber
        </Link>

        <Link className="navLink" to="/AddBarber">
          Add Barber
        </Link>
{user.id && (
  <>
        <LogOutButton className="navLink" />
</>
)}
      </div>

        {/* {user.id && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
          </>
        )} */}
    </div>
  );
}

export default Nav;
