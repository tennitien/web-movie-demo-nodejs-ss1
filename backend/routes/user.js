const express = require('express');

const movieController = require('../controllers/movie')

const router = express.Router()

router.get('/', movieController.getAllMovies)

module.exports = router