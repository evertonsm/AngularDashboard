const express = require('express');
const fs = require('fs');
var router = express.Router();



Stream = require('node-rtsp-stream');
stream = new Stream({
    name: 'camera1',
    streamUrl: 'rtsp://admin:gandalf@192.168.1.195:8554/profile0:camera1.mov',
    wsPort: 9999
});



/*
const Stream = require('./node-rtsp-stream');
const streamUrl = process.env.FOSCAM_STREAM_URL;
stream = new Stream({
  name: 'camera1',
  streamUrl: 'rtsp://admin:gandalf@192.168.1.195:8554/profile0',
  wsPort: 9999,
  width: 1280,
  height: 720
});*/

/*
router.get('/', function(req, res) {
    const path = './camera1.ogg'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/ogg',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/ogg',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  });
*/




// => localhost:8000/video/


module.exports = router;