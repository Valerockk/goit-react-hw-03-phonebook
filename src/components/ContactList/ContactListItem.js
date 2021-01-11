import React from "react";
import styles from "./ContactList.module.css";
import PropTypes from "prop-types";

const ContactListItem = ({ name, number, OnRemove }) => (
  <li className={styles.ContactList_item}>
    <p>
      - {name}: {number}
    </p>
    <button
      type="button"
      onClick={OnRemove}
      className={styles.ContactList_item_btn}
    >
      Delete
    </button>
  </li>
);

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  OnRemove: PropTypes.func.isRequired,
};

export default ContactListItem;
