import React, { Component } from 'react';

import styles from './Docs.module.css';
import DocsMain from '../Components/Docs/DocsMain';
import navigation from '../data/navigation.json';

class Docs extends Component {

  scrollClick = e => {
    document
      .getElementById(e)
      .scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  render() {
    const navMap = navigation.map((e, i) => {
      return React.createElement(
        e.tag,
        { onClick: () => this.scrollClick(e.id), key: i, id: `${e.id}b` },
        e.name
      );
    });

    return (
      <main className={styles.documentation} role="main">
      <aside className={styles.navbar}>
        {navMap}
        </aside>
        <DocsMain />
      </main>
    );
  }
}

export default Docs;
