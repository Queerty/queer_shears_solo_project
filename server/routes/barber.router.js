const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get("/", (req, res) => {
  const query = `SELECT * FROM barbers`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error getting all barbers", err);
      res.sendStatus(500);
    });
});
/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res, next) => {
  // const full_name= req.body.barber.fullName;
  // const pronouns= req.body.barber.pronouns;
  // const specialties= req.body.barber.specialties;
  // const phone= req.body.barber.phoneNumber;
  // const website= req.body.barber.website;
  // const facebook= req.body.barber.facebook;
  // const instagram= req.body.barber.instagram;
  // const address= req.body.barber.address;
  // const avatar_link= req.body.barber.avatar_link;
  // const role= req.body.barber.role;
  const barber = req.body.barber;
  const specialties = req.body.specialties;

  const queryText = `INSERT INTO "barbers" (full_name, pronouns, specialties, phone, website, facebook, instagram, address, avatar_link, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;
  pool
    .query(queryText, [
      barber.fullName,
      barber.pronouns,
      specialties,
      barber.phoneNumber,
      barber.website,
      barber.facebook,
      barber.instagram,
      barber.address,
      barber.avatar_link,
      barber.role,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Add Barber failed: ", err);
      res.sendStatus(500);
    });
});
//Get specific barber profile
router.get("/profile/:id", async (req, res) => {
  try {
    const response = await pool.query(`SELECT * FROM "barbers" WHERE "id"=$1`, [
      req.params.id,
    ]);
    res.send(response.rows[0]);
  } catch (error) {
    console.log("Could not get barber profile by id", error);
    res.sendStatus(500);
  }
});

module.exports = router;
