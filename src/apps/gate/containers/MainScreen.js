import { connect } from 'react-redux';

import { HTTP_LSYNC } from '../actions/HttpActions';
import { WS_SEND_MESSAGE } from '../actions/WebSocketActions';

import MainScreen from '../components/MainScreen';

const mapStateToProps = (state, ownProps) => {
  return {
    mainScreen: state.mainScreen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCompnoentWillMount: () => {
      dispatch(HTTP_LSYNC());
    },
    onMessageSendingBoxEnter: (message) => {
      dispatch(WS_SEND_MESSAGE(message));
    }
  };
};

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(MainScreen);

export default HomeScreen;


