import { GATHER_USER_CREDENTIAL, REDIRECT_TO } from '../actions/PureClientActions';

const signIn = (state = {
  signInWay: 'email',
  email: 'leonard.shi+0000000@vcube.co.jp',
  userSetId: '',
  mobilePhone: {
    countryCallingCode: '+65',
    number: ''
  },
  pwd: 'HJXnR8Ajg'
}, action) => {
  switch (action.type) {
    case GATHER_USER_CREDENTIAL.name:
      switch (action.parentPath) {
        case 'mobilePhone':
          return {
            ...state,
            mobilePhone: {
              ...state.mobilePhone,
              [action.k]: action.v
            }
          };
        default:
          return {
            ...state,
            [action.k]: action.v
          };
      }
    case REDIRECT_TO.name:
      return {
        ...state,
        url: action.url
      };
    default:
      return state;
  }
};

export default signIn;


