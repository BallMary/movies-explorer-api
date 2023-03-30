const rateLimit = require('express-rate-limit');
const Constants = require('../utils/constants');

module.exports.rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: Constants.LIMIT_EXCEEDED,
  standardHeaders: true,
  legacyHeaders: false,
});
