const API_KEY = '504b85f6fe0a10a9c7f35945e14e7ddf';

const requests = {
  fetchJwtToken: `/jwt-token`,
  fetchNetflixOriginals: ``,
  fetchTrending: page => `/trending?page=${page ? page : 1}`,
  fetchTopRated: page => `/top-rate?page=${page ? page : 1}`,
  //   find by genre_id
  fetchActionMovies: page => `/discover?genre=28&page=${page ? page : 1}`,
  fetchComedyMovies: page => `/discover?genre=35&page=${page ? page : 1}`,
  fetchHorrorMovies: page => `/discover?genre=27&page=${page ? page : 1}`,
  fetchRomanceMovies: page => `/discover?genre=10749&page=${page ? page : 1}`,
  fetchDocumentaries: page => `/discover?genre=99&page=${page ? page : 1}`,
  //   find by genre_id
  fetchSearch: query => `/search?q=${query}`,
};

export default requests;
