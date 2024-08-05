let zCounter = 0;
let xCounter = 0;
// let time = 10;

// startCountdown(10);

let timed = false;
let desiredTime = 10;

// - document.addEventListener("keydown", (event)) wasn't good

document.addEventListener("keydown", (event) => {
  if (event.key == "z" || event.key == "x") {
    if (event.key == "z") {
      zCounter++;
    } else if (event.key == "x") {
      xCounter++;
    }
    if (!timed) {
      startCountdown(10);
    }
  }
});

document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("reset-osu").addEventListener("click", resetTimer);

// * Passing a function with a parameter into another function
document.getElementById("reset-osu").addEventListener("mouseover", () => {
  let timeout = setTimeout(() => {
    enablePulseOut(500, "circle"); // - This can also be 1000
  }, 195);
});

// - Do a fade and stacking effect here
// document.getElementById("reset-osu").addEventListener("mouseover", () => {
//   let timeout = setTimeout(() => {
//     enablePulseOut(1000, "circle1");
//   }, 695);
// });

// document.getElementById("reset-osu").addEventListener("mouseover", () => {
//   let timeout = setTimeout(() => {
//     enablePulseOut(1000, "circle2");
//   }, 1195);
// });
// document.getElementById("reset-osu").addEventListener("mouseover", () => {
//   let timeout = setTimeout(() => {
//     enablePulseOut(1000);
//   }, 195);
// document.getElementById("reset-osu");
// .addEventListener("mouseleave", clearInterval(timeout));
// - Fix the delay duration
// enablePulseOut(500);
// });
// * Turning off the animation
document
  .getElementById("reset-osu")
  .addEventListener("mouseleave", disablePulseOut);

// * Defining functions below

function enablePulseOut(animationDuration, id) {
  if (!animationDuration) {
    animationDuration = 500;
  }
  document.getElementById(
    id
  ).style.animation = `pulse-out ${animationDuration}ms infinite`;
}

function disablePulseOut() {
  document.getElementById("circle").style.animation = "";
  setTimeout(function () {
    document.getElementById("circle").style.animation = "";
  }, 196);
}

function resetTimer() {
  document.getElementById(
    "timer"
  ).innerHTML = `<b>Time left:</b> ${desiredTime}`;
  timed = false;
  zCounter = 0;
  xCounter = 0;
  document.getElementById("zCounter").innerHTML = `<b>z count:</b> ${zCounter}`;
  document.getElementById("xCounter").innerHTML = `<b>x count:</b> ${xCounter}`;
  document.getElementById(
    "timer"
  ).innerHTML = `<b>Time left:</b> ${desiredTime}`;
  // TODO: Also reset zCounter and xCounter
}

function startCountdown(givenTime) {
  // * If we've already timed, then don't start timer again until reset
  if (timed) {
    return;
  }
  desiredTime = givenTime;
  timed = true;
  //   let zCounter = 0;
  //   let xCounter = 0;
  let timeLeft = givenTime;
  let myInterval = setInterval(function () {
    // * What to do when timer hits 0
    if (timeLeft <= 0 || !timed) {
      // * Display end CPS
      document.getElementById("cps").innerHTML = `<b>Clicks per second:</b> ${
        (zCounter + xCounter) / desiredTime
      }`;

      // * Change timer because timer doesn't end up at 0 naturally
      document.getElementById("timer").innerHTML = `<b>Time left:</b> ${0}`;
      clearInterval(myInterval);
      return;
    }

    // * Display time left
    document.getElementById(
      "timer"
    ).innerHTML = `<b>Time left:</b> ${timeLeft}`;
    timeLeft = timeLeft - 0.1;
    // - Rounding a number here. Is this good?
    timeLeft = Math.round(timeLeft * 100) / 100;

    // * Display key counts
    document.getElementById(
      "zCounter"
    ).innerHTML = `<b>z count:</b> ${zCounter}`;
    document.getElementById(
      "xCounter"
    ).innerHTML = `<b>x count:</b> ${xCounter}`;

    // * Display CPS live ?
    document.getElementById("cps").innerHTML = `<b>Clicks per second:</b> ${
      Math.round(((zCounter + xCounter) / (desiredTime - timeLeft)) * 100) / 100
    }`;
  }, 100);
}

function countKeys() {
  document.addEventListener("keydown", (event) => {
    if (event.key == "z") {
      zCounter++;
    } else if (event.key == "x") {
      xCounter++;
    }
  });
}
