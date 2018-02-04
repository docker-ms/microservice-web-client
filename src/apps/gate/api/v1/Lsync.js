import doHttpReq from '../factory/http/Oboe';

export default class Lsync {

  static lsync(lsyncReq) {
    return doHttpReq({
      url: '/api/v1/lsync/Lsync',
      body: lsyncReq,
      method: 'POST'
    });
  }

}


