const express = require('express');
var router = express.Router();
var { Trigger } = require('../models/trigger');
var ObjectId = require('mongoose').Types.ObjectId;

// => localhost:8000/trigger/
router.get('/', (req,res) => {
    Trigger.find((err,docs) =>{
        if(!err) { res.send(docs);}
        else { console.log('Error in Retriving Trigger:' + JSON.stringify(err,undefined, 2)); }

    });

});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Trigger.findById(req.params.id, (err,doc)=> {
        if(!err){ res.send(doc); }
        else{ console.log( 'Error in Retriving Trigger:' + JSON.stringify(err, undefined,2));}

    });
});

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    var emp = {
        name: req.body.name,
        station: req.body.station,
        isActive: req.body.isActive,

    };

    Trigger.findByIdAndUpdate(req.params.id, { $set: emp}, {new: true}, (err, doc)=>{
        if(!err){ res.send(doc); }
        else{ console.log( 'Error in Trigger Update:' + JSON.stringify(err, undefined,2));}


    });
});

router.post('/', (req,res)=> {
    var trig = new Trigger({
        name: req.body.name,
        station: req.body.station,
        isActive: req.body.isActive,

    });
    trig.save((err,doc)=>{
        if(!err) { res.send(doc);}
        else{ console.log('Error in Trigger Save:' + JSON.stringify(err,undefined,2));}        
    });

});

module.exports = router;