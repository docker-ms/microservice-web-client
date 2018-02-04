import { channel } from 'redux-saga';
import { call, put, take, takeLatest, takeEvery } from 'redux-saga/effects';

import { WS_CONNECT, WS_SEND_MESSAGE, WS_RECEIVED_MESSAGE } from '../actions/WebSocketActions';

import connectToWS from '../api/factory/socket/WS';

let wsConn;

function* doWSInitialization(action) {
  wsConn = connectToWS();

  const ch = channel();
  
  wsConn.onmessage = (event) => {
    ch.put({type: WS_RECEIVED_MESSAGE.name, message: JSON.parse(event.data)});
  };

  while (true) {
    const action = yield take(ch);
    yield put(action);
  }
}

function* doMessageSending(action) {
  wsConn.send(JSON.stringify(action.message));
}

function* initWSConn() {
  yield takeLatest(WS_CONNECT.name, doWSInitialization);
}

function* sendMessage() {
  yield takeEvery(WS_SEND_MESSAGE.name, doMessageSending);
}

export {
  initWSConn,
  sendMessage
};

