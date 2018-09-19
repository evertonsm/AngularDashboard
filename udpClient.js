var PORT = 41235;
var IP = 'localhost' // dúvida
var dgram = require('dgram');
var message = new Buffer("Teste");
var client = dgram.createSocket("udp4");
//client.setBroadcast(true);

client.bind(7500)

client.on('listening', function () {
    var address = client.address();
    console.log('UDP Client listening on ' + address.address + ":" + address.port);
    client.setBroadcast(true);
    //client.setMulticastTTL(64); 
    //client.addMembership('{multicast_addr}', IP);
});

//sending msg
client.send(message, 0, message.length, PORT, IP, function (err, bytes) {


    if (err) {
        console.log('Erro ='+err)
        //client.close();

    } else {

        console.log('Data sent !!!');

    }

});


client.close();