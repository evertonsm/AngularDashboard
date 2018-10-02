var PORT = "41235";
var IP = "192.168.1.119"; // dúvida
var dgram = require('dgram');
var message = new Buffer("Teste");
var client = dgram.createSocket("udp4");
var json1 = {"name":"1","humidity":[0,0,0,0],"bomba":["lixo"]};
var json2 = {"name":"2","humidity":[0,50,0,50],"bomba":["Ligado"]};
var json3 = {"name":"3","humidity":[20,0,20,0],"bomba":["Desligado"]};
var cont = 1;


client.on('listening', function () {
    var address = client.address();
    console.log('UDP Client listening on ' + address.address + ":" + address.port);

});

var sendMsg = function (error) {

        if (!error) {
            
            if(cont == 1)
            client.send(JSON.stringify(json1), PORT, IP, function (err, bytes) {
                console.log("Mensagem enviada - 1!!.");
                cont = cont + 1;
            });
            else if(cont == 2)
            client.send(JSON.stringify(json2), PORT, IP, function (err, bytes) {
                console.log("Mensagem enviada - 2!!.");
                cont = cont + 1;
            });
            else if(cont == 3)
            client.send(JSON.stringify(json3), PORT, IP , function (err, bytes) {
                console.log("Mensagem enviada - 3!!.");
                cont = cont + 1;
            });
            else
            {
                cont = 1;
            }

        } else {
            console.log('error' + response.statusCode);
        }

};


client.on('close', function () {
    console.log('Client UDP socket closed : BYE!')
});

sendMsg(); // Do on start
var msgLoop = setInterval(sendMsg, 3000);
