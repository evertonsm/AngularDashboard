var s_port = 41235;
var BROADCAST_ADDR = "192.168.2.7";
var HOST = 'localhost'
// O User Datagram Protocol (UDP)
// é um protocolo simples da camada de transporte. 
//Ele é descrito na RFC 768 e permite que a aplicação envie um datagrama 
//encapsulado num pacote IPv4 ou IPv6 a um destino, porém sem qualquer tipo 
//de garantia que o pacote chegue corretamente (ou de qualquer modo).

var dgram = require("dgram");
var server_udp = dgram.createSocket("udp4");

const express = require('express');
var router = express.Router();

// variaveis do MongoDB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

server_udp.on("listening", function () {
  var address = server_udp.address();
  console.log("server listening " + address.address + ":" + address.port);
});

server_udp.on("message", function (msg, rinfo) {

  console.log("  ASCII: " + msg);
  console.log("IP = "+rinfo.address+":"+rinfo.port)
  // verificação de segurança
  // manda pro banco
  MongoClient.connect(url, function (err, db) {

    if (err) throw err;
    var dbo = db.db("dashboard");

    var json = JSON.parse(msg)
    console.log('Nome Json = ' + json.name);

    var bomba = json.bomba;
    var irrigation_aux = false;
    if(bomba == "Ligado")
    {
      irrigation_aux = true;
    }
    else
    {
      irrigation_aux = false;
    }
  
    dbo.collection("stations").updateOne(
      {name: json.name} ,
      { $set: { 
        humidity: json.humidity,
        irrigation: irrigation_aux
      } 
    },
      function (err, result) {

        if (err) throw err;

        console.log('Deu certo!!')
        db.close();

      });


  });

});

server_udp.on("error", function (err) {
  console.log("server error: \n" + err.stack);
  server_udp.close();
});

server_udp.on("close", function () {
  console.log("closed.");
});

server_udp.bind(s_port);

module.exports = server_udp;

