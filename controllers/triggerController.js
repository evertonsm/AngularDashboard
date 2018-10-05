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
    input = input.substr(2, input.length - 7)
    input = input.replace(/\\/g, '');

    input = JSON.parse(input)
    console.log(input);

    if (input.name == '0') {
        console.log("Tentando conexao")
 	var json = { "bomba": ["D", "D", "D"] };
        res.send(JSON.stringify(json));
    }
    else {


        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("dashboard");

            var market = dbo.collection("stations").findOne({ name: req.body.name }, { sort: { aDate: -1 } });

            var st2 = new Station({
                name: input.name,
                aDate: new Date(),
                humidity: input.humidity,
                irrigation: market.bomba,
            });

            st2.save((err, doc) => {
                if (!err) { console.log("Medida inserida no Banco"); }
                else { console.log('Error in Stattion Save:' + JSON.stringify(err, undefined, 2)); }
            });

	   var station_1 = null;
	   var station_2 = null;
	   var station_3 = null;
           dbo.collection("stations").findOne({ name: "1" }, { $orderby: { "_id": -1 } }, function(err,result)
	  {
		if(err) throw err;
		station_1 = result;
		console.log('Estado da bomba 1 = '+result.irrigation)
 		dbo.collection("stations").findOne({ name: "2" }, { sort: { aDate: -1 } }, function(err,result)
	  	{
			if(err) throw err;
			station_2 = result;
			dbo.collection("stations").findOne({ name: "3" }, { sort: { aDate: -1 } }, function(err,result)
	  		{
				if(err) throw err;
				station_3 = result;

           			console.log('Estado da bomba 1 = '+station_1.irrigation)

		   		var b1 = station_1.irrigation;
				   var b2 = station_1.irrigation;
				   var b3 = station_1.irrigation;


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
					console.log("Enviando: " + JSON.stringify(json))
					res.json(json);

				  });

	  	});

 		

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
