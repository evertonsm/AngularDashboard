const express = require('express');
var router = express.Router();

var { Station } = require ('../models/station');

router.get('/', (req,res) => {
    Station.find((err,docs) =>{
        if(!err) { res.send(docs);}
        else { console.log('Error in Retriving Sensors:' + JSON.stringify(err,undefined, 2)); }

    });
});

router.get('/:name', (req, res) => {
    var a = [];
    Station.findOne({'name' : req.params.name},(err, obj) => {
        if(!err){a.push(obj); res.send(a); }
        else{ console.log( 'Error in Retriving Station:');}

    }).sort({_id: -1});
   
});

router.post('/', (req,res)=> {
    var st = new Station({
        name: req.body.name,
        aDate : new Date(),
        humidity: req.body.humidity

    });
    st.save((err,doc)=>{
        if(!err) { res.send(doc);}
        else{ console.log('Error in Trigger Save:' + JSON.stringify(err,undefined,2));}        
    });

});

/*

var { Sensors } = require('../models/sensors');

// => localhost:8000/station/

router.get('/', (req,res) => {
    Sensors.find((err,docs) =>{
        if(!err) { res.send(docs);}
        else { console.log('Error in Retriving Sensors:' + JSON.stringify(err,undefined, 2)); }

    });
});

router.get('/:station', (req, res) => {
    
    Sensors.find({'station' : req.params.station},(err, obj) => {
        if(!err){ res.send(obj); }
        else{ console.log( 'Error in Retriving Station:');}

    });
    
    Sensors.find({'station' : req.params.station},(err,docs) =>{
        if(!err) { res.send(docs);}
        else { console.log('Error in Retriving Sensors:' + JSON.stringify(err,undefined, 2)); }
    }).sort({_id: -1});

});
*/
module.exports = router;