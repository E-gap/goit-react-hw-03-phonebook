import React from 'react';
import ContactForm from './ContactForm/ContactForm.jsx';
import ContactList from './ContactList/ContactList.jsx';
import Filter from './Filter/Filter.jsx';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const list = localStorage.getItem('contacts');
    const parseList = JSON.parse(list);

    if (parseList) {
      this.setState({ contacts: parseList });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handlerChangeFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  deleteContact = event => {
    const deleteContactId = event.currentTarget.getAttribute('contact');

    const newContacts = this.state.contacts.filter(
      contact => contact.id !== deleteContactId
    );

    this.setState({
      contacts: [...newContacts],
    });
  };

  formHandlerSubmit = data => {
    const contact = {
      id: data.name.toLowerCase(),
      name: data.name,
      number: data.number,
    };
    this.setState(prevState => {
      return { contacts: [contact, ...prevState.contacts] };
    });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
          paddingLeft: '50px',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.formHandlerSubmit}
          contacts={this.state.contacts}
        />

        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onChange={this.handlerChangeFilter}
        />
        <ContactList
          filter={this.state.filter}
          contacts={this.state.contacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
