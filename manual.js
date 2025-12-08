/* WINNERS */
const winners = [7, 13];

/* MAJOR AWARD */
const majorAward = 21;

/* DOM Elements */
const input = document.getElementById("manualInput");
const revealBtn = document.getElementById("revealBtn");
const resultArea = document.getElementById("resultArea");

/* Confetti Burst */
function runConfetti() {
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 }
    });
}

/* Fireworks */
function runFireworks() {
    // Using a simple repeating confetti burst to mimic fireworks
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

/* Reveal Logic */
revealBtn.addEventListener("click", () => {

    let val = parseInt(input.value);

    if (isNaN(val)) {
        resultArea.innerHTML = "<p>Please enter a tag number.</p>";
        return;
    }

    resultArea.innerHTML = "";

    /* MAJOR AWARD */
    if (val === majorAward) {
        resultArea.innerHTML = `
            <div class="big-exclaim">!</div>
            <div class="major-text">Major Award!<br><small>Tag ${val}</small></div>
        `;
        runFireworks();
        return;
    }

    /* WINNERS */
    if (winners.includes(val)) {
        resultArea.innerHTML = `
            <div class="big-check">✔</div>
            <div class="winner-text">Winner!<br><small>Tag ${val}</small></div>
            <div class="free-steal">Free Extra Steal!</div>
        `;
        runConfetti();
        return;
    }

    /* LOSERS */
    resultArea.innerHTML = `
        <div class="big-x">X</div>
        <div class="loser-text">Loser!<br><small>Tag ${val}</small></div>
        <div class="small-x">x x x</div>
    `;
});
