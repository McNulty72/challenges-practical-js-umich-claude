const watch = document.querySelector(".watch-container");
const hours = document.querySelector(".watch-hours>span");
const minutes = document.querySelector(".watch-minutes>span");
const seconds = document.querySelector(".watch-seconds>span");
const hundredths = document.querySelector(".watch-hundredths>span");
const startBtn = document.querySelector(".start-btn");
const lapBtn = document.querySelector(".lap-btn");
const startBtnText = document.querySelector(".start-btn-text");
const lapBtnText = document.querySelector(".lap-btn-text");
const SVG_NS = "http://www.w3.org/2000/svg";
const svgEle = document.querySelector(".lucide");

// Create Icons
const playIcon = addSVGElement([createPlayIcon()], "lucide-play");
const pauseIcon = addSVGElement(
  Object.values(createPauseIcon()),
  "lucide-pause",
);
const flagIcon = addSVGElement([createFlagIcon()], "lucide-flag");
const resetIcon = addSVGElement(
  Object.values(createResetIcon()),
  "lucide-rotate-ccw",
);
const icons = {
  play: playIcon,
  pause: pauseIcon,
  flag: flagIcon,
  reset: resetIcon,
};

let timeElapsed = null;
let intervalID = null;

function formatTimeElapsed(time) {
  const totalSeconds = Math.floor(time / 1000);
  const cc = Math.floor((time % 1000) / 10);

  const hh = Math.floor(totalSeconds / 3600);
  const mm = Math.floor((totalSeconds - hh * 3600) / 60);
  const ss = Math.floor(totalSeconds - hh * 3600 - mm * 60);

  return {
    hh: hh.toString().padStart(2, 0),
    mm: mm.toString().padStart(2, 0),
    ss: ss.toString().padStart(2, 0),
    cc: cc.toString().padStart(2, 0),
  };
}

function updateElapsedTime() {
  timeElapsed += 10;
  const formatedTime = formatTimeElapsed(timeElapsed);
  hours.textContent = formatedTime.hh;
  minutes.textContent = formatedTime.mm;
  seconds.textContent = formatedTime.ss;
  hundredths.textContent = formatedTime.cc;
}

function createSVGElement(svgElement, attrs) {
  const element = document.createElementNS(SVG_NS, svgElement);
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

function addSVGElement(svgElements, classToAdd) {
  const svg = document.createElementNS(SVG_NS, "svg");
  const svgAttrs = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "0.5",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    class: "lucide preview-icon",
  };
  Object.keys(svgAttrs).forEach((key) => {
    svg.setAttribute(key, svgAttrs[key]);
  });
  svg.classList.add(classToAdd);
  for (const element of svgElements) {
    svg.append(element);
  }
  console.log(svg);
  return svg;
}

function createPauseIcon() {
  const outerRect = createSVGElement("rect", {
    x: "14",
    y: "3",
    width: "5",
    height: "18",
    rx: "1",
  });
  const innerRect = createSVGElement("rect", {
    x: "5",
    y: "3",
    width: "5",
    height: "18",
    rx: "1",
  });
  return {
    inner: innerRect,
    outer: outerRect,
  };
}

function createPlayIcon() {
  const path = createSVGElement("path", {
    d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
  });
  return path;
}

function createFlagIcon() {
  const path = createSVGElement("path", {
    d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
  });
  return path;
}

function createResetIcon() {
  const outerPath = createSVGElement("path", {
    d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
  });
  const innerPath = createSVGElement("path", { d: "M3 3v5h5" });
  return {
    inner: innerPath,
    outer: outerPath,
  };
}

function startStopWatch() {
  intervalID = setInterval(updateElapsedTime, 10);
  startBtnText.textContent = "Pause";
  lapBtn.disabled = false;
  icons.play.remove();
  startBtn.prepend(icons.pause);
  lapBtnText.textContent = "Lap";
  icons.reset.remove();
  lapBtn.prepend(icons.flag);
}

function pauseStopWatch(id) {
  clearInterval(id);
  startBtnText.textContent = "Resume";
  icons.pause.remove();
  startBtn.prepend(icons.play);
  lapBtnText.textContent = "Reset";
  icons.flag.remove();
  lapBtn.prepend(icons.reset);
}

function resumeStopWatch() {
  intervalID = setInterval(updateElapsedTime, 10);
  startBtn.textContent = "Pause";
}

function updateRecordLaps(lapTime, lapClass, lap) {
  if (lap === 1) {
    lapsTimeTrack.bestLap.time = lapTime;
    lapsTimeTrack.bestLap.lapClass = lapClass;
    lapsTimeTrack.worstLap.time = lapTime;
    lapsTimeTrack.worstLap.lapClass = lapClass;
    return;
  } else if (lap === 2) {
    if (lapTime < lapsTimeTrack.bestLap.time) {
      lapsTimeTrack.bestLap.time = lapTime;
      lapsTimeTrack.bestLap.lapClass = lapClass;
      document.querySelector(`.${lapClass}`).classList.add("best-lap");
      document.querySelector(".lap-1").classList.add("worst-lap");
    } else {
      lapsTimeTrack.worstLap.time = lapTime;
      lapsTimeTrack.worstLap.lapClass = lapClass;
      document.querySelector(`.${lapClass}`).classList.add("worst-lap");
      document.querySelector(".lap-1").classList.add("best-lap");
    }
    return;
  }
  if (lapTime < lapsTimeTrack.bestLap.time) {
    lapsTimeTrack.bestLap.time = lapTime;
    document
      .querySelector(`.${lapsTimeTrack.bestLap.lapClass}`)
      .classList.remove("best-lap");
    document.querySelector(`.${lapClass}`).classList.add("best-lap");
    lapsTimeTrack.bestLap.lapClass = lapClass;
  } else if (lapTime > lapsTimeTrack.worstLap.time) {
    lapsTimeTrack.worstLap.time = lapTime;
    document
      .querySelector(`.${lapsTimeTrack.worstLap.lapClass}`)
      .classList.remove("worst-lap");
    document.querySelector(`.${lapClass}`).classList.add("worst-lap");
    lapsTimeTrack.worstLap.lapClass = lapClass;
  }
}

const lapsContainer = document.querySelector(".laps-container");
let lapStartTime = 0;
let lapEndTime = 0;
let lapsCount = 0;
const lapsTimeTrack = {
  bestLap: { time: "0", lapClass: "" },
  worstLap: { time: "0", lapClass: "" },
};
function addLap() {
  lapEndTime = timeElapsed;
  const lapTime = formatTimeElapsed(lapEndTime - lapStartTime);
  lapsCount++;
  const lapDiv = document.createElement("div");
  lapDiv.classList.add(`lap-${lapsCount}`);
  const spanLapNumber = document.createElement("span");
  const spanLapTime = document.createElement("span");
  const spanTotalTime = document.createElement("span");
  spanLapNumber.textContent = `${lapsCount}`;
  spanLapTime.textContent = `${lapTime.hh}:${lapTime.mm}:${lapTime.ss}:${lapTime.cc}`;
  const totalTimeFomatted = formatTimeElapsed(lapEndTime);
  spanTotalTime.textContent = `${totalTimeFomatted.hh}:${totalTimeFomatted.mm}:${totalTimeFomatted.ss}:${totalTimeFomatted.cc}`;
  lapDiv.append(spanLapNumber);
  lapDiv.append(spanLapTime);
  lapDiv.append(spanTotalTime);
  lapsContainer.prepend(lapDiv);
  lapStartTime = lapEndTime;
  updateRecordLaps(spanLapTime.textContent, `lap-${lapsCount}`, lapsCount);
  // if (lapsCount == 1) {
  //   lapsTimeTrack.bestLap.time = spanTotalTime.textContent;
  //   lapsTimeTrack.bestLap.lapClass = `lap-${lapsCount}`;
  //   lapsTimeTrack.worstLap.time = spanTotalTime.textContent;
  //   lapsTimeTrack.worstLap.lapClass = `lap-${lapsCount}`;
  // } else if (lapsCount >= 2) {
  // }
  // console.log("Lap added...");
}

function resetStopWatch(id) {
  clearInterval(id);
  timeElapsed = 0;
  lapStartTime = 0;
  lapEndTime = 0;
  lapsCount = 0;
  lapsContainer.innerHTML = "";
  hours.textContent = "00";
  minutes.textContent = "00";
  seconds.textContent = "00";
  hundredths.textContent = "00";
  lapBtnText.textContent = "Lap";
  icons.reset.remove();
  lapBtn.prepend(icons.flag);
  lapBtn.disabled = true;
  startBtnText.textContent = "Start";
  console.log("Stowatch have been reset...");
}

const buttonsActions = {
  start: startStopWatch,
  pause: pauseStopWatch,
  resume: startStopWatch,
  lap: addLap,
  reset: resetStopWatch,
};

function stopWatchManage(event) {
  console.log(event.currentTarget.textContent);
  const targetText = event.target.textContent.trim().toLowerCase();
  buttonsActions[targetText](intervalID);
}

startBtn.addEventListener("click", stopWatchManage);
lapBtn.addEventListener("click", stopWatchManage);
startBtn.prepend(icons.play);
lapBtn.prepend(icons.flag);
