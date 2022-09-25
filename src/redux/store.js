import { configureStore } from '@reduxjs/toolkit';
import phonebookReducer from './phonebook';

export const store = configureStore({
  reducer: {
    phonebook: phonebookReducer,
  },
});
