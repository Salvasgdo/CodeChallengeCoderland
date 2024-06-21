import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import store from '../store';
import TasksScreen from '../screens/TasksScreen';

describe('TasksScreen', () => {
  it('should render the tasks screen and add a new task', () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <TasksScreen />
      </Provider>
    );

    fireEvent.press(getByTestId('New-Task'));
    fireEvent.changeText(getByTestId('New-Task-Input'), 'New Task Name');
    fireEvent.press(getByTestId('Add'));

    expect(getByText('New Task')).toBeTruthy();
  });

  it('should not add a new task if the description is empty', () => {
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <TasksScreen />
      </Provider>
    );

    fireEvent.press(getByTestId('New-Task'));
    fireEvent.changeText(getByTestId('New-Task-Input'), '');
    fireEvent.press(getByTestId('Add'));

    expect(queryByText('')).toBeNull();
  });
});
