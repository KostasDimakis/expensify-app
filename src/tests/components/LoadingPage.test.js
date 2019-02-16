import LoadingPage from '../../components/LoadingPage';
import React from 'react';
import {shallow} from 'enzyme';

it('should correctly render LoadingPage', function() {
  const wrapper = shallow(<LoadingPage/>);
  expect(wrapper).toMatchSnapshot();
});
