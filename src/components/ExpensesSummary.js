import React from 'react';
import {connect} from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = ({total, count}) => (
    <p>
      Viewing {count} {count === 1 ? 'expense' : 'expenses'} totalling {numeral(
        total / 100).format('$0,0.00')}
    </p>
);

const mapStateToProps = (state) => ({
  count: state.expenses.length,
  total: selectExpensesTotal(state.expenses),
});

export default connect(mapStateToProps)(ExpensesSummary);

