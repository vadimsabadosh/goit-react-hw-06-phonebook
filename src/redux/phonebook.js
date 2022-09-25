import { createAction, createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const addContact = createAction('phonebook/addContact');
export const deleteContact = createAction('phonebook/deleteContact');
export const setFilter = createAction('phonebook/setFilter');

const initialState = {
  contacts: {
    items: JSON.parse(localStorage.getItem('phonebook') || '[]'),
    filter: '',
  },
};

const phonebookReducer = createReducer(initialState, {
  [addContact]: (state, action) => {
    const newContact = {
      name: action.payload.name,
      id: uuidv4(),
      number: action.payload.number,
    };
    return {
      ...state,
      contacts: {
        ...state.contacts,
        items: [newContact, ...state.contacts.items],
      },
    };
  },
  [deleteContact]: (state, action) => {
    return {
      ...state,
      contacts: {
        ...state.contacts,
        items: state.contacts.items.filter(item => item.id !== action.payload),
      },
    };
  },
  [setFilter]: (state, action) => {
    return {
      ...state,
      contacts: {
        ...state.contacts,
        filter: action.payload,
      },
    };
  },
});

export default phonebookReducer;
