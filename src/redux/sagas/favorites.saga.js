import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* favoritesSaga() {
    yield takeEvery("FETCH_FAVORITES", fetchFavorites);
    yield takeEvery("POST_FAVORITE", addFavorite);
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



  export default favoritesSaga;