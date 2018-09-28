const express = require('express');
var router = express.Router();

var { Station } = require('../models/station');

// variaveis do MongoDB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// udp
var dgram = require("dgram");
var client = dgram.createSocket("udp4");

router.get('/', (req, res) => {
    Station.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Sensors:' + JSON.stringify(err, undefined, 2)); }

    });
});

client.on("listening", function () {
    var address = client.address();
    console.log("server listening " + address.address + ":" + address.port);
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
                console.log('Deu certo!!')

                db.close();

            });

        // mandar para o bueno o JSON

    });

    var ack = new Buffer("[D,D,L]")
    client.send(ack, 0, ack.length, "4210", "192.168.1.200", function (err, bytes) {
        console.log("Mensagem enviada!!.");
    });

    console.log('TESTE5')
});

module.exports = router;