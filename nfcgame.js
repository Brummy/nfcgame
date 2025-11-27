/* ====================================
   🔧🔧 EDIT THESE VALUES BELOW
====================================== */

// List of "normal" winners
const winners = ["00", "14", "22", "31"]; 

// One grand prize tag (must match EXACT tag text)
const grandPrizeTag = "40"; // <-- EDIT to choose your grand prize tag

// Videos for each result.
// To get the video ID, copy the part after `youtu.be/` or `v=` in any YouTube URL
const videoWinnerID = "8G_Z79Z05fk"; // <-- EDIT to your WINNER video ID
const videoLoserID  = "3UC96g1A4Nc"; // ✔ Current loser ID from your link — EDIT if desired
const videoMajorID  = "OItP8-_mjXw"; // <-- EDIT to your MAJOR AWARD video ID

// Sounds that play after result
const soundWinner = "winner.mp3"; // <-- optional, leave as-is if unused
const soundLoser  = "loser.mp3";  // <-- optional
const soundMajor  = "major.mp3";  // <-- optional

/* ====================================
   🎯 DO NOT CHANGE BELOW THIS unless customizing behavior
====================================== */

const params = new URLSearchParams(window.location.search);
const tag = params.get("tag");

// Clean the URL bar so tag doesn't show publicly
history.replaceState({}, "", window.location.pathname);

document.addEventListener("DOMContentLoaded", () => {
  const msg = document.getElementById("message");
  const cd  = document.getElementById("countdown");
  const vid = document.getElementById("resultVideo");
  const btn = document.getElementById("startBtn");

  if (!tag) {
    msg.innerHTML = `<h1>No tag detected.</h1>`;
    vid.style.display = "none";
    btn.style.display = "none";
    return;
  }

  function playSound(file) {
    const a = new Audio(file);
    a.play().catch(()=>{});
  }

  function runConfetti() {
    confetti({ particleCount: 150, spread: 160, angle: -90, origin: {x:0.5,y:0.25}});
  }

  function revealMajor() {
    msg.innerHTML = `
      <div class="majorAward">Major Award!</div>
    `;
    vid.src = `https://www.youtube.com/embed/${videoMajorID}?autoplay=1&mute=1`;
    playSound(soundMajor);
    setTimeout(runConfetti, 200);
  }

  function revealWinner() {
    msg.innerHTML = `
      <div id="winnerText">Winner!</div>
    `;
    vid.src = `https://www.youtube.com/embed/${videoWinnerID}?autoplay=1&mute=1`;
    playSound(soundWinner);
    setTimeout(runConfetti, 200);
  }

  function revealLoser() {
    msg.innerHTML = `
      <div class="flashingX">X</div>
      <div id="loserText">LOSER!!</div>
    `;
    vid.src = `https://www.youtube.com/embed/${videoLoserID}?autoplay=1&mute=1`;
    playSound(soundLoser);
  }

  // Start 3-2-1 countdown when Reveal button pressed
  btn.addEventListener("click", () => {
    btn.remove();
    cd.style.display = "block";
    let count = 3;
    cd.textContent = count;

    const i = setInterval(() => {
      count--;
      cd.textContent = count;
      if (count === 0) {
        clearInterval(i);
        cd.remove();

        if (tag === grandPrizeTag) {
          revealMajor();
        } 
        else if (winners.includes(tag)) {
          revealWinner();
        } 
        else {
          revealLoser();
        }
      }
    }, 1000);
  });

});
