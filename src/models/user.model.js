const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now()
  },
  profilePicture: {
    type: String
  }

});

module.exports = mongoose.model('User', UserSchema);

