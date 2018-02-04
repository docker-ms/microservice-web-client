import { connect } from 'react-redux';

import { HTTP_AUTH } from '../actions/HttpActions';
import { GATHER_USER_CREDENTIAL } from '../actions/PureClientActions';

import SignInForm from '../components/SignInForm';

const mapStateToProps = (state, ownProps) => {
  return {
    signInForm: state.signInForm
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCompnoentWillMount: () => {
      dispatch(HTTP_AUTH());
    },
    onUserInput: (parentPath, k, v) => {
      dispatch(GATHER_USER_CREDENTIAL(parentPath, k, v));
    },
    doSignIn: (userCredential) => {
      dispatch(HTTP_AUTH(userCredential));
    }
  };
};

const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignInForm);

export default SignIn;


