import {fs} from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0,
    } = expenseData;

    const expense = {description, note, amount, createdAt};
    return fs.collection('users').
        doc(getState().auth.uid).
        collection('expenses').
        add(expense).
        then(docRef => {
      dispatch(addExpense({
        id: docRef.id,
        ...expense,
      }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
});

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses,
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    return fs.collection('users').
        doc(getState().auth.uid).
        collection('expenses').
        get().
        then(expensesRef => {
      const expenses = [];
      expensesRef.forEach(doc => {
        expenses.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      dispatch(setExpenses(expenses));
    });
  };
};

export const startRemoveExpense = ({id}) => {
  return (dispatch, getState) => {
    return fs.collection('users').
        doc(getState().auth.uid).
        collection('expenses').
        doc(id).
        delete().
        then(() => {
      dispatch(removeExpense({id}));
    });
  };
};

export const startEditExpense = (id, updates) => (dispatch, getState) => {
  return fs.collection('users').
      doc(getState().auth.uid).
      collection('expenses').
      doc(id).
      update(updates).
      then(() => {
    dispatch(editExpense(id, updates));
  });
};
