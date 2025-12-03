/* =============================================
   CONFIG — Change your Major Award tag here!
============================================== */
const winners = ["00","14","22","31"]; // 👈 EDIT winning tags here
const MAJOR_AWARD_TAG = "99"; // 👈 Change your 1 grand prize tag here

/* =============================================
   Read Tag Number from URL
============================================== */
const params = new URLSearchParams(window.location.search);
const tag = params.get("tag");

// Clean URL after reading
history.replaceState({}, "", window.location.pathname);

/* =============================================
   Countdown then reveal result
============================================== */
document.addEventListener("DOMContentLoaded", () => {

  const cd = document.getElementById("countdown");

  // 3,2,1 countdown
  let count = 3;
  cd.textContent = count;

  const timer = setInterval(() => {
    count--;
    cd.textContent = count;
    if (count <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);

  function showResult() {
    const r = document.getElementById("result");
    const soundW = document.getElementById("sound-winner");
    const soundF = document.getElementById("sound-fireworks");

    /* ==== MAJOR AWARD CHECK FIRST ==== */
    if (tag === MAJOR_AWARD_TAG) {
      r.innerHTML = `
        <div id="major">
           <div class="symbol">!</div>
           <div id="major-text">Major Award ✨</div>
        </div>`;
      launchFireworks();
      soundF.play();
      return;
    }

    /* ==== NORMAL WINNER ==== */
    if (winners.includes(tag)) {
      r.innerHTML = `
        <div id="winner">
           <div class="symbol">✅</div>
           <div id="winner-text">Winner 🎉</div>
        </div>`;
      confetti();
      soundW.play();
      return;
    }

    /* ==== LOSER ==== */
    r.innerHTML = `
      <div id="loser">
         <div class="symbol">X</div>
         <div id="loser-text">Loser ❌</div>
      </div>`;
  }

});

/* =============================================
   Fireworks burst animation
============================================== */
function launchFireworks() {
  const soundFireworks = document.getElementById("sound-fireworks");
  soundFireworks.muted = false;

  // Fireworks burst using particle effect
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      fireworksBurst();
    }, i * 600);
  }
}

function fireworksBurst() {
  const f = document.createElement("div");
  f.className = "firework";
  document.body.appendChild(f);
  setTimeout(() => f.remove(), 1000);
}

/* =============================================
   Particle confetti effect (no library needed)
============================================== */
function confetti() {
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });
}

/* =============================================
   JS CSS Firework Particles
============================================== */
const style = document.createElement("style");
style.textContent = `
.firework {
  position: fixed;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: fw 1s ease-out;
}
@keyframes fw {
  0% {transform: scale(1) translateY(0); opacity: 1;}
  100% {transform: scale(18) translateY(-300px); opacity: 0;}
}`;
document.head.appendChild(style);
