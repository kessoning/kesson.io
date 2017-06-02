// socket
var socket;

// Create a socket connection
socket = io.connect(window.location.origin);

// Receive and handle socket messages
socket.on('audio', function(data) {
    audio_net = data;
    //console.log("audio: " + data);
});

socket.on('vol', function(data) {
    volume_net = data;
    //console.log("volume: " + data);
});

socket.on('peakDetection', function(data) {
    peak_net = data;
    //console.log("peakDetection: " + data);
});

socket.on('v1values', function(data) {
    v1values_net = data;
    //console.log("v1values: " + data);
});

socket.on('v2values', function(data) {
    v2values_net = data;
    //console.log("v2values: " + data);
});

socket.on('v3values', function(data) {
    v3values_net = data;
    //console.log("v3values: " + data);
});
