/* ============================
   🔧 EDIT SECTION — CHANGE THESE
   ============================ */

// Your winning tag numbers (must match EXACT text written to the NFC tag)
const winners = ["00", "14", "22", "31"];   // <-- EDIT your 4 normal winner tags
const grandPrizeTag = "40";                 // <-- EDIT your one grand prize tag number

// YouTube Video IDs for each screen result
const videoWinnerID = "9g3--WyItKU";        // <-- EDIT winner clip ID
const videoLoserID  = "3UC96g1A4Nc";        // <-- EDIT loser clip ID (currently valid)
const videoMajorID  = "OItP8-_mjXw";        // <-- EDIT major award clip ID

/* ============================
   DO NOT CHANGE BELOW THIS LINE
   ============================ */

const tagParam = new URLSearchParams(window.location.search).get("tag");

// ✅ Hide tag from URL bar so no one sees it
if (tagParam) {
  history.replaceState({}, "", window.location.pathname);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("message").style.display = "block";
    document.getElementById("message").innerHTML = "No tag scanned yet...";
    document.getElementById("revealBtn").style.display = "none";
    document.getElementById("countdown").style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const cd  = document.getElementById("countdown");
  const msg = document.getElementById("message");
  const btn = document.getElementById("revealBtn");
  const videoContainer = document.getElementById("video-container");

  function embedVideo(videoID) {
    videoContainer.innerHTML = `
      <iframe width="100%" height="100%"
      src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&playsinline=1"
      frameborder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen></iframe>`;
  }

  function playSound(file) {
    const sound = new Audio(file);
    sound.play().catch(()=>{});
  }

  function playWinner() {
    msg.innerHTML = `<div class='bigGreenCheck'>✔</div>
                     <div id='winnerLabel'>Winner!</div>`;
    runConfetti();
    playSound("winner.mp3");
    embedVideo(videoWinnerID);
  }

  function playLoser() {
    msg.innerHTML = `<div class='bigRedX'>X</div>
                     <div id='loserLabel'>Loser!</div>`;
    playSound("loser.mp3");
    embedVideo(videoLoserID);
  }

  function playMajor() {
    msg.innerHTML = `<div class='bigGoldBang'>!</div>
                     <div id='majorLabel'>Major Award!</div>`;
    playFireworks();
    playSound("major.mp3");
    embedVideo(videoMajorID);
  }

  function runConfetti() {
    confetti({ particleCount:180, spread:170, angle:-90, origin:{x:0.5,y:0.3}});
  }

  function playFireworks() {
    const fw = Date.now() + 2200;
    (function boom(){
      confetti({particleCount:40, spread:110, origin:{x:Math.random(),y:Math.random()-0.1}});
      if (Date.now() < fw) requestAnimationFrame(boom);
    })();
  }

  // 👇 Countdown 3→2→1 AFTER clicking Show Result button
  btn.addEventListener("click", () => {
    btn.style.display = "none";
    cd.style.display = "block";
    msg.style.display = "block";

    let count = 3;
    cd.textContent = count;

    const timer = setInterval(() => {
      count--;
      cd.textContent = count;
      if (count === 0) {
        clearInterval(timer);
        cd.style.animation = "none";
        cd.remove();

        if (tagParam === grandPrizeTag) {
          playMajor();
        }
        else if (winners.includes(tagParam)) {
          playWinner();
        }
        else {
          playLoser();
        }
      }
    }, 1000);
  });
});
