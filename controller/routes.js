module.exports = function(router, auth, middleware){
    var Tutorial = require('./../model/tutorial');
    var User = require('./../model/user');

    //GET
    findAllTutorial = function(req, res){
       Tutorial.find(function(err, tutorial){
           if(!err) res.send(tutorial);
           else console.log("ERROR: "+err);
        });
    };
    // GET
    findById = function(req, res){
        Tutorial.findById(req.params.id, function(err, tutorial){
            if(!err) res.send(tutorial);
            else console.log("ERROR: "+err);
        });
    };
    //POST
    addTutorial = function(req, res){
        console.log('POST');
        console.log(req.body);
        console.log(req.body.title);
        //recibira un json al back
        var tutorial = new Tutorial({
            title: req.body.title,
            description: req.body.description
        });
        tutorial.save(function(err){
            if(!err) console.log('Tutorial guardado');
            else console.log("ERROR: "+err);
        });

        res.send(tutorial);
    };

    //PUT (update)
    updateTutorial = function(req, res){
        Tutorial.findById(req.param.id, function(err, tutorial){
            if(!err){
                tutorial.title = req.body.title;
                tutorial.description= req.body.description;
                tutorial.author= req.body.author;
                tutorial.tag=req.body.tag;
                tutorial.save(function(err){
                    if(!err) console.log('Tutorial actualizado');
                    else console.log("ERROR: "+err);
                });

                res.send(tutorial);
            }
            else console.log("ERROR: "+err);
        })
    };

    //DELETE
    deleteTutorial =function(req, res){
        Tutorial.findById(req.param.id, function(err, tutorial){
            if(!err){
                tutorial.remove(function(err){
                    if(!err) console.log('Tutorial borrada');
                    else console.log("ERROR: "+err);
                });
            }
            else console.log("ERROR: "+err);
        })
    };

    // USER
    findAllUser = function(req, res){
        User.find(function(err, user){
            if(!err) res.send(user);
            else console.log("ERROR: "+err);
        });
    };
    findUserById  = function(req, res){
        User.findById(req.params.id, function(err, tutorial){
            if(!err) res.send(tutorial);
            else console.log("ERROR: "+err);
        });
    };

    //RUTAS

    router.get('/tutorial', findAllTutorial);
    router.get('/tutorial/:id', findById);
    router.get('/usuarios',middleware.ensureAuthenticated,findAllUser);

    router.post('/tutorial',middleware.ensureAuthenticated, addTutorial);
    router.put('/tutorial/:id',middleware.ensureAuthenticated, updateTutorial);
    router.delete('/tutorial/:id',middleware.ensureAuthenticated, deleteTutorial);

// Rutas de autenticación y login
    router.post('/auth/signup', auth.emailSignup);
    router.post('/auth/login', auth.emailLogin);

// Ruta solo accesible si estás autenticado
    router.get('/private',middleware.ensureAuthenticated, function(req, res) {
        res.send('Aqui');
    } );

};