import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {altFilters, filters} from '../fixtures/filters';
import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(function() {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(
      <ExpenseListFilters
          filters={filters}
          setTextFilter={setTextFilter}
          sortByDate={sortByDate}
          sortByAmount={sortByAmount}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
      />,
  );
});

it('should render ExpenseListFilters correctly', function() {
  expect(wrapper).toMatchSnapshot();
});

it('should render ExpenseListFilters with alt data correctly', function() {
  wrapper.setProps({
    filters: altFilters,
  });
  expect(wrapper).toMatchSnapshot();
});

it('should handle text change', function() {
  const value = 'New text';
  wrapper.find('input').first().simulate('change', {
    target: {value},
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

it('should sort by date', function() {
  wrapper.setProps({
    filters: altFilters,
  });
  const value = 'date';
  wrapper.find('select').simulate('change', {target: {value}});
  expect(sortByDate).toHaveBeenCalled();
});

it('should sort by amount', function() {
  const value = 'amount';
  wrapper.find('select').simulate('change', {target: {value}});
  expect(sortByAmount).toHaveBeenCalled();
});

it('should handle date changes', function() {
  const startDate = moment(0).add(4, 'years');
  const endDate = moment(0).add(8, 'years');
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

it('should handle date focus changes', function() {
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toEqual(calendarFocused);
});
