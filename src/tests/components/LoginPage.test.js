import {LoginPage} from '../../components/LoginPage';
import React from 'react';
import {shallow} from 'enzyme';

it('should render LoginPage', function() {
  const wrapper = shallow(<LoginPage startLogin={f => f}/>);
  expect(wrapper).toMatchSnapshot();
});

it('should call startLogin on button click', function() {
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogin}/>);
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});
