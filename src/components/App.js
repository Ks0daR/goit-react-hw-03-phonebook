import React, { Component } from 'react';
import Layout from './Layout';
import InputForm from './InputForm';
import Contacts from './Contacts';
import FilterForm from './FilterForm';
import createContact from './utils/createContact';
import styles from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [],
    searchQuery: '',
  };

  componentDidMount() {
    const storageItems = JSON.parse(localStorage.getItem('contacts'));
    if (storageItems) {
      this.setState({ contacts: [...storageItems] });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContacts = (name, number) => {
    const checkedName = this.checkedDoubleInput(name);
    if (checkedName) {
      alert(`${name} есть в телефонной книге!`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, createContact(name, number)],
    }));
  };

  checkedDoubleInput = name => {
    return this.state.contacts.find(contact => contact.name === name);
  };

  handleSearchQuery = ({ target: { value } }) => {
    this.setState({ searchQuery: value });
  };

  filteredContacts = () => {
    const { searchQuery, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  removeContacts = contactId => {
    if (this.state.contacts.length === 2) {
      this.setState({ searchQuery: '' });
    }
    this.setState(state => {
      return {
        contacts: state.contacts.filter(contact => contact.id !== contactId),
        // searchQuery: '',
      };
    });
  };

  render() {
    const { contacts, searchQuery } = this.state;
    const visibleContacts = this.filteredContacts();
    return (
      <Layout>
        <h1 className={styles.primary}>Phonebook</h1>
        <InputForm onAddContacts={this.addContacts} contacts={contacts} />

        <h2 className={styles.secondary}>Contacts</h2>
        {contacts.length > 1 && (
          <FilterForm
            onSearchQuery={this.handleSearchQuery}
            filterValue={searchQuery}
          />
        )}
        <Contacts
          elements={searchQuery.length === 0 ? contacts : visibleContacts}
          onRemoveContacts={this.removeContacts}
        />
      </Layout>
    );
  }
}
