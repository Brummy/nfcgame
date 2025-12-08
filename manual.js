const winners = [7, 13];
const majorAward = 21;

document.getElementById("revealBtn").addEventListener("click", () => {
    let tag = parseInt(document.getElementById("tagInput").value, 10);
    if (isNaN(tag)) return;

    if (tag === majorAward) {
        showMajorAward(tag);
    } else if (winners.includes(tag)) {
        showWinner(tag);
    } else {
        showLoser(tag);
    }
});

function showWinner(tag) {
    document.body.className = "state-winner";
    document.getElementById("tag-number").textContent = `Tag ${tag}`;
    document.getElementById("symbol").textContent = "✔";
    document.getElementById("main-message").textContent = "WINNER!";
    document.getElementById("mini-row").innerHTML =
        `<div class="winner-subtext">FREE EXTRA STEAL</div>`;
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
}
