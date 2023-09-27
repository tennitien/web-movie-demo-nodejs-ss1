const Movies = require('../models/Movies');
const Genres = require('../models/Genres');
const Videos = require('../models/Videos');
const { getPageFromPagination } = require('../utils/paging');

// get all movie
exports.getAllMovies = (req, res, next) => {
  let movies = Movies.all();

  res.status(200).json({
    results: movies,
    total_pages: Math.ceil(movies.length / 20),
  });
};

// 4. Get movie Trending
exports.getTrending = (req, res, next) => {
  let page = parseInt(req.query?.page) || 1;
  let movies = Movies.all();
  let trending = movies.sort((a, b) => b.popularity - a.popularity);
  let total_pages = Math.ceil(trending.length / 20);
  let results = getPageFromPagination(trending, 20, page);
  res.status(200).json({
    results,
    page,
    total_pages,
  });
};

// 5. Get movies with high ratings
exports.getRating = (req, res, next) => {
  let page = parseInt(req.query?.page) || 1;
  let movies = Movies.all();
  let ratings = movies.sort((a, b) => b.vote_average - a.vote_average);
  let total_pages = Math.ceil(ratings.length / 20);
  let results = getPageFromPagination(ratings, 20, page);
  res.status(200).json({
    results,
    page,
    total_pages,
  });
};

// 6. Get movies by genre_id
//  This API will receive a genre parameter corresponding to the id of the genre you want to search for.
exports.getDiscover = (req, res, next) => {
  let genre = req.query.genre;

  if (!genre) return res.status(400).json('Not found genre param');

  let genre_id = parseInt(genre);

  let findGenre = Genres.all().find(item => item.id === genre_id);
  if (!findGenre) return res.status(400).json('Not found that genre id');
  let genre_name = findGenre.name;

  let page = parseInt(req.query?.page) || 1;
  let movies = Movies.all();
  let discovers = movies.filter(movie => movie.genre_ids.includes(genre_id));
  let total_pages = Math.ceil(discovers.length / 20);
  let results = getPageFromPagination(discovers, 20, page);

  res.status(200).json({
    results,
    page,
    total_pages,
    genre_name,
  });
};

// 7. Get a trailer for a movie
exports.getTrailer = (req, res, next) => {
  if (!req.params) {
    res.status(400).json('Not found film_id param');
  }
  let idMovie = req.params.idMovie;

  let findVideos = Videos.all().find(item => item.id == idMovie);
  if (!findVideos) {
    res.status(404).json('Not found video');
  }

  let officials = findVideos.videos.filter(
    video => video.official && video.site === 'YouTube'
  );

  let result;
  let trailers = officials.filter(video => video.type === 'Trailer');

  if (!trailers) {
    let teasers = officials.filter(video => video.type === 'Teaser');
    result = teasers.sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )[0];
  } else {
    result = trailers.sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )[0];
  }

  res.status(200).json({ result });
};

// 8. Search movies By keywords
// -> 12.Search by: genre, media_type, language, release_date(year)

exports.getByKeyword = (req, res, next) => {
  // check query is empty
  if (Object.keys(req.query).length === 0) {
    res.status(400).json('Not found keyword param');
  }
  let { q, genre, media_type, language, year } = req.query;

  let movies = Movies.all();
  let moviesSearch = movies;
  //Search by query
  // concat: overview and title -> search() -> If there are words in the string -> result >=0
  if (q) {
    moviesSearch = movies.filter(
      movie =>
        movie.overview
          ?.concat(movie.title)
          .toLowerCase()
          .search(q.toLowerCase()) >= 0
    );
  }

  let findGenre = genre
    ? Genres.all().find(item => item.name.toLowerCase() === genre.toLowerCase())
    : false;

  //Advance: Search by: genre, media_type, language, release_date(year)
  if (findGenre) {
    moviesSearch = moviesSearch.filter(movie =>
      movie.genre_ids.includes(findGenre.id)
    );
  }
  if (media_type) {
    moviesSearch = moviesSearch.filter(
      movie => movie.media_type === media_type
    );
  }
  if (language) {
    moviesSearch = moviesSearch.filter(
      movie => movie.original_language === language
    );
  }
  if (year) {
    moviesSearch = moviesSearch.filter(
      movie => movie.release_date?.split('-')[0] === year
    );
  }

  let page = parseInt(req.query?.page) || 1;
  let results = getPageFromPagination(moviesSearch, 20, page); // fn on top get page you want
  let total_pages = Math.ceil(moviesSearch.length / 20);
  res.status(200).json({
    results,
    page,
    total_pages,
  });
};
