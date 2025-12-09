/* WINNING TAGS */
const winners = [7, 13];

/* MAJOR AWARD TAG */
const majorAward = 21;

/* Extract tag number from URL */
const params = new URLSearchParams(window.location.search);
let tag = params.get("tag");

/* Remove leading zeros */
if (tag !== null) {
    tag = String(parseInt(tag));
}

const resultArea = document.getElementById("resultArea");

/* ---------------------------------------
   CONFETTI (for Winners)
---------------------------------------- */
function runConfetti() {
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 }
    });
}

/* ---------------------------------------
   FIREWORKS (for Major Award)
---------------------------------------- */
function runFireworks() {
    let count = 0;
    const interval = setInterval(() => {
        confetti({
            particleCount: 80,
            spread: 120,
            startVelocity: 60,
            origin: {
                x: Math.random(),
                y: Math.random() * 0.4
            }
        });
        count++;
        if (count > 10) clearInterval(interval);
    }, 300);
}

/* ---------------------------------------
   IF NO TAG PROVIDED YET
---------------------------------------- */
if (!tag || isNaN(tag)) {
    resultArea.innerHTML = "<p>No tag scanned yet…</p>";
}

/* ---------------------------------------
   TAG PRESENT → DETERMINE OUTCOME
---------------------------------------- */
else {
    const tagNum = parseInt(tag);

    /* ---- MAJOR AWARD ---- */
    if (tagNum === majorAward) {
        resultArea.innerHTML = `
            <div class="big-exclaim">!</div>
            <div class="major-text">
                Major Award!<br>
                <small>Tag ${tagNum}</small>
            </div>
        `;
        runFireworks();   // <-- FIXED: properly CALL function
    }

    /* ---- WINNER ---- */
    else if (winners.includes(tagNum)) {
        resultArea.innerHTML = `
            <div class="big-check">✔</div>
            <div class="winner-text">
                Winner!<br>
                <small>Tag ${tagNum}</small>
            </div>
            <div class="free-steal">Free Extra Steal!</div>
        `;
        runConfetti();
    }

    /* ---- LOSER ---- */
    else {
        resultArea.innerHTML = `
            <div class="big-x">X</div>
            <div class="loser-text">
                Loser!<br>
                <small>Tag ${tagNum}</small>
            </div>
            <div class="small-x">x x x</div>
        `;
    }
}
