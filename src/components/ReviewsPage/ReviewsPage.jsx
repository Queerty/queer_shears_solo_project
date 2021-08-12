import React from "react";
import { useState} from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
//material UI imports
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Avatar } from "@material-ui/core";
import "./ReviewsPage.css"

function ReviewPage() {
const user = useSelector((store) => store.user);
const barber = useSelector(store => store.barbers.barberProfile);
const history = useHistory();

  const [value, setValue] = React.useState(2);
  const [reviewValue, setReviewValue] = useState("");

  const handleSubmit = () => {
    event.preventDefault();

    axios({
      method: "POST",
      url: "/api/reviews/",
      data: {
        rating: value,
        barber_id: barber.id,
        user_id: Number(user.id),
        location_id: 4,
        review: reviewValue
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("this is a Post error", err);
      });
    history.push(`/profile/${barber.id}`); //maybe have it take user to that barber's profile page
  };

  return (
    <div id="reviewPage">
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rate your experience with {barber.full_name}</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      <Avatar src={barber.avatar_link} alt={barber.full_name} style={{ height: "200px", width: "200px" }}/>
      <p>{barber.address}</p>
        <label> Tell us about your experience </label>
        <br></br>
         
      <textarea
      value={reviewValue}
      onChange={(evt) => setReviewValue(evt.target.value)}></textarea>
<div></div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
export default ReviewPage;
