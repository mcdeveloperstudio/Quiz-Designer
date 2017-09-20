import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from '../actions/user';
import { checkAuth } from '../utils/auth';


const initState = {
  isLoggedIn: checkAuth(),
};

export default function (state = initState, action) {
  switch (action.type) {
  case LOGIN_USER:
    return { ...state, isLoggedIn: action.isLoggedIn };
  case LOGOUT_USER:
    return { ...state, isLoggedIn: action.isLoggedIn };
  case REGISTER_USER:
    return { ...state };
  default:
    return state;
  }
}
