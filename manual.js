// ===============================
// CONFIGURE TAG NUMBERS
// ===============================

const MAJOR_AWARD_TAGS = ["99"];     // <-- Your grand prize tag(s)
const WINNER_TAGS = ["01", "02", "03"]; // <-- Your 3 normal winners

// ===============================
// Visual effects
// (Same as nfcgame.js)
// ===============================

function launchConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      spread: 70,
      origin: { x: Math.random(), y: Math.random() * 0.4 },
    });

    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

function launchFireworks() {
  const duration = 2500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 10, angle: 60, spread: 55, origin: { x: 0, y: 0.7 } });
    confetti({ particleCount: 10, angle: 120, spread: 55, origin: { x: 1, y: 0.7 } });

    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// ===============================
// UI update functions
// ===============================

function showWinner(tag) {
  document.body.className = "state-winner";
  document.getElementById("tag-number").textContent = `Tag ${tag}`;
  document.getElementById("symbol").textContent = "✔";
  document.getElementById("main-message").textContent = "WINNER!";
  document.getElementById("mini-row").innerHTML = "";
  launchConfetti();
}

function showMajorAward(tag) {
  document.body.className = "state-major";
  document.getElementById("tag-number").textContent = `Tag ${tag}`;
  document.getElementById("symbol").textContent = "!";
  document.getElementById("main-message").textContent = "MAJOR AWARD!";
  document.getElementById("mini-row").innerHTML = "";
  launchFireworks();
}

function showLoser(tag) {
  document.body.className = "state-loser";
  document.getElementById("tag-number").textContent = `Tag ${tag}`;
  document.getElementById("symbol").textContent = "✖";
  document.getElementById("main-message").textContent = "LOSER!";

  const row = document.getElementById("mini-row");
  row.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const span = document.createElement("span");
    span.textContent = "x";
    span.className = "mini-x";
    row.appendChild(span);
  }
}

// ===============================
// MAIN LOGIC: manual input
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("revealBtn");

  button.addEventListener("click", () => {
    const input = document.getElementById("tagInput").value.trim();

    if (input === "") {
      alert("Please enter a tag number");
      return;
    }

    // normalize to 2 digits
    const tag = input.padStart(2, "0");

    if (MAJOR_AWARD_TAGS.includes(tag)) {
      showMajorAward(tag);
    } else if (WINNER_TAGS.includes(tag)) {
      showWinner(tag);
    } else {
      showLoser(tag);
    }
  });
});
