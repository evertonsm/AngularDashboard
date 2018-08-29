var s_port = 41234;
var dgram = require("dgram");
var server_udp = dgram.createSocket("udp4");

server_udp.on("listening", function() {
    var address = server_udp.address();
    console.log("server listening " + address.address + ":" + address.port);
  });


server_udp.on("message", function(msg, rinfo) {
    
    console.log("server got a message from " + rinfo.address + ":" + rinfo.port);
    console.log("  HEX  : " + msg.toString('hex'));
    console.log("  ASCII: " + msg);
    var ack = new Buffer("ack");
    server_udp.send(ack, 0, ack.length, rinfo.port, rinfo.address, function(err, bytes) {
      console.log("sent ACK.");
    }); 
 });

 server_udp.on("error", function(err) {
    console.log("server error: \n" + err.stack);
    server_udp.close();
});

server_udp.on("close", function() {
    console.log("closed.");
  });

server_udp.bind(s_port);

module.exports = server_udp;

