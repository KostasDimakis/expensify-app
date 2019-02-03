import expenses from '../fixtures/expenses';
import selectExpensesTotal from '../../selectors/expenses-total';

it('should return 0 if no expenses', function() {
  const total = selectExpensesTotal([]);
  expect(total).toBe(0);
});

it('should correctly add up a single expense', function() {
  const total = selectExpensesTotal([expenses[1]]);
  expect(total).toBe(expenses[1].amount);
});

it('should correctly add up multiple expenses', function() {
  const total = selectExpensesTotal(expenses);
  expect(total).toBe(
      expenses[0].amount + expenses[1].amount + expenses[2].amount,
  );
}); 
