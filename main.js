/*jslint plusplus: true */
var x = true;
var mode = 'speech';
var timer = true;
var min = 0, sec = '00';
var i = 0, j = 0, t;
var ding = new Audio('ding.wav');

window.onload = function () {
    document.getElementById('time').innerHTML = min + ':' + sec;
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

function start() {
    ding.play();
    document.getElementById('start').style.visibility = 'hidden';
    document.getElementById('mode').style.visibility = 'hidden';
    t = setInterval(increaseTime, 1000);
}

function sidebar() {
    if (x) {
        document.getElementById('sidebar').style.width = '150px';
        document.getElementById('sidebarIcon').style.left = '150px';
        document.getElementsByClassName('toggle')[0].style.opacity = '1';
        document.getElementsByClassName('toggle')[1].style.opacity = '1';
        document.getElementsByClassName('toggle')[2].style.opacity = '1';
        x = false;
    } else {
        document.getElementById('sidebar').style.width = '0px';
        document.getElementById('sidebarIcon').style.left = '0px';
        document.getElementsByClassName('toggle')[0].style.opacity = '0';
        document.getElementsByClassName('toggle')[1].style.opacity = '0';
        document.getElementsByClassName('toggle')[2].style.opacity = '0';
        x = true;
    }
}

function changeMode() {
    if (mode === 'speech') {
        document.getElementById('mode').innerHTML = 'Q&A';
        mode = 'qna';
    } else if (mode === 'qna') {
        document.getElementById('mode').innerHTML = 'Speech';
        mode = 'speech';
    }
}

function changeTimer() {
    if (timer) {
        document.getElementById('timer').innerHTML = 'Hide Timer';
        document.getElementById('time').style.opacity = '1';
        timer = false;
    } else {
        document.getElementById('timer').innerHTML = 'Show Timer';
        document.getElementById('time').style.opacity = '0';
        timer = true;
    }
}

function reset() {
    clearInterval(t);
    i = 0
    j = 0
    document.getElementById('reset').style.visibility = 'hidden';
    document.getElementById('start').style.visibility = 'visible';
    document.getElementById('mode').style.visibility = 'visible';
    document.getElementById('time').innerHTML = '0:00';
}