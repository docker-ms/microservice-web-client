import { websocketHosts } from '../config';
import util from '../../../../../util/Util';

export default function connectToWS() {
  return new WebSocket(util.pickRandomly(websocketHosts));
}


