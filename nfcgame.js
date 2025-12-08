// ===============================
// CONFIGURE YOUR TAG NUMBERS HERE
// ===============================
//
// Replace these placeholder values with the SAME numbers you used before.
// Use zero-padded strings if your URLs are like ?tag=01, ?tag=02, etc.

const MAJOR_AWARD_TAGS = ["99"]; // <-- Grand prize tag(s), e.g. ["37"]
const WINNER_TAGS = ["01", "02", "03"]; // <-- Your 3 normal winners
// Anything not in the above lists becomes a Loser.

// ===============================
// Utility: get tag parameter from URL
// ===============================
function getTagFromUrl() {
  const params = new URLSearchParams(window.location.search);
  let tag = params.get("tag");

  if (!tag) {
    return null;
  }

  tag = tag.trim();

  // Normalize to 2-digit strings if numeric
  if (/^\d+$/.test(tag)) {
    const num = parseInt(tag, 10);
    if (!isNaN(num)) {
      tag = num.toString().padStart(2, "0");
    }
  }

  return tag;
}

// ===============================
// Visual effects
// ===============================

// Confetti for normal winners
function launchConfetti() {
  if (typeof confetti !== "function") return;

  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    // Random sides
    confetti({
      particleCount: 4,
      spread: 70,
      origin: { x: Math.random(), y: Math.random() * 0.4 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Fireworks-style bursts for Major Award
function launchFireworks() {
  if (typeof confetti !== "function") return;

  const duration = 2500;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 10,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
    });
    confetti({
      particleCount: 10,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// ===============================
// UI update functions
// ===============================
function showNoTag() {
  const tagEl = document.getElementById("tag-number");
  const symbolEl = document.getElementById("symbol");
  const msgEl = document.getElementById("main-message");
  const miniRowEl = document.getElementById("mini-row");

  document.body.className = "state-none";

  tagEl.textContent = "No tag scanned yet";
  symbolEl.textContent = "?";
  msgEl.textContent = "Scan your tag";
  miniRowEl.innerHTML = "";
}

function showWinner(tag) {
  const tagEl = document.getElementById("tag-number");
  const symbolEl = document.getElementById("symbol");
  const msgEl = document.getElementById("main-message");
  const miniRowEl = document.getElementById("mini-row");

  document.body.className = "state-winner";

  tagEl.textContent = `Tag ${tag}`;
  symbolEl.textContent = "✔";
  msgEl.textContent = "WINNER!";
  miniRowEl.innerHTML = "";

  launchConfetti();
}

function showMajorAward(tag) {
  const tagEl = document.getElementById("tag-number");
  const symbolEl = document.getElementById("symbol");
  const msgEl = document.getElementById("main-message");
  const miniRowEl = document.getElementById("mini-row");

  document.body.className = "state-major";

  tagEl.textContent = `Tag ${tag}`;
  symbolEl.textContent = "!";
  msgEl.textContent = "MAJOR AWARD!";
  miniRowEl.innerHTML = "";

  launchFireworks();
}

function showLoser(tag) {
  const tagEl = document.getElementById("tag-number");
  const symbolEl = document.getElementById("symbol");
  const msgEl = document.getElementById("main-message");
  const miniRowEl = document.getElementById("mini-row");

  document.body.className = "state-loser";

  tagEl.textContent = `Tag ${tag}`;
  symbolEl.textContent = "✖";
  msgEl.textContent = "LOSER!";

  // Smaller flashing x's
  const count = 8;
  miniRowEl.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.textContent = "x";
    span.className = "mini-x";
    miniRowEl.appendChild(span);
  }
}

// ===============================
// Main entry
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const tag = getTagFromUrl();

  if (!tag) {
    showNoTag();
    return;
  }

  if (MAJOR_AWARD_TAGS.includes(tag)) {
    showMajorAward(tag);
  } else if (WINNER_TAGS.includes(tag)) {
    showWinner(tag);
  } else {
    showLoser(tag);
  }
});
