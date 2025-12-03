/* ============================
   🔧 EDIT ONLY THIS SECTION
   ============================ */

// Winning, losing, and major award tag numbers:
const winners = ["00", "14", "22", "31"]; // ← EDIT your winning tag numbers
const majorPrize = "40";                  // ← EDIT your one grand-prize tag number

// YouTube Video IDs for each result screen:
const winnerVideoID = "9g3--WyItKU"; // ← EDIT to valid YouTube ID for winner clip
const loserVideoID  = "3UC96g1A1Nc"; // ← EDIT to valid YouTube ID for loser clip
const majorVideoID  = "OItP8-_mjXw"; // ← EDIT to valid YouTube ID for Major Award clip

/* ============================
   ✅ DO NOT EDIT BELOW
   ============================ */

const params = new URLSearchParams(window.location.search);
const tag = params.get("tag");

document.addEventListener("DOMContentLoaded", () => {
  const cd  = document.getElementById("countdown");
  const tagDisplay = document.getElementById("tagDisplay");
  const icon = document.getElementById("resultIcon");
  const txt  = document.getElementById("resultText");
  const buttonHolder = document.getElementById("reveal-container");
  const play = document.getElementById("playBtn");

  // Default state if no tag scanned yet
  if (!tag) {
    tagDisplay.textContent = "No tag scanned yet...";
    cd.remove();
    play.style.display = "none";
    return;
  }

  // Show tag number when page loads
  tagDisplay.textContent = `Number ${tag}`;

  // Play correct video with audio only after tap
  play.addEventListener("click", () => {
    play.remove();

    let videoID;
    let resultText;

    if (tag === majorPrize) {
      videoID = majorVideoID;
      resultText = "<div class='bigGoldBang'>!</div><div style='font-size:2.5em;color:gold;'>Major Award!</div>";
    } else if (winners.includes(tag)) {
      videoID = winnerVideoID;
      resultText = "<div class='bigGreenCheck'>✔</div><div style='font-size:2.5em;color:#00ff0a;'>Winner!</div>";
      setTimeout(runConfetti, 300);
    } else {
      videoID = loserVideoID;
      resultText = "<div class='bigRedX'>X</div><div style='font-size:2.5em;color:red;'>Loser!</div>";
    }

    icon.innerHTML = resultText;
    txt.innerHTML  = resultText + "<div>🎁 Free Steal!</div>";

    // Embed YouTube (auto-plays with sound)
    buttonHolder.innerHTML = `<iframe width="100%" height="100%" style="position:fixed;top:0;left:0;width:100vw;height:40vh;z-index:10"
    src="https://www.youtube.com/embed/${videoID}?autoplay=1&playsinline=1&mute=0"
    frameborder="0"
    allow="autoplay; encrypted-media; picture-in-picture"
    allowfullscreen></iframe>`;

    // Insert Reveal button only after video begins
    setTimeout(() => {
      buttonHolder.innerHTML += `<button id="revealBtn">🎁 Reveal Result</button>`;
      document.getElementById("revealBtn").addEventListener("click", startReveal);
    }, 700);
  });

  function startReveal() {
    let count = 3;
    cd.textContent = count;
    cd.style.display = "block";
    cd.style.animation = "flash 0.6s infinite alternate";
    cd.style.fontSize = "8em";

    const timer = setInterval(() => {
      count--;
      cd.textContent = count;
      if (count <= 0) {
        clearInterval(timer);
        cd.remove();
        updateUI();
      }
    }, 1000);
  }

  function runConfetti() {
    if (typeof confetti === "function") {
      confetti({ particleCount:200, spread:170, angle:-90, origin:{x:0.5,y:0.35}});
    }
  }

  function updateUI() {
    if (tag === majorPrize) {
      // Major award visuals
      document.body.innerHTML = `
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;width:100vw;text-align:center;background:black;color:gold">
        <div style="font-size:2.5em">Number ${tag}</div>
        <div class="bigGoldBang">!</div>
        <div id="majorLabel" style="font-size:3em">🥇 Major Award!</div>
        </div>
      `;
      runFireworks();
    } else if (winners.includes(tag)) {
      // Winner visuals
      document.body.innerHTML = `
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;width:100vw;text-align:center;background:black;color:#00ff0a">
        <div style="font-size:2.5em">Number ${tag}</div>
        <div class="bigGreenCheck">✔</div>
        <div id="winnerLabel" style="font-size:3em">Winner!</div>
        </div>
      `;
      runConfetti();
    } else {
      // Loser visuals
      document.body.innerHTML = `
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;width:100vw;text-align:center;background:black;color:red">
        <div style="font-size:2.5em">Number ${tag}</div>
        <div class="bigRedX">X</div>
        <div id="loserLabel" style="font-size:3em">LOSER!</div>
        </div>
      `;
    }
  }

  function runFireworks() {
    if (typeof confetti === "function") {
      const end = Date.now() + 2600;
      (function frame(){
        confetti({particleCount:12,angle:60,spread:90,origin:{x:0,y:0.4}});
        confetti({particleCount:12,angle:120,spread:90,origin:{x:1,y:0.4}});
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  }

  function runFireworks() {
    const end = Date.now() + 2600;
    (function boom(){
      confetti({particleCount:25,spread:120,angle:-90,origin:{x:Math.random(),y:0}});
      if (Date.now() < end) requestAnimationFrame(boom);
    })();
  }

  var confettiScript = document.createElement("script");
  confettiScript.src =
    "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
  document.head.appendChild(confettiScript);
});
