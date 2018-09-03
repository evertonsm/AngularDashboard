// index.js

// set up ========================
const express = require ( 'express' );
const bodyparser = require ('body-parser');
const cors = require ('cors');
const { mongoose } = require('./db.js');
//const {udp} = require('./udp.js');


var triggerController = require('./controllers/triggerController.js');
var stationController = require('./controllers/stationController.js');
//var videoController = require('./controllers/videoController.js')
var userController = require('./controllers/userController.js')


const app = express ();
const port = 8000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Headers,X-Requested-With, Content-Type, Accept, X-Access-Token");
  next();
});


//body - parser
//app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


// listen (start app with node server.js)
app.listen ( port , () => { 
  console .log ( 'Servidor HTTP em: http://localhost: '+port);
  console .log ( 'Para fechar: Ctrl + c' ); 
});

app.use('/user', userController);  
app.use('/trigger', triggerController);
app.use('/stations', stationController);
//app.use('/video', videoController);

//adding middleware - cors
//app.use(cors({origin: 'http://localhost:4200/#/pages/garden/station1'}));

