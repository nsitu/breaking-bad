import React, { Component } from 'react';
import Burger from '../Hamburger/Hamburger';
import styles from './Characters.module.css';

class Characters extends Component {
  render() {
    const { person, toggle, homeDisplay } = this.props;

    const occ = person.occupation.join(',');
    const app = person.appearance.join(',');
    const betterCallSaulapp = person.better_call_saul_appearance.join(',');

    return (
      <div className={styles.character} id={`character-${person.char_id}`}>
        <Burger id={person.char_id} handlePress={this.props.handlePress} />
        <img className={styles.charImg} src={person.img} alt={person.name} />
        <div
          className={`${styles.charBtm} ${toggle ? styles.btm2 : ''}`}
          id={`character-info-${person.char_id}`}
        >
          <p className={styles.characterTitle}>{person.name}</p>
          <div className={toggle ? styles.underline : undefined}>
            <img
              className={styles.beeLogo}
              src="https://images-na.ssl-images-amazon.com/images/I/31NhsG8XFpL._SX425_.jpg"
              alt=""
            />
            <p> {person.nickname}</p>
          </div>
          {toggle && (
            <div className={styles.hiddenInfo}>
              <div>
                <p>Id</p>
                <p>{person.char_id}</p>
              </div>
              <div>
                <p>Occupation</p>
                <p className={styles.occMap}>{occ}</p>
              </div>
              {homeDisplay === 'Breaking Bad' && (
                <div>
                  <p>Breaking Bad Seasons</p>
                  {app}
                </div>
              )}
              {homeDisplay === 'Better Call Saul' && (
                <div>
                  <p>Better Call Saul Seasons</p>
                  {betterCallSaulapp}
                </div>
              )}
              <div>
                <p>Status</p>
                <p>{person.status}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Characters;
