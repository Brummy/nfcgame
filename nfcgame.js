const winners = [7, 13];
const majorAward = 21;

function getTagFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("tag"), 10);
}

function showWinner(tag) {
    document.body.className = "state-winner";
    document.getElementById("tag-number").textContent = `Tag ${tag}`;
    document.getElementById("symbol").textContent = "✔";
    document.getElementById("main-message").textContent = "WINNER!";
    document.getElementById("mini-row").innerHTML =
        `<div class="winner-subtext">FREE EXTRA STEAL</div>`;

    launchConfetti();
}

function showLoser(tag) {
    document.body.className = "state-loser";
    document.getElementById("tag-number").textContent = `Tag ${tag}`;
    document.getElementById("symbol").textContent = "✖";
    document.getElementById("main-message").textContent = "LOSER!";
    document.getElementById("mini-row").innerHTML =
        `<div class="loser-x">x x x</div>`;
}

function showMajorAward(tag) {
    document.body.className = "state-major";
    document.getElementById("tag-number").textContent = `Tag ${tag}`;
    document.getElementById("symbol").textContent = "!";
    document.getElementById("main-message").textContent = "MAJOR AWARD!";
    document.getElementById("mini-row").innerHTML =
        `<div class="major-sub">MAJOR AWARD!</div>`;

    launchFireworks();
}

function launchConfetti() {
    // lightweight CSS confetti effect could be added later
}

function launchFireworks() {
    // lightweight CSS fireworks could be added later
}

let tag = getTagFromURL();

if (!isNaN(tag)) {
    if (tag === majorAward) {
        showMajorAward(tag);
    } else if (winners.includes(tag)) {
        showWinner(tag);
    } else {
        showLoser(tag);
    }
} else {
    document.getElementById("main-message").textContent = "NO TAG SCANNED";
}
