console.log("Reached Js");

var socket = io.connect("http://localhost:8000");

var stuff = document.getElementById('mydiv');
var button = document.getElementById('btn');

socket.on('datatoserver', function() {
    socket.emit('hereisthedata', {userid:1, subjectid:2});
});

socket.on('questions', function(data){
    console.log(data);
});


//Unused Ones
socket.on('gamecreatedpleasewait', function(){
    console.log("I am waiting!");
});

button.addEventListener('click', function() {
    socket.emit('firstQuestion', { answer:1, score:16 });
});

socket.emit('submitanswer', { score: 20, status: false });

socket.on('opponentanswered', function(data){
    console.log(data);
});