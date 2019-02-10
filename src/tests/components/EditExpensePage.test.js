import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';
import React from 'react';
import {shallow} from 'enzyme';

let startRemoveExpense, history, startEditExpense, wrapper;

beforeEach(function() {
  startRemoveExpense = jest.fn();
  startEditExpense = jest.fn();
  history = {push: jest.fn()};
  wrapper = shallow(
      <EditExpensePage
          expense={expenses[1]}
          history={history}
          startRemoveExpense={startRemoveExpense}
          startEditExpense={startEditExpense}
      />,
  );
});

it('should render the EditExpensePage', function() {
  expect(wrapper).toMatchSnapshot();
});

it('should handle startEditExpense', function() {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(startEditExpense).
      toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

it('should handle startRemoveExpense', function() {
  wrapper.find('button').prop('onClick')({id: expenses[1].id});
  expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[1].id});
  expect(history.push).toHaveBeenLastCalledWith('/');
});
