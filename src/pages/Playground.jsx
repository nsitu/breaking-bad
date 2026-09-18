import React, { useState, useEffect, Fragment } from 'react';
import styles from './Playground.module.css';
import { Title } from './About';
import Spinner from '../Components/Spinner';

const Playground = () => {
  const [search, setSearch] = useState('characters/1');
  const [results, setResults] = useState('');
  const [responseInfo, setResponse] = useState('');

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const keydown = e => {
    e.key === 'Enter' && sendRequest(search);
  };

  const clickSearch = e => {
    setSearch(e.target.name);
    sendRequest(e.target.name);
  };

  const sendRequest = async url => {
    try {
      const request = await fetch(`/api/${url}`);
      const response = await request.json();

      if (response[0].char_id) {
        if (response.length > 1) {
          setResponse(`A list of characters. (${response.length})`);
        } else {
          setResponse(`Information on ${response[0].name}`);
        }
      } else if (response[0].episode_id) {
        if (response.length > 1) {
          setResponse('A list of episodes.');
        } else {
          setResponse(`Information on episode "${response[0].title}"`);
        }
      } else if (response[0].quote_id) {
        if (response.length > 1) {
          setResponse('A list of quotes.');
        } else {
          setResponse(`A quote from ${response[0].author}`);
        }
      } else if (response[0].death_id || response[0].deathCount) {
        if (response.length > 1) {
          setResponse('A list of deaths.');
        } else {
          setResponse(
            `Information on the deaths caused by ${response[0].name}`
          );
        }
      }

      await setResults(JSON.stringify(response, null, 4));
    } catch (err) {
      setResults(
        "Incorrect syntax. Try typing 'characters/1', or take a look at the documentation."
      );
      setResponse('');
    }
  };

  useEffect(() => {
    sendRequest('characters/1');
  }, []);

  return (
    <>
      <Title className={styles.title}>
        Data Playgrou<mark>Nd</mark>
      </Title>
      <h4 className={styles.subHeader}>
        Try using the search bar below to look up any info you can think of!
        Use the categories below as a starting point.
      </h4>
      <div className={styles.searchBar}>
        <p>https://www.breakingbadapi.com/api/</p>
        <input className={styles.searchInput}
          type="text"
          onChange={updateSearch}
          onKeyDown={keydown}
          value={search}
        />
        <button className={styles.searchButton} onClick={() => sendRequest(search)}>Search!</button>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={clickSearch} name="characters/8">
          Characters
        </button>
        <button onClick={clickSearch} name="episodes/60">
          Episodes
        </button>
        <button onClick={clickSearch} name="quote?author=Jesse+Pinkman">
          Quotes
        </button>
        <button onClick={clickSearch} name="death-count?name=Gustavo+Fring">
          Deaths
        </button>
      </div>
      <h4 className={styles.responseHeader}>Results:</h4>
      <pre className={styles.dataDisplay}>
        {!results ? (
          <Spinner />
        ) : (
          <Fragment>
            <h2>{responseInfo}</h2>
            <code>{results}</code>
          </Fragment>
        )}
      </pre>
    </>
  );
};

export default Playground;
