var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var tag = {
    type: String,
    enum: ["Node", "angular", "angularjs"]
};
var tutorial = new Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Tutorial', tutorial);