/* ==========================================
   CONFIG SECTION — EDIT THESE
============================================ */

// Normal winners (tag numbers you programmed)
const WINNERS = ["00", "14", "22", "31"];  // edit as needed

// Grand Prize winning tag number (only 1)
const GRAND_PRIZE = "22";   // CHANGE THIS to your real tag

/* ==========================================
   READ TAG FROM URL
============================================ */

const params = new URLSearchParams(window.location.search);
const tag = params.get("tag") || "";

// Reset to clean / conference-friendly domain URL, no param trails
if (tag) {
  history.replaceState({}, "", window.location.pathname);
}

/* ==========================================
   AUDIO SETUP
============================================ */
const winnerSound = new Audio("https://cdn.pixabay.com/audio/2022/03/24/audio_cha_ching.mp3");
const loserSound  = new Audio("https://cdn.pixabay.com/audio/2022/04/27/audio_glitch_fail.mp3");

/* ==========================================
   CONFETTI SETUP
============================================ */
function runConfetti() {
  if (!("confetti" in window)) {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    s.onload = () => confetti({ particleCount: 120, spread: 160, origin: { y: 0.5 } });
    document.head.appendChild(s);
  } else {
    confetti({ particleCount: 120, spread: 160, origin: { y: 0.5 } });
  }
}

/* ==========================================
   COUNTDOWN + RESULT LOGIC
============================================ */
document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main");

  // If no tag present yet, show default
  if (!tag) {
    main.innerHTML = `<h1 class="title">Tap a tag to begin...</h1>`;
    return;
  }

  function showResult() {
    // GRAND PRIZE HAS PRIORITY
    if (tag === GRAND_PRIZE) {
      main.innerHTML = `
        <div class="grand-prize-text">MAJOR AWARD!</div>
        <div class="major-award">
          <iframe
            src="https://www.youtube.com/embed/OItP8-_mjXw?autoplay=1&playsinline=1&mute=0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
      `;
      winnerSound.play();
      setTimeout(runConfetti, 400);
      return;
    }

    // WINNER OR LOSER
    if (WINNERS.includes(tag)) {
      main.innerHTML = `
        <div class="nfcTagDisplay">Number ${tag}</div>
        <div class="big-check">✔</div>
        <div id="winnerText">Winner!!</div>
      `;
      winnerSound.play();
      setTimeout(runConfetti, 400);
    } else {
      main.innerHTML = `
        <div class="nfc-container">
          <div class="nfcTagDisplay">Number ${tag}</div>
          <div class="flashingX">X</div>
          <div id="loserText">LOSER!!</div>
        </div>
      `;
      loserSound.play();
    }
  }

  // RUN COUNTDOWN BEFORE REVEALING RESULT
  main.innerHTML = `<div id="countdown" class="countdown">3</div>`;
  let i = 3;

  const timer = setInterval(() => {
    main.querySelector("#countdown").textContent = i;
    i--;
    if (i < 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
});
