import {login, logout} from '../../actions/auth';

it('should create login action object', function() {
  const action = login('123');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: '123',
  });
});

it('should should create logout action object', function() {
  const action = logout();
  expect(action).toEqual({type: 'LOGOUT'});
});
