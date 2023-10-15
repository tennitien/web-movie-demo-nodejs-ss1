import axios from 'axios';
import Cookies from 'js-cookie';
/** base url to make request to the themoviedatabase */
const token = Cookies.get('token') || '';
const instance = axios.create({
  baseURL: 'http://localhost:8000/api/movies',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// instance.get('/foo-bar');
// https://api.themoviedb.org/3/foo-bar
export default instance;
