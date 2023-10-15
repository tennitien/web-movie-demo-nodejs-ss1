const express = require('express');
const movieController = require('../controllers/movie');
const {
  postToken,
  authenticateToken,
} = require('../middleware/authenticateToken');

const router = express.Router();

// 9.Add authentication mechanism
router.get('/jwt-token', postToken);
router.get('/', authenticateToken, movieController.getAllMovies);
router.get('/trending/', authenticateToken, movieController.getTrending);
router.get('/top-rate/', authenticateToken, movieController.getRating);
router.get('/discover/', authenticateToken, movieController.getDiscover);
router.get('/video/:idMovie', authenticateToken, movieController.getTrailer);
router.get('/search', authenticateToken, movieController.getByKeyword);

module.exports = router;
