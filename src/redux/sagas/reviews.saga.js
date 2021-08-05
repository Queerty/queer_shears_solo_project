import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* reviewsSaga() {
  yield takeEvery("FETCH_REVIEWS", fetchAllReviews);
  yield takeEvery("POST_REVIEW", addReview);
  yield takeEvery("GET_BARBER_REVIEWS", fetchBarberReviews);
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
    yield axios.post("api/barber", action.payload);
    yield put({ type: "FETCH_REVIEWS" });
  }

  export default reviewsSaga;