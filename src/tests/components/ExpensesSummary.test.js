import {ExpensesSummary} from '../../components/ExpensesSummary';
import React from 'react';
import {shallow} from 'enzyme';

it('should render correctly 1 expense', function() {
  const count = 1;
  const total = 86631;

  const wrapper = shallow(<ExpensesSummary count={count} total={total}/>);

  expect(wrapper).toMatchSnapshot();
});

it('should render correctly 2 expenses', function() {
  const count = 2;
  const total = 1000;

  const wrapper = shallow(<ExpensesSummary count={count} total={total}/>);

  expect(wrapper).toMatchSnapshot();
});
