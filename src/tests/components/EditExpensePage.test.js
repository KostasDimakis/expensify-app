import {EditExpensePage} from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';
import React from 'react';
import {shallow} from 'enzyme';

let removeExpense, history, editExpense, wrapper;

beforeEach(function() {
  removeExpense = jest.fn();
  editExpense = jest.fn();
  history = {push: jest.fn()};
  wrapper = shallow(
      <EditExpensePage
          expense={expenses[1]}
          history={history}
          removeExpense={removeExpense}
          editExpense={editExpense}
      />,
  );
});

it('should render the EditExpensePage', function() {
  expect(wrapper).toMatchSnapshot();
});

it('should handle editExpense', function() {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

it('should handle removeExpense', function() {
  wrapper.find('button').prop('onClick')({id: expenses[1].id});
  expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[1].id});
  expect(history.push).toHaveBeenLastCalledWith('/');
});
