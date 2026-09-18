import React from 'react';

import styles from './Hamburger.module.css';

const Hamburger = props => {
  return (
    <div className={styles.wrapper} id={`${props.id}burg`} tabIndex='0' onKeyDown={props.handlePress}>
      <div className={styles.burger} style={{ '--width': '30px' }} />
      <div className={styles.burger} style={{ '--width': '40px' }} />
      <div className={styles.burger} style={{ '--width': '22px' }} />

    </div>
  );
};

export default Hamburger;
