import { configureStore } from '@reduxjs/toolkit';
import tasksReducer, { addTask } from '../store/tasks/tasksSlice';

describe('tasksSlice', () => {
  let store = configureStore({ reducer: { tasks: tasksReducer } });

  beforeEach(() => {
    store = configureStore({ reducer: { tasks: tasksReducer } });
  });

  test('should add a task', () => {
    const taskToAdd = { id: '1', description: 'Sample Task' };
    store.dispatch(addTask(taskToAdd));

    const tasks = store.getState().tasks.tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual(taskToAdd);
  });
});
