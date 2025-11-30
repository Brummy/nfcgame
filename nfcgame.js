/* ===============================
   CONFIGURATION – CHANGE THESE
================================= */
const WINNING_TAGS = ["00", "14", "22", "31"];  // <-- edit winner tag list here
const GRAND_PRIZE_TAG = "40";                  // <-- edit grand prize tag here
const WINNER_VIDEO_ID = "OItP8-_mjXw";         // <-- change winner youtube video ID here
const LOSER_VIDEO_ID  = "3UC96g1A4Nc";         // <-- change loser video ID here if desired
/* ========================================================== */

// Read NFC tag from URL parameter
const params = new URLSearchParams(window.location.search);
const tag = params.get("tag") || "";

const countdownEl = document.getElementById("countdown");
const resultEl = document.getElementById("result");

// Wipe the visible parameter so URL stays clean
if (params.has("tag")) {
  history.replaceState({}, "", window.location.pathname);
}

// Countdown logic 3-2-1 displayed on screen
let num = 3;
const interval = setInterval(() => {
  countdownEl.textContent = num;
  num--;
  if (num < 0) {
    clearInterval(interval);
    countdownEl.textContent = ""; // clear the countdown
    showResult(tag);
  }
}, 1000);

function showResult(tag) {
  resultEl.innerHTML = "";

  if (!tag) {
    resultEl.textContent = "No tag scanned yet…";
    return;
  }

  // Grand Prize winner shows Major Award
  if (tag === GRAND_PRIZE_TAG) {
    resultEl.innerHTML = `
      <div class="major-award">MAJOR AWARD!</div>
      <iframe 
        src="https://www.youtube.com/embed/${WINNER_VIDEO_ID}?autoplay=1&playsinline=1&mute=0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    `;
    confetti({ particleCount: 200, spread: 190, origin: {y:0.6}});
    return;
  }

  // Normal winner
  if (WINNING_TAGS.includes(tag)) {
    resultEl.innerHTML = `
      <div id="winnerText">Number ${tag}, Winner!</div>
      <div class="big-check">✔</div>
      <iframe 
        src="https://www.youtube.com/embed/${WINNER_VIDEO_ID}?autoplay=1&playsinline=1&mute=0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    `;
    confetti({ particleCount: 120, spread: 160, origin: {y:0.6}});
  }

  // Loser
  else {
    resultEl.innerHTML = `
      <div id="loserText">Number ${tag}</div>
      <div class="flashingX">X</div>
      <div id="loserText">LOSER!!</div>
      <iframe 
        src="https://www.youtube.com/embed/${LOSER_VIDEO_ID}?autoplay=1&playsinline=1&mute=0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    `;
  }
}
