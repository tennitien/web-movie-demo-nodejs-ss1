import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Browse from './pages/browse/Browse';
import Search from './pages/search/Search';

import './App.css';
import axios from './utils/axios';
import requests from './utils/requests';
import Cookies from 'js-cookie';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = Cookies.get('token');
    if (getToken) {
      setToken(getToken);
    } else {
      async function fetchData() {
        try {
          const response = await axios.get(requests.fetchJwtToken);
          const newToken = response.data.token;
          if (newToken) {
            // Lưu token vào cookie và state
            Cookies.set('token', newToken);
            setToken(newToken);
          }
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      }
      fetchData();
    }
  }, [token]);
  return (
    <BrowserRouter>
      {console.log({ token })}
      {token && (
        <Routes>
          <Route path='/' element={<Browse />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
