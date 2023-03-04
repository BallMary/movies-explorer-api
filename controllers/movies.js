const mongoose = require('mongoose');
const Movie = require('../models/movie');
const Constants = require('../utils/constants');
const NotFoundError = require('../middlewares/errors/not-found-err');
const BadRequestError = require('../middlewares/errors/bad-request');
const OwnerError = require('../middlewares/errors/owner-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res
      .status('201')
      .send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(Constants.CREATE_CARD_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movieId = await Movie.findOne({ _id: req.params.id });
    const OwnerId = req.user._id;
    if (movieId === null) {
      next(new NotFoundError(Constants.NOT_FOUND_CARD_WITH_ID));
    } else if (movieId.owner.valueOf() === OwnerId) {
      const movie = await Movie.findByIdAndRemove(req.params.id);
      res.send(movie);
    } else {
      next(new OwnerError(Constants.DELETE_PROHIBITED));
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError(Constants.INVALID_CARD_ID));
    } else {
      next(err);
    }
  }
};
