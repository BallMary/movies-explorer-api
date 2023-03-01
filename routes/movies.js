const router = require('express').Router();
const { validateMovieDelete, validateMoviePost } = require('./validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateMoviePost(), createMovie);

router.delete('/:id', validateMovieDelete(), deleteMovie);

module.exports = router;
