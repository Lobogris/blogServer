// auth.js
var mongoose = require('mongoose');
//var User = mongoose.model('User');
var User = require('../model/user');
var service = require('../services/service');

exports.emailSignup = function(req, res) {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role:'user'
    });

    user.save(function(err){
        return res
            .status(200)
            .send({token: service.createToken(user)});
    });
};

exports.emailLogin = function(req, res) {
    User.findOne({email: req.body.email.toLowerCase(), password: req.body.password}, function(err, user) {
        // Comprobar si hay errores
        // Si el usuario existe o no
        // Y si la contraseña es correcta
        console.log(user);

        return res
            .status(200)
            .send({token: service.createToken(user)});
    });
};