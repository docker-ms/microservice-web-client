import { REDIRECT_TO, LSYNC_DATA_COMING } from '../actions/PureClientActions';
import { WS_SEND_MESSAGE, WS_RECEIVED_MESSAGE } from '../actions/WebSocketActions';

const mainScreen = (state = {
  snapshots: []
}, action) => {
  switch (action.type) {
    case REDIRECT_TO.name:
      return {
        ...state,
        url: action.url
      };
    case LSYNC_DATA_COMING.name:
      switch (action.data.type) {
        case 'SNAPSHOT':
          return {
            ...state,
            snapshots: [...state.snapshots, action.data.body]
          };
        case 'COMPLEMENT':
          return {
            ...state,
            complement: action.data.body
          };
        default:
          return state;
      }
    case WS_SEND_MESSAGE.name:
    case WS_RECEIVED_MESSAGE.name:
      return {
        ...state,
        snapshots: state.snapshots.map((snapshot) => {
          if (snapshot.conversation.conversationId === action.message.toConversationId) {
            return {
              ...snapshot,
              messages: snapshot.messages.concat([action.message])
            };
          } else {
            return snapshot
          }
        })
      };
    default:
      return state;
  }
};

export default mainScreen;


