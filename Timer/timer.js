let countdown;
let timer;
let paused = false;
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resumeButton = document.getElementById("resumeButton");
const stopButton = document.getElementById("stopButton");

document.getElementById("timer").addEventListener("input", function (e) {
  var value = e.target.value.replace(/:/g, "");
  if (value.length > 6) {
    value = value.slice(0, 6);
  }
  var output = "";
  if (value.length === 3) {
    output = value[0] + ":" + value.slice(1);
  } else {
    var parts = value.match(/(\d{0,2})(\d{0,2})?(\d{0,2})?/);
    if (parts[1]) output += parts[1];
    if (parts[2]) output += ":" + parts[2];
    if (parts[3]) output += ":" + parts[3];
  }
  e.target.value = output;
});

const startTimer = () => {
  let timerValue = document.getElementById("timer").value;
  document.getElementById("timer").disabled = true;
  startButton.style.display = "none";
  pauseButton.style.display = "inline";
  stopButton.style.display = "inline";

  let match = timerValue.match(/(\d{1,2}):?(\d{0,2})?:?(\d{0,2})?/);
  if (match) {
    let hours = match[3] ? parseInt(match[1], 10) : 0;
    let minutes = match[3]
      ? parseInt(match[2], 10)
      : match[2]
      ? parseInt(match[1], 10)
      : 0;
    let seconds = match[3]
      ? parseInt(match[3], 10)
      : match[2]
      ? parseInt(match[2], 10)
      : parseInt(match[1], 10);

    let duration = hours * 3600 + minutes * 60 + seconds;
    timer = duration;
    let hrs, mins, secs;
    if (countdown) clearInterval(countdown);
    countdown = setInterval(() => {
      if (!paused) {
        hrs = parseInt(timer / 3600, 10);
        mins = parseInt((timer % 3600) / 60, 10);
        secs = parseInt(timer % 60, 10);

        hrs = hrs < 10 ? "0" + hrs : hrs;
        mins = mins < 10 ? "0" + mins : mins;
        secs = secs < 10 ? "0" + secs : secs;

        document.getElementById("timer").value = hrs + ":" + mins + ":" + secs;

        if (--timer < 0) {
          timer = duration;
          clearInterval(countdown);
          alert("Time is up!");
          startButton.style.display = "inline";
          pauseButton.style.display = "none";
          resumeButton.style.display = "none";
          stopButton.style.display = "none";
          document.getElementById("timer").disabled = false;
        }
      }
    }, 1000);
  } else {
    alert("Invalid time format. Please enter time as HH:MM:SS");
  }
};

const pauseTimer = () => {
  paused = true;
  pauseButton.style.display = "none";
  resumeButton.style.display = "inline";
};

const resumeTimer = () => {
  paused = false;
  resumeButton.style.display = "none";
  pauseButton.style.display = "inline";
};

const stopTimer = () => {
  clearInterval(countdown);
  document.getElementById("timer").value = "00:00:00";
  document.getElementById("timer").disabled = false;
  startButton.style.display = "inline";
  pauseButton.style.display = "none";
  resumeButton.style.display = "none";
  stopButton.style.display = "none";
};
