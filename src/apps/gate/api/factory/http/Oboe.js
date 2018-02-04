import oboe from 'oboe';

import { gatewayHosts, oboeCommonOpts } from '../config';
import util from '../../../../../util/Util';

export default function doHttpReq (reqObj) {
  const gatewayHost = util.pickRandomly(gatewayHosts);
  reqObj.url = gatewayHost + reqObj.url;
  return oboe(Object.assign({}, oboeCommonOpts, reqObj));
};


