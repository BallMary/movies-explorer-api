const rateLimit = require('express-rate-limit');
const Constants = require('../utils/constants');

module.exports.rateLimiterUseOneHour = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
  message: Constants.LIMIT_EXCEEDED,
  standardHeaders: true,
  legacyHeaders: false,
});
