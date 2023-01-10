import React from 'react';
import ContactListItem from '../ContactListItem/ContactListItem.jsx';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ filter, contacts, deleteContact }) => {
  return (
    <ul className={css.contactList}>
      {contacts
        .filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map(contact => (
          <ContactListItem
            id={contact.id}
            name={contact.name}
            number={contact.number}
            deleteContact={deleteContact}
          />
        ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
