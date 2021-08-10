const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

//GET review database info
router.get("/", (req, res) => {
  console.log("GET /api/reviews");
  //select all data from reviews table
  pool
    .query('SELECT * from "reviews";')
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error GET /api/reviews", error);
      res.sendStatus(500);
    });
});
//POST new review to db after submit
router.post("/", (req, res) => {
  let newReview = req.body;
  console.log(`Adding review`, newReview);

  let queryText = `INSERT INTO "reviews" ("rating", "barber_id", "user_id", "location_id", "review")
                           VALUES ($1, $2, $3, $4, $5);`;
  pool
    .query(queryText, [
      newReview.rating,
      newReview.barber_id,
      newReview.user_id,
      newReview.location_id,
      newReview.review,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new review`, error);
      res.sendStatus(500);
    });
});

router.get("/:id", async (req, res) => {
  try {
    // let response = await pool.query(`
    //   SELECT barbers."full_name", barbers."pronouns", reviews."rating", reviews."review", "user"."id"
    //   FROM barbers
    //   JOIN reviews ON reviews."barber_id" = barbers.id
    //   JOIN "user" ON "user".id = reviews.user_id
    //   GROUP BY barbers.full_name, barbers.pronouns, reviews."rating", reviews."review", "user".id
    //   WHERE reviews."barber_id" = $1;`, [req.params.id]);
    //     res.send(response.rows);
    let response = await pool.query(
      `
  SELECT barbers."full_name", barbers."pronouns", reviews."rating", reviews."review", reviews."date", reviews."user_id", reviews."id" FROM barbers
  JOIN reviews ON reviews."barber_id" = barbers.id
  WHERE barbers.id= $1
  GROUP BY barbers.full_name, barbers.pronouns, reviews."rating", reviews."review", reviews."date", reviews."user_id", reviews."id";  
    `,
      [req.params.id]
    );
    res.send(response.rows);
  } catch (err) {
    console.log("ERROR: Getting barber reviews", err);
    res.sendStatus(500);
  }
});

router.delete("/:id", (req, res) => {
  const reviewId = req.params.id;

  console.log("IN THE DELETE FUNCTION:", reviewId);
  const query = `DELETE FROM "reviews"
                 WHERE "id" = $1;`;

  pool
    .query(query, [reviewId])
    .then((results) => res.sendStatus(202))
    .catch((error) => {
      console.log("Error deleting review: ", error);
      res.sendStatus(500);
    });
});

//edit user review
router.put("/", (req, res) => {
  const review = req.body;
  console.log(req.body);
  const query = `
  UPDATE reviews
  SET rating = $1, review = $2
  WHERE id = $3;`;
  pool
    .query(query, [review.rating, review.review, String(review.id)])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error updating review", err);
    });
});

router.get("/rating/:id", (req, res) => {
  console.log("GET average rating");
  //Get average from table
  const barber = req.params.id;
  console.log(barber, "&^#$*&%THIS IS BARBER ID IN RATING"); //not sure if id or barber_id payload for this query needs to be barber
  const query = `
  SELECT AVG(rating)
  FROM reviews
  WHERE barber_id = $1;`;
  pool
    .query(query, [barber])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log("Error GET avg rating from /api/rating/:id", error);
      res.sendStatus(500);
    });
});

//this is something for getting the user reviews

router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT "user".id as user_id, "reviews".id as review_id, "reviews".rating, "reviews".review, "barbers".full_name as "barber_name", "barbers".avatar_link FROM "user"
  JOIN "reviews" ON "reviews".user_id = user_id
  JOIN "barbers" ON "reviews".barber_id = "barbers".id
  WHERE "user".id=$1;`;
  pool
    .query(query, [userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("this is a user reviews GET error", error);
      res.sendStatus(500);
    });
});

module.exports = router;
