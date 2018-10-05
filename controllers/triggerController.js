const express = require('express');
var router = express.Router();
var { Trigger } = require('../models/trigger');
var { Station } = require('../models/station')
var ObjectId = require('mongoose').Types.ObjectId;

// variaveis do MongoDB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// => 131.221.243.115:8000/trigger/
/*
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
*/
router.post('/', (req, res) => {

    var input = JSON.stringify(req.body)
    var aux = input;
    input = input.substr(2, input.length - 7)
    var estado_bomba = aux.substring(58, 65);

    input = input.replace(/\\/g, '');

    input = JSON.parse(input)

    console.log("Bomba = "+estado_bomba);
    var estado = true;

    if(input.bomba == "Desligado") estado = false;

    if (input.name == '0') {
        console.log("Tentando conexao")
        var json = { "bomba": ["D", "D", "D"] };
        res.send(json);
    }
    else {


        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("dashboard");

            var st2 = new Station({
                name: input.name,
                aDate: new Date(),
                humidity: input.humidity,
                irrigation: estado,
            });

            /*
            dbo.collection("stations").updateOne(
                { name: st.name },
                { $set: { irrigation: req.body.irrigation } },
                function (err, result) {
                    if (err) throw err;

                    console.log('Dado atualizado com sucesso!')

                });
            */

            dbo.collection("stations").find().toArray(function (err, result) {
                if (err) throw err;

                console.log('Busca feita com sucesso!')

                this.stations = result;

                var b1 = this.stations[0].irrigation;
                var b2 = this.stations[1].irrigation;
                var b3 = this.stations[2].irrigation;


                /*
                // possibilidades da bomba
        	
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
                    //var ack = new Buffer("[D,D,D]");
                    var json = { "bomba": ["D", "D", "D"] };
                else if (b1 == false && b2 == false && b3 == true)
                    //var ack = new Buffer("[D,D,L]");
                    var json = { "bomba": ["D", "D", "L"] };
                else if (b1 == false && b2 == true && b3 == false)
                    // var ack = new Buffer("[D,L,D]");
                    var json = { "bomba": ["D", "L", "D"] };

                else if (b1 == false && b2 == true && b3 == true)

                    // var ack = new Buffer("[D,L,L]");

                    var json = { "bomba": ["D", "L", "L"] };

                else if (b1 == true && b2 == false && b3 == false)

                    // var ack = new Buffer("[L,D,D]");

                    var json = { "bomba": ["L", "D", "D"] };
                else if (b1 == true && b2 == false && b3 == true)
                    // var ack = new Buffer("[L,D,L]");
                    var json = { "bomba": ["L", "D", "L"] };
                else if (b1 == true && b2 == true && b3 == false)
                    // var ack = new Buffer("[L,L,D]");
                    var json = { "bomba": ["L", "L", "D"] };
                else if (b1 == true && b2 == true && b3 == true)
                    // var ack = new Buffer("[L,L,L]");
                    var json = { "bomba": ["L", "L", "L"] };

                // mandar para o bueno o JSON
                db.close();
                res.send(JSON.stringify(json));

            });

        });

    };

});

module.exports = router;



/*
    if(input.name == '0'){
     console.log("Tentando conexao")
    }
    else {
      MongoClient.connect(url, function (err, db) {

        if (err) throw err;
        var dbo = db.db("dashboard");

        var bomba = input.bomba;
        var irrigation_aux = false;
        if (bomba == "Ligado") {
            irrigation_aux = true;
        }
        else {
            irrigation_aux = false;
        }

        dbo.collection("stations").updateOne(
            { name: input.name },
            {
                $set: {
                    humidity: input.humidity,
                    irrigation: irrigation_aux
                }
            },
            function (err, result) {

                if (err) throw err;

                db.close();

            });
    

      });
    }
*/
