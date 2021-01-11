import React, { Component } from "react";
import uuid from "react-uuid";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermion Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");

    if (persistedContacts) {
      this.setState({ contacts: JSON.parse(persistedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  findContact = (contacts, contact) =>
    contacts.find(
      (item) => item.name.toLowerCase() === contact.name.toLowerCase()
    );

  addContact = (name, number) => {
    const contact = {
      id: uuid(),
      name,
      number,
    };

    const contactFind = this.findContact(this.state.contacts, contact);

    this.setState(() => {
      if (contact.name) {
        contactFind
          ? alert(`${contactFind.name} is already in contacts`)
          : this.setState((prevState) => ({
              contacts: [...prevState.contacts, contact],
            }));
      } else {
        alert("Input name please!");
      }

      // contacts: [...prevState.contacts, contact],
    });
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContact = this.getVisibleContact();

    return (
      <div>
        <h1>PhoneBook</h1>
        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}
        {visibleContact.length > 0 && (
          <ContactList
            contacts={visibleContact}
            onRemoveContact={this.removeContact}
          />
        )}
      </div>
    );
  }
}
