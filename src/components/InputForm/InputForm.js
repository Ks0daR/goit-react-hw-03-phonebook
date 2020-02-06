import React, { Component } from 'react';
import styles from './InputForm.module.css';

export default class InputForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onAddContacts(name, number);

    this.setState({ name: '', number: '' });
  };

  handleChangeData = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label>
          <h3>Name:</h3>
          <input
            value={name}
            placeholder="Enter name..."
            name="name"
            onChange={this.handleChangeData}
          />
          <h3>Phone number: </h3>
          <input
            value={number}
            name="number"
            onChange={this.handleChangeData}
            placeholder="Enter phone..."
          />
          <br />
          <button className={styles.submit} type="submit">
            Add contact
          </button>
          <br />
        </label>
      </form>
    );
  }
}
