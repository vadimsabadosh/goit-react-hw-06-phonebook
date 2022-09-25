import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ContactForm({ onAddContact, contacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function onChangeName(e) {
    setName(e.target.value);
  }
  function onChangeNumber(e) {
    setNumber(e.target.value);
  }

  function addContact() {
    if (name && number) {
      const isExists = contacts.find(item => item.name === name);
      if (!isExists) {
        onAddContact(name, number);
        setNumber('');
        setName('');
      } else {
        alert(`${name} is already in contacts`);
      }
    }
  }
  return (
    <div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={e => onChangeName(e)}
        />
      </div>

      <div>
        <label htmlFor="number">Number</label>
        <input
          id="number"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={e => onChangeNumber(e)}
        />
      </div>
      <button onClick={addContact}>Add contact</button>
    </div>
  );
}
ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};
