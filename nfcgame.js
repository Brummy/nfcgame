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

/* Confetti for winners */
function runConfetti() {
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 }
    });
}

/* Fireworks for major award */
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

/* If no tag provided */
if (!tag) {
    resultArea.innerHTML = "<p>No tag scanned yet…</p>";
} else {

    const tagNum = parseInt(tag);

    /* Major Award */
    if (tagNum === majorAward) {
        resultArea.innerHTML = `
            <div class="big-exclaim">!</div>
            <div class="major-text">Major Award!<br><small>Tag ${tagNum}</small></div>
        `;
        runFireworks();
    }

    /* Winner */
    else if (winners.includes(tagNum)) {
        resultArea.innerHTML = `
            <div class="big-check">✔</div>
            <div class="winner-text">Winner!<br><small>Tag ${tagNum}</small></div>
            <div class="free-steal">Free Extra Steal!</div>
        `;
        runConfetti();
    }

    /* Loser */
    else {
        resultArea.innerHTML = `
            <div class="big-x">X</div>
            <div class="loser-text">Loser!<br><small>Tag ${tagNum}</small></div>
            <div class="small-x">x x x</div>
        `;
    }
}
