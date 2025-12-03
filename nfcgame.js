/* ===============================
   SCREEN ELEMENTS
================================= */
const container = document.getElementById("main");
const msg = document.getElementById("message");

/* ===============================
   TAG CONFIG — EDIT THESE
================================= */
const winners = ["00", "05", "17"];      // <-- PUT ALL WINNER TAG NUMBERS HERE
const awardTag = "99";                    // <-- YOUR SINGLE GRAND PRIZE (Major Award!) TAG

/* ===============================
   OPTIONAL VIDEOS — EDIT IDs OR TEXT
================================= */
// Only used when playing a video. No sound outside YouTube audio.
const winnerVideoID = "OItP8-_mjXw";      // <-- PUT YOUR WINNER YOUTUBE VIDEO ID
const loserVideoID = "3UC96g1A4Nc";       // <-- PUT YOUR LOSER YOUTUBE VIDEO ID
const majorAwardVideoID = "tSv04ylc6To";  // <-- PUT YOUR MAJOR AWARD YOUTUBE VIDEO ID

/* ===============================
   COUNTDOWN FUNCTION (3,2,1)
================================= */
function runCountdown(callback) {
  let count = 3;
  msg.innerHTML = `<div id="countdown">${count}</div>`;

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      msg.innerHTML = `<div id="countdown">${count}</div>`;
    } else {
      clearInterval(timer);
      callback();
    }
  }, 800);
}

/* ===============================
   LOAD CONFETTI LIBRARY
================================= */
var confettiScript = document.createElement("script");
confettiScript.src =
  "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
document.head.appendChild(confettiScript);

/* ===============================
   CONFETTI FUNCTION
================================= */
function runConfetti() {
  const duration = 2500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 7,
      angle: Math.random() * 360,
      spread: 60,
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/* ===============================
   MAJOR AWARD FIREWORKS
================================= */
function runFireworks() {
  const duration = 2600;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 9,
      spread: 150,
      startVelocity: 30,
      origin: { x: Math.random(), y: Math.random() - 0.3 }
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/* ===============================
   RESULT DISPLAY BUILDERS
================================= */

function showWinner() {
  msg.innerHTML = `
    <div id="resultTag">Number ${tag}, Winner!</div>
    <div id="resultIcon">✔</div>
    <button id="revealBtn" style="display:none;">REVEAL RESULT</button>
  `;
  setTimeout(runConfetti, 400);
  setTimeout(() => document.getElementById("revealBtn").style.display = "block", 1200);
  setTimeout(() => document.getElementById("revealBtn").style.display = "none", 2500);
  setTimeout(() => {
    document.getElementById("revealBtn").style.display = "inline-block";
    document.getElementById("revealBtn").style.pointerEvents = "auto";
  }, 3500);

  document.getElementById("revealBtn").innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${winnerVideoID}?autoplay=1&mute=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      style="width:100vw; height:45vh; border:none; border-radius:0 0 20px 20px;">
    </iframe>
  `;

  document.getElementById("revealBtn").style.display = "none";
  setTimeout(() => document.getElementById("revealBtn").style.display = "block", 1000);
}

function showLoser() {
  msg.innerHTML = `
    <div id="resultTag">Number ${tag}, Loser!</div>
    <div id="resultIcon" class="flashingX">X</div>
    <div id="loserText">LOSER!!</div>
    <button id="revealBtn" style="display:none;">REVEAL RESULT</button>
  `;

  setTimeout(() => {
    document.getElementById("revealBtn").style.display = "inline-block";
    document.getElementById("revealBtn").style.pointerEvents = "auto";
  }, 2400);

  document.getElementById("revealBtn").document.getElementById("revealBtn").style.display = "inline-block";
      document.getElementById("revealBtn").style.pointerEvents = "auto";
    document.getElementById("revealBtn").innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${loserVideoID}?autoplay=1&mute=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media"
      style="width:100vw; height:45vh; border:none; border-radius:0 0 20px 20px;">
    </iframe>
  `;
}

function showMajorAward() {
  msg.innerHTML = `
    <div id="resultTag">Number ${tag}</div>
    <div id="awardIcon">❗</div>
    <div id="awardText">Major Award</div>
    <button id="revealBtn" style="display:none;">REVEAL RESULT</button>
  `;
  setTimeout(runFireworks, 300);
  setTimeout(() => document.getElementById("revealBtn").style.display = "block", 1600);

  document.getElementById("revealBtn").data -> candidates: [Keyboard@1.0.6]
  child of Arduino HID interface
      0 -> Winner
      String payload = record.getPayload(0), frameborder=0, z-index=2;
       });
document.getElementById("revealBtn").innerHTML=`
    <iframe
      src="https://www.youtube.com/embed/${majorAwardVideoID}?autoplay=1&mute=0&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      style="width:100vw; height:45vh; border:none; border-radius:0 0 20px 20px;">
    </iframe>
  `;
}

/* ===============================
   STARTUP — READ TAG & TRIGGER FLOW
================================= */
const tagParams = new URLSearchParams(window.location.search);
const tag = tagParams.get("tag");

// Clean URL after scan (no tag number visible in the address bar)
history.replaceState({}, "", window.location.pathname);

// Make sure script is loading correctly
console.log("✅ NFC game script loaded");

/* ===============================
   BUTTON-LOCKOUT PROTECTION
================================= */
let lastTapTime = 0;
const lockoutMS = 1200; // prevent duplicate taps on small bogus scans

function revealResult(result) {
  const now = Date.now();
  if (now - lastTapTime < lockoutMS) return;
  lastTapTime = now;

  document.getElementById("revealBtn").style.display = "none";

  // 3,2,1 countdown, then show result
  runCountdown(() => {
    document.getElementById("revealBtn").style.display = "none";

    // Show correct screen
    if (result === "winner") {
      container.innerHTML = `<iframe src="?tag=${tag}&state=winner" style="display:none;"></iframe>`;
      showWinner();
    }

    if (result === "loser") {
      container.innerHTML = `<iframe src="?tag=${tag}&state=loser" style="display:none;"></iframe>`;
      showLoser();
    }

    if (result === "award") {
      container.innerHTML = `<iframe src="?tag=${tag}&state=award" style="display:none;"></iframe>`;
      showMajorAward();
    }
  });
}

/* ===============================
   MAIN GAME DECISION + REVEAL TAP
================================= */
document.addEventListener("click", function() {
  if (!tag) {
    msg.innerHTML = "<h1>No tag detected.</h1>";
    return;
  }

  // Major Award gets priority
  if (tag === awardTag) {
    revealResult("award");
    return;
  }

  // Normal tags
  if (winners.includes(tag)) {
    revealResult("winner");
  } else {
    revealResult("loser");
  }
});
