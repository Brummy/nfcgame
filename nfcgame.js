// Prize configuration
const winners = ["00", "14", "22", "31"];
const grandPrizeTag = "40"; // One Major Award winner

// Read tag
const params = new URLSearchParams(window.location.search);
const tag = params.get("tag");

// Hide ?tag=XX from URL bar
history.replaceState({}, "", window.location.pathname);

// Countdown → Reveal result
document.addEventListener("DOMContentLoaded", () => {
  const msg = document.getElementById("message");
  const cd  = document.getElementById("countdown");
  const vidFrame = document.getElementById("resultVideo");

  if (!tag) {
    msg.innerHTML = "<h1>No tag detected.</h1>";
    return;
  }

  // Start 3-2-1 countdown, then show result
  function runCountdown(onFinish) {
    cd.style.display = "block";
    let count = 3;
    cd.textContent = count;

    const i = setInterval(() => {
      count--;
      cd.textContent = count;
      if (count === 0) {
        clearInterval(i);
        cd.style.display = "none";
        onFinish();
      }
    }, 1000);
  }

  // Reveal result AFTER countdown
  runCountdown(() => {
    if (tag === grandPrizeTag) {
      showMajor();
    } else if (winners.includes(tag)) {
      showWinner();
    } else {
      showLoser();
    }
  });

  function showWinner() {
    msg.innerHTML = `
      <div id="tagNumber">${tag}</div>
      <div class="bigCheck">✔</div>
      <div id="winnerText">WINNER!!</div>
    `;

    vidFrame.style.display = "block";
    vidFrame.src = "https://www.youtube.com/embed/9g3--WyItKU?autoplay=1&mute=1";

    setTimeout(runConfetti, 200);
    playSound("winner.mp3");
  }

  function showLoser() {
    msg.innerHTML = `
      <div id="tagNumber">${tag}</div>
      <div class="flashingX">X</div>
      <div id="loserText">LOSER!!</div>
    `;

    vidFrame.style.display = "block";
    vidFrame.src = "https://www.youtube.com/embed/3UC96g1A4Nc?autoplay=1&mute=1";

    playSound("loser.mp3");
  }

  function showMajor() {
    msg.innerHTML = `
      <div id="tagNumber">${tag}</div>
      <div class="majorAward">🏆 Major Award! 🏆</div>
    `;

    vidFrame.style.display = "block";
    vidFrame.src = "https://www.youtube.com/embed/OItP8-_mjXw?autoplay=1&mute=1";

    setTimeout(runConfetti, 200);
    playSound("major.mp3");
  }

  function playSound(file) {
    const audio = new Audio(file);
    audio.play().catch(() => {});
  }
});
