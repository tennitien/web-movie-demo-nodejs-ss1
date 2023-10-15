import axios from 'axios';
import Cookies from 'js-cookie';

let token = Cookies.get('token');

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/movies',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default instance;
