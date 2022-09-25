import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, setFilter } from 'redux/phonebook';
import ContactForm from './ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter';

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.phonebook.contacts);

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(state.items));
  }, [state.items]);

  function onFilterInput(e) {
    dispatch(setFilter(e.target.value));
  }

  function onDelete(id) {
    dispatch(deleteContact(id));
  }

  function onAddContact(name, number) {
    dispatch(addContact({ name, number }));
  }

  function filterContacts() {
    return state.items.filter(item =>
      item.name.toLowerCase().includes(state.filter)
    );
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} contacts={state.items} />
      <h2>Contacts</h2>
      <Filter value={state.filter} onChange={onFilterInput} />
      <ContactList contacts={filterContacts()} deleteItem={onDelete} />
    </div>
  );
}
