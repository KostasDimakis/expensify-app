import React from 'react';
import {connect} from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import {Link} from 'react-router-dom';

export const ExpensesSummary = ({total, count}) => (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{count}</span> {count === 1
            ? 'expense'
            : 'expenses'} totalling <span>{numeral(total / 100).
            format('$0,0.00')}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
);

const mapStateToProps = (state) => {

  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return ({
    count: visibleExpenses.length,
    total: selectExpensesTotal(visibleExpenses),
  });
};

export default connect(mapStateToProps)(ExpensesSummary);

