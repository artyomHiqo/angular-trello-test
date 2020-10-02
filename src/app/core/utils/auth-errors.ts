import { AuthError, SignInError, SignUpError, TokenError, UserByEmailError } from '../model/error.model';


export function getError(message: string): Error {
  switch (message) {
    case 'No auth token':
      return new AuthError(message);
    case 'invalid token':
      return new TokenError(message);
    case 'Email is already taken':
      return new SignUpError(message);
    case 'Incorrect password':
    case 'Incorrect email':
      return new SignInError();
    case 'User not found':
    case `User doesn't exist`:
      return new UserByEmailError();
    default:
      return new Error(message);
  }
}
