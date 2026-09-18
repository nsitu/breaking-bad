import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Characters from '../Components/Characters/Characters';
import styles from '../Components/Home/Home.module.css';
import betterCallSaulLogo from '../assets/icons/button.jpg';
import breakingBadLogo from '../assets/icons/breaking_bad.jpg';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [display, setDisplay] = useState('Breaking Bad');
  // Change this name Plz
  const [rd, setRd] = useState({});
  const [toggle, setToggle] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    getRandom();
  }, [display]);

  const getRandom = async () => {
    const getCharacters = await fetch(`/api/home-page-characters?limit=12&category=${display}`);
    const response = await getCharacters.json();
    await setCharacters(response);
  };

  const randomDeath = async () => {
    const getDeath = await fetch('/api/random-death');
    const response = await getDeath.json();
    setRd(response);
  };

  const navigation = e => {
    const { id } = e.target;
    if (id.includes('burg')) {
      setId(+id.replace(/\D/g, ''));
      setToggle(!toggle);
    } else {
      setToggle(false);
    }
  };

  const handlePress = async e => {
    if (e.key === 'Enter') {
      await setId(e.target.id);
      await setToggle(!toggle);
    }
  };

  const charMap = characters.map(e => (
    <Characters
      toggle={id === e.char_id && toggle}
      key={e.char_id}
      person={e}
      handlePress={handlePress}
      homeDisplay={display}
    />
  ));

  const death = (
    <article className={styles.deathInfo}>
      <div className={styles.deathVisual}>
        <h2>{rd.death}</h2>
        {(() => {
          const image = rd.character?.img || rd.character?.image_url || rd.img;
          return image ? (
            <>
              <img
                src={image}
                alt={rd.character?.name || rd.death}
                onError={(event) => {
                  event.currentTarget.hidden = true;
                  event.currentTarget.nextElementSibling.hidden = false;
                }}
              />
              <div className={styles.deathImagePlaceholder} hidden aria-label={`No image available for ${rd.death}`}>
                {rd.death?.charAt(0) || '?'}
              </div>
            </>
          ) : (
            <div className={styles.deathImagePlaceholder} aria-label={`No image available for ${rd.death}`}>
              {rd.death?.charAt(0) || '?'}
            </div>
          );
        })()}
      </div>
      <div className={styles.deathDetails}>
        <h4>Cause of death:</h4>
        <p>{rd.cause}</p>
        <h4>Responsible:</h4>
        <p>{rd.responsible}</p>
        <h4>Last words:</h4>
        <p>"{rd.last_words}"</p>
      </div>
    </article>
  );

  return (
    <main className={styles.home} onClick={navigation} role="main">
      <div className={styles.container}>
        <h1 className={styles.homeHeader}>The Breaking Bad A<mark>P</mark>I</h1>
        <p className={styles.subText}>...Tread Lightly</p>
      </div>
      <>
        <p className={styles.styledText}>Now with Better Call Saul Data!</p>
        <p className={styles.styledSmallText}>
          Check out the{' '}
          <Link className={styles.link} to="/documentation">documentation</Link>.
        </p>
        <p className={styles.styledSmallText}>
          <span>New!</span>{' '}
          Try out the information playground{' '}
          <Link className={styles.link} to="/playground">here</Link>!
        </p>
      </>
      <section className={styles.iconContainer}>
        <img className={`${styles.icon} ${display === 'Breaking Bad' ? styles.primaryIcon : ''}`}
          height="40px"
          width="40px"
          onClick={() => setDisplay('Breaking Bad')}
          style={{ height: '40px', width: '40px' }}
          src={breakingBadLogo}
          alt="Breaking Bad Icon"
        />
        <img className={`${styles.icon} ${display === 'Better Call Saul' ? styles.primaryIcon : ''}`}
          height="50px"
          width="50px"
          onClick={() => setDisplay('Better Call Saul')}
          src={betterCallSaulLogo}
          alt="Better Call Saul Icon"
        />
      </section>

      <div className={styles.characterMap}>{charMap}</div>
      <div className="test_api">
        <div className="death_map">
          <div>
            <h3>Click here to find out about a random death!</h3>
            <button className={styles.button} onClick={randomDeath}>Death!</button>
          </div>
          {rd.death && death}
        </div>
      </div>
    </main>
  );
};

export default Home;
