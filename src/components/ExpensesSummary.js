import React from 'react';
import {connect} from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';

export const ExpensesSummary = ({total, count}) => (
    <p>
      Viewing {count} {count === 1 ? 'expense' : 'expenses'} totalling {numeral(
        total / 100).format('$0,0.00')}
    </p>
);

const mapStateToProps = (state) => {

  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return ({
    count: visibleExpenses.length,
    total: selectExpensesTotal(visibleExpenses),
  });
};

export default connect(mapStateToProps)(ExpensesSummary);

