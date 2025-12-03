/* ===============================
   CONFIGURATION (EDIT AS NEEDED)
================================= */

// List of winning tag numbers
const winnerTags = ["00", "14", "22", "31"];  // <-- EDIT your winner tags here

// One grand prize winner tag number
const majorAwardTag = "40";                  // <-- EDIT your Major Award tag here

// Optional YouTube video IDs if you want to use embeds later (currently unused)
// leaving placeholders so you know where they go if you re-add embeds
const winnerVideoID = "9g3--WyItKU";         // <-- Not used right now
const loserVideoID  = "3UC96g1A4Nc";         // <-- Not used right now
const awardVideoID  = "OItP8-_mjXw";         // <-- Not used right now

/* ===============================
   READ TAG FROM URL
================================= */

// Parse tag from URL (example: yourname.github.io/nfcgame/?tag=00)
const params = new URLSearchParams(window.location.search);
const tag = params.get("tag");

// Hide the ?tag=xx param so the URL bar stays clean
if (tag) {
  history.replaceState({}, "", window.location.pathname);
}

/* ===============================
   CONFETTI & FIREWORK EFFECTS
================================= */

// Confetti for winners
function triggerConfetti() {
  const end = Date.now() + 3000;
  (function frame() {
    confetti({ particleCount: 5, spread: 50, origin: {x: 0.5, y: 0.5} });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// Fireworks for the Major Award screen
function triggerFireworks() {
  const end = Date.now() + 3500;
  (function frame() {
    confetti({ particleCount: 9, spread: 120, startVelocity: 30, origin: {x: Math.random(), y: Math.random() - 0.2} });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/* ===============================
   SHOW RESULT SCREENS
================================= */

function showWinnerScreen(num) {
  document.body.style.background = "#e6ffe6";
  document.getElementById("message").innerHTML = `
    <div class="resultTag">Number ${num}</div>
    <div class="checkMark">✔</div>
    <div class="winnerLabel">WINNER!!</div>
  `;
  triggerConfetti();
}

function showLoserScreen(num) {
  document.body.style.background = "#ffe6e6";
  document.getElementById("message").innerHTML = `
    <div class="resultTag">Number ${num}</div>
    <div class="bigX">✖</div>
    <div class="loserLabel">LOSER!!</div>
  `;
}

function showMajorAwardScreen(num) {
  document.body.style.background = "#111";
  document.getElementById("message").innerHTML = `
    <div class="resultTag">Tag ${num}</div>
    <div class="majorAwardBang">❗</div>
    <div class="majorAwardText">MAJOR AWARD!!!</div>
  `;
  triggerFireworks();
}

/* ===============================
   HANDLE COUNTDOWN + REVEAL FLOW
================================= */

function startCountdown(resultCallback) {
  const messageBox = document.getElementById("message");
  let count = 3;
  messageBox.innerHTML = `<div id="countdown">${count}</div>`;
  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      messageBox.innerHTML = `<div id="countdown">${count}</div>`;
    } else {
      clearInterval(timer);
      resultCallback();
    }
  }, 900);
}

/* ===============================
   INIT PAGE STATE
================================= */

// Make sure confetti library is loaded
console.log("✅ NFC Game JS Loaded");

document.addEventListener("DOMContentLoaded", function() {

  const messageBox = document.getElementById("message");

  // If no tag scanned yet, show initial state & wait
  if (!tag) {
    messageBox.innerHTML = `
      <div class="resultTag smallTag">Tag not scanned yet...</div>
      <button id="playVideoBtn" class="bigPlay">🎬 Play Video</button>
    `;
    return;
  }

  // Attach functionality to "Play Video" button
  const playBtn = document.getElementById("playVideoBtn");
  if (playBtn) {
    playBtn.addEventListener("click", function() {
      document.getElementById("revealBtn").style.display = "block";
      console.log("▶ Play Video Pressed — ready for reveal tap");
    });
  }

/* ===============================
   INIT REVEAL BUTTON
================================= */

document.addEventListener("DOMContentLoaded", function() {
  const revealBtn = document.getElementById("revealBtn");
  if (!revealBtn) {
    console.error("❌ Reveal button not found!");
    return;
  }
  revealBtn.style.display = "none"; // hidden until video plays
  revealBtn.addEventListener("click", function() {
    startCountdown(() => {
      // After countdown finishes, show result
      if (tag === majorAwardTag) {
        showMajorAwardScreen(tag);
      } else if (winnerTags.includes(tag)) {
        showWinnerScreen(tag);
      } else {
        showLoserScreen(tag);
      }
    });
  });

  console.log("✅ Reveal flow attached to Reveal button");
});
