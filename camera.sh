sudo killall ffserver

ffserver & ffmpeg -rtsp_transport tcp -i rtsp://admin:gandalf@138.0.164.107:8065/profile1.sdp -movflags faststart http://127.0.0.1:14000/feed.ffm


