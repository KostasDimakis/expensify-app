import authReducer from '../../reducers/auth';

it('should set the uid for login', function() {
  const state = authReducer({}, {
    type: 'LOGIN',
    uid: '123',
  });
  expect(state).toEqual({uid: '123'});
});

it('should clear the uid for logout', function() {
  const state = authReducer({}, {
    type: 'LOGOUT',
  });
  expect(state).toEqual({});
});
