import { Avatar, Box, Button, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./BarberProfile.css";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
// import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

function BarberProfile() {
  const barber = useSelector((store) => store.barbers.barberProfile);
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const barberReview = useSelector((store) => store.reviews.barberReviews);
  const user = useSelector((store) => store.user);
  const rating = useSelector((store) => store.reviews.barberRating);

  console.log(rating, "THIS IS THE AVERAGE RATING I THINK********");

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();

  //Fetch barber data on page load
  useEffect(() => {
    dispatch({
      type: "GET_BARBER_PROFILE",
      payload: {
        barberId: params.id,
      },
    });
  }, [params.id]);
  console.log(
    barberReview,
  );

  useEffect(() => {
    dispatch({
      type: "FETCH_BARBER_RATING",
      payload: {
        barberId: params.id,
      },
    });
  }, [params.id]);
  // const stars = barberReview.rating;

  //     function averageReview(stars){ for(each of stars){
  //         sum = sum + stars[each]
  //         return sum

  //     }
  //     console.log("average review:", averageReview);

  //     }

  const handleNext = () => {
    event.preventDefault();

    history.push(`/AddReview`);
  };

  const handleEdit = (response) => {
    event.preventDefault();
    dispatch({
      type: "SET_CURRENT_REVIEW",
      payload: { response },
    });

    history.push(`/reviews/${response.id}`);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete your review?")) {
      console.log("This is the id from the delete click:", id);
      dispatch({
        type: "DELETE_REVIEW",
        payload: id,
      });
      dispatch({
        type: "GET_BARBER_PROFILE",
        payload: { barberId: params.id },
      });
    } else {
    }
  };

  const styleObj = {
    fontSize: 22,
    textAlign: "left",
    padding: "10px",
  };

  return (
    <>
      <main>
        <Button onClick={() => history.push("/barber")}>Back to List</Button>
        <h1> Barber Profile/{barber.full_name}</h1>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <Avatar
                className="avatarProfile"
                alt={barber.full_name}
                style={{ height: "300px", width: "300px" }}
                src={barber.avatar_link}
              />
              
            </Grid>

            <Grid item xs={12}>
              {/* <h1>{barber.id}</h1> */}
              <Paper id="barberName"> <Button><FavoriteBorderOutlinedIcon/>favorite</Button>
                <Typography align="left">{barber.full_name}</Typography>
                <Typography align="left">{barber.pronouns}</Typography>
                <Typography align="left"> {barber.phone}</Typography>
                <a href={barber.website} align="left">
                  {" "}
                  {barber.website}
                </a>
                <a href={barber.facebook} align="left">
                  {" "}
                  {barber.facebook}
                </a>
                <a href={barber.instagram} align="left">
                  {" "}
                  {barber.instagram}
                </a>
                <Typography align="left"> {barber.address}</Typography>

                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">
                    {" "}
                    average user rating:
                  </Typography>
                  <Rating name="barber-avg-rating" value={rating.avg} />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <h2>Reviews for {barber.full_name}</h2>
                <Button type="button" variant="contained" onClick={handleNext}>
                  + Review
                </Button>

                <div>
                  {barberReview &&
                    barberReview.map((response) => (
                      <Paper id="review">
                        <div key={response.id} style={styleObj}>
                          <Box
                            component="fieldset"
                            mb={3}
                            borderColor="transparent"
                          >
                            <Typography component="legend">
                              Rating for {barber.full_name}
                            </Typography>
                            <Rating
                              name="barber-rating"
                              value={response.rating}
                            />
                          </Box>
                          <div>
                            {" "}
                            {response.review} {response.user_id}
                          </div>
                          {/* <div> date: {response.date}</div> */}
                          {user.id == response.user_id && (
                            <>
                              <Button onClick={() => handleEdit(response)}>
                                edit
                              </Button>
                              <Button onClick={() => handleDelete(response.id)}>
                                delete
                              </Button>
                            </>
                          )}
                        </div>
                      </Paper>
                    ))}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </main>
    </>
  );
}

export default BarberProfile;
