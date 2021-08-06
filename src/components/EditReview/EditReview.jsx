
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

function EditReview() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const review = useSelector(store => store.reviews.editReview);
  const barber = useSelector(store => store.barbers.barberProfile);

  // get edit movie object on page load:
  useEffect(() => {
    
      dispatch({
        type: 'GET_BARBER_REVIEW',
        payload: { reviewId: params.id }
      });
    
  }, [params.id]);

const saveUpdate = () => {
    console.log("****************EDIT REVIEW",review);
    dispatch({
        type: 'EDIT_REVIEW',
        payload: review
    })
   
    // history.push('/home')
}
 

  const updateReview = () => {
    dispatch({
      type: 'UPDATE_EDIT_REVIEW',
      payload: review
    });
  }

  return (
    <div>
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Typography component="legend">Rate your experience with {barber.full_name}</Typography>
      <Rating
        name="simple-controlled"
        value={review.rating}
        onChange={(event) => updateReview({ rating: event.target.value})
        }
      />
    </Box>
    <img width="300px" src={barber.avatar_link}/>
    <p>{barber.address}</p>
      <label> Tell us about your experience: </label>
       
    <textarea
    value={review.review}
    onChange={(evt) => updateReview({review: (evt.target.value)})}></textarea>
<div></div>
    <button onClick={saveUpdate}>Submit</button>
  </div>
        
  );

}



export default EditReview;
