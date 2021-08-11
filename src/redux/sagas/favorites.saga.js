import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* favoritesSaga() {
    yield takeEvery("FETCH_FAVORITES", fetchFavorites);
    yield takeEvery("POST_FAVORITE", addFavorite);
    yield takeEvery("DELETE_FAVORITE", deleteFavorite);
  }

function* fetchFavorites(action) {
    console.log(action.payload, "THIS IS THE ACTION>PAYLOAD FOR FAV**********");
    try {
        const favorites = yield axios.get(`/api/favorites/${action.payload}`);
        yield put({ type: "SET_USER_FAVORITES", payload: favorites.data });
    } catch {
        console.log("get favorites error");
    }
}

function* addFavorite(action) {
        yield axios.post(`/api/favorites`, action.payload);
        yield put({ type: "FETCH_FAVORITES"});
    }

    function* deleteFavorite(action) {
        try {
          console.log("here is the problem: action.payload", action.payload)
          yield axios.delete(`/api/favorites/${action.payload}`);
          yield put({ type: "FETCH_FAVORITES" });
        } catch {
          console.log("Error when deleting favorite");
        }
      }


  export default favoritesSaga;