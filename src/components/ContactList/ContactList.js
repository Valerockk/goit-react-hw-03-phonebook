import React from "react";
import ContactListItem from "./ContactListItem";
import styles from "./ContactList.module.css";
import PropTypes from "prop-types";

const ContactList = ({ contacts, onRemoveContact }) => (
  <ul className={styles.ContactList}>
    {contacts.map(({ id, name, number }) => (
      <ContactListItem
        key={id}
        name={name}
        number={number}
        OnRemove={() => onRemoveContact(id)}
      />
    ))}
  </ul>
);

ContactList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactList;
