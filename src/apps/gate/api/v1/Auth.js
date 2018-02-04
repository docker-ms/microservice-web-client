import doHttpReq from '../factory/http/Oboe';

export default class Auth {

  static auth(userCredential) {
    return doHttpReq({
      url: '/api/v1/auth/Auth',
      body: userCredential,
      method: 'POST'
    });
  }

};


