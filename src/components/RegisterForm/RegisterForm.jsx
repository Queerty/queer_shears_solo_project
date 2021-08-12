import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterForm.css'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [avatar_link, setAvatarLink] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        full_name: fullName,
        pronouns: pronouns,
        avatar_link: avatar_link,
        role: true
      },
    });
  }; // end registerUser

  return (
    <section id="backImg">
    <div id="registerBackground">
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="fullName">
          Full Name
          <input
            type="text"
            name="fullName"
            value={fullName}
            required
            onChange={(event) => setName(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="pronouns">
          Pronouns
          <input
            type="text"
            name="pronouns"
            value={pronouns}
            required
            onChange={(event) => setPronouns(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="avatar_link">
          Profile Picture url
          <input
            type="text"
            name="avatar_link"
            value={avatar_link}
            required
            onChange={(event) => setAvatarLink(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
    </div>
    </section>
  );
}

export default RegisterForm;
