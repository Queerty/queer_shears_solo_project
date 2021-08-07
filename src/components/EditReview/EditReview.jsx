
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

function EditReview() {

const dispatch = useDispatch();
const history = useHistory();

const currentReview = useSelector(store => store.reviews.currentReview);
console.log(currentReview, "WHAT IS STORE REVIEW BARBER REVIEWS");
const [ newRating, setNewRating ] = useState(currentReview.response.rating);
const [ newReview, setNewReview ] = useState(currentReview.response.review);
const barber = useSelector(store => store.barbers.barberProfile);
const user = useSelector(store => store.user)

console.log("CURRENT REVIEW VALUE:", currentReview);
  const updateReview = () => {
      console.log("LETS FIND OUT WHAT CURRENT REVIEW ID IS:", currentReview)
    dispatch({
      type: 'EDIT_REVIEW',
      payload: {
        rating: newRating,
        review: newReview,
        id: currentReview.response.id
      }
    });
  }

  return (
    <div>
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Typography component="legend">Rate your experience with {barber.full_name}</Typography>
      <Rating
        name="simple-controlled"
        value={Number(newRating)}
        onChange={(event) => setNewRating(event.target.value)}
      />
    </Box>
    <img width="300px" src={barber.avatar_link}/>
    <p>{barber.address}</p>
      <label> Tell us about your experience: </label>
       
    <textarea
    value={newReview}
    onChange={(event) => setNewReview(event.target.value)}>
    </textarea>
<div></div>
    <button onClick={updateReview}>Submit</button>
  </div>
        
  );

}

export default EditReview;

