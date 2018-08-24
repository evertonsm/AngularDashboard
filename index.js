// index.js

// set up ========================
const express = require ( 'express' );
const bodyparser = require ('body-parser');
const cors = require ('cors');
const { mongoose } = require('./db.js');
var sensorsController = require('./controllers/sensorsController.js');
var triggerController = require('./controllers/triggerController.js');
var stationController = require('./controllers/stationController.js');
var videoController = require('./controllers/videoController.js')

const app = express ();
const port = 8000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//body - parser
app.use(bodyparser.json());

// listen (start app with node server.js)
app.listen ( port , () => { 
  console .log ( 'Servidor em: http://localhost:'+port);
  console .log ( 'Para fechar: Ctrl + c' ); 
});

app.use('/sensors', sensorsController);
app.use('/trigger', triggerController);
app.use('/stations', stationController);
app.use('/video', videoController);

//adding middleware - cors
//app.use(cors({origin: 'http://localhost:4200/#/pages/garden/station1'}));

