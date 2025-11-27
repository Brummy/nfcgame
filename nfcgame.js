/* ===============================
   CONFIG
================================= */
const winners = ["00", "14", "22", "31"];
const grandPrizeTag = "40"; // one major award winner tag

/* ===============================
   READ TAG FROM URL
================================= */
const params = new URLSearchParams(window.location.search);
const tag = params.get("tag");

// Clean URL after page load so tag isn't shown
history.replaceState({}, "", window.location.pathname);

/* ===============================
   SOUND FILES
================================= */
const soundWinner = "winner.mp3";  // drop these into your site folder
const soundLoser  = "loser.mp3";
const soundMajor  = "major.mp3";

/* ===============================
   REVEAL AFTER COUNTDOWN
================================= */
document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main");
  const msg  = document.getElementById("message");
  const cd   = document.getElementById("countdown");
  const btn  = document.getElementById("revealBtn");
  const vid  = document.getElementById("resultVideo");

  if (!tag) {
    msg.innerHTML = "<h1>No tag detected.</h1>";
    return;
  }

  btn.addEventListener("click", () => {
    btn.style.display = "none"; // hide reveal button during countdown
    let count = 3;
    cd.textContent = count;

    const interval = setInterval(() => {
      cd.textContent = count;
      count--;
      if (count < 1) {
        clearInterval(interval);
        startResult();
      }
    }, 1000);
  });

  function startResult() {
    cd.remove(); // remove countdown after revealing
  }

  function startResultSound(src) {
    const audio = new Audio(src);
    audio.play();
  }

  function startResultConfetti() {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        angle: -90,
        origin: { x: 0.5, y: 0.2 }
      });
    }, 100);
  }

  function startResultVideo(videoId) {
    vid.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
    vid.style.display = "block";
  }

  function startResultWinner() {
    startResultSound(soundWinner);
    startResultVideo("9g3--WyItKU"); // example winner video (replace if needed)
    startResultConfetti();
  }

  function startResultLoser() {
    startResultSound(soundLoser);
    startResultVideo("3UC96g1A4Nc");
  }

  function startResultMajor() {
    startResultSound(soundMajor);
    startResultVideo("OItP8-_mjXw"); // major award video
  }

  function startResult() {
    if (tag === grandPrizeTag) {
      startResultVideo("OItP8-_mjXw");
      msg.innerHTML = `
        <div id="tagNumber">Tag ${tag}</div>
        <div class="majorAward">Major Award!</div>
      `;
      startResultSound(soundMajor);

    } else if (winners.includes(tag)) {
      msg.innerHTML = `
        <div id="tagNumber">Tag ${tag}</div>
        <div class="bigCheck">✔</div>
        <div id="winnerText">Winner!</div>
      `;
      startResultWinner();
      startResultSound(soundWinner);

    } else {
      msg.innerHTML = `
        <div id="tagNumber">Tag ${tag}</div>
        <div class="flashingX">X</div>
        <div id="loserText">LOSER!!</div>
      `;
      startResultLoser();
      startResultSound("loser.mp3");
    }

    if (tag == grandPrizeTag) runMajor();
    else if (!localStorage.getItem("scanned_" + tag)) {
      localStorage.setItem("scanned_" + tag, "1");
    }
  }
});
