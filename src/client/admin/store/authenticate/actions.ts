import { LOG_IN, LOG_OUT } from '../../../resources/strings/actions';
import { Authenticate, AuthenticateActionTypes } from './types';

export function login(accessToken: string): AuthenticateActionTypes {
  localStorage.setItem('admin:accessToken', accessToken);
  // TODO get user info
  const user: Authenticate = {
    user: {
      email: "asdas@asd.com",
      name: "Burak Eren",
      surname: "Karasu"
    }
  };
  return {
    type: LOG_IN,
    payload: user
  }
}

export function logout(): AuthenticateActionTypes {
  // TODO expire the token
  localStorage.removeItem('admin:accessToken');
  return {
    type: LOG_OUT
  }
}