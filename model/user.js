var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var user = new Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type:String,
        enum: ["admin", "user", "moderator"]
    }
});

module.exports = mongoose.model('User', user);