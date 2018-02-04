import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import DropDown from './common/RenderDropDown';

import MobilePhoneCountryCallingCodes from '../../../resources/data/MobilePhoneCountryCallingCodes';

const styles = {
  signInContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -61.8%)',
    minWidth: '288px'
  },
  dropDownContainer: {
    float: 'left',
    width: '20%',
    height: '48px',
    margin: '-5px 0 0 -24px'
  },
  textFieldAfterDropDownContainer: {
    float: 'right',
    width: 'calc(80% - 3px)',
    overflow: 'hidden'
  },
  signInSurroundingsContainer: {
    marginTop: '30px',
    color: 'rgb(0, 188, 212)',
    fontSize: '0.87em',

    leftLinks: {
      margin: '10px 0',
      display: 'inline-block',
      float: 'left'
    },

    rightLinks: {
      margin: '10px 0',
      display: 'inline-block',
      float: 'right'
    }
  }
};

const signInWays = {
  0: 'email',
  1: 'mobilePhone',
  2: 'userSetId'
};

class SignInForm extends React.Component {

  componentWillMount() {
    this.props.onCompnoentWillMount();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.signInForm.url !== nextProps.signInForm.url) {
      this.props.history.push(nextProps.signInForm.url);
    }
  }

  render() {
    return (
      <div style={styles.signInContainer}>
        {
          this.props.signInForm.signInWay === signInWays[0] &&
          <span>
            <TextField id="email" hintText="Email" fullWidth={true}
                       value={this.props.signInForm.email}
                       onChange={(e) => {this.props.onUserInput('', e.target.id, e.target.value);}} />
            <br />
          </span>
        }
        {
          this.props.signInForm.signInWay === signInWays[1] &&
          <span>
            <div style={styles.dropDownContainer}>
              <DropDown menusObj={MobilePhoneCountryCallingCodes}
                        value={this.props.signInForm.mobilePhone.countryCallingCode}
                        onSelect={(event, index, value) => {this.props.onUserInput('mobilePhone', 'countryCallingCode', value)}} />
            </div>
            <div style={styles.textFieldAfterDropDownContainer}>
              <TextField id="number" hintText="Mobile phone number" underlineStyle={{bottom: '5px'}} fullWidth={true}
                         value={this.props.signInForm.mobilePhone.number}
                         onChange={(e) => {this.props.onUserInput('mobilePhone', e.target.id, e.target.value);}}/>
            </div>
          </span>
        }
        {
          this.props.signInForm.signInWay === signInWays[2] &&
          <span>
            <TextField id="userSetId" hintText="Username" fullWidth={true}
                       value={this.props.signInForm.userSetId}
                       onChange={(e) => {this.props.onUserInput('', e.target.id, e.target.value);}} />
            <br />
          </span>
        }

        <TextField id="pwd" hintText="Password" type="password" fullWidth={true}
                   value={this.props.signInForm.pwd}
                   onChange={(e) => {this.props.onUserInput('', e.target.id, e.target.value);}} />

        <div style={styles.signInSurroundingsContainer}>
          {
            this.props.signInForm.signInWay === signInWays[0] &&
              <span>
                <span style={styles.signInSurroundingsContainer.leftLinks}>
                  <a onClick={() => this.props.onUserInput('', 'signInWay', signInWays[2])}>Use username</a>
                </span>
                <span style={styles.signInSurroundingsContainer.rightLinks}>
                  <a onClick={() => this.props.onUserInput('', 'signInWay', signInWays[1])}>Use mobile number</a>
                </span>
              </span>
          }
          {
            this.props.signInForm.signInWay === signInWays[1] &&
              <span>
                <span style={styles.signInSurroundingsContainer.leftLinks}>
                  <a onClick={() => this.props.onUserInput('', 'signInWay', signInWays[2])}>Use username</a>
                </span>
                <span style={styles.signInSurroundingsContainer.rightLinks}>
                  <a onClick={() => this.props.onUserInput('', 'signInWay', signInWays[0])}>Use email</a>
                </span>
              </span>
          }
          {
            this.props.signInForm.signInWay === signInWays[2] &&
              <span>
                <span style={styles.signInSurroundingsContainer.leftLinks}>
                  <a onClick={() => this.props.onUserInput('', 'signInWay', signInWays[0])}>Use email</a>
                </span>
                <span style={styles.signInSurroundingsContainer.rightLinks}>
                  <a onClick={() => this.props.onUserInput('', 'signInWay', signInWays[1])}>Use mobile number</a>
                </span>
              </span>
          }
          <RaisedButton label="Sign In" primary={true} fullWidth={true}
                        onTouchTap={() => this.props.doSignIn(this.props.signInForm)} />
          <span style={styles.signInSurroundingsContainer.rightLinks}><a>Forgot password?</a></span>
        </div>
      </div>
    );
  }

}

SignInForm.propTypes = {
  signInForm: PropTypes.shape({
    signInWay: PropTypes.oneOf(Object.values(signInWays)),
    email: PropTypes.string,
    userSetId: PropTypes.string,
    mobilePhone: PropTypes.shape({
      countryCallingCode: PropTypes.string.isRequired,
      number: PropTypes.string
    }),
    pwd: PropTypes.string
  }),

  onUserInput: PropTypes.func.isRequired,
  doSignIn: PropTypes.func.isRequired
};

export default SignInForm;


