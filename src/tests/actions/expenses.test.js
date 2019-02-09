import {
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startAddExpense,
  startSetExpenses,
} from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import expenses from '../fixtures/expenses';
import thunk from 'redux-thunk';
import {fs} from '../../firebase/firebase';

// test db with data
beforeEach(async function(done) {
  const querySnapshot = await fs.collection('expenses').get();
  const promises = [];

  // clear expenses from db
  querySnapshot.forEach(doc => {
    promises.push(doc.ref.delete());
  });
  await Promise.all(promises);

  // populate new expenses
  expenses.forEach(({id, ...data}) => {
    promises.push(fs.collection('expenses').add(data));
  });
  await Promise.all(promises);
  done();
});

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
  const action = removeExpense({id: '123abc'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc',
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', {note: 'New note value'});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value',
    },
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2],
  });
});

it('should add expense to database and store', async function(done) {
  const store = createMockStore({});
  const {id, ...expenseData} = expenses[2];
  await store.dispatch(startAddExpense(expenseData));
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData,
    },
  });
  const doc = await fs.collection('expenses').doc(actions[0].expense.id).get();
  expect(doc.data()).toEqual(expenseData);
  done();
});

it('should add expense defaults to database and store', async function(done) {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  };
  await store.dispatch(startAddExpense());
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseDefaults,
    },
  });
  const doc = await fs.collection('expenses').doc(actions[0].expense.id).get();
  expect(doc.data()).toEqual(expenseDefaults);
  done();
});

it('should setup setExpenses action object', function() {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  });
});

it('should set expenses from the database to the store', async function(done) {
  const store = createMockStore({});
  // get data from firestore
  const expensesRef = await fs.collection('expenses').get();
  const serverExpenses = [];
  expensesRef.forEach(doc => serverExpenses.push({
    id: doc.id,
    ...doc.data(),
  }));

  await store.dispatch(startSetExpenses());
  const actions = store.getActions();
  expect(actions[0]).toEqual({
    type: 'SET_EXPENSES',
    expenses: serverExpenses,
  });
  done();
});
