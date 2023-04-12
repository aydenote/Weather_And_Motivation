import { configureStore, createSlice } from '@reduxjs/toolkit';
import { todoState } from '../../type';

const initialState: todoState = {
  completeDate: 0,
  text: '',
  state: '',
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    SET(state) {},
    ADD(state) {},
    UPDATE(state) {},
    DELELTE(state) {},
  },
});

export const { SET, ADD, UPDATE, DELELTE } = todoSlice.actions;

export default configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});
