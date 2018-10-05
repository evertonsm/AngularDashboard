const express = require('express');
var router = express.Router();

var { Station } = require('../models/station');

// variaveis do MongoDB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


router.get('/', (req, res) => {
    Station.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Sensors:' + JSON.stringify(err, undefined, 2)); }

    });
});


router.get('/:name', (req, res) => {

    var a = [];
    Station.findOne({ 'name': req.params.name }, (err, obj) => {
        if (!err) {
            a.push(obj);

            res.send(a);
        }
        else { console.log('Error in Retriving Station:'); }

    }).sort({ _id: -1 });


});

router.post('/', (req, res) => {

    var st = new Station({
        name: req.body.name,
        aDate: new Date(),
        irrigation: req.body.irrigation,
        humidity: req.body.humidity
    });

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("dashboard");
        dbo.collection("stations").updateOne(
            { name: st.name },
            { $set: { irrigation: req.body.irrigation } },
            function (err, result) {
                if (err) throw err;
               });

        this.stations = dbo.collection("stations").find().toArray(function (err, result) {
            if (err) throw err;

            this.stations = result;

            db.close();


        });


    });

});

module.exports = router;
