const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET user favorites
 */
 router.get("/:id", (req, res) => {
    const query = `
    SELECT * FROM favorite_barbers
    WHERE user_id=$1`;
    pool
      .query(query, [req.user.id])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((err) => {
        console.log("Error getting all barbers", err);
        res.sendStatus(500);
      });
  });

//POST new favorite to db after submit
router.post("/", (req, res) => {
console.log("in FAVORITE router");
  let favorite = req.body;
  console.log(`Adding favorite`, favorite);
const full_name= favorite.full_name;
const pronouns= favorite.pronouns;
const phone= favorite.phone;
const website= favorite.website;
const avatar_link= favorite.avatar_link;

  let queryText = `INSERT INTO "favorite_barbers" ("full_name", "pronouns", "phone", "website", "avatar_link", "user_id")
                           VALUES ($1, $2, $3, $4, $5, $6);`;
  pool
    .query(queryText, [full_name, pronouns, phone, website, avatar_link, req.user.id]
     
    )
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new review`, error);
      res.sendStatus(500);
    });
});

module.exports = router;