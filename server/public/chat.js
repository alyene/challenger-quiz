console.log("Reached Js");

var socket = io.connect("http://localhost:8000");

var stuff = document.getElementById('mydiv');
var questionTag = document.getElementById('questionText');
var button1 = document.getElementById('option1');
var button2 = document.getElementById('option2');
var button3 = document.getElementById('option3');
var button4 = document.getElementById('option4');
var questionIndex = 0;

socket.on('datatoserver', function() {
    socket.emit('hereisthedata', {userid:1, subjectid:2});
});

socket.on('gamecreatedpleasewait', function(){
    console.log("I am waiting!");
});

socket.on('questions', function(data){
    info = data;
    console.log(info)
    setQuestion();
});

button1.addEventListener('click', function() {
    questionIndex = questionIndex + 1;
    setQuestion();
    socket.emit('submitanswer', { questionNumber: questionIndex + 1, timetaken: 10, status: true, roomname: info.quizData.roomname });
});

socket.on('opponentanswered', function(data){
    console.log(data);
});


// HELPER FUNCTIONS
function setQuestion() {
    questionTag.innerHTML = `${info.data[questionIndex].question}`;
    button1.innerHTML = `${info.data[questionIndex].option1}`;
    button2.innerHTML = `${info.data[questionIndex].option2}`;
    button3.innerHTML = `${info.data[questionIndex].option3}`;
    button4.innerHTML = `${info.data[questionIndex].option4}`;
}