import {AddExpensePage} from '../../components/AddExpensePage';
import React from 'react';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;

beforeEach(function() {
  startAddExpense = jest.fn();
  history = {
    push: jest.fn(),
  };
  wrapper = shallow(
      <AddExpensePage
          startAddExpense={startAddExpense}
          history={history}
      />,
  );
});

it('should render AddExpensePage correctly', function() {
  expect(wrapper).toMatchSnapshot();
});

it('should handle onSubmit', function() {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});
