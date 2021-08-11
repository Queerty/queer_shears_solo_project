import { combineReducers } from "redux";

const userFavorites = (state = {},
    
  action
) => {
  switch (action.type) {
    case "SET_USER_FAVORITES":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  userFavorites,
});
