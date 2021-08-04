//used to store items from the server
import { combineReducers } from 'redux';

const barbers = (state = [], action) => {
  switch (action.type) {
    case "SET_BARBERS":
      return action.payload;
    default:
      return state;
  }
};

const newBarber = (
  state = {
    fullName: "",
    pronouns: "",
    specialties: "",
    phoneNumber: "",
    website: "",
    facebook: "",
    instagram: "",
    address: "",
    avatar_link: "",
    role: ""
  },
  action
) => {
  switch (action.type) {
    case "ADD_BARBER":
      return action.payload;
    default:
      return state;
  }
};

const barberProfile = (state = {}, action) => {
  switch (action.type) {
    case 'SET_BARBER_PROFILE':
      return action.payload
    default:
      return state;
  }
}

export default combineReducers({
  barbers,
  newBarber,
  barberProfile
});