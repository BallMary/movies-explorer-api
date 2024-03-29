const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Constants = require('../utils/constants');
const UnauthorizedError = require('../middlewares/errors/unauthorized-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Неккоректная почта',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(Constants.USER_PASS_WRONG));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(Constants.USER_PASS_WRONG));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
