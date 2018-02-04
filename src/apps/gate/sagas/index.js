import { fork } from 'redux-saga/effects';

import { auth } from './Auth';
import { lsync } from './Lsync';
import { initWSConn, sendMessage } from './WS';

export default function* root() {
  yield [
    fork(auth),
    fork(lsync),
    fork(initWSConn),
    fork(sendMessage)
  ];
};


