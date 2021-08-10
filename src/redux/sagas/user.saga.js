import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser)
  yield takeEvery('EDIT_PROFILE', editUser);
}
// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* editUser(action) {
  try{
    console.log(action.payload, "THIS IS ACTION DOT PAYLOAD");
    yield axios.put('/api/user', action.payload)
    console.log('in edit user saga');
    yield put({ type: 'FETCH_USER'});
  } catch (error) {
    console.log('error updating user profile at edit user saga', error);
  }
}



export default userSaga;
