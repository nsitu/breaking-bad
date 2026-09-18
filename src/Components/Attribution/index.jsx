import React from 'react';
import styles from './Attribution.module.css';

const Attribution = () => (
  <header className={styles.banner} role="banner">
    <p>
      This API was adapted by{' '}
      <a href="https://nsitu.ca" target="_blank" rel="noreferrer">Harold Sikkema</a>{' '}
      from work by{' '}
      <a href="https://github.com/timbiles/Breaking-Bad--API" target="_blank" rel="noreferrer">Tim Biles</a>{' '}
      with data via{' '}
      <a href="https://github.com/chewhx/breaking-bad/tree/main/_data/dump" target="_blank" rel="noreferrer">Chew Han Xiang</a>.
    </p>
  </header>
);

export default Attribution;
