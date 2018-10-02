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
const ip = '0.0.0.0'

// formulário vem no formato URL encoded
// bodyPaser é responsável por fazer a interpreção dos dados que vem de um formulário
// toda requisição que passar no meu backend, passará por esses midwares

app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://0.0.0.0:8000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Headers,X-Requested-With, Content-Type, Accept, X-Access-Token");
  next();
});
/*
const cors = require('cors');
const whitelist = ['http://localhost:4200', 'http://example2.com'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}
*/
//app.use(cors(corsOptions));


//body - parser
//app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


// listen (start app with node server.js)
app.listen ( port , ip, () => { 
  console .log ( `Servidor rodando em http://${ip}:${port}`);
  console .log ( 'Para fechar: Ctrl + c' ); 
});

app.use('/user', userController);  
app.use('/trigger', triggerController);
app.use('/stations', stationController);

//app.use('/video', videoController);

//adding middleware - cors
//app.use(cors({origin: 'http://localhost:4200/#/pages/garden/station1'}));

