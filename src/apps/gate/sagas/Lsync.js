import { channel } from 'redux-saga';
import { call, put, take, takeLatest } from 'redux-saga/effects';

import * as Cookies from 'js-cookie';

import { COOKIE_KEYS } from '../constants/AppConstants';

import { HTTP_LSYNC, HTTP_AUTH } from '../actions/HttpActions';
import { LSYNC_DATA_COMING } from '../actions/PureClientActions';
import { WS_CONNECT } from '../actions/WebSocketActions';

import LsyncV1 from '../api/v1/Lsync';

function* doLsync(action) {

  yield put({type: WS_CONNECT.name});

  const res = yield call(LsyncV1.lsync, {
    version: Cookies.get(COOKIE_KEYS.syncVersion),
    bucketId: Cookies.get(COOKIE_KEYS.syncBucketId)
  });

  const ch = channel()
  
  res.fail((err) => {
    console.log(err)
    if (err.statusCode === 401) {
      ch.put({type: HTTP_AUTH.name});
    }
  });

  res.node('!', (item, path) => {
    ch.put({
      type: LSYNC_DATA_COMING.name,
      data: {
        type: item.lsyncDataPackType,
        body: item[item.lsyncDataPackType.toLowerCase()]
      }
    });
  });

  while (true) {
    const action = yield take(ch);
    yield put(action);
  }

}

function* lsync() {
  yield takeLatest(HTTP_LSYNC.name, doLsync);
}

export {
  lsync
};


