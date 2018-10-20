var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  fullName: String,
  email: String,
  password: String,
  adm: Boolean, 
  type: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');

