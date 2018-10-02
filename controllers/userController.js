const express = require('express');
var router = express.Router();
var User = require('../models/user');


var jwt = require ('jsonwebtoken'); 
var bcrypt = require ('bcryptjs');
var config = require ('./config');



// variaveis do MongoDB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";


router.post('/register', function(req, res) {
  
    var typeUser = 'user';
  
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashedPassword
  },

    function (err, user) {

      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        //expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
      console.log(user);
    }); 

    
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("user");
        dbo.collection("userCollection").insertOne(user, function (err, result) {
          if (err) throw err;
          console.log('aqui = '+result)
          
          res.status(200).send({ auth: true, token: token });

          db.close();

        });


      });

    });

 

  router.get('/me', function (req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

      User.findById(decoded.id,
        { password: 0 }, // projection
        function (err, user) {
          if (err) return res.status(500).send("There was a problem finding the user.");
          if (!user) return res.status(404).send("No user found.");
          res.status(200).send(user);
        });
    });
  });

  router.post('/login', function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token });
    });
  });

  router.get('/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null });
  });

  // NOVO - Usando o método get para obter algum dado de usuário no banco
  router.get('/', (req, res) => {
    // fazendo a busca
    User.findOne((err, docs) => {
      if (!err) { res.send(docs); }
      else { console.log('Erro ao buscar usuário:' + JSON.stringify(err, undefined, 2)); }

    });
  });



module.exports = router;


/*

 Método que podem ajudar:

 
            /*
            insertMany([{}, {}, {}])

            updateOne({query}, { $updateOperador:{email:""} })

            updateMany

            deleteOne({query})

            deleteMany({})

            r = findOne({"new_login.email": "Ensley"})

            r["email"]
            
            r.toArray()

            r = list(cursor)

            {"new_login.password":"12345"}
            */



