import React from 'react';
import styles from './FilterForm.module.css';

export default function FilterForm({ filterValue, onSearchQuery }) {
  return (
    <label className={styles.search}>
      <input value={filterValue} onChange={onSearchQuery} />
    </label>
  );
}
