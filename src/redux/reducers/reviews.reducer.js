import { combineReducers } from "redux";

const reviews = (state = [], action) => {
    switch (action.type) {
      case "SET_REVIEWS":
        return action.payload;
      default:
        return state;
    }
  };



  const barberReviews = (state = [], action) => {
    switch (action.type) {
      case 'SET_BARBER_REVIEWS':
        return action.payload
      default:
        return state;
    }
  }

  const currentReview = (state = [], action) => {
    switch (action.type) {
      case 'SET_CURRENT_REVIEW':
        return action.payload
      default:
        return state;
    }
  }

  const barberRating = (state = {}, action) => {
    switch (action.type) {
      case 'SET_BARBER_RATING':
        return action.payload
      default:
        return state;
    }
  }
  const userReviews = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_REVIEWS':
        return action.payload
      default:
        return state;
    }
  }
  export default combineReducers({
   reviews,
   barberReviews,
   currentReview,
   barberRating,
   userReviews

  });
