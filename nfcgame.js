/* ====== EDIT CONFIG BELOW ====== */
const winners = ["00", "14", "22", "31"]; // winning tags
const majorPrize = "40";                  // grand prize tag
/* ================================= */

document.addEventListener("DOMContentLoaded", () => {
  const tag  = new URLSearchParams(location.search).get("tag");

  const container = document.getElementById("main");
  const countdown = document.createElement("div");
  countdown.id = "countdown";
  container.appendChild(countdown);

  if (!tag) {
    document.getElementById("tagDisplay").textContent = "No tag scanned yet...";
    return;
  }
  document.getElementById("tagDisplay").textContent = `Number ${tag}`;

  // Build iframe
  const iframe = document.createElement("iframe");
  iframe.id = "ytFrame";
  iframe.width = "100%";
  iframe.height = "350";
  iframe.style = "border:none;position:fixed;top:0;left:0;width:100vw;height:40vh;z-index:10";
  iframe.allow = "autoplay; encrypted-media; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.src = `https://www.youtube.com/embed/${loserVideoID}?playsinline=1`; // default filler, overwritten below

  // RESULT SELECTOR AFTER VIDEO STARTS to reveal
  const revealHolder = document.getElementById("reveal-container");

  // Kick off YouTube after button tap
  document.getElementById("playBtn").addEventListener("click", () => {
    document.getElementById("playBtn").remove(); // remove play button after tap

    // Decide result and correct video
    let videoID, iconHTML, textHTML;

    if (tag === majorPrize) {
      videoID = majorVideoID;
      iconHTML = `<div class="bigGoldBang">!</div>`;
      textHTML = `<div class="majorLabel">🏆 MAJOR AWARD</div>`;
    } else if (winners.includes(tag)) {
      videoID = winnerVideoID;
      iconHTML = `<div class="bigGreenCheck">✔</div>`;
      textHTML = `<div class="winnerLabel">WINNER</div>`;
    } else {
      videoID = loserVideoID;
      iconHTML = `<div class="bigRedX">X</div>`;
      textHTML = `<div class="loserLabel">LOSER!</div>`;
    }

    // Update iframe to correct video
    iframe.src = `https://www.youtube.com/embed/${videoID}?autoplay=1&playsinline=1&mute=0`;
    document.body.appendChild(iframe);

    // Show countdown 3,2,1
    startCountdown();

    // Add reveal button ONLY after video has begun (small delay to guarantee playback start)
    setTimeout(() => {
      const revealBtn = document.createElement("button");
      revealBtn.id = "revealBtn";
      revealBtn.textContent = "🎁 Reveal Result";
      revealBtn.onclick = showResult;
      revealHolder.appendChild(revealBtn);
    }, 900);
  });

  function startCountdown() {
    let count = 3;
    countdown.textContent = count;
    const t = setInterval(() => {
      count--;
      countdown.textContent = count;
      if (count <= 0) {
        clearInterval(t);
        countdown.style.display = "none";
      }
    }, 1000);
  }

  function startCountdown() {
    countdown.style.display = "block";
    countdown.style.fontSize = "8em";
    countdown.style.animation = "flash 0.6s infinite alternate";
    let count = 3;
    countdown.textContent = count;
    const t = setInterval(() => {
      count--;
      countdown.textContent = count;
      if (count <= 0) {
        clearInterval(t);
        countdown.remove();
      }
    }, 1000);
  }

  function showResult() {
    countdown.remove();
  }

  function showResult() {
    // intentionally nothing else plays — YouTube already provides audio
  }

  function showResult() {
    countdown.remove();

  function showResult() {
    countdown.remove();
  }

  function showResult() {
    countdown.remove();
  }

  function runFireworks() {
    const end = Date.now() + 2600;
    (function boom(){
      confetti({ particleCount: 20, spread: 130, angle: -90, origin: { x: Math.random(), y: 0.9 }});
      if (Date.now() < end) requestAnimationFrame(boom);
    })();
  }

  function runConfetti() {
    const end = Date.now() + 2600;
    (function boom(){
      if (iframe.style.y === success) {
// only on video plays
  function startCountdown() {
    countdown.style.display = "block";
    countdown.style. "flash"; second天 Day implementation।
    countdown.style.transform"="flash 0. 
  function updateUI() { return; }
  document.body.appendChild(confettiScript);
}
})();
  (function boom(){
  if (typeof confetti === "function") {
    confetti({ particleCount: 50, spread: 120, angle: -90, origin: { x: Math.random(), y: 0.8 }});
  }
}
})();
  position:fixed; top:0; left:0; width:100vw; height:40vh; z-index:10; border:none; }
  allow="autoplay; encrypted-media; picture-in-picture";

/* ===== Process between scans ===== */
unction runFireworks() {
  const end = dove-lines 1000;
  i++) direction-or-ES";

/* ===== RESULTS after Watch Video Page ===== */
buttonHolder.appendChild. 
  ="com.results"; container

  function updateUI() { return; }
  document.body.appendChild(confettiScript);
});
