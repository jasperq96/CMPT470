import { User } from 'db/models/userModel';

const isAuthenticated = (isAuthenticated: boolean, message: string) => {
  return { isAuthenticated: isAuthenticated, message: message };
};

const returnLoginAuthenticationStatus = (isAuthenticated: boolean, user: User, message: string) => {
  return { isAuthenticated: isAuthenticated, user: user, message: message };
};

const returnAuthenticationStatus = (isAuthenticated: boolean, user: any, message: string) => {
  return { isAuthenticated: isAuthenticated, user: user, message: message };
};

const userDoesExist = () => {
  return { error: 'This username is already being used' };
};

const authUserNotFound = isAuthenticated(false, 'User not found');
const authInvalidCredentials = isAuthenticated(false, 'Entered incorrect username or password');
const authServerError = isAuthenticated(false, 'Server error from login');

export { authUserNotFound, authInvalidCredentials, authServerError, returnLoginAuthenticationStatus, returnAuthenticationStatus, userDoesExist };
