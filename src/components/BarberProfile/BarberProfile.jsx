import { Box, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function BarberProfile() {

    const barber = useSelector(store => store.barbers.barberProfile);
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const barberReview = useSelector(store => store.reviews.barberReviews);
    const user = useSelector((store) => store.user);


    //Fetch barber data on page load
    useEffect(() => {
        dispatch({
            type: "GET_BARBER_PROFILE",
            payload: {
                barberId: params.id
            }
        })
    }, [params.id]);
console.log(barberReview,"@@@@@@()*#@)(&%)(#!&%)(!&()@#*)(*#@()_*#@(_%BARBER REVIEW");
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
        payload: {response}
    })

    history.push(`/reviews/${response.id}`)
  }

  const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete your review?")) {
            console.log("This is the id from the delete click:", id)
          dispatch({
              type: "DELETE_REVIEW",
              payload: id
          })
          dispatch({ type: 'GET_BARBER_PROFILE', payload:{barberId: params.id}
        })
          

        } else {
          
        }

      }
  
    return(
        <>
        <button onClick={() => history.push('/barber')}>Back to List</button>
        <h1>{barber.id}</h1>
        <h2>{barber.full_name}</h2>
        <p> {barber.pronouns}</p>
        <p> {barber.phone}</p>
        <p> {barber.website}</p>
        <p> {barber.facebook}</p>
        <p> {barber.instagram}</p>
        <p> {barber.address}</p>
        <img width="400px" src={barber.avatar_link}/>
        
        <h2>Reviews for {barber.full_name}</h2>        
        <button type="button" onClick={handleNext} >+ Review</button>

        <ul>
{barberReview && barberReview.map((response) => (
    <li key={response.id}>
        review: {response.review} 
      
        <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rating for {barber.full_name}</Typography>
        <Rating
          name="simple-controlled"
          value={response.rating}
        />
      </Box>
      {user.id==response.user_id && 
      <>
      <button onClick={() => handleEdit(response)}>edit</button>
      <button onClick={() => handleDelete(response.id)}>delete</button>
      </>}
    </li>
))}
</ul>

        </>
    )
}

export default BarberProfile;