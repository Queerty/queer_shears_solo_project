const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const full_name = req.body.full_name;
  const pronouns = req.body.pronouns;
  const avatar_link = req.body.avatar_link;
  const role = req.body.role;


  const queryText = `INSERT INTO "user" (username, password, full_name, pronouns, avatar_link, role)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  pool
    .query(queryText, [username, password, full_name, pronouns, avatar_link, role])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/', (req, res, next) => {
  
  console.log("this is req dot body in user router", req.body);
  const username= req.body.username;
  const full_name= req.body.full_name;
  const pronouns= req.body.pronouns;
  const avatar_link= req.body.avatar_link;
  const query = `
  UPDATE "user"
  SET username=$1, full_name=$2, pronouns=$3, avatar_link=$4
  WHERE id=$5`;
  pool.query(query,[username, full_name, pronouns, avatar_link, req.user.id] )
  .then((response) => {
    res.sendStatus(200);
  })
  .catch((err)=> {
    console.log('error updating user profile'), err;
  });
});

module.exports = router;
