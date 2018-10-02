const express = require('express');
var router = express.Router();

var { Station } = require('../models/station');

// variaveis do MongoDB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://0.0.0.0:27017/";

// udp
var dgram = require("dgram");
var client = dgram.createSocket("udp4");

var stations = [];

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

                console.log('Dado atualizado com sucesso!')

            });

        this.stations = dbo.collection("stations").find().toArray(function (err, result) {
            if (err) throw err;

            console.log('Busca feita com sucesso!')

            this.stations = result;


            db.close();

            var b1 = this.stations[0].irrigation;
            var b2 = this.stations[1].irrigation;
            var b3 = this.stations[2].irrigation;


            // possibilidades da bomba
            /*
                0 0 0
                0 0 1
                0 1 0
                0 1 1
                1 0 0
                1 0 1
                1 1 0
                1 1 1
            */

            if (b1 == false && b2 == false && b3 == false)
                var ack = new Buffer("[D,D,D]");
            else if (b1 == false && b2 == false && b3 == true)
                var ack = new Buffer("[D,D,L]");
            else if (b1 == false && b2 == true && b3 == false)
                var ack = new Buffer("[D,L,D]");
            else if (b1 == false && b2 == true && b3 == true)
                var ack = new Buffer("[D,L,L]");
            else if (b1 == true && b2 == false && b3 == false)
                var ack = new Buffer("[L,D,D]");
            else if (b1 == true && b2 == false && b3 == true)
                var ack = new Buffer("[L,D,L]");
            else if (b1 == true && b2 == true && b3 == false)
                var ack = new Buffer("[L,L,D]");
            else if (b1 == true && b2 == true && b3 == true)
                var ack = new Buffer("[L,L,L]");

            // mandar para o bueno o JSON
            client.send(ack, 0, ack.length, "4210", "192.168.1.200", function (err, bytes) {
                console.log("Mensagem enviada!!." + ack);
            });

        });




    });



});

module.exports = router;