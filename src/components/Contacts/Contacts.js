import React from 'react';
import styles from './Contacts.module.css';

export default function Contacts({ elements, onRemoveContacts }) {
  return (
    <ul className={styles.list}>
      {elements.map(({ id, name, number }) => (
        <li className={styles.listElement} key={id}>
          {name} {number}
          <button
            type="button"
            className={styles.buttonList}
            onClick={() => onRemoveContacts(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
