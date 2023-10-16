import React, { useState, useEffect } from 'react';

import axios from '../../utils/axios';
import requests from '../../utils/requests';
import Cookies from 'js-cookie';

import './SearchResult.css';

const base_url = 'https://image.tmdb.org/t/p/original';

const SearchResult = ({ query }) => {
  const [movies, setMovies] = useState([]);
  console.log({ query });
  const url = requests.fetchSearch(query);
  const token = Cookies.get('token');

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(request.data);
      setMovies(request.data.results);
      return request;
    }

    if (query) {
      fetchData();
    } else {
      setMovies([]);
    }
  }, [url, query]);

  return (
    <div className='row'>
      <h2>Search Result</h2>
      <div className='row_posters search-resul-container sc2'>
        {movies &&
          movies.map(movie => {
            return (
              <img
                key={movie.id}
                className={`row_poster row_posterLarge`}
                src={`${base_url}${movie.poster_path}`}
                alt={movie.name}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SearchResult;
