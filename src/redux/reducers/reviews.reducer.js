import { combineReducers } from "redux";

const reviews = (state = [], action) => {
    switch (action.type) {
      case "SET_REVIEWS":
        return action.payload;
      default:
        return state;
    }
  };



  const barberReviews = (state = {}, action) => {
    switch (action.type) {
      case 'SET_BARBER_REVIEWS':
        return action.payload
      default:
        return state;
    }
  }

  export default combineReducers({
   reviews,
   barberReviews
  });
