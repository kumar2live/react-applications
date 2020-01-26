import reducer from './authReducer';
import * as ActionTypes from '../actions/actionTypes';

describe('Auth Reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).not.toEqual(null);
  });

  it('should set auth start', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: '/'},
        {type: 'AUTH_START'})).toEqual({
          token: null,
          userId: null,
          error: null,
          loading: true,
          authRedirectPath: '/'});
  });
});