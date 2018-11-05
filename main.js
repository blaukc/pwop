/*jslint plusplus: true */
var x = true;
var mode = 'speech';
var timer = true, qnHide = true;
var min = 0, sec = '00';
var i = 0, j = 0, t;
var ding = new Audio('ding.wav');
var questionList, asked = [], n, asking = false;
var force = false;

window.onload = function () {
    document.getElementById('time').innerHTML = min + ':' + sec;
    jQuery.get('questions.txt', function (data) {
        questionList = data.split('\n');
    });
};

function increaseTime() {
    j += 1;
    if (j < 10) {
        sec = '0' + j.toString();
    } else if (j === 60) {
        i += 1;
        j = 0;
        min = i;
        sec = '00';
    } else {
        sec = j.toString();
    }
    if (i === 5) {
        clearInterval(t);
        document.getElementById('reset').style.visibility = 'visible';
        ding.play();
    }
    if (i === 4 && j === 30) {
        ding.play();
    }
    document.getElementById('time').innerHTML = min + ':' + sec;
}

function startTime() {
    ding.play();
    t = setInterval(increaseTime, 1000);
}

function readQuestion() {
    asking = true;
    while (true) {
        n = Math.floor(Math.random() * questionList.length);
        if (!asked.includes(n)) {
            asked.push(n);
            break;
        }
        if (asked.length === questionList.length) {
            asked = [];
        }
    }
    document.getElementById('question').innerHTML = questionList[n];
    if (!qnHide) {
        document.getElementById('question').style.opacity = '1';
    }
    window.utterances = [];
    var qn = new SpeechSynthesisUtterance(questionList[n]);
    utterances.push(qn);
    speechSynthesis.speak(qn);
    qn.onend = function () {
        if (!force){
            startTime();
        }
    };
}

function start() {
    force = false;
    document.getElementById('start').style.visibility = 'hidden';
    document.getElementById('modeToggle').style.visibility = 'hidden';
    if (mode === 'speech') {
        startTime();
    } else if (mode === 'qna') {
        readQuestion();
    }
}

function sidebar() {
    if (x) {
        document.getElementById('sidebar').style.width = '150px';
        document.getElementById('sidebarIcon').style.left = '150px';
        document.getElementsByClassName('toggle')[0].style.opacity = '1';
        document.getElementsByClassName('toggle')[1].style.opacity = '1';
        document.getElementsByClassName('toggle')[2].style.opacity = '1';
        document.getElementsByClassName('toggle')[3].style.opacity = '1';
        x = false;
    } else {
        document.getElementById('sidebar').style.width = '0px';
        document.getElementById('sidebarIcon').style.left = '0px';
        document.getElementsByClassName('toggle')[0].style.opacity = '0';
        document.getElementsByClassName('toggle')[1].style.opacity = '0';
        document.getElementsByClassName('toggle')[2].style.opacity = '0';
        document.getElementsByClassName('toggle')[3].style.opacity = '0';
        x = true;
    }
}

function changeMode() {
    if (mode === 'speech') {
        document.getElementById('modeToggle').innerHTML = 'Q&A';
        mode = 'qna';
    } else if (mode === 'qna') {
        document.getElementById('modeToggle').innerHTML = 'Speech';
        mode = 'speech';
    }
}

function changeTimer() {
    if (timer) {
        document.getElementById('timerToggle').innerHTML = 'Hide Timer';
        document.getElementById('time').style.opacity = '1';
        timer = false;
    } else {
        document.getElementById('timerToggle').innerHTML = 'Show Timer';
        document.getElementById('time').style.opacity = '0';
        timer = true;
    }
}

function changeQuestion() {
    if (qnHide) {
        document.getElementById('questionToggle').innerHTML = 'Hide Question';
        if (asking) {
            document.getElementById('question').style.opacity = '1';
        }
        qnHide = false;
    } else {
        document.getElementById('questionToggle').innerHTML = 'Show Question';
        if (asking) {
            document.getElementById('question').style.opacity = '0';
        }
        qnHide = true;
    }
}

function reset() {
    force = true;
    speechSynthesis.cancel();
    asking = 0;
    clearInterval(t);
    i = 0;
    j = 0;
    document.getElementById('reset').style.visibility = 'hidden';
    document.getElementById('start').style.visibility = 'visible';
    document.getElementById('modeToggle').style.visibility = 'visible';
    document.getElementById('time').innerHTML = '0:00';
    document.getElementById('question').innerHTML = '';
    document.getElementById('question').style.opacity = '0';
}