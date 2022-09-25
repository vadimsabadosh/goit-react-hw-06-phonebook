import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('phonebook') || '[]')
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(contacts));
  }, [contacts]);

  function onFilterInput(e) {
    setFilter(e.target.value);
  }

  function onDelete(id) {
    setContacts(prevState => prevState.filter(item => item.id !== id));
  }

  function onAddContact(name, number) {
    const isExists = contacts.find(item => item.name.includes(name));
    if (!isExists) {
      const newContact = {
        name,
        id: uuidv4(),
        number,
      };
      setContacts(prevState => [...prevState, newContact]);
    } else {
      alert(`${name} is already in contacts`);
    }
  }

  function filterContacts() {
    return contacts.filter(item => item.name.toLowerCase().includes(filter));
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={onFilterInput} />
      <ContactList contacts={filterContacts()} deleteItem={onDelete} />
    </div>
  );
}
