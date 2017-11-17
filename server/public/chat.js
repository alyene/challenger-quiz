console.log("Reached Js");

var socket = io.connect("http://localhost:8000");

var questionTag = document.getElementById('questionText');
var button1 = document.getElementById('option1');
var button2 = document.getElementById('option2');
var button3 = document.getElementById('option3');
var button4 = document.getElementById('option4');

var myScore = document.getElementById('myScore');
var hisScore = document.getElementById('hisScore');

var questionIndex = 0;
hereScore = 0;
thereScore = 0;
submitScore = 0;

myScore.innerHTML = `${hereScore}`
hisScore.innerHTML = `${thereScore}`

var totalTimer;

socket.on('datatoserver', function() {
    socket.emit('hereisthedata', {userid:1, subjectid:2});
});

socket.on('gamecreatedpleasewait', function(){
    console.log("I am waiting!");
});

socket.on('questions', function(data){
    info = data;
    console.log(info);
    setQuestionAndTimer();
});

button1.addEventListener('click', function() {
    clearTimeout(totalTimer);
    
    if(info.data[questionIndex].answer === 1) {
        hereScore = hereScore + 10;
        submitScore = 10;
    } else {
        submitScore = 0;
    }

    socket.emit('submitanswer', 
        { questionNumber: questionIndex, score: submitScore, status: info.data[questionIndex].answer === 1, roomname: info.quizData.roomname });
    questionIndex = questionIndex + 1;
    setQuestionAndTimer();
});

button2.addEventListener('click', function() {
    
    if(info.data[questionIndex].answer === 2) {
        hereScore = hereScore + 10;
        submitScore = 10;
    } else {
        submitScore = 0;
    }

    clearTimeout(totalTimer);
    socket.emit('submitanswer', 
        { questionNumber: questionIndex, score: submitScore, status: info.data[questionIndex].answer === 2, roomname: info.quizData.roomname });
    questionIndex = questionIndex + 1;
    setQuestionAndTimer();
});

button3.addEventListener('click', function() {

    if(info.data[questionIndex].answer === 2) {
        hereScore = hereScore + 10;
        submitScore = 10;
    } else {
        submitScore = 0;
    }

    clearTimeout(totalTimer);
    socket.emit('submitanswer', 
        { questionNumber: questionIndex, score: submitScore, status: info.data[questionIndex].answer === 3, roomname: info.quizData.roomname });
    questionIndex = questionIndex + 1;
    setQuestionAndTimer();
});

button4.addEventListener('click', function() {

    if(info.data[questionIndex].answer === 2) {
        hereScore = hereScore + 10;
        submitScore = 10;
    } else {
        submitScore = 0;
    }

    clearTimeout(totalTimer);
    socket.emit('submitanswer', 
        { questionNumber: questionIndex, score: submitScore, status: info.data[questionIndex].answer === 4, roomname: info.quizData.roomname });
    questionIndex = questionIndex + 1;
    setQuestionAndTimer();
});

socket.on('opponentanswered', function(data){
    
    console.log(data);

    questionIndex = questionIndex + 1;
    thereScore = thereScore + data.score;
    setQuestionAndTimer();
});


// HELPER FUNCTIONS
function setQuestionAndTimer() {

    questionTag.innerHTML = `${info.data[questionIndex].question}`;
    button1.innerHTML = `${info.data[questionIndex].option1}`;
    button2.innerHTML = `${info.data[questionIndex].option2}`;
    button3.innerHTML = `${info.data[questionIndex].option3}`;
    button4.innerHTML = `${info.data[questionIndex].option4}`;

    // totalTimer = setTimeout(function(){
    //     console.log("10 Seconds Over");
    //     socket.emit('submitanswer', { questionNumber: questionIndex, score: 0, status: false, roomname: info.quizData.roomname });
    // }, 10000);

    myScore.innerHTML = `My Score : ${hereScore}`
    hisScore.innerHTML = `His Score : ${thereScore}`

}