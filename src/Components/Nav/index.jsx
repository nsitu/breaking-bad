import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const links = ['', 'About', 'Documentation', 'Playground'];

const Nav = () => {
  const [pathname, setPathname] = useState('');
  // const [active, setActive] = useState(false);

  useEffect(() => {
    setPathname(window.pathname)
  }, [])

  const map = links.map((e, i) => (
    <Link
      className={`${styles.link} ${pathname === `/${e}` ? styles.location : ''}`}
      key={i}
      to={`/${e.toLowerCase()}`}
    >
      {e ? e : 'Home'}
    </Link>
  ));

  return (
    <nav className={styles.wrapper} role="navigation">
      <div className={styles.container}>{map}</div>
    </nav>
  );
};

export default Nav;
