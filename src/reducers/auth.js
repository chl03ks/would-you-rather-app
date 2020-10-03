import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS } from "../actions/auth";

export default function auth(state = {}, action) {
  const { authenticated, loggedInUser } = action;
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        authenticated,
        loggedInUser,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        authenticated,
        loggedInUser,
      };
    default:
      return state;
  }
}
