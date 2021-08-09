import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* reviewsSaga() {
  yield takeEvery("FETCH_REVIEWS", fetchAllReviews);
  yield takeEvery("POST_REVIEW", addReview);
  yield takeEvery("GET_BARBER_REVIEWS", fetchBarberReviews);
  yield takeEvery("DELETE_REVIEW", deleteReview);
  yield takeEvery("EDIT_REVIEW", editReview);
  yield takeEvery("FETCH_BARBER_RATING", averageRating);
  yield takeEvery("FETCH_USER_REVIEWS", userReviews);
//   yield takeEvery("DELETE_BARBER", deleteBarber);
}

function* fetchAllReviews() {
    try {
      const reviews = yield axios.get("/api/reviews");
      console.log("get all reviews:", reviews.data);
      yield put({ type: "SET_REVIEWS", payload: reviews.data });
    } catch {
      console.log("get all reviews error");
    }
  }
  
  function* fetchBarberReviews(action){
    const barberReviewsResponse = yield axios.get(`/api/reviews/${action.payload}`);
    yield put ({type : 'SET_BARBER_REVIEWS', payload: barberReviewsResponse.data});
  }

  function* addReview(action) {
    yield axios.post("/api/barber", action.payload);
    yield put({ type: "FETCH_REVIEWS" });
  }

  function* deleteReview(action) {
    try {
      console.log("here is the problem: action.payload", action.payload)
      yield axios.delete(`/api/reviews/${action.payload}`);
      yield put({ type: "FETCH_REVIEWS" });
    } catch {
      console.log("Error when deleting review");
    }
  }

    function* editReview(action) {
      try {
        yield axios.put('api/reviews', action.payload)
      } catch (error) {
        console.log('Error editing review');
      }
    }

    function* averageRating(action) {
      console.log("HERE IS MY PROBLEM******", action);
        const rating= yield axios.get(`api/reviews/rating/${action.payload.barberId}`)
        yield put ({type : 'SET_BARBER_RATING', payload: rating.data});
        // yield put ({type: 'FETCH_BARBER_RATING', payload: action.payload.barberId });
    }

    function* userReviews(action) {
      const userReviews= yield axios.get(`api/reviews/users/${action.payload}`)
      yield put ({ type: 'SET_USER_REVIEWS', payload: userReviews.data });
    }
  
  export default reviewsSaga;