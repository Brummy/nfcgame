/* ===============================
   WINNING TAG NUMBERS
================================= */
const winners = ["7", "14", "22", "31"]; // <-- change as needed
const ALREADY_SHOWN_KEY = "shown_winners_once";

/* ===============================
   READ TAG FROM URL
================================= */
const params = new URLSearchParams(window.location.search);
const tag = params.get("tag");
const msg = document.getElementById("message");
const sidebar = document.getElementById("sidebar");
const winnerList = document.getElementById("winnerList");

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
      particleCount: 6,
      angle: Math.random() * 360,
      spread: 70,
      origin: {
        x: Math.random(),
        y: Math.random() - 0.2
      }
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/* ===============================
   PAGE LOGIC
================================= */
document.addEventListener("DOMContentLoaded", function () {

  if (!tag) {
    msg.innerHTML = "<h1>No tag detected.</h1>";
    return;
  }

  if (winners.includes(tag)) {
    msg.innerHTML = `<div id="winnerText">FREE STEAL!</div>`;

    setTimeout(runConfetti, 300);

    const already = localStorage.getItem(ALREADY_SHOWN_KEY);
    if (!already) {
      sidebar.style.display = "block";
      winnerList.innerHTML = winners.map(n => `<div>Tag #${n}</div>`).join("");
      localStorage.setItem(ALREADY_SHOWN_KEY, "yes");
    }

  } else {
    msg.innerHTML = `
      <div class="flashingX">X</div>
      <div id="loserText">LOSER!</div>
    `;
  }
});
