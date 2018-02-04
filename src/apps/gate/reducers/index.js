import { combineReducers } from 'redux';

import signIn from './SignIn';
import mainScreen from './MainScreen';

const gateApp = combineReducers({
  signInForm: signIn,
  mainScreen: mainScreen
});

export default gateApp;


