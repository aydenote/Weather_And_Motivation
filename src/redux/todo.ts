import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todoType, todosState, toggleType } from '../../type';

const initialState: todosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<todoType[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<todoType>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<toggleType>) => {
      const { id, completeDate, weather } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        todo.completeDate = completeDate;
        todo.weather = weather;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
  },
});

export const { setTodos, addTodo, toggleTodo, deleteTodo } = todosSlice.actions;

export default configureStore({
  reducer: todosSlice.reducer,
  middleware: [logger],
});
