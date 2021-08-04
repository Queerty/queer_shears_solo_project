import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* barberSaga() {
  yield takeEvery("FETCH_BARBERS", fetchAllBarbers);
  yield takeEvery("POST_BARBER", addBarber);
  yield takeEvery("GET_BARBER_PROFILE", fetchBarberProfile);
//   yield takeEvery("DELETE_BARBER", deleteBarber);
}

function* fetchAllBarbers() {
  try {
    const barbers = yield axios.get("/api/barber");
    console.log("get all barbers:", barbers.data);
    yield put({ type: "SET_BARBERS", payload: barbers.data });
  } catch {
    console.log("get all barbers error");
  }
}

function* fetchBarberProfile(action){
  const barberProfileResponse = yield axios.get(`/api/barber/profile/${action.payload.barberId}`);
  yield put ({type : 'SET_BARBER_PROFILE', payload: barberProfileResponse.data});
}

function* addBarber(action) {
  yield axios.post("api/barber", action.payload);
  yield put({ type: "GET_BARBERS" });
}

// function* deleteBarber(action) {
//   try {
//     yield axios.delete(`/barber/${action.payload}`);
//     yield put({ type: "GET_BARBERS" });
//   } catch {
//     console.log("Error deleting barber");
//   }
// }

export default barberSaga;