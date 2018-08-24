const express = require('express');

var router = express.Router();
var { Sensors } = require('../models/sensors');


// => localhost:8000/sensors/

router.get('/', (req,res) => {
    Sensors.find((err,docs) =>{
        if(!err) { res.send(docs);}
        else { console.log('Error in Retriving Sensors:' + JSON.stringify(err,undefined, 2)); }

    });
});

router.post('/', (req,res)=> {
    var sens = new Sensors({
        name: req.body.name,
        station: req.body.station,
        aDate : new Date(),
        temperature: req.body.temperature,
        humidity: req.body.humidity

    });
    sens.save((err,doc)=>{
        if(!err) { res.send(doc);}
        else{ console.log('Error in Trigger Save:' + JSON.stringify(err,undefined,2));}        
    });

});

/*
router.get('/:name', (req, res) => {
    
    Sensors.find({'name' : req.params.name},(err, obj) => {
        if(!err){ res.send(obj); }
        else{ console.log( 'Error in Retriving Sensor:');}

    });
});*/

module.exports = router;