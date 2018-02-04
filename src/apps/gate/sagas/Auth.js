import { channel } from 'redux-saga'; 
import { call, put, take, takeLatest } from 'redux-saga/effects';

// import * as Cookies from 'js-cookie';

import { ALERT_MSGS } from '../constants/AppConstants';
import AuthV1 from '../api/v1/Auth';

import { HTTP_AUTH, HTTP_LSYNC } from '../actions/HttpActions';
import { WS_CONNECT } from '../actions/WebSocketActions';
import { ALERT_USER, REDIRECT_TO, LSYNC_DATA_COMING } from '../actions/PureClientActions';

function* doAuth(action) {

  let userCredential;

  if (action.userCredential) {
    userCredential = {
      pwd: action.userCredential.pwd
    };

    switch (action.userCredential.signInWay) {
      case 'email':
        userCredential.email = action.userCredential.email
        break;
      case 'mobilePhone':
        userCredential.mobilePhone = {
          mobilePhoneNoWithCountryCallingCode: action.userCredential.mobilePhone.countryCallingCode + action.userCredential.mobilePhone.number
        };
        break;
      case 'userSetId':
        userCredential.userSetId = action.userCredential.userSetId
        break;
      default:
        return yield put({type: ALERT_USER.name, msg: ALERT_MSGS.unknownError});
    }
  }

  const res = yield call(AuthV1.auth, userCredential);

  const ch = channel();

  res.fail((err) => {
    console.log(err)
    if (err.statusCode === 500) {
      ch.put({type: REDIRECT_TO.name, url: '/SignIn'});
    }
  });

  res.start((status, headers) => {
    if (status === 200) {
      ch.put({
        type: REDIRECT_TO.name,
        url: '/'
      });
      ch.put({type: WS_CONNECT.name});
    }
  });

  res.done(() => {
    ch.put({type: HTTP_LSYNC.name});
  });

  while (true) {
    const action = yield take(ch);
    yield put(action);
  }

}

function* auth() {
  yield takeLatest(HTTP_AUTH.name, doAuth);
}

export {
  auth
};


