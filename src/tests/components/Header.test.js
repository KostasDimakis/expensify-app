import React from 'react';
import {shallow} from 'enzyme';
import {Header} from '../../components/Header';

test('should render Header correctly', () => {
  const wrapper = shallow(<Header startLogout={f => f}/>);
  expect(wrapper).toMatchSnapshot();
});

it('should call startLogout on button click', function() {
  const startLogout = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogout}/>);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
}); 
