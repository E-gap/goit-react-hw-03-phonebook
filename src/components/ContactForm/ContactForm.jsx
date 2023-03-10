import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import css from './ContactForm.module.css';

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  handlerChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handlerSubmit = event => {
    event.preventDefault();
    const contact = { ...this.state, id: uuidv4() };
    this.props.onSubmit(contact);
    this.reset();
  };

  render() {
    return (
      <form
        className={`${css.contactForm} ${css.block}`}
        onSubmit={this.handlerSubmit}
      >
        <label className={css.block}>
          Name
          <input
            className={css.block}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handlerChange}
          />
        </label>

        <label className={css.block}>
          Number
          <input
            className={css.block}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={this.handlerChange}
          />
        </label>
        <button type="Submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
