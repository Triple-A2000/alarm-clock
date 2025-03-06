"use strict";

const clockDisplay = document.querySelector("h1");
const alarmIcon = document.querySelector(".fa-bell");
const alarmText = document.querySelector(".alarm-set p");
const hourInput = document.querySelector(".hour");
const minuteInput = document.querySelector(".minutes");
const setAlarmButton = document.querySelector(".set-alarm-button");
let alarmTime = null;
let alarmTimeout;
const alarmSound = new Audio("./asset/audio/alarm.mp3");


function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    clockDisplay.innerText = `${hours}:${minutes}`;

    if (alarmTime && hours === alarmTime.hours && minutes === alarmTime.minutes) {
        triggerAlarm();
    }
}

setInterval(updateClock, 1000);

setAlarmButton.addEventListener("click", function() {
    const hours = hourInput.value.padStart(2, "0");
    const minutes = minuteInput.value.padStart(2, "0");
    
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        alarmText.innerText = "Invalid time!";
        return;
    }

    alarmTime = { hours, minutes };
    alarmText.innerText = `${hours}:${minutes}`;
    alarmText.style.color = "rgb(255, 255, 255)";
    alarmIcon.style.color = "rgb(65, 83, 116)";
});

function triggerAlarm() {
    alarmText.innerText = "Alarm Ringing!";
    alarmText.style.color = "rgb(65, 83, 116)";
    alarmIcon.classList.add("fa-shake");
    alarmSound.play();
    setTimeout(stopAlarm, 30000); 
}

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    alarmIcon.classList.remove("fa-shake");
    alarmText.innerText = "";
    alarmTime = null;
}
