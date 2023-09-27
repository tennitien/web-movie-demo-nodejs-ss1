const express = require('express');
const movieController = require('../controllers/movie');
const {
  postToken,
  authenticateToken,
} = require('../middleware/authenticateToken');

const router = express.Router();

// 9.Add authentication mechanism
router.get('/', movieController.getAllMovies);
router.get('/trending/', movieController.getTrending);
router.get('/top-rate/', movieController.getRating);
router.get('/discover/', movieController.getDiscover);
router.get('/video/:idMovie', movieController.getTrailer);
router.get('/search', movieController.getByKeyword);
// router.get('/', postToken,authenticateToken, movieController.getAllMovies);
// router.get('/trending/', authenticateToken, movieController.getTrending);
// router.get('/top-rate/', authenticateToken, movieController.getRating);
// router.get('/discover/', authenticateToken, movieController.getDiscover);
// router.get('/video/:idMovie', authenticateToken, movieController.getTrailer);
// router.get('/search', authenticateToken, movieController.getByKeyword);

module.exports = router;
