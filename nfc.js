/* WINNING TAGS */
const winners = [7, 13];

/* MAJOR AWARD TAG */
const majorAward = 21;

/* Extract tag number */
const params = new URLSearchParams(window.location.search);
let tag = params.get("tag");

if (tag !== null) tag = String(parseInt(tag));

const resultArea = document.getElementById("resultArea");

function runConfetti() {
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 }
    });
}

function runFireworks() {
    let count = 0;
    const interval = setInterval(() => {
        confetti({
            particleCount: 80,
            spread: 140,
            startVelocity: 65,
            origin: {
                x: Math.random(),
                y: Math.random() * 0.4
            }
        });
        count++;
        if (count > 12) clearInterval(interval);
    }, 250);
}

/* Only draw something if tag is present */
if (tag && !isNaN(tag)) {

    const tagNum = parseInt(tag);

    if (tagNum === majorAward) {
        resultArea.innerHTML = `
            <div class="big-exclaim">!</div>
            <div class="major-text">
                Major Award!<br>
                <small>Tag ${tagNum}</small>
            </div>
        `;
        runFireworks();
    }

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
