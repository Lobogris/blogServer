/**
 * Created by SERGIO on 09/02/2017.
 */
var express = require('express');
//var hapi = require('hapi');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var authCtrl = require('./controller/auth');
var middleware = require('./controller/middleware');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //Permite usar put, get, post, (metodos api rest)

app.use(methodOverride()); //
//app.use(app.router); //Aplicacion pueda enrutar
app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello World!');
});
//var router = express.Router();


require('./controller/routes')(app,authCtrl,middleware);
//require('./controller/routes')(router,authCtrl,middleware);

// Importamos nuestros modelos,
// en este ejemplo nuestro modelo de usuario

app.set('port', process.env.PORT || 5000);

mongoose.connect('mongodb://localhost/tutorial', function(err, res){
    if(err) console.log('ERROR: Conectando a la BD');
    else {
        console.log('Conexion a BD establecida');
        var server = app.listen(app.get('port'), function() {
            console.log('Express server listening on port ', server.address().port);
        });
    }
});






